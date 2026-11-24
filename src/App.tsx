import { useState, useCallback } from 'react';
import { MessageCircle, Scale, X } from 'lucide-react';
import {
  CLINIC_INFO,
  type HealthPackage,
} from './data/clinicData';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServiceExplorerSection } from './components/ServiceExplorerSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { HealthPackagesSection } from './components/HealthPackagesSection';
import { HowToBookSection } from './components/HowToBookSection';
import { HomeCollectionBanner } from './components/HomeCollectionBanner';
import { AboutAndArticlesSection } from './components/AboutAndArticlesSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { BookingModal, type BookingPreset } from './components/BookingModal';
import { PackageDetailsModal } from './components/PackageDetailsModal';
import { CompareModal } from './components/CompareModal';

export default function App() {
  const [activeServiceId, setActiveServiceId] = useState<string>('pathology');
  const [selectedCompareIds, setSelectedCompareIds] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);

  const [bookingOpen, setBookingOpen] = useState<boolean>(false);
  const [bookingPreset, setBookingPreset] = useState<BookingPreset | null>(null);

  const [detailPackage, setDetailPackage] = useState<HealthPackage | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showNotice = useCallback((message: string) => {
    setToastMessage(message);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleSelectService = useCallback(
    (serviceId: string) => {
      if (serviceId === 'packages') {
        scrollToSection('health-packages');
        return;
      }
      setActiveServiceId(serviceId);
      scrollToSection('services-explorer');
    },
    [scrollToSection],
  );

  const handleOpenBooking = useCallback((preset?: BookingPreset) => {
    setBookingPreset(preset ?? { visitType: 'home' });
    setBookingOpen(true);
  }, []);

  const handleToggleCompare = useCallback(
    (pkgId: string) => {
      setSelectedCompareIds((prev) => {
        if (prev.includes(pkgId)) {
          return prev.filter((id) => id !== pkgId);
        }
        if (prev.length >= 3) {
          showNotice('You can compare up to 3 health packages at a time.');
          return prev;
        }
        return [...prev, pkgId];
      });
    },
    [showNotice],
  );

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#102F57]">
      <Header
        onSelectService={handleSelectService}
        onOpenBooking={handleOpenBooking}
        onNavigateSection={scrollToSection}
        onShowNotice={showNotice}
      />

      <main className="flex-1">
        <HeroSection
          activeServiceId={activeServiceId}
          onSelectService={handleSelectService}
          onBookHomeCollection={() =>
            handleOpenBooking({ visitType: 'home', itemName: 'Home Sample Collection' })
          }
          onExploreTests={() => scrollToSection('services-explorer')}
        />

        <ServiceExplorerSection
          activeServiceId={activeServiceId}
          onSelectService={setActiveServiceId}
          onBookService={(serviceName, isHome) =>
            handleOpenBooking({
              visitType: isHome ? 'home' : 'centre',
              itemName: serviceName,
            })
          }
        />

        <WhyChooseSection />

        <HealthPackagesSection
          selectedCompareIds={selectedCompareIds}
          onToggleCompare={handleToggleCompare}
          onViewDetails={(pkg) => setDetailPackage(pkg)}
          onBookPackage={(pkg) =>
            handleOpenBooking({ visitType: 'home', itemName: pkg.name })
          }
          onOpenCompareModal={() => setIsCompareOpen(true)}
          onClearCompare={() => setSelectedCompareIds([])}
        />

        <HowToBookSection
          onBookNow={() => handleOpenBooking({ visitType: 'home' })}
        />

        <HomeCollectionBanner
          onBookHomeTest={() =>
            handleOpenBooking({ visitType: 'home', itemName: 'Home Sample Collection' })
          }
        />

        <AboutAndArticlesSection
          onBookVisit={() => handleOpenBooking({ visitType: 'centre' })}
        />

        <FaqSection />
      </main>

      <Footer
        onSelectService={handleSelectService}
        onNavigateSection={scrollToSection}
        onOpenBooking={handleOpenBooking}
        onShowNotice={showNotice}
      />

      {/* Compare Tray (only visible when packages are checked) */}
      {selectedCompareIds.length > 0 && (
        <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2.5 bg-[#06346B] text-white px-4 py-2.5 rounded-full shadow-[0_12px_30px_rgba(6,52,107,0.3)] border border-white/15">
          <Scale className="w-4 h-4 text-[#7DD3FC]" aria-hidden="true" />
          <span className="text-xs font-semibold tabular-nums whitespace-nowrap">
            {selectedCompareIds.length} Selected
          </span>
          <button
            type="button"
            disabled={selectedCompareIds.length < 2}
            onClick={() => setIsCompareOpen(true)}
            className="px-3 py-1 rounded-full bg-[#079CEB] disabled:bg-white/20 text-[#04244B] disabled:text-white/70 text-xs font-bold cursor-pointer disabled:cursor-not-allowed whitespace-nowrap"
          >
            Compare
          </button>
          <button
            type="button"
            onClick={() => setSelectedCompareIds([])}
            aria-label="Clear selected comparison packages"
            className="w-6 h-6 rounded-full hover:bg-white/15 flex items-center justify-center cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating WhatsApp Contact Button */}
      <a
        href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(
          'Hello Rudransh Healthcare & Path Lab, I would like to enquire about diagnostic tests / home sample collection.',
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Rudransh Healthcare & Path Lab"
        className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[#1F9D55] hover:bg-[#178244] text-white text-xs sm:text-sm font-semibold shadow-[0_12px_28px_rgba(23,130,68,0.35)] transition-transform duration-150 hover:-translate-y-0.5"
      >
        <MessageCircle className="w-5 h-5" aria-hidden="true" />
        <span className="hidden sm:inline whitespace-nowrap">WhatsApp Us</span>
      </a>

      {/* Dismissible Notice Banner */}
      {toastMessage && (
        <div
          role="status"
          className="fixed top-20 right-4 z-50 max-w-sm rounded-2xl bg-[#06346B] text-white px-4 py-3 shadow-xl border border-[#079CEB]/40 flex items-start gap-3 text-xs sm:text-sm"
        >
          <span className="leading-snug flex-1">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            aria-label="Dismiss notification"
            className="text-white/75 hover:text-white cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Interactive Modals */}
      <BookingModal
        isOpen={bookingOpen}
        preset={bookingPreset}
        onClose={() => setBookingOpen(false)}
      />

      <PackageDetailsModal
        pkg={detailPackage}
        onClose={() => setDetailPackage(null)}
        onBookPackage={(pkg) =>
          handleOpenBooking({ visitType: 'home', itemName: pkg.name })
        }
      />

      <CompareModal
        isOpen={isCompareOpen}
        selectedIds={selectedCompareIds}
        onClose={() => setIsCompareOpen(false)}
        onRemoveId={(id) =>
          setSelectedCompareIds((prev) => prev.filter((item) => item !== id))
        }
        onBookPackage={(pkg) =>
          handleOpenBooking({ visitType: 'home', itemName: pkg.name })
        }
      />
    </div>
  );
}
