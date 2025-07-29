import express from "express"
import client from "prom-client"

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

app.get("/", (req, res) => {
    res.send("Node.js Monitoring in Kubernetes using Prometheus & Grafana!")
});

app.get("/metrics", async (req, res) => {
    res.set("Content-Type", client.register.contentType);
    res.end(await client.register.metrics());
});

app.listen(PORT, () => {
    console.log(`App Listening on PORT: ${PORT}`)
});