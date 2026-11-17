const DB_URL = "https://boostify-digital-8ec2d-default-rtdb.firebaseio.com";
const TG_BOT_TOKEN = "9132475930:AAEWvtKIAF_G41MugR5f4eZxMrlEkwpJ2dg";
const TG_CHAT_ID = "7560607133";

let currentLang = "bn";
let dollarRate = 130;
let paymentNumber = "01815395746";
let packagesList = [];
let activeOrder = { title: "", price: 0, dollars: 0 };

const defaultPackages = {
  pkg1: {
    title_bn: "স্টার্টার বুস্ট ($৫)",
    title_en: "Starter Boost ($5)",
    desc_bn: "নতুন পেজ বা পোস্টের রিচ ও এঙ্গেজমেন্ট বাড়ানোর জন্য সেরা প্যাকেজ।",
    desc_en: "Best package to increase reach and engagement for new pages or posts.",
    dollars: 5,
    discount: 50,
    img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80"
  },
  pkg2: {
    title_bn: "বিজনেস গ্রোথ ($১০)",
    title_en: "Business Growth ($10)",
    desc_bn: "টার্গেটেড কাস্টমার এবং ইনবক্স মেসেজ বা সেল বৃদ্ধির জন্য প্রফেশনাল ক্যাম্পেইন।",
    desc_en: "Professional campaign for targeted customers and higher inbox messages/sales.",
    dollars: 10,
    discount: 100,
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80"
  },
  pkg3: {
    title_bn: "প্রো ভাইরাল প্যাক ($২০)",
    title_en: "Pro Viral Pack ($20)",
    desc_bn: "বড় বাজেটের অ্যাড রান এবং সর্বোচ্চ সেলস কনভার্সনের জন্য ফুল সাপোর্ট।",
    desc_en: "Full support for large budget ad campaigns and maximum sales conversion.",
    dollars: 20,
    discount: 200,
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80"
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

  document.querySelectorAll("[data-bn]").forEach(el => {
    el.innerText = el.getAttribute(`data-${currentLang}`);
  });

  renderPackages();
}

async function loadSiteData() {
  try {
    const setRes = await fetch(`${DB_URL}/settings.json`);
    const settings = await setRes.json();
    if (settings) {
      if (settings.dollarRate) dollarRate = Number(settings.dollarRate);
      if (settings.paymentNumber) paymentNumber = settings.paymentNumber;
    } else {
      await fetch(`${DB_URL}/settings.json`, {
        method: "PUT",
        body: JSON.stringify({ dollarRate: 130, paymentNumber: "01815395746" })
      });
    }

    document.getElementById("liveRate").innerText = dollarRate;
    document.getElementById("displayPayNumber").innerText = paymentNumber;
    updateCustomCalc();

    const pkgRes = await fetch(`${DB_URL}/packages.json`);
    const pkgs = await pkgRes.json();
    if (pkgs) {
      packagesList = Object.keys(pkgs).map(key => ({ id: key, ...pkgs[key] }));
    } else {
      await fetch(`${DB_URL}/packages.json`, {
        method: "PUT",
        body: JSON.stringify(defaultPackages)
      });
      packagesList = Object.keys(defaultPackages).map(key => ({ id: key, ...defaultPackages[key] }));
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
    const currency = currentLang === "bn" ? "টাকা" : "BDT";
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
          <button class="btn-primary" onclick="openOrderModal('${title.replace(/'/g, "\\'")}', ${finalPrice}, ${pkg.dollars})">${btnText}</button>
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
  const title = currentLang === "bn" ? `কাস্টম বুস্ট ($${d})` : `Custom Boost ($${d})`;
  openOrderModal(title, total, d);
}

function openOrderModal(title, price, dollars) {
  activeOrder = { title, price, dollars };
  document.getElementById("modalPkgName").innerText = title;
  const currency = currentLang === "bn" ? "টাকা" : "BDT";
  const label = currentLang === "bn" ? "সর্বমোট পেমেন্ট:" : "Total Payment:";
  document.getElementById("modalPkgPrice").innerText = `${label} ${price} ${currency}`;
  document.getElementById("orderModal").style.display = "flex";
}

function closeOrderModal() {
  document.getElementById("orderModal").style.display = "none";
}

function copyPayNumber() {
  navigator.clipboard.writeText(paymentNumber);
  showToast(currentLang === "bn" ? "✅ নম্বর কপি হয়েছে: " + paymentNumber : "✅ Number copied: " + paymentNumber);
}

async function submitOrder(e) {
  e.preventDefault();
  const btn = document.getElementById("submitOrderBtn");
  btn.disabled = true;
  btn.innerText = currentLang === "bn" ? "সাবমিট হচ্ছে..." : "Submitting...";

  const orderData = {
    package: activeOrder.title,
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

    const tgMessage = `🔔 *নতুন অর্ডার এসেছে! (Boostify Digital)*\n\n` +
      `📦 *প্যাকেজ:* ${orderData.package}\n` +
      `💰 *মোট বিল:* ${orderData.amountTaka} টাকা\n` +
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
    showToast(currentLang === "bn" ? "🎉 অর্ডার সফলভাবে জমা হয়েছে!" : "🎉 Order submitted successfully!");
  } catch (err) {
    alert("Error submitting order. Please try again.");
  } finally {
    btn.disabled = false;
    btn.innerText = currentLang === "bn" ? "অর্ডার কনফার্ম করুন" : "Confirm Order";
  }
}

loadSiteData();
