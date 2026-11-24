export interface ServiceCategory {
  id: string;
  name: string;
  shortLabel: string;
  tagline: string;
  description: string;
  highlights: string[];
  iconKey:
    | 'pathology'
    | 'ultrasound'
    | 'xray'
    | 'ecg'
    | 'mri'
    | 'packages'
    | 'home'
    | 'tmt';
  sampleTests: string[];
}

export interface HealthPackage {
  id: string;
  name: string;
  category: 'preventive' | 'comprehensive' | 'gender' | 'senior';
  testCountLabel: string;
  priceLabel: string;
  isPlaceholderPricing: boolean;
  shortDescription: string;
  fastingRequirement: string;
  sampleType: string;
  idealFor: string;
  focusAreas: string[];
  preparationNote: string;
}

export interface EducationalArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  keyTakeaways: string[];
  bodyParagraphs: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  isEditablePolicy?: boolean;
}

export const CLINIC_INFO = {
  name: 'RUDRANSH HEALTHCARE & PATH LAB',
  shortName: 'Rudransh Healthcare',
  address: 'RZ-11, Govardhan Park, Uttam Nagar, Dal Mill Road, New Delhi – 110059',
  shortAddress: 'RZ-11, Govardhan Park, Uttam Nagar, New Delhi – 110059',
  phones: ['9870172229', '9891646613'] as const,
  primaryPhone: '9870172229',
  secondaryPhone: '9891646613',
  whatsappNumber: '919870172229',
  visitingHours: '8 AM to 8 PM',
  serviceBadge: '24/7 SERVICE',
} as const;

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'pathology',
    name: 'Pathology Tests',
    shortLabel: 'Pathology Tests',
    tagline: 'Clinical blood, urine, and biochemical investigations',
    description:
      'Routine and specialized pathology testing covering hematology, biochemistry, thyroid function, diabetes screening, liver and kidney profiles, and infection panels.',
    highlights: [
      'Sample collection at centre or home',
      'Standardized sample handling',
      'Guided preparation instructions',
    ],
    iconKey: 'pathology',
    sampleTests: [
      'Complete Blood Count (CBC)',
      'Lipid Profile',
      'Liver Function Test (LFT)',
      'Kidney Function Test (KFT)',
      'Thyroid Profile (T3, T4, TSH)',
      'HbA1c & Blood Glucose',
    ],
  },
  {
    id: 'ultrasound',
    name: 'Ultrasound',
    shortLabel: 'Ultrasound',
    tagline: 'Non-invasive diagnostic ultrasound imaging',
    description:
      'Diagnostic ultrasound examinations for abdominal, pelvic, obstetric, and soft-tissue evaluations with clear pre-scan hydration or fasting guidance.',
    highlights: [
      'Scheduled centre appointments',
      'Pre-scan guidance from desk',
      'Coordinated reporting support',
    ],
    iconKey: 'ultrasound',
    sampleTests: [
      'Whole Abdomen Ultrasound',
      'KUB Ultrasound',
      'Pelvic Ultrasound',
      'Neck & Thyroid Scan',
      'Obstetric Scan',
    ],
  },
  {
    id: 'xray',
    name: 'X-Ray',
    shortLabel: 'X-Ray',
    tagline: 'Digital radiographic imaging for chest, bone, and joints',
    description:
      'Diagnostic X-ray imaging assisting physicians with chest evaluations, orthopedic assessments, spine studies, and dental or sinus views.',
    highlights: [
      'Quick walk-in coordination',
      'Chest & orthopedic views',
      'Clear film and report support',
    ],
    iconKey: 'xray',
    sampleTests: [
      'Chest PA / AP View',
      'Cervical & Lumbar Spine',
      'Knee / Shoulder / Ankle Joint',
      'KUB X-Ray',
      'PNS View',
    ],
  },
  {
    id: 'ecg',
    name: 'ECG',
    shortLabel: 'ECG',
    tagline: '12-lead electrocardiogram heart rhythm screening',
    description:
      'Resting 12-lead ECG testing to record cardiac electrical activity for routine pre-operative clearance, chest discomfort evaluation, and cardiac follow-ups.',
    highlights: [
      'Minimal wait time at centre',
      'Resting 12-lead recording',
      'Suitable for preventive checks',
    ],
    iconKey: 'ecg',
    sampleTests: [
      'Resting 12-Lead ECG',
      'Pre-Operative Cardiac ECG',
      'Routine Screening ECG',
    ],
  },
  {
    id: 'mri',
    name: 'MRI 3T Wide Bore',
    shortLabel: 'MRI 3T Wide Bore',
    tagline: 'High-clarity wide-bore MRI coordination & scheduling',
    description:
      'Wide-bore 3T MRI diagnostic scheduling designed for patient comfort during neurological, spine, joint, and abdominal imaging studies.',
    highlights: [
      'Spacious wide-bore comfort',
      'Dedicated slot coordination',
      'Pre-scan safety checklist',
    ],
    iconKey: 'mri',
    sampleTests: [
      'MRI Brain',
      'MRI Cervical / Lumbar Spine',
      'MRI Knee & Shoulder',
      'MRI Abdomen / MRCP',
    ],
  },
  {
    id: 'packages',
    name: 'Health Checkup Packages',
    shortLabel: 'Health Checkup Packages',
    tagline: 'Bundled preventive wellness panels for every age group',
    description:
      'Structured preventive packages combining essential blood and organ-function screenings for individuals, working adults, women, men, and senior citizens.',
    highlights: [
      'Compare packages side-by-side',
      'Home collection option available',
      'Preventive annual checkups',
    ],
    iconKey: 'packages',
    sampleTests: [
      'Basic Health Checkup',
      'Full Body Checkup',
      'Comprehensive Health Checkup',
      'Senior Citizen Package',
    ],
  },
  {
    id: 'home-collection',
    name: 'Home Sample Collection',
    shortLabel: 'Home Sample Collection',
    tagline: 'Doorstep phlebotomy by trained sample collectors',
    description:
      'Skip the waiting room with convenient doorstep blood and urine sample collection scheduled around your preferred morning or daytime slot.',
    highlights: [
      'Ideal for fasting blood tests',
      'Comfortable for senior citizens',
      '24/7 Service enquiry desk',
    ],
    iconKey: 'home',
    sampleTests: [
      'Morning Fasting Blood Draw',
      'Senior Citizen Home Visit',
      'Full Body Package Collection',
      'Post-Meal Glucose Collection',
    ],
  },
  {
    id: 'tmt',
    name: 'TMT',
    shortLabel: 'TMT',
    tagline: 'Treadmill cardiac stress testing under observation',
    description:
      'Exercise tolerance (Treadmill Test) evaluation assessing heart rhythm and blood pressure response during controlled physical exertion.',
    highlights: [
      'Scheduled cardiac slot',
      'Pre-test attire & meal guidance',
      'Resting ECG baseline check',
    ],
    iconKey: 'tmt',
    sampleTests: [
      'Cardiac Treadmill Test (TMT)',
      'Preventive Cardiac Fitness Check',
    ],
  },
];

