'use client';

import { useParams, useRouter } from 'next/navigation';
import { PageHeader } from '@/components/dashboard/page-header';
import { cn } from '@/lib/utils';
import { invoices, invoiceStatusBadgeClass, businesses } from '@/lib/mock-data';
import { ArrowLeft, Printer, Download, Send, CheckCircle2, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function InvoiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const id = params.id as string;

  const invoice = invoices.find(inv => inv.id === id);

  if (!invoice) {
    return (
      <div className="space-y-6 animate-fade-in">
        <PageHeader title="Invoice Not Found" description="The invoice you are looking for does not exist">
          <button
            onClick={() => router.push('/dashboard/invoices')}
            className="flex items-center gap-1.5 px-3 h-9 rounded-lg bg-card border border-border text-sm font-medium hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Invoices
          </button>
        </PageHeader>
        <div className="bg-card rounded-xl border border-border p-12 text-center">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
          <p className="text-sm text-muted-foreground">This invoice could not be found.</p>
        </div>
      </div>
    );
  }

  const business = businesses.find(b => b.name === invoice.customer);
  const subtotal = invoice.amount;
  const tax = invoice.tax;
  const total = invoice.total;
  const taxRate = ((tax / subtotal) * 100).toFixed(1);

  const handlePrint = () => {
    window.print();
  };

  const handleSend = () => {
    toast({ title: 'Invoice sent', description: `${invoice.invoiceId} has been emailed to ${invoice.customer}` });
  };

  const handleMarkPaid = () => {
    toast({ title: 'Payment recorded', description: `${invoice.invoiceId} marked as paid` });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Toolbar - hidden when printing */}
      <div className="print-hidden flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/dashboard/invoices')}
            className="flex items-center gap-1.5 px-3 h-9 rounded-lg bg-card border border-border text-sm font-medium hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div>
            <h1 className="font-display text-xl font-semibold text-foreground">{invoice.invoiceId}</h1>
            <p className="text-xs text-muted-foreground">{invoice.customer}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSend}
            className="flex items-center gap-1.5 px-3 h-9 rounded-lg bg-card border border-border text-sm font-medium hover:bg-muted transition-colors"
          >
            <Send className="w-4 h-4" /> Send
          </button>
          <button
            onClick={handleMarkPaid}
            className="flex items-center gap-1.5 px-3 h-9 rounded-lg bg-success/10 border border-success/20 text-success text-sm font-medium hover:bg-success/20 transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" /> Mark Paid
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 h-9 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Printer className="w-4 h-4" /> Print
          </button>
        </div>
      </div>

      {/* Invoice document */}
      <div className="bg-white text-gray-900 rounded-xl border border-border overflow-hidden print-area">
        {/* Header */}
        <div className="flex items-start justify-between p-8 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-emerald-600">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18v18H3z" opacity={0.2} />
                </svg>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">NEXVO</div>
                <div className="text-xs text-gray-500">Smart Waste Management Platform</div>
              </div>
            </div>
            <div className="text-xs text-gray-500 space-y-0.5">
              <div>20 Boulevard Mohamed Khemisti</div>
              <div>Alger Centre, 16000, Algeria</div>
              <div>Tax ID: RC-16-009988 / NIF 000916009988</div>
              <div>contact@wastecity.os / +213 21 00 00 00</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900 uppercase tracking-tight">INVOICE</div>
            <div className="text-sm text-gray-600 font-mono mt-1">{invoice.invoiceId}</div>
            <div className="mt-3">
              <span className={cn(
                'inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold',
                invoiceStatusBadgeClass[invoice.status]
              )}>
                {invoice.status.replace(/_/g, ' ')}
              </span>
            </div>
          </div>
        </div>

        {/* Bill To + Dates */}
        <div className="grid grid-cols-2 gap-8 p-8 border-b border-gray-200">
          <div>
            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Bill To</div>
            <div className="text-sm font-semibold text-gray-900">{invoice.customer}</div>
            {business && (
              <div className="text-xs text-gray-500 mt-1 space-y-0.5">
                <div>{business.address}</div>
                <div>{business.zone}</div>
                <div>Tax ID: {business.legalId}</div>
                <div>{business.contactEmail}</div>
                <div>{business.contactPhone}</div>
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="space-y-2">
              <div>
                <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Issue Date</div>
                <div className="text-sm text-gray-900">{new Date(invoice.issueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
              </div>
              <div>
                <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Due Date</div>
                <div className="text-sm text-gray-900">{new Date(invoice.dueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Line items */}
        <div className="p-8">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider pb-2">#</th>
                <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider pb-2">Description</th>
                <th className="text-right text-[10px] font-semibold text-gray-400 uppercase tracking-wider pb-2">Amount (DZD)</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-3 text-sm text-gray-400 w-10">{i + 1}</td>
                  <td className="py-3 text-sm text-gray-900">{item}</td>
                  <td className="py-3 text-sm text-gray-900 text-right font-mono">
                    {Math.round(subtotal / invoice.items.length).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end p-8 pt-0">
          <div className="w-64 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-gray-900 font-mono">{subtotal.toLocaleString()} DZD</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">VAT ({taxRate}%)</span>
              <span className="text-gray-900 font-mono">{tax.toLocaleString()} DZD</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span className="text-base font-bold text-gray-900">Total Due</span>
              <span className="text-base font-bold text-emerald-700 font-mono">{total.toLocaleString()} DZD</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-5 border-t border-gray-200">
          <div className="text-[10px] text-gray-400 space-y-1">
            <div className="font-semibold text-gray-500 uppercase tracking-wider mb-1">Payment Information</div>
            <div>Bank: BNA (Banque Nationale d'Algerie) / IBAN: DZ58 0000 0009 1600 9988 0012</div>
            <div>Payment Terms: Net 30 days from issue date. Late payments subject to 1.5% monthly interest.</div>
            <div className="pt-2">Thank you for your partnership in keeping our city clean and sustainable.</div>
          </div>
        </div>
      </div>

      {/* Status actions card - hidden when printing */}
      <div className="print-hidden bg-card rounded-xl border border-border p-5">
        <h3 className="font-display font-semibold text-foreground text-sm mb-3">Invoice Actions</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 h-9 rounded-lg bg-card border border-border text-sm font-medium hover:bg-muted transition-colors"
          >
            <Printer className="w-4 h-4" /> Print Invoice
          </button>
          <button
            onClick={handleSend}
            className="flex items-center gap-2 px-4 h-9 rounded-lg bg-card border border-border text-sm font-medium hover:bg-muted transition-colors"
          >
            <Send className="w-4 h-4" /> Email to Customer
          </button>
          <button
            onClick={handleMarkPaid}
            className="flex items-center gap-2 px-4 h-9 rounded-lg bg-success/10 border border-success/20 text-success text-sm font-medium hover:bg-success/20 transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" /> Record Payment
          </button>
        </div>
      </div>
    </div>
  );
}
