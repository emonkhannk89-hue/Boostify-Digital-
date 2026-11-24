const FIREBASE_DB_URL = "https://australia-visa-applicati-42cca-default-rtdb.firebaseio.com/applications.json";
const FIREBASE_SETTINGS_URL = "https://australia-visa-applicati-42cca-default-rtdb.firebaseio.com/settings.json";
const LOCAL_CACHE_KEY = "aus_dha_cached_applications_v2026";

let cachedApplications = loadLocalAppsCache();
let currentLang = 'en';
let chatLang = 'bn';

let currentFingerIndex = 0; 
const fingerNames = [
    "Step 1/8: Right Hand - Thumb Finger",
    "Step 2/8: Right Hand - Index Finger",
    "Step 3/8: Right Hand - Middle Finger",
    "Step 4/8: Right Hand - Ring Finger",
    "Step 5/8: Left Hand - Thumb Finger",
    "Step 6/8: Left Hand - Index Finger",
    "Step 7/8: Left Hand - Middle Finger",
    "Step 8/8: Left Hand - Ring Finger"
];

const fingerLabels = [
    "Right Hand - Thumb",
    "Right Hand - Index",
    "Right Hand - Middle",
    "Right Hand - Ring",
    "Left Hand - Thumb",
    "Left Hand - Index",
    "Left Hand - Middle",
    "Left Hand - Ring"
];

const countryListArray = [
    "BANGLADESH", "AFGHANISTAN", "ALBANIA", "ALGERIA", "ARGENTINA", "ARMENIA", "AUSTRALIA", "AUSTRIA",
    "AZERBAIJAN", "BAHRAIN", "BELGIUM", "BHUTAN", "BRAZIL", "CANADA", "CHINA", "EGYPT", "FRANCE",
    "GERMANY", "INDIA", "INDONESIA", "IRAQ", "ITALY", "JAPAN", "JORDAN", "KUWAIT", "MALAYSIA",
    "MALDIVES", "NEPAL", "NETHERLANDS", "NEW ZEALAND", "OMAN", "PAKISTAN", "PHILIPPINES", "QATAR",
    "SAUDI ARABIA", "SINGAPORE", "SOUTH AFRICA", "SPAIN", "SRI LANKA", "SWEDEN", "THAILAND", "TURKEY",
    "UNITED ARAB EMIRATES", "UNITED KINGDOM", "UNITED STATES", "VIETNAM"
];