export const WHY_CHOOSE_ITEMS = [
  {
    id: 'diagnostic-services',
    label: 'Diagnostic Services',
    title: 'Multi-Modality Testing Under One Roof',
    description:
      'Access Pathology Tests, Ultrasound, X-Ray, ECG, MRI 3T Wide Bore, and TMT through coordinated scheduling at our Uttam Nagar centre.',
  },
  {
    id: 'home-collection',
    label: 'Convenient Home Collection',
    title: 'Doorstep Sample Pickup at Your Slot',
    description:
      'Schedule morning fasting draws or routine blood collections from home without waiting-room delays.',
  },
  {
    id: 'comprehensive-menu',
    label: 'Comprehensive Test Menu',
    title: 'Routine Panels & Preventive Packages',
    description:
      'From individual blood investigations to structured male, female, and senior citizen health checkups tailored for clarity.',
  },
  {
    id: 'patient-support',
    label: 'Patient Support',
    title: '24/7 Service & 8 AM – 8 PM Centre Hours',
    description:
      'Direct assistance on 9870172229 and 9891646613 for test preparation, slot booking, and tariff enquiries.',
  },
];

export const HEALTH_PACKAGES: HealthPackage[] = [
  {
    id: 'basic-health',
    name: 'Basic Health Checkup',
    category: 'preventive',
    testCountLabel: 'Editable Placeholder: Test Count (Confirm on Enquiry)',
    priceLabel: '₹ [Editable Price]',
    isPlaceholderPricing: true,
    shortDescription:
      'Essential baseline screening covering core blood counts, blood sugar, and primary organ markers for routine annual awareness.',
    fastingRequirement: '8–10 Hours Fasting Recommended',
    sampleType: 'Blood & Urine (Confirm at Booking)',
    idealFor: 'First-time annual checkups & young adults',
    focusAreas: [
      'Complete Blood Count (CBC) — Placeholder Focus',
      'Fasting Blood Glucose — Placeholder Focus',
      'Liver & Kidney Baseline Markers — Placeholder Focus',
      'Routine Urine Examination — Placeholder Focus',
    ],
    preparationNote:
      'Plain water is permitted during the fasting window. Confirm final parameter list and price with the lab desk.',
  },
  {
    id: 'full-body',
    name: 'Full Body Checkup',
    category: 'preventive',
    testCountLabel: 'Editable Placeholder: Test Count (Confirm on Enquiry)',
    priceLabel: '₹ [Editable Price]',
    isPlaceholderPricing: true,
    shortDescription:
      'Balanced preventive panel evaluating metabolic health, lipid balance, thyroid function, liver, and kidney wellness.',
    fastingRequirement: '10–12 Hours Overnight Fasting',
    sampleType: 'Blood & Urine (Confirm at Booking)',
    idealFor: 'Adults seeking yearly preventive screening',
    focusAreas: [
      'Complete Blood Count & ESR — Placeholder Focus',
      'Lipid Profile & Blood Sugar / HbA1c — Placeholder Focus',
      'Thyroid Profile (T3, T4, TSH) — Placeholder Focus',
      'Liver Function (LFT) & Kidney Function (KFT) — Placeholder Focus',
    ],
    preparationNote:
      'Avoid heavy meals or alcohol 24 hours before collection. Exact test list and tariff are confirmed upon enquiry.',
  },
  {
    id: 'comprehensive-health',
    name: 'Comprehensive Health Checkup',
    category: 'comprehensive',
    testCountLabel: 'Editable Placeholder: Test Count (Confirm on Enquiry)',
    priceLabel: '₹ [Editable Price]',
    isPlaceholderPricing: true,
    shortDescription:
      'In-depth multi-system diagnostic profile adding vitamin levels, iron studies, and broader metabolic markers for thorough evaluation.',
    fastingRequirement: '10–12 Hours Overnight Fasting',
    sampleType: 'Blood & Urine (Confirm at Booking)',
    idealFor: 'Detailed annual assessment & fatigue evaluation',
    focusAreas: [
      'Full Metabolic, LFT, KFT & Lipid Panels — Placeholder Focus',
      'Thyroid & Diabetes (HbA1c + Fasting Glucose) — Placeholder Focus',
      'Vitamin D & Vitamin B12 Screening — Placeholder Focus',
      'Iron Profile & Electrolytes — Placeholder Focus',
    ],
    preparationNote:
      'Please inform our technician about ongoing vitamin supplements or medications before sample collection.',
  },
  {
    id: 'male-health',
    name: 'Male Health Package',
    category: 'gender',
    testCountLabel: 'Editable Placeholder: Test Count (Confirm on Enquiry)',
    priceLabel: '₹ [Editable Price]',
    isPlaceholderPricing: true,
    shortDescription:
      'Tailored preventive assessment for men focusing on cardiovascular risk markers, liver health, metabolism, and age-appropriate screening.',
    fastingRequirement: '10–12 Hours Overnight Fasting',
    sampleType: 'Blood & Urine (Confirm at Booking)',
    idealFor: 'Adult men & working professionals',
    focusAreas: [
      'Cardiovascular Lipid & Blood Sugar Markers — Placeholder Focus',
      'Liver, Kidney & Uric Acid Assessment — Placeholder Focus',
      'Thyroid & Complete Hemogram — Placeholder Focus',
      'Men’s Preventive Screening Markers — Placeholder Focus',
    ],
    preparationNote:
      'Morning collection between 8 AM and 11 AM is ideal for fasting metabolic panels. Confirm included tests with our team.',
  },
  {
    id: 'female-health',
    name: 'Female Health Package',
    category: 'gender',
    testCountLabel: 'Editable Placeholder: Test Count (Confirm on Enquiry)',
    priceLabel: '₹ [Editable Price]',
    isPlaceholderPricing: true,
    shortDescription:
      'Dedicated wellness screening for women covering hemoglobin, iron reserves, thyroid balance, calcium, vitamin status, and metabolic health.',
    fastingRequirement: '10–12 Hours Overnight Fasting',
    sampleType: 'Blood & Urine (Confirm at Booking)',
    idealFor: 'Women across all adult age groups',
    focusAreas: [
      'CBC, Iron & Hemoglobin Assessment — Placeholder Focus',
      'Thyroid Panel & Calcium / Vitamin D — Placeholder Focus',
      'Liver, Kidney & Lipid Screening — Placeholder Focus',
      'Blood Glucose & HbA1c — Placeholder Focus',
    ],
    preparationNote:
      'Share any thyroid or nutritional supplements with the phlebotomist. Final tariff & parameter count confirmed on enquiry.',
  },
  {
    id: 'senior-citizen',
    name: 'Senior Citizen Package',
    category: 'senior',
    testCountLabel: 'Editable Placeholder: Test Count (Confirm on Enquiry)',
    priceLabel: '₹ [Editable Price]',
    isPlaceholderPricing: true,
    shortDescription:
      'Thoughtfully structured checkup for older adults with convenient home collection, tracking diabetes, kidney, liver, bone, and cardiac risk markers.',
    fastingRequirement: '8–12 Hours Fasting (Check Medication Timing)',
    sampleType: 'Blood & Urine (Home Collection Eligible)',
    idealFor: 'Adults aged 60+ & routine chronic care monitoring',
    focusAreas: [
      'Diabetes (HbA1c + Fasting Sugar) & Lipid Profile — Placeholder Focus',
      'Kidney, Liver & Electrolyte Balance — Placeholder Focus',
      'Calcium, Vitamin D & B12 Support — Placeholder Focus',
      'Complete Blood Count & Thyroid Function — Placeholder Focus',
    ],
    preparationNote:
      'Consult your physician before pausing morning medications. Home collection is recommended for added comfort.',
  },
];

