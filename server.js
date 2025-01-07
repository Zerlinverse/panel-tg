const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
const fetch = require("node-fetch");
const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const app = express();
const PORT = 3000;

const discordClient = new Client({ intents: [GatewayIntentBits.Guilds] });
discordClient.login(process.env.DISCORD_TOKEN).catch((error) => {
  console.error("Error al conectar a Discord. Verifica el token:", error.message);
  process.exit(1); // Detener el servidor si el token es inválido
});

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // Carpeta para los archivos HTML y CSS

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Ruta para guardar configuraciones
app.post("/configuracion", (req, res) => {
  const { discordToken, telegramToken, discordChannel, telegramServer, contraseña } = req.body;

  const configuracion = {
    discordToken,
    telegramToken,
    discordChannel,
    telegramServer,
    contraseña,
  };

  fs.writeFileSync("config.json", JSON.stringify(configuracion, null, 2));
  res.json({ message: "Configuraciones guardadas exitosamente." });
});

// Ruta para enviar anuncios
// Ruta para enviar mensajes a Telegram
app.post("/send-telegram", async (req, res) => {
  const { mensaje, telegramToken, telegramChatId } = req.body;

  try {
    const chatId = "@test123456789101234"; // Cambia esto al chat o grupo deseado
    const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: mensaje }),
    });

    const data = await response.json();

    if (data.ok) {
      res.json({ message: "Mensaje enviado a Telegram correctamente." });
    } else {
      res.status(500).json({ error: "Error al enviar mensaje a Telegram." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al conectar con Telegram API." });
  }
});

// Ruta para enviar mensajes a Discord
app.post("/send-discord", async (req, res) => {
  const { mensaje, discordChannel } = req.body;

  try {
    discordClient.once("ready", async () => {
      const channel = discordClient.channels.cache.get(discordChannel);

      if (!channel) {
        res.status(404).json({ error: "Canal de Discord no encontrado." });
        return;
      }

      await channel.send(mensaje);
      res.json({ message: "Mensaje enviado a Discord correctamente." });
    });
  } catch (error) {
    res.status(500).json({ error: "Error al enviar mensaje a Discord." });
  }
});

// Servidor activo
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});