const translations = {
    en: {
        topGov: "Australian Government • Department of Home Affairs", 
        subImmi: "ImmiAccount", 
        subVevo: "Visa Entitlement Verification Online (VEVO)", 
        svgGov: "Australian Government", 
        svgDept: "Department of Home Affairs", 
        menu: "Menu", 
        home: "Home Affairs", 
        apply: "Visas & Application", 
        fingerprint: "Biometric Fingerprint", 
        status: "Check Status (VEVO)", 
        chat: "Live Support", 
        lawyers: "MARA Legal Agents", 
        reviews: "Success Stories", 
        faq: "FAQ & Help", 
        newsBadge: "🛡️ DHA Announcement:", 
        newsText: "All Company Work Permit and online visa processing for Australia's leading corporations and agriculture farms is currently ongoing. Apply fast and secure your placement!", 
        homeTopNote: "Department of Home Affairs • Immigration, Border & Visa Gateway",
        homeHead: "Immigration, Work Permits & All Company Visa Services", 
        homeDesc: "Apply safely for Australia All Company work offers, job offer letters, and work permit visas with 100% transparency.", 
        stat1: "Total Applicants", 
        stat2: "Visas & Jobs Approved", 
        stat3: "Satisfaction Rate", 
        portfolioAnnounce: "Portfolio Announcement:", 
        portfolioDesc: "Australia All Company Visa Services - Trusted recruitment and visa processing provider.", 
        homeBottomTitle: "Key Migration & Work Permit Highlights",
        homeBottomList: [
            "Direct employer sponsorship & corporate/agricultural placement support across Australia.",
            "Digital application lodgement with instant Application ID generation (AUS-XXX).",
            "Real-time VEVO status verification and 8-finger biometric touch enrolment."
        ],
        applyTopNote: "Online Lodgement Portal • Prepare Valid Passport, NID & Photo Before Submitting",
        applyHead: "Australia All Company Online Visa & Job Application", 
        lblFullName: "Full Name (As per Passport):", 
        lblDob: "Date of Birth:", 
        lblPhone: "Active Mobile Number:", 
        lblEmail: "Email Address:", 
        lblPassport: "Passport No:", 
        lblPassportCountry: "Passport Country:", 
        lblVisaType: "Company & Visa Category:", 
        docHeader: "Mandatory Documents & Photo Upload", 
        uploadTipBox: "Upload clear JPG/PNG/PDF files (recommended under 2MB each) for faster verification.",
        lblPassPhoto: "Passport Size Photo:", 
        lblPassCopy: "Passport Copy:", 
        lblNidFront: "NID Card Front Side:", 
        lblNidBack: "NID Card Back Side:", 
        payHeader: "Payment Information", 
        feeNote: "📌 Processing Fee: 9,500 BDT (approx. 125 AUD).", 
        lblPayMethod: "Payment Method:", 
        lblAccountTitle: "Account Title / Bank:", 
        copyBtnText: "📋 Copy", 
        lblSender: "Sender Number / Account No:", 
        lblPayReceipt: "Upload Payment Receipt (Optional):", 
        submitAppBtn: "Submit Application", 
        applyBottomTitle: "Application Submission Guidelines",
        applyBottomList: [
            "Ensure your full name matches your machine-readable passport exactly.",
            "Clear scans or photos of NID front/back and passport prevent processing delays.",
            "Save your generated Application ID after submission for biometric & status checks."
        ],
        fpTopNote: "Biometric Enrolment • Sequential 8-Finger Capture (Right & Left Hand)",
        fpMainHead: "8-Fingerprint Biometric Touch Verification", 
        fpMainDesc: "Enter your Application ID or Passport Number, then tap the biometric sensor sequentially for all 8 fingers (Right Hand 4 Fingers, then Left Hand 4 Fingers).", 
        lblFpInputId: "Application ID or Passport No:", 
        sensorStatusReady: "Status: Tap sensor to scan finger", 
        fpBottomTitle: "Biometric Scan Instructions",
        fpBottomList: [
            "Keep your finger clean and dry when tapping the sensor area.",
            "Complete all 8 steps in sequence so your biometric record is marked verified."
        ],
        statusTopNote: "VEVO & Entitlement Check • Real-Time Application & Document Status",
        statusHeadText: "Online Visa & Job Verification Portal", 
        openPortalBtnText: "Open Verification Portal ↗", 
        statusDescText: "Enter applicant passport number or Application ID below to check real-time visa entitlement.", 
        lblCheckPass: "Passport Number:", 
        lblCheckId: "Application ID (Optional):", 
        checkStatusBtn: "Check Verification Status", 
        statusBottomTitle: "Verification & Approved Documents Info",
        statusBottomList: [
            "Approved offer letters, work permit agreements, grant notices, and receipts appear once enabled.",
            "Use the external VEVO portal button for a standalone verification window."
        ],
        chatTopNote: "Live Support Desk • Instant Answers on Fees, Processing Time & Steps",
        chatMainTitle: "Live Support Assistant", 
        chatQ1: "❓ What is the visa & job processing cost?", 
        chatQ2: "❓ How long does it take to get documents?", 
        chatWelcome: "👋 Welcome to Australia All Company Support!", 
        chatBottomTitle: "Support Hours & Assistance",
        chatBottomList: [
            "Quick automated answers available 24/7 via the quick questions above or the floating chat widget.",
            "Keep your Application ID or Passport No handy when asking about a submitted file."
        ],
        lawyersTopNote: "Migration Legal Advisory • Registered MARA Compliance & Guidance",
        lawyersHeadText: "Authorized Immigration Lawyers (MARA Agents)", 
        lawyerName: "Robert Henderson (Senior MARA)", 
        lawyerDesc: "License No: MARA#0849122 | Legal Head.", 
        lawyerBio: "Specializes in employer-sponsored work permits, subclass compliance, and document verification for corporate & agricultural placements.",
        lawyer2Name: "Claire Bennett (Registered Migration Agent)",
        lawyer2Desc: "License No: MARA#1572904 | Visa & Compliance Specialist.",
        lawyer2Bio: "Advises applicants on visa stream eligibility, nomination documentation, health/character clearance steps, and VEVO readiness.",
        lawyersBottomTitle: "Legal & Compliance Scope",
        lawyersBottomList: [
            "Document review, visa stream alignment, and sponsorship compliance oversight.",
            "Transparent guidance in accordance with Australian migration regulations."
        ],
        reviewsTopNote: "Verified Applicant Feedback • Work Permit & Placement Experiences",
        reviewsHeadText: "Client Reviews & Success Stories", 
        reviewAuthor: "Shariful Islam:", 
        reviewText: "Got my job offer letter and work permit visa very fast. Highly trusted.", 
        reviewsBottomTitle: "Applicant Experience Highlights",
        reviewsBottomList: [
            "Clear step-by-step updates from initial lodgement to document issuance.",
            "Dedicated support for corporate and agricultural job placements."
        ],
        faqTopNote: "Help Center • Common Questions About Visas, Fees & Timelines",
        faqHeadText: "Frequently Asked Questions (FAQ)", 
        faqQ1: "Q1: How long does it take to get Job Letter & Visa?", 
        faqA1: "Ans: Usually within 24 to 48 hours our team reviews and issues documents.", 
        faqBottomTitle: "Additional Help Notes",
        faqBottomList: [
            "Check your VEVO status anytime using your Passport Number.",
            "Contact Live Support if you need help with payment methods or document uploads."
        ],
        modalLoadingText: "Processing Application...", 
        modalSuccessText: "Application Submitted!", 
        modalCopyBtn: "📋 Copy ID", 
        modalDoneBtn: "Done", 
        alertNoticeTitle: "Notice", 
        agenciesSectionTitle: "Agencies", 
        agency1Name: "Australian Border Force", 
        agency2Gov: "Australian Government", 
        agency2Sub: "National Emergency Management Agency", 
        agency3Name: "Australian Federal Police", 
        agency4Gov: "Australian Government", 
        agency4Sub: "Australian Security Intelligence Organisation", 
        agency5Gov: "Australian Government", 
        agency5Sub: "Australian Transaction Reports and Analysis Centre", 
        footCol1: "Department Portfolio", 
        footCol2: "Online Services", 
        footCol3: "Help & Support", 
        footCol4: "Australia All Company Gateway", 
        footItem1: "Immigration and Citizenship", 
        footItem2: "Australian Border Force", 
        footItem3: "National Security Gateway", 
        footItem4: "VEVO / EVO Check", 
        footItem5: "ImmiAccount Lodgement", 
        footItem6: "Visa Entitlement Verification", 
        footItem7: "Contact Support Center", 
        footItem8: "MARA Legal Directory", 
        footItem9: "FAQ & Guidelines", 
        footPartnerText: "Authorized Processing Partner • Department of Home Affairs Portfolio", 
        footCopy: "© 2026 Australia All Company Migration Services. All Rights Reserved. SSL Encrypted 🔒", 
        footLinksBottom: "Accessibility • Privacy Policy • Copyright Statement • Disclaimer",
        fpAllCompletedMsg: "✅ All 8 fingers have been scanned and verified successfully! Your processing is underway."
    },
    bn: {
        topGov: "অস্ট্রেলিয়ান সরকার • স্বরাষ্ট্র বিভাগ", 
        subImmi: "ইমিঅ্যাকাউন্ট", 
        subVevo: "অনলাইন ভিসা সত্যতা যাচাই (VEVO)", 
        svgGov: "Australian Government", 
        svgDept: "Department of Home Affairs", 
        menu: "মেনু", 
        home: "হোম অ্যাফেয়ার্স", 
        apply: "ভিসা ও আবেদন", 
        fingerprint: "বায়োমেট্রিক ফিঙ্গারপ্রিন্ট", 
        status: "স্ট্যাটাস চেক (VEVO)", 
        chat: "লাইভ সাপোর্ট", 
        lawyers: "MARA লিগ্যাল এজেন্ট", 
        reviews: "সাফল্যের গল্প", 
        faq: "প্রশ্ন ও সহায়তা", 
        newsBadge: "🛡️ ডিএইচএ ঘোষণা:", 
        newsText: "অস্ট্রেলিয়ার শীর্ষস্থানীয় কর্পোরেশন এবং কৃষি খামারগুলির জন্য সমস্ত কোম্পানির ওয়ার্ক পারমিট এবং অনলাইন ভিসা প্রক্রিয়াকরণ বর্তমানে চলছে। দ্রুত আবেদন করুন!", 
        homeTopNote: "স্বরাষ্ট্র বিভাগ • ইমিগ্রেশন, বর্ডার এবং ভিসা গেটওয়ে",
        homeHead: "ইমিগ্রেশন, ওয়ার্ক পারমিট এবং অল কোম্পানি ভিসা সার্ভিসেস", 
        homeDesc: "১০০% স্বচ্ছতার সাথে অস্ট্রেলিয়া অল কোম্পানি কাজের অফার এবং ওয়ার্ক পারমিট ভিসার জন্য নিরাপদে আবেদন করুন।", 
        stat1: "মোট আবেদনকারী", 
        stat2: "ভিসা ও জব অনুমোদিত", 
        stat3: "সন্তুষ্টির হার", 
        portfolioAnnounce: "পোর্টফোলিও ঘোষণা:", 
        portfolioDesc: "অস্ট্রেলিয়া অল কোম্পানি ভিসা সার্ভিসেস - বিশ্বস্ত রিক্রুটমেন্ট ও ভিসা প্রসেসিং প্রদানকারী।", 
        homeBottomTitle: "ইমিগ্রেশন ও ওয়ার্ক পারমিট মূল বৈশিষ্ট্য",
        homeBottomList: [
            "অস্ট্রেলিয়াজুড়ে সরাসরি নিয়োগকর্তা স্পনসরশিপ এবং কর্পোরেট ও কৃষি খামারে কাজের সহায়তা।",
            "দ্রুত Application ID (AUS-XXX) সহ ডিজিটাল আবেদন জমা দেওয়ার সুবিধা।",
            "রিয়েল-টাইম VEVO স্ট্যাটাস যাচাই এবং ৮-আঙুলের বায়োমেট্রিক টাচ এনরোলমেন্ট।"
        ],
        applyTopNote: "অনলাইন আবেদন পোর্টাল • জমা দেওয়ার আগে সঠিক পাসপোর্ট, এনআইডি ও ছবি প্রস্তুত রাখুন",
        applyHead: "অস্ট্রেলিয়া অল কোম্পানি অনলাইন ভিসা ও জব আবেদন", 
        lblFullName: "পুরো নাম (পাসপোর্ট অনুযায়ী):", 
        lblDob: "জন্ম তারিখ:", 
        lblPhone: "সক্রিয় মোবাইল নম্বর:", 
        lblEmail: "ইমেল ঠিকানা:", 
        lblPassport: "পাসপোর্ট নম্বর:", 
        lblPassportCountry: "পাসপোর্টের দেশ:", 
        lblVisaType: "কোম্পানি ও ভিসা ক্যাটাগরি:", 
        docHeader: "বাধ্যতামূলক ডকুমেন্টস ও ছবি আপলোড", 
        uploadTipBox: "দ্রুত যাচাইয়ের জন্য স্পষ্ট JPG/PNG/PDF ফাইল (প্রতিটি ২MB-এর নিচে হলে ভালো) আপলোড করুন।",
        lblPassPhoto: "পাসপোর্ট সাইজ ছবি:", 
        lblPassCopy: "পাসপোর্ট কপি:", 
        lblNidFront: "এনআইডি কার্ডের সামনের সাইড:", 
        lblNidBack: "এনআইডি কার্ডের পেছনের সাইড:", 
        payHeader: "পেমেন্ট তথ্য", 
        feeNote: "📌 প্রসেসিং ফি: ৯,৫০০ টাকা (প্রায় ১২৫ অস্ট্রেলিয়ান ডলার)।", 
        lblPayMethod: "পেমেন্ট পদ্ধতি:", 
        lblAccountTitle: "অ্যাকাউন্ট টাইটেল / ব্যাংক:", 
        copyBtnText: "📋 কপি করুন", 
        lblSender: "প্রেরক নম্বর / অ্যাকাউন্ট নম্বর:", 
        lblPayReceipt: "পেমেন্ট রসিদ আপলোড করুন (ঐচ্ছিক):", 
        submitAppBtn: "আবেদন জমা দিন", 
        applyBottomTitle: "আবেদন জমা দেওয়ার নির্দেশিকা",
        applyBottomList: [
            "আপনার পুরো নাম অবশ্যই পাসপোর্টের নামের সাথে হুবহু মিলতে হবে।",
            "স্পষ্ট এনআইডি ও পাসপোর্টের ছবি/কপি আপলোড করলে প্রসেসিং দ্রুত হয়।",
            "আবেদন শেষে প্রাপ্ত Application ID সংরক্ষণ করুন ফিঙ্গারপ্রিন্ট ও স্ট্যাটাস চেকের জন্য।"
        ],
        fpTopNote: "বায়োমেট্রিক এনরোলমেন্ট • ডান ও বাম হাতের ৮টি আঙুল স্ক্যান করুন",
        fpMainHead: "৮-আঙুলের বায়োমেট্রিক টাচ ভেরিফিকেশন", 
        fpMainDesc: "আপনার অ্যাপ্লিকেশন আইডি বা পাসপোর্ট নম্বর লিখুন, তারপর পরপর ৮টি আঙুলের জন্য বায়োমেট্রিক সেন্সরে ট্যাপ করুন (প্রথমে ডান হাতের ৪টি, তারপর বাম হাতের ৪টি)।", 
        lblFpInputId: "অ্যাপ্লিকেশন আইডি বা পাসপোর্ট নম্বর:", 
        sensorStatusReady: "স্ট্যাটাস: আঙুল স্ক্যান করতে সেন্সরে ট্যাপ করুন", 
        fpBottomTitle: "বায়োমেট্রিক স্ক্যান নির্দেশাবলী",
        fpBottomList: [
            "সেন্সরে ট্যাপ করার সময় আঙুল পরিষ্কার ও শুষ্ক রাখুন।",
            "ভেরিফিকেশন সম্পন্ন করতে পরপর ৮টি ধাপই শেষ করুন।"
        ],
        statusTopNote: "VEVO ও স্ট্যাটাস যাচাই • রিয়েল-টাইম আবেদন ও ডকুমেন্ট অবস্থা",
        statusHeadText: "অনলাইন ভিসা ও জব ভেরিফিকেশন পোর্টাল", 
        openPortalBtnText: "ভেরিফিকেশন পোর্টাল খুলুন ↗", 
        statusDescText: "রিয়েল-টাইম ভিসা সত্যতা যাচাই করতে নিচে আবেদনকারীর পাসপোর্ট নম্বর বা অ্যাপ্লিকেশন আইডি লিখুন।", 
        lblCheckPass: "পাসপোর্ট নম্বর:", 
        lblCheckId: "অ্যাপ্লিকেশন আইডি (ঐচ্ছিক):", 
        checkStatusBtn: "ভেরিফিকেশন স্ট্যাটাস চেক করুন", 
        statusBottomTitle: "ভেরিফিকেশন ও অনুমোদিত ডকুমেন্ট তথ্য",
        statusBottomList: [
            "অনুমোদিত অফার লেটার, ওয়ার্ক পারমিট অ্যাগ্রিমেন্ট, গ্র্যান্ট নোটিশ ও রসিদ এখানে দেখা যাবে।",
            "আলাদা উইন্ডোতে দেখতে উপরের ভেরিফিকেশন পোর্টাল বাটনে ক্লিক করুন।"
        ],
        chatTopNote: "লাইভ সাপোর্ট ডেস্ক • ফি, সময় ও আবেদন প্রক্রিয়ার তাৎক্ষণিক তথ্য",
        chatMainTitle: "লাইভ চ্যাট অ্যাসিস্ট্যান্ট", 
        chatQ1: "❓ ভিসা এবং জব প্রসেসিং খরচ কত?", 
        chatQ2: "❓ কাগজপত্র পেতে কত সময় লাগে?", 
        chatWelcome: "👋 অস্ট্রেলিয়া অল কোম্পানি সাপোর্টে আপনাকে স্বাগতম!", 
        chatBottomTitle: "সাপোর্ট ও সহায়তা তথ্য",
        chatBottomList: [
            "উপরের কুইক প্রশ্ন বা নিচের চ্যাট উইজেটের মাধ্যমে ২৪/৭ তাৎক্ষণিক উত্তর পাবেন।",
            "ফাইল সম্পর্কে জানতে চাইলে আপনার Application ID বা পাসপোর্ট নম্বর হাতের কাছে রাখুন।"
        ],
        lawyersTopNote: "মাইগ্রেশন লিগ্যাল অ্যাডভাইজরি • নিবন্ধিত MARA গাইডলাইন ও তত্ত্বাবধান",
        lawyersHeadText: "অথরাইজড ইমিগ্রেশন লয়ার্স (MARA এজেন্ট)", 
        lawyerName: "রবার্ট হেন্ডারসন (সিনিয়র MARA)", 
        lawyerDesc: "লাইসেন্স নং: MARA#0849122 | লিগ্যাল হেড।", 
        lawyerBio: "কর্পোরেট ও কৃষি খাতের কাজের জন্য নিয়োগকর্তা-স্পন্সর্ড ওয়ার্ক পারমিট, সাবক্লাস কমপ্লায়েন্স ও ডকুমেন্ট যাচাইয়ে অভিজ্ঞ।",
        lawyer2Name: "ক্লেয়ার বেনেট (রেজিস্টার্ড মাইগ্রেশন এজেন্ট)",
        lawyer2Desc: "লাইসেন্স নং: MARA#1572904 | ভিসা ও কমপ্লায়েন্স স্পেশালিস্ট।",
        lawyer2Bio: "ভিসা ক্যাটাগরির যোগ্যতা, নমিনেশন ডকুমেন্ট, মেডিকেল/পুলিশ ক্লিয়ারেন্স ধাপ ও VEVO প্রস্তুতিতে পরামর্শ দেন।",
        lawyersBottomTitle: "আইনি ও কমপ্লায়েন্স সেবা",
        lawyersBottomList: [
            "ডকুমেন্ট যাচাই, সঠিক ভিসা ক্যাটাগরি নির্বাচন ও স্পনসরশিপ কমপ্লায়েন্স তত্ত্বাবধান।",
            "অস্ট্রেলিয়ান অভিবাসন বিধি অনুযায়ী স্বচ্ছ পরামর্শ।"
        ],
        reviewsTopNote: "যাচাইকৃত আবেদনকারীর মতামত • ওয়ার্ক পারমিট ও প্লেসমেন্ট অভিজ্ঞতা",
        reviewsHeadText: "ক্লায়েন্ট রিভিউ ও সাফল্যের গল্প", 
        reviewAuthor: "শরিফুল ইসলাম:", 
        reviewText: "খুব দ্রুত আমার জব অফার লেটার এবং ওয়ার্ক পারমিট ভিসা পেয়েছি। অত্যন্ত বিশ্বস্ত।", 
        reviewsBottomTitle: "আবেদনকারীদের অভিজ্ঞতা",
        reviewsBottomList: [
            "আবেদন জমা দেওয়া থেকে ডকুমেন্ট ইস্যু পর্যন্ত ধাপে ধাপে আপডেট।",
            "কর্পোরেট ও কৃষি খাতে কাজের সুযোগে সার্বিক সহযোগিতা।"
        ],
        faqTopNote: "সহায়তা কেন্দ্র • ভিসা, ফি ও সময়সীমা সম্পর্কিত সাধারণ প্রশ্নোত্তর",
        faqHeadText: "সচরাচর জিজ্ঞাস্য প্রশ্নাবলী (FAQ)", 
        faqQ1: "প্রশ্ন ১: জব লেটার ও ভিসা পেতে কতদিন সময় লাগে?", 
        faqA1: "উত্তর: সাধারণত ২৪ থেকে ৪৮ ঘণ্টার মধ্যে আমাদের টিম যাচাই করে ডকুমেন্ট ইস্যু করে।", 
        faqBottomTitle: "অতিরিক্ত সহায়তা নোট",
        faqBottomList: [
            "যেকোনো সময় পাসপোর্ট নম্বর দিয়ে VEVO স্ট্যাটাস যাচাই করতে পারবেন।",
            "পেমেন্ট বা ডকুমেন্ট আপলোডে কোনো প্রশ্ন থাকলে লাইভ সাপোর্টে যোগাযোগ করুন।"
        ],
        modalLoadingText: "আবেদন প্রসেস করা হচ্ছে...", 
        modalSuccessText: "আবেদন সফলভাবে জমা হয়েছে!", 
        modalCopyBtn: "📋 আইডি কপি করুন", 
        modalDoneBtn: "সম্পন্ন", 
        alertNoticeTitle: "বিজ্ঞপ্তি", 
        agenciesSectionTitle: "সংস্থাসমূহ (Agencies)", 
        agency1Name: "অস্ট্রেলিয়ান বর্ডার ফোর্স", 
        agency2Gov: "অস্ট্রেলিয়ান সরকার", 
        agency2Sub: "ন্যাশনাল ইমার্জেন্সি ম্যানেজমেন্ট এজেন্সি", 
        agency3Name: "অস্ট্রেলিয়ান ফেডারেল পুলিশ", 
        agency4Gov: "অস্ট্রেলিয়ান সরকার", 
        agency4Sub: "অস্ট্রেলিয়ান সিকিউরিটি ইন্টেলিজেন্স অর্গানাইজেশন", 
        agency5Gov: "অস্ট্রেলিয়ান সরকার", 
        agency5Sub: "অস্ট্রেলিয়ান ট্রানজ্যাকশন রিপোর্টস অ্যান্ড অ্যানালাইসিস সেন্টার", 
        footCol1: "ডিপার্টমেন্ট পোর্টফোলিও", 
        footCol2: "অনলাইন সার্ভিসেস", 
        footCol3: "সহায়তা ও সাপোর্ট", 
        footCol4: "অস্ট্রেলিয়া অল কোম্পানি গেটওয়ে", 
        footItem1: "ইমিগ্রেশন এবং সিটিজেনশিপ", 
        footItem2: "অস্ট্রেলিয়ান বর্ডার ফোর্স", 
        footItem3: "ন্যাশনিটি সিকিউরিটি গেটওয়ে", 
        footItem4: "VEVO / EVO চেক", 
        footItem5: "ইমিঅ্যাকাউন্ট লজমেন্ট", 
        footItem6: "ভিসা এনটাইটেলমেন্ট ভেরিফিকেশন", 
        footItem7: "সাপোর্ট সেন্টার যোগাযোগ", 
        footItem8: "MARA লিগ্যাল ডিরেক্টরি", 
        footItem9: "FAQ ও নির্দেশিকা", 
        footPartnerText: "অথরাইজড প্রসেসিং পার্টনার • স্বরাষ্ট্র বিভাগ পোর্টফোলিও", 
        footCopy: "© ২০২৬ অস্ট্রেলিয়া অল কোম্পানি মাইগ্রেশন সার্ভিসেস। সর্বস্বত্ব সংরক্ষিত। এসএসএল এনক্রিপ্টেড 🔒", 
        footLinksBottom: "অ্যাক্সেসিবিলিটি • গোপনীয়তা নীতি • কপিরাইট বিবৃতি • ডিসক্লেইমার",
        fpAllCompletedMsg: "✅ অভিনন্দন! আপনার ৮টি আঙুলের ফিঙ্গারপ্রিন্ট সফলভাবে স্ক্যান ও সাবমিট হয়েছে।"
    },
    zh: {
        topGov: "澳大利亚政府 • 内政部", subImmi: "ImmiAccount", subVevo: "签证权益在线查询 (VEVO)", svgGov: "Australian Government", svgDept: "Department of Home Affairs", menu: "菜单", home: "内政事务", apply: "签证与申请", fingerprint: "生物识别指纹", status: "状态查询 (VEVO)", chat: "在线支持", lawyers: "MARA 法律代理", reviews: "成功案例", faq: "帮助与常见问题", newsBadge: "🛡️ DHA公告:", newsText: "澳大利亚领先企业和农业农场的全公司工作许可和在线签证处理目前正在进行中。请尽快申请！",
        homeTopNote: "内政部 • 移民、边境与签证门户",
        homeHead: "移民、工作许可及全公司签证服务", homeDesc: "以100%的透明度安全申请澳大利亚全公司工作邀约、录用信及工作准证签证。", stat1: "总申请人数", stat2: "已批准签证及工作", stat3: "满意度", portfolioAnnounce: "项目公告:", portfolioDesc: "澳大利亚全公司签证服务 - 值得信赖的招聘与签证处理机构。",
        homeBottomTitle: "核心移民与工作许可亮点", homeBottomList: ["全澳雇主担保及企业/农业岗位支持。", "提交后即时生成申请编号 (AUS-XXX)。", "实时 VEVO 状态查询与 8 指生物识别录入。"],
        applyTopNote: "在线递交门户 • 提交前请准备好有效护照、身份证和照片",
        applyHead: "澳大利亚全公司在线签证与工作申请", lblFullName: "全名（与护照一致）:", lblDob: "出生日期:", lblPhone: "有效手机号码:", lblEmail: "电子邮箱:", lblPassport: "护照号码:", lblPassportCountry: "护照签发国:", lblVisaType: "公司及签证类别:", docHeader: "必填文件与照片上传",
        uploadTipBox: "请上传清晰的 JPG/PNG/PDF 文件（建议单份小于 2MB）以便更快核实。",
        lblPassPhoto: "护照尺寸照片:", lblPassCopy: "护照复印件:", lblNidFront: "身份证正面:", lblNidBack: "身份证背面:", payHeader: "支付信息", feeNote: "📌 处理费: 9,500 孟加拉塔卡（约合 125 澳元）。", lblPayMethod: "支付方式:", lblAccountTitle: "账户抬头 / 银行:", copyBtnText: "📋 复制", lblSender: "汇款人号码 / 账号:", lblPayReceipt: "上传支付凭证（可选）:", submitAppBtn: "提交申请",
        applyBottomTitle: "申请提交指南", applyBottomList: ["请确保姓名与护照完全一致。", "上传清晰的证件图片可加快审核。", "请妥善保存生成的申请编号以便后续查询。"],
        fpTopNote: "生物识别录入 • 按顺序扫描左右手共8个手指",
        fpMainHead: "8指生物识别触控验证", fpMainDesc: "请输入您的申请编号或护照号码，然后依次在生物识别传感器上扫描全部8个手指。", lblFpInputId: "申请编号或护照号:", sensorStatusReady: "状态: 点击传感器扫描手指",
        fpBottomTitle: "指纹扫描说明", fpBottomList: ["点击传感器时保持手指清洁干燥。", "按顺序完成全部8步验证。"],
        statusTopNote: "VEVO 与权益查询 • 实时申请与文件状态",
        statusHeadText: "在线签证与工作验证门户", openPortalBtnText: "打开验证门户 ↗", statusDescText: "在下方输入申请人护照号或申请编号以查询实时签证权益。", lblCheckPass: "护照号码:", lblCheckId: "申请编号（可选）:", checkStatusBtn: "检查验证状态",
        statusBottomTitle: "验证与获批文件说明", statusBottomList: ["获批后可在此查看录用信、工作许可协议及准签信。", "点击右上角按钮可在新窗口打开验证门户。"],
        chatTopNote: "在线支持中心 • 费用、时间与流程即时解答",
        chatMainTitle: "在线聊天助手", chatQ1: "❓ 签证和工作处理费用是多少？", chatQ2: "❓ 获取文件需要多长时间？", chatWelcome: "👋 欢迎来到澳大利亚全公司支持中心！",
        chatBottomTitle: "支持与帮助说明", chatBottomList: ["可通过上方快捷问题或右下角聊天窗口获得即时回复。", "查询个人申请时请准备好申请编号或护照号。"],
        lawyersTopNote: "移民法律咨询 • 注册 MARA 合规指导",
        lawyersHeadText: "授权移民律师 (MARA 代理)", lawyerName: "罗伯特·亨德森 (高级 MARA)", lawyerDesc: "执照号: MARA#0849122 | 法律负责人。",
        lawyerBio: "专注于雇主担保工作许可、签证类别合规及企业和农业岗位文件审核。",
        lawyer2Name: "克莱尔·贝内特 (注册移民代理)",
        lawyer2Desc: "执照号: MARA#1572904 | 签证与合规专家。",
        lawyer2Bio: "为申请人提供签证类别资格、提名文件、体检/无犯罪记录及 VEVO 准备指导。",
        lawyersBottomTitle: "法律与合规范围", lawyersBottomList: ["文件审核、签证类别匹配及担保合规指导。", "遵循澳大利亚移民法规提供透明咨询。"],
        reviewsTopNote: "已核实申请人反馈 • 工作许可与岗位经历",
        reviewsHeadText: "客户评价与成功案例", reviewAuthor: "谢里夫尔·伊斯兰:", reviewText: "非常快就拿到了工作录用信和工作签证。非常值得信赖。",
        reviewsBottomTitle: "申请人体验亮点", reviewsBottomList: ["从递交到签发提供清晰的进度更新。", "为企业和农业岗位提供全程协助。"],
        faqTopNote: "帮助中心 • 签证、费用与周期常见问题",
        faqHeadText: "常见问题 (FAQ)", faqQ1: "Q1: 获取工作信和签证需要多长时间？", faqA1: "答: 通常我们的团队会在24到48小时内审核并签发文件。",
        faqBottomTitle: "补充帮助提示", faqBottomList: ["随时使用护照号查询 VEVO 状态。", "如遇支付或上传问题，请联系在线支持。"],
        modalLoadingText: "正在处理申请...", modalSuccessText: "申请已提交！", modalCopyBtn: "📋 复制编号", modalDoneBtn: "完成", alertNoticeTitle: "通知", agenciesSectionTitle: "机构", agency1Name: "澳大利亚边防部队", agency2Gov: "澳大利亚政府", agency2Sub: "国家紧急管理局", agency3Name: "澳大利亚联邦警察", agency4Gov: "澳大利亚政府", agency4Sub: "澳大利亚安全情报组织", agency5Gov: "澳大利亚政府", agency5Sub: "澳大利亚交易报告和分析中心", footCol1: "部门概况", footCol2: "在线服务", footCol3: "帮助与支持", footCol4: "澳大利亚全公司门户", footItem1: "移民与公民身份", footItem2: "澳大利亚边防部队", footItem3: "国家安全网关", footItem4: "VEVO / EVO 查询", footItem5: "ImmiAccount 递交", footItem6: "签证权益验证", footItem7: "联系支持中心", footItem8: "MARA 法律名录", footItem9: "常见问题与指南", footPartnerText: "授权处理合作伙伴 • 内政部投资组合", footCopy: "© 2026 澳大利亚全公司移民服务。保留所有权利。SSL加密 🔒", footLinksBottom: "无障碍 • 隐私政策 • 版权声明 • 免责声明",
        fpAllCompletedMsg: "✅ 恭喜！您已成功扫描并提交全部8个手指的指纹。"
    },
    ar: {
        topGov: "الحكومة الأسترالية • وزارة الشؤون الداخلية", subImmi: "حساب الهجرة", subVevo: "التحقق من استحقاق التأشيرة عبر الإنترنت (VEVO)", svgGov: "Australian Government", svgDept: "Department of Home Affairs", menu: "القائمة", home: "الشؤون الداخلية", apply: "التأشيرات والطلبات", fingerprint: "بصمة الإصبع البيومترية", status: "التحقق من الحالة (VEVO)", chat: "الدعم المباشر", lawyers: "وكلاء MARA القانونيون", reviews: "قصص النجاح", faq: "الأسئلة الشائعة", newsBadge: "🛡️ إعلان وزارة الشؤون الداخلية:", newsText: "تصاريح العمل لجميع الشركات ومعالجة التأشيرات عبر الإنترنت للشركات الرائدة والمزارع الزراعية في أستراليا مستمرة حالياً. قدم بسرعة!",
        homeTopNote: "وزارة الشؤون الداخلية • بوابة الهجرة والحدود والتأشيرات",
        homeHead: "الهجرة، تصاريح العمل وخدمات التأشيرات", homeDesc: "تقدم بأمان لعروض العمل في الشركات الأسترالية ورسائل العرض وتأشيرات تصريح العمل بشفافية تامة.", stat1: "إجمالي المتقدمين", stat2: "التأشيرات والوظائف المعتمدة", stat3: "معدل الرضا", portfolioAnnounce: "إعلان المحفظة:", portfolioDesc: "خدمات تأشيرات الشركات الأسترالية - مزود موثوق للتوظيف ومعالجة التأشيرات.",
        homeBottomTitle: "أبرز مزايا الهجرة وتصاريح العمل", homeBottomList: ["دعم الرعاية المباشرة والوظائف في أستراليا.", "إنشاء معرف طلب فوري (AUS-XXX) عند التقديم.", "التحقق الفوري عبر VEVO وتسجيل 8 بصمات باللمس."],
        applyTopNote: "بوابة التقديم الإلكتروني • جهز جواز السفر والهوية والصور قبل الإرسال",
        applyHead: "طلب التأشيرة والعمل عبر الإنترنت لجميع الشركات في أستراليا", lblFullName: "الاسم الكامل (حسب جواز السفر):", lblDob: "تاريخ الميلاد:", lblPhone: "رقم الجوال النشط:", lblEmail: "عنوان البريد الإلكتروني:", lblPassport: "رقم جواز السفر:", lblPassportCountry: "بلد جواز السفر:", lblVisaType: "فئة الشركة والتأشيرة:", docHeader: "المستندات الإلزامية وتحميل الصور",
        uploadTipBox: "ارفع ملفات JPG/PNG/PDF واضحة (يُفضل أقل من 2 ميجابايت لكل ملف) لتسريع التحقق.",
        lblPassPhoto: "صورة بحجم جواز السفر:", lblPassCopy: "نسخة جواز السفر:", lblNidFront: "الوجه الأمامي لبطاقة الهوية:", lblNidBack: "الوجه الخلفي لبطاقة الهوية:", payHeader: "معلومات الدفع", feeNote: "📌 رسوم المعالجة: 9,500 تكا بنغلاديشي (حوالي 125 دولار أسترالي).", lblPayMethod: "طريقة الدفع:", lblAccountTitle: "اسم الحساب / البنك:", copyBtnText: "📋 نسخ", lblSender: "رقم المرسل / رقم الحساب:", lblPayReceipt: "تحميل إيصال الدفع (اختياري):", submitAppBtn: "إرسال الطلب",
        applyBottomTitle: "إرشادات تقديم الطلب", applyBottomList: ["تأكد من تطابق الاسم الكامل مع جواز السفر.", "الصور الواضحة للمستندات تسرّع المراجعة.", "احتفظ بمعرف الطلب لمتابعة البصمة والحالة."],
        fpTopNote: "التسجيل البيومتري • مسح 8 أصابع بالتتابع (اليد اليمنى واليسرى)",
        fpMainHead: "التحقق باللمس البيومتري لـ 8 أصابع", fpMainDesc: "أدخل معرف الطلب أو رقم جواز السفر، ثم انقر على المستشعر البيومتري بالتتابع لجميع الأصابع الـ 8.", lblFpInputId: "معرف الطلب أو رقم جواز السفر:", sensorStatusReady: "الحالة: انقر فوق المستشعر لمسح الإصبع",
        fpBottomTitle: "تعليمات مسح البصمات", fpBottomList: ["اجعل الإصبع نظيفاً وجافاً عند النقر على المستشعر.", "أكمل الخطوات الثماني بالترتيب لإتمام التحقق."],
        statusTopNote: "فحص VEVO والحالة • متابعة الطلب والمستندات مباشرة",
        statusHeadText: "بوابة التحقق من التأشيرة والعمل", openPortalBtnText: "فتح بوابة التحقق ↗", statusDescText: "أدخل رقم جواز السفر أو معرف الطلب أدناه للتحقق من استحقاق التأشيرة في الوقت الفعلي.", lblCheckPass: "رقم جواز السفر:", lblCheckId: "معرف الطلب (اختياري):", checkStatusBtn: "التحقق من حالة الطلب",
        statusBottomTitle: "معلومات التحقق والمستندات المعتمدة", statusBottomList: ["تظهر خطابات العرض واتفاقيات العمل وإشعارات المنح بعد الاعتماد.", "يمكنك فتح بوابة التحقق في نافذة مستقلة من الزر العلوي."],
        chatTopNote: "مكتب الدعم المباشر • إجابات فورية حول الرسوم والمدة والخطوات",
        chatMainTitle: "المساعد المباشر", chatQ1: "❓ ما هي تكلفة معالجة التأشيرة والعمل؟", chatQ2: "❓ كم يستغرق الحصول على المستندات؟", chatWelcome: "👋 أهلاً بك في دعم الشركات الأسترالية!",
        chatBottomTitle: "معلومات الدعم والمساعدة", chatBottomList: ["إجابات سريعة متاحة على مدار الساعة عبر الأسئلة أو الدردشة.", "احتفظ بمعرف الطلب أو رقم الجواز عند الاستفسار."],
        lawyersTopNote: "الاستشارات القانونية للهجرة • إرشاد MARA المعتمد",
        lawyersHeadText: "محامو الهجرة المعتمدون (وكلاء MARA)", lawyerName: "روبرت هندرسون (مستشار أول MARA)", lawyerDesc: "رقم الترخيص: MARA#0849122 | الرئيس القانوني.",
        lawyerBio: "متخصص في تصاريح العمل المدعومة من أصحاب العمل والامتثال والتحقق من المستندات.",
        lawyer2Name: "كلير بينيت (وكيلة هجرة مسجلة)",
        lawyer2Desc: "رقم الترخيص: MARA#1572904 | أخصائية التأشيرات والامتثال.",
        lawyer2Bio: "تقدم الإرشاد حول أهلية الفئات ومستندات الترشيح والفحوصات وجاهزية VEVO.",
        lawyersBottomTitle: "نطاق الخدمات القانونية", lawyersBottomList: ["مراجعة المستندات وتحديد فئة التأشيرة ومتابعة الامتثال.", "إرشاد شفاف وفق أنظمة الهجرة الأسترالية."],
        reviewsTopNote: "آراء المتقدمين • تجارب تصاريح العمل والتوظيف",
        reviewsHeadText: "تقييمات العملاء وقصص النجاح", reviewAuthor: "شريف الإسلام:", reviewText: "حصلت على خطاب عرض العمل وتأشيرة العمل بسرعة كبيرة. موثوق للغاية.",
        reviewsBottomTitle: "أبرز تجارب المتقدمين", reviewsBottomList: ["تحديثات واضحة من لحظة التقديم حتى إصدار المستندات.", "دعم متواصل لفرص العمل في الشركات والمزارع."],
        faqTopNote: "مركز المساعدة • الأسئلة الشائعة حول التأشيرات والرسوم والمدة",
        faqHeadText: "الأسئلة الشائعة (FAQ)", faqQ1: "س1: كم من الوقت يستغرق الحصول على خطاب العمل والتأشيرة؟", faqA1: "ج: عادة خلال 24 إلى 48 ساعة يقوم فريقنا بمراجعة الإصدارات.",
        faqBottomTitle: "ملاحظات مساعدة إضافية", faqBottomList: ["تحقق من حالة VEVO في أي وقت برقم الجواز.", "تواصل مع الدعم المباشر لأي مساعدة في الدفع أو الملفات."],
        modalLoadingText: "جاري معالجة الطلب...", modalSuccessText: "تم تقديم الطلب بنجاح!", modalCopyBtn: "📋 نسخ المعرف", modalDoneBtn: "تم", alertNoticeTitle: "إشعار", agenciesSectionTitle: "الوكالات", agency1Name: "قوة الحدود الأسترالية", agency2Gov: "الحكومة الأسترالية", agency2Sub: "وكالة إدارة الطوارئ الوطنية", agency3Name: "شرطة الفيدرالية الأسترالية", agency4Gov: "الحكومة الأسترالية", agency4Sub: "منظمة الاستخبارات الأمنية الأسترالية", agency5Gov: "الحكومة الأسترالية", agency5Sub: "مركز تقارير وتحليلات المعاملات الأسترالي", footCol1: "محفظة الوزارة", footCol2: "الخدمات عبر الإنترنت", footCol3: "المساعدة والدعم", footCol4: "بوابة الشركات الأسترالية", footItem1: "الهجرة والجنسية", footItem2: "قوة الحدود الأسترالية", footItem3: "بوابة الأمن القومي", footItem4: "فحص VEVO / EVO", footItem5: "إيداع ImmiAccount", footItem6: "التحقق من استحقاق التأشيرة", footItem7: "الاتصال بمركز الدعم", footItem8: "دليل محامي MARA", footItem9: "الأسئلة الشائعة والإرشادات", footPartnerText: "شريك معتمد • محفظة وزارة الشؤون الداخلية", footCopy: "© 2026 خدمات هجرة الشركات الأسترالية. جميع الحقوق محفوظة. مشفر بـ SSL 🔒", footLinksBottom: "إمكانية الوصول • سياسة الخصوصية • بيان حقوق النشر • إخلاء المسؤولية",
        fpAllCompletedMsg: "✅ تهانينا! تم مسح والتحقق من بصمات الأصابع الثمانية بنجاح."
    },
    vi: {
        topGov: "Chính phủ Úc • Bộ Nội vụ", subImmi: "ImmiAccount", subVevo: "Xác minh quyền lợi thị thực trực tuyến (VEVO)", svgGov: "Australian Government", svgDept: "Department of Home Affairs", menu: "Menu", home: "Nội vụ", apply: "Thị thực & Đơn đăng ký", fingerprint: "Vân tay sinh học", status: "Kiểm tra trạng thái (VEVO)", chat: "Hỗ trợ trực tiếp", lawyers: "Đại pháp lý MARA", reviews: "Câu chuyện thành công", faq: "Câu hỏi thường gặp", newsBadge: "🛡️ Thông báo DHA:", newsText: "Giấy phép lao động cho tất cả các công ty và quy trình xử lý thị thực trực tuyến cho các tập đoàn lớn và trang trại nông nghiệp của Úc hiện đang diễn ra. Hãy đăng ký nhanh chóng!",
        homeTopNote: "Bộ Nội vụ • Cổng thông tin Di trú, Biên giới & Thị thực",
        homeHead: "Nhập cư, Giấy phép lao động & Dịch vụ thị thực", homeDesc: "Đăng ký an toàn cho các lời mời làm việc và thị thực giấy phép lao động của Úc với độ minh bạch 100%.", stat1: "Tổng số ứng viên", stat2: "Thị thực & Việc làm đã duyệt", stat3: "Tỷ lệ hài lòng", portfolioAnnounce: "Thông báo danh mục đầu tư:", portfolioDesc: "Dịch vụ thị thực Úc - Nhà cung cấp tuyển dụng và xử lý thị thực đáng tin cậy.",
        homeBottomTitle: "Điểm nổi bật về Di trú & Giấy phép lao động", homeBottomList: ["Hỗ trợ bảo lãnh tuyển dụng và việc làm tại Úc.", "Tạo mã hồ sơ (AUS-XXX) ngay khi gửi đơn.", "Kiểm tra VEVO trực tiếp và quét 8 vân tay cảm ứng."],
        applyTopNote: "Cổng nộp hồ sơ trực tuyến • Chuẩn bị Hộ chiếu, CCCD & Ảnh trước khi gửi",
        applyHead: "Đăng ký đơn xin việc & thị thực trực tuyến tại Úc", lblFullName: "Họ và tên (như trên hộ chiếu):", lblDob: "Ngày sinh:", lblPhone: "Số điện thoại di động:", lblEmail: "Địa chỉ email:", lblPassport: "Số hộ chiếu:", lblPassportCountry: "Quốc gia cấp hộ chiếu:", lblVisaType: "Công ty & Loại thị thực:", docHeader: "Tài liệu bắt buộc & Tải ảnh lên",
        uploadTipBox: "Tải tệp JPG/PNG/PDF rõ nét (khuyến nghị dưới 2MB mỗi tệp) để xác minh nhanh hơn.",
        lblPassPhoto: "Ảnh kích thước hộ chiếu:", lblPassCopy: "Bản sao hộ chiếu:", lblNidFront: "Mặt trước thẻ căn cước:", lblNidBack: "Mặt sau thẻ căn cước:", payHeader: "Thông tin thanh toán", feeNote: "📌 Phí xử lý: 9.500 BDT (khoảng 125 AUD).", lblPayMethod: "Phương thức thanh toán:", lblAccountTitle: "Tên tài khoản / Ngân hàng:", copyBtnText: "📋 Sao chép", lblSender: "Số người gửi / Số tài khoản:", lblPayReceipt: "Tải biên nhận thanh toán lên (Tùy chọn):", submitAppBtn: "Gửi đơn đăng ký",
        applyBottomTitle: "Hướng dẫn nộp hồ sơ", applyBottomList: ["Đảm bảo họ tên trùng khớp với hộ chiếu.", "Ảnh giấy tờ rõ nét giúp xử lý nhanh hơn.", "Lưu mã hồ sơ để quét vân tay và kiểm tra trạng thái."],
        fpTopNote: "Đăng ký sinh trắc học • Quét lần lượt 8 ngón tay (Tay phải & Tay trái)",
        fpMainHead: "Xác thực cảm ứng sinh học 8 vân tay", fpMainDesc: "Nhập Mã đơn hoặc Số hộ chiếu của bạn, sau đó chạm vào cảm biến sinh học lần lượt cho cả 8 ngón tay.", lblFpInputId: "Mã đơn hoặc Số hộ chiếu:", sensorStatusReady: "Trạng thái: Chạm vào cảm biến để quét vân tay",
        fpBottomTitle: "Hướng dẫn quét vân tay", fpBottomList: ["Giữ ngón tay sạch và khô khi chạm vào cảm biến.", "Hoàn tất đủ 8 bước theo thứ tự để xác minh."],
        statusTopNote: "Kiểm tra VEVO & Trạng thái • Theo dõi hồ sơ và tài liệu trực tiếp",
        statusHeadText: "Cổng thông tin xác thực việc làm & thị thực", openPortalBtnText: "Mở cổng xác thực ↗", statusDescText: "Nhập số hộ chiếu hoặc mã đơn đăng ký của bạn bên dưới để kiểm tra quyền lợi thị thực.", lblCheckPass: "Số hộ chiếu:", lblCheckId: "Mã đơn đăng ký (Tùy chọn):", checkStatusBtn: "Kiểm tra trạng thái",
        statusBottomTitle: "Thông tin xác thực & Tài liệu được duyệt", statusBottomList: ["Thư mời làm việc, thỏa thuận lao động và giấy phép sẽ hiển thị khi được duyệt.", "Nhấn nút phía trên để mở cổng xác thực ở cửa sổ mới."],
        chatTopNote: "Hỗ trợ trực tiếp • Giải đáp nhanh về Phí, Thời gian & Quy trình",
        chatMainTitle: "Trợ lý trò chuyện trực tiếp", chatQ1: "❓ Chi phí xử lý thị thực và việc làm là bao nhiêu?", chatQ2: "❓ Mất bao lâu để nhận được tài liệu?", chatWelcome: "👋 Chào mừng bạn đến với Hỗ trợ Úc!",
        chatBottomTitle: "Thông tin hỗ trợ", chatBottomList: ["Trả lời tự động 24/7 qua các câu hỏi nhanh hoặc khung chat.", "Chuẩn bị sẵn Mã đơn hoặc Số hộ chiếu khi hỏi về hồ sơ."],
        lawyersTopNote: "Tư vấn pháp lý Di trú • Hướng dẫn tuân thủ MARA",
        lawyersHeadText: "Luật sư Di trú Ủy quyền (Đại lý MARA)", lawyerName: "Robert Henderson (Cao cấp MARA)", lawyerDesc: "Số giấy phép: MARA#0849122 | Trưởng phòng pháp lý.",
        lawyerBio: "Chuyên về giấy phép lao động bảo lãnh, tuân thủ thị thực và kiểm tra hồ sơ cho vị trí doanh nghiệp & nông nghiệp.",
        lawyer2Name: "Claire Bennett (Đại lý Di trú Đăng ký)",
        lawyer2Desc: "Số giấy phép: MARA#1572904 | Chuyên viên Thị thực & Tuân thủ.",
        lawyer2Bio: "Tư vấn điều kiện thị thực, hồ sơ đề cử, kiểm tra sức khỏe/lý lịch và sẵn sàng VEVO.",
        lawyersBottomTitle: "Phạm vi hỗ trợ pháp lý", lawyersBottomList: ["Kiểm tra hồ sơ, loại thị thực và tuân thủ bảo lãnh.", "Tư vấn minh bạch theo quy định di trú Úc."],
        reviewsTopNote: "Phản hồi ứng viên • Trải nghiệm giấy phép lao động & việc làm",
        reviewsHeadText: "Đánh giá của khách hàng", reviewAuthor: "Shariful Islam:", reviewText: "Đã nhận được thư mời làm việc và thị thực rất nhanh chóng. Rất đáng tin cậy.",
        reviewsBottomTitle: "Điểm nổi bật từ ứng viên", reviewsBottomList: ["Cập nhật rõ ràng từ lúc nộp đơn đến khi cấp tài liệu.", "Hỗ trợ tận tình cho các vị trí doanh nghiệp và nông nghiệp."],
        faqTopNote: "Trung tâm trợ giúp • Câu hỏi thường gặp về Thị thực, Phí & Thời gian",
        faqHeadText: "Câu hỏi thường gặp (FAQ)", faqQ1: "Q1: Mất bao lâu để nhận Thư việc làm & Thị thực?", faqA1: "Trả lời: Thường trong vòng 24 đến 48 giờ, nhóm của chúng tôi sẽ xem xét và cấp tài liệu.",
        faqBottomTitle: "Ghi chú hỗ trợ thêm", faqBottomList: ["Kiểm tra trạng thái VEVO bất cứ lúc nào bằng Số hộ chiếu.", "Liên hệ Hỗ trợ trực tiếp nếu cần hỗ trợ thanh toán hoặc tải tệp."],
        modalLoadingText: "Đang xử lý đơn đăng ký...", modalSuccessText: "Đơn đã được gửi!", modalCopyBtn: "📋 Sao chép mã", modalDoneBtn: "Hoàn tất", alertNoticeTitle: "Thông báo", agenciesSectionTitle: "Các cơ quan", agency1Name: "Lực lượng Biên phòng Úc", agency2Gov: "Chính phủ Úc", agency2Sub: "Cơ quan Quản lý Khẩn cấp Quốc gia", agency3Name: "Cảnh sát Liên bang Úc", agency4Gov: "Chính phủ Úc", agency4Sub: "Cơ quan Tình báo An ninh Úc", agency5Gov: "Chính phủ Úc", agency5Sub: "Trung tâm Phân tích và Báo cáo Giao dịch Úc", footCol1: "Danh mục bộ", footCol2: "Dịch vụ trực tuyến", footCol3: "Trợ giúp & Hỗ trợ", footCol4: "Cổng thông tin Úc", footItem1: "Nhập cư và Quyền công dân", footItem2: "Lực lượng Biên phòng Úc", footItem3: "Cổng thông tin An ninh Quốc gia", footItem4: "Kiểm tra VEVO / EVO", footItem5: "Nộp đơn ImmiAccount", footItem6: "Xác minh quyền lợi thị thực", footItem7: "Liên hệ Trung tâm hỗ trợ", footItem8: "Danh mục luật sư MARA", footItem9: "Câu hỏi thường gặp & Hướng dẫn", footPartnerText: "Đối tác xử lý được ủy quyền • Danh mục đầu tư Bộ Nội vụ", footCopy: "© 2026 Dịch vụ di cư Úc. Bảo lưu mọi quyền. Mã hóa SSL 🔒", footLinksBottom: "Khả năng tiếp cận • Chính sách bảo mật • Tuyên bố bản quyền • Tuyên bố từ chối trách nhiệm",
        fpAllCompletedMsg: "✅ Xin chúc mừng! Cả 8 dấu vân tay đã được quét và xác minh thành công."
    }
};

