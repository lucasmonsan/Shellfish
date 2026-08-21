<script lang="ts">
	import type { CalendarProps } from '$lib/types/index.js';
	import { t } from '$lib/utils/i18n.svelte.js';

	let {
		value = $bindable(new Date()),
		mode = 'month',
		minDate,
		maxDate,
		disablePast = false,
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

	function isDayDisabled(date: Date): boolean {
		const checkTime = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

		if (disablePast) {
			const now = new Date();
			const todayTime = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
			if (checkTime < todayTime) return true;
		}

		if (minDate) {
			const minD = minDate instanceof Date ? minDate : new Date(minDate);
			const minTime = new Date(minD.getFullYear(), minD.getMonth(), minD.getDate()).getTime();
			if (checkTime < minTime) return true;
		}

		if (maxDate) {
			const maxD = maxDate instanceof Date ? maxDate : new Date(maxDate);
			const maxTime = new Date(maxD.getFullYear(), maxD.getMonth(), maxD.getDate()).getTime();
			if (checkTime > maxTime) return true;
		}

		return false;
	}

	function selectDay(date: Date) {
		if (isDayDisabled(date)) return;
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

	// Faixa Híbrida (5 dias consecutivos a partir do início da semana ou dia atual)
	let fiveDays = $derived.by(() => {
		const current = new Date(selectedDate);
		const dayOfWeek = current.getDay();
		const startYear = current.getFullYear();
		const startMonth = current.getMonth();
		const startDate = current.getDate() - (dayOfWeek > 4 ? dayOfWeek - 4 : 0);

		const days: Date[] = [];
		for (let i = 0; i < 5; i++) {
			days.push(new Date(startYear, startMonth, startDate + i));
		}
		return days;
	});
</script>

{#snippet monthGridContent()}
	<div class="calendar-month-grid">
		<div class="weekday-header-row">
			{#each WEEKDAYS_SHORT as wd, i (i)}
				<span class="weekday-header-cell">{wd.slice(0, 1)}</span>
			{/each}
		</div>
		<div class="days-grid">
			{#each monthDays as item (item.date.toISOString())}
				{@const isSelected = isSameDay(item.date, selectedDate)}
				{@const disabled = isDayDisabled(item.date)}
				<button
					type="button"
					class="month-day-cell"
					data-selected={isSelected}
					data-current-month={item.currentMonth}
					data-disabled={disabled}
					{disabled}
					onclick={() => selectDay(item.date)}
				>
					{item.date.getDate()}
				</button>
			{/each}
		</div>
	</div>
{/snippet}

<div
	class={`shellfish-calendar ${className ?? ''}`}
	data-mode={mode}
	data-expanded={isExpanded}
	{...restProps}
>
	<!-- Header do Calendário: Mês e Ano à esquerda, setas ‹ › à direita em todos os modos -->
	<header class="calendar-header">
		<span class="month-title">
			{MONTH_NAMES[currentMonth.getMonth()]}
			{currentMonth.getFullYear()}
		</span>
		<div class="calendar-controls">
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
		</div>
	</header>

	<!-- Modo Faixa / Híbrido: 5 Cards de Dias + 6º Card de Ação (Chevron que abre o mês) -->
	{#if mode === 'strip' || mode === 'expandable' || mode === 'week'}
		<div class="calendar-strip hybrid-strip">
			{#each fiveDays as day (day.toISOString())}
				{@const isSelected = isSameDay(day, selectedDate)}
				{@const disabled = isDayDisabled(day)}
				<button
					type="button"
					class="strip-day-card"
					data-selected={isSelected}
					data-disabled={disabled}
					{disabled}
					onclick={() => selectDay(day)}
				>
					<span class="strip-day-num">{day.getDate()}</span>
					<span class="strip-day-name">{WEEKDAYS_SHORT[day.getDay()]}</span>
				</button>
			{/each}

			<!-- 6º Card: Botão de Expansão com Chevron Centralizado -->
			<button
				type="button"
				class="strip-day-card toggle-card"
				class:active-toggle={isExpanded}
				aria-label={t('calendar.toggleMonth')}
				onclick={toggleExpand}
			>
				<svg
					viewBox="0 0 16 16"
					class="chevron-toggle"
					class:rotated={isExpanded}
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<polyline points="4 6 8 10 12 6" />
				</svg>
			</button>
		</div>

		<!-- Grade Mensal Expansível Fluida -->
		<div class="calendar-expand-wrapper" class:expanded={isExpanded}>
			<div class="calendar-expand-inner">
				{@render monthGridContent()}
			</div>
		</div>
	{:else}
		<!-- Modo Mês: Grade Mensal de 7 Colunas -->
		{@render monthGridContent()}
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
		max-width: 400px;
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
		transform: translate(-1px, -1px);
		box-shadow: 2px 2px 0px var(--border-color);
	}

	.icon-btn svg {
		width: 14px;
		height: 14px;
	}

	/* Faixa de Dias (Week Strip & Hybrid Strip) */
	.calendar-strip {
		display: grid;
		gap: var(--space-sm);
	}

	.hybrid-strip {
		grid-template-columns: repeat(6, 1fr);
	}

	.week-strip {
		grid-template-columns: repeat(7, 1fr);
	}

	.strip-day-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--space-xs) 2px;
		min-height: 52px;
		box-sizing: border-box;
		background-color: var(--bg-secondary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		box-shadow: 1px 1px 0px var(--border-color);
		cursor: pointer;
		transition:
			transform 0.12s ease,
			box-shadow 0.12s ease,
			background-color 0.15s ease;
	}

	.strip-day-card:hover:not([data-disabled='true']) {
		transform: translate(-1px, -1px);
		box-shadow: 2px 2px 0px var(--border-color);
	}

	.strip-day-card[data-selected='true'] {
		background-color: var(--color-primary);
		color: var(--color-primary-contrast);
		border-color: var(--border-color);
		box-shadow: 2px 2px 0px var(--border-color);
		transform: translate(-1px, -1px);
	}

	.strip-day-card[data-disabled='true'] {
		opacity: 0.35;
		cursor: not-allowed;
		box-shadow: none;
		transform: none;
	}

	.toggle-card {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--bg-primary);
	}

	.toggle-card.active-toggle {
		background-color: var(--bg-secondary);
		box-shadow: inset 1px 1px 0px var(--border-color);
	}

	.chevron-toggle {
		width: 18px;
		height: 18px;
		transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.chevron-toggle.rotated {
		transform: rotate(180deg);
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

	/* Expansão Fluida CSS Grid 0fr -> 1fr */
	.calendar-expand-wrapper {
		display: grid;
		grid-template-rows: 0fr;
		transition: grid-template-rows 0.28s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.calendar-expand-wrapper.expanded {
		grid-template-rows: 1fr;
	}

	.calendar-expand-inner {
		overflow: hidden;
		min-height: 0;
		display: flex;
		flex-direction: column;
	}

	/* Grade Mensal */
	.calendar-month-grid {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding-top: var(--space-xs);
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
			transform 0.12s ease;
	}

	.month-day-cell[data-current-month='false'] {
		opacity: 0.35;
	}

	.month-day-cell[data-disabled='true'] {
		opacity: 0.25;
		cursor: not-allowed;
	}

	.month-day-cell:hover:not([data-disabled='true']):not([data-selected='true']) {
		background-color: var(--bg-secondary);
		border-color: var(--border-color);
	}

	.month-day-cell[data-selected='true'] {
		background-color: var(--color-primary);
		color: var(--color-primary-contrast);
		border-color: var(--border-color);
		box-shadow: 1px 1px 0px var(--border-color);
		transform: translate(-1px, -1px);
	}

	@media (prefers-reduced-motion: reduce) {
		.strip-day-card,
		.month-day-cell,
		.chevron-toggle,
		.calendar-expand-wrapper {
			transition: none;
		}
	}
</style>
