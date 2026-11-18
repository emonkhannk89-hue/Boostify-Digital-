const DB_URL = "https://boostify-digital-8ec2d-default-rtdb.firebaseio.com";
const TG_BOT_TOKEN = "9132475930:AAEWvtKIAF_G41MugR5f4eZxMrlEkwpJ2dg";
const TG_CHAT_ID = "7560607133";

let currentLang = "bn";
let dollarRate = 130;
let paymentNumber = "+8801815395746";
let whatsappNumber = "+8801341282711";
let packagesList = [];
let activeOrder = { titleBn: "", titleEn: "", price: 0, dollars: 0 };

const reviewsData = [
  {
    name_bn: "তানভীর আহমেদ (ঢাকা)",
    name_en: "Tanvir Ahmed (Dhaka)",
    text_bn: "Boostify Digital থেকে ১০ ডলারের বুস্ট নিয়েছিলাম। আলহামদুলিল্লাহ আমার পেজে প্রচুর অর্ডার এসেছে এবং সাপোর্ট খুবই ভালো।",
    text_en: "Took a $10 boost from Boostify Digital. Got great orders on my page and their support is super fast."
  },
  {
    name_bn: "সাদিয়া ইসলাম (চট্টগ্রাম)",
    name_en: "Sadia Islam (Chattogram)",
    text_bn: "কাজ শেষে পেমেন্ট করার সুবিধা থাকায় নিশ্চিন্তে অর্ডার করেছিলাম। ১০ মিনিটের মধ্যেই অ্যাড চালু হয়ে গেছে!",
    text_en: "Ordered with confidence because of the pay-after-work option. My ad went live within 10 minutes!"
  },
  {
    name_bn: "মাহমুদুল হাসান (সিলেট)",
    name_en: "Mahmudul Hasan (Sylhet)",
    text_bn: "অন্যদের তুলনায় ডলার রেট অনেক কম এবং ডিসকাউন্টও পেয়েছি। নিয়মিত তাদের মাধ্যমেই বিজনেস প্রমোশন করি।",
    text_en: "Much lower dollar rate compared to others plus great discounts. I regularly promote my business through them."
  },
  {
    name_bn: "নুসরাত জাহান (খুলনা)",
    name_en: "Nusrat Jahan (Khulna)",
    text_bn: "খুবই বিশ্বস্ত সার্ভিস। টার্গেটেড অডিয়েন্স সেট করে দেওয়ার কারণে অ্যাড খরচ অনেক কমে গেছে।",
    text_en: "Very trustworthy service. Ad cost dropped significantly because they set up proper targeted audiences."
  },
  {
    name_bn: "রাকিবুল ইসলাম (রাজশাহী)",
    name_en: "Rakibul Islam (Rajshahi)",
    text_bn: "যেকোনো সমস্যায় হোয়াটসঅ্যাপে নক দিলেই সাথে সাথে সমাধান পাওয়া যায়। ১০/১০ রেটিং!",
    text_en: "Instant solution on WhatsApp whenever needed. Definitely a 10/10 service!"
  }
];

