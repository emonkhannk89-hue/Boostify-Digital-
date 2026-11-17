const DB_URL = "https://boostify-digital-8ec2d-default-rtdb.firebaseio.com";
const TG_BOT_TOKEN = "9132475930:AAEWvtKIAF_G41MugR5f4eZxMrlEkwpJ2dg";
const TG_CHAT_ID = "7560607133";

let currentLang = "bn";
let dollarRate = 130;
let paymentNumber = "01815395746";
let packagesList = [];
let activeOrder = { titleBn: "", titleEn: "", price: 0, dollars: 0 };

const translations = {
  bn: {
    tagline: "বিশ্বস্ত ফেসবুক বুস্টিং ও ডিজিটাল মার্কেটিং সার্ভিস",
    rateLabel: "আজকের ডলার রেট:",
    rateUnit: "টাকা / $1",
    calcTitle: "🧮 কাস্টম ডলার বাজেট ক্যালকুলেটর",
    calcLabel: "কত ডলার বুস্ট করবেন ($):",
    totalLabel: "সর্বমোট বিল:",
    currency: "টাকা",
    customOrderBtn: "কাস্টম অর্ডার করুন",
    pkgSectionTitle: "🔥 জনপ্রিয় বুস্টিং প্যাকেজসমূহ",
    loadingText: "প্যাকেজ লোড হচ্ছে...",
    payInstruction: "নিচের নম্বরে Send Money / Cash In করুন:",
    copyBtn: "কপি",
    labelName: "আপনার নাম *",
    labelLink: "ফেসবুক পেজ বা পোস্টের লিংক *",
    labelPhone: "আপনার মোবাইল / WhatsApp নম্বর *",
    labelPayTiming: "পেমেন্টের সময় ও নিয়ম সিলেক্ট করুন *",
    labelPayMethod: "পেমেন্ট মেথড *",
    labelTrx: "যে নম্বর থেকে টাকা পাঠিয়েছেন বা TrxID *",
    confirmOrderBtn: "অর্ডার কনফার্ম করুন",
    cancelBtn: "বাতিল করুন",
    timing1: "কাজ শুরুর আগেই পেমেন্ট সম্পন্ন করেছি (Paid Before)",
    timing2: "কাজ সম্পূর্ণ হওয়ার পরে পেমেন্ট করব (Pay After Work)",
    toastCopy: "✅ নম্বর কপি হয়েছে: ",
    toastSuccess: "🎉 অর্ডার সফলভাবে জমা হয়েছে!",
    submitting: "সাবমিট হচ্ছে..."
  },
  en: {
    tagline: "Trusted Facebook Boosting & Digital Marketing Service",
    rateLabel: "Today's Dollar Rate:",
    rateUnit: "BDT / $1",
    calcTitle: "🧮 Custom Dollar Budget Calculator",
    calcLabel: "Enter Dollar Amount ($):",
    totalLabel: "Total Bill:",
    currency: "BDT",
    customOrderBtn: "Order Custom Boost",
    pkgSectionTitle: "🔥 Popular Boosting Packages",
    loadingText: "Loading packages...",
    payInstruction: "Send Money to the number below:",
    copyBtn: "Copy",
    labelName: "Your Name *",
    labelLink: "Facebook Page or Post Link *",
    labelPhone: "Your Mobile / WhatsApp Number *",
    labelPayTiming: "Select Payment Time *",
    labelPayMethod: "Payment Method *",
    labelTrx: "Sender Number or TrxID *",
    confirmOrderBtn: "Confirm Order",
    cancelBtn: "Cancel",
    timing1: "Paid Before Work",
    timing2: "Pay After Work",
    toastCopy: "✅ Number copied: ",
    toastSuccess: "🎉 Order submitted successfully!",
    submitting: "Submitting..."
  }
};

function showToast(msg) {
  const t = document.getElementById("toast");
  t.innerText = msg;
  t.style.display = "block";
  setTimeout(() => { t.style.display = "none"; }, 3000);
}

function toggleLanguage() {
  currentLang = currentLang === "bn" ? "en" : "bn";
  document.getElementById("langToggle").innerText = currentLang === "bn" ? "English" : "বাংলা";

  const t = translations[currentLang];
  document.getElementById("siteTagline").innerText = t.tagline;
  document.getElementById("rateLabel").innerText = t.rateLabel;
  document.getElementById("rateUnit").innerText = t.rateUnit;
  document.getElementById("calcTitle").innerText = t.calcTitle;
  document.getElementById("calcLabel").innerText = t.calcLabel;
  document.getElementById("totalLabel").innerText = t.totalLabel;
  document.getElementById("currencyLabel").innerText = t.currency;
  document.getElementById("customOrderBtn").innerText = t.customOrderBtn;
  document.getElementById("pkgSectionTitle").innerText = t.pkgSectionTitle;
  document.getElementById("loadingText").innerText = t.loadingText;
  document.getElementById("payInstruction").innerText = t.payInstruction;
  document.getElementById("copyBtnText").innerText = t.copyBtn;
  document.getElementById("labelName").innerText = t.labelName;
  document.getElementById("labelLink").innerText = t.labelLink;
  document.getElementById("labelPhone").innerText = t.labelPhone;
  document.getElementById("labelPayTiming").innerText = t.labelPayTiming;
  document.getElementById("labelPayMethod").innerText = t.labelPayMethod;
  document.getElementById("labelTrx").innerText = t.labelTrx;
  document.getElementById("submitOrderBtn").innerText = t.confirmOrderBtn;
  document.getElementById("cancelBtnText").innerText = t.cancelBtn;

  const timingSelect = document.getElementById("paymentTiming");
  timingSelect.options[0].text = t.timing1;
  timingSelect.options[1].text = t.timing2;

  renderPackages();
}

async function loadSiteData() {
  try {
    const setRes = await fetch(`${DB_URL}/settings.json`);
    const settings = await setRes.json();
    if (settings) {
      if (settings.dollarRate) dollarRate = Number(settings.dollarRate);
      if (settings.paymentNumber) paymentNumber = settings.paymentNumber;
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
    alert("Error submitting order. Please try again.");
  } finally {
    btn.disabled = false;
    btn.innerText = translations[currentLang].confirmOrderBtn;
  }
}

loadSiteData();
