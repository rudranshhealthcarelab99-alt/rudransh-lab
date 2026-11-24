import { useState } from 'react';
import { ChevronDown, PhoneCall } from 'lucide-react';
import { CLINIC_INFO, FAQ_ITEMS } from '../data/clinicData';

export function FaqSection() {
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0].id);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  return (
    <section id="faq" className="py-16 lg:py-20 bg-[#F4F9FD] border-t border-[#E2EFFA]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Summary Column */}
          <div className="lg:col-span-4 space-y-4">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#079CEB]">
              Patient Support
            </p>
            <h2 className="font-display font-bold text-[#06346B] text-2xl sm:text-3xl tracking-tight text-balance">
              Frequently Asked Questions
            </h2>
            <p className="text-[15px] leading-relaxed text-[#3C587A]">
              Quick answers on booking blood tests, home sample collection, preparation, and
              visiting our Uttam Nagar diagnostic centre.
            </p>

            <div className="pt-2">
              <div className="rounded-2xl bg-white border border-[#DCEAF6] p-5 space-y-3">
                <div className="text-sm font-semibold text-[#06346B]">
                  Need immediate test or tariff guidance?
                </div>
                <p className="text-xs leading-relaxed text-[#4A678C]">
                  Speak directly with our patient support desk ({CLINIC_INFO.serviceBadge}).
                </p>
                <a
                  href={`tel:${CLINIC_INFO.primaryPhone}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#06346B] hover:bg-[#0756A6] text-white text-xs font-semibold transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#7DD3FC]" aria-hidden="true" />
                  <span>Call {CLINIC_INFO.primaryPhone}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Accordion Column */}
          <div className="lg:col-span-8 space-y-3">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border bg-white transition-colors ${
                    isOpen ? 'border-[#079CEB]/60 shadow-xs' : 'border-[#DCEAF6]'
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggleItem(item.id)}
                    className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4.5 text-left cursor-pointer"
                  >
                    <span className="font-display font-semibold text-[#06346B] text-[15px] sm:text-base">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#0756A6] shrink-0 transition-transform duration-150 ${
                        isOpen ? 'rotate-180 text-[#079CEB]' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-[15px] leading-relaxed text-[#3C587A] border-t border-[#F0F6FB]">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
