<script lang="ts">
	import type { CalendarProps } from '$lib/types/index.js';
	import { t } from '$lib/utils/i18n.svelte.js';

	let {
		value = $bindable(new Date()),
		mode = 'month',
		onselect,
		class: className,
		...restProps
	}: CalendarProps = $props();

	let selectedDate = $derived(value instanceof Date ? value : new Date(value ?? Date.now()));
	let currentMonth = $state(
		new Date(
			(value instanceof Date ? value : new Date(value ?? Date.now())).getFullYear(),
			(value instanceof Date ? value : new Date(value ?? Date.now())).getMonth(),
			1
		)
	);
	let isExpanded = $state(false);

	const WEEKDAYS_SHORT = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
	const MONTH_NAMES = [
		'Janeiro',
		'Fevereiro',
		'Março',
		'Abril',
		'Maio',
		'Junho',
		'Julho',
		'Agosto',
		'Setembro',
		'Outubro',
		'Novembro',
		'Dezembro'
	];

	function prevMonth() {
		currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
	}

	function nextMonth() {
		currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
	}

	function toggleExpand() {
		isExpanded = !isExpanded;
	}

	function selectDay(date: Date) {
		value = date;
		onselect?.(date);
	}

	function isSameDay(d1: Date, d2: Date) {
		return (
			d1.getFullYear() === d2.getFullYear() &&
			d1.getMonth() === d2.getMonth() &&
			d1.getDate() === d2.getDate()
		);
	}

	// Grade do Mês
	let monthDays = $derived.by(() => {
		const year = currentMonth.getFullYear();
		const month = currentMonth.getMonth();
		const firstDayIndex = new Date(year, month, 1).getDay();
		const daysInMonth = new Date(year, month + 1, 0).getDate();
		const daysInPrevMonth = new Date(year, month, 0).getDate();

		const days: { date: Date; currentMonth: boolean }[] = [];

		// Dias do mês anterior
		for (let i = firstDayIndex - 1; i >= 0; i--) {
			days.push({
				date: new Date(year, month - 1, daysInPrevMonth - i),
				currentMonth: false
			});
		}

		// Dias do mês atual
		for (let d = 1; d <= daysInMonth; d++) {
			days.push({
				date: new Date(year, month, d),
				currentMonth: true
			});
		}

		// Preenchimento do próximo mês (múltiplo de 7)
		const remaining = (7 - (days.length % 7)) % 7;
		for (let n = 1; n <= remaining; n++) {
			days.push({
				date: new Date(year, month + 1, n),
				currentMonth: false
			});
		}

		return days;
	});

	// Faixa da Semana (7 dias ao redor do dia selecionado)
	let weekDays = $derived.by(() => {
		const current = new Date(selectedDate);
		const dayOfWeek = current.getDay();
		const startYear = current.getFullYear();
		const startMonth = current.getMonth();
		const startDate = current.getDate() - dayOfWeek;

		const days: Date[] = [];
		for (let i = 0; i < 7; i++) {
			days.push(new Date(startYear, startMonth, startDate + i));
		}
		return days;
	});
</script>

<div
	class={`shellfish-calendar ${className ?? ''}`}
	data-mode={mode}
	data-expanded={isExpanded}
	{...restProps}