function generateAgentPortraitDataUrl(options) {
    const canvas = document.createElement('canvas');
    canvas.width = 220;
    canvas.height = 250;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, options.bgTop || '#dce6f2');
    grad.addColorStop(1, options.bgBottom || '#b8cae0');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle studio lighting glow
    const rad = ctx.createRadialGradient(110, 88, 12, 110, 105, 115);
    rad.addColorStop(0, 'rgba(255,255,255,0.65)');
    rad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = rad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Shoulders & Suit / Blazer
    ctx.fillStyle = options.suitColor || '#13294b';
    ctx.beginPath();
    ctx.moveTo(22, 250);
    ctx.quadraticCurveTo(32, 168, 110, 164);
    ctx.quadraticCurveTo(188, 168, 198, 250);
    ctx.closePath();
    ctx.fill();

    // Shirt collar
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(86, 166);
    ctx.lineTo(110, 206);
    ctx.lineTo(134, 166);
    ctx.closePath();
    ctx.fill();

    if (options.isMale) {
        // Tie
        ctx.fillStyle = options.accentColor || '#8b1e24';
        ctx.beginPath();
        ctx.moveTo(106, 174);
        ctx.lineTo(114, 174);
        ctx.lineTo(118, 232);
        ctx.lineTo(110, 244);
        ctx.lineTo(102, 232);
        ctx.closePath();
        ctx.fill();
    } else {
        // Pearl/gold necklace accent
        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(110, 166, 22, 0.25 * Math.PI, 0.75 * Math.PI);
        ctx.stroke();
    }

    // Neck
    ctx.fillStyle = options.skinTone || '#e6be9a';
    ctx.fillRect(96, 134, 28, 36);

    // Face
    ctx.fillStyle = options.skinTone || '#e6be9a';
    ctx.beginPath();
    ctx.ellipse(110, 102, 36, 44, 0, 0, Math.PI * 2);
    ctx.fill();

    // Ears
    ctx.beginPath();
    ctx.ellipse(73, 105, 5.5, 10, 0, 0, Math.PI * 2);
    ctx.ellipse(147, 105, 5.5, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // Hair
    ctx.fillStyle = options.hairColor || '#2d3748';
    if (options.isMale) {
        ctx.beginPath();
        ctx.arc(110, 90, 38, Math.PI * 1.05, Math.PI * 1.95);
        ctx.quadraticCurveTo(148, 76, 144, 98);
        ctx.quadraticCurveTo(136, 72, 110, 72);
        ctx.quadraticCurveTo(84, 72, 76, 98);
        ctx.quadraticCurveTo(72, 76, 74, 88);
        ctx.closePath();
        ctx.fill();
    } else {
        ctx.beginPath();
        ctx.arc(110, 96, 41, Math.PI * 0.92, Math.PI * 2.08);
        ctx.lineTo(154, 162);
        ctx.quadraticCurveTo(110, 152, 66, 162);
        ctx.closePath();
        ctx.fill();

        // Re-draw face over upper hair
        ctx.fillStyle = options.skinTone || '#e6be9a';
        ctx.beginPath();
        ctx.ellipse(110, 104, 34, 41, 0, 0, Math.PI * 2);
        ctx.fill();

        // Front fringe
        ctx.fillStyle = options.hairColor || '#4a3525';
        ctx.beginPath();
        ctx.arc(110, 92, 36, Math.PI * 1.05, Math.PI * 1.95);
        ctx.quadraticCurveTo(144, 86, 142, 102);
        ctx.quadraticCurveTo(118, 82, 78, 102);
        ctx.quadraticCurveTo(76, 86, 74, 92);
        ctx.closePath();
        ctx.fill();
    }

    // Eyebrows
    ctx.strokeStyle = options.hairColor || '#2d3748';
    ctx.lineWidth = 2.4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(88, 92);
    ctx.quadraticCurveTo(96, 88, 103, 91);
    ctx.moveTo(117, 91);
    ctx.quadraticCurveTo(124, 88, 132, 92);
    ctx.stroke();

    // Eyes
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.arc(96, 101, 3.2, 0, Math.PI * 2);
    ctx.arc(124, 101, 3.2, 0, Math.PI * 2);
    ctx.fill();

    // Subtle smile
    ctx.strokeStyle = '#8d5b4c';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.arc(110, 121, 9, 0.15 * Math.PI, 0.85 * Math.PI);
    ctx.stroke();

    // Bottom badge strip
    ctx.fillStyle = '#002147';
    ctx.fillRect(0, 224, canvas.width, 26);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(options.badgeLabel || 'REGISTERED MARA AGENT', 110, 241);

    return canvas.toDataURL('image/png');
}

function hydrateLawyerPhotos() {
    const img1 = document.getElementById('lawyer1PhotoImg');
    const img2 = document.getElementById('lawyer2PhotoImg');

    if (img1) {
        img1.src = generateAgentPortraitDataUrl({
            isMale: true,
            skinTone: '#e8c19e',
            hairColor: '#4b5563',
            suitColor: '#002147',
            accentColor: '#991b1b',
            badgeLabel: 'MARA#0849122 • SENIOR'
        });
    }

    if (img2) {
        img2.src = generateAgentPortraitDataUrl({
            isMale: false,
            skinTone: '#f0cbb0',
            hairColor: '#5c3a21',
            suitColor: '#1e3a5f',
            accentColor: '#d4af37',
            badgeLabel: 'MARA#1572904 • LEGAL'
        });
    }
}

function saveLocalAppsCache(apps) {
    try {
        localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(Array.isArray(apps) ? apps : []));
    } catch (e) {}
}