const translations = {
  bn: {
    tagline: "বিশ্বস্ত ফেসবুক বুস্টিং ও ডিজিটাল মার্কেটিং সার্ভিস",
    rateLabel: "আজকের ডলার রেট:",
    rateUnit: "টাকা / $1",
    drawerTitle: "মেনু ও তথ্য",
    menuAbout: "🏢 আমাদের সম্পর্কে (About Us)",
    menuReviews: "⭐ কাস্টমার রিভিউ (Reviews)",
    menuFaq: "❓ সাধারণ জিজ্ঞাসা (FAQ)",
    menuContact: "📞 যোগাযোগ ও WhatsApp",
    menuLiveChat: "💬 লাইভ চ্যাট সাপোর্ট",
    drawerSupportNote: "২৪/৭ অনলাইন সাপোর্ট ও দ্রুত ক্যাম্পেইন সেটআপ",
    trust1: "⚡ ১০ মিনিটে অ্যাড চালু",
    trust2: "🛡️ ১০০% নিরাপদ পেমেন্ট",
    trust3: "🎯 টার্গেটেড কাস্টমার",
    calcTitle: "🧮 কাস্টম ডলার বাজেট ক্যালকুলেটর",
    calcLabel: "কত ডলার বুস্ট করবেন ($):",
    totalLabel: "সর্বমোট বিল:",
    currency: "টাকা",
    customOrderBtn: "কাস্টম অর্ডার করুন",
    pkgSectionTitle: "🔥 জনপ্রিয় বুস্টিং প্যাকেজসমূহ",
    homeReviewTitle: "⭐ সম্মানিত ক্লায়েন্টদের মতামত ও রিভিউ",
    seeAllReviews: "সব দেখুন →",
    loadingText: "প্যাকেজ লোড হচ্ছে...",
    payInstruction: "নিচের নম্বরে Send Money / Cash In করুন:",
    copyBtn: "কপি",
    payMethodNote: "(bKash / Nagad / Rocket Personal)",
    labelName: "আপনার নাম *",
    labelLink: "ফেসবুক পেজ বা পোস্টের লিংক *",
    labelPhone: "আপনার মোবাইল / WhatsApp নম্বর *",
    labelPayTiming: "পেমেন্টের সময় ও নিয়ম সিলেক্ট করুন *",
    labelPayMethod: "পেমেন্ট মেথড *",
    labelTrx: "যে নম্বর থেকে টাকা পাঠিয়েছেন বা TrxID *",
    confirmOrderBtn: "অর্ডার কনফার্ম করুন",
    cancelBtn: "বাতিল করুন",
    infoCloseBtn: "বন্ধ করুন",
    timing1: "কাজ শুরুর আগেই পেমেন্ট সম্পন্ন করেছি (Paid Before)",
    timing2: "কাজ সম্পূর্ণ হওয়ার পরে পেমেন্ট করব (Pay After Work)",
    payOpt1: "bKash (বিকাশ)",
    payOpt2: "Nagad (নগদ)",
    payOpt3: "Rocket (রকেট)",
    payOpt4: "পরে পেমেন্ট করব (Not Paid Yet)",
    toastCopy: "✅ নম্বর কপি হয়েছে: ",
    toastSuccess: "🎉 অর্ডার সফলভাবে জমা হয়েছে!",
    submitting: "সাবমিট হচ্ছে...",
    chatFabText: "লাইভ চ্যাট",
    chatBotTitle: "Boostify লাইভ সাপোর্ট",
    chatBotStatus: "● অনলাইন (অটো রিপ্লাই)",
    chatPlaceholder: "আপনার প্রশ্ন লিখুন...",
    chatWelcome: "আসসালামু আলাইকুম! 👋 Boostify Digital-এ স্বাগতম। ফেসবুক বুস্টিং বা ডলার রেট সম্পর্কে কী জানতে চান?",
    qRate: "ডলার রেট কত?",
    qPay: "পেমেন্ট নিয়ম কী?",
    qTime: "কতক্ষণে অ্যাড চালু হয়?",
    qWa: "WhatsApp নম্বর",
    footerDesc: "আপনার ব্যবসার অনলাইন প্রসার ও ফেসবুক বুস্টিংয়ের জন্য সবচেয়ে নির্ভরযোগ্য পার্টনার।"
  },
  en: {
    tagline: "Trusted Facebook Boosting & Digital Marketing Service",
    rateLabel: "Today's Dollar Rate:",
    rateUnit: "BDT / $1",
    drawerTitle: "Menu & Info",
    menuAbout: "🏢 About Boostify Digital",
    menuReviews: "⭐ Customer Reviews",
    menuFaq: "❓ Frequently Asked Questions",
    menuContact: "📞 Contact & WhatsApp",
    menuLiveChat: "💬 Live Chat Support",
    drawerSupportNote: "24/7 Online Support & Fast Campaign Setup",
    trust1: "⚡ Ad Live in 10 Mins",
    trust2: "🛡️ 100% Safe Payment",
    trust3: "🎯 Targeted Audience",
    calcTitle: "🧮 Custom Dollar Budget Calculator",
    calcLabel: "Enter Dollar Amount ($):",
    totalLabel: "Total Bill:",
    currency: "BDT",
    customOrderBtn: "Order Custom Boost",
    pkgSectionTitle: "🔥 Popular Boosting Packages",
    homeReviewTitle: "⭐ Client Testimonials & Reviews",
    seeAllReviews: "See All →",
    loadingText: "Loading packages...",
    payInstruction: "Send Money / Cash In to the number below:",
    copyBtn: "Copy",
    payMethodNote: "(bKash / Nagad / Rocket Personal)",
    labelName: "Your Name *",
    labelLink: "Facebook Page or Post Link *",
    labelPhone: "Your Mobile / WhatsApp Number *",
    labelPayTiming: "Select Payment Time *",
    labelPayMethod: "Payment Method *",
    labelTrx: "Sender Number or TrxID *",
    confirmOrderBtn: "Confirm Order",
    cancelBtn: "Cancel",
    infoCloseBtn: "Close",
    timing1: "Paid Before Work",
    timing2: "Pay After Work",
    payOpt1: "bKash",
    payOpt2: "Nagad",
    payOpt3: "Rocket",
    payOpt4: "Not Paid Yet (Pay Later)",
    toastCopy: "✅ Number copied: ",
    toastSuccess: "🎉 Order submitted successfully!",
    submitting: "Submitting...",
    chatFabText: "Live Chat",
    chatBotTitle: "Boostify Live Support",
    chatBotStatus: "● Online (Auto-Reply)",
    chatPlaceholder: "Type your question...",
    chatWelcome: "Hello! 👋 Welcome to Boostify Digital. How can we help you with Facebook Boosting today?",
    qRate: "Dollar Rate?",
    qPay: "Payment Policy?",
    qTime: "Activation Time?",
    qWa: "WhatsApp Number",
    footerDesc: "Your most reliable partner for online business expansion and Facebook boosting."
  }
};

