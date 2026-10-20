/**
 * Shellfish Hierarchical Overlay Stack & History Engine
 *
 * Implements strict LIFO overlay coordination:
 * - Last overlay opened is the first to close on Escape / Click Outside.
 * - Prevents nested cascade-close bugs (e.g., Select inside a Modal).
 * - Coordinated browser history integration (Back button closes topmost overlay without losing app route).
 * - Clean scroll locking on <body> without layout shift.
 */

export interface OverlayConfig {
	id: string;
	type: 'modal' | 'drawer' | 'popover' | 'tooltip';
	close: () => void;
	element?: HTMLElement | null;
	closeOnEscape?: boolean;
	closeOnClickOutside?: boolean;
	closeOnBack?: boolean;
	restoreFocusEl?: HTMLElement | null;
}

class OverlayManager {
	private stack: OverlayConfig[] = [];
	private pushedStates = new Set<string>();
	private listenersAttached = false;
	private originalBodyOverflow = '';
	private childDismissedInCurrentGesture = false;

	recordChildDismiss(): void {
		this.childDismissedInCurrentGesture = true;
		// Limpeza de segurança caso o pointerup não gere um evento click
		setTimeout(() => {
			this.childDismissedInCurrentGesture = false;
		}, 300);
	}

	consumeChildDismiss(): boolean {
		if (this.childDismissedInCurrentGesture) {
			this.childDismissedInCurrentGesture = false;
			return true;
		}
		return false;
	}

	get length(): number {
		return this.stack.length;
	}

	getTop(): OverlayConfig | undefined {
		return this.stack[this.stack.length - 1];
	}

	isTop(id: string): boolean {
		return this.stack.length > 0 && this.stack[this.stack.length - 1].id === id;
	}

	contains(id: string): boolean {
		return this.stack.some((o) => o.id === id);
	}

	register(config: OverlayConfig): void {
		if (typeof window === 'undefined') return;

		// Evita duplicação caso já registrado
		const existingIndex = this.stack.findIndex((o) => o.id === config.id);
		if (existingIndex >= 0) {
			this.stack[existingIndex] = config;
			return;
		}

		this.stack.push(config);
		this.ensureListeners();

		// Bloqueio de rolagem do body se for Modal ou Drawer
		if (config.type === 'modal' || config.type === 'drawer') {
			const modalCount = this.stack.filter((o) => o.type === 'modal' || o.type === 'drawer').length;
			if (modalCount === 1) {
				this.originalBodyOverflow = document.body.style.overflow;
				document.body.style.overflow = 'hidden';
			}
		}

		// Coordenação de histórico do navegador (botão Voltar do mobile/browser)
		if (config.closeOnBack && typeof window.history !== 'undefined') {
			try {
				window.history.pushState({ shellfishOverlayId: config.id }, '');
				this.pushedStates.add(config.id);
			} catch (e) {
				console.warn('Shellfish overlay history coordination unavailable:', e);
			}
		}
	}

	unregister(id: string, options?: { closedByBack?: boolean }): void {
		if (typeof window === 'undefined') return;

		const index = this.stack.findIndex((o) => o.id === id);
		if (index === -1) return;

		const [removed] = this.stack.splice(index, 1);

		// Limpa entrada no histórico se foi aberta com pushState e não foi desarmada pelo popstate
		if (this.pushedStates.has(id)) {
			this.pushedStates.delete(id);
			if (!options?.closedByBack && window.history.state?.shellfishOverlayId === id) {
				try {
					window.history.back();
				} catch {
					// Ignora indisponibilidade do histórico do navegador
				}
			}
		}

		// Desbloqueia a rolagem do body se não restarem mais Modals/Drawers
		const remainingModals = this.stack.filter(
			(o) => o.type === 'modal' || o.type === 'drawer'
		).length;
		if (remainingModals === 0 && document.body.style.overflow === 'hidden') {
			document.body.style.overflow = this.originalBodyOverflow;
		}

		// Restaura o foco no elemento invocador se definido
		if (removed?.restoreFocusEl && typeof removed.restoreFocusEl.focus === 'function') {
			setTimeout(() => {
				removed.restoreFocusEl?.focus();
			}, 0);
		}

		if (this.stack.length === 0) {
			this.teardownListeners();
		}
	}

	private handleKeyDown = (e: KeyboardEvent): void => {
		if (e.key !== 'Escape') return;

		const top = this.getTop();
		if (!top) return;

		if (top.closeOnEscape !== false) {
			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();
			top.close();
		}
	};

	private handlePointerDown = (e: PointerEvent): void => {
		const top = this.getTop();
		if (!top || top.closeOnClickOutside === false || !top.element) return;

		const target = e.target as Node | null;
		if (!target) return;

		// Se o clique foi fora do elemento do topo
		if (!top.element.contains(target)) {
			if (top.type === 'popover') {
				// Fecha o popover, marca o descarte do filho e interrompe a propagação para proteger o modal pai
				this.recordChildDismiss();
				e.stopPropagation();
				top.close();
			}
		}
	};

	private handlePopState = (e?: PopStateEvent): void => {
		const top = this.getTop();
		if (!top) return;

		// Se o overlay do topo for um popover (que não gerou estado próprio) dentro de um modal/drawer
		if (top.type === 'popover') {
			top.close();
			// Reestabelece o estado do modal pai no histórico para mantê-lo ativo
			const parentModal = [...this.stack]
				.reverse()
				.find((o) => o.type === 'modal' || o.type === 'drawer');
			if (parentModal && this.pushedStates.has(parentModal.id)) {
				try {
					window.history.pushState({ shellfishOverlayId: parentModal.id }, '');
				} catch {
					// Ignora indisponibilidade do histórico do navegador
				}
			}
			return;
		}

		if (!top.closeOnBack) return;

		// Se o overlay registrou um estado no histórico, só ignora se o popstate ainda carregar este mesmo estado
		if (this.pushedStates.has(top.id)) {
			if (e?.state?.shellfishOverlayId === top.id) {
				return;
			}
		}

		this.unregister(top.id, { closedByBack: true });
		top.close();
	};

	private ensureListeners(): void {
		if (this.listenersAttached || typeof window === 'undefined') return;
		window.addEventListener('keydown', this.handleKeyDown, true);
		document.addEventListener('pointerdown', this.handlePointerDown, true);
		window.addEventListener('popstate', this.handlePopState);
		this.listenersAttached = true;
	}

	private teardownListeners(): void {
		if (!this.listenersAttached || typeof window === 'undefined') return;
		window.removeEventListener('keydown', this.handleKeyDown, true);
		document.removeEventListener('pointerdown', this.handlePointerDown, true);
		window.removeEventListener('popstate', this.handlePopState);
		this.listenersAttached = false;
	}
}

export const overlayStack = new OverlayManager();