function loadLocalAppsCache() {
    try {
        const raw = localStorage.getItem(LOCAL_CACHE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        return [];
    }
}

function getEffectiveGrantNo(app, index = 0) {
    if (app && app.grantNo && String(app.grantNo).trim() !== '') {
        return String(app.grantNo).trim();
    }
    return '20095644500' + (12 + index);
}

function getEffectiveFormNo(app, index = 0) {
    if (app && app.formNo && String(app.formNo).trim() !== '') {
        return String(app.formNo).trim();
    }
    return String(1401 + index);
}

function getEffectiveDate(app) {
    if (app && app.date && String(app.date).trim() !== '') {
        return String(app.date).trim();
    }
    return '19 October 2026';
}

function renderListItems(ulElement, itemsArray) {
    if (!ulElement || !Array.isArray(itemsArray)) return;
    ulElement.innerHTML = itemsArray.map(item => `<li>${item}</li>`).join('');
}

function attachUploadFilePreviews() {
    const fileInputIds = ['passportPhoto', 'passportCopy', 'nidFront', 'nidBack', 'payReceipt'];
    fileInputIds.forEach(inputId => {
        const inputEl = document.getElementById(inputId);
        if (!inputEl) return;
        const badgeId = `${inputId}_badge`;
        let badgeEl = document.getElementById(badgeId);
        if (!badgeEl) {
            badgeEl = document.createElement('div');
            badgeEl.id = badgeId;
            badgeEl.className = 'file-selected-badge';
            inputEl.insertAdjacentElement('afterend', badgeEl);
        }
        inputEl.addEventListener('change', () => {
            const file = inputEl.files && inputEl.files[0];
            if (!file) {
                badgeEl.textContent = '';
                return;
            }
            const sizeKb = Math.max(1, Math.round(file.size / 1024));
            badgeEl.textContent = `✓ ${file.name} (${sizeKb} KB)`;
        });
    });
}

function showCustomAlert(message) {
    document.getElementById('customAlertMsg').innerText = message;
    document.getElementById('customAlertModal').style.display = 'flex';
}

function closeCustomAlert() {
    document.getElementById('customAlertModal').style.display = 'none';
}

function cleanSpanTags(htmlContent) {
    if (!htmlContent) return '';
    return htmlContent
        .replace(/\[span_\d+\]/g, '')
        .replace(/\[start_span_\d+\]/g, '')
        .replace(/\[end_span\]/g, '')
        .replace(/\[start_span\]/g, '');
}

document.addEventListener('DOMContentLoaded', () => {
    hydrateLawyerPhotos();
    populateCountries();
    attachUploadFilePreviews();
    loadGlobalPaymentNumber();
    updateLiveCounters();
    switchLanguage('en');

    fetchAllApplications().then(apps => {
        cachedApplications = apps;
        saveLocalAppsCache(apps);
        updateLiveCounters();
    });

    const visaForm = document.getElementById('visaForm');
    if (visaForm) {
        visaForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = document.getElementById('applicantEmail').value.trim();
            const phone = document.getElementById('applicantPhone').value.trim();
            const passport = document.getElementById('passportNo').value.toUpperCase().trim();

            let isDuplicate = await checkIsDuplicate(email, phone, passport);
            if (isDuplicate) {
                showCustomAlert("Duplicate Application Detected! This Passport, Email or Mobile Number has already been submitted.");
                return;
            }

            showAppModalLoading();

            const name = document.getElementById('applicantName').value.toUpperCase().trim();
            const dob = document.getElementById('applicantDob').value;
            const country = document.getElementById('passportCountry').value.toUpperCase().trim();
            const visaType = document.getElementById('visaType').value;
            const payMethod = document.getElementById('payMethod').value;
            const senderNum = document.getElementById('senderNum').value;

            const passPhotoFile = document.getElementById('passportPhoto').files[0];
            const passCopyFile = document.getElementById('passportCopy').files[0];
            const nidFrontFile = document.getElementById('nidFront').files[0];
            const nidBackFile = document.getElementById('nidBack').files[0];
            const payReceiptFile = document.getElementById('payReceipt').files[0];

            const passPhoto = passPhotoFile ? await convertFileToBase64(passPhotoFile) : '';
            const passCopy = passCopyFile ? await convertFileToBase64(passCopyFile) : '';
            const nidFront = nidFrontFile ? await convertFileToBase64(nidFrontFile) : '';
            const nidBack = nidBackFile ? await convertFileToBase64(nidBackFile) : '';
            const payReceipt = payReceiptFile ? await convertFileToBase64(payReceiptFile) : '';

            let allApps = await fetchAllApplications();
            let indexNum = allApps.length;
            let nextSerial = 501 + indexNum;
            const appId = 'AUS-' + nextSerial;
            
            const formNoVal = String(1401 + indexNum);
            const grantNoVal = '20095644500' + (12 + indexNum);

            const newApp = {
                id: appId,
                serialNum: nextSerial,
                formNo: formNoVal,
                name: name,
                dob: dob,
                phone: phone,
                email: email,
                passport: passport,
                country: country || 'BANGLADESH',
                visaType: visaType,
                grantNo: grantNoVal,
                payMethod: payMethod,
                senderNum: senderNum,
                payReceipt: payReceipt,
                status: 'Under Review',
                date: '19 October 2026',
                passPhoto: passPhoto,
                passCopy: passCopy,
                nidFront: nidFront,
                nidBack: nidBack,
                scannedFingersCount: 0,
                fingerprintImages: [],
                paymentApproved: false,
                jobApproved: false,
                applicationApproved: false,
                visaApproved: false,
                isRejected: false,
                docBiometricReceipt: false,
                docJobOffer: true, 
                docWorkPermitAgreement: false, 
                docSponsorshipNomination: false,
                docMedicalFitness: false,
                docPoliceClearance: false,
                docVevoCert: false,
                docCoeApproval: false,
                docAckReceipt: false,
                docEMedicalReferral: false,
                docAfpClearance: false,
                customPdf1Url: '', customPdf2Url: '', customPdf3Url: '', customPdf4Url: '',
                showCustomPdf1: false, showCustomPdf2: false, showCustomPdf3: false, showCustomPdf4: false
            };

            cachedApplications.push(newApp);
            saveLocalAppsCache(cachedApplications);

            await saveToCloudDirect(newApp);
            cachedApplications = await fetchAllApplications();
            saveLocalAppsCache(cachedApplications);
            updateLiveCounters();
            sendFilesToTelegramBot(newApp);

            showAppModalSuccess(appId);
            visaForm.reset();
            document.querySelectorAll('.file-selected-badge').forEach(b => { b.textContent = ''; });
        });
    }

    const statusForm = document.getElementById('statusForm');
    if (statusForm) {
        statusForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const checkPassport = document.getElementById('checkPassport').value.toUpperCase().trim();
            const checkAppId = document.getElementById('checkAppId').value.toUpperCase().trim();
            executeStatusLookup(checkPassport, checkAppId);
        });
    }
});

async function checkActiveFingerScanIndex() {
    const identifier = document.getElementById('touchFpIdentifier').value.toUpperCase().trim();
    const stepIndicator = document.getElementById('fingerStepIndicator');
    const statusText = document.getElementById('sensorStatusReady');
    const outputDiv = document.getElementById('touchFpOutput');

    if (!identifier) {
        stepIndicator.innerText = fingerNames[0];
        statusText.innerText = "Status: Enter Application ID or Passport No first";
        outputDiv.style.display = 'none';
        return;
    }

    cachedApplications = await fetchAllApplications();
    let targetApp = cachedApplications.find(item => item.id === identifier || item.passport === identifier);
    
    if (targetApp) {
        if (!targetApp.fingerprintImages) targetApp.fingerprintImages = [];
        currentFingerIndex = targetApp.fingerprintImages.length;
        
        if (currentFingerIndex < 8) {
            stepIndicator.innerText = fingerNames[currentFingerIndex];
            statusText.innerText = `Status: Ready to scan ${fingerLabels[currentFingerIndex]} (${currentFingerIndex + 1}/8)`;
            outputDiv.style.display = 'none';
        } else {
            let t = translations[currentLang] || translations['en'];
            stepIndicator.innerText = "Completed: 8/8 Fingers Verified";
            statusText.innerText = "All 8 fingers already scanned successfully!";
            outputDiv.style.display = 'block';
            outputDiv.style.background = '#e2f0d9';
            outputDiv.style.color = '#155724';
            outputDiv.innerHTML = `<p>${t.fpAllCompletedMsg}</p>`;
        }
    } else {
        currentFingerIndex = 0;
        stepIndicator.innerText = fingerNames[0];
        statusText.innerText = "Status: Application ID / Passport not found in records";
        outputDiv.style.display = 'none';
    }
}

async function triggerNextFingerprintStep() {
    const identifier = document.getElementById('touchFpIdentifier').value.toUpperCase().trim();
    if (!identifier) {
        showCustomAlert("⚠️ Please enter your Application ID or Passport Number first!");
        document.getElementById('touchFpIdentifier').focus();
        return;
    }

    cachedApplications = await fetchAllApplications();
    let appIndex = cachedApplications.findIndex(item => item.id === identifier || item.passport === identifier);

    if (appIndex === -1) {
        showCustomAlert("⚠️ Application ID or Passport Number not found in our records! Please check and re-enter.");
        return;
    }

    let targetApp = cachedApplications[appIndex];
    if (!targetApp.fingerprintImages) targetApp.fingerprintImages = [];
    currentFingerIndex = targetApp.fingerprintImages.length;

    if (currentFingerIndex >= 8) {
        let t = translations[currentLang] || translations['en'];
        showCustomAlert(t.fpAllCompletedMsg);
        return;
    }

    let sensorBtn = document.getElementById('touchSensorBtn');
    let sensorIcon = document.getElementById('sensorIcon');
    let statusText = document.getElementById('sensorStatusReady');
    let stepIndicator = document.getElementById('fingerStepIndicator');
    let outputDiv = document.getElementById('touchFpOutput');

    sensorBtn.classList.add('scanning-anim');
    sensorIcon.className = "fas fa-spinner fa-spin";
    statusText.innerText = `Status: Scanning ${fingerNames[currentFingerIndex]}...`;
    statusText.style.color = "#856404";

    setTimeout(async () => {
        sensorBtn.classList.remove('scanning-anim');
        
        let currentLabel = fingerLabels[currentFingerIndex];
        let generatedFingerImg = generateFingerprintDataUrl(currentLabel);
        
        targetApp.fingerprintImages.push({
            name: currentLabel,
            image: generatedFingerImg
        });

        currentFingerIndex = targetApp.fingerprintImages.length;
        targetApp.scannedFingersCount = currentFingerIndex;

        cachedApplications[appIndex] = targetApp;
        saveLocalAppsCache(cachedApplications);

        await updateCloudApp(targetApp);
        cachedApplications = await fetchAllApplications();
        saveLocalAppsCache(cachedApplications);

        if (currentFingerIndex < 8) {
            sensorIcon.className = "fas fa-check";
            sensorIcon.style.color = "#ffffff";
            sensorBtn.style.background = "#28a745";
            statusText.innerText = `Success! Now tap for ${fingerNames[currentFingerIndex]}`;
            statusText.style.color = "#155724";
            stepIndicator.innerText = fingerNames[currentFingerIndex];

            setTimeout(() => {
                sensorBtn.style.background = "linear-gradient(135deg, #002147, #004080)";
                sensorIcon.className = "fas fa-fingerprint";
            }, 150);
        } else {
            let t = translations[currentLang] || translations['en'];
            sensorIcon.className = "fas fa-check-circle";
            sensorIcon.style.color = "#ffffff";
            sensorBtn.style.background = "#28a745";
            statusText.innerText = "All 8 Fingers Scanned Successfully!";
            statusText.style.color = "#155724";
            stepIndicator.innerText = "Completed: 8/8 Fingers Verified";

            outputDiv.style.display = 'block';
            outputDiv.style.background = '#e2f0d9';
            outputDiv.style.color = '#155724';
            outputDiv.innerHTML = `<p>${t.fpAllCompletedMsg}</p>`;
            
            showCustomAlert(t.fpAllCompletedMsg);
        }
    }, 100);
}

function generateFingerprintDataUrl(fingerTitle) {
    const canvas = document.createElement('canvas');
    canvas.width = 160;
    canvas.height = 180;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#f0f3f8';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#002147';
    ctx.lineWidth = 2;
    ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);

    ctx.strokeStyle = '#03396c';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 7; i++) {
        ctx.beginPath();
        ctx.arc(80, 75 + (i * 4), 15 + (i * 7), Math.PI, 2 * Math.PI);
        ctx.stroke();
    }

    ctx.fillStyle = '#002147';
    ctx.font = 'bold 10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(fingerTitle, 80, 162);

    return canvas.toDataURL('image/png');
}

function switchTab(tabId) {
    let activeAdmin = document.getElementById('adminTabDynamic');
    if(activeAdmin) activeAdmin.remove();

    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.gov-dashboard-item').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.gov-drawer-item').forEach(btn => btn.classList.remove('active'));

    const targetTab = document.getElementById(tabId);
    if(targetTab) targetTab.classList.add('active');

    if (tabId === 'lawyersTab') {
        hydrateLawyerPhotos();
    }

    const navMatch = document.querySelector(`.gov-dashboard-item[data-tab="${tabId}"]`);
    if(navMatch) navMatch.classList.add('active');

    const drawerMatch = document.querySelector(`.gov-drawer-item[data-tab="${tabId}"]`);
    if(drawerMatch) drawerMatch.classList.add('active');

    const drawer = document.getElementById('sideDrawer');
    const overlay = document.getElementById('sideMenuOverlay');
    if(drawer) drawer.classList.remove('open');
    if(overlay) overlay.style.display = 'none';

    const mainContainer = document.querySelector('main.container');
    if (mainContainer) {
        mainContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }
}

function toggleSideMenu() {
    const drawer = document.getElementById('sideDrawer');
    const overlay = document.getElementById('sideMenuOverlay');
    if(!drawer || !overlay) return;
    drawer.classList.toggle('open');
    overlay.style.display = drawer.classList.contains('open') ? 'block' : 'none';
}

function toggleLiveChat() {
    const chatWidget = document.getElementById('liveChatWidgetBox');
    if (!chatWidget) return;
    chatWidget.style.display = chatWidget.style.display === 'block' ? 'none' : 'block';
}

function changeChatLanguage(lang) {
    chatLang = lang;
    const welcomeEl = document.getElementById('chatWelcomeMsg');
    const inputEl = document.getElementById('footerChatInput');
    const sendBtn = document.getElementById('chatSendBtnText');

    if (lang === 'bn') {
        if(welcomeEl) welcomeEl.innerText = "👋 হ্যালো! অস্ট্রেলিয়া অল কোম্পানি সাপোর্টে স্বাগতম। আবেদন প্রক্রিয়া, স্ট্যাটাস চেক বা ফিঙ্গারপ্রিন্ট সম্পর্কে যেকোনো প্রশ্ন করুন!";
        if(inputEl) inputEl.placeholder = "আপনার বার্তা এখানে লিখুন...";
        if(sendBtn) sendBtn.innerText = "Send";
    } else if (lang === 'en') {
        if(welcomeEl) welcomeEl.innerText = "👋 Hello! Welcome to Australia All Company Support. Feel free to ask about application, status check or fingerprints!";
        if(inputEl) inputEl.placeholder = "Type your message here...";
        if(sendBtn) sendBtn.innerText = "Send";
    } else if (lang === 'zh') {
        if(welcomeEl) welcomeEl.innerText = "👋 您好！欢迎来到澳大利亚全公司支持中心。随时询问申请、状态查询或指纹录入相关问题！";
        if(inputEl) inputEl.placeholder = "在此输入您的消息...";
        if(sendBtn) sendBtn.innerText = "发送";
    } else if (lang === 'ar') {
        if(welcomeEl) welcomeEl.innerText = "👋 أهلاً بك في دعم الشركات الأسترالية. لا تتردد في طرح أي أسئلة حول التقديم أو التحقق من الحالة أو بصمات الأصابع!";
        if(inputEl) inputEl.placeholder = "اكتب رسالتك هنا...";
        if(sendBtn) sendBtn.innerText = "إرسال";
    } else if (lang === 'vi') {
        if(welcomeEl) welcomeEl.innerText = "👋 Xin chào! Chào mừng bạn đến với Hỗ trợ Úc. Hãy thoải mái đặt câu hỏi về cách đăng ký, kiểm tra trạng thái hoặc vân tay!";
        if(inputEl) inputEl.placeholder = "Nhập tin nhắn của bạn...";
        if(sendBtn) sendBtn.innerText = "Gửi";
    }
}

function sendFooterChatMessage() {
    const input = document.getElementById('footerChatInput');
    const content = document.getElementById('footerChatContent');
    if (!input || !input.value.trim()) return;

    let userMsg = document.createElement('div');
    userMsg.style.cssText = "background:#002147; color:white; padding:8px 12px; border-radius:6px; max-width:90%; align-self:flex-end;";
    userMsg.innerText = input.value;
    content.appendChild(userMsg);

    let txt = input.value.trim().toLowerCase();
    input.value = '';
    content.scrollTop = content.scrollHeight;

    setTimeout(() => {
        let autoReplyText = "";

        if (txt.includes('আবেদন') || txt.includes('apply') || txt.includes('application') || txt.includes('কিভাবে আবেদন') || txt.includes('how to apply')) {
            if (chatLang === 'bn') {
                autoReplyText = "📝 আবেদন করার নিয়ম:\n১. মেনু থেকে 'Visas & Application' ট্যাবে যান।\n২. আপনার পুরো নাম, পাসপোর্ট নম্বর, জন্মতারিখ ও সঠিক তথ্য দিয়ে ফর্ম পূরণ করুন।\n৩. পাসপোর্ট সাইজ ছবি, পাসপোর্ট কপি এবং এনআইডি কার্ডের ছবি আপলোড করুন।\n৪. পেমেন্ট ফি (৯,৫০০ টাকা) নির্দিষ্ট নম্বরে পাঠিয়ে সেন্ড করুন ও ফর্ম সাবমিট করুন।";
            } else if (chatLang === 'en') {
                autoReplyText = "📝 How to Apply:\n1. Go to the 'Visas & Application' tab.\n2. Fill out the form with your full name, passport, DOB & details.\n3. Upload your passport photo, passport copy & NID card.\n4. Pay the processing fee (9,500 BDT) and submit.";
            } else {
                autoReplyText = "📝 Please go to 'Visas & Application' tab to fill out your details, upload documents, and submit your application.";
            }
        } 
        else if (txt.includes('স্ট্যাটাস') || txt.includes('status') || txt.includes('check') || txt.includes('vevo') || txt.includes('চেক')) {
            if (chatLang === 'bn') {
                autoReplyText = "🔍 স্ট্যাটাস চেক করার নিয়ম:\n১. সাইটের 'Check Status (VEVO)' ট্যাবে যান।\n২. আপনার পাসপোর্ট নম্বর এবং অ্যাপ্লিকেশন আইডি (ঐচ্ছিক) লিখুন।\n৩. 'Check Verification Status' বাটনে ক্লিক করলে আপনার রিয়েল-টাইম ভিসার স্ট্যাটাস ও অনুমোদিত ডকুমেন্ট দেখতে পাবেন।";
            } else if (chatLang === 'en') {
                autoReplyText = "🔍 How to Check Status:\n1. Go to 'Check Status (VEVO)' tab.\n2. Enter your passport number and Application ID.\n3. Click 'Check Verification Status' to view your real-time visa status and documents.";
            } else {
                autoReplyText = "🔍 Go to 'Check Status (VEVO)' tab and enter your passport number to view your status.";
            }
        } 
        else if (txt.includes('ফিঙ্গার') || txt.includes('finger') || txt.includes('biometric') || txt.includes('বায়োমেট্রিক') || txt.includes('fingerprint')) {
            if (chatLang === 'bn') {
                autoReplyText = "👆 বায়োমেট্রিক ফিঙ্গারপ্রিন্ট দেওয়ার নিয়ম:\n১. মেনু থেকে 'Biometric Fingerprint' ট্যাবে যান।\n২. আপনার অ্যাপ্লিকেশন আইডি বা পাসপোর্ট নম্বর লিখে এন্টার দিন।\n৩. সেন্সরের ওপর পরপর ৮টি আঙুল (ডান ও বাম হাত) স্ক্যান করার জন্য ট্যাপ করুন। ৮টি আঙুল সফলভাবে স্ক্যান হলে স্বয়ংক্রিয়ভাবে রসিদ তৈরি হয়ে যাবে।";
            } else if (chatLang === 'en') {
                autoReplyText = "👆 How to Give Biometrics:\n1. Go to 'Biometric Fingerprint' tab.\n2. Enter your Application ID or Passport Number.\n3. Tap sequentially to scan all 8 fingers on the sensor until completed.";
            } else {
                autoReplyText = "👆 Go to 'Biometric Fingerprint' tab, enter your ID and tap the sensor to scan your 8 fingers.";
            }
        } 
        else if (txt.includes('fee') || txt.includes('cost') || txt.includes('টাকা') || txt.includes('ফি') || txt.includes('খরচ')) {
            if (chatLang === 'bn') {
                autoReplyText = "📌 ভিসা ও জব প্রসেসিং ফি মাত্র ৯,৫০০ টাকা (প্রায় ১২৫ অস্ট্রেলিয়ান ডলার)। পেমেন্ট করার বিস্তারিত মাধ্যম 'Visas & Application' পেজে দেওয়া আছে।";
            } else {
                autoReplyText = "📌 Visa and job processing fee is 9,500 BDT (~125 AUD). Details are available on the application page.";
            }
        } 
        else if (txt.includes('time') || txt.includes('day') || txt.includes('সময়') || txt.includes('দিন')) {
            if (chatLang === 'bn') {
                autoReplyText = "⏱️ সাধারণত আবেদন জমা দেওয়ার ২৪ থেকে ৪৮ ঘণ্টার মধ্যে আমাদের টিম যাচাই করে অফার লেটার ও ভিসা স্ট্যাটাস আপডেট করে।";
            } else {
                autoReplyText = "⏱️ Usually within 24 to 48 hours our team reviews and issues official documents.";
            }
        } 
        else {
            if (chatLang === 'bn') {
                autoReplyText = "আপনার বার্তাটি আমরা পেয়েছি। আপনি চাইলে আমাদের মেনু থেকে আবেদন, ফিঙ্গারপ্রিন্ট বা স্ট্যাটাস চেক সংক্রান্ত অপশনগুলো ব্যবহার করতে পারেন। খুব শীঘ্রই আমাদের একজন প্রতিনিধি আপনার সাথে যোগাযোগ করবেন।";
            } else if (chatLang === 'en') {
                autoReplyText = "We have received your message. You can use the application, fingerprint or status check tabs from the menu. A representative will contact you soon.";
            } else {
                autoReplyText = "Message received! Please use our application or status check tabs for quick assistance.";
            }
        }

        let botMsg = document.createElement('div');
        botMsg.style.cssText = "background:#e2f0d9; color:#155724; padding:8px 12px; border-radius:6px; max-width:90%; white-space: pre-line;";
        botMsg.innerText = autoReplyText;
        content.appendChild(botMsg);
        content.scrollTop = content.scrollHeight;
    }, 600);
}

