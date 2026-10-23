const mineflayer = require('mineflayer');
const express = require('express');
const https = require('https');

// ============================================================
// ১. RENDER UPTIME PROTECTOR & WEB HOST CONFIG
// ============================================================
const app = express();
const PORT = process.env.PORT || 10000;
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
  
  setInterval(() => {
    https.get(RENDER_LIVE_URL, (res) => {}).on('error', (err) => {});
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
  version: false, 
  fakeHost: 'powerairgaming.aternos.me', 
  skipValidation: true, 
  checkTimeoutInterval: 30000, 
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
        keepAlive: true,
        closeTimeout: 60000,
        noPing: true
      });
    } catch (e) {
      setTimeout(() => launchAbidOperator(botUsername, 0), 20000);
      return;
    }

    let dynamicActionLoop;

    botInstance.on('inject_allowed', () => {
      if (botInstance.plugins && botInstance.plugins.world) delete botInstance.plugins.world;
    });

    botInstance.on('spawn', () => {
      console.log(`✨ [HEROIC SUCCESS]: ${botUsername} has permanently hijacked the 26.3 Grid Matrix!`);
      if (dynamicActionLoop) clearInterval(dynamicActionLoop);

      dynamicActionLoop = setInterval(() => {
        if (!botInstance || !botInstance.entity) return;

        const yaw = (Math.random() * Math.PI * 2).toFixed(2);
        const pitch = ((Math.random() - 0.5) * 0.4).toFixed(2);
        botInstance.look(yaw, pitch);

        const activeDirections = ['forward', 'back', 'left', 'right'];
        const chosenDirection = activeDirections[Math.floor(Math.random() * activeDirections.length)];
        
        if (botInstance.setControlState) {
          botInstance.setControlState(chosenDirection, true);
          setTimeout(() => { 
            if (botInstance.setControlState) botInstance.setControlState(chosenDirection, false); 
          }, 450);
        }

        if (Math.random() > 0.5 && botInstance.setControlState) {
          botInstance.setControlState('jump', true);
          setTimeout(() => { if (botInstance.setControlState) botInstance.setControlState('jump', false); }, 250);
        }

        const safetyPhrases = [
          "Secure Node: Active", 
          "Abid Matrix System: 100% Operational", 
          "Bypass matrix loop engaged."
        ];
        if (Math.random() > 0.92) { 
          botInstance.chat(safetyPhrases[Math.floor(Math.random() * safetyPhrases.length)]);
        }

        if (botInstance._client) {
          botInstance._client.write('teleport_confirm', { teleportId: 1 });
        }

      }, 14000); 
    });

    botInstance.on('end', (disconnectReason) => {
      console.log(`⚠ [REFRESH]: ${botUsername} connection cycle refreshed (${disconnectReason}). Restoring grid in 20s...`);
      if (dynamicActionLoop) clearInterval(dynamicActionLoop);
      
      botInstance.removeAllListeners();
      setTimeout(() => launchAbidOperator(botUsername, 0), 20000); // রিকানেক্ট টাইম কমিয়ে ২০ সেকেন্ড করা হলো
    });

    botInstance.on('error', (err) => {});

  }, queueDelay);
}

// ============================================================
// 🚀 INITIATING DEPLOYMENT SEQUENCER
// ============================================================
launchAbidOperator('ABID_MATRIX_HERO_1', 3000);
launchAbidOperator('ABID_MATRIX_HERO_2', 25000);
