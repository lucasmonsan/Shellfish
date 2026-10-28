import { describe, it, expect } from 'vitest';
import { render } from 'svelte/server';
import Spinner from '$lib/components/feedback/Spinner.svelte';
import {
	Sun,
	SunIcon,
	Moon,
	Globe,
	Search,
	X,
	Check,
	CheckIcon,
	ChevronDown,
	ChevronUp,
	ChevronLeft,
	ChevronRight,
	ArrowRight,
	Trash,
	Pencil,
	Plus,
	PlusIcon,
	Minus,
	Eye,
	EyeOff,
	AlertCircle,
	CheckCircle,
	Copy,
	User,
	Settings,
	LogOut,
	FileText,
	FileTextIcon,
	Folder,
	Lock,
	Unlock,
	RotateCw,
	Save,
	Download,
	Upload,
	ListBullets,
	BarChart,
	DotsThreeVertical,
	Sparkles,
	Zap,
	Construction,
	ConstructionIcon,
	Lightbulb,
	LightbulbIcon,
	Droplet,
	DropletIcon,
	Bus,
	BusIcon,
	HeartPulse,
	HeartPulseIcon,
	PawPrint,
	PawPrintIcon,
	Megaphone,
	MegaphoneIcon,
	MapPin,
	MapPinIcon,
	Mail,
	MailIcon
} from '$lib/components/icons/index.js';

describe('Spinner Component (spinCube)', () => {
	it('renders with role="status", accessible label, and spinCube style', () => {
		const result = render(Spinner, {
			props: {
				label: 'Processando...'
			}
		});

		expect(result.body).toContain('role="status"');
		expect(result.body).toContain('aria-live="polite"');
		expect(result.body).toContain('Processando...');
		expect(result.body).toContain('spinner');
	});

	it('applies fluid preset size classes (sm, md, lg)', () => {
		const sm = render(Spinner, { props: { size: 'sm' } });
		expect(sm.body).toContain('spinner sm');

		const md = render(Spinner, { props: { size: 'md' } });
		expect(md.body).toContain('spinner md');

		const lg = render(Spinner, { props: { size: 'lg' } });
		expect(lg.body).toContain('spinner lg');
	});

	it('applies custom numeric size in px', () => {
		const custom = render(Spinner, { props: { size: 40 } });
		expect(custom.body).toContain('width: 40px; height: 40px;');
	});
});

describe('Curated Vector Icons', () => {
	const icons = [
		{ name: 'Sun', component: Sun },
		{ name: 'Moon', component: Moon },
		{ name: 'Globe', component: Globe },
		{ name: 'Search', component: Search },
		{ name: 'X', component: X },
		{ name: 'Check', component: Check },
		{ name: 'ChevronDown', component: ChevronDown },
		{ name: 'ChevronUp', component: ChevronUp },
		{ name: 'ChevronLeft', component: ChevronLeft },
		{ name: 'ChevronRight', component: ChevronRight },
		{ name: 'ArrowRight', component: ArrowRight },
		{ name: 'Trash', component: Trash },
		{ name: 'Pencil', component: Pencil },
		{ name: 'Plus', component: Plus },
		{ name: 'Minus', component: Minus },
		{ name: 'Eye', component: Eye },
		{ name: 'EyeOff', component: EyeOff },
		{ name: 'AlertCircle', component: AlertCircle },
		{ name: 'CheckCircle', component: CheckCircle },
		{ name: 'Copy', component: Copy },
		{ name: 'User', component: User },
		{ name: 'Settings', component: Settings },
		{ name: 'LogOut', component: LogOut },
		{ name: 'FileText', component: FileText },
		{ name: 'Folder', component: Folder },
		{ name: 'Lock', component: Lock },
		{ name: 'Unlock', component: Unlock },
		{ name: 'RotateCw', component: RotateCw },
		{ name: 'Save', component: Save },
		{ name: 'Download', component: Download },
		{ name: 'Upload', component: Upload },
		{ name: 'ListBullets', component: ListBullets },
		{ name: 'BarChart', component: BarChart },
		{ name: 'DotsThreeVertical', component: DotsThreeVertical },
		{ name: 'Sparkles', component: Sparkles },
		{ name: 'Zap', component: Zap },
		{ name: 'Construction', component: Construction },
		{ name: 'Lightbulb', component: Lightbulb },
		{ name: 'Droplet', component: Droplet },
		{ name: 'Bus', component: Bus },
		{ name: 'HeartPulse', component: HeartPulse },
		{ name: 'PawPrint', component: PawPrint },
		{ name: 'Megaphone', component: Megaphone },
		{ name: 'MapPin', component: MapPin },
		{ name: 'Mail', component: Mail }
	];

	for (const { name, component } of icons) {
		it(`renders <svg> for ${name} with default decorative mode`, () => {
			const result = render(component);
			expect(result.body).toContain('<svg');
			expect(result.body).toContain('width="20"');
			expect(result.body).toContain('height="20"');
			expect(result.body).toContain('stroke="currentColor"');
			expect(result.body).toContain('aria-hidden="true"');
			expect(result.body).not.toContain('shellfish-icon');
		});

		it(`renders ${name} with accessible aria-label when provided`, () => {
			const result = render(component, {
				props: {
					ariaLabel: `Ação ${name}`,
					size: 28,
					color: 'var(--color-primary)'
				}
			});

			expect(result.body).toContain('aria-label="Ação ' + name + '"');
			expect(result.body).toContain('width="28"');
			expect(result.body).toContain('stroke="var(--color-primary)"');
			expect(result.body).toContain('role="img"');
			expect(result.body).not.toContain('aria-hidden="true"');
		});
	}

	it('supports dual naming convention (Check and CheckIcon, Sun and SunIcon)', () => {
		expect(Check).toBe(CheckIcon);
		expect(Sun).toBe(SunIcon);
		expect(Plus).toBe(PlusIcon);
		expect(FileText).toBe(FileTextIcon);
		expect(Construction).toBe(ConstructionIcon);
		expect(Lightbulb).toBe(LightbulbIcon);
		expect(Droplet).toBe(DropletIcon);
		expect(Bus).toBe(BusIcon);
		expect(HeartPulse).toBe(HeartPulseIcon);
		expect(PawPrint).toBe(PawPrintIcon);
		expect(Megaphone).toBe(MegaphoneIcon);
		expect(MapPin).toBe(MapPinIcon);
		expect(Mail).toBe(MailIcon);
	});
});