function openVerificationPortalNewTab() {
    let win = window.open('', '_blank');
    win.document.write(`<!DOCTYPE html><html><head><title>VEVO Portal</title></head><body style="font-family:Arial; padding:30px;"><h2>VEVO Gateway</h2><input type="text" id="pPass" placeholder="Passport No" style="width:100%; padding:10px; margin:10px 0;"><button onclick="checkPass()" style="padding:10px; background:#002147; color:#fff; border:none; cursor:pointer;">Search</button><div id="pRes" style="margin-top:15px;"></div><script>async function checkPass(){let p=document.getElementById('pPass').value.toUpperCase().trim();let data=await fetch('${FIREBASE_DB_URL}');let json=await data.json();let apps=json?Object.values(json):[];let f=apps.find(a=>a.passport===p);document.getElementById('pRes').innerHTML=f?\`<b>Found:</b> \${f.name} - Status: \${f.visaApproved?'Granted':'Processing'}\`:'Not found';}</script></body></html>`);
    win.document.close();
}

function countEnabledDocuments(app) {
    if (!app) return 0;
    const flags = [
        app.paymentApproved, app.jobApproved, app.docWorkPermitAgreement, app.applicationApproved,
        app.visaApproved, app.docBiometricReceipt, app.docJobOffer, app.docSponsorshipNomination,
        app.docMedicalFitness, app.docPoliceClearance, app.docVevoCert, app.docCoeApproval,
        app.docAckReceipt, app.docEMedicalReferral, app.docAfpClearance,
        app.showCustomPdf1 && app.customPdf1Url,
        app.showCustomPdf2 && app.customPdf2Url,
        app.showCustomPdf3 && app.customPdf3Url,
        app.showCustomPdf4 && app.customPdf4Url
    ];
    return flags.filter(Boolean).length;
}

async function executeStatusLookup(passportNum, appId) {
    let activeAdmin = document.getElementById('adminTabDynamic');
    if(activeAdmin) activeAdmin.remove();

    const outputDiv = document.getElementById('statusOutput');
    outputDiv.style.display = 'block';
    outputDiv.style.background = '#fff3cd';
    outputDiv.style.color = '#856404';
    outputDiv.innerHTML = '<p>⏳ Querying Australia Central Registry...</p>';

    cachedApplications = await fetchAllApplications();
    let foundIndex = cachedApplications.findIndex(app => appId ? (app.passport === passportNum || app.id === appId) : (app.passport === passportNum));
    let found = foundIndex !== -1 ? cachedApplications[foundIndex] : null;

    if (found) {
        let currentFormNo = getEffectiveFormNo(found, foundIndex);
        let correctedGrantNo = getEffectiveGrantNo(found, foundIndex);
        let docCount = countEnabledDocuments(found);

        if (found.isRejected) {
            outputDiv.style.background = '#f8d7da';
            outputDiv.style.color = '#721c24';
            outputDiv.innerHTML = `
                <div style="border-bottom:1px solid #721c24; padding-bottom:6px; margin-bottom:10px; font-weight:bold; font-size:14px;">AUSTRALIA VERIFICATION RECORD</div>
                <p><b>Application ID:</b> ${found.id}</p>
                <p><b>Applicant Name:</b> ${found.name}</p>
                <p><b>Passport Number:</b> ${found.passport}</p>
                <p><b>Current Status:</b> <span style="color:#721c24; background:#f5c6cb; padding:4px 10px; border-radius:4px; font-weight:bold;">REJECTED</span></p>
                <p style="margin-top:10px; font-size:13px;">⚠️ Your application has been rejected by the Department of Home Affairs. Please contact support for further inquiries.</p>
            `;
            showToast("❌ Application Rejected!");
            return;
        }

        let documentsHtml = `<div style="margin-top:12px; display:flex; flex-direction:column; gap:8px;">`;

        if (found.paymentApproved) { documentsHtml += `<button onclick="viewPaymentApprovalLetter('${found.id}')" style="background:#000; color:white; padding:10px 18px; border:none; border-radius:4px; cursor:pointer; font-weight:bold; font-size:13px;"><i class="fas fa-file-invoice-dollar"></i> Payment Approval Letter</button>`; }
        if (found.jobApproved) { documentsHtml += `<button onclick="viewJobOfferLetter('${found.id}')" style="background:#002147; color:white; padding:10px 18px; border:none; border-radius:4px; cursor:pointer; font-weight:bold; font-size:13px;"><i class="fas fa-briefcase"></i> Official Job Offer Letter</button>`; }
        
        if (found.docWorkPermitAgreement) { 
            documentsHtml += `<button onclick="viewOfficialWorkPermitAgreement('${found.id}')" style="background:#28a745; color:white; padding:10px 18px; border:none; border-radius:4px; cursor:pointer; font-weight:bold; font-size:13px;"><i class="fas fa-file-contract"></i> Official Work Permit Visa Agreement & Employment Letter</button>`; 
        }

        if (found.applicationApproved) { documentsHtml += `<button onclick="viewApplicationForm1401('${found.id}')" style="background:#000; color:white; padding:10px 18px; border:none; border-radius:4px; cursor:pointer; font-weight:bold; font-size:13px;"><i class="fas fa-file-alt"></i> Form ${currentFormNo} Application (22-Page)</button>`; }
        if (found.visaApproved) { documentsHtml += `<button onclick="viewWorkPermitVisa('${found.id}')" style="background:#000; color:white; padding:10px 18px; border:none; border-radius:4px; cursor:pointer; font-weight:bold; font-size:13px;"><i class="fas fa-file-pdf"></i> Official Visa Grant Notice</button>`; }
        
        if (found.docBiometricReceipt) { 
            documentsHtml += `<button onclick="viewBiometricReceipt('${found.id}')" style="background:#000; color:white; padding:10px 18px; border:none; border-radius:4px; cursor:pointer; font-weight:bold; font-size:13px;"><i class="fas fa-fingerprint"></i> Biometric & 8-Fingerprints Receipt</button>`; 
        }

        if (found.docJobOffer) { documentsHtml += `<button onclick="viewJobOfferLetter('${found.id}')" style="background:#000; color:white; padding:10px 18px; border:none; border-radius:4px; cursor:pointer; font-weight:bold; font-size:13px;"><i class="fas fa-briefcase"></i> Employment Contract Letter</button>`; }
        if (found.docSponsorshipNomination) { documentsHtml += `<button onclick="viewSponsorshipNomination('${found.id}')" style="background:#000; color:white; padding:10px 18px; border:none; border-radius:4px; cursor:pointer; font-weight:bold; font-size:13px;"><i class="fas fa-certificate"></i> Sponsorship Nomination Approval</button>`; }
        if (found.docMedicalFitness) { documentsHtml += `<button onclick="viewMedicalFitness('${found.id}')" style="background:#000; color:white; padding:10px 18px; border:none; border-radius:4px; cursor:pointer; font-weight:bold; font-size:13px;"><i class="fas fa-heartbeat"></i> Medical Fitness Certificate</button>`; }
        if (found.docPoliceClearance) { documentsHtml += `<button onclick="viewPoliceClearance('${found.id}')" style="background:#000; color:white; padding:10px 18px; border:none; border-radius:4px; cursor:pointer; font-weight:bold; font-size:13px;"><i class="fas fa-shield-alt"></i> Police Clearance Reference Letter</button>`; }

        if (found.docVevoCert) { documentsHtml += `<button onclick="viewVevoCertificate('${found.id}')" style="background:#002147; color:white; padding:10px 18px; border:none; border-radius:4px; cursor:pointer; font-weight:bold; font-size:13px;"><i class="fas fa-check-double"></i> VEVO Entitlement Certificate</button>`; }
        if (found.docCoeApproval) { documentsHtml += `<button onclick="viewCoeNominationApproval('${found.id}')" style="background:#000; color:white; padding:10px 18px; border:none; border-radius:4px; cursor:pointer; font-weight:bold; font-size:13px;"><i class="fas fa-file-contract"></i> Approved Nomination / CoE Letter</button>`; }
        if (found.docAckReceipt) { documentsHtml += `<button onclick="viewApplicationAckReceipt('${found.id}')" style="background:#000; color:white; padding:10px 18px; border:none; border-radius:4px; cursor:pointer; font-weight:bold; font-size:13px;"><i class="fas fa-receipt"></i> Application Lodgement Acknowledgment</button>`; }
        if (found.docEMedicalReferral) { documentsHtml += `<button onclick="viewEMedicalReferralLetter('${found.id}')" style="background:#000; color:white; padding:10px 18px; border:none; border-radius:4px; cursor:pointer; font-weight:bold; font-size:13px;"><i class="fas fa-notes-medical"></i> eMedical Health Referral Letter (HAP ID)</button>`; }
        if (found.docAfpClearance) { documentsHtml += `<button onclick="viewAfpPoliceClearance('${found.id}')" style="background:#000; color:white; padding:10px 18px; border:none; border-radius:4px; cursor:pointer; font-weight:bold; font-size:13px;"><i class="fas fa-user-shield"></i> AFP Character Clearance Certificate</button>`; }

        if (found.showCustomPdf1 && found.customPdf1Url) { documentsHtml += `<a href="${found.customPdf1Url}" target="_blank" style="background:#002147; color:white; padding:10px 18px; border:none; border-radius:4px; text-decoration:none; text-align:center; font-weight:bold; font-size:13px;"><i class="fas fa-file-pdf"></i> Custom PDF Document 1</a>`; }
        if (found.showCustomPdf2 && found.customPdf2Url) { documentsHtml += `<a href="${found.customPdf2Url}" target="_blank" style="background:#002147; color:white; padding:10px 18px; border:none; border-radius:4px; text-decoration:none; text-align:center; font-weight:bold; font-size:13px;"><i class="fas fa-file-pdf"></i> Custom PDF Document 2</a>`; }
        if (found.showCustomPdf3 && found.customPdf3Url) { documentsHtml += `<a href="${found.customPdf3Url}" target="_blank" style="background:#002147; color:white; padding:10px 18px; border:none; border-radius:4px; text-decoration:none; text-align:center; font-weight:bold; font-size:13px;"><i class="fas fa-file-pdf"></i> Custom PDF Document 3</a>`; }
        if (found.showCustomPdf4 && found.customPdf4Url) { documentsHtml += `<a href="${found.customPdf4Url}" target="_blank" style="background:#002147; color:white; padding:10px 18px; border:none; border-radius:4px; text-decoration:none; text-align:center; font-weight:bold; font-size:13px;"><i class="fas fa-file-pdf"></i> Custom PDF Document 4</a>`; }

        documentsHtml += `</div>`;

        outputDiv.style.background = '#e2f0d9';
        outputDiv.style.color = '#155724';
        outputDiv.innerHTML = `
            <div style="border-bottom:1px solid #002147; padding-bottom:6px; margin-bottom:10px; font-weight:bold; color:#002147; font-size:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
                <span>AUSTRALIA VERIFICATION RECORD</span>
                <span style="background:#002147; color:#fff; padding:2px 8px; border-radius:4px; font-size:11px;">Available Letters: ${docCount}</span>
            </div>
            <p><b>Application ID:</b> <span style="cursor:pointer; font-weight:bold; color:#002147;" onclick="copyText('${found.id}')">${found.id}</span></p>
            <p><b>Applicant Name:</b> ${found.name}</p>
            <p><b>Passport Number:</b> <span style="cursor:pointer; font-weight:bold; color:#002147;" onclick="copyText('${found.passport}')">${found.passport}</span></p>
            <p><b>Passport Country:</b> ${found.country || 'BANGLADESH'}</p>
            <p><b>Visa Grant Number:</b> <span style="cursor:pointer; font-weight:bold; color:#002147;" onclick="copyText('${correctedGrantNo}')">${correctedGrantNo}</span></p>
            <p><b>Visa Category:</b> ${found.visaType}</p>
            <p><b>Current Status:</b> <span style="color:${found.visaApproved?'#155724':'#856404'}; background:${found.visaApproved?'#d4edda':'#fff3cd'}; padding:4px 10px; border-radius:4px; font-weight:bold;">${found.visaApproved?'Granted (Approved)':'Under Processing'}</span></p>
            ${documentsHtml}
        `;
        showToast("🔍 Verification Record Found!");
    } else {
        outputDiv.style.background = '#f8d7da';
        outputDiv.style.color = '#721c24';
        outputDiv.innerHTML = `<p>⚠️ Record Not Found. Please verify your passport details.</p>`;
        showToast("❌ Record Not Found!");
    }
}

function viewOfficialWorkPermitAgreement(appId) {
    let applications = cachedApplications;
    let userIndex = applications.findIndex(item => item.id === appId);
    let app = userIndex !== -1 ? applications[userIndex] : null;
    if (!app) return;
    let actualGrantNo = getEffectiveGrantNo(app, userIndex);
    let passportCountryVal = app.country ? app.country : 'BANGLADESH';
    let issueDateVal = getEffectiveDate(app);

    let win = window.open('', '_blank');
    let rawHtml = `<html><head><title>Official Work Permit Agreement - ${app.id}</title><style>
        body{font-family: Arial, sans-serif; padding:40px; color:#000; background:#fff; line-height:1.6;}
        .container-permit{max-width:780px; margin:0 auto; border:2px solid #002147; padding:40px; box-shadow:0 0 15px rgba(0,0,0,0.1); position:relative;}
        .permit-header{display:flex; justify-content:space-between; align-items:center; border-bottom:3px solid #002147; padding-bottom:15px; margin-bottom:25px;}
        .permit-logo h2{font-size:20px; color:#002147; margin:0;}
        .permit-logo span{font-size:12px; color:#555; display:block;}
        h3{font-size:14px; color:#002147; border-bottom:1px solid #ccc; padding-bottom:4px; margin-top:20px; text-transform:uppercase;}
        table{width:100%; border-collapse:collapse; margin-top:10px; margin-bottom:15px;}
        th, td{border:1px solid #bbb; padding:8px 12px; font-size:12px; text-align:left;}
        th{background:#f4f6f9; width:38%; color:#333;}
        .watermark{position:absolute; top:42%; left:15%; font-size:48px; color:rgba(0,33,71,0.04); transform:rotate(-30deg); font-weight:bold; z-index:0; pointer-events:none;}
    </style></head><body>
    <div class="container-permit">
        <div class="watermark">OFFICIAL WORK PERMIT AGREEMENT</div>
        <div class="permit-header">
            <div class="permit-logo">
                <h2>Australian Government</h2>
                <span>Department of Home Affairs • Employment & Migration Division</span>
            </div>
            <div style="text-align:right; font-size:12px; color:#444;">
                <b>Date Issued:</b> ${issueDateVal}<br>
                <b>Permit Ref:</b> AUS-WP-2026-9941
            </div>
        </div>

        <p>To, <b>${app.name}</b>,</p>
        <p>We are pleased to officially issue this <b>Official Work Permit Visa Agreement & Employment Letter</b> under the sponsorship quota of Australia All Company recruitment programs.</p>

        <h3>Candidate Biodata & Identification</h3>
        <table>
            <tr><th>Application ID</th><td><b>${app.id}</b></td></tr>
            <tr><th>Full Name</th><td>${app.name}</td></tr>
            <tr><th>Date of Birth</th><td>${app.dob || '06 February 1989'}</td></tr>
            <tr><th>Passport Number</th><td>${app.passport}</td></tr>
            <tr><th>Passport Country</th><td>${passportCountryVal}</td></tr>
            <tr><th>Approved Visa Category</th><td>${app.visaType}</td></tr>
            <tr><th>Visa Grant / Permit Number</th><td><b>${actualGrantNo}</b></td></tr>
        </table>

        <h3>Employment Terms & Conditions</h3>
        <table>
            <tr><th>Employment Status</th><td><b>Active & Fully Approved</b></td></tr>
            <tr><th>Standard Working Hours</th><td>38 Hours per Week (Overtime Applicable)</td></tr>
            <tr><th>Minimum Remuneration</th><td>$32.50 AUD per Hour + Standard Corporate Benefits</td></tr>
            <tr><th>Work Location</th><td>Approved Corporate & Agricultural Sites, Australia</td></tr>
            <tr><th>Permit Validity</th><td>3 Years from Date of Arrival</td></tr>
        </table>

        <p style="font-size:11px; color:#555; margin-top:20px;">📌 <b>Notice:</b> This document serves as an official verification certificate and work permit agreement. Holders are entitled to travel and commence employment upon arrival in Australia in accordance with subclass regulations.</p>

        <div style="text-align:center; margin-top:30px; position:relative; z-index:1;">
            <button onclick="window.print()" style="padding:12px 30px; background:#002147; color:#fff; border:none; cursor:pointer; font-weight:bold; font-size:14px; border-radius:4px;">🖨️ Print Work Permit Agreement Letter</button>
        </div>
    </div></body></html>`;

    win.document.write(cleanSpanTags(rawHtml));
    win.document.close();
}

function viewApplicationForm1401(appId) {
    let applications = cachedApplications;
    let userIndex = applications.findIndex(item => item.id === appId);
    let app = userIndex !== -1 ? applications[userIndex] : null;
    if (!app) return;
    let currentFormNo = getEffectiveFormNo(app, userIndex);
    let currentGrantNo = getEffectiveGrantNo(app, userIndex);
    let issueDateVal = getEffectiveDate(app);

    let photoTag = app.passPhoto ? `<img src="${app.passPhoto}" style="width:90px; height:110px; object-fit:cover; border:1px solid #333; float:right;" alt="Photo">` : '';
    let win = window.open('', '_blank');
    let rawHtml = `<html><head><title>Form ${currentFormNo} - ${app.id}</title><style>
        body{font-family: Arial, sans-serif; padding:20px; background:#f5f5f5; color:#000; line-height:1.5;}
        .page{background:#fff; border:1px solid #999; padding:40px; max-width:800px; margin:0 auto 30px auto; box-shadow:0 0 10px rgba(0,0,0,0.15); position:relative;}
        .gov-header{display:flex; justify-content:space-between; align-items:flex-start; border-bottom:2px solid #000; padding-bottom:10px; margin-bottom:20px;}
        .gov-logo-text{font-size:14px; font-weight:bold; text-transform:uppercase;}
        .form-title-box{text-align:right;}
        .form-title-box h1{font-size:22px; color:#000; margin:0;}
        .form-title-box h2{font-size:13px; color:#444; margin:0;}
        h3{font-size:13px; text-transform:uppercase; background:#eee; padding:5px; margin-top:20px; border-left:4px solid #002147;}
        table{width:100%; border-collapse:collapse; margin-top:10px; margin-bottom:15px;}
        th, td{border:1px solid #333; padding:7px 10px; font-size:12px; text-align:left;}
        th{background:#f9f9f9; width:35%;}
        .page-footer{position:absolute; bottom:15px; right:40px; font-size:11px; color:#555;}
        .print-btn-bar{text-align:center; margin-bottom:40px;}
    </style></head><body>

    <div class="page">
        ${photoTag}
        <div class="gov-header">
            <div class="gov-logo-text">Australian Government<br><span style="font-size:11px; font-weight:normal;">Department of Immigration and Border Protection</span></div>
            <div class="form-title-box">
                <h2>Application for a</h2>
                <h1>Temporary Work Visa</h1>
                <h2>Form ${currentFormNo}</h2>
            </div>
        </div>
        <p style="font-size:11px; margin-bottom:15px;">Official Australian Government Department of Home Affairs Application Record.</p>
        
        <h3>Part A - Applicant Biodata & Details</h3>
        <table>
            <tr><th>Application ID</th><td><b>${app.id}</b></td></tr>
            <tr><th>Form Number</th><td><b>${currentFormNo}</b></td></tr>
            <tr><th>Full Name</th><td>${app.name}</td></tr>
            <tr><th>Date of Birth</th><td>${app.dob || 'N/A'}</td></tr>
            <tr><th>Passport Number</th><td>${app.passport}</td></tr>
            <tr><th>Passport Country</th><td>${app.country || 'BANGLADESH'}</td></tr>
            <tr><th>Visa Stream</th><td>${app.visaType}</td></tr>
            <tr><th>Visa Grant Number</th><td><b>${currentGrantNo}</b></td></tr>
            <tr><th>Phone Number</th><td>${app.phone || 'N/A'}</td></tr>
            <tr><th>Email Address</th><td>${app.email || 'N/A'}</td></tr>
            <tr><th>Lodgement Date</th><td>${issueDateVal}</td></tr>
        </table>
        <div class="page-footer">${currentFormNo} (Design date 07/14) - Page 1 of 22</div>
    </div>

    <div class="print-btn-bar">
        <button onclick="window.print()" style="padding:12px 30px; background:#002147; color:#fff; border:none; cursor:pointer; font-weight:bold; font-size:14px; border-radius:4px;">🖨️ Print Full 22-Page Application</button>
    </div>
    </body></html>`;
    
    win.document.write(cleanSpanTags(rawHtml));
    win.document.close();
}

