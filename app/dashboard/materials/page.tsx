'use client';

import { PageHeader } from '@/components/dashboard/page-header';
import { ProgressBar } from '@/components/dashboard/badges';
import { cn } from '@/lib/utils';
import { materialConfig } from '@/lib/table-configs';
import { useCrud } from '@/hooks/use-crud';
import type { MaterialInventory } from '@/lib/types';
import { Package, Search, TrendingUp, TrendingDown, Plus, Loader2, AlertCircle } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/lib/i18n/language-provider';
import { CreateModal, type CreateField } from '@/components/dashboard/create-modal';

const qualityOptions = [
  { value: 'A', label: 'Grade A' },
  { value: 'B', label: 'Grade B' },
  { value: 'C', label: 'Grade C' },
];

const materialFields: CreateField[] = [
  { key: 'material', label: 'Material', type: 'text', required: true, placeholder: 'Recycled Plastic' },
  { key: 'unit', label: 'Unit', type: 'text', required: true, defaultValue: 't' },
  { key: 'quality', label: 'Quality', type: 'select', required: true, options: qualityOptions, defaultValue: 'B' },
  { key: 'currentStock', label: 'Current Stock', type: 'number', required: true, defaultValue: '0', min: '0' },
  { key: 'openingStock', label: 'Opening Stock', type: 'number', defaultValue: '0', min: '0' },
  { key: 'incoming', label: 'Incoming', type: 'number', defaultValue: '0', min: '0' },
  { key: 'pricePerTon', label: 'Price per Ton (DZD)', type: 'number', required: true, defaultValue: '0', min: '0' },
];

const qualityColors: Record<string, string> = {
  A: 'bg-success/15 text-success',
  B: 'bg-info/15 text-info',
  C: 'bg-warning/15 text-warning',
};

export default function MaterialsPage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const { toast } = useToast();
  const { data: materialInventory, loading, error, create } = useCrud<MaterialInventory>(materialConfig, 'material');
  const [showModal, setShowModal] = useState(false);

  const handleCreate = async (values: Record<string, string>) => {
    const current = parseFloat(values.currentStock) || 0;
    const created = await create({
      material: values.material,
      unit: values.unit || 't',
      openingStock: parseFloat(values.openingStock) || 0,
      incoming: parseFloat(values.incoming) || 0,
      processed: 0,
      sold: 0,
      currentStock: current,
      quality: values.quality as MaterialInventory['quality'],
      pricePerTon: parseFloat(values.pricePerTon) || 0,
    } as Partial<MaterialInventory>);
    if (created) {
      toast({ title: 'Stock added', description: `${values.material} has been added to inventory` });
      return true;
    }
    toast({ title: 'Failed to add stock', description: 'Please try again' });
    return false;
  };

  const filtered = useMemo(() =>
    materialInventory.filter(m => m.material.toLowerCase().includes(search.toLowerCase()))
  , [search, materialInventory]);

  const stats = useMemo(() => {
    if (!materialInventory.length) return { totalStock: 0, totalValue: 0, incoming: 0, sold: 0 };
    return {
      totalStock: materialInventory.reduce((s, m) => s + m.currentStock, 0),
      totalValue: materialInventory.reduce((s, m) => s + m.currentStock * m.pricePerTon, 0),
      incoming: materialInventory.reduce((s, m) => s + m.incoming, 0),
      sold: materialInventory.reduce((s, m) => s + m.sold, 0),
    };
  }, [materialInventory]);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title={t.pageTitleMaterials} description={t.pageDescMaterials}>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 px-3 h-9 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" /> Add Stock
        </button>
      </PageHeader>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
          <AlertCircle className="w-4 h-4 shrink-0" /> {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading materials...
        </div>
      ) : (
      <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Stock', value: `${stats.totalStock}t`, icon: Package, color: 'text-foreground', bg: 'bg-card', border: 'border-border' },
          { label: 'Inventory Value', value: `${(stats.totalValue / 1000000).toFixed(1)}M DZD`, icon: TrendingUp, color: 'text-success', bg: 'bg-success/5', border: 'border-success/20' },
          { label: 'Incoming Today', value: `${stats.incoming}t`, icon: TrendingDown, color: 'text-info', bg: 'bg-info/5', border: 'border-info/20' },
          { label: 'Sold Today', value: `${stats.sold}t`, icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/5', border: 'border-primary/20' },
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
          placeholder="Search materials..."
          className="w-full h-9 pl-9 pr-4 text-sm bg-card rounded-lg border border-border focus:outline-none focus:border-primary/40 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map(m => {
          const stockPct = Math.min(100, (m.currentStock / (m.openingStock + m.incoming)) * 100);
          return (
            <div key={m.id} className="bg-card rounded-xl border border-border p-4 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="font-display font-semibold text-foreground text-sm">{m.material}</div>
                <span className={cn('text-[10px] px-1.5 py-0.5 rounded font-medium', qualityColors[m.quality])}>Grade {m.quality}</span>
              </div>
              <div className="text-3xl font-display font-bold text-foreground">{m.currentStock}<span className="text-sm text-muted-foreground font-normal ml-1">{m.unit}</span></div>
              <div className="mt-2">
                <ProgressBar value={stockPct} barClassName="bg-primary" />
              </div>
              <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                <div><span className="text-muted-foreground">In:</span> <span className="font-medium text-info">{m.incoming}</span></div>
                <div><span className="text-muted-foreground">Sold:</span> <span className="font-medium text-success">{m.sold}</span></div>
                <div><span className="text-muted-foreground">Price:</span> <span className="font-medium">{(m.pricePerTon / 1000).toFixed(0)}k</span></div>
              </div>
            </div>
          );
        })}
      </div>
      </>
      )}

      <CreateModal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Add Stock"
        fields={materialFields}
        onSubmit={handleCreate}
        submitLabel="Add Stock"
      />
    </div>
  );
}
