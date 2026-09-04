'use client';

import { useState, useMemo } from 'react';
import { PageHeader } from '@/components/dashboard/page-header';
import { cn } from '@/lib/utils';
import { wasteTypeLabels, formatTimeAgo } from '@/lib/mock-data';
import { weighbridgeConfig } from '@/lib/table-configs';
import { useCrud } from '@/hooks/use-crud';
import type { WeighbridgeTransaction } from '@/lib/types';
import { Search, Scale, Plus, Truck, Weight, ArrowRight, CheckCircle2, Clock, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/lib/i18n/language-provider';
import { CreateModal, type CreateField } from '@/components/dashboard/create-modal';

const wasteTypeOptions: { value: string; label: string }[] = [
  { value: 'GENERAL', label: 'General' },
  { value: 'ORGANIC', label: 'Organic' },
  { value: 'PLASTIC', label: 'Plastic' },
  { value: 'PAPER', label: 'Paper' },
  { value: 'CARDBOARD', label: 'Cardboard' },
  { value: 'GLASS', label: 'Glass' },
  { value: 'METAL', label: 'Metal' },
  { value: 'ELECTRONIC', label: 'Electronic' },
  { value: 'CONSTRUCTION', label: 'Construction' },
  { value: 'MEDICAL', label: 'Medical' },
  { value: 'HAZARDOUS', label: 'Hazardous' },
  { value: 'LARGE_WASTE', label: 'Large Waste' },
  { value: 'USED_OIL', label: 'Used Oil' },
  { value: 'OTHER', label: 'Other' },
];

const weighbridgeFields: CreateField[] = [
  { key: 'vehicle', label: 'Vehicle', type: 'text', required: true, placeholder: 'TC-001' },
  { key: 'driver', label: 'Driver', type: 'text', required: true, placeholder: 'Driver name' },
  { key: 'grossWeight', label: 'Gross Weight (kg)', type: 'number', required: true, defaultValue: '0', min: '0' },
  { key: 'tareWeight', label: 'Tare Weight (kg)', type: 'number', required: true, defaultValue: '0', min: '0' },
  { key: 'wasteType', label: 'Waste Type', type: 'select', required: true, options: wasteTypeOptions },
  { key: 'origin', label: 'Origin', type: 'text', placeholder: 'Zone 1' },
  { key: 'destination', label: 'Destination', type: 'text', placeholder: 'Transfer Station A' },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  entered: { label: 'Entered', color: 'bg-muted text-muted-foreground' },
  weighed: { label: 'Weighed', color: 'bg-info/15 text-info' },
  completed: { label: 'Completed', color: 'bg-success/15 text-success' },
};

export default function WeighbridgePage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const { toast } = useToast();
  const { data: weighbridgeTransactions, loading, error, create } = useCrud<WeighbridgeTransaction>(weighbridgeConfig, 'timestamp');
  const [showModal, setShowModal] = useState(false);

  const handleCreate = async (values: Record<string, string>) => {
    const gross = parseFloat(values.grossWeight) || 0;
    const tare = parseFloat(values.tareWeight) || 0;
    const created = await create({
      ticketId: `WB-${String(Date.now()).slice(-5)}`,
      vehicle: values.vehicle,
      driver: values.driver,
      grossWeight: gross,
      tareWeight: tare,
      netWeight: Math.max(0, gross - tare),
      wasteType: values.wasteType as WeighbridgeTransaction['wasteType'],
      origin: values.origin || '—',
      destination: values.destination || '—',
      timestamp: new Date().toISOString(),
      status: 'entered',
    } as Partial<WeighbridgeTransaction>);
    if (created) {
      toast({ title: 'Weighing recorded', description: `Ticket created for ${values.vehicle}` });
      return true;
    }
    toast({ title: 'Failed to record weighing', description: 'Please try again' });
    return false;
  };

  const filtered = useMemo(() =>
    weighbridgeTransactions.filter(t =>
      t.ticketId.toLowerCase().includes(search.toLowerCase()) ||
      t.vehicle.toLowerCase().includes(search.toLowerCase()) ||
      t.driver.toLowerCase().includes(search.toLowerCase())
    )
  , [search, weighbridgeTransactions]);

  const stats = useMemo(() => {
    if (!weighbridgeTransactions.length) return { total: 0, totalNet: 0, completed: 0, pending: 0 };
    return {
    total: weighbridgeTransactions.length,
    totalNet: weighbridgeTransactions.reduce((s, t) => s + t.netWeight, 0),
    completed: weighbridgeTransactions.filter(t => t.status === 'completed').length,
    pending: weighbridgeTransactions.filter(t => t.status !== 'completed').length,
    };
  }, [weighbridgeTransactions]);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title={t.pageTitleWeighbridge} description={t.pageDescWeighbridge}>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 px-3 h-9 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" /> New Weighing
        </button>
      </PageHeader>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
          <AlertCircle className="w-4 h-4 shrink-0" /> {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading weighbridge transactions...
        </div>
      ) : (
      <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Transactions Today', value: stats.total, icon: Scale, color: 'text-foreground', bg: 'bg-card', border: 'border-border' },
          { label: 'Total Net Weight', value: `${(stats.totalNet / 1000).toFixed(1)}t`, icon: Weight, color: 'text-info', bg: 'bg-info/5', border: 'border-info/20' },
          { label: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'text-success', bg: 'bg-success/5', border: 'border-success/20' },
          { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-warning', bg: 'bg-warning/5', border: 'border-warning/20' },
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

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by ticket ID, vehicle, or driver..." className="w-full h-9 pl-9 pr-4 text-sm bg-card rounded-lg border border-border focus:outline-none focus:border-primary/40 transition-colors" />
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left font-medium text-muted-foreground text-xs px-5 py-3">Ticket ID</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3">Vehicle</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3 hidden md:table-cell">Driver</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3">Gross</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3">Tare</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3">Net</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3 hidden lg:table-cell">Waste Type</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3 hidden xl:table-cell">Destination</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3">Status</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3 hidden sm:table-cell">Time</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => {
                const cfg = statusConfig[t.status];
                return (
                  <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3 font-mono text-xs text-foreground whitespace-nowrap">{t.ticketId}</td>
                    <td className="px-3 py-3"><span className="flex items-center gap-1 text-foreground"><Truck className="w-3.5 h-3.5 text-muted-foreground" />{t.vehicle}</span></td>
                    <td className="px-3 py-3 hidden md:table-cell text-muted-foreground whitespace-nowrap">{t.driver}</td>
                    <td className="px-3 py-3 text-foreground whitespace-nowrap">{t.grossWeight.toLocaleString()}kg</td>
                    <td className="px-3 py-3 text-muted-foreground whitespace-nowrap">{t.tareWeight.toLocaleString()}kg</td>
                    <td className="px-3 py-3 font-semibold text-foreground whitespace-nowrap">{t.netWeight.toLocaleString()}kg</td>
                    <td className="px-3 py-3 hidden lg:table-cell text-muted-foreground">{wasteTypeLabels[t.wasteType]}</td>
                    <td className="px-3 py-3 hidden xl:table-cell"><span className="flex items-center gap-1 text-muted-foreground"><ArrowRight className="w-3 h-3" />{t.destination}</span></td>
                    <td className="px-3 py-3"><span className={cn('inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium', cfg.color)}>{cfg.label}</span></td>
                    <td className="px-3 py-3 hidden sm:table-cell text-xs text-muted-foreground whitespace-nowrap">{formatTimeAgo(t.timestamp)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      </>
      )}

      <CreateModal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="New Weighing"
        fields={weighbridgeFields}
        onSubmit={handleCreate}
        submitLabel="Record Weighing"
      />
    </div>
  );
}
