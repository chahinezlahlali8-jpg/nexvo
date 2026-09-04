'use client';

import { useState, useMemo } from 'react';
import { PageHeader } from '@/components/dashboard/page-header';
import { PriorityBadge } from '@/components/dashboard/badges';
import { cn } from '@/lib/utils';
import { wasteTypeLabels, priorityBadgeClass } from '@/lib/mock-data';
import { requestConfig } from '@/lib/table-configs';
import { useCrud } from '@/hooks/use-crud';
import type { CollectionRequest } from '@/lib/types';
import { Search, Plus, ClipboardList, Clock, Truck, CheckCircle2, Package, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
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

const priorityOptions = [
  { value: 'CRITICAL', label: 'Critical' },
  { value: 'HIGH', label: 'High' },
  { value: 'NORMAL', label: 'Normal' },
  { value: 'LOW', label: 'Low' },
];

const requestFields: CreateField[] = [
  { key: 'business', label: 'Business', type: 'text', required: true, placeholder: 'Acme Corp' },
  { key: 'wasteType', label: 'Waste Type', type: 'select', required: true, options: wasteTypeOptions },
  { key: 'quantity', label: 'Quantity (kg)', type: 'number', required: true, defaultValue: '100', min: '0' },
  { key: 'container', label: 'Container', type: 'text', placeholder: 'CNT-001' },
  { key: 'location', label: 'Location', type: 'text', required: true, placeholder: '123 Main St' },
  { key: 'preferredDate', label: 'Preferred Date', type: 'date' },
  { key: 'priority', label: 'Priority', type: 'select', required: true, options: priorityOptions, defaultValue: 'NORMAL' },
  { key: 'notes', label: 'Notes', type: 'text', placeholder: 'Additional info' },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  pending: { label: 'Pending', color: 'bg-warning/15 text-warning' },
  priced: { label: 'Priced', color: 'bg-info/15 text-info' },
  dispatched: { label: 'Dispatched', color: 'bg-primary/15 text-primary' },
  collected: { label: 'Collected', color: 'bg-accent/15 text-accent' },
  completed: { label: 'Completed', color: 'bg-success/15 text-success' },
  cancelled: { label: 'Cancelled', color: 'bg-muted text-muted-foreground' },
};

export default function RequestsPage() {
  const [search, setSearch] = useState('');
  const { toast } = useToast();
  const { data: collectionRequests, loading, error, create } = useCrud<CollectionRequest>(requestConfig, 'request_id');
  const [showModal, setShowModal] = useState(false);

  const handleCreate = async (values: Record<string, string>) => {
    const created = await create({
      requestId: `REQ-${String(Date.now()).slice(-5)}`,
      business: values.business,
      wasteType: values.wasteType as CollectionRequest['wasteType'],
      quantity: parseFloat(values.quantity) || 0,
      container: values.container || '—',
      location: values.location,
      preferredDate: values.preferredDate || new Date().toISOString().slice(0, 10),
      priority: values.priority as CollectionRequest['priority'],
      status: 'pending',
      notes: values.notes,
    } as Partial<CollectionRequest>);
    if (created) {
      toast({ title: 'Request created', description: `Collection request for ${values.business} has been submitted` });
      return true;
    }
    toast({ title: 'Failed to create request', description: 'Please try again' });
    return false;
  };

  const filtered = useMemo(() =>
    collectionRequests.filter(r =>
      r.business.toLowerCase().includes(search.toLowerCase()) ||
      r.requestId.toLowerCase().includes(search.toLowerCase())
    )
  , [search, collectionRequests]);

  const stats = useMemo(() => {
    if (!collectionRequests.length) return { total: 0, pending: 0, dispatched: 0, completed: 0 };
    return {
    total: collectionRequests.length,
    pending: collectionRequests.filter(r => r.status === 'pending').length,
    dispatched: collectionRequests.filter(r => r.status === 'dispatched').length,
    completed: collectionRequests.filter(r => r.status === 'completed').length,
    };
  }, [collectionRequests]);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Collection Requests" description="B2B waste collection requests from businesses">
        <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 px-3 h-9 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" /> New Request
        </button>
      </PageHeader>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
          <AlertCircle className="w-4 h-4 shrink-0" /> {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading requests...
        </div>
      ) : (
      <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Requests', value: stats.total, icon: ClipboardList, color: 'text-foreground', bg: 'bg-card', border: 'border-border' },
          { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-warning', bg: 'bg-warning/5', border: 'border-warning/20' },
          { label: 'Dispatched', value: stats.dispatched, icon: Truck, color: 'text-primary', bg: 'bg-primary/5', border: 'border-primary/20' },
          { label: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'text-success', bg: 'bg-success/5', border: 'border-success/20' },
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
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by business or request ID..."
          className="w-full h-9 pl-9 pr-4 text-sm bg-card rounded-lg border border-border focus:outline-none focus:border-primary/40 transition-colors"
        />
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left font-medium text-muted-foreground text-xs px-5 py-3">Request ID</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3">Business</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3 hidden md:table-cell">Waste Type</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3">Quantity</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3">Priority</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3">Status</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3 hidden lg:table-cell">Price</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3 hidden sm:table-cell">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => {
                const cfg = statusConfig[r.status];
                return (
                  <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3 font-mono text-xs text-foreground whitespace-nowrap">{r.requestId}</td>
                    <td className="px-3 py-3 font-medium text-foreground whitespace-nowrap">{r.business}</td>
                    <td className="px-3 py-3 hidden md:table-cell text-muted-foreground">{wasteTypeLabels[r.wasteType]}</td>
                    <td className="px-3 py-3 text-foreground whitespace-nowrap">{r.quantity}kg</td>
                    <td className="px-3 py-3"><PriorityBadge label={r.priority} className={priorityBadgeClass[r.priority]} /></td>
                    <td className="px-3 py-3"><span className={cn('inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium', cfg.color)}>{cfg.label}</span></td>
                    <td className="px-3 py-3 hidden lg:table-cell text-foreground whitespace-nowrap">{r.price ? `${r.price.toLocaleString()} DZD` : '—'}</td>
                    <td className="px-3 py-3 hidden sm:table-cell text-xs text-muted-foreground whitespace-nowrap">{r.preferredDate}</td>
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
        title="New Collection Request"
        fields={requestFields}
        onSubmit={handleCreate}
        submitLabel="Create Request"
      />
    </div>
  );
}