function viewWorkPermitVisa(appId) {
    let applications = cachedApplications;
    let userIndex = applications.findIndex(item => item.id === appId);
    let app = userIndex !== -1 ? applications[userIndex] : null;
    if (!app) return;
    let actualGrantNo = getEffectiveGrantNo(app, userIndex);
    let passportCountryVal = app.country ? app.country : 'BANGLADESH';
    let issueDateVal = getEffectiveDate(app);

    let win = window.open('', '_blank');
    let rawHtml = `<html><head><title>Visa Grant Notice - ${app.id}</title><style>
        body{font-family: Arial, sans-serif; padding:40px; color:#000; background:#fff; line-height:1.6;}
        .container-grant{max-width:750px; margin:0 auto; border:1px solid #ddd; padding:40px; box-shadow:0 0 15px rgba(0,0,0,0.08); position:relative;}
        .grant-header{display:flex; justify-content:space-between; align-items:center; border-bottom:3px solid #002147; padding-bottom:15px; margin-bottom:25px;}
        .grant-logo span{font-size:12px; color:#555; display:block;}
        .grant-logo h2{font-size:18px; color:#002147; margin:0;}
        h3{font-size:15px; color:#002147; border-bottom:1px solid #ccc; padding-bottom:4px; margin-top:25px;}
        table{width:100%; border-collapse:collapse; margin-top:10px; margin-bottom:20px;}
        th, td{border:1px solid #bbb; padding:8px 12px; font-size:13px; text-align:left;}
        th{background:#f4f6f9; width:38%; color:#333;}
        .watermark{position:absolute; top:40%; left:20%; font-size:65px; color:rgba(0,33,71,0.04); transform:rotate(-30deg); font-weight:bold; z-index:0; pointer-events:none;}
    </style></head><body>
    <div class="container-grant">
        <div class="watermark">OFFICIAL GRANT</div>
        <div class="grant-header">
            <div class="grant-logo">
                <h2>Australian Government</h2>
                <span>Department of Home Affairs</span>
            </div>
            <div style="text-align:right; font-size:12px; color:#444;">
                <b>Date:</b> ${issueDateVal}<br>
                <b>Transaction Ref:</b> EGPWRT6IUK
            </div>
        </div>

        <p>Dear <b>${app.name}</b>,</p>
        <p>We have granted you a <b>${app.visaType}</b> on <b>${issueDateVal}</b>.</p>

        <h3>Application Status</h3>
        <p><b>${app.visaType}:</b> <span style="color:green; font-weight:bold;">Granted</span></p>

        <h3>Visa Conditions</h3>
        <p><b>8113 - Work as seacrew / Specialist Operative</b></p>
        <p style="font-size:12px; color:#555;">You can check these conditions at any time by using the Visa Entitlement Verification Online (VEVO) service.</p>

        <h3>Visa Duration and Travel</h3>
        <table>
            <tr><th>Date of grant</th><td>${issueDateVal}</td></tr>
            <tr><th>Must not arrive after</th><td>19 October 2029</td></tr>
            <tr><th>Stay period</th><td>Three years from the date of grant</td></tr>
            <tr><th>Travel</th><td>Multiple entries</td></tr>
        </table>

        <h3>Visa Summary</h3>
        <table>
            <tr><th>Name</th><td>${app.name}</td></tr>
            <tr><th>Date of birth</th><td>${app.dob || '06 February 1989'}</td></tr>
            <tr><th>Visa</th><td>${app.visaType}</td></tr>
            <tr><th>Visa grant number</th><td><b>${actualGrantNo}</b></td></tr>
            <tr><th>Passport number</th><td>${app.passport}</td></tr>
            <tr><th>Passport country</th><td>${passportCountryVal}</td></tr>
            <tr><th>Application ID</th><td>${app.id}</td></tr>
        </table>

        <div style="text-align:center; margin-top:35px; position:relative; z-index:1;">
            <button onclick="window.print()" style="padding:12px 30px; background:#002147; color:#fff; border:none; cursor:pointer; font-weight:bold; font-size:14px; border-radius:4px;">🖨️ Print Visa Grant Notice</button>
        </div>
    </div></body></html>`;

    win.document.write(cleanSpanTags(rawHtml));
    win.document.close();
}

function viewPaymentApprovalLetter(appId) {
    let applications = cachedApplications;
    let userIndex = applications.findIndex(item => item.id === appId);
    let app = userIndex !== -1 ? applications[userIndex] : null;
    if (!app) return;
    let currentGrantNo = getEffectiveGrantNo(app, userIndex);

    let win = window.open('', '_blank');
    let rawHtml = `<html><head><title>Payment Approval - ${app.id}</title><style>body{font-family:Arial,sans-serif; padding:40px; color:#222;}.box{border:1px solid #333; padding:30px; max-width:700px; margin:0 auto;}h2{text-align:center; color:#002147;}</style></head><body>
    <div class="box"><h2>AUSTRALIA ALL COMPANY SERVICES</h2><h3>Official Processing Fee Clearance Receipt</h3><hr>
    <p><b>Application ID:</b> ${app.id}</p><p><b>Applicant Name:</b> ${app.name}</p><p><b>Passport:</b> ${app.passport}</p><p><b>Visa Grant Number:</b> ${currentGrantNo}</p><p><b>Status:</b> <span style="color:green; font-weight:bold;">PAYMENT VERIFIED AND APPROVED</span></p>
    <div style="text-align:center; margin-top:30px;"><button onclick="window.print()" style="padding:10px 25px; background:#002147; color:#fff; border:none; cursor:pointer;">Print Document</button></div></div></body></html>`;
    
    win.document.write(cleanSpanTags(rawHtml));
    win.document.close();
}

function viewJobOfferLetter(appId) {
    let app = cachedApplications.find(item => item.id === appId);
    if (!app) return;
    let win = window.open('', '_blank');
    let rawHtml = `<html><head><title>Job Offer Letter - ${app.id}</title><style>body{font-family:Arial,sans-serif; padding:40px; color:#222;}.box{border:1px solid #333; padding:30px; max-width:700px; margin:0 auto;}h2{text-align:center; color:#002147;}</style></head><body>
    <div class="box"><h2>AUSTRALIA GLOBAL RECRUITMENT PTY LTD</h2><h3>Official Employment Contract</h3><hr>
    <p><b>Candidate:</b> ${app.name}</p><p><b>Passport:</b> ${app.passport}</p><p><b>Passport Country:</b> ${app.country || 'BANGLADESH'}</p><p><b>Application ID:</b> ${app.id}</p><p><b>Position:</b> ${app.visaType}</p><p><b>Salary:</b> $32.50 AUD / Hour</p>
    <div style="text-align:center; margin-top:30px;"><button onclick="window.print()" style="padding:10px 25px; background:#002147; color:#fff; border:none; cursor:pointer;">Print Document</button></div></div></body></html>`;
    
    win.document.write(cleanSpanTags(rawHtml));
    win.document.close();
}

function viewBiometricReceipt(appId) {
    let app = cachedApplications.find(item => item.id === appId);
    if (!app) return;

    let fingersHtml = '';
    for (let i = 0; i < 8; i++) {
        let fLabel = fingerLabels[i];
        let fImg = (app.fingerprintImages && app.fingerprintImages[i] && app.fingerprintImages[i].image) 
                    ? app.fingerprintImages[i].image 
                    : generateFingerprintDataUrl(fLabel);
        
        fingersHtml += `
            <div class="finger-card" style="background:#f9f9f9; border:1px solid #ccc; padding:10px; border-radius:5px; text-align:center;">
                <img src="${fImg}" alt="${fLabel}" style="width:70px; height:80px; object-fit:contain; border:1px solid #ddd; margin-bottom:5px;">
                <br><b style="font-size:11px; color:#002147;">${fLabel}</b>
                <br><span style="font-size:10px; color:green; font-weight:bold;">Verified</span>
            </div>
        `;
    }

    let win = window.open('', '_blank');
    let rawHtml = `<html><head><title>Biometric Fingerprints Receipt - ${app.id}</title><style>
        body{font-family:Arial,sans-serif; padding:30px; color:#222;}
        .box{border:1px solid #333; padding:30px; max-width:850px; margin:0 auto;}
        h2{text-align:center; color:#002147; margin-bottom:5px;}
        h3{text-align:center; font-size:14px; color:#555; margin-bottom:20px;}
        .fingers-grid{display:grid; grid-template-columns: repeat(4, 1fr); gap:12px; margin-top:15px;}
    </style></head><body>
    <div class="box">
        <h2>DEPARTMENT OF HOME AFFAIRS</h2>
        <h3>Official Biometric & 8-Fingerprint Verification Receipt</h3>
        <hr style="margin:15px 0;">
        <p><b>Application ID:</b> ${app.id}</p>
        <p><b>Applicant Name:</b> ${app.name}</p>
        <p><b>Passport Number:</b> ${app.passport}</p>
        <p><b>Status:</b> <span style="color:green; font-weight:bold;">All 8 Fingerprints Scanned & Verified Successfully</span></p>
        
        <h4 style="margin-top:20px; color:#002147; border-bottom:1px solid #002147; padding-bottom:4px;">Right Hand & Left Hand 8 Fingers Scanned Records:</h4>
        <div class="fingers-grid">
            ${fingersHtml}
        </div>

        <div style="text-align:center; margin-top:35px;"><button onclick="window.print()" style="padding:10px 25px; background:#002147; color:#fff; border:none; cursor:pointer; font-weight:bold; border-radius:4px;">🖨️ Print 8-Fingerprint Receipt</button></div>
    </div></body></html>`;
    
    win.document.write(cleanSpanTags(rawHtml));
    win.document.close();
}

function viewSponsorshipNomination(appId) {
    let app = cachedApplications.find(item => item.id === appId);
    if (!app) return;
    let win = window.open('', '_blank');
    let rawHtml = `<html><head><title>Sponsorship Nomination - ${app.id}</title><style>body{font-family:Arial,sans-serif; padding:40px;}.box{border:1px solid #333; padding:30px; max-width:700px; margin:0 auto;}h2{text-align:center; color:#002147;}</style></head><body>
    <div class="box"><h2>DEPARTMENT OF HOME AFFAIRS</h2><h3>Sponsorship Nomination Approval</h3><hr>
    <p><b>Nominee:</b> ${app.name}</p><p><b>Passport:</b> ${app.passport}</p><p><b>Visa Category:</b> ${app.visaType}</p><p><b>Approval Ref:</b> NOM-2026-884912</p><p><b>Status:</b> Approved</p>
    <div style="text-align:center; margin-top:30px;"><button onclick="window.print()" style="padding:10px 25px; background:#002147; color:#fff; border:none; cursor:pointer;">Print Document</button></div></div></body></html>`;
    
    win.document.write(cleanSpanTags(rawHtml));
    win.document.close();
}

function viewMedicalFitness(appId) {
    let app = cachedApplications.find(item => item.id === appId);
    if (!app) return;
    let win = window.open('', '_blank');
    let rawHtml = `<html><head><title>Medical Certificate - ${app.id}</title><style>body{font-family:Arial,sans-serif; padding:40px;}.box{border:1px solid #333; padding:30px; max-width:700px; margin:0 auto;}h2{text-align:center; color:#002147;}</style></head><body>
    <div class="box"><h2>COMMONWEALTH DEPARTMENT OF HEALTH</h2><h3>Medical Fitness Certificate</h3><hr>
    <p><b>Candidate:</b> ${app.name}</p><p><b>Passport:</b> ${app.passport}</p><p><b>HAP ID:</b> HAP-99482103</p><p><b>Result:</b> Satisfied / Medically Fit</p>
    <div style="text-align:center; margin-top:30px;"><button onclick="window.print()" style="padding:10px 25px; background:#002147; color:#fff; border:none; cursor:pointer;">Print Document</button></div></div></body></html>`;
    
    win.document.write(cleanSpanTags(rawHtml));
    win.document.close();
}

function viewPoliceClearance(appId) {
    let app = cachedApplications.find(item => item.id === appId);
    if (!app) return;
    let win = window.open('', '_blank');
    let rawHtml = `<html><head><title>Police Clearance - ${app.id}</title><style>body{font-family:Arial,sans-serif; padding:40px;}.box{border:1px solid #333; padding:30px; max-width:700px; margin:0 auto;}h2{text-align:center; color:#002147;}</style></head><body>
    <div class="box"><h2>AUSTRALIAN FEDERAL POLICE (AFP)</h2><h3>Police Clearance Reference Letter</h3><hr>
    <p><b>Applicant:</b> ${app.name}</p><p><b>Passport:</b> ${app.passport}</p><p><b>Reference:</b> AFP-CC-2026-9931</p><p><b>Status:</b> Cleared</p>
    <div style="text-align:center; margin-top:30px;"><button onclick="window.print()" style="padding:10px 25px; background:#002147; color:#fff; border:none; cursor:pointer;">Print Document</button></div></div></body></html>`;
    
    win.document.write(cleanSpanTags(rawHtml));
    win.document.close();
}

function viewVevoCertificate(appId) {
    let app = cachedApplications.find(item => item.id === appId);
    if (!app) return;
    let userIndex = cachedApplications.findIndex(item => item.id === appId);
    let actualGrantNo = getEffectiveGrantNo(app, userIndex);
    let issueDateVal = getEffectiveDate(app);

    let win = window.open('', '_blank');
    let rawHtml = `<html><head><title>VEVO Verification Certificate - ${app.id}</title><style>
        body{font-family:Arial,sans-serif; padding:40px; background:#f4f6f9; color:#000;}
        .vevo-card{background:#fff; border:2px solid #002147; max-width:750px; margin:0 auto; padding:35px; border-radius:6px; box-shadow:0 0 15px rgba(0,0,0,0.1); position:relative;}
        .vevo-header{display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #002147; padding-bottom:12px; margin-bottom:20px;}
        h2{color:#002147; margin:0; font-size:20px;}
        table{width:100%; border-collapse:collapse; margin-top:15px;}
        th, td{border:1px solid #ccc; padding:8px 12px; font-size:12px; text-align:left;}
        th{background:#eef3f8; width:40%; color:#002147;}
    </style></head><body>
    <div class="vevo-card">
        <div class="vevo-header">
            <div>
                <h2>Australian Government</h2>
                <span style="font-size:12px; color:#555;">Visa Entitlement Verification Online (VEVO)</span>
            </div>
            <div style="text-align:right; font-size:11px;">
                <b>Verification Date:</b> ${issueDateVal}<br>
                <b>Status Code:</b> IN-EFFECT
            </div>
        </div>
        <h3 style="font-size:14px; color:#002147; margin-bottom:10px;">Official Visa Entitlement Details</h3>
        <table>
            <tr><th>Visa Class / Subclass</th><td>${app.visaType}</td></tr>
            <tr><th>Visa Grant Number</th><td><b>${actualGrantNo}</b></td></tr>
            <tr><th>Passport Number</th><td>${app.passport}</td></tr>
            <tr><th>Passport Country</th><td>${app.country || 'BANGLADESH'}</td></tr>
            <tr><th>Family Name / Given Name</th><td>${app.name}</td></tr>
            <tr><th>Visa Status</th><td><b style="color:green;">In Effect (Active & Valid)</b></td></tr>
            <tr><th>Work Rights</th><td>Unlimited Work Rights (Subject to Subclass condition 8113)</td></tr>
            <tr><th>Study Rights</th><td>Permitted</td></tr>
            <tr><th>Location</th><td>OFFSHORE / ON-ARRIVALS ALLOWED</td></tr>
        </table>
        <div style="text-align:center; margin-top:30px;">
            <button onclick="window.print()" style="padding:10px 25px; background:#002147; color:#fff; border:none; cursor:pointer; font-weight:bold; border-radius:4px;">🖨️ Print VEVO Certificate</button>
        </div>
    </div></body></html>`;

    win.document.write(cleanSpanTags(rawHtml));
    win.document.close();
}

function viewCoeNominationApproval(appId) {
    let app = cachedApplications.find(item => item.id === appId);
    if (!app) return;
    let win = window.open('', '_blank');
    let rawHtml = `<html><head><title>CoE Nomination Approval - ${app.id}</title><style>
        body{font-family:Arial,sans-serif; padding:40px; color:#222;}
        .box{border:1px solid #333; padding:35px; max-width:750px; margin:0 auto; box-shadow:0 0 10px rgba(0,0,0,0.1);}
        h2{color:#002147; margin-bottom:4px;}
        h3{color:#555; font-size:13px; border-bottom:2px solid #002147; padding-bottom:8px; margin-bottom:20px;}
    </style></head><body>
    <div class="box">
        <h2>AUSTRALIAN MIGRATION & EMPLOYMENT NOMINATION BOARD</h2>
        <h3>Official Confirmation of Enrolment & Approved Sponsorship Nomination</h3>
        <p><b>Nomination Reference Number:</b> NOM-AU-2026-99410</p>
        <p><b>Nominated Candidate:</b> ${app.name}</p>
        <p><b>Passport Number:</b> ${app.passport}</p>
        <p><b>Approved Occupation / Visa Category:</b> ${app.visaType}</p>
        <p><b>Sponsoring Business Name:</b> Australia Agriculture & Industry Recruitment Group Pty Ltd</p>
        <p><b>Sponsorship Validity:</b> 3 Years Duration</p>
        <hr style="margin:20px 0;">
        <p style="font-size:12px; color:#444;">This is an official document generated by the sponsoring entity confirming that the nomination for the aforementioned applicant has been approved under Australian Home Affairs workforce quotas.</p>
        <div style="text-align:center; margin-top:30px;">
            <button onclick="window.print()" style="padding:10px 25px; background:#002147; color:#fff; border:none; cursor:pointer; font-weight:bold; border-radius:4px;">🖨️ Print Nomination Approval</button>
        </div>
    </div></body></html>`;

    win.document.write(cleanSpanTags(rawHtml));
    win.document.close();
}

function viewApplicationAckReceipt(appId) {
    let app = cachedApplications.find(item => item.id === appId);
    if (!app) return;
    let issueDateVal = getEffectiveDate(app);

    let win = window.open('', '_blank');
    let rawHtml = `<html><head><title>Lodgement Acknowledgment - ${app.id}</title><style>
        body{font-family:Arial,sans-serif; padding:40px; color:#111;}
        .ack-card{border:1px solid #aaa; padding:35px; max-width:750px; margin:0 auto;}
        .ack-head{border-bottom:2px solid #002147; padding-bottom:10px; margin-bottom:20px;}
    </style></head><body>
    <div class="ack-card">
        <div class="ack-head">
            <h2 style="color:#002147; margin:0;">Australian Government</h2>
            <span style="font-size:12px; color:#555;">Department of Home Affairs - ImmiAccount System</span>
        </div>
        <h3 style="font-size:15px; color:#002147;">Acknowledgment of Application Received</h3>
        <p>Dear <b>${app.name}</b>,</p>
        <p>This notice confirms that your application for a <b>${app.visaType}</b> has been received and successfully registered by the Department of Home Affairs on <b>${issueDateVal}</b>.</p>
        <p><b>Application Reference (ID):</b> ${app.id}</p>
        <p><b>Passport Number:</b> ${app.passport}</p>
        <p><b>Passport Country:</b> ${app.country || 'BANGLADESH'}</p>
        <p><b>Primary Applicant Email:</b> ${app.email || 'N/A'}</p>
        <p><b>Application Status:</b> Application Lodged & Under Processing</p>
        <div style="background:#f9f9f9; padding:12px; border-left:4px solid #002147; margin-top:20px; font-size:12px;">
            📌 Note: Keep this lodgement acknowledgment receipt for your travel and biometric enrolment records.
        </div>
        <div style="text-align:center; margin-top:30px;">
            <button onclick="window.print()" style="padding:10px 25px; background:#002147; color:#fff; border:none; cursor:pointer; font-weight:bold; border-radius:4px;">🖨️ Print Lodgement Acknowledgment</button>
        </div>
    </div></body></html>`;

    win.document.write(cleanSpanTags(rawHtml));
    win.document.close();
}

function viewEMedicalReferralLetter(appId) {
    let app = cachedApplications.find(item => item.id === appId);
    if (!app) return;
    let issueDateVal = getEffectiveDate(app);

    let win = window.open('', '_blank');
    let rawHtml = `<html><head><title>eMedical Referral Letter - ${app.id}</title><style>
        body{font-family:Arial,sans-serif; padding:35px; color:#222;}
        .med-box{border:1px solid #444; padding:30px; max-width:750px; margin:0 auto;}
        .med-head{display:flex; justify-content:space-between; border-bottom:2px solid #002147; padding-bottom:10px; margin-bottom:20px;}
    </style></head><body>
    <div class="med-box">
        <div class="med-head">
            <div>
                <h2 style="color:#002147; margin:0;">eMedical System</h2>
                <span style="font-size:12px; color:#555;">Department of Home Affairs Health Processing</span>
            </div>
            <div style="text-align:right;">
                <b style="font-size:14px; color:#002147;">HAP ID: HAP-8840219</b><br>
                <span style="font-size:11px;">Date Issued: ${issueDateVal}</span>
            </div>
        </div>
        <h3 style="font-size:14px; color:#002147;">Health Examination Referral Letter</h3>
        <p><b>Applicant Name:</b> ${app.name}</p>
        <p><b>Passport Number:</b> ${app.passport}</p>
        <p><b>Date of Birth:</b> ${app.dob || '06 February 1989'}</p>
        <p><b>Visa Subclass:</b> ${app.visaType}</p>
        <p><b>Required Medical Examinations:</b> 501 Medical Examination & 502 Chest X-Ray Examination</p>
        <p><b>Medical Assessment Status:</b> <span style="color:green; font-weight:bold;">CLEARED / HEALTH REQUIREMENT SATISFIED</span></p>
        <div style="text-align:center; margin-top:30px;">
            <button onclick="window.print()" style="padding:10px 25px; background:#002147; color:#fff; border:none; cursor:pointer; font-weight:bold; border-radius:4px;">🖨️ Print eMedical Referral Letter</button>
        </div>
    </div></body></html>`;

    win.document.write(cleanSpanTags(rawHtml));
    win.document.close();
}