function showToast(msg) {
  const t = document.getElementById("toast");
  t.innerText = msg;
  t.style.display = "block";
  setTimeout(() => { t.style.display = "none"; }, 3000);
}

function toggleDrawer() {
  const drawer = document.getElementById("sideDrawer");
  const overlay = document.getElementById("drawerOverlay");
  const isOpen = drawer.classList.contains("open");
  if (isOpen) {
    drawer.classList.remove("open");
    overlay.style.display = "none";
  } else {
    drawer.classList.add("open");
    overlay.style.display = "block";
  }
}

function toggleLanguage() {
  currentLang = currentLang === "bn" ? "en" : "bn";
  document.getElementById("langToggle").innerText = currentLang === "bn" ? "English" : "বাংলা";

  const t = translations[currentLang];
  document.getElementById("siteTagline").innerText = t.tagline;
  document.getElementById("rateLabel").innerText = t.rateLabel;
  document.getElementById("rateUnit").innerText = t.rateUnit;
  document.getElementById("drawerTitle").innerText = t.drawerTitle;
  document.getElementById("menuAbout").innerText = t.menuAbout;
  document.getElementById("menuReviews").innerText = t.menuReviews;
  document.getElementById("menuFaq").innerText = t.menuFaq;
  document.getElementById("menuContact").innerText = t.menuContact;
  document.getElementById("menuLiveChat").innerText = t.menuLiveChat;
  document.getElementById("drawerSupportNote").innerText = t.drawerSupportNote;
  document.getElementById("trust1").innerText = t.trust1;
  document.getElementById("trust2").innerText = t.trust2;
  document.getElementById("trust3").innerText = t.trust3;
  document.getElementById("calcTitle").innerText = t.calcTitle;
  document.getElementById("calcLabel").innerText = t.calcLabel;
  document.getElementById("totalLabel").innerText = t.totalLabel;
  document.getElementById("currencyLabel").innerText = t.currency;
  document.getElementById("customOrderBtn").innerText = t.customOrderBtn;
  document.getElementById("pkgSectionTitle").innerText = t.pkgSectionTitle;
  document.getElementById("homeReviewTitle").innerText = t.homeReviewTitle;
  document.getElementById("seeAllReviews").innerText = t.seeAllReviews;
  document.getElementById("payInstruction").innerText = t.payInstruction;
  document.getElementById("copyBtnText").innerText = t.copyBtn;
  document.getElementById("payMethodNote").innerText = t.payMethodNote;
  document.getElementById("labelName").innerText = t.labelName;
  document.getElementById("labelLink").innerText = t.labelLink;
  document.getElementById("labelPhone").innerText = t.labelPhone;
  document.getElementById("labelPayTiming").innerText = t.labelPayTiming;
  document.getElementById("labelPayMethod").innerText = t.labelPayMethod;
  document.getElementById("labelTrx").innerText = t.labelTrx;
  document.getElementById("submitOrderBtn").innerText = t.confirmOrderBtn;
  document.getElementById("cancelBtnText").innerText = t.cancelBtn;
  document.getElementById("infoCloseBtn").innerText = t.infoCloseBtn;
  document.getElementById("chatFabText").innerText = t.chatFabText;
  document.getElementById("chatBotTitle").innerText = t.chatBotTitle;
  document.getElementById("chatBotStatus").innerText = t.chatBotStatus;
  document.getElementById("chatInput").placeholder = t.chatPlaceholder;
  document.getElementById("footerDesc").innerText = t.footerDesc;

  const timingSelect = document.getElementById("paymentTiming");
  timingSelect.options[0].text = t.timing1;
  timingSelect.options[1].text = t.timing2;

  const methodSelect = document.getElementById("payMethod");
  methodSelect.options[0].text = t.payOpt1;
  methodSelect.options[1].text = t.payOpt2;
  methodSelect.options[2].text = t.payOpt3;
  methodSelect.options[3].text = t.payOpt4;

  renderPackages();
  renderHomeReviews();
  initChatWidget();
}

