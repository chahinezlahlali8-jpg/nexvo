'use client';

import { useState, useCallback } from 'react';
import { X, Loader2, Plus } from 'lucide-react';

export interface CreateField {
  key: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'datetime-local' | 'select';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  defaultValue?: string;
  step?: string;
  min?: string;
}

interface CreateModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  fields: CreateField[];
  onSubmit: (values: Record<string, string>) => Promise<boolean>;
  submitLabel?: string;
}

export function CreateModal({ open, onClose, title, fields, onSubmit, submitLabel = 'Create' }: CreateModalProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback((key: string, val: string) => {
    setValues(prev => ({ ...prev, [key]: val }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const missing = fields.filter(f => f.required && !values[f.key]);
    if (missing.length > 0) {
      setError(`${missing[0].label} is required`);
      return;
    }
    setError(null);
    setSaving(true);
    const ok = await onSubmit(values);
    setSaving(false);
    if (ok) {
      setValues({});
      onClose();
    }
  };

  const handleClose = () => {
    setValues({});
    setError(null);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fade-in" onClick={handleClose}>
      <div className="bg-card rounded-xl border border-border shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h3 className="font-display font-semibold text-foreground">{title}</h3>
          <button onClick={handleClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {fields.map(field => (
              <div key={field.key} className={field.type === 'date' || field.type === 'datetime-local' ? 'col-span-2' : ''}>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                  {field.label}{field.required && ' *'}
                </label>
                {field.type === 'select' ? (
                  <select
                    value={values[field.key] ?? field.defaultValue ?? ''}
                    onChange={e => handleChange(field.key, e.target.value)}
                    className="w-full h-9 px-3 text-sm bg-background rounded-lg border border-border focus:outline-none focus:border-primary/40 transition-colors cursor-pointer"
                  >
                    <option value="">Select...</option>
                    {field.options?.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    min={field.min}
                    step={field.step}
                    value={values[field.key] ?? field.defaultValue ?? ''}
                    onChange={e => handleChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="w-full h-9 px-3 text-sm bg-background rounded-lg border border-border focus:outline-none focus:border-primary/40 transition-colors"
                  />
                )}
              </div>
            ))}
          </div>
          {error && (
            <div className="text-sm text-destructive">{error}</div>
          )}
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={handleClose} className="px-4 h-9 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="flex items-center gap-1.5 px-4 h-9 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
