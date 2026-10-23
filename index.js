const mineflayer = require('mineflayer');
const express = require('express');
const https = require('https');

// ============================================================
// 📁 CONFIGURATION LINK MATRIX (কনফিগ ফাইল লোডার)
// ============================================================
let config;
try {
  config = require('./config.json');
  console.log('⚡ [MATRIX SYSTEM]: config.json থেকে প্রো-কনফিগ ফাইল সফলভাবে সিঙ্ক হয়েছে!');
} catch (e) {
  console.log('⚠️ [CRITICAL]: config.json পাওয়া যায়নি! ডিফল্ট ডাটা লোড হচ্ছে...');
  config = {
    host: 'powerairgaming.aternos.me',
    port: 46469,
    version: '1.21.3',
    botNames: ["ABID_MATRIX_HERO_1", "ABID_MATRIX_HERO_2"]
  };
}

// ============================================================
// ১. RENDER UPTIME PROTECTOR & WEB HOST CONFIG
// ============================================================
const app = express();
const PORT = process.env.PORT || 10000;
const RENDER_LIVE_URL = 'https://onrender.com';

app.get('/', (req, res) => {
  res.status(200).json({
    status: "Matrix Shield: 100% Operational",
    core: "ABID_PRO_LOGGER_ENGAGED",
    target_host: config.host,
    detected_software: "PaperMC 26.3 (214)",
    uptime: `${Math.floor(process.uptime())} Seconds`
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`📡 [WEB SERVER]: Bypass Control Node actively live on port ${PORT}`);
  
  setInterval(() => {
    https.get(RENDER_LIVE_URL, (res) => {
      console.log(`💓 [PULSE]: Render Server is kept awake! Status Code: ${res.statusCode}`);
    }).on('error', (err) => {});
  }, 120000);
});

// ============================================================
// ২. ADVANCED ERROR FILTER & PACKET DROP PROTECTION
// ============================================================
const criticalSilenceList = ['ECONNRESET', 'EPIPE', 'ETIMEDOUT', 'PartialReadError', 'EOF', 'handshake', 'undefined', 'TCP', 'version', 'recipe', 'slot', 'status response', 'socketClosed'];
const nativeConsoleError = console.error;

console.error = function (...args) {
  const errMsg = args.join(' ');
  if (criticalSilenceList.some(err => errMsg.includes(err))) return;
  nativeConsoleError.apply(console, args);
};

process.on('uncaughtException', (err) => {
  if (criticalSilenceList.some(e => err.message.includes(e))) return;
});
process.on('unhandledRejection', (reason) => {
  if (criticalSilenceList.some(e => String(reason).includes(e))) return;
});

// ============================================================
// ৩. GEYSER/PAPERMC PROXIED PROTOCOL HANDSHAKE MATRIX
// ============================================================
const targetServerSettings = {
  host: config.host,
  port: config.port,
  version: config.version === '1.21.3' ? '1.21.3' : false, 
  fakeHost: config.host, 
  skipValidation: true, 
  checkTimeoutInterval: 30000, 
  physicsEnabled: true 
};

// ============================================================
// 🎮 HEROIC BOT ARCHITECTURE (THE ABID SQUADRON WITH PRO LOGS)
// ============================================================
function launchAbidOperator(botUsername, queueDelay) {
  setTimeout(() => {
    console.log(`🚀 [GRID DEPLOYMENT]: Operator [${botUsername}] কে Aternos সার্ভারে পুশ করা হচ্ছে...`);
    
    let botInstance;
    try {
      botInstance = mineflayer.createBot({
        ...targetServerSettings,
        username: botUsername,
        keepAlive: true,
        closeTimeout: 60000,
        noPing: true
      });
    } catch (e) {
      console.log(`❌ [CRITICAL ERROR]: ${botUsername} ইনস্ট্যান্স তৈরিতে ব্যর্থ! ২০ সেকেন্ড পর রি-ট্রাই...`);
      setTimeout(() => launchAbidOperator(botUsername, 0), 20000);
      return;
    }

    let dynamicActionLoop;

    botInstance.on('inject_allowed', () => {
      if (botInstance.plugins && botInstance.plugins.world) delete botInstance.plugins.world;
    });

    // 🟢 সফলভাবে সার্ভারে জয়েন করার আলটিমেট প্রফেশনাল লগ
    botInstance.on('spawn', () => {
      console.log(`👑 [HEROIC JOINED]: আলহামদুলিল্লাহ! আপনার বট [${botUsername}] সফলভাবে মাইনক্রাফট সার্ভারে প্রবেশ করেছে এবং স্থায়ী লকড হয়েছে! 🔥`);
      if (dynamicActionLoop) clearInterval(dynamicActionLoop);

      // 🧠 HUMAN MIMICRY BYPASS (ANTI-AFK AI OVERRIDE)
      dynamicActionLoop = setInterval(() => {
        if (!botInstance || !botInstance.entity) return;

        // অ্যাকশন ১: মানুষের মতো ঘাড় ঘুরানো
        const yaw = (Math.random() * Math.PI * 2).toFixed(2);
        const pitch = ((Math.random() - 0.5) * 0.4).toFixed(2);
        botInstance.look(yaw, pitch);
        console.log(`👀 [ACTION LOG - ${botUsername}]: মানুষের মতো চারপাশে মাথা ঘুরিয়ে চারদিক পর্যবেক্ষণ করলো।`);

        // অ্যাকশন ২: সেফ বাউন্ডারি র্যান্ডম ওয়াকিং (নড়াচড়া)
        const activeDirections = ['forward', 'back', 'left', 'right'];
        const chosenDirection = activeDirections[Math.floor(Math.random() * activeDirections.length)];
        
        if (botInstance.setControlState) {
          botInstance.setControlState(chosenDirection, true);
          console.log(`👟 [ACTION LOG - ${botUsername}]: এটার্নোস এআই-কে ফাঁকি দিতে [${chosenDirection}] দিকে ১ কদম হাঁটলো।`);
          setTimeout(() => { 
            if (botInstance.setControlState) botInstance.setControlState(chosenDirection, false); 
          }, 450);
        }

        // অ্যাকশন ৩: মাঝে মাঝে লাফ দেওয়া
        if (Math.random() > 0.5 && botInstance.setControlState) {
          botInstance.setControlState('jump', true);
          console.log(`🦘 [ACTION LOG - ${botUsername}]: সার্ভার ট্র্যাকার ড্রপ করার জন্য একটি সলিড জাম্প (লাফ) দিল!`);
          setTimeout(() => { if (botInstance.setControlState) botInstance.setControlState('jump', false); }, 250);
        }

        // অ্যাকশন ৪: চ্যাট লগ ইনজেকশন (সেফটি মোড)
        const safetyPhrases = [
          "Secure Node: Active", 
          "Abid Matrix System: 100% Operational", 
          "Bypass matrix loop engaged."
        ];
        if (Math.random() > 0.92) { 
          const randomChat = safetyPhrases[Math.floor(Math.random() * safetyPhrases.length)];
          botInstance.chat(randomChat);
          console.log(`💬 [CHAT LOG - ${botUsername}]: গেম চ্যাটে মেসেজ পাঠাল: "${randomChat}"`);
        }

        // অ্যাকশন ৫: ইন্টারনাল প্যাকেট কনফার্মেশন পুশ
        if (botInstance._client) {
          botInstance._client.write('teleport_confirm', { teleportId: 1 });
        }

      }, 15000); // লগের ভিড় কমাতে ডিলে বাড়িয়ে ১৫ সেকেন্ড করা হলো
    });

    // 🔴 ডিসকানেক্ট বা ড্রপ খাওয়ার হিরোইক অ্যালার্ট লগ
    botInstance.on('end', (disconnectReason) => {
      console.log(`⚠️ [ALERT - DISCONNECTED]: [${botUsername}] কোনো কারণে সংযোগ হারিয়েছে! কারণ: (${disconnectReason})। ২০ সেকেন্ডের মধ্যে অটো-হিলিং রিকানেকশন চালু হচ্ছে...`);
      if (dynamicActionLoop) clearInterval(dynamicActionLoop);
      
      botInstance.removeAllListeners();
      setTimeout(() => launchAbidOperator(botUsername, 0), 20000);
    });

    botInstance.on('error', (err) => {});

  }, queueDelay);
}

// ============================================================
// 🚀 INITIATING DEPLOYMENT SEQUENCER (CONFIG DRIVEN)
// ============================================================
const names = config.botNames || ["ABID_MATRIX_HERO_1", "ABID_MATRIX_HERO_2"];
launchAbidOperator(names, 3000);
if (names) {
  launchAbidOperator(names, 25000);
}