function viewAfpPoliceClearance(appId) {
    let app = cachedApplications.find(item => item.id === appId);
    if (!app) return;
    let win = window.open('', '_blank');
    let rawHtml = `<html><head><title>AFP Character Clearance - ${app.id}</title><style>
        body{font-family:Arial,sans-serif; padding:40px; color:#111;}
        .afp-card{border:2px solid #002147; padding:35px; max-width:750px; margin:0 auto; background:#fff;}
        .afp-header{text-align:center; border-bottom:2px solid #002147; padding-bottom:12px; margin-bottom:20px;}
    </style></head><body>
    <div class="afp-card">
        <div class="afp-header">
            <h2 style="color:#002147; margin:0;">AUSTRALIAN FEDERAL POLICE</h2>
            <span style="font-size:13px; font-weight:bold; color:#555;">NATIONAL POLICE CHECK & CHARACTER CLEARANCE</span>
        </div>
        <p><b>Certificate Reference Number:</b> AFP-NPC-2026-981045</p>
        <p><b>Subject Name:</b> ${app.name}</p>
        <p><b>Passport Number:</b> ${app.passport}</p>
        <p><b>Country of Residence / Origin:</b> ${app.country || 'BANGLADESH'}</p>
        <p><b>Purpose of Check:</b> Immigration / Overseas Employment Visa</p>
        <hr style="margin:20px 0;">
        <h4 style="color:green; margin-bottom:8px;">CLEARANCE RESULT: NO DISCLOSABLE COURT OUTCOMES (CLEARED)</h4>
        <p style="font-size:12px; color:#444;">This document certifies that a search of the Australian Federal Police National Names Index has been conducted for the person named above and no disclosable record was found.</p>
        <div style="text-align:center; margin-top:35px;">
            <button onclick="window.print()" style="padding:10px 25px; background:#002147; color:#fff; border:none; cursor:pointer; font-weight:bold; border-radius:4px;">🖨️ Print AFP Clearance Certificate</button>
        </div>
    </div></body></html>`;

    win.document.write(cleanSpanTags(rawHtml));
    win.document.close();
}

function populateCountries() {
    const list = document.getElementById('countryList');
    if (!list) return;
    list.innerHTML = '';
    countryListArray.forEach(c => {
        let opt = document.createElement('option');
        opt.value = c;
        list.appendChild(opt);
    });
}

async function handlePayMethodChange(method) {
    const titleEl = document.getElementById('lblAccountTitle');
    const nameEl = document.getElementById('displayBankName');
    const numEl = document.getElementById('displayReceiverNum');
    
    try {
        let res = await fetch(FIREBASE_SETTINGS_URL);
        let data = await res.json() || {};
        
        if (method === 'Bank Account') {
            if (titleEl) titleEl.innerText = 'Bank Name / Account Title:';
            if (nameEl) nameEl.innerText = data.bankName || 'Australia Migration Trust BD';
            if (numEl) numEl.value = data.bankAccountNum || '1503948102001';
        } else if (method === 'bKash') {
            if (titleEl) titleEl.innerText = 'Account Title / Agent (bKash):';
            if (nameEl) nameEl.innerText = data.bkashName || 'Australia Migration Trust BD (bKash)';
            if (numEl) numEl.value = data.bkashNum || '+8801879774023';
        } else if (method === 'Nagad') {
            if (titleEl) titleEl.innerText = 'Account Title / Agent (Nagad):';
            if (nameEl) nameEl.innerText = data.nagadName || 'Australia Migration Trust BD (Nagad)';
            if (numEl) numEl.value = data.nagadNum || '+8801879774023';
        } else if (method === 'Rocket') {
            if (titleEl) titleEl.innerText = 'Account Title / Agent (Rocket):';
            if (nameEl) nameEl.innerText = data.rocketName || 'Australia Migration Trust BD (Rocket)';
            if (numEl) numEl.value = data.rocketNum || '+8801879774023';
        } else if (method === 'Upay') {
            if (titleEl) titleEl.innerText = 'Account Title / Agent (Upay):';
            if (nameEl) nameEl.innerText = data.upayName || 'Australia Migration Trust BD (Upay)';
            if (numEl) numEl.value = data.upayNum || '+8801879774023';
        }
    } catch (err) {
        if (titleEl) titleEl.innerText = 'Account Title / Agent:';
        if (nameEl) nameEl.innerText = 'Australia Migration Trust BD';
        if (numEl) numEl.value = '+8801879774023';
    }
}

function showAppModalLoading() {
    document.getElementById('appModalOverlay').style.display = 'flex';
    document.getElementById('modalLoadingState').style.display = 'block';
    document.getElementById('modalSuccessState').style.display = 'none';
}

function showAppModalSuccess(appId) {
    document.getElementById('modalLoadingState').style.display = 'none';
    document.getElementById('modalAppIdText').innerText = appId;
    document.getElementById('modalSuccessState').style.display = 'block';
}

function closeAppModal() { document.getElementById('appModalOverlay').style.display = 'none'; }
function copyModalAppId() { copyText(document.getElementById('modalAppIdText').innerText); }

async function updateLiveCounters() {
    let apps = await fetchAllApplications();
    document.getElementById('totalApplicantsCount').innerText = apps.length + 1850;
    document.getElementById('approvedVisaCount').innerText = apps.filter(a => a.visaApproved || a.jobApproved || a.docJobOffer).length + 1690;
}

function copyReceiverNumber() { copyText(document.getElementById('displayReceiverNum').value); }

async function loadGlobalPaymentNumber() {
    let currentMethod = document.getElementById('payMethod').value;
    handlePayMethodChange(currentMethod);
}

function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

async function saveToCloudDirect(appData) {
    try {
        await fetch(FIREBASE_DB_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(appData) });
    } catch (err) {}
}

async function updateCloudApp(updatedApp) {
    try {
        let res = await fetch(FIREBASE_DB_URL);
        let data = await res.json();
        if (data) {
            for (let key in data) {
                if (data[key].id === updatedApp.id) {
                    await fetch(`https://australia-visa-applicati-42cca-default-rtdb.firebaseio.com/applications/${key}.json`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updatedApp) });
                    break;
                }
            }
        }
    } catch (err) {}
}

async function deleteCloudApp(appId) {
    try {
        let res = await fetch(FIREBASE_DB_URL);
        let data = await res.json();
        if (data) {
            for (let key in data) {
                if (data[key].id === appId) {
                    await fetch(`https://australia-visa-applicati-42cca-default-rtdb.firebaseio.com/applications/${key}.json`, { method: 'DELETE' });
                    break;
                }
            }
        }
    } catch (err) {}
}

async function fetchAllApplications() {
    try {
        let response = await fetch(FIREBASE_DB_URL);
        let data = await response.json();
        if (data) {
            cachedApplications = Object.values(data);
            saveLocalAppsCache(cachedApplications);
            return cachedApplications;
        }
    } catch (err) {}
    return cachedApplications;
}

function copyText(text) {
    navigator.clipboard.writeText(text).then(() => { showToast(`📋 Copied: ${text}`); });
}

function askBot(type) {
    const chatContainer = document.getElementById('chatBoxContainer');
    if (!chatContainer) return;
    let t = translations[currentLang] || translations['en'];
    let botA = type === 'cost' ? t.feeNote : (currentLang === 'bn' ? "সাধারণত ২৪ থেকে ৪৮ ঘণ্টার মধ্যে ডকুমেন্ট যাচাই ও ইস্যু করা হয়।" : "Verification takes 24 to 48 hours.");
    let botMsg = document.createElement('div');
    botMsg.style.cssText = "background:#e2f0d9; color:#155724; padding:8px 12px; border-radius:6px; max-width:85%;";
    botMsg.innerText = botA;
    chatContainer.appendChild(botMsg);
}

function showToast(message) {
    const toast = document.getElementById('toastNotification');
    if (!toast) return;
    toast.innerText = message;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 2500);
}

async function openAdminDirectly() {
    let password = prompt("⚠️ Security Protected! Enter Admin Password:");
    if (password === "FNG@2026") {
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        let container = document.querySelector('.container');
        let existingAdmin = document.getElementById('adminTabDynamic');
        if (!existingAdmin) {
            let adminDiv = document.createElement('div');
            adminDiv.id = 'adminTabDynamic';
            adminDiv.className = 'tab-content active';
            
            let sData = {};
            try {
                let sRes = await fetch(FIREBASE_SETTINGS_URL);
                sData = await sRes.json() || {};
            } catch (e) {}

            adminDiv.innerHTML = `
                <h2 style="color: #00008b;"><i class="fas fa-lock"></i> Australia All Company - Control Center</h2>
                
                <div style="background:#eef3f8; padding:15px; border-radius:5px; margin-bottom:15px; border:1px solid #b0bec5;">
                    <h3 style="font-size:14px; color:#002147; margin-bottom:12px;">💳 Global Payment Separate Settings (বিকাশ, নগদ, রকেট, উপায় ও ব্যাংক অ্যাকাউন্ট)</h3>
                    
                    <div style="display:flex; flex-direction:column; gap:12px;">
                        <div style="background:#fff; padding:10px; border-radius:4px; border:1px solid #ddd;">
                            <label style="margin-top:0; color:#e2136e; font-weight:bold;">bKash (বিকাশ) Name & Number:</label>
                            <input type="text" id="adminBkashName" value="${sData.bkashName || 'Australia Migration Trust BD (bKash)'}" placeholder="bKash Name / Title" style="margin-bottom:4px;">
                            <input type="text" id="adminBkashNum" value="${sData.bkashNum || '+8801879774023'}" placeholder="bKash Number">
                        </div>

                        <div style="background:#fff; padding:10px; border-radius:4px; border:1px solid #ddd;">
                            <label style="margin-top:0; color:#ec1c24; font-weight:bold;">Nagad (নগদ) Name & Number:</label>
                            <input type="text" id="adminNagadName" value="${sData.nagadName || 'Australia Migration Trust BD (Nagad)'}" placeholder="Nagad Name / Title" style="margin-bottom:4px;">
                            <input type="text" id="adminNagadNum" value="${sData.nagadNum || '+8801879774023'}" placeholder="Nagad Number">
                        </div>

                        <div style="background:#fff; padding:10px; border-radius:4px; border:1px solid #ddd;">
                            <label style="margin-top:0; color:#853591; font-weight:bold;">Rocket (রকেট) Name & Number:</label>
                            <input type="text" id="adminRocketName" value="${sData.rocketName || 'Australia Migration Trust BD (Rocket)'}" placeholder="Rocket Name / Title" style="margin-bottom:4px;">
                            <input type="text" id="adminRocketNum" value="${sData.rocketNum || '+8801879774023'}" placeholder="Rocket Number">
                        </div>

                        <div style="background:#fff; padding:10px; border-radius:4px; border:1px solid #ddd;">
                            <label style="margin-top:0; color:#00a859; font-weight:bold;">Upay (উপায়) Name & Number:</label>
                            <input type="text" id="adminUpayName" value="${sData.upayName || 'Australia Migration Trust BD (Upay)'}" placeholder="Upay Name / Title" style="margin-bottom:4px;">
                            <input type="text" id="adminUpayNum" value="${sData.upayNum || '+8801879774023'}" placeholder="Upay Number">
                        </div>

                        <div style="background:#fff; padding:10px; border-radius:4px; border:1px solid #ddd;">
                            <label style="margin-top:0; color:#002147; font-weight:bold;">Bank Account (ব্যাংক অ্যাকাউন্ট) Name & Number:</label>
                            <input type="text" id="adminBankName" value="${sData.bankName || 'Australia Migration Trust BD'}" placeholder="Bank Name / Title" style="margin-bottom:4px;">
                            <input type="text" id="adminBankNum" value="${sData.bankAccountNum || '1503948102001'}" placeholder="Bank Account Number">
                        </div>

                        <button onclick="updateGlobalPaymentSettings()" style="background:#002147; color:#fff; border:none; padding:12px; border-radius:4px; cursor:pointer; font-weight:bold; margin-top:5px;">🔄 Update All Separate Payment Settings</button>
                    </div>
                </div>

                <div id="adminAppList">⏳ Loading applications fast...</div>
            `;
            container.appendChild(adminDiv);
        } else {
            existingAdmin.classList.add('active');
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
        await loadAdminApplicationsFast();
        showToast("🔓 Access Granted");
    } else if (password !== null) {
        showCustomAlert("Access Denied!");
    }
}

async function updateGlobalPaymentSettings() {
    let settingsData = {
        bkashName: document.getElementById('adminBkashName').value.trim(),
        bkashNum: document.getElementById('adminBkashNum').value.trim(),
        nagadName: document.getElementById('adminNagadName').value.trim(),
        nagadNum: document.getElementById('adminNagadNum').value.trim(),
        rocketName: document.getElementById('adminRocketName').value.trim(),
        rocketNum: document.getElementById('adminRocketNum').value.trim(),
        upayName: document.getElementById('adminUpayName').value.trim(),
        upayNum: document.getElementById('adminUpayNum').value.trim(),
        bankName: document.getElementById('adminBankName').value.trim(),
        bankAccountNum: document.getElementById('adminBankNum').value.trim()
    };

    try {
        await fetch(FIREBASE_SETTINGS_URL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(settingsData)
        });
        showCustomAlert("সব পেমেন্ট মাধ্যম এবং অ্যাকাউন্ট নাম ও নম্বর সফলভাবে আপডেট করা হয়েছে!");
        loadGlobalPaymentNumber();
    } catch (err) { showCustomAlert("Error updating payment settings."); }
}

async function loadAdminApplicationsFast() {
    const adminList = document.getElementById('adminAppList');
    if (!adminList) return;
    
    let applications = await fetchAllApplications();
    if (applications.length === 0) { adminList.innerHTML = `<p style="color:#777; font-style:italic;">No applications submitted yet.</p>`; return; }

    let html = '';
    applications.forEach((app, idx) => {
        let currentFormNo = getEffectiveFormNo(app, idx);
        let currentGrantNo = getEffectiveGrantNo(app, idx);
        let currentDateVal = getEffectiveDate(app);

        let docsPreview = `<div style="margin:8px 0; font-size:12px; display:flex; gap:8px; flex-wrap:wrap;">`;
        if(app.passPhoto) docsPreview += `<a href="${app.passPhoto}" target="_blank" style="background:#002147; color:#fff; padding:4px 8px; border-radius:3px; text-decoration:none;">📷 Photo</a>`;
        if(app.passCopy) docsPreview += `<a href="${app.passCopy}" target="_blank" style="background:#002147; color:#fff; padding:4px 8px; border-radius:3px; text-decoration:none;">📄 Passport Copy</a>`;
        if(app.nidFront) docsPreview += `<a href="${app.nidFront}" target="_blank" style="background:#002147; color:#fff; padding:4px 8px; border-radius:3px; text-decoration:none;">🆔 NID Front</a>`;
        if(app.nidBack) docsPreview += `<a href="${app.nidBack}" target="_blank" style="background:#002147; color:#fff; padding:4px 8px; border-radius:3px; text-decoration:none;">🆔 NID Back</a>`;
        docsPreview += `<span style="background:#007bff; color:#fff; padding:4px 8px; border-radius:3px;">👆 8-Fingers Scanned (${app.scannedFingersCount || (app.fingerprintImages ? app.fingerprintImages.length : 0)}/8)</span>`;
        if(app.payReceipt) docsPreview += `<a href="${app.payReceipt}" target="_blank" style="background:#28a745; color:#fff; padding:4px 8px; border-radius:3px; text-decoration:none;">💳 Payment Receipt</a>`;
        docsPreview += `</div>`;

        html += `
            <div style="background:#fff; border:1px solid #b0bec5; padding:15px; margin-bottom:15px; border-radius:5px; border-left: 4px solid ${app.isRejected?'#d9534f':'#00008b'}; font-size:13px;">
                <p><b>App ID:</b> <b>${app.id}</b> | <b>Form No:</b> <b>${currentFormNo}</b> | <b>Grant No:</b> <b>${currentGrantNo}</b></p>
                <p><b>Name:</b> ${app.name} | <b>Passport:</b> ${app.passport} | <b>Phone:</b> ${app.phone || 'N/A'}</p>
                <p><b>Visa Category:</b> ${app.visaType} | <b>Status:</b> <span style="color:${app.isRejected?'#d9534f':'green'}; font-weight:bold;">${app.isRejected?'Rejected':'Active'}</span></p>
                ${docsPreview}

                <div class="admin-edit-biodata-box">
                    <div style="font-size:12px; font-weight:bold; color:#002147;">✏️ Edit Applicant Biodata & Letter Details (পরিবর্তন করলে সাথে সাথে সব লেটারে আপডেট হবে):</div>
                    <div class="admin-edit-grid">
                        <div class="admin-edit-field">
                            <label>Full Name:</label>
                            <input type="text" id="edit_name_${app.id}" value="${(app.name || '').replace(/"/g, '&quot;')}">
                        </div>
                        <div class="admin-edit-field">
                            <label>Passport No:</label>
                            <input type="text" id="edit_passport_${app.id}" value="${(app.passport || '').replace(/"/g, '&quot;')}" style="text-transform:uppercase;">
                        </div>
                        <div class="admin-edit-field">
                            <label>Passport Country:</label>
                            <input type="text" id="edit_country_${app.id}" value="${(app.country || 'BANGLADESH').replace(/"/g, '&quot;')}" style="text-transform:uppercase;">
                        </div>
                        <div class="admin-edit-field">
                            <label>Date of Birth:</label>
                            <input type="text" id="edit_dob_${app.id}" value="${(app.dob || '').replace(/"/g, '&quot;')}" placeholder="YYYY-MM-DD or DD Month YYYY">
                        </div>
                        <div class="admin-edit-field">
                            <label>Visa Category:</label>
                            <input type="text" id="edit_visaType_${app.id}" value="${(app.visaType || '').replace(/"/g, '&quot;')}">
                        </div>
                        <div class="admin-edit-field">
                            <label>Visa Grant No:</label>
                            <input type="text" id="edit_grantNo_${app.id}" value="${currentGrantNo.replace(/"/g, '&quot;')}">
                        </div>
                        <div class="admin-edit-field">
                            <label>Issue / Lodgement Date:</label>
                            <input type="text" id="edit_date_${app.id}" value="${currentDateVal.replace(/"/g, '&quot;')}">
                        </div>
                    </div>
                </div>

                <div style="margin:10px 0; background:#f9f9f9; padding:10px; border-radius:4px; border:1px solid #ddd;">
                    <p style="font-weight:bold; margin-bottom:6px; color:#002147;">📋 Document Approvals & Actions:</p>
                    
                    <div style="display:flex; flex-direction:column; gap:6px;">
                        <label style="margin-top:0; font-size:12px; display:flex; align-items:center; gap:6px; cursor:pointer; color:#d9534f; font-weight:bold;">
                            <input type="checkbox" id="chk_reject_${app.id}" ${app.isRejected ? 'checked' : ''}> ❌ Reject Application (Shows 'Rejected' on status check)
                        </label>
                        <hr style="margin:4px 0; border:0; border-top:1px solid #ddd;">

                        <label style="margin-top:0; font-size:12px; display:flex; align-items:center; gap:6px; cursor:pointer;">
                            <input type="checkbox" id="chk_pay_${app.id}" ${app.paymentApproved ? 'checked' : ''}> 1. Payment Approval Letter
                        </label>
                        <label style="margin-top:0; font-size:12px; display:flex; align-items:center; gap:6px; cursor:pointer;">
                            <input type="checkbox" id="chk_job_${app.id}" ${app.jobApproved ? 'checked' : ''}> 2. Official Job Offer Letter
                        </label>
                        
                        <label style="margin-top:0; font-size:12px; display:flex; align-items:center; gap:6px; cursor:pointer; background:#e2f0d9; padding:4px; border-radius:3px; font-weight:bold; color:#155724;">
                            <input type="checkbox" id="chk_wp_${app.id}" ${app.docWorkPermitAgreement ? 'checked' : ''}> 3. Official Work Permit Visa Agreement & Employment Letter
                        </label>

                        <label style="margin-top:0; font-size:12px; display:flex; align-items:center; gap:6px; cursor:pointer;">
                            <input type="checkbox" id="chk_app_${app.id}" ${app.applicationApproved ? 'checked' : ''}> 4. Form ${currentFormNo} Application Copy (22-Page)
                        </label>
                        <label style="margin-top:0; font-size:12px; display:flex; align-items:center; gap:6px; cursor:pointer;">
                            <input type="checkbox" id="chk_visa_${app.id}" ${app.visaApproved ? 'checked' : ''}> 5. Official Visa Grant Notice
                        </label>
                        
                        <label style="margin-top:0; font-size:12px; display:flex; align-items:center; gap:6px; cursor:pointer; background:#fff3cd; padding:4px; border-radius:3px; font-weight:bold; color:#856404;">
                            <input type="checkbox" id="chk_bio_${app.id}" ${app.docBiometricReceipt ? 'checked' : ''}> 6. Biometric & 8-Fingerprint Receipt
                        </label>

                        <label style="margin-top:0; font-size:12px; display:flex; align-items:center; gap:6px; cursor:pointer;">
                            <input type="checkbox" id="chk_jobnew_${app.id}" ${app.docJobOffer ? 'checked' : ''}> 7. Employment Contract Letter
                        </label>
                        <label style="margin-top:0; font-size:12px; display:flex; align-items:center; gap:6px; cursor:pointer;">
                            <input type="checkbox" id="chk_spon_${app.id}" ${app.docSponsorshipNomination ? 'checked' : ''}> 8. Sponsorship Nomination Approval
                        </label>
                        <label style="margin-top:0; font-size:12px; display:flex; align-items:center; gap:6px; cursor:pointer;">
                            <input type="checkbox" id="chk_med_${app.id}" ${app.docMedicalFitness ? 'checked' : ''}> 9. Medical Fitness Certificate
                        </label>
                        <label style="margin-top:0; font-size:12px; display:flex; align-items:center; gap:6px; cursor:pointer;">
                            <input type="checkbox" id="chk_police_${app.id}" ${app.docPoliceClearance ? 'checked' : ''}> 10. Police Clearance Reference Letter
                        </label>

                        <label style="margin-top:0; font-size:12px; display:flex; align-items:center; gap:6px; cursor:pointer; background:#eef3f8; padding:3px; border-radius:3px;">
                            <input type="checkbox" id="chk_vevo_${app.id}" ${app.docVevoCert ? 'checked' : ''}> 11. VEVO Entitlement Certificate
                        </label>
                        <label style="margin-top:0; font-size:12px; display:flex; align-items:center; gap:6px; cursor:pointer; background:#eef3f8; padding:3px; border-radius:3px;">
                            <input type="checkbox" id="chk_coe_${app.id}" ${app.docCoeApproval ? 'checked' : ''}> 12. Approved Nomination / CoE Letter
                        </label>
                        <label style="margin-top:0; font-size:12px; display:flex; align-items:center; gap:6px; cursor:pointer; background:#eef3f8; padding:3px; border-radius:3px;">
                            <input type="checkbox" id="chk_ack_${app.id}" ${app.docAckReceipt ? 'checked' : ''}> 13. Application Lodgement Acknowledgment
                        </label>
                        <label style="margin-top:0; font-size:12px; display:flex; align-items:center; gap:6px; cursor:pointer; background:#eef3f8; padding:3px; border-radius:3px;">
                            <input type="checkbox" id="chk_emed_${app.id}" ${app.docEMedicalReferral ? 'checked' : ''}> 14. eMedical Health Referral Letter (HAP ID)
                        </label>
                        <label style="margin-top:0; font-size:12px; display:flex; align-items:center; gap:6px; cursor:pointer; background:#eef3f8; padding:3px; border-radius:3px;">
                            <input type="checkbox" id="chk_afp_${app.id}" ${app.docAfpClearance ? 'checked' : ''}> 15. AFP Character Clearance Certificate
                        </label>

                        <div style="margin-top:8px; border-top:1px dashed #bbb; padding-top:8px;">
                            <label style="font-size:12px; font-weight:bold; color:#002147;">Custom PDF File 1:</label>
                            <input type="file" id="pdfFile1_${app.id}" accept=".pdf" style="padding:4px; font-size:11px; margin-bottom:4px; background:#fff;">
                            <label style="margin-top:0; font-size:12px; display:flex; align-items:center; gap:6px; cursor:pointer;">
                                <input type="checkbox" id="chk_custom1_${app.id}" ${app.showCustomPdf1 ? 'checked' : ''}> Show Custom PDF 1
                            </label>
                        </div>

                        <div style="margin-top:6px;">
                            <label style="font-size:12px; font-weight:bold; color:#002147;">Custom PDF File 2:</label>
                            <input type="file" id="pdfFile2_${app.id}" accept=".pdf" style="padding:4px; font-size:11px; margin-bottom:4px; background:#fff;">
                            <label style="margin-top:0; font-size:12px; display:flex; align-items:center; gap:6px; cursor:pointer;">
                                <input type="checkbox" id="chk_custom2_${app.id}" ${app.showCustomPdf2 ? 'checked' : ''}> Show Custom PDF 2
                            </label>
                        </div>

                        <div style="margin-top:6px;">
                            <label style="font-size:12px; font-weight:bold; color:#002147;">Custom PDF File 3:</label>
                            <input type="file" id="pdfFile3_${app.id}" accept=".pdf" style="padding:4px; font-size:11px; margin-bottom:4px; background:#fff;">
                            <label style="margin-top:0; font-size:12px; display:flex; align-items:center; gap:6px; cursor:pointer;">
                                <input type="checkbox" id="chk_custom3_${app.id}" ${app.showCustomPdf3 ? 'checked' : ''}> Show Custom PDF 3
                            </label>
                        </div>

                        <div style="margin-top:6px;">
                            <label style="font-size:12px; font-weight:bold; color:#002147;">Custom PDF File 4:</label>
                            <input type="file" id="pdfFile4_${app.id}" accept=".pdf" style="padding:4px; font-size:11px; margin-bottom:4px; background:#fff;">
                            <label style="margin-top:0; font-size:12px; display:flex; align-items:center; gap:6px; cursor:pointer;">
                                <input type="checkbox" id="chk_custom4_${app.id}" ${app.showCustomPdf4 ? 'checked' : ''}> Show Custom PDF 4
                            </label>
                        </div>
                    </div>

                    <div style="display:flex; gap:10px; margin-top:12px;">
                        <button onclick="saveAllAdminApprovals('${app.id}')" style="background:#28a745; color:#fff; border:none; padding:8px 14px; border-radius:4px; cursor:pointer; font-weight:bold; flex:1;">💾 Save & Update</button>
                        <button onclick="deleteApplicantPermanentlyWithPrompt('${app.id}', '${app.name}')" style="background:#d9534f; color:#fff; border:none; padding:8px 14px; border-radius:4px; cursor:pointer; font-weight:bold;">🗑️ Delete Permanently</button>
                    </div>
                </div>
            </div>
        `;
    });
    adminList.innerHTML = html;
}