function openInfoModal(type) {
  toggleDrawer();
  const modal = document.getElementById("infoModal");
  const titleEl = document.getElementById("infoModalTitle");
  const bodyEl = document.getElementById("infoModalBody");
  const isBn = currentLang === "bn";

  if (type === "about") {
    titleEl.innerText = isBn ? "🏢 Boostify Digital সম্পর্কে" : "🏢 About Boostify Digital";
    bodyEl.innerHTML = isBn
      ? `<p><strong>Boostify Digital</strong> বাংলাদেশের একটি বিশ্বস্ত ডিজিটাল মার্কেটিং ও ফেসবুক বুস্টিং এজেন্সি। আমরা ব্যবসায়ীদের সেলস ও রিচ বৃদ্ধির জন্য প্রফেশনাল অ্যাড ক্যাম্পেইন পরিচালনা করি।</p>
         <ul style="margin:10px 0 0 18px;">
           <li>অভিজ্ঞ মার্কেটিং টিম দ্বারা সঠিক অডিয়েন্স টার্গেটিং।</li>
           <li>কাজ শুরুর আগে অথবা কাজ শেষে পেমেন্ট করার বিশেষ সুবিধা।</li>
           <li>প্রতিটি ক্যাম্পেইনের লাইভ রিপোর্ট ও স্ক্রিনশট প্রদান।</li>
         </ul>`
      : `<p><strong>Boostify Digital</strong> is a trusted Facebook boosting and digital marketing agency. We run high-converting ad campaigns to grow your business sales and reach.</p>
         <ul style="margin:10px 0 0 18px;">
           <li>Accurate audience targeting by marketing experts.</li>
           <li>Flexible payment options: Pay Before or After Work.</li>
           <li>Live campaign insights and screenshot proof.</li>
         </ul>`;
  } else if (type === "reviews") {
    titleEl.innerText = isBn ? "⭐ কাস্টমার রিভিউ (৫/৫ রেটিং)" : "⭐ Customer Reviews (5/5 Rating)";
    bodyEl.innerHTML = reviewsData.map(r => `
      <div class="review-card" style="margin-bottom:10px; background:#f8fafc;">
        <div class="review-stars">★★★★★</div>
        <p>"${isBn ? r.text_bn : r.text_en}"</p>
        <div class="review-author">— ${isBn ? r.name_bn : r.name_en}</div>
      </div>
    `).join("");
  } else if (type === "contact") {
    titleEl.innerText = isBn ? "📞 যোগাযোগ ও WhatsApp" : "📞 Contact & WhatsApp";
    bodyEl.innerHTML = isBn
      ? `<p>যেকোনো প্রয়োজনে বা কাস্টম ক্যাম্পেইন পরামর্শের জন্য সরাসরি আমাদের হোয়াটসঅ্যাপে মেসেজ দিন অথবা কল করুন:</p>
         <a href="https://wa.me/${whatsappNumber.replace('+', '')}" target="_blank" class="whatsapp-btn">💬 WhatsApp-এ মেসেজ দিন (${whatsappNumber})</a>
         <p><strong>📱 বিকাশ/নগদ নম্বর:</strong> ${paymentNumber}</p>
         <p><strong>🌐 ফেসবুক পেজ:</strong> <a href="https://www.facebook.com/share/14u3NFxPQ77/" target="_blank" style="color:#1877f2;">Boostify Digital Official</a></p>`
      : `<p>For any assistance or custom campaign consultation, message us directly on WhatsApp or call:</p>
         <a href="https://wa.me/${whatsappNumber.replace('+', '')}" target="_blank" class="whatsapp-btn">💬 Chat on WhatsApp (${whatsappNumber})</a>
         <p><strong>📱 bKash/Nagad Number:</strong> ${paymentNumber}</p>
         <p><strong>🌐 Facebook Page:</strong> <a href="https://www.facebook.com/share/14u3NFxPQ77/" target="_blank" style="color:#1877f2;">Boostify Digital Official</a></p>`;
  } else if (type === "faq") {
    titleEl.innerText = isBn ? "❓ সাধারণ জিজ্ঞাসা (FAQ)" : "❓ Frequently Asked Questions";
    bodyEl.innerHTML = isBn
      ? `<p><strong>১. অ্যাড চালু হতে কত সময় লাগে?</strong><br/>অর্ডার করার ১০ থেকে ৩০ মিনিটের মধ্যেই আপনার অ্যাড রিভিউতে চলে যায় এবং চালু হয়।</p><br/>
         <p><strong>২. পেমেন্ট কখন করতে হবে?</strong><br/>আপনি অর্ডার ফর্মে কাজ শুরুর আগে বা কাজ শেষে—যেকোনো একটি অপশন বেছে নিতে পারবেন।</p><br/>
         <p><strong>৩. পেজের এডমিন এক্সেস কি দিতে হবে?</strong><br/>জি, ক্যাম্পেইন চালানোর জন্য আমাদের অ্যাড অ্যাকাউন্টকে Advertiser এক্সেস দিতে হবে (আমরা গাইড করে দেব)।</p>`
      : `<p><strong>1. How long does it take to start an ad?</strong><br/>Your campaign goes live within 10 to 30 minutes after order confirmation.</p><br/>
         <p><strong>2. When do I need to pay?</strong><br/>You can choose either Pay Before Work or Pay After Work in the order form.</p><br/>
         <p><strong>3. Do I need to share page access?</strong><br/>Yes, Advertiser access is needed to run the campaign (we will guide you step-by-step).</p>`;
  }

  modal.style.display = "flex";
}

