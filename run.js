const fs = require("fs");
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const DELAY = 60000; // 1 minutes

const messages = [
`kakak bantu follow ya siapa tau jadi teman ðŸ”¥ ID: https://vm.tiktok.com/ZS9L7C5K1vKmp-6xzBd`,
`Bantu follow ya kak ðŸ’™  ID: https://vm.tiktok.com/ZS9L7C5K1vKmp-6xzBd/`,
`Aku butuh kamu buat klik follow ðŸ™ ID: https://vm.tiktok.com/ZS9L7C5K1vKmp-6xzBd/`,
`Temenin aku berkembang dengan follow ya ðŸ’™ ID: https://vm.tiktok.com/ZS9L7C5K1vKmp-6xzBd/`,
`Support kecil dari kamu = follow â¤ï¸ ID: https://vm.tiktok.com/ZS9L7C5K1vKmp-6xzBd/`,
`Kalau kamu baca ini, berarti waktunya follow ðŸ˜‰ ID: https://vm.tiktok.com/ZS9L7C5K1vKmp-6xzBd/`,
`Bantu aku capai target dengan follow ya ðŸ”¥ID: https://vm.tiktok.com/ZS9L7C5K1vKmp-6xzBd/`,
`salam kenal kakak, bantu follow dan share profil tiktok aku kak ðŸ”¥ ID: https://vm.tiktok.com/ZS9L7C5K1vKmp-6xzBd/`
];

// take numbers
const numbers = fs.readFileSync("numbers.txt","utf-8")
.split("\n").map(n=>n.trim()).filter(n=>n.length>5);

function random(arr){return arr[Math.floor(Math.random()*arr.length)]}
function delay(ms){return new Promise(r=>setTimeout(r,ms))}

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    executablePath: "/usr/bin/chromium",
    args: ["--no-sandbox","--disable-setuid-sandbox"]
  }
});

client.on("qr", qr=>{
 console.log("Scan QR di WhatsApp...");
 qrcode.generate(qr,{small:true});
});

client.on("ready", async ()=>{
 console.log("✅ Login In, sending message...\n");

 for(let i=0;i<numbers.length;i++){
  const num = numbers[i];
  const chatId = num + "@c.us";
  const msg = random(messages);

  try{
   await client.sendMessage(chatId, msg);
   console.log(`✔ [${i+1}/${numbers.length}] ${num}`);
  }catch(e){
   console.log(`❌ ${num}`);
  }

  if(i < numbers.length-1){
   console.log("⏳ Delay 1 minutes...\n");
   await delay(DELAY);
  }
 }

 console.log("🚀 DONE!");
});

client.initialize();
