'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/i18n/language-provider';
import type { Translation } from '@/lib/i18n/translations';
import {
  LayoutDashboard, ClipboardList, Map, Trash2, Recycle,
  Truck, BarChart3, Bot, Settings, ShieldCheck, Bell,
  Building2, FileText, CreditCard, Package, Store,
  Users, Route, Scale, ArrowRightLeft,
  ScrollText, Wrench, Navigation, MapPin, Trophy,
  type LucideIcon,
} from 'lucide-react';

interface NavItem {
  labelKey: keyof Translation;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

interface NavSection {
  labelKey: keyof Translation;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    labelKey: 'navMain',
    items: [
      { labelKey: 'dashboard', href: '/dashboard', icon: LayoutDashboard },
      { labelKey: 'liveMap', href: '/dashboard/dispatch', icon: Map },
    ],
  },
  {
    labelKey: 'navOperations',
    items: [
      { labelKey: 'citizenReports', href: '/dashboard/reports', icon: ClipboardList, badge: '234' },
      { labelKey: 'workOrders', href: '/dashboard/work-orders', icon: Bell, badge: '40' },
      { labelKey: 'routes', href: '/dashboard/routes', icon: Navigation },
      { labelKey: 'containers', href: '/dashboard/containers', icon: Trash2 },
    ],
  },
  {
    labelKey: 'navWasteFlow',
    items: [
      { labelKey: 'collections', href: '/dashboard/collections', icon: Recycle },
      { labelKey: 'weighbridge', href: '/dashboard/weighbridge', icon: Scale },
      { labelKey: 'transferStations', href: '/dashboard/transfer-stations', icon: ArrowRightLeft },
    ],
  },
  {
    labelKey: 'navRecycling',
    items: [
      { labelKey: 'recyclingCenters', href: '/dashboard/recycling', icon: Recycle },
      { labelKey: 'materialsInventory', href: '/dashboard/materials', icon: Package },
      { labelKey: 'marketplace', href: '/dashboard/marketplace', icon: Store },
    ],
  },
  {
    labelKey: 'navFleet',
    items: [
      { labelKey: 'vehicles', href: '/dashboard/fleet', icon: Truck },
      { labelKey: 'drivers', href: '/dashboard/drivers', icon: Users },
      { labelKey: 'maintenance', href: '/dashboard/maintenance', icon: Wrench },
    ],
  },
  {
    labelKey: 'navB2B',
    items: [
      { labelKey: 'businesses', href: '/dashboard/businesses', icon: Building2 },
      { labelKey: 'contracts', href: '/dashboard/contracts', icon: FileText },
      { labelKey: 'collectionRequests', href: '/dashboard/requests', icon: ClipboardList },
      { labelKey: 'invoices', href: '/dashboard/invoices', icon: FileText },
      { labelKey: 'payments', href: '/dashboard/payments', icon: CreditCard },
    ],
  },
  {
    labelKey: 'navCitizen',
    items: [
      { labelKey: 'ecoPoints', href: '/dashboard/eco-points', icon: Trophy },
    ],
  },
  {
    labelKey: 'navInsights',
    items: [
      { labelKey: 'analytics', href: '/dashboard/analytics', icon: BarChart3 },
      { labelKey: 'aiCopilot', href: '/dashboard/ai', icon: Bot },
    ],
  },
  {
    labelKey: 'navAdministration',
    items: [
      { labelKey: 'usersRoles', href: '/dashboard/users', icon: ShieldCheck },
      { labelKey: 'auditLogs', href: '/dashboard/audit', icon: ScrollText },
      { labelKey: 'settings', href: '/dashboard/settings', icon: Settings },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { t, isRtl } = useLanguage();

  return (
    <aside className={cn(
      "hidden lg:flex flex-col w-64 bg-sidebar text-sidebar-foreground fixed inset-y-0 z-40 border-r border-white/5",
      isRtl ? "right-0" : "left-0"
    )}>
      <Link href="/dashboard" className="flex items-center gap-3 px-5 h-16 border-b border-white/5 transition-colors hover:bg-white/5 shrink-0">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-sidebar-accent">
          <Recycle className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="font-display font-semibold text-white text-sm tracking-tight">{t.appName}</div>
          <div className="text-[10px] text-white/40 uppercase tracking-wider">{t.appTagline}</div>
        </div>
      </Link>

      <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4 space-y-4">
        {navSections.map((section) => (
          <div key={section.labelKey}>
            <div className="px-3 mb-1.5 text-[10px] font-medium text-white/30 uppercase tracking-wider">
              {t[section.labelKey]}
            </div>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200',
                      active
                        ? 'bg-sidebar-accent/20 text-white shadow-sm'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    )}
                  >
                    <Icon className={cn('w-4 h-4 shrink-0', active && 'text-sidebar-accent')} />
                    <span className="flex-1 truncate">{t[item.labelKey]}</span>
                    {item.badge && (
                      <span className={cn(
                        'text-[10px] font-medium px-1.5 py-0.5 rounded',
                        active ? 'bg-sidebar-accent/30 text-white' : 'bg-white/10 text-white/50'
                      )}>
                        {item.badge}
                      </span>
                    )}
                    {active && <div className="w-1 h-1 rounded-full bg-sidebar-accent" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="px-3 py-3 border-t border-white/5 shrink-0">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sidebar-accent/30">
            <MapPin className="w-4 h-4 text-sidebar-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-white truncate">{t.algerCentre}</div>
            <div className="text-[10px] text-white/40 truncate">{t.wilayaZone}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