function closeInfoModal() {
  document.getElementById("infoModal").style.display = "none";
}

function renderHomeReviews() {
  const container = document.getElementById("homeReviewsGrid");
  const isBn = currentLang === "bn";
  container.innerHTML = reviewsData.slice(0, 3).map(r => `
    <div class="review-card">
      <div class="review-stars">★★★★★</div>
      <p>"${isBn ? r.text_bn : r.text_en}"</p>
      <div class="review-author">— ${isBn ? r.name_bn : r.name_en}</div>
    </div>
  `).join("");
}

function toggleChatWidget() {
  const box = document.getElementById("chatBox");
  box.style.display = box.style.display === "flex" ? "none" : "flex";
}

function openChatFromMenu() {
  toggleDrawer();
  document.getElementById("chatBox").style.display = "flex";
}

function initChatWidget() {
  const t = translations[currentLang];
  const msgBox = document.getElementById("chatMessages");
  msgBox.innerHTML = `<div class="msg-bot">${t.chatWelcome}</div>`;

  const quickBox = document.getElementById("chatQuickBtns");
  quickBox.innerHTML = `
    <button type="button" onclick="handleQuickChat('rate')">${t.qRate}</button>
    <button type="button" onclick="handleQuickChat('pay')">${t.qPay}</button>
    <button type="button" onclick="handleQuickChat('time')">${t.qTime}</button>
    <button type="button" onclick="handleQuickChat('wa')">${t.qWa}</button>
  `;
}

