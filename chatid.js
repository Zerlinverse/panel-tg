const fetch = require("node-fetch");

const TOKEN = "7605925783:AAHMAZM02PIn79J_3Eg4SnksrCC05vUADLA";
(async () => {
  const response = await fetch(`https://api.telegram.org/bot${TOKEN}/getUpdates`);
  const data = await response.json();
  console.log(data.result);
})();