>
	<!-- Header do Calendário -->
	<header class="calendar-header">
		<span class="month-title">
			{MONTH_NAMES[currentMonth.getMonth()]}
			{currentMonth.getFullYear()}
		</span>
		<div class="calendar-controls">
			{#if mode === 'expandable'}
				<button
					type="button"
					class="icon-btn chevron-toggle"
					class:rotated={isExpanded}
					aria-label={t('calendar.toggleMonth')}
					onclick={toggleExpand}
				>
					<svg
						viewBox="0 0 16 16"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<polyline points="4 6 8 10 12 6" />
					</svg>
				</button>
			{:else if mode === 'month'}
				<button
					type="button"
					class="icon-btn"
					aria-label={t('calendar.prevMonth')}
					onclick={prevMonth}
				>
					<svg
						viewBox="0 0 16 16"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<polyline points="10 12 6 8 10 4" />
					</svg>
				</button>
				<button
					type="button"
					class="icon-btn"
					aria-label={t('calendar.nextMonth')}
					onclick={nextMonth}
				>
					<svg
						viewBox="0 0 16 16"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<polyline points="6 4 10 8 6 12" />
					</svg>
				</button>
			{/if}
		</div>
	</header>

	<!-- Modo Faixa (Week Strip) -->
	{#if mode === 'week' || mode === 'expandable'}
		<div class="calendar-strip">
			{#each weekDays as day (day.toISOString())}
				{@const isSelected = isSameDay(day, selectedDate)}
				<button
					type="button"
					class="strip-day-card"
					data-selected={isSelected}
					onclick={() => selectDay(day)}
				>
					<span class="strip-day-num">{day.getDate()}</span>
					<span class="strip-day-name">{WEEKDAYS_SHORT[day.getDay()]}</span>
				</button>
			{/each}
		</div>
	{/if}

	<!-- Modo Grade Mensal (ou expansão no modo expandable) -->
	{#if mode === 'month' || (mode === 'expandable' && isExpanded)}
		<div class="calendar-month-grid">
			<div class="weekday-header-row">
				{#each WEEKDAYS_SHORT as wd, i (i)}
					<span class="weekday-header-cell">{wd.slice(0, 1)}</span>
				{/each}
			</div>
			<div class="days-grid">
				{#each monthDays as item (item.date.toISOString())}
					{@const isSelected = isSameDay(item.date, selectedDate)}
					<button
						type="button"
						class="month-day-cell"
						data-selected={isSelected}
						data-current-month={item.currentMonth}
						onclick={() => selectDay(item.date)}
					>
						{item.date.getDate()}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.shellfish-calendar {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		box-sizing: border-box;
		background-color: var(--bg-primary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow);
		padding: var(--space-md);
		width: 100%;
		max-width: 360px;
	}

	.calendar-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: var(--space-xs);
		border-bottom: var(--border-width) solid var(--border-color);
	}

	.month-title {
		font-family: var(--font-display);
		font-weight: 800;
		font-size: var(--text-sm);
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--text-primary);
	}

	.calendar-controls {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
	}

	.icon-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		background-color: var(--bg-secondary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		box-shadow: 1px 1px 0px var(--border-color);
		cursor: pointer;
		color: var(--text-primary);
		transition:
			transform 0.12s ease,
			box-shadow 0.12s ease;
	}

	.icon-btn:hover {
		border-color: var(--color-primary);
		transform: translate(-1px, -1px);
		box-shadow: 2px 2px 0px var(--border-color);
	}

	.chevron-toggle {
		transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.chevron-toggle.rotated {
		transform: rotate(180deg);
	}

	.icon-btn svg {
		width: 14px;
		height: 14px;
	}

	/* Faixa de Dias (Week Strip) */
	.calendar-strip {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: var(--space-xs);
	}

	.strip-day-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--space-xs) 2px;
		box-sizing: border-box;
		background-color: var(--bg-secondary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		box-shadow: 1px 1px 0px var(--border-color);
		cursor: pointer;
		transition:
			transform 0.12s ease,
			box-shadow 0.12s ease,
			background-color 0.15s ease,
			border-color 0.15s ease;
	}

	.strip-day-card:hover {
		border-color: var(--color-primary);
		transform: translate(-1px, -1px);
		box-shadow: 2px 2px 0px var(--border-color);
	}

	.strip-day-card[data-selected='true'] {
		background-color: var(--color-primary);
		color: #ffffff;
		border-color: var(--border-color);
		box-shadow: 2px 2px 0px var(--border-color);
		transform: translate(-1px, -1px);
	}

	.strip-day-num {
		font-family: var(--font-display);
		font-size: var(--text-base);
		font-weight: 800;
		line-height: 1.1;
	}

	.strip-day-name {
		font-size: var(--text-xs);
		font-weight: 700;
		text-transform: uppercase;
		opacity: 0.8;
	}

	/* Grade Mensal */
	.calendar-month-grid {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		animation: monthFade 0.2s ease;
	}

	@keyframes monthFade {
		from {
			opacity: 0;
			transform: translateY(-4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.weekday-header-row {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		text-align: center;
		font-family: var(--font-display);
		font-size: var(--text-xs);
		font-weight: 800;
		color: var(--text-secondary);
		padding-bottom: 2px;
	}

	.days-grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 2px;
	}

	.month-day-cell {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 32px;
		background-color: transparent;
		border: var(--border-width) solid transparent;
		border-radius: var(--radius-sm);
		font-family: inherit;
		font-size: var(--text-sm);
		font-weight: 700;
		color: var(--text-primary);
		cursor: pointer;
		transition:
			background-color 0.12s ease,
			border-color 0.12s ease,
			transform 0.12s ease;
	}

	.month-day-cell[data-current-month='false'] {
		opacity: 0.35;
	}

	.month-day-cell:hover {
		background-color: var(--bg-secondary);
		border-color: var(--border-color);
	}

	.month-day-cell[data-selected='true'] {
		background-color: var(--color-primary);
		color: #ffffff;
		border-color: var(--border-color);
		box-shadow: 1px 1px 0px var(--border-color);
		transform: translate(-1px, -1px);
	}

	@media (prefers-reduced-motion: reduce) {
		.strip-day-card,
		.month-day-cell,
		.chevron-toggle,
		.calendar-month-grid {
			transition: none;
			animation: none;
		}
	}
</style>
