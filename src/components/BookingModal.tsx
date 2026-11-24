import { useEffect, useState } from 'react';
import {
  X,
  Home,
  Building2,
  ArrowRight,
  ArrowLeft,
  PhoneCall,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import {
  CLINIC_INFO,
  HEALTH_PACKAGES,
  SERVICE_CATEGORIES,
} from '../data/clinicData';

export interface BookingPreset {
  visitType?: 'home' | 'centre';
  itemName?: string;
}

interface BookingModalProps {
  isOpen: boolean;
  preset: BookingPreset | null;
  onClose: () => void;
}

const TIME_SLOTS = [
  'Morning (8:00 AM – 11:00 AM)',
  'Midday (11:00 AM – 2:00 PM)',
  'Afternoon (2:00 PM – 5:00 PM)',
  'Evening (5:00 PM – 8:00 PM)',
];

const AVAILABLE_OPTIONS = [
  ...HEALTH_PACKAGES.map((p) => p.name),
  ...SERVICE_CATEGORIES.filter((s) => s.id !== 'packages' && s.id !== 'home-collection').map(
    (s) => s.name,
  ),
];

export function BookingModal({ isOpen, preset, onClose }: BookingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 'summary'>(1);
  const [visitType, setVisitType] = useState<'home' | 'centre'>('home');
  const [selectedItem, setSelectedItem] = useState<string>(HEALTH_PACKAGES[0].name);
  const [address, setAddress] = useState<string>('');
  const [patientName, setPatientName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [preferredSlot, setPreferredSlot] = useState<string>(TIME_SLOTS[0]);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    if (!isOpen) return;
    setStep(1);
    setErrorMsg('');
    if (preset?.visitType) {
      setVisitType(preset.visitType);
    }
    if (preset?.itemName) {
      setSelectedItem(preset.itemName);
    }
    // Set default date to today in YYYY-MM-DD
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setPreferredDate(`${yyyy}-${mm}-${dd}`);
  }, [isOpen, preset]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleStep1Next = () => {
    setErrorMsg('');
    if (visitType === 'home' && address.trim().length < 6) {
      setErrorMsg('Please enter your locality / house address for home sample collection.');
      return;
    }
    setStep(2);
  };

  const handleStep2Next = () => {
    setErrorMsg('');
    if (patientName.trim().length < 2) {
      setErrorMsg('Please enter the patient’s full name.');
      return;
    }
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    setStep(3);
  };

  const handleSubmitRequest = () => {
    setErrorMsg('');
    if (!preferredDate) {
      setErrorMsg('Please select your preferred appointment date.');
      return;
    }
    setStep('summary');
  };

  const whatsappMessage = encodeURIComponent(
    [
      `Hello Rudransh Healthcare & Path Lab,`,
      `I would like to request an appointment (pending lab confirmation):`,
      `- Service / Package: ${selectedItem}`,
      `- Visit Type: ${visitType === 'home' ? 'Home Sample Collection' : 'Centre Visit (Uttam Nagar)'}`,
      visitType === 'home' ? `- Address: ${address.trim()}` : `- Centre: ${CLINIC_INFO.address}`,
      `- Patient Name: ${patientName.trim()}${age ? ` (${age} yrs)` : ''}`,
      `- Mobile: ${phone.trim()}`,
      `- Preferred Date: ${preferredDate}`,
      `- Preferred Slot: ${preferredSlot}`,
      notes.trim() ? `- Notes: ${notes.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n'),
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#04244B]/65 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl border border-[#DCEAF6] shadow-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E5EFF8]">
          <div>
            <p className="text-xs font-semibold text-[#079CEB] uppercase tracking-wider mb-1">
              {step === 'summary' ? 'Request Ready to Send' : `Step ${step} of 3`}
            </p>
            <h3
              id="booking-modal-title"
              className="font-display font-bold text-[#06346B] text-xl sm:text-2xl"
            >
              {step === 'summary'
                ? 'Appointment Request Prepared'
                : 'Book Test / Home Collection'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close booking dialog"
            className="w-9 h-9 rounded-full bg-[#F3F8FD] hover:bg-[#EAF6FF] text-[#06346B] flex items-center justify-center shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Indicator */}
        {step !== 'summary' && (
          <div className="grid grid-cols-3 gap-2 py-4">
            {[
              { id: 1, label: '1. Location & Test' },
              { id: 2, label: '2. Patient Details' },
              { id: 3, label: '3. Date & Slot' },
            ].map((item) => {
              const active = step === item.id;
              const done = step > item.id;
              return (
                <div
                  key={item.id}
                  className={`text-center py-2 px-2 rounded-xl text-xs font-semibold transition-colors ${
                    active
                      ? 'bg-[#06346B] text-white'
                      : done
                        ? 'bg-[#EAF6FF] text-[#0756A6]'
                        : 'bg-[#F5FAFF] text-[#6E89AA]'
                  }`}
                >
                  {item.label}
                </div>
              );
            })}
          </div>
        )}

        {/* Validation Error */}
        {errorMsg && (
          <div
            role="alert"
            className="mb-4 rounded-xl bg-[#FEF2F2] border border-[#FECACA] px-4 py-3 flex items-start gap-2.5 text-xs sm:text-sm text-[#991B1B]"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Step 1: Location & Test */}
        {step === 1 && (
          <div className="space-y-5 pt-1">
            <div>
              <label className="block text-xs font-semibold text-[#06346B] uppercase tracking-wider mb-2">
                Collection Preference
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setVisitType('home')}
                  className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    visitType === 'home'
                      ? 'border-[#079CEB] bg-[#EAF6FF] ring-2 ring-[#079CEB]/20'
                      : 'border-[#DCEAF6] hover:bg-[#F8FBFF]'
                  }`}
                >
                  <span className="w-10 h-10 rounded-xl bg-white text-[#0756A6] flex items-center justify-center shrink-0">
                    <Home className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <div>
                    <div className="font-semibold text-sm text-[#06346B]">
                      Home Sample Collection
                    </div>
                    <div className="text-xs text-[#4A678C]">Doorstep phlebotomy visit</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setVisitType('centre')}
                  className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    visitType === 'centre'
                      ? 'border-[#079CEB] bg-[#EAF6FF] ring-2 ring-[#079CEB]/20'
                      : 'border-[#DCEAF6] hover:bg-[#F8FBFF]'
                  }`}
                >
                  <span className="w-10 h-10 rounded-xl bg-white text-[#0756A6] flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <div>
                    <div className="font-semibold text-sm text-[#06346B]">
                      Centre Visit
                    </div>
                    <div className="text-xs text-[#4A678C]">Govardhan Park, Uttam Nagar</div>
                  </div>
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="booking-test-select"
                className="block text-xs font-semibold text-[#06346B] uppercase tracking-wider mb-2"
              >
                Select Test or Health Package
              </label>
              <select
                id="booking-test-select"
                value={selectedItem}
                onChange={(e) => setSelectedItem(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#DCEAF6] bg-white text-sm font-medium text-[#102F57] focus:outline-none focus:ring-2 focus:ring-[#079CEB]"
              >
                {!AVAILABLE_OPTIONS.includes(selectedItem) && (
                  <option value={selectedItem}>{selectedItem}</option>
                )}
                {AVAILABLE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {visitType === 'home' ? (
              <div>
                <label
                  htmlFor="booking-address"
                  className="block text-xs font-semibold text-[#06346B] uppercase tracking-wider mb-2"
                >
                  Home Collection Address (Uttam Nagar / Nearby)
                </label>
                <textarea
                  id="booking-address"
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House / Flat No., Street, Landmark, Pin Code"
                  className="w-full px-4 py-3 rounded-xl border border-[#DCEAF6] bg-white text-sm text-[#102F57] placeholder:text-[#7C97B8] focus:outline-none focus:ring-2 focus:ring-[#079CEB]"
                />
              </div>
            ) : (
              <div className="rounded-xl bg-[#F4F9FD] border border-[#DCEAF6] p-3.5 text-xs text-[#3C587A]">
                <strong className="text-[#06346B]">Centre Address:</strong> {CLINIC_INFO.address} (
                {CLINIC_INFO.visitingHours})
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleStep1Next}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#06346B] hover:bg-[#0756A6] text-white text-sm font-semibold cursor-pointer"
              >
                <span>Continue to Patient Details</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Patient Details */}
        {step === 2 && (
          <div className="space-y-4 pt-1">
            <div>
              <label
                htmlFor="patient-name"
                className="block text-xs font-semibold text-[#06346B] uppercase tracking-wider mb-1.5"
              >
                Patient Full Name
              </label>
              <input
                id="patient-name"
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Enter full name"
                className="w-full px-4 py-3 rounded-xl border border-[#DCEAF6] text-sm text-[#102F57] focus:outline-none focus:ring-2 focus:ring-[#079CEB]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="patient-phone"
                  className="block text-xs font-semibold text-[#06346B] uppercase tracking-wider mb-1.5"
                >
                  Mobile Number
                </label>
                <input
                  id="patient-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full px-4 py-3 rounded-xl border border-[#DCEAF6] text-sm text-[#102F57] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#079CEB]"
                />
              </div>

              <div>
                <label
                  htmlFor="patient-age"
                  className="block text-xs font-semibold text-[#06346B] uppercase tracking-wider mb-1.5"
                >
                  Age (Optional)
                </label>
                <input
                  id="patient-age"
                  type="number"
                  min={1}
                  max={120}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Years"
                  className="w-full px-4 py-3 rounded-xl border border-[#DCEAF6] text-sm text-[#102F57] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#079CEB]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="patient-notes"
                className="block text-xs font-semibold text-[#06346B] uppercase tracking-wider mb-1.5"
              >
                Prescription or Fasting Notes (Optional)
              </label>
              <textarea
                id="patient-notes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Mention additional tests or specific timing requests"
                className="w-full px-4 py-3 rounded-xl border border-[#DCEAF6] text-sm text-[#102F57] focus:outline-none focus:ring-2 focus:ring-[#079CEB]"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => {
                  setErrorMsg('');
                  setStep(1);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#DCEAF6] text-sm font-semibold text-[#06346B] hover:bg-[#F5FAFF] cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleStep2Next}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#06346B] hover:bg-[#0756A6] text-white text-sm font-semibold cursor-pointer"
              >
                <span>Choose Slot</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Preferred Date & Slot */}
        {step === 3 && (
          <div className="space-y-5 pt-1">
            <div>
              <label
                htmlFor="preferred-date"
                className="block text-xs font-semibold text-[#06346B] uppercase tracking-wider mb-1.5"
              >
                Preferred Date
              </label>
              <input
                id="preferred-date"
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#DCEAF6] text-sm text-[#102F57] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#079CEB]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#06346B] uppercase tracking-wider mb-2">
                Preferred Time Slot (Centre Hours: {CLINIC_INFO.visitingHours})
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {TIME_SLOTS.map((slot) => {
                  const selected = preferredSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setPreferredSlot(slot)}
                      className={`px-4 py-3 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                        selected
                          ? 'border-[#079CEB] bg-[#EAF6FF] text-[#06346B]'
                          : 'border-[#DCEAF6] text-[#3C587A] hover:bg-[#F8FBFF]'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => {
                  setErrorMsg('');
                  setStep(2);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#DCEAF6] text-sm font-semibold text-[#06346B] hover:bg-[#F5FAFF] cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleSubmitRequest}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#06346B] hover:bg-[#0756A6] text-white text-sm font-semibold cursor-pointer"
              >
                <span>Review Appointment Request</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        {/* Honest Summary Screen (No fake confirmed booking or fake payment) */}
        {step === 'summary' && (
          <div className="space-y-5 pt-4">
            <div className="rounded-2xl bg-[#EAF6FF] border border-[#CFE4F7] p-4 flex items-start gap-3">
              <CheckCircle2
                className="w-5 h-5 text-[#0756A6] shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div className="text-xs sm:text-sm text-[#06346B] leading-relaxed">
                <strong>Request Summary Ready (Pending Clinic Confirmation):</strong> Send this
                summary via WhatsApp or call our clinic desk directly to confirm slot availability
                and exact test charges.
              </div>
            </div>

            <div className="rounded-2xl border border-[#DCEAF6] bg-[#F8FBFF] p-4 sm:p-5 space-y-2.5 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-[#4A678C]">Test / Package</span>
                <span className="font-semibold text-[#06346B] text-right">{selectedItem}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#4A678C]">Visit Type</span>
                <span className="font-semibold text-[#06346B] text-right">
                  {visitType === 'home' ? 'Home Sample Collection' : 'Centre Visit'}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#4A678C]">Patient</span>
                <span className="font-semibold text-[#06346B] text-right">
                  {patientName}
                  {age ? ` (${age} yrs)` : ''}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#4A678C]">Mobile</span>
                <span className="font-semibold text-[#06346B] tabular-nums text-right">
                  {phone}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#4A678C]">Preferred Slot</span>
                <span className="font-semibold text-[#06346B] text-right">
                  {preferredDate} · {preferredSlot}
                </span>
              </div>
              {visitType === 'home' && (
                <div className="flex justify-between gap-4">
                  <span className="text-[#4A678C]">Address</span>
                  <span className="font-semibold text-[#06346B] text-right">{address}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <a
                href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#1F9D55] hover:bg-[#178244] text-white text-sm font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Send via WhatsApp</span>
              </a>

              <a
                href={`tel:${CLINIC_INFO.primaryPhone}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#06346B] hover:bg-[#0756A6] text-white text-sm font-semibold transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#7DD3FC]" aria-hidden="true" />
                <span>Call {CLINIC_INFO.primaryPhone}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
