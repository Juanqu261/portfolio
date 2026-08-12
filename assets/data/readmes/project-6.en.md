# Aligo Mission Ledger C2

An **authorized-lab** C2 (Command & Control) platform with a blockchain **proof-of-execution**
ledger. Built for the **Aligo Defensores Informáticos** hackathon.

It orchestrates modular nodes with safe plugins, reusable missions, verifiable evidence anchored
on-chain, and an AI agent that proposes missions under human approval.

> **For closed, authorized lab use only.** This is not malware nor an offensive tool.

---

## 🧩 Components

- **Server / API** — FastAPI with Swagger docs and a WebSocket channel for real-time node control.
- **Nodes** — modular agents with registration, execution policies, plugins, and health reporting.
- **Blockchain ledger** — a contract deployed on Hardhat that anchors the hash of every execution, making evidence verifiable and tamper-evident.
- **IoT gateway** — simulated sensors and actuators wired into the same mission flow.
- **AI agent** — a Claude-based orchestrator that proposes missions; every execution requires explicit human approval.
- **Dashboard** — frontend for launching missions, tracking nodes, and auditing evidence.

---

## 🛠 Tech Stack

- **Backend:** Python 3.12+ · FastAPI · WebSocket
- **Blockchain:** Hardhat (Ethereum) · proof-of-execution contract
- **Frontend:** Node.js 20+ · npm
- **Infrastructure:** local, Docker, and Google Cloud deployments

---

## 🚀 Quick start

```bash
cp .env.example .env
python dev.py
```

That boots the Hardhat chain, deploys the contract, and starts the API server, the frontend,
simulated nodes, and the IoT gateway. Then open:

- **Dashboard:** https://127.0.0.1:5173
- **API (Swagger):** https://127.0.0.1:8000/docs

Useful flags: `python dev.py --no-tls`, `python dev.py --no-iot`, `python dev.py --help`.

---

## 📚 Documentation

The repository ships detailed technical docs under [`docs/`](https://github.com/ybedoyab/aligo-c2/tree/main/docs):
architecture and WebSocket protocol, ledger and evidence verification, node registration and
policies, the IoT gateway, lab-safe vulnerability scanning, threat model and ethical boundaries,
deployment guides, and the demo script.

---

## 👥 Team UNcontrolled

Yulian Bedoya · Alejandro Feria · Marycielo Berrio · Juan Fernando Quintero · Yulieth Urrego
