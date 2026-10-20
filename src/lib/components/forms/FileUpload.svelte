<script lang="ts">
	import type { FileUploadProps } from '$lib/types/forms.js';
	import Upload from '$lib/components/icons/Upload.svelte';
	import FileText from '$lib/components/icons/FileText.svelte';
	import Trash from '$lib/components/icons/Trash.svelte';
	import AlertCircle from '$lib/components/icons/AlertCircle.svelte';
	import { getI18n } from '$lib/utils/i18n.svelte.js';

	let {
		files = $bindable([]),
		accept,
		multiple = false,
		maxSizeMb = 10,
		maxFiles,
		disabled = false,
		invalid = false,
		label,
		primaryText,
		secondaryText,
		onfiles,
		children,
		class: className = '',
		...restProps
	}: FileUploadProps = $props();

	const i18n = getI18n();
	let resolvedPrimaryText = $derived(primaryText ?? i18n.t('forms.upload_primary'));

	let fileInputEl = $state<HTMLInputElement>();
	let isDragging = $state(false);
	let errorMessage = $state<string | null>(null);

	function formatBytes(bytes: number): string {
		if (bytes === 0) return '0 B';
		const k = 1024;
		const sizes = ['B', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
	}

	function validateAndAddFiles(incoming: FileList | File[] | null | undefined) {
		if (!incoming || disabled) return;
		errorMessage = null;

		const validList: File[] = [];
		const maxBytes = maxSizeMb * 1024 * 1024;

		for (const file of Array.from(incoming)) {
			if (file.size > maxBytes) {
				errorMessage = i18n.t('forms.upload_file_size_error', {
					name: file.name,
					maxSize: maxSizeMb
				});
				continue;
			}
			validList.push(file);
		}

		if (validList.length === 0) return;

		let updated: File[];
		if (multiple) {
			const combined = [...files, ...validList];
			updated = maxFiles ? combined.slice(0, maxFiles) : combined;
			if (maxFiles && combined.length > maxFiles) {
				errorMessage = i18n.t('forms.upload_max_files_error', { maxFiles });
			}
		} else {
			updated = [validList[0]];
		}

		files = updated;
		onfiles?.(updated);
	}

	function handleDragOver(event: DragEvent) {
		if (disabled) return;
		event.preventDefault();
		isDragging = true;
	}

	function handleDragLeave(event: DragEvent) {
		if (disabled) return;
		event.preventDefault();
		isDragging = false;
	}

	function handleDrop(event: DragEvent) {
		if (disabled) return;
		event.preventDefault();
		isDragging = false;
		validateAndAddFiles(event.dataTransfer?.files);
	}

	function handleInputChange(event: Event) {
		const target = event.target as HTMLInputElement;
		validateAndAddFiles(target.files);
		target.value = '';
	}

	function removeFile(index: number, event: MouseEvent) {
		event.stopPropagation();
		if (disabled) return;
		files = files.filter((_, i) => i !== index);
		onfiles?.(files);
		errorMessage = null;
	}

	function handleZoneClick() {
		if (!disabled) {
			fileInputEl?.click();
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (disabled) return;
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			fileInputEl?.click();
		}
	}
</script>

<div class="file-upload-root {className}" class:disabled {...restProps}>
	<input
		bind:this={fileInputEl}
		type="file"
		class="sr-only"
		{accept}
		{multiple}
		{disabled}
		aria-label={label || i18n.t('forms.upload_input_label')}
		onchange={handleInputChange}
		tabindex="-1"
	/>

	<div
		role="button"
		tabindex={disabled ? -1 : 0}
		aria-disabled={disabled ? 'true' : undefined}
		aria-label={label || i18n.t('forms.upload_dropzone_label')}
		class="dropzone"
		class:dragging={isDragging}
		class:invalid={invalid || Boolean(errorMessage)}
		onclick={handleZoneClick}
		onkeydown={handleKeyDown}
		ondragover={handleDragOver}
		ondragleave={handleDragLeave}
		ondrop={handleDrop}
	>
		<div class="dropzone-content">
			<span class="icon-wrapper" aria-hidden="true">
				<Upload size={22} />
			</span>
			{#if children}
				{@render children()}
			{:else}
				<div class="text-content">
					<strong class="primary-text">{resolvedPrimaryText}</strong>
					<span class="secondary-text">
						{secondaryText ??
							(accept
								? `${accept.replace(/,/g, ', ')} até ${maxSizeMb}MB`
								: i18n.t('forms.upload_default_help', { maxSize: maxSizeMb }))}
					</span>
				</div>
			{/if}
		</div>
	</div>

	{#if errorMessage}
		<div class="error-banner" role="alert">
			<AlertCircle size={14} />
			<span>{errorMessage}</span>
		</div>
	{/if}

	{#if files.length > 0}
		<ul class="file-list" aria-label={i18n.t('forms.upload_selected_files')}>
			{#each files as file, index (file.name + file.size)}
				<li class="file-item">
					<span class="file-icon" aria-hidden="true">
						<FileText size={16} />
					</span>
					<div class="file-info">
						<span class="file-name" title={file.name}>{file.name}</span>
						<span class="file-size mono">{formatBytes(file.size)}</span>
					</div>
					{#if !disabled}
						<button
							type="button"
							class="remove-btn"
							aria-label={i18n.t('forms.upload_remove_file', { name: file.name })}
							onclick={(e) => removeFile(index, e)}
						>
							<Trash size={14} />
						</button>
					{/if}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.file-upload-root {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		width: 100%;
		font-family: var(--font-sans);
		box-sizing: border-box;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: 0;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	.dropzone {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-lg) var(--space-md);
		border-radius: var(--radius-xs);
		border: var(--border-width) dashed var(--border-strong);
		background-color: var(--bg-input);
		cursor: pointer;
		user-select: none;
		outline: none;
		box-sizing: border-box;
		transition:
			border-color var(--transition-fast),
			background-color var(--transition-fast),
			box-shadow var(--transition-fast);
	}

	.dropzone:hover:not(.disabled):not(:focus-visible) {
		border-color: var(--border-strong);
	}

	.dropzone:focus-visible {
		border-color: var(--color-primary);
		outline: none;
	}

	.dropzone.dragging {
		border-color: var(--color-primary);
		border-style: solid;
		background-color: var(--color-primary-subtle);
	}

	.dropzone.invalid {
		border-color: var(--color-danger);
	}

	.dropzone-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-xs);
		text-align: center;
	}

	.icon-wrapper {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: var(--color-primary);
	}

	.text-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-xxs);
	}

	.primary-text {
		font-size: var(--text-sm);
		color: var(--text-primary);
		font-weight: 600;
	}

	.secondary-text {
		font-size: var(--text-xs);
		color: var(--text-muted);
	}

	.file-upload-root.disabled .dropzone {
		opacity: 0.5;
		cursor: not-allowed;
		background-color: var(--bg-secondary);
	}

	.error-banner {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
		font-size: var(--text-xs);
		color: var(--color-danger);
		font-weight: 500;
	}

	.file-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-xxs);
		padding: 0;
		margin: 0;
		list-style: none;
	}

	.file-item {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		padding: var(--space-xs) var(--space-sm);
		background-color: var(--bg-secondary);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-xs);
		box-sizing: border-box;
	}

	.file-icon {
		display: inline-flex;
		color: var(--color-primary);
		flex-shrink: 0;
	}

	.file-info {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-width: 0;
	}

	.file-name {
		font-size: var(--text-sm);
		color: var(--text-primary);
		font-weight: 500;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.file-size {
		font-size: var(--text-xs);
		color: var(--text-muted);
	}

	.remove-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: calc(var(--base) * 1.5);
		height: calc(var(--base) * 1.5);
		min-width: calc(var(--base) * 1.5);
		min-height: calc(var(--base) * 1.5);
		padding: 0;
		border: none;
		background: transparent;
		color: var(--text-muted);
		cursor: pointer;
		border-radius: var(--radius-xs);
		transition:
			color var(--transition-fast),
			transform var(--transition-fast);
	}

	.remove-btn:hover {
		color: var(--color-danger);
		transform: scale(1.1);
	}

	.remove-btn:focus-visible {
		outline: 1px solid var(--color-danger);
	}

	@media (prefers-reduced-motion: reduce) {
		.dropzone,
		.remove-btn {
			transition: none;
		}
	}
</style>
