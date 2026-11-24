import { Microscope, Home, ClipboardList, Headphones } from 'lucide-react';
import { WHY_CHOOSE_ITEMS } from '../data/clinicData';

const ICONS = {
  'diagnostic-services': Microscope,
  'home-collection': Home,
  'comprehensive-menu': ClipboardList,
  'patient-support': Headphones,
} as const;

export function WhyChooseSection() {
  return (
    <section className="py-14 lg:py-16 bg-[#F4F9FD] border-y border-[#E2EFFA]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-10">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#079CEB] mb-2">
              Why Choose Rudransh
            </p>
            <h2 className="font-display font-bold text-[#06346B] text-2xl sm:text-3xl lg:text-[34px] leading-tight tracking-tight text-balance">
              Dependable Diagnostics Built Around Patient Comfort
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[15px] leading-relaxed text-[#3C587A]">
              Serving Uttam Nagar and West Delhi from our Dal Mill Road centre with straightforward
              booking, clear preparation guidance, and 24/7 service support.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {WHY_CHOOSE_ITEMS.map((item, idx) => {
            const Icon = ICONS[item.id as keyof typeof ICONS] ?? Microscope;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#DCEAF6] p-6 sm:p-7 flex flex-col sm:flex-row items-start gap-5 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(6,52,107,0.08)]"
              >
                <div className="w-13 h-13 rounded-2xl bg-[#EAF6FF] text-[#0756A6] flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" strokeWidth={1.85} aria-hidden="true" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#079CEB]">
                    <span className="font-mono tabular-nums">0{idx + 1}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.label}</span>
                  </div>
                  <h3 className="font-display font-bold text-[#06346B] text-lg leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#3C587A]">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