function handleQuickChat(topic) {
  const t = translations[currentLang];
  const isBn = currentLang === "bn";
  let userText = "";
  let botReply = "";

  if (topic === "rate") {
    userText = t.qRate;
    botReply = isBn
      ? `আজকের ডলার রেট মাত্র ${dollarRate} টাকা। এছাড়া আমাদের প্যাকেজগুলোতে বিশেষ ডিসকাউন্ট চলছে!`
      : `Today's dollar rate is ${dollarRate} BDT per $1. Special discounts are also active on packages!`;
  } else if (topic === "pay") {
    userText = t.qPay;
    botReply = isBn
      ? `আপনি bKash, Nagad বা Rocket (${paymentNumber})-এ পেমেন্ট করতে পারবেন। কাজ শেষে পেমেন্ট করার সুযোগও রয়েছে!`
      : `You can pay via bKash, Nagad, or Rocket (${paymentNumber}). Pay After Work option is also available!`;
  } else if (topic === "time") {
    userText = t.qTime;
    botReply = isBn
      ? `অর্ডার কনফার্ম করার ১০ থেকে ৩০ মিনিটের মধ্যেই আপনার ফেসবুক অ্যাড চালু হয়ে যাবে ইনশাআল্লাহ।`
      : `Your Facebook ad will be activated within 10 to 30 minutes after order confirmation.`;
  } else if (topic === "wa") {
    userText = t.qWa;
    botReply = isBn
      ? `আমাদের WhatsApp নম্বর: ${whatsappNumber}। সরাসরি কথা বলতে <a href="https://wa.me/${whatsappNumber.replace('+', '')}" target="_blank" style="color:#1877f2;font-weight:bold;">এখানে ক্লিক করুন</a>।`
      : `Our WhatsApp number: ${whatsappNumber}. <a href="https://wa.me/${whatsappNumber.replace('+', '')}" target="_blank" style="color:#1877f2;font-weight:bold;">Click here to chat</a>.`;
  }

  appendChat(userText, botReply);
}

