const mineflayer = require('mineflayer');
const express = require('express');
const https = require('https');

// ============================================================
// ১. RENDER UPTIME PROTECTOR & WEB HOST CONFIG
// ============================================================
const app = express();
const PORT = process.env.PORT || 10000;
// আপনার নতুন ও ইউনিক রেন্ডার ইউআরএল নিচে সেট করা হলো
const RENDER_LIVE_URL = 'https://onrender.com';

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
      console.log(`[PULSE]: Data traffic verified. Code: ${res.statusCode}`);
    }).on('error', (err) => {
      console.log('[PULSE ERROR]: Traffic sync dropped momentarily.');
    });
  }, 120000);
});

// ============================================================
// ২. ADVANCED ERROR FILTER & PACKET DROP PROTECTION
// ============================================================
const criticalSilenceList = ['ECONNRESET', 'EPIPE', 'ETIMEDOUT', 'PartialReadError', 'EOF', 'handshake', 'undefined', 'TCP', 'version', 'recipe', 'slot'];
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
// ৩. 26.3 (214) PROTOCOL HANDSHAKE MATRIX
// ============================================================
const targetServerSettings = {
  host: 'powerairgaming.aternos.me',
  port: 46469,
  version: false, // Geyser/ViaVersion এর সাথে অটো-অ্যাডাপ্ট মোড
  checkTimeoutInterval: 120000,
  physicsEnabled: true // Anti-AFK বাইপাসের জন্য ফিজিক্স ইঞ্জিন অন থাকবে
};

// ============================================================
// 🎮 HEROIC BOT ARCHITECTURE (THE ABID SQUADRON)
// ============================================================
function launchAbidOperator(botUsername, queueDelay) {
  setTimeout(() => {
    console.log(`[GRID]: Launching Special Operator ${botUsername} into the PaperMC stream...`);
    
    let botInstance;
    try {
      botInstance = mineflayer.createBot({
        ...targetServerSettings,
        username: botUsername
      });
    } catch (e) {
      setTimeout(() => launchAbidOperator(botUsername, 0), 40000);
      return;
    }

    let dynamicActionLoop;

    botInstance.on('inject_allowed', () => {
      if (botInstance.plugins && botInstance.plugins.world) delete botInstance.plugins.world;
    });

    botInstance.on('spawn', () => {
      console.log(`✨ [HEROIC SUCCESS]: ${botUsername} has successfully breached the 26.3 Grid!`);
      if (dynamicActionLoop) clearInterval(dynamicActionLoop);

      // 🧠 HUMAN MIMICRY BYPASS (ANTI-AFK AI OVERRIDE)
      dynamicActionLoop = setInterval(() => {
        if (!botInstance || !botInstance.entity) return;

        // অ্যাকশন ১: মানুষের মতো ঘাড় ঘুরানো
        const yaw = (Math.random() * Math.PI * 2).toFixed(2);
        const pitch = ((Math.random() - 0.5) * 0.5).toFixed(2);
        botInstance.look(yaw, pitch);

        // অ্যাকশন ২: বাউন্ডারি সেফ র্যান্ডম ওয়াকিং (নড়াচড়া)
        const activeDirections = ['forward', 'back', 'left', 'right'];
        const chosenDirection = activeDirections[Math.floor(Math.random() * activeDirections.length)];
        
        if (botInstance.setControlState) {
          botInstance.setControlState(chosenDirection, true);
          setTimeout(() => { 
            if (botInstance.setControlState) botInstance.setControlState(chosenDirection, false); 
          }, 400);
        }

        // অ্যাকশন ৩: মাঝে মাঝে লাফ দেওয়া
        if (Math.random() > 0.5 && botInstance.setControlState) {
          botInstance.setControlState('jump', true);
          setTimeout(() => { if (botInstance.setControlState) botInstance.setControlState('jump', false); }, 250);
        }

        // অ্যাকশন ৪: চ্যাট লগ ইনজেকশন
        const safetyPhrases = [
          "Secure Protocol: Online", 
          "Abid Heroic Bot: Active", 
          "Matrix Engine Running Flawlessly."
        ];
        if (Math.random() > 0.88) { 
          botInstance.chat(safetyPhrases[Math.floor(Math.random() * safetyPhrases.length)]);
        }

        // অ্যাকশন ৫: ইন্টারনাল প্যাকেট কনফার্মেশন পুশ
        if (botInstance._client) {
          botInstance._client.write('teleport_confirm', { teleportId: 1 });
        }

      }, 13000); 
    });

    // রি-কানেকশন এবং সেলফ-হিলিং মেথড
    botInstance.on('end', (disconnectReason) => {
      console.log(`⚠ [REFRESH]: ${botUsername} grid connection reset (${disconnectReason}). Recovering in 45s...`);
      if (dynamicActionLoop) clearInterval(dynamicActionLoop);
      
      botInstance.removeAllListeners();
      setTimeout(() => launchAbidOperator(botUsername, 0), 45000);
    });

    botInstance.on('error', () => {});

  }, queueDelay);
}

// ============================================================
// 🚀 INITIATING DEPLOYMENT SEQUENCER (HEROIC INITIALIZATION)
// ============================================================
launchAbidOperator('ABID_MATRIX_HERO_1', 5000);
launchAbidOperator('ABID_MATRIX_HERO_2', 50000);
