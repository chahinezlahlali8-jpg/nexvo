'use client';

import { useState, useMemo } from 'react';
import { PageHeader } from '@/components/dashboard/page-header';
import { cn } from '@/lib/utils';
import { paymentConfig } from '@/lib/table-configs';
import { useCrud } from '@/hooks/use-crud';
import type { Payment } from '@/lib/types';
import { Search, Download, CreditCard, CheckCircle2, Clock, XCircle, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const statusConfig: Record<string, { color: string; icon: typeof CheckCircle2 }> = {
  completed: { color: 'text-success bg-success/10', icon: CheckCircle2 },
  pending: { color: 'text-warning bg-warning/10', icon: Clock },
  failed: { color: 'text-destructive bg-destructive/10', icon: XCircle },
};

export default function PaymentsPage() {
  const [search, setSearch] = useState('');
  const { toast } = useToast();
  const { data: payments, loading, error } = useCrud<Payment>(paymentConfig, 'date');

  const filtered = useMemo(() =>
    payments.filter(p => p.paymentId.toLowerCase().includes(search.toLowerCase()) || p.customer.toLowerCase().includes(search.toLowerCase()))
  , [search, payments]);

  const stats = useMemo(() => {
    if (!payments.length) return { total: 0, completed: 0, pending: 0, totalCollected: 0 };
    return {
    total: payments.length,
    completed: payments.filter(p => p.status === 'completed').length,
    pending: payments.filter(p => p.status === 'pending').length,
    totalCollected: payments.filter(p => p.status === 'completed').reduce((s, p) => s + p.amount, 0),
    };
  }, [payments]);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Payments" description="Track received payments from B2B customers">
        <button onClick={() => toast({ title: 'Export started', description: 'Payment data is being exported to CSV' })} className="flex items-center gap-1.5 px-3 h-9 rounded-lg bg-card border border-border text-sm font-medium hover:bg-muted transition-colors">
          <Download className="w-4 h-4" /> Export
        </button>
      </PageHeader>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
          <AlertCircle className="w-4 h-4 shrink-0" /> {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading payments...
        </div>
      ) : (
      <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Payments', value: stats.total, icon: CreditCard, color: 'text-foreground', bg: 'bg-card', border: 'border-border' },
          { label: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'text-success', bg: 'bg-success/5', border: 'border-success/20' },
          { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-warning', bg: 'bg-warning/5', border: 'border-warning/20' },
          { label: 'Collected', value: `${(stats.totalCollected / 1000).toFixed(0)}k DZD`, icon: CreditCard, color: 'text-info', bg: 'bg-info/5', border: 'border-info/20' },
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
          placeholder="Search by payment ID or customer..."
          className="w-full h-9 pl-9 pr-4 text-sm bg-card rounded-lg border border-border focus:outline-none focus:border-primary/40 transition-colors"
        />
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left font-medium text-muted-foreground text-xs px-5 py-3">Payment ID</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3">Invoice</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3">Customer</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3">Amount</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3 hidden sm:table-cell">Method</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3 hidden md:table-cell">Date</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => {
                const cfg = statusConfig[p.status];
                const StatusIcon = cfg.icon;
                return (
                  <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3 font-mono text-xs text-foreground whitespace-nowrap">{p.paymentId}</td>
                    <td className="px-3 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap">{p.invoiceRef}</td>
                    <td className="px-3 py-3 font-medium text-foreground whitespace-nowrap">{p.customer}</td>
                    <td className="px-3 py-3 font-semibold text-foreground whitespace-nowrap">{p.amount.toLocaleString()} DZD</td>
                    <td className="px-3 py-3 hidden sm:table-cell text-muted-foreground">{p.method}</td>
                    <td className="px-3 py-3 hidden md:table-cell text-xs text-muted-foreground whitespace-nowrap">{p.date}</td>
                    <td className="px-3 py-3"><span className={cn('flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium w-fit', cfg.color)}><StatusIcon className="w-3 h-3" /> {p.status}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      </>
      )}
    </div>
  );
}