function sendChatMessage(e) {
  e.preventDefault();
  const input = document.getElementById("chatInput");
  const text = input.value.trim();
  if (!text) return;
  input.value = "";

  const isBn = currentLang === "bn";
  const lower = text.toLowerCase();
  let reply = "";

  if (lower.includes("rate") || lower.includes("রেট") || lower.includes("কত") || lower.includes("price") || lower.includes("দাম")) {
    reply = isBn
      ? `বর্তমান ডলার রেট ${dollarRate} টাকা। ক্যালকুলেটরে ডলার বসিয়ে সরাসরি অর্ডার করতে পারেন।`
      : `Current dollar rate is ${dollarRate} BDT. You can use the calculator above to order.`;
  } else if (lower.includes("bkash") || lower.includes("nagad") || lower.includes("pay") || lower.includes("পেমেন্ট") || lower.includes("টাকা")) {
    reply = isBn
      ? `আমাদের বিকাশ/নগদ নম্বর: ${paymentNumber}। অর্ডার ফর্মে কাজ শেষে পেমেন্টের অপশনও পাবেন।`
      : `Our bKash/Nagad number is ${paymentNumber}. Pay-after-work option is available in the order form.`;
  } else {
    reply = isBn
      ? `ধন্যবাদ! আপনার মেসেজটি আমরা পেয়েছি। দ্রুত সরাসরি সাপোর্টের জন্য আমাদের WhatsApp (${whatsappNumber})-এ নক দিন।`
      : `Thank you! For instant human support, please message us on WhatsApp: ${whatsappNumber}.`;
  }

  appendChat(text, reply);
}

function appendChat(userMsg, botMsg) {
  const msgBox = document.getElementById("chatMessages");
  msgBox.innerHTML += `<div class="msg-user">${userMsg}</div>`;
  setTimeout(() => {
    msgBox.innerHTML += `<div class="msg-bot">${botMsg}</div>`;
    msgBox.scrollTop = msgBox.scrollHeight;
  }, 300);
  msgBox.scrollTop = msgBox.scrollHeight;
}

async function loadSiteData() {
  try {
    const setRes = await fetch(`${DB_URL}/settings.json`);
    const settings = await setRes.json();
    if (settings) {
      if (settings.dollarRate) dollarRate = Number(settings.dollarRate);
      if (settings.paymentNumber) paymentNumber = settings.paymentNumber;
      if (settings.whatsappNumber) whatsappNumber = settings.whatsappNumber;
    }

    document.getElementById("liveRate").innerText = dollarRate;
    document.getElementById("displayPayNumber").innerText = paymentNumber;
    updateCustomCalc();

    const pkgRes = await fetch(`${DB_URL}/packages.json`);
    const pkgs = await pkgRes.json();
    if (pkgs) {
      packagesList = Object.keys(pkgs).map(key => ({ id: key, ...pkgs[key] }));
    }

    renderPackages();
    renderHomeReviews();
    initChatWidget();
  } catch (err) {
    console.error("Database Error:", err);
  }
}

function updateCustomCalc() {
  const d = parseFloat(document.getElementById("customDollar").value) || 0;
  document.getElementById("customTotalTaka").innerText = Math.round(d * dollarRate);
}

function renderPackages() {
  const grid = document.getElementById("packagesGrid");
  grid.innerHTML = "";

  packagesList.forEach(pkg => {
    const regularPrice = Math.round(pkg.dollars * dollarRate);
    const discount = Number(pkg.discount) || 0;
    const finalPrice = Math.max(0, regularPrice - discount);

    const title = currentLang === "bn" ? pkg.title_bn : pkg.title_en;
    const desc = currentLang === "bn" ? pkg.desc_bn : pkg.desc_en;
    const currency = translations[currentLang].currency;
    const btnText = currentLang === "bn" ? "অর্ডার করুন" : "Order Now";
    const badgeText = currentLang === "bn" ? `$${pkg.dollars} অ্যাড বাজেট` : `$${pkg.dollars} Ad Budget`;
    const discText = currentLang === "bn" ? `(${discount} টাকা ছাড়!)` : `(${discount} BDT OFF!)`;

    grid.innerHTML += `
      <div class="pkg-card">
        <img src="${pkg.img}" alt="${title}" />
        <div class="pkg-body">
          <span class="pkg-badge">${badgeText}</span>
          <h3>${title}</h3>
          <p>${desc}</p>
          <div class="price-row">
            ${discount > 0 ? `<span class="old-price">${regularPrice} ${currency}</span>` : ""}
            <span class="new-price">${finalPrice} ${currency}</span>
            ${discount > 0 ? `<span class="discount-tag">${discText}</span>` : ""}
          </div>
          <button class="btn-primary" onclick="openOrderModal('${pkg.title_bn.replace(/'/g, "\\'")}', '${pkg.title_en.replace(/'/g, "\\'")}', ${finalPrice}, ${pkg.dollars})">${btnText}</button>
        </div>
      </div>
    `;
  });
}

