<script lang="ts">
	import type { FormFieldProps } from '$lib/types/forms.js';

	let {
		label,
		forId,
		helper,
		error,
		required = false,
		disabled = false,
		helperId,
		errorId,
		extra,
		children,
		control,
		class: className = '',
		...restProps
	}: FormFieldProps = $props();

	let resolvedHelperId = $derived(helper ? (helperId ?? `${forId}-helper`) : undefined);
	let resolvedErrorId = $derived(error ? (errorId ?? `${forId}-error`) : undefined);
	let describedby = $derived(
		[resolvedHelperId, resolvedErrorId].filter(Boolean).join(' ') || undefined
	);
	let invalid = $derived(Boolean(error));
</script>

<div class="form-field {className}" class:disabled class:invalid {...restProps}>
	<div class="label-row">
		<label for={forId}>
			<span class="label-text">{label}</span>
			{#if required}
				<span class="required-indicator" aria-hidden="true">*</span>
			{/if}
		</label>

		{#if extra}
			<div class="label-extra">
				{@render extra()}
			</div>
		{/if}
	</div>

	<div class="control-area">
		{#if control}
			{@render control({ id: forId, describedby, invalid, required, disabled })}
		{:else if children}
			{@render children()}
		{/if}
	</div>

	{#if error}
		<p id={resolvedErrorId} class="field-message error-message" role="alert">
			{error}
		</p>
	{:else if helper}
		<p id={resolvedHelperId} class="field-message helper-message">
			{helper}
		</p>
	{/if}
</div>

<style>
	.form-field {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		width: 100%;
		box-sizing: border-box;
	}

	.label-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-xs);
		min-width: 0;
	}

	label {
		display: inline-flex;
		align-items: center;
		font-family: var(--font-sans);
		font-size: var(--text-xs);
		font-weight: 700;
		color: var(--text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		line-height: var(--leading-none);
		cursor: pointer;
		user-select: none;
	}

	.required-indicator {
		color: var(--color-danger);
		margin-left: var(--space-xxs);
		font-weight: 700;
	}

	.label-extra {
		margin-left: auto;
		display: inline-flex;
		align-items: center;
		font-size: var(--text-xs);
		color: var(--text-secondary);
	}

	.control-area {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.field-message {
		margin: 0;
		font-family: var(--font-sans);
		font-size: var(--text-xs);
		line-height: var(--leading-tight);
	}

	.helper-message {
		color: var(--text-secondary);
	}

	.error-message {
		color: var(--color-danger-text, var(--color-danger));
		font-weight: 600;
	}

	.disabled label {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
