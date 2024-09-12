
import getPort from "get-port";
import express from "express";

const app = express();

let server_port = await getPort({ port: 3992 });

export const viteServerPort = server_port;

app.get("/", (req, res) => {
  res.send("change me to see updates, express~!");
});

app.get("/ip", async (req, res) => {
  const resp = await fetch("https://api.ipify.org?format=json");
  const json = await resp.json();
  res.json(json);
});

app.listen(server_port);
export const viteNodeApp = app;
