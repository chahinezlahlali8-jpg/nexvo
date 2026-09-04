'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { PageHeader } from '@/components/dashboard/page-header';
import { cn } from '@/lib/utils';
import {
  Bot, Send, Sparkles, TrendingUp, AlertTriangle, MapPin,
  Truck, Recycle, Clock, Zap, Brain, ArrowRight, Lightbulb,
  Loader2, AlertCircle, type LucideIcon,
} from 'lucide-react';
import { zones, wasteByType, monthlyCollection } from '@/lib/mock-data';

const GEMINI_API_KEY = 'AQ.Ab8RN6Kr4J4vml5iIaCQqPxmUU6KlNxyqhyZIb1vD9CGSkLGFg';
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent';

const SYSTEM_PROMPT = `You are the NEXVO AI Copilot, an assistant for a smart waste management platform for the city of Algiers.

You help operators analyze waste operations, fleet performance, citizen reports, SLA compliance, recycling rates, billing, and more.

Here is the current operational context you can reference:
- City: Algiers, Algeria (5 zones: Centre, Nord, Est, Sud, Ouest)
- This month: 1,847 tons collected, 68.2% recycling rate, 234 active reports, 94.1% SLA compliance
- Fleet: 28 of 30 trucks active, avg response time 47 min
- Zones performance: Zone 5 (Ouest) best at 97% SLA, Zone 4 (Sud) worst at 89% SLA with 67 reports
- 8 B2B businesses under contract (hotels, factories, hospitals, malls, restaurants)
- 3 recycling centers processing 77+ tons/day
- 60 IoT-enabled containers across the city
- Currency: Algerian Dinar (DZD)

Keep answers concise, actionable, and professional. When asked about specific data, provide numbers and recommendations. Format responses with line breaks for readability. Use bullet points where appropriate.`;

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface SuggestionQuestion {
  icon: LucideIcon;
  question: string;
  category: string;
}

const suggestions: SuggestionQuestion[] = [
  { icon: MapPin, category: 'Zones', question: 'How much waste did Zone 4 generate this month?' },
  { icon: AlertTriangle, category: 'Reports', question: 'Which areas have the most complaints?' },
  { icon: Truck, category: 'Fleet', question: 'Which trucks have poor efficiency?' },
  { icon: TrendingUp, category: 'Forecasting', question: 'Predict tomorrow\u2019s collection demand.' },
  { icon: Recycle, category: 'Recycling', question: 'Which businesses generate the most recyclable material?' },
  { icon: AlertTriangle, category: 'SLA', question: 'Show me SLA violations.' },
  { icon: Clock, category: 'Operations', question: 'What is the average response time across zones?' },
  { icon: Sparkles, category: 'Strategy', question: 'Recommend 3 improvements for Zone 4.' },
];

const predictionCards = [
  { icon: Zap, title: 'Overflow Prediction', value: '8 containers', detail: 'Expected to exceed 90% fill within 24 hours', color: 'text-warning bg-warning/10' },
  { icon: TrendingUp, title: 'Volume Forecast', value: '62 tons', detail: 'Predicted collection demand for tomorrow', color: 'text-primary bg-primary/10' },
  { icon: Truck, title: 'Maintenance Alert', value: '3 vehicles', detail: 'Predicted to need service within 7 days', color: 'text-info bg-info/10' },
  { icon: AlertTriangle, title: 'Anomaly Detection', value: '2 flagged', detail: 'Unusual patterns detected in Zone 4', color: 'text-destructive bg-destructive/10' },
];

