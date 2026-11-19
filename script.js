const DB_URL = "https://boostify-digital-8ec2d-default-rtdb.firebaseio.com";
const TG_BOT_TOKEN = "9132475930:AAEWvtKIAF_G41MugR5f4eZxMrlEkwpJ2dg";
const TG_CHAT_ID = "7560607133";

let currentLang = "bn";
let dollarRate = 130;
let paymentNumber = "+8801815395746";
let whatsappNumber = "+8801341282711";
let packagesList = [];
let reviewsList = [];
let activeOrder = { titleBn: "", titleEn: "", price: 0, dollars: 0 };

const translations = {
  bn: {
    tagline: "বিশ্বস্ত ফেসবুক বুস্টিং ও ডিজিটাল মার্কেটিং সার্ভিস",
    rateLabel: "আজকের ডলার রেট:",
    rateUnit: "টাকা / $1",
    drawerTitle: "মেনু ও তথ্য",
    menuAbout: "🏢 আমাদের সম্পর্কে (About Us)",
    menuReviews: "⭐ কাস্টমার রিভিউ ও মতামত",
    menuAddReview: "✍️ আপনার রিভিউ যোগ করুন",
    menuFaq: "❓ সাধারণ জিজ্ঞাসা (FAQ)",
    menuContact: "📞 যোগাযোগ ও সোশ্যাল লিংক",
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
    toastReviewSuccess: "⭐ আপনার রিভিউ সফলভাবে যোগ হয়েছে!",
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
    footerDesc: "আপনার ব্যবসার অনলাইন প্রসার ও ফেসবুক বুস্টিংয়ের জন্য সবচেয়ে নির্ভরযোগ্য পার্টনার।",
    footAbout: "আমাদের সম্পর্কে",
    footReview: "রিভিউ দিন",
    footFaq: "সাধারণ জিজ্ঞাসা",
    footChat: "লাইভ চ্যাট"
  },
  en: {
    tagline: "Trusted Facebook Boosting & Digital Marketing Service",
    rateLabel: "Today's Dollar Rate:",
    rateUnit: "BDT / $1",
    drawerTitle: "Menu & Info",
    menuAbout: "🏢 About Boostify Digital",
    menuReviews: "⭐ Customer Reviews",
    menuAddReview: "✍️ Add Your Review",
    menuFaq: "❓ Frequently Asked Questions",
    menuContact: "📞 Contact & Social Links",
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
    toastReviewSuccess: "⭐ Your review has been added successfully!",
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
    footerDesc: "Your most reliable partner for online business expansion and Facebook boosting.",
    footAbout: "About Us",
    footReview: "Add Review",
    footFaq: "FAQ",
    footChat: "Live Chat"
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
  document.getElementById("menuAddReview").innerText = t.menuAddReview;
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
  document.getElementById("footAbout").innerText = t.footAbout;
  document.getElementById("footReview").innerText = t.footReview;
  document.getElementById("footFaq").innerText = t.footFaq;
  document.getElementById("footChat").innerText = t.footChat;

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
  const drawer = document.getElementById("sideDrawer");
  if (drawer.classList.contains("open")) {
    toggleDrawer();
  }

  const modal = document.getElementById("infoModal");
  const titleEl = document.getElementById("infoModalTitle");
  const bodyEl = document.getElementById("infoModalBody");
  const isBn = currentLang === "bn";

  if (type === "about") {
    titleEl.innerText = isBn ? "🏢 Boostify Digital সম্পর্কে" : "🏢 About Boostify Digital";
    bodyEl.innerHTML = isBn
      ? `<p><strong>Boostify Digital</strong> বাংলাদেশের একটি বিশ্বস্ত ডিজিটাল মার্কেটিং ও ফেসবুক বুস্টিং এজেন্সি। আমরা ব্যবসায়ীদের সেলস ও রিচ বৃদ্ধির জন্য প্রফেশনাল অ্যাড ক্যাম্পেইন পরিচালনা করি।</p>`
      : `<p><strong>Boostify Digital</strong> is a trusted Facebook boosting and digital marketing agency. We run high-converting ad campaigns to grow your business.</p>`;
  } else if (type === "reviews") {
    titleEl.innerText = isBn ? "⭐ কাস্টমারদের লাইভ রিভিউ" : "⭐ Live Customer Reviews";
    bodyEl.innerHTML = reviewsList.length === 0 
      ? `<p>${isBn ? "এখনো কোনো রিভিউ নেই।" : "No reviews yet."}</p>`
      : reviewsList.map(r => `
        <div class="review-card" style="margin-bottom:10px; background:#f8fafc;">
          <div class="review-stars">★★★★★</div>
          <p>"${r.comment}"</p>
          <div class="review-author">— ${r.name}</div>
        </div>
      `).join("");
  } else if (type === "addReview") {
    titleEl.innerText = isBn ? "✍️ আপনার রিভিউ জমা দিন" : "✍️ Submit Your Review";
    bodyEl.innerHTML = `
      <form onsubmit="submitUserReview(event)">
        <div class="form-group">
          <label>${isBn ? "আপনার নাম ও ঠিকানা *" : "Your Name & Location *"}</label>
          <input type="text" id="userRevName" required placeholder="${isBn ? 'যেমন: Rahim (Dhaka)' : 'e.g., Rahim (Dhaka)'}" />
        </div>
        <div class="form-group">
          <label>${isBn ? "আপনার মূল্যবান মতামত *" : "Your Feedback *"}</label>
          <textarea id="userRevText" rows="4" required placeholder="${isBn ? 'অভিজ্ঞতা লিখুন...' : 'Write your experience...'}" style="width:100%; padding:9px; border:1px solid #dce1e7; border-radius:7px;"></textarea>
        </div>
        <button type="submit" class="btn-primary" style="margin-top:8px;">${isBn ? "রিভিউ সাবমিট করুন" : "Submit Review"}</button>
      </form>
    `;
  } else if (type === "contact") {
    titleEl.innerText = isBn ? "📞 যোগাযোগ ও সোশ্যাল লিংক" : "📞 Contact & Social Links";
    bodyEl.innerHTML = isBn
      ? `<p>আমাদের অফিসিয়াল প্ল্যাটফর্মগুলোতে যুক্ত হন:</p>
         <a href="https://wa.me/${whatsappNumber.replace('+', '')}" target="_blank" class="whatsapp-btn">💬 WhatsApp (${whatsappNumber})</a>
         <p style="margin-top:8px;"><strong>🌐 Facebook:</strong> <a href="https://www.facebook.com/share/1Qq7NFj1WK/" target="_blank" style="color:#1877f2;">Facebook Page</a></p>
         <p style="margin-top:6px;"><strong>📸 Instagram:</strong> <a href="https://www.instagram.com/azminislamimon?evlk=cXdva2lka3FiNDk4" target="_blank" style="color:#e1306c;">Instagram Profile</a></p>
         <p style="margin-top:6px;"><strong>✈️ Telegram:</strong> <a href="https://t.me/azmincru" target="_blank" style="color:#0088cc;">Telegram Channel/Chat</a></p>`
      : `<p>Connect with us on our official platforms:</p>
         <a href="https://wa.me/${whatsappNumber.replace('+', '')}" target="_blank" class="whatsapp-btn">💬 WhatsApp (${whatsappNumber})</a>
         <p style="margin-top:8px;"><strong>🌐 Facebook:</strong> <a href="https://www.facebook.com/share/1Qq7NFj1WK/" target="_blank" style="color:#1877f2;">Facebook Page</a></p>
         <p style="margin-top:6px;"><strong>📸 Instagram:</strong> <a href="https://www.instagram.com/azminislamimon?evlk=cXdva2lka3FiNDk4" target="_blank" style="color:#e1306c;">Instagram Profile</a></p>
         <p style="margin-top:6px;"><strong>✈️ Telegram:</strong> <a href="https://t.me/azmincru" target="_blank" style="color:#0088cc;">Telegram Channel/Chat</a></p>`;
  } else if (type === "faq") {
    titleEl.innerText = isBn ? "❓ সাধারণ জিজ্ঞাসা (FAQ)" : "❓ Frequently Asked Questions";
    bodyEl.innerHTML = isBn
      ? `<p><strong>১. অ্যাড চালু হতে কত সময় লাগে?</strong><br/>১০ থেকে ৩০ মিনিটের মধ্যে চালু হয়।</p><br/>
         <p><strong>২. পেমেন্ট কখন করতে হবে?</strong><br/>কাজ শুরুর আগে বা কাজ শেষে পেমেন্ট করতে পারবেন।</p>`
      : `<p><strong>1. Activation time?</strong><br/>Starts within 10 to 30 mins.</p>`;
  }

  modal.style.display = "flex";
}

function closeInfoModal() {
  document.getElementById("infoModal").style.display = "none";
}

async function submitUserReview(e) {
  e.preventDefault();
  const name = document.getElementById("userRevName").value.trim();
  const comment = document.getElementById("userRevText").value.trim();
  const newReview = { name, comment, time: new Date().toLocaleDateString() };

  try {
    await fetch(`${DB_URL}/reviews.json`, {
      method: "POST",
      body: JSON.stringify(newReview)
    });
    closeInfoModal();
    showToast(translations[currentLang].toastReviewSuccess);
    loadSiteData();
  } catch (err) {
    alert("Error submitting review.");
  }
}

function renderHomeReviews() {
  const container = document.getElementById("homeReviewsGrid");
  if (reviewsList.length === 0) {
    container.innerHTML = `<p>${currentLang === 'bn' ? 'কোনো রিভিউ পাওয়া যায়নি।' : 'No reviews found.'}</p>`;
    return;
  }
  container.innerHTML = reviewsList.slice(0, 3).map(r => `
    <div class="review-card">
      <div class="review-stars">★★★★★</div>
      <p>"${r.comment}"</p>
      <div class="review-author">— ${r.name}</div>
    </div>
  `).join("");
}

function toggleChatWidget() {
  const box = document.getElementById("chatBox");
  box.style.display = box.style.display === "flex" ? "none" : "flex";
}

function openChatFromMenu() {
  const drawer = document.getElementById("sideDrawer");
  if (drawer.classList.contains("open")) {
    toggleDrawer();
  }
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
    botReply = isBn ? `আজকের ডলার রেট ${dollarRate} টাকা।` : `Today's dollar rate is ${dollarRate} BDT.`;
  } else if (topic === "pay") {
    userText = t.qPay;
    botReply = isBn ? `বিকাশ/নগদ নম্বর: ${paymentNumber}।` : `bKash/Nagad: ${paymentNumber}.`;
  } else if (topic === "time") {
    userText = t.qTime;
    botReply = isBn ? `অর্ডার করার ১০-৩০ মিনিটের মধ্যে অ্যাড চালু হয়।` : `Ads go live in 10-30 mins.`;
  } else if (topic === "wa") {
    userText = t.qWa;
    botReply = `WhatsApp: ${whatsappNumber}`;
  }

  appendChat(userText, botReply);
}