export const EDUCATIONAL_ARTICLES: EducationalArticle[] = [
  {
    id: 'preventive-checkups',
    title: 'Importance of Preventive Health Checkups',
    category: 'Preventive Care',
    readTime: '3 min read',
    summary:
      'Why routine diagnostic screening helps identify silent metabolic shifts before noticeable symptoms develop.',
    keyTakeaways: [
      'Many lifestyle conditions develop gradually without early physical signs.',
      'Annual baseline blood work gives your doctor objective comparison data.',
      'Early clarity supports timely dietary, lifestyle, or medical adjustments.',
    ],
    bodyParagraphs: [
      'Preventive health checkups are designed to establish a clear baseline of how key systems—such as your liver, kidneys, thyroid, and blood sugar regulation—are functioning even when you feel completely well.',
      'Changes in cholesterol, HbA1c, hemoglobin, or vitamin levels often appear in laboratory values months or years before causing noticeable fatigue or discomfort. Reviewing periodic trends with a qualified physician makes follow-up care far more proactive.',
      'At Rudransh Healthcare & Path Lab, patients can choose between visiting our Uttam Nagar centre or scheduling morning home sample collection for hassle-free annual screening.',
    ],
  },
  {
    id: 'common-blood-tests',
    title: 'Understanding Common Blood Tests',
    category: 'Patient Guide',
    readTime: '4 min read',
    summary:
      'A plain-language overview of CBC, Lipid Profile, LFT, KFT, Thyroid, and HbA1c tests commonly advised by doctors.',
    keyTakeaways: [
      'CBC evaluates red cells, white cells, and platelets for overall blood health.',
      'LFT and KFT check liver enzyme activity and kidney filtration markers.',
      'HbA1c reflects average blood glucose control over roughly 2–3 months.',
    ],
    bodyParagraphs: [
      'A Complete Blood Count (CBC) is one of the most frequent laboratory investigations, measuring hemoglobin, red blood cell indices, white blood cell counts, and platelets to screen for anemia or infection markers.',
      'Organ function panels—including Liver Function Tests (LFT) and Kidney Function Tests (KFT)—measure specific enzymes, proteins, bilirubin, creatinine, and urea. Thyroid profiles (T3, T4, TSH) assess metabolic hormone regulation.',
      'Your clinician always interprets laboratory numbers alongside your medical history and symptoms rather than in isolation.',
    ],
  },
  {
    id: 'preparing-for-tests',
    title: 'Preparing for Diagnostic Tests',
    category: 'Preparation',
    readTime: '3 min read',
    summary:
      'Practical steps on fasting duration, hydration, medications, and pre-scan etiquette for accurate diagnostic results.',
    keyTakeaways: [
      'Fasting tests typically require 8–12 hours without food or sweetened drinks.',
      'Drinking plain water keeps you hydrated and eases blood sample collection.',
      'Always inform the lab desk about regular prescription medicines or scans.',
    ],
    bodyParagraphs: [
      'Proper pre-test preparation helps ensure your sample reflects your true baseline. For fasting blood glucose and lipid profiles, avoid food, tea, coffee, or juice for 8 to 12 hours prior to collection while continuing plain water.',
      'For imaging investigations like whole-abdomen ultrasound or MRI 3T Wide Bore, preparation varies—some ultrasound scans require a full bladder or overnight fasting, while MRI requires removing metallic items and completing a safety check.',
      'If you are unsure about your specific test instructions, call our desk on 9870172229 or 9891646613 before your appointment.',
    ],
  },
  {
    id: 'regular-screening',
    title: 'Benefits of Regular Health Screening',
    category: 'Wellness',
    readTime: '3 min read',
    summary:
      'How consistent monitoring supports long-term family wellness, nutrition tracking, and confident doctor consultations.',
    keyTakeaways: [
      'Tracks response to nutrition, exercise, or prescribed therapy over time.',
      'Supports senior citizens and working adults with structured check-ins.',
      'Convenient home sample collection removes waiting-room barriers.',
    ],
    bodyParagraphs: [
      'Consistent health screening transforms isolated lab reports into an actionable health timeline. When doctors can compare current values against prior reports, subtle changes become much easier to evaluate accurately.',
      'Regular monitoring is especially helpful for individuals managing blood sugar, thyroid balance, cholesterol, or vitamin deficiencies, as well as senior citizens who benefit from periodic checkups without stressful travel.',
      'With Rudransh Healthcare & Path Lab offering both centre diagnostics (8 AM to 8 PM) and 24/7 service support, staying consistent with your checkups fits comfortably into your routine.',
    ],
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'book-test',
    question: 'How can I book a blood test?',
    answer:
      'You can submit an appointment or home sample collection request directly on this website using the "Book Appointment" or "Book a Home Collection" buttons, or call our clinic desk directly at 9870172229 or 9891646613. Our team will confirm your slot and preparation instructions.',
  },
  {
    id: 'home-collection',
    question: 'Is home sample collection available?',
    answer:
      'Yes. Rudransh Healthcare & Path Lab offers home sample collection so you can skip the waiting room. Simply choose "Home Sample Collection" in the booking form or call 9870172229 / 9891646613 to check slot availability in your area.',
  },
  {
    id: 'prepare-blood-test',
    question: 'How should I prepare for a blood test?',
    answer:
      'Preparation depends on the specific test. Routine fasting profiles (such as Lipid Profile or Fasting Blood Sugar) generally require 8–12 hours of overnight fasting with plain water allowed. Other tests require no fasting. Exact pre-test instructions are shared when your appointment is confirmed.',
  },
  {
    id: 'report-timing',
    question: 'When will I receive my reports?',
    answer:
      'Report turnaround time varies depending on the type of pathology test or imaging study (Placeholder — confirm exact report delivery timing and digital/printed report options with our lab desk at 9870172229 or 9891646613).',
    isEditablePolicy: true,
  },
  {
    id: 'enquire-prices',
    question: 'How can I enquire about test prices?',
    answer:
      'Package prices shown on the website are currently editable placeholders. To get the exact current tariff for individual tests, packages, or imaging (Ultrasound, X-Ray, ECG, MRI 3T Wide Bore, TMT), please call 9870172229 / 9891646613 or message us on WhatsApp.',
  },
  {
    id: 'location',
    question: 'Where is Rudransh Healthcare located?',
    answer:
      'We are located at RZ-11, Govardhan Park, Uttam Nagar, Dal Mill Road, New Delhi – 110059. Centre visiting hours are 8 AM to 8 PM, with 24/7 service support available via phone.',
  },
];