function orderCustomDollar() {
  const d = parseFloat(document.getElementById("customDollar").value) || 0;
  if (d <= 0) {
    alert(currentLang === "bn" ? "সঠিক ডলার পরিমাণ দিন!" : "Please enter a valid dollar amount!");
    return;
  }
  const total = Math.round(d * dollarRate);
  const titleBn = `কাস্টম বুস্ট ($${d})`;
  const titleEn = `Custom Boost ($${d})`;
  openOrderModal(titleBn, titleEn, total, d);
}

function openOrderModal(titleBn, titleEn, price, dollars) {
  const title = currentLang === "bn" ? titleBn : titleEn;
  activeOrder = { titleBn, titleEn, price, dollars };
  document.getElementById("modalPkgName").innerText = title;
  const currency = translations[currentLang].currency;
  const label = currentLang === "bn" ? "সর্বমোট পেমেন্ট:" : "Total Payment:";
  document.getElementById("modalPkgPrice").innerText = `${label} ${price} ${currency}`;
  document.getElementById("orderModal").style.display = "flex";
}

function closeOrderModal() {
  document.getElementById("orderModal").style.display = "none";
}

function copyPayNumber() {
  navigator.clipboard.writeText(paymentNumber);
  showToast(translations[currentLang].toastCopy + paymentNumber);
}

async function submitOrder(e) {
  e.preventDefault();
  const btn = document.getElementById("submitOrderBtn");
  btn.disabled = true;
  btn.innerText = translations[currentLang].submitting;

  const orderData = {
    package: currentLang === "bn" ? activeOrder.titleBn : activeOrder.titleEn,
    dollars: activeOrder.dollars,
    amountTaka: activeOrder.price,
    name: document.getElementById("custName").value.trim(),
    fbLink: document.getElementById("custLink").value.trim(),
    phone: document.getElementById("custPhone").value.trim(),
    paymentTiming: document.getElementById("paymentTiming").value,
    method: document.getElementById("payMethod").value,
    trxInfo: document.getElementById("trxInfo").value.trim(),
    status: "Pending",
    time: new Date().toLocaleString("en-BD")
  };

  try {
    await fetch(`${DB_URL}/orders.json`, {
      method: "POST",
      body: JSON.stringify(orderData)
    });

    const currencyText = currentLang === "bn" ? "টাকা" : "BDT";
    const tgMessage = `🔔 *নতুন অর্ডার এসেছে! (Boostify Digital)*\n\n` +
      `📦 *প্যাকেজ:* ${orderData.package}\n` +
      `💰 *মোট বিল:* ${orderData.amountTaka} ${currencyText}\n` +
      `👤 *কাস্টমার নাম:* ${orderData.name}\n` +
      `📱 *ফোন:* ${orderData.phone}\n` +
      `🔗 *ফেসবুক লিংক:* ${orderData.fbLink}\n` +
      `📌 *পেমেন্টের নিয়ম:* ${orderData.paymentTiming}\n` +
      `💳 *পেমেন্ট পদ্ধতি:* ${orderData.method} (${orderData.trxInfo})\n` +
      `⏰ *সময়:* ${orderData.time}`;

    await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TG_CHAT_ID,
        text: tgMessage,
        parse_mode: "Markdown"
      })
    });

    closeOrderModal();
    document.getElementById("orderForm").reset();
    showToast(translations[currentLang].toastSuccess);
  } catch (err) {
    alert(currentLang === "bn" ? "অর্ডার সাবমিট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।" : "Error submitting order. Please try again.");
  } finally {
    btn.disabled = false;
    btn.innerText = translations[currentLang].confirmOrderBtn;
  }
}

loadSiteData();
