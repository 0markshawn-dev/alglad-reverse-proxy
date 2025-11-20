import express from "express";
import httpProxy from "http-proxy";

const ORIGIN_IP = "195.201.179.80";  // hosting server IP
const ORIGIN_HOST = "canadavisaassistant.online";  // your domain

const app = express();
const proxy = httpProxy.createProxyServer({});

app.use((req, res) => {
  proxy.web(req, res, {
    target: `http://${ORIGIN_IP}`,   // your hosting only supports HTTP
    changeOrigin: true,
    secure: false,
    headers: {
      "Host": ORIGIN_HOST,            // tells hosting which vhost to load
      "X-Forwarded-Proto": "http",    // FIXED — must be http
      "X-Real-IP": req.ip
    }
  });
});

// Render requires PORT from environment
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Reverse proxy running on port", PORT);
});
