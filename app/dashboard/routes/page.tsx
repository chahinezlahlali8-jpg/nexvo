'use client';

import { useState, useMemo } from 'react';
import { PageHeader } from '@/components/dashboard/page-header';
import { ProgressBar } from '@/components/dashboard/badges';
import { cn } from '@/lib/utils';
import { routeConfig } from '@/lib/table-configs';
import { useCrud } from '@/hooks/use-crud';
import type { Route } from '@/lib/types';
import { Search, Navigation, Plus, CheckCircle2, Clock, AlertTriangle, MapPin, Truck, Weight, Loader2, AlertCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/lib/i18n/language-provider';

const statusConfig: Record<string, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  planned: { label: 'Planned', color: 'bg-muted text-muted-foreground', icon: Clock },
  active: { label: 'Active', color: 'bg-primary/15 text-primary', icon: Navigation },
  completed: { label: 'Completed', color: 'bg-success/15 text-success', icon: CheckCircle2 },
  delayed: { label: 'Delayed', color: 'bg-destructive/15 text-destructive', icon: AlertTriangle },
};

export default function RoutesPage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState('ALL');
  const { data: routes, loading, error, create } = useCrud<Route>(routeConfig, 'start_time');

  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    routeId: '',
    driver: '',
    vehicle: '',
    zone: '',
    stops: '0',
    distance: '0',
    estimatedDuration: '',
    startTime: '',
  });

  const filtered = useMemo(() =>
    routes.filter(r => {
      const matchesSearch = r.routeId.toLowerCase().includes(search.toLowerCase()) || r.driver.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || r.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
  , [search, statusFilter, routes]);

  const stats = useMemo(() => {
    if (!routes.length) return { total: 0, active: 0, completed: 0, totalWeight: 0 };
    return {
      total: routes.length,
      active: routes.filter(r => r.status === 'active').length,
      completed: routes.filter(r => r.status === 'completed').length,
      totalWeight: Math.round(routes.reduce((s, r) => s + r.collectedWeight, 0) * 10) / 10,
    };
  }, [routes]);

  const openModal = () => {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    setForm({
      routeId: `RT-${String(Date.now()).slice(-5)}`,
      driver: '',
      vehicle: '',
      zone: '',
      stops: '0',
      distance: '0',
      estimatedDuration: '',
      startTime: local,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.driver || !form.vehicle || !form.zone) {
      toast({ title: 'Missing fields', description: 'Driver, vehicle, and zone are required' });
      return;
    }
    setSaving(true);
    const created = await create({
      routeId: form.routeId,
      driver: form.driver,
      vehicle: form.vehicle,
      zone: form.zone,
      stops: parseInt(form.stops) || 0,
      distance: parseFloat(form.distance) || 0,
      estimatedDuration: form.estimatedDuration || '—',
      collectedWeight: 0,
      progress: 0,
      status: 'planned',
      startTime: form.startTime ? new Date(form.startTime).toISOString() : new Date().toISOString(),
    } as Partial<Route>);
    setSaving(false);
    if (created) {
      toast({ title: 'Route created', description: `${form.routeId} has been planned successfully` });
      setShowModal(false);
    } else {
      toast({ title: 'Failed to create route', description: 'Please try again' });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title={t.pageTitleRoutes} description={t.pageDescRoutes}>
        <button onClick={openModal} className="flex items-center gap-1.5 px-3 h-9 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" /> Plan Route
        </button>
      </PageHeader>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
          <AlertCircle className="w-4 h-4 shrink-0" /> {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading routes...
        </div>
      ) : (
      <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Routes', value: stats.total, icon: Navigation, color: 'text-foreground', bg: 'bg-card', border: 'border-border' },
          { label: 'Active', value: stats.active, icon: Navigation, color: 'text-primary', bg: 'bg-primary/5', border: 'border-primary/20' },
          { label: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'text-success', bg: 'bg-success/5', border: 'border-success/20' },
          { label: 'Collected Weight', value: `${stats.totalWeight}t`, icon: Weight, color: 'text-info', bg: 'bg-info/5', border: 'border-info/20' },
        ].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className={cn('rounded-xl border p-4', s.bg, s.border)}>
              <div className="flex items-center justify-between mb-1">
                <div className={cn('text-2xl font-display font-semibold', s.color)}>{s.value}</div>
                <Icon className={cn('w-5 h-5', s.color)} />
              </div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by route ID or driver..." className="w-full h-9 pl-9 pr-4 text-sm bg-card rounded-lg border border-border focus:outline-none focus:border-primary/40 transition-colors" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="h-9 px-3 text-sm bg-card rounded-lg border border-border focus:outline-none focus:border-primary/40 transition-colors cursor-pointer">
          <option value="ALL">All Statuses</option>
          <option value="planned">Planned</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="delayed">Delayed</option>
        </select>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left font-medium text-muted-foreground text-xs px-5 py-3">Route ID</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3">Driver</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3 hidden sm:table-cell">Vehicle</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3 hidden md:table-cell">Zone</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3 hidden lg:table-cell">Stops</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3 hidden lg:table-cell">Distance</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3">Progress</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-muted-foreground text-sm">
                    <Navigation className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    No routes found. Click "Plan Route" to create one.
                  </td>
                </tr>
              ) : filtered.map(r => {
                const cfg = statusConfig[r.status];
                const StatusIcon = cfg.icon;
                return (
                  <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3 font-mono text-xs text-foreground whitespace-nowrap">{r.routeId}</td>
                    <td className="px-3 py-3 font-medium text-foreground whitespace-nowrap">{r.driver}</td>
                    <td className="px-3 py-3 hidden sm:table-cell"><span className="flex items-center gap-1 text-muted-foreground"><Truck className="w-3.5 h-3.5" />{r.vehicle}</span></td>
                    <td className="px-3 py-3 hidden md:table-cell"><span className="flex items-center gap-1 text-muted-foreground"><MapPin className="w-3.5 h-3.5" />{r.zone}</span></td>
                    <td className="px-3 py-3 hidden lg:table-cell text-muted-foreground">{r.stops}</td>
                    <td className="px-3 py-3 hidden lg:table-cell text-muted-foreground">{r.distance}km</td>
                    <td className="px-3 py-3 w-28">
                      <div className="flex items-center gap-2">
                        <ProgressBar value={r.progress} className="w-16" barClassName={r.status === 'completed' ? 'bg-success' : r.status === 'delayed' ? 'bg-destructive' : 'bg-primary'} />
                        <span className="text-xs text-muted-foreground">{r.progress}%</span>
                      </div>
                    </td>
                    <td className="px-3 py-3"><span className={cn('flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium w-fit', cfg.color)}><StatusIcon className="w-3 h-3" />{cfg.label}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      </>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fade-in" onClick={() => setShowModal(false)}>
          <div className="bg-card rounded-xl border border-border shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="font-display font-semibold text-foreground">Plan New Route</h3>
              <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Route ID</label>
                  <input
                    type="text"
                    value={form.routeId}
                    onChange={e => setForm({ ...form, routeId: e.target.value })}
                    className="w-full h-9 px-3 text-sm bg-background rounded-lg border border-border focus:outline-none focus:border-primary/40 transition-colors font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Driver *</label>
                  <input
                    type="text"
                    value={form.driver}
                    onChange={e => setForm({ ...form, driver: e.target.value })}
                    placeholder="Driver name"
                    required
                    className="w-full h-9 px-3 text-sm bg-background rounded-lg border border-border focus:outline-none focus:border-primary/40 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Vehicle *</label>
                  <input
                    type="text"
                    value={form.vehicle}
                    onChange={e => setForm({ ...form, vehicle: e.target.value })}
                    placeholder="e.g. TC-001"
                    required
                    className="w-full h-9 px-3 text-sm bg-background rounded-lg border border-border focus:outline-none focus:border-primary/40 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Zone *</label>
                  <input
                    type="text"
                    value={form.zone}
                    onChange={e => setForm({ ...form, zone: e.target.value })}
                    placeholder="e.g. Zone 1 — Centre"
                    required
                    className="w-full h-9 px-3 text-sm bg-background rounded-lg border border-border focus:outline-none focus:border-primary/40 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Stops</label>
                  <input
                    type="number"
                    min="0"
                    value={form.stops}
                    onChange={e => setForm({ ...form, stops: e.target.value })}
                    className="w-full h-9 px-3 text-sm bg-background rounded-lg border border-border focus:outline-none focus:border-primary/40 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Distance (km)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={form.distance}
                    onChange={e => setForm({ ...form, distance: e.target.value })}
                    className="w-full h-9 px-3 text-sm bg-background rounded-lg border border-border focus:outline-none focus:border-primary/40 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Est. Duration</label>
                  <input
                    type="text"
                    value={form.estimatedDuration}
                    onChange={e => setForm({ ...form, estimatedDuration: e.target.value })}
                    placeholder="e.g. 2h 30m"
                    className="w-full h-9 px-3 text-sm bg-background rounded-lg border border-border focus:outline-none focus:border-primary/40 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Start Time</label>
                  <input
                    type="datetime-local"
                    value={form.startTime}
                    onChange={e => setForm({ ...form, startTime: e.target.value })}
                    className="w-full h-9 px-3 text-sm bg-background rounded-lg border border-border focus:outline-none focus:border-primary/40 transition-colors"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 h-9 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="flex items-center gap-1.5 px-4 h-9 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  Create Route
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
