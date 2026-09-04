'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/dashboard/page-header';
import { cn } from '@/lib/utils';
import { invoiceStatusBadgeClass } from '@/lib/mock-data';
import { invoiceConfig } from '@/lib/table-configs';
import { useCrud } from '@/hooks/use-crud';
import { useToast } from '@/hooks/use-toast';
import { Search, Download, Plus, FileText, CheckCircle2, AlertCircle, Clock, Eye, Loader2 } from 'lucide-react';
import type { InvoiceStatus, Invoice } from '@/lib/types';
import { CreateModal, type CreateField } from '@/components/dashboard/create-modal';

const invoiceFields: CreateField[] = [
  { key: 'customer', label: 'Customer', type: 'text', required: true, placeholder: 'Acme Corp' },
  { key: 'items', label: 'Items (comma-separated)', type: 'text', required: true, placeholder: 'Collection Service, Container Rental' },
  { key: 'amount', label: 'Amount (DZD)', type: 'number', required: true, defaultValue: '0', min: '0' },
  { key: 'tax', label: 'Tax (DZD)', type: 'number', required: true, defaultValue: '0', min: '0' },
  { key: 'dueDate', label: 'Due Date', type: 'date' },
];

const statusOptions: (InvoiceStatus | 'ALL')[] = ['ALL', 'DRAFT', 'ISSUED', 'SENT', 'PARTIALLY_PAID', 'PAID', 'OVERDUE', 'CANCELLED'];

export default function InvoicesPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | 'ALL'>('ALL');
  const { data: invoices, loading, error, create } = useCrud<Invoice>(invoiceConfig, 'issue_date');
  const [showModal, setShowModal] = useState(false);

  const filtered = useMemo(() =>
    invoices.filter(inv => {
      const matchesSearch = inv.invoiceId.toLowerCase().includes(search.toLowerCase()) || inv.customer.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || inv.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
  , [search, statusFilter, invoices]);

  const stats = useMemo(() => {
    if (!invoices.length) return { total: 0, paid: 0, overdue: 0, totalOutstanding: 0 };
    return {
    total: invoices.length,
    paid: invoices.filter(i => i.status === 'PAID').length,
    overdue: invoices.filter(i => i.status === 'OVERDUE').length,
    totalOutstanding: invoices.filter(i => i.status !== 'PAID' && i.status !== 'CANCELLED').reduce((s, i) => s + i.total, 0),
    };
  }, [invoices]);

  const handleExport = () => {
    toast({ title: 'Export started', description: 'Invoice data is being exported to CSV' });
  };

  const handleCreate = async (values: Record<string, string>) => {
    const amount = parseFloat(values.amount) || 0;
    const tax = parseFloat(values.tax) || 0;
    const created = await create({
      invoiceId: `INV-${String(Date.now()).slice(-5)}`,
      customer: values.customer,
      issueDate: new Date().toISOString().slice(0, 10),
      dueDate: values.dueDate || new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
      items: values.items.split(',').map(i => i.trim()).filter(Boolean),
      amount,
      tax,
      total: amount + tax,
      status: 'DRAFT',
    } as Partial<Invoice>);
    if (created) {
      toast({ title: 'Invoice created', description: `Invoice for ${values.customer} has been created` });
      return true;
    }
    toast({ title: 'Failed to create invoice', description: 'Please try again' });
    return false;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Invoices" description="Manage billing and invoicing for B2B customers">
        <button
          onClick={handleExport}
          className="flex items-center gap-1.5 px-3 h-9 rounded-lg bg-card border border-border text-sm font-medium hover:bg-muted transition-colors"
        >
          <Download className="w-4 h-4" /> Export
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-3 h-9 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Create Invoice
        </button>
      </PageHeader>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
          <AlertCircle className="w-4 h-4 shrink-0" /> {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading invoices...
        </div>
      ) : (
      <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Invoices', value: stats.total, icon: FileText, color: 'text-foreground', bg: 'bg-card', border: 'border-border' },
          { label: 'Paid', value: stats.paid, icon: CheckCircle2, color: 'text-success', bg: 'bg-success/5', border: 'border-success/20' },
          { label: 'Overdue', value: stats.overdue, icon: AlertCircle, color: 'text-destructive', bg: 'bg-destructive/5', border: 'border-destructive/20' },
          { label: 'Outstanding', value: `${(stats.totalOutstanding / 1000).toFixed(0)}k DZD`, icon: Clock, color: 'text-warning', bg: 'bg-warning/5', border: 'border-warning/20' },
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
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by invoice ID or customer..."
            className="w-full h-9 pl-9 pr-4 text-sm bg-card rounded-lg border border-border focus:outline-none focus:border-primary/40 transition-colors"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as InvoiceStatus | 'ALL')}
          className="h-9 px-3 text-sm bg-card rounded-lg border border-border focus:outline-none focus:border-primary/40 transition-colors cursor-pointer"
        >
          {statusOptions.map(s => <option key={s} value={s}>{s === 'ALL' ? 'All Statuses' : s.replace(/_/g, ' ')}</option>)}
        </select>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left font-medium text-muted-foreground text-xs px-5 py-3">Invoice ID</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3">Customer</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3 hidden md:table-cell">Items</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3">Amount</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3">Tax</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3">Total</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3">Status</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3 hidden sm:table-cell">Due Date</th>
                <th className="text-left font-medium text-muted-foreground text-xs px-3 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(inv => (
                <tr
                  key={inv.id}
                  className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => router.push(`/dashboard/invoices/${inv.id}`)}
                >
                  <td className="px-5 py-3 font-mono text-xs text-foreground whitespace-nowrap">{inv.invoiceId}</td>
                  <td className="px-3 py-3 font-medium text-foreground whitespace-nowrap">{inv.customer}</td>
                  <td className="px-3 py-3 hidden md:table-cell text-xs text-muted-foreground">{inv.items.length} items</td>
                  <td className="px-3 py-3 text-foreground whitespace-nowrap">{inv.amount.toLocaleString()}</td>
                  <td className="px-3 py-3 text-muted-foreground whitespace-nowrap">{inv.tax.toLocaleString()}</td>
                  <td className="px-3 py-3 font-semibold text-foreground whitespace-nowrap">{inv.total.toLocaleString()}</td>
                  <td className="px-3 py-3"><span className={cn('inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium', invoiceStatusBadgeClass[inv.status])}>{inv.status.replace(/_/g, ' ')}</span></td>
                  <td className="px-3 py-3 hidden sm:table-cell text-xs text-muted-foreground whitespace-nowrap">{inv.dueDate}</td>
                  <td className="px-3 py-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); router.push(`/dashboard/invoices/${inv.id}`); }}
                      className="flex items-center gap-1 text-xs text-primary hover:underline font-medium"
                    >
                      <Eye className="w-3.5 h-3.5" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </>
      )}

      <CreateModal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Create Invoice"
        fields={invoiceFields}
        onSubmit={handleCreate}
        submitLabel="Create Invoice"
      />
    </div>
  );
}
