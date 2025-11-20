import express from "express";
import httpProxy from "http-proxy";

const ORIGIN_IP = "195.201.179.80";  
const ORIGIN_HOST = "canadavisaassistant.online";  

const app = express();
const proxy = httpProxy.createProxyServer({});

app.use((req, res) => {
  proxy.web(req, res, {
    target: `http://${ORIGIN_IP}`,
    changeOrigin: true,
    secure: false,
    headers: {
      "Host": ORIGIN_HOST,
      "X-Forwarded-Proto": "http",
      "X-Real-IP": req.ip
    }
  });
});

// 🚀 IMPORTANT FIX — REQUIRED BY RENDER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Reverse proxy running on port", PORT);
});
