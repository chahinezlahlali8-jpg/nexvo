'use client';

import { StatCard } from '@/components/dashboard/stat-card';
import { PageHeader } from '@/components/dashboard/page-header';
import { StatusBadge, PriorityBadge, ProgressBar } from '@/components/dashboard/badges';
import { useLanguage } from '@/lib/i18n/language-provider';
import { kpiData, zones, wasteByType, monthlyCollection, activityFeed, citizenReports, workOrders, vehicles, priorityBadgeClass, reportStatusBadgeClass, reportTypeLabels, statusLabels, priorityLabels } from '@/lib/mock-data';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  Activity, AlertTriangle, FileText, Truck, Clock,
  MapPin, ArrowUpRight, Zap, type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ReportType, ReportStatus, Priority } from '@/lib/types';

export default function DashboardPage() {
  const { t, isRtl, locale } = useLanguage();

  const activeReports = citizenReports.filter(r => !['RESOLVED', 'CLOSED', 'REJECTED', 'DUPLICATE'].includes(r.status)).length;
  const activeWorkOrders = workOrders.filter(w => !['COMPLETED', 'CANCELLED'].includes(w.status)).length;
  const activeVehicles = vehicles.filter(v => v.status === 'ON_ROUTE' || v.status === 'LOADING').length;
  const criticalReports = citizenReports.filter(r => r.priority === 'CRITICAL').length;
  const slaBreaches = workOrders.filter(w => w.slaStatus === 'BREACHED').length;

  const kpiLabels: Record<string, string> = {
    'Waste Collected': t.kpiWasteCollected,
    'Recycling Rate': t.kpiRecyclingRate,
    'Active Reports': t.kpiActiveReports,
    'SLA Compliance': t.kpiSlaCompliance,
    'Fleet Active': t.kpiFleetActive,
    'Avg Response': t.kpiAvgResponse,
  };

  const wasteTypeTranslations: Record<string, string> = {
    'Organic': t.wtOrganic,
    'Plastic': t.wtPlastic,
    'Paper': t.wtPaper,
    'Glass': t.wtGlass,
    'Metal': t.wtMetal,
    'Other': t.wtOther,
  };

  const zoneTranslations: Record<string, string> = {
    'Zone 1 — Centre': t.zoneCentre,
    'Zone 2 — Nord': t.zoneNord,
    'Zone 3 — Est': t.zoneEst,
    'Zone 4 — Sud': t.zoneSud,
    'Zone 5 — Ouest': t.zoneOuest,
  };

  const reportTypeTranslationKey: Record<ReportType, string> = {
    overflowing_container: t.rtOverflowingContainer,
    illegal_dumping: t.rtIllegalDumping,
    missed_collection: t.rtMissedCollection,
    damaged_container: t.rtDamagedContainer,
    waste_scattered: t.rtWasteScattered,
    large_waste: t.rtLargeWaste,
    hazardous_waste: t.rtHazardousWaste,
    bad_smell: t.rtBadSmell,
    other: t.rtOther,
  };

  const reportStatusTranslationKey: Record<ReportStatus, string> = {
    SUBMITTED: t.rsSubmitted,
    RECEIVED: t.rsReceived,
    AI_REVIEW: t.rsAiReview,
    VERIFIED: t.rsVerified,
    ASSIGNED: t.rsAssigned,
    EN_ROUTE: t.rsEnRoute,
    IN_PROGRESS: t.rsInProgress,
    RESOLVED: t.rsResolved,
    REJECTED: t.rsRejected,
    DUPLICATE: t.rsDuplicate,
    CLOSED: t.rsClosed,
  };

  const priorityTranslationKey: Record<Priority, string> = {
    CRITICAL: t.prCritical,
    HIGH: t.prHigh,
    NORMAL: t.prNormal,
    LOW: t.prLow,
  };

  const alertItems = [
    { label: t.criticalReports, value: criticalReports, icon: AlertTriangle, iconClass: 'text-destructive', bgClass: 'bg-destructive/10' },
    { label: t.activeWorkOrders, value: activeWorkOrders, icon: Clock, iconClass: 'text-primary', bgClass: 'bg-primary/10' },
    { label: t.trucksOnRoute, value: activeVehicles, icon: Truck, iconClass: 'text-info', bgClass: 'bg-info/10' },
    { label: t.slaBreaches, value: slaBreaches, icon: Zap, iconClass: 'text-warning', bgClass: 'bg-warning/10' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title={t.commandCenter}
        description={t.commandCenterDesc}
      >
        <div className="flex items-center gap-2 px-3 h-9 rounded-lg bg-success/10 text-success text-sm font-medium">
          <span className="relative w-2 h-2 rounded-full bg-success">
            <span className="absolute inset-0 rounded-full bg-success animate-ping opacity-75" />
          </span>
          {t.live}
        </div>
      </PageHeader>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiData.map((kpi) => (
          <StatCard key={kpi.label} {...kpi} label={kpiLabels[kpi.label] || kpi.label} positiveIsGood={kpi.label !== 'Active Reports' && kpi.label !== 'Avg Response'} />
        ))}
      </div>

      {/* Alerts strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {alertItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center gap-3 bg-card rounded-xl border border-border p-4">
              <div className={cn('flex items-center justify-center w-10 h-10 rounded-lg', item.bgClass)}>
                <Icon className={cn('w-5 h-5', item.iconClass)} />
              </div>
              <div>
                <div className="text-xl font-display font-semibold">{item.value}</div>
                <div className="text-xs text-muted-foreground">{item.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly collection chart */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <h3 className="font-display font-semibold text-foreground">{t.collectionTrends}</h3>
              <p className="text-xs text-muted-foreground">{t.collectionTrendsDesc}</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-primary" />{t.collected}</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-info" />{t.recycled}</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-warning" />{t.landfilled}</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={monthlyCollection} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="collectedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="recycledGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--info))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--info))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="landfilledGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--warning))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--warning))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Area type="monotone" dataKey="collected" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#collectedGrad)" />
              <Area type="monotone" dataKey="recycled" stroke="hsl(var(--info))" strokeWidth={2} fill="url(#recycledGrad)" />
              <Area type="monotone" dataKey="landfilled" stroke="hsl(var(--warning))" strokeWidth={2} fill="url(#landfilledGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Waste by type pie */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-display font-semibold text-foreground mb-1">{t.wasteComposition}</h3>
          <p className="text-xs text-muted-foreground mb-4">{t.wasteCompositionDesc}</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={wasteByType}
                dataKey="tons"
                nameKey="type"
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={75}
                paddingAngle={2}
              >
                {wasteByType.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {wasteByType.map((w) => (
              <div key={w.type} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: w.color }} />
                <span className="text-muted-foreground flex-1 truncate">{wasteTypeTranslations[w.type] || w.type}</span>
                <span className="font-medium">{w.tons}t</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Zone performance + Activity feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Zone performance */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-5">
          <h3 className="font-display font-semibold text-foreground mb-1">{t.zonePerformance}</h3>
          <p className="text-xs text-muted-foreground mb-4">{t.zonePerformanceDesc}</p>
          <div className="space-y-3">
            {zones.map((zone) => (
              <div key={zone.zone} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 rounded-lg hover:bg-muted/40 transition-colors">
                <div className="flex items-center gap-2 sm:w-44 shrink-0">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium truncate">{zoneTranslations[zone.zone] || zone.zone}</span>
                </div>
                <div className="flex-1 grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">{t.reports}</div>
                    <div className="text-sm font-semibold">{zone.reports}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">{t.recycled} {zone.recyclingRate}%</div>
                    <ProgressBar value={zone.recyclingRate} barClassName="bg-success" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">{t.kpiSlaCompliance} {zone.slaCompliance}%</div>
                    <ProgressBar
                      value={zone.slaCompliance}
                      barClassName={zone.slaCompliance >= 95 ? 'bg-success' : zone.slaCompliance >= 90 ? 'bg-warning' : 'bg-destructive'}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-foreground">{t.liveActivity}</h3>
            <Activity className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="space-y-3 max-h-[400px] overflow-y-auto scrollbar-thin pr-1">
            {activityFeed.map((item) => {
              return (
                <div key={item.id} className="flex gap-3">
                  <div className={cn('flex items-center justify-center w-8 h-8 rounded-lg shrink-0',
                    item.type === 'report' ? 'text-info bg-info/10' :
                    item.type === 'workorder' ? 'text-primary bg-primary/10' :
                    item.type === 'collection' ? 'text-success bg-success/10' :
                    item.type === 'alert' ? 'text-warning bg-warning/10' :
                    item.type === 'vehicle' ? 'text-muted-foreground bg-muted' :
                    'text-chart-4 bg-chart-4/10'
                  )}>
                    {(() => {
                      const Icon = item.type === 'report' ? FileText :
                        item.type === 'workorder' ? Clock :
                        item.type === 'collection' ? Truck :
                        item.type === 'alert' ? AlertTriangle :
                        item.type === 'vehicle' ? Truck : FileText;
                      return <Icon className="w-4 h-4" />;
                    })()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-foreground leading-relaxed">{item.message}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-muted-foreground">{item.time}</span>
                      {item.priority && (
                        <span className={cn(
                          'text-[10px] px-1 rounded font-medium',
                          item.priority === 'CRITICAL' ? 'text-destructive' : item.priority === 'HIGH' ? 'text-warning' : 'text-muted-foreground'
                        )}>
                          {priorityTranslationKey[item.priority as Priority] || item.priority}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent reports table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <h3 className="font-display font-semibold text-foreground">{t.recentCitizenReports}</h3>
            <p className="text-xs text-muted-foreground">{t.recentCitizenReportsDesc}</p>
          </div>
          <a href="/dashboard/reports" className="flex items-center gap-1 text-xs text-primary hover:underline font-medium">
            {t.viewAll} <ArrowUpRight className="w-3 h-3 ltr-flip" />
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left font-medium text-muted-foreground text-xs px-5 py-3">{t.reportId}</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3 hidden md:table-cell">{t.type}</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3 hidden lg:table-cell">{t.location}</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3">{t.priority}</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3">{t.status}</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3 hidden sm:table-cell">{t.time}</th>
              </tr>
            </thead>
            <tbody>
              {citizenReports.slice(0, 8).map((report) => (
                <tr key={report.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3 font-mono text-xs text-foreground">{report.reportId}</td>
                  <td className="px-3 py-3 hidden md:table-cell text-foreground">{reportTypeTranslationKey[report.type] || report.type}</td>
                  <td className="px-3 py-3 hidden lg:table-cell text-muted-foreground">{report.location}</td>
                  <td className="px-3 py-3">
                    <PriorityBadge label={priorityTranslationKey[report.priority] || report.priority} className={priorityBadgeClass[report.priority]} />
                  </td>
                  <td className="px-3 py-3">
                    <StatusBadge
                      label={reportStatusTranslationKey[report.status] || report.status}
                      className={reportStatusBadgeClass[report.status]}
                    />
                  </td>
                  <td className="px-3 py-3 hidden sm:table-cell text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(report.submittedAt).toLocaleString(locale === 'ar' ? 'ar-DZ' : locale === 'fr' ? 'fr-FR' : 'en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