async function saveAllAdminApprovals(appId) {
    let applications = await fetchAllApplications();
    let appIdx = applications.findIndex(item => item.id === appId);
    let app = appIdx !== -1 ? applications[appIdx] : null;
    if (!app) return;

    const editedName = document.getElementById(`edit_name_${appId}`).value.trim();
    const editedPassport = document.getElementById(`edit_passport_${appId}`).value.toUpperCase().trim();
    const editedCountry = document.getElementById(`edit_country_${appId}`).value.toUpperCase().trim();
    const editedDob = document.getElementById(`edit_dob_${appId}`).value.trim();
    const editedVisaType = document.getElementById(`edit_visaType_${appId}`).value.trim();
    const editedGrantNo = document.getElementById(`edit_grantNo_${appId}`).value.trim();
    const editedDate = document.getElementById(`edit_date_${appId}`).value.trim();

    if (editedName) app.name = editedName;
    if (editedPassport) app.passport = editedPassport;
    if (editedCountry) app.country = editedCountry;
    app.dob = editedDob;
    if (editedVisaType) app.visaType = editedVisaType;
    if (editedGrantNo) app.grantNo = editedGrantNo;
    if (editedDate) app.date = editedDate;

    app.isRejected = document.getElementById(`chk_reject_${appId}`).checked;
    app.paymentApproved = document.getElementById(`chk_pay_${appId}`).checked;
    app.jobApproved = document.getElementById(`chk_job_${appId}`).checked;
    app.docWorkPermitAgreement = document.getElementById(`chk_wp_${appId}`).checked;
    app.applicationApproved = document.getElementById(`chk_app_${appId}`).checked;
    app.visaApproved = document.getElementById(`chk_visa_${appId}`).checked;
    app.docBiometricReceipt = document.getElementById(`chk_bio_${appId}`).checked;
    app.docJobOffer = document.getElementById(`chk_jobnew_${appId}`).checked;
    app.docSponsorshipNomination = document.getElementById(`chk_spon_${appId}`).checked;
    app.docMedicalFitness = document.getElementById(`chk_med_${appId}`).checked;
    app.docPoliceClearance = document.getElementById(`chk_police_${appId}`).checked;

    app.docVevoCert = document.getElementById(`chk_vevo_${appId}`).checked;
    app.docCoeApproval = document.getElementById(`chk_coe_${appId}`).checked;
    app.docAckReceipt = document.getElementById(`chk_ack_${appId}`).checked;
    app.docEMedicalReferral = document.getElementById(`chk_emed_${appId}`).checked;
    app.docAfpClearance = document.getElementById(`chk_afp_${appId}`).checked;

    app.showCustomPdf1 = document.getElementById(`chk_custom1_${appId}`).checked;
    app.showCustomPdf2 = document.getElementById(`chk_custom2_${appId}`).checked;
    app.showCustomPdf3 = document.getElementById(`chk_custom3_${appId}`).checked;
    app.showCustomPdf4 = document.getElementById(`chk_custom4_${appId}`).checked;

    let fileInput1 = document.getElementById(`pdfFile1_${appId}`).files[0];
    let fileInput2 = document.getElementById(`pdfFile2_${appId}`).files[0];
    let fileInput3 = document.getElementById(`pdfFile3_${appId}`).files[0];
    let fileInput4 = document.getElementById(`pdfFile4_${appId}`).files[0];

    if (fileInput1) app.customPdf1Url = await convertFileToBase64(fileInput1);
    if (fileInput2) app.customPdf2Url = await convertFileToBase64(fileInput2);
    if (fileInput3) app.customPdf3Url = await convertFileToBase64(fileInput3);
    if (fileInput4) app.customPdf4Url = await convertFileToBase64(fileInput4);

    applications[appIdx] = app;
    cachedApplications = applications;
    saveLocalAppsCache(cachedApplications);

    await updateCloudApp(app);
    cachedApplications = await fetchAllApplications();
    saveLocalAppsCache(cachedApplications);
    updateLiveCounters();
    showCustomAlert("তথ্য ও ডকুমেন্ট অনুমোদন সফলভাবে সেভ হয়েছে এবং সব লেটারে সিঙ্ক হয়েছে!");
    loadAdminApplicationsFast();
}

function deleteApplicantPermanentlyWithPrompt(appId, appName) {
    let confirmDelete = confirm(`⚠️ সতর্কতা!\n\nআপনি কি নিশ্চিতভাবে আবেদনকারী "${appName}" (ID: ${appId}) কে স্থায়ীভাবে ডিলিট করতে চান?\n\n'OK' ক্লিক করলে ফায়ারবেস থেকে সমস্ত ডেটা চিরতরে মুছে যাবে। 'Cancel' করলে বাতিল হবে।`);

    if (confirmDelete) {
        cachedApplications = cachedApplications.filter(item => item.id !== appId);
        saveLocalAppsCache(cachedApplications);
        deleteCloudApp(appId).then(() => {
            fetchAllApplications().then(apps => {
                cachedApplications = apps;
                saveLocalAppsCache(cachedApplications);
                updateLiveCounters();
                showCustomAlert("ইউজার সফলভাবে ফায়ারবেস থেকে স্থায়ীভাবে মুছে ফেলা হয়েছে!");
                loadAdminApplicationsFast();
            });
        });
    } else {
        showCustomAlert("ডিলিট প্রক্রিয়া বাতিল করা হয়েছে।");
    }
}

async function checkIsDuplicate(email, phone, passport) {
    try {
        let apps = await fetchAllApplications();
        return apps.some(a => a.email === email || a.phone === phone || a.passport === passport);
    } catch (err) {}
    return false;
}

async function sendFilesToTelegramBot(appData) {
    const botToken = "8803128812:AAHN_TKO2C-w1cKNPipRhPaglN7ftHuPW5w"; 
    const chatId = "7560607133";
    try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: `🚨 নতুন আবেদন জমা পড়েছে!\nApp ID: ${appData.id}\nনাম: ${appData.name}\nপাসপোর্ট: ${appData.passport}` })
        });
    } catch (error) {}
}

function switchLanguage(lang) {
    currentLang = lang;
    let t = translations[lang] || translations['en'];
    
    document.getElementById('topGovText').innerText = t.topGov;
    document.getElementById('subLinkImmi').innerText = t.subImmi;
    document.getElementById('subLinkVevo').innerText = t.subVevo;
    document.getElementById('svgGovText').textContent = t.svgGov;
    document.getElementById('svgDeptText').textContent = t.svgDept;
    document.getElementById('menuText').innerText = t.menu;
    document.getElementById('drawerCloseText').innerText = t.menu;

    document.getElementById('navHomeText').innerText = t.home;
    document.getElementById('navApplyText').innerText = t.apply;
    document.getElementById('navFingerprintText').innerText = t.fingerprint;
    document.getElementById('navStatusText').innerText = t.status;
    document.getElementById('navChatText').innerText = t.chat;
    document.getElementById('navLawyersText').innerText = t.lawyers;
    document.getElementById('navReviewsText').innerText = t.reviews;
    document.getElementById('navFaqText').innerText = t.faq;

    document.getElementById('dashHomeLabel').innerText = t.home;
    document.getElementById('dashApplyLabel').innerText = t.apply;
    document.getElementById('dashFingerprintLabel').innerText = t.fingerprint;
    document.getElementById('dashStatusLabel').innerText = t.status;
    document.getElementById('dashChatLabel').innerText = t.chat;
    document.getElementById('dashLawyersLabel').innerText = t.lawyers;
    document.getElementById('dashReviewsLabel').innerText = t.reviews;
    document.getElementById('dashFaqLabel').innerText = t.faq;

    document.getElementById('lblNewsBadge').innerText = t.newsBadge;
    document.getElementById('topNewsMarquee').innerText = t.newsText;

    document.getElementById('homeTopNote').innerHTML = `<b>${t.homeTopNote}</b>`;
    document.getElementById('homeHead').innerText = t.homeHead;
    document.getElementById('homeDesc').innerText = t.homeDesc;
    document.getElementById('stat1Text').innerText = t.stat1;
    document.getElementById('stat2Text').innerText = t.stat2;
    document.getElementById('stat3Text').innerText = t.stat3;
    document.getElementById('lblPortfolioAnnounce').innerText = t.portfolioAnnounce;
    document.getElementById('lblPortfolioDesc').innerText = t.portfolioDesc;
    document.querySelector('#homeBottomDetails h4').innerText = t.homeBottomTitle;
    renderListItems(document.querySelector('#homeBottomDetails ul'), t.homeBottomList);

    document.getElementById('applyTopNote').innerHTML = `<b>${t.applyTopNote}</b>`;
    document.getElementById('applyHeadText').innerText = t.applyHead;
    document.getElementById('lblFullName').innerText = t.lblFullName;
    document.getElementById('lblDob').innerText = t.lblDob;
    document.getElementById('lblPhone').innerText = t.lblPhone;
    document.getElementById('lblEmail').innerText = t.lblEmail;
    document.getElementById('lblPassport').innerText = t.lblPassport;
    document.getElementById('lblPassportCountry').innerText = t.lblPassportCountry;
    document.getElementById('lblVisaType').innerText = t.lblVisaType;
    document.getElementById('docHeader').innerText = t.docHeader;
    document.getElementById('uploadTipBox').innerText = t.uploadTipBox;
    document.getElementById('lblPassPhoto').innerText = t.lblPassPhoto;
    document.getElementById('lblPassCopy').innerText = t.lblPassCopy;
    document.getElementById('lblNidFront').innerText = t.lblNidFront;
    document.getElementById('lblNidBack').innerText = t.lblNidBack;
    document.getElementById('payHeader').innerText = t.payHeader;
    document.getElementById('feeNote').innerText = t.feeNote;
    document.getElementById('lblPayMethod').innerText = t.lblPayMethod;
    document.getElementById('lblAccountTitle').innerText = t.lblAccountTitle;
    document.getElementById('copyBtnText').innerText = t.copyBtnText;
    document.getElementById('lblSender').innerText = t.lblSender;
    document.getElementById('lblPayReceipt').innerText = t.lblPayReceipt;
    document.getElementById('submitAppBtn').innerText = t.submitAppBtn;
    document.querySelector('#applyBottomDetails h4').innerText = t.applyBottomTitle;
    renderListItems(document.querySelector('#applyBottomDetails ul'), t.applyBottomList);

    document.getElementById('fpTopNote').innerHTML = `<b>${t.fpTopNote}</b>`;
    document.getElementById('fpMainHead').innerHTML = `<i class="fas fa-fingerprint" style="color:#002147;"></i> ${t.fpMainHead}`;
    document.getElementById('fpMainDesc').innerText = t.fpMainDesc;
    document.getElementById('lblFpInputId').innerText = t.lblFpInputId;
    document.getElementById('sensorStatusReady').innerText = t.sensorStatusReady;
    document.querySelector('#fpBottomDetails h4').innerText = t.fpBottomTitle;
    renderListItems(document.querySelector('#fpBottomDetails ul'), t.fpBottomList);

    document.getElementById('statusTopNote').innerHTML = `<b>${t.statusTopNote}</b>`;
    document.getElementById('statusHeadText').innerText = t.statusHeadText;
    document.getElementById('openPortalBtnText').innerHTML = `<i class="fas fa-external-link-alt"></i> ${t.openPortalBtnText}`;
    document.getElementById('statusDescText').innerText = t.statusDescText;
    document.getElementById('lblCheckPass').innerText = t.lblCheckPass;
    document.getElementById('lblCheckId').innerText = t.lblCheckId;
    document.getElementById('checkStatusBtn').innerText = t.checkStatusBtn;
    document.querySelector('#statusBottomDetails h4').innerText = t.statusBottomTitle;
    renderListItems(document.querySelector('#statusBottomDetails ul'), t.statusBottomList);

    document.getElementById('chatTopNote').innerHTML = `<b>${t.chatTopNote}</b>`;
    document.getElementById('chatMainTitle').innerHTML = `<i class="fas fa-comments" style="color:#28a745;"></i> ${t.chatMainTitle}`;
    document.getElementById('chatQ1').innerText = t.chatQ1;
    document.getElementById('chatQ2').innerText = t.chatQ2;
    document.getElementById('chatWelcome').innerText = t.chatWelcome;
    document.querySelector('#chatBottomDetails h4').innerText = t.chatBottomTitle;
    renderListItems(document.querySelector('#chatBottomDetails ul'), t.chatBottomList);

    document.getElementById('lawyersTopNote').innerHTML = `<b>${t.lawyersTopNote}</b>`;
    document.getElementById('lawyersHeadText').innerText = t.lawyersHeadText;
    document.getElementById('lawyerName').innerText = t.lawyerName;
    document.getElementById('lawyerDesc').innerText = t.lawyerDesc;
    document.getElementById('lawyerBio').innerText = t.lawyerBio;
    document.getElementById('lawyer2Name').innerText = t.lawyer2Name;
    document.getElementById('lawyer2Desc').innerText = t.lawyer2Desc;
    document.getElementById('lawyer2Bio').innerText = t.lawyer2Bio;
    document.querySelector('#lawyersBottomDetails h4').innerText = t.lawyersBottomTitle;
    renderListItems(document.querySelector('#lawyersBottomDetails ul'), t.lawyersBottomList);

    document.getElementById('reviewsTopNote').innerHTML = `<b>${t.reviewsTopNote}</b>`;
    document.getElementById('reviewsHeadText').innerText = t.reviewsHeadText;
    document.getElementById('reviewAuthor').innerText = t.reviewAuthor;
    document.getElementById('reviewText').innerText = t.reviewText;
    document.querySelector('#reviewsBottomDetails h4').innerText = t.reviewsBottomTitle;
    renderListItems(document.querySelector('#reviewsBottomDetails ul'), t.reviewsBottomList);

    document.getElementById('faqTopNote').innerHTML = `<b>${t.faqTopNote}</b>`;
    document.getElementById('faqHeadText').innerText = t.faqHeadText;
    document.getElementById('faqQ1').innerText = t.faqQ1;
    document.getElementById('faqA1').innerText = t.faqA1;
    document.querySelector('#faqBottomDetails h4').innerText = t.faqBottomTitle;
    renderListItems(document.querySelector('#faqBottomDetails ul'), t.faqBottomList);

    document.getElementById('modalLoadingText').innerText = t.modalLoadingText;
    document.getElementById('modalSuccessText').innerText = t.modalSuccessText;
    document.getElementById('modalCopyBtn').innerText = t.modalCopyBtn;
    document.getElementById('modalDoneBtn').innerText = t.modalDoneBtn;
    document.getElementById('alertNoticeTitle').innerText = t.alertNoticeTitle;

    document.getElementById('agenciesSectionTitle').innerText = t.agenciesSectionTitle;
    document.getElementById('agency1Name').innerText = t.agency1Name;
    document.getElementById('agency2Gov').innerText = t.agency2Gov;
    document.getElementById('agency2Sub').innerText = t.agency2Sub;
    document.getElementById('agency3Name').innerText = t.agency3Name;
    document.getElementById('agency4Gov').innerText = t.agency4Gov;
    document.getElementById('agency4Sub').innerText = t.agency4Sub;
    document.getElementById('agency5Gov').innerText = t.agency5Gov;
    document.getElementById('agency5Sub').innerText = t.agency5Sub;

    document.getElementById('footCol1').innerText = t.footCol1;
    document.getElementById('footCol2').innerText = t.footCol2;
    document.getElementById('footCol3').innerText = t.footCol3;
    document.getElementById('footCol4').innerText = t.footCol4;
    document.getElementById('footItem1').innerText = t.footItem1;
    document.getElementById('footItem2').innerText = t.footItem2;
    document.getElementById('footItem3').innerText = t.footItem3;
    document.getElementById('footItem4').innerText = t.footItem4;
    document.getElementById('footItem5').innerText = t.footItem5;
    document.getElementById('footItem6').innerText = t.footItem6;
    document.getElementById('footItem7').innerText = t.footItem7;
    document.getElementById('footItem8').innerText = t.footItem8;
    document.getElementById('footItem9').innerText = t.footItem9;
    document.getElementById('footPartnerText').innerText = t.footPartnerText;
    document.getElementById('footCopy').innerText = t.footCopy;
    document.getElementById('footLinksBottom').innerText = t.footLinksBottom;
}
