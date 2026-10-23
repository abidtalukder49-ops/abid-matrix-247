const mineflayer = require('mineflayer');
const express = require('express');
const https = require('https');

// ============================================================
// ১. RENDER UPTIME PROTECTOR & WEB HOST CONFIG
// ============================================================
const app = express();
const PORT = process.env.PORT || 10000;
const RENDER_LIVE_URL = 'https://abid-matrix-system.onrender.com';

app.get('/', (req, res) => {
  res.status(200).json({
    status: "Matrix Shield: 100% Operational",
    core: "ABID_PULSE_BYPASS_ENGAGED",
    detected_software: "PaperMC 26.3 (214)",
    uptime: `${Math.floor(process.uptime())} Seconds`
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✔ [GRID SYSTEM]: Bypass Control Node active on port ${PORT}`);
  
  // ⚡ INTERNAL TRAFFIC PULSE: রেন্ডারকে ২৪/৭ সচল রাখার ২ মিনিটের মেকানিজম
  setInterval(() => {
    https.get(RENDER_LIVE_URL, (res) => {
      // রেন্ডারকে সচল রাখার লাইভ পালস
    }).on('error', (err) => {
      // সাইলেন্ট ড্রপ হ্যান্ডলার
    });
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
  host: 'powerairgaming.aternos.me',
  port: 46469,
  version: '1.21.3', // প্রক্সি সকেট ড্রপ ফিক্স করার জন্য হার্ডকোডেড লেটেস্ট সংস্করণ লক
  fakeHost: 'powerairgaming.aternos.me', // এটার্নোস ফায়ারওয়াল বাইপাস হেডার
  skipValidation: true, // প্রাক-লগইন হ্যান্ডশেক ভ্যালিডেশন স্কিপ
  checkTimeoutInterval: 60000, // ড্রপ ট্র্যাকিং ইন্টারভাল
  physicsEnabled: true 
};

// ============================================================
// 🎮 HEROIC BOT ARCHITECTURE (THE ABID SQUADRON)
// ============================================================
function launchAbidOperator(botUsername, queueDelay) {
  setTimeout(() => {
    console.log(`[GRID]: Deploying Heroic Operator ${botUsername} into the PaperMC grid...`);
    
    let botInstance;
    try {
      botInstance = mineflayer.createBot({
        ...targetServerSettings,
        username: botUsername,
        // সকেট ক্লোজ প্রটেকশন মেকানিজম
        keepAlive: true,
        hideErrors: true
      });
    } catch (e) {
      setTimeout(() => launchAbidOperator(botUsername, 0), 30000);
      return;
    }

    let dynamicActionLoop;

    botInstance.on('inject_allowed', () => {
      if (botInstance.plugins && botInstance.plugins.world) delete botInstance.plugins.world;
    });

    botInstance.on('spawn', () => {
      console.log(`✨ [HEROIC SUCCESS]: ${botUsername} has permanently hijacked the 26.3 Grid Matrix!`);
      if (dynamicActionLoop) clearInterval(dynamicActionLoop);

      // 🧠 HUMAN MIMICRY BYPASS (ANTI-AFK AI OVERRIDE)
      dynamicActionLoop = setInterval(() => {
        if (!botInstance || !botInstance.entity) return;

        // অ্যাকশন ১: মানুষের মতো ঘাড় ঘুরানো
        const yaw = (Math.random() * Math.PI * 2).toFixed(2);
        const pitch = ((Math.random() - 0.5) * 0.4).toFixed(2);
        botInstance.look(yaw, pitch);

        // অ্যাকশন ২: সেফ বাউন্ডারি র্যান্ডম ওয়াকিং
        const activeDirections = ['forward', 'back', 'left', 'right'];
        const chosenDirection = activeDirections[Math.floor(Math.random() * activeDirections.length)];
        
        if (botInstance.setControlState) {
          botInstance.setControlState(chosenDirection, true);
          setTimeout(() => { 
            if (botInstance.setControlState) botInstance.setControlState(chosenDirection, false); 
          }, 450);
        }

        // অ্যাকশন ৩: এটার্নোসের এআই ডিটেক্টর ড্রপ করতে র্যান্ডম জাম্প
        if (Math.random() > 0.5 && botInstance.setControlState) {
          botInstance.setControlState('jump', true);
          setTimeout(() => { if (botInstance.setControlState) botInstance.setControlState('jump', false); }, 250);
        }

        // অ্যাকশন ৪: চ্যাট লগ ইনজেকশন
        const safetyPhrases = [
          "Secure Node: Active", 
          "Abid Matrix System: 100% Operational", 
          "Bypass matrix loop engaged."
        ];
        if (Math.random() > 0.92) { 
          botInstance.chat(safetyPhrases[Math.floor(Math.random() * safetyPhrases.length)]);
        }

        // অ্যাকশন ৫: ইন্টারনাল টেলিপোর্ট কনফার্মেশন প্যাকেট পুш
        if (botInstance._client) {
          botInstance._client.write('teleport_confirm', { teleportId: 1 });
        }

      }, 14000); 
    });

    // রিকানেকশন ও অটো-হিলিং প্রোটোকল
    botInstance.on('end', (disconnectReason) => {
      console.log(`⚠ [REFRESH]: ${botUsername} connection cycle refreshed (${disconnectReason}). Restoring grid in 35s...`);
      if (dynamicActionLoop) clearInterval(dynamicActionLoop);
      
      botInstance.removeAllListeners();
      // ৩৫ সেকেন্ডের সেফ ডিলে দিয়ে পুনরায় রিকানেক্ট
      setTimeout(() => launchAbidOperator(botUsername, 0), 35000);
    });

    botInstance.on('error', (err) => {
      // সকেট ড্রপ এরর হ্যান্ডলিং ইগনোরার
    });

  }, queueDelay);
}

// ============================================================
// 🚀 INITIATING DEPLOYMENT SEQUENCER (HEROIC MATRIX INITIALIZATION)
// ============================================================
// আইপি ওভারফ্লুড এড়াতে দুটি বটের মাঝে ৪৫ সেকেন্ডের গ্যাপ
launchAbidOperator('ABID_MATRIX_HERO_1', 5000);
launchAbidOperator('ABID_MATRIX_HERO_2', 45000);
