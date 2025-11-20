import express from "express";
import httpProxy from "http-proxy";

const ORIGIN_IP = "195.201.179.80";  // your hosting server IP
const ORIGIN_HOST = "canadavisaassistant.online";  // your domain

const app = express();
const proxy = httpProxy.createProxyServer({});

app.use((req, res) => {
  proxy.web(req, res, {
    target: `http://${ORIGIN_IP}`,
    changeOrigin: true,
    headers: {
      "Host": ORIGIN_HOST,
      "X-Forwarded-Proto": "https",
      "X-Real-IP": req.ip
    }
  });
});

app.listen(3000, () => {
  console.log("Reverse proxy running on port 3000");
});
