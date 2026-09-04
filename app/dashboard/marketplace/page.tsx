'use client';

import { PageHeader } from '@/components/dashboard/page-header';
import { cn } from '@/lib/utils';
import { marketplaceConfig } from '@/lib/table-configs';
import { useCrud } from '@/hooks/use-crud';
import type { MarketplaceListing } from '@/lib/types';
import { Store, Search, Package, MapPin, Calendar, Plus, Loader2, AlertCircle } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/lib/i18n/language-provider';
import { CreateModal, type CreateField } from '@/components/dashboard/create-modal';

const listingFields: CreateField[] = [
  { key: 'material', label: 'Material', type: 'text', required: true, placeholder: 'Recycled Plastic' },
  { key: 'quantity', label: 'Quantity', type: 'number', required: true, defaultValue: '10', min: '0' },
  { key: 'unit', label: 'Unit', type: 'text', required: true, defaultValue: 't' },
  { key: 'quality', label: 'Quality', type: 'text', required: true, placeholder: 'Grade A' },
  { key: 'price', label: 'Price (DZD per unit)', type: 'number', required: true, defaultValue: '0', min: '0' },
  { key: 'location', label: 'Location', type: 'text', required: true, placeholder: 'Transfer Station A' },
  { key: 'seller', label: 'Seller', type: 'text', required: true, placeholder: 'EcoRecycle Co.' },
  { key: 'availableDate', label: 'Available Date', type: 'date' },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  available: { label: 'Available', color: 'bg-success/15 text-success' },
  reserved: { label: 'Reserved', color: 'bg-warning/15 text-warning' },
  sold: { label: 'Sold', color: 'bg-muted text-muted-foreground' },
};

export default function MarketplacePage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const { toast } = useToast();
  const { data: marketplaceListings, loading, error, create } = useCrud<MarketplaceListing>(marketplaceConfig, 'listing_id');
  const [showModal, setShowModal] = useState(false);

  const handleCreate = async (values: Record<string, string>) => {
    const created = await create({
      listingId: `LST-${String(Date.now()).slice(-5)}`,
      material: values.material,
      quantity: parseFloat(values.quantity) || 0,
      unit: values.unit || 't',
      quality: values.quality,
      price: parseFloat(values.price) || 0,
      location: values.location,
      seller: values.seller,
      availableDate: values.availableDate || new Date().toISOString().slice(0, 10),
      status: 'available',
    } as Partial<MarketplaceListing>);
    if (created) {
      toast({ title: 'Listing created', description: `${values.material} is now listed on the marketplace` });
      return true;
    }
    toast({ title: 'Failed to create listing', description: 'Please try again' });
    return false;
  };

  const filtered = useMemo(() =>
    marketplaceListings.filter(l => l.material.toLowerCase().includes(search.toLowerCase()) || l.seller.toLowerCase().includes(search.toLowerCase()))
  , [search, marketplaceListings]);

  const stats = useMemo(() => {
    if (!marketplaceListings.length) return { total: 0, available: 0, totalValue: 0 };
    return {
      total: marketplaceListings.length,
      available: marketplaceListings.filter(l => l.status === 'available').length,
      totalValue: marketplaceListings.filter(l => l.status === 'available').reduce((s, l) => s + l.quantity * l.price, 0),
    };
  }, [marketplaceListings]);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title={t.pageTitleMarketplace} description={t.pageDescMarketplace}>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 px-3 h-9 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" /> List Material
        </button>
      </PageHeader>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
          <AlertCircle className="w-4 h-4 shrink-0" /> {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading marketplace...
        </div>
      ) : (
      <>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {[
          { label: 'Total Listings', value: stats.total, icon: Store, color: 'text-foreground', bg: 'bg-card', border: 'border-border' },
          { label: 'Available', value: stats.available, icon: Package, color: 'text-success', bg: 'bg-success/5', border: 'border-success/20' },
          { label: 'Market Value', value: `${(stats.totalValue / 1000000).toFixed(1)}M DZD`, icon: Store, color: 'text-info', bg: 'bg-info/5', border: 'border-info/20' },
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
          placeholder="Search by material or seller..."
          className="w-full h-9 pl-9 pr-4 text-sm bg-card rounded-lg border border-border focus:outline-none focus:border-primary/40 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(l => {
          const cfg = statusConfig[l.status];
          return (
            <div key={l.id} className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-display font-semibold text-foreground">{l.material}</div>
                  <div className="text-xs text-muted-foreground">{l.quality}</div>
                </div>
                <span className={cn('inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium', cfg.color)}>{cfg.label}</span>
              </div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-3xl font-display font-bold text-foreground">{l.quantity}</span>
                <span className="text-sm text-muted-foreground">{l.unit}</span>
                <span className="text-sm font-medium text-foreground ml-auto">{l.price.toLocaleString()} DZD/{l.unit}</span>
              </div>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5"><Package className="w-3.5 h-3.5" /> {l.seller}</div>
                <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {l.location}</div>
                <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Available: {l.availableDate}</div>
              </div>
              {l.status === 'available' && (
                <button onClick={() => toast({ title: 'Request to Buy', description: `Purchase request sent for ${l.quantity} ${l.unit} of ${l.material}` })} className="w-full mt-4 h-8 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
                  Request to Buy
                </button>
              )}
            </div>
          );
        })}
      </div>
      </>
      )}

      <CreateModal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="List Material"
        fields={listingFields}
        onSubmit={handleCreate}
        submitLabel="List Material"
      />
    </div>
  );
}