export default function AICopilotPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'assistant',
      content: 'Hello! I\u2019m your NEXVO AI Copilot, powered by Gemini. I can answer questions about waste operations, predict trends, identify issues, and recommend actions. Try asking me about zone performance, SLA violations, fleet efficiency, or collection forecasts.',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isTyping) return;

    setError(null);
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const history = messages
        .filter(m => m.id !== 'init')
        .map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', content: m.content }));

      const res = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': GEMINI_API_KEY,
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [
            ...history,
            { role: 'user', parts: [{ text }] },
          ],
          generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errMsg = data?.error?.message || `AI service error: ${res.status}`;
        throw new Error(errMsg);
      }

      const text2 = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'I could not generate a response. Please try again.';

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: text2,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to AI service');
    } finally {
      setIsTyping(false);
    }
  }, [isTyping, messages]);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="AI Copilot" description="Ask questions, get predictions, and receive operational recommendations">
        <div className="flex items-center gap-2 px-3 h-9 rounded-lg bg-accent/10 text-accent text-sm font-medium">
          <Brain className="w-4 h-4" /> Gemini-Powered
        </div>
      </PageHeader>

      {/* Prediction cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {predictionCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="bg-card rounded-xl border border-border p-4">
              <div className={cn('flex items-center justify-center w-10 h-10 rounded-lg mb-3', card.color)}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-display font-semibold text-foreground">{card.value}</div>
              <div className="text-xs font-medium text-foreground mt-0.5">{card.title}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{card.detail}</div>
            </div>
          );
        })}
      </div>

      {/* Chat interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat panel */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border flex flex-col" style={{ height: '560px' }}>
          <div className="flex items-center gap-3 p-4 border-b border-border">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-display font-semibold text-foreground text-sm">NEXVO Assistant</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <span className={cn('w-1.5 h-1.5 rounded-full', isTyping ? 'bg-warning animate-pulse' : 'bg-success')} />
                {isTyping ? 'Thinking...' : 'Online · Gemini Flash'}
              </div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={cn('flex gap-3', msg.role === 'user' && 'flex-row-reverse')}>
                <div className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-lg shrink-0',
                  msg.role === 'assistant' ? 'bg-gradient-to-br from-primary to-accent' : 'bg-muted'
                )}>
                  {msg.role === 'assistant' ? <Bot className="w-4 h-4 text-white" /> : <span className="text-xs font-medium text-muted-foreground">SA</span>}
                </div>
                <div className={cn(
                  'max-w-[80%] rounded-xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line',
                  msg.role === 'assistant'
                    ? 'bg-muted/50 text-foreground'
                    : 'bg-primary text-primary-foreground'
                )}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-muted/50 rounded-xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="mx-4 mb-2 flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="p-4 border-t border-border">
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about operations, predictions, or recommendations..."
                className="flex-1 h-10 px-4 text-sm bg-muted/50 rounded-lg border border-transparent focus:border-primary/30 focus:bg-background focus:outline-none transition-colors"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground disabled:opacity-40 hover:bg-primary/90 transition-colors"
              >
                {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </form>
          </div>
        </div>

        {/* Suggested questions */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-2 mb-1">
            <Lightbulb className="w-4 h-4 text-warning" />
            <h3 className="font-display font-semibold text-foreground text-sm">Suggested Questions</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-4">Click any question to ask the AI</p>
          <div className="space-y-2 max-h-[460px] overflow-y-auto scrollbar-thin">
            {suggestions.map((s, i) => {
              const Icon = s.icon;
              return (
                <button
                  key={i}
                  onClick={() => sendMessage(s.question)}
                  disabled={isTyping}
                  className="w-full flex items-start gap-3 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-all text-left group disabled:opacity-50"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">{s.category}</div>
                    <div className="text-xs font-medium text-foreground leading-relaxed">{s.question}</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-2" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI capabilities */}
      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="font-display font-semibold text-foreground mb-1">AI Capabilities</h3>
        <p className="text-xs text-muted-foreground mb-4">Powered by Google Gemini Flash</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { icon: Sparkles, title: 'Report Classification', desc: 'Auto-categorize citizen reports by type, severity, and confidence' },
            { icon: Zap, title: 'Overflow Prediction', desc: 'Predict which containers will overflow based on fill patterns' },
            { icon: TrendingUp, title: 'Volume Forecasting', desc: 'Forecast waste generation by zone, season, and waste type' },
            { icon: Truck, title: 'Route Optimization', desc: 'Optimize collection routes using fill levels, traffic, and capacity' },
            { icon: AlertTriangle, title: 'Anomaly Detection', desc: 'Detect unusual patterns in waste generation, fuel use, or reports' },
            { icon: Recycle, title: 'Recycling Demand', desc: 'Predict recyclable material availability for marketplace planning' },
          ].map((cap) => {
            const Icon = cap.icon;
            return (
              <div key={cap.title} className="flex items-start gap-3 p-3 rounded-lg border border-border">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent/10 shrink-0">
                  <Icon className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{cap.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{cap.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