function sendChatMessage(e) {
  e.preventDefault();
  const input = document.getElementById("chatInput");
  const text = input.value.trim();
  if (!text) return;
  input.value = "";
  appendChat(text, currentLang === "bn" ? "ধন্যবাদ! দ্রুত সাপোর্টের জন্য WhatsApp বা Telegram-এ নক দিন।" : "Thanks! Message us on WhatsApp or Telegram for fast support.");
}

function appendChat(userMsg, botMsg) {
  const msgBox = document.getElementById("chatMessages");
  msgBox.innerHTML += `<div class="msg-user">${userMsg}</div>`;
  setTimeout(() => {
    msgBox.innerHTML += `<div class="msg-bot">${botMsg}</div>`;
    msgBox.scrollTop = msgBox.scrollHeight;
  }, 200);
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

    const revRes = await fetch(`${DB_URL}/reviews.json`);
    const revs = await revRes.json();
    if (revs) {
      reviewsList = Object.keys(revs).map(key => ({ id: key, ...revs[key] })).reverse();
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
  openOrderModal(`কাস্টম বুস্ট ($${d})`, `Custom Boost ($${d})`, total, d);
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
    alert("Error submitting order.");
  } finally {
    btn.disabled = false;
    btn.innerText = translations[currentLang].confirmOrderBtn;
  }
}

loadSiteData();
