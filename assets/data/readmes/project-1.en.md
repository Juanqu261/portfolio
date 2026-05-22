# BrokerWiz — Bot Automation Server

Insurance-quote automation platform built on Selenium bots, with a FastAPI REST gateway and an MQTT task queue.

## Architecture

```
┌─────────────┐      ┌─────────────┐      ┌─────────────────────────┐
│   Client    │ ───► │  FastAPI    │ ───► │   Mosquitto (MQTT)      │
│ (BrokerWiz) │      │  /api/*/    │      │   bots/queue/{insurer}  │
└─────────────┘      └─────────────┘      └───────────┬─────────────┘
                                                      │
                                    $share/workers/bots/queue/+
                                                      │
                          ┌───────────────────────────┼───────────────────────────┐
                          ▼                           ▼                           ▼
                    ┌───────────┐                ┌───────────┐                ┌───────────┐
                    │ Worker 1  │                │ Worker 2  │                │ Worker N  │
                    │ (Selenium)│                │ (Selenium)│                │ (Selenium)│
                    └───────────┘                └───────────┘                └───────────┘
```

**Flow:** Client → API → MQTT → Workers (shared subscriptions, round-robin)

## Quick Start

```bash
# 1. Clone and install
git clone <repo> /opt/brokerwiz && cd /opt/brokerwiz
chmod +x scripts/*.sh && ./scripts/setup.sh

# 2. Configure Mosquitto
sudo ./scripts/mosquitto.sh setup
./scripts/mosquitto.sh version  # Verify MQTT 5 (v2.0+)

# 3. Configure environment
cp .env.example .env && nano .env

# 4. Start services
./scripts/api.sh start -d       # API (background)
# Workers: coming soon

# 5. Verify
curl http://localhost:8000/health
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/health` | Health check (API + MQTT) |
| `POST` | `/api/{insurer}/cotizar` | Enqueue a quote task |
| `GET`  | `/logs` | Query system logs |

**Supported insurers:** `hdi`, `sura`, `axa`, `allianz`, `bolivar`, `mundial`, `equidad`, `solidaria`, `sbs`

## Usage Example

```bash
curl -X POST http://localhost:8000/api/hdi/cotizar \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "in_strIDSolicitudAseguradora": "SOL-001",
    "in_strPlaca": "ABC123",
    "in_strNumDoc": "1234567890"
  }'
```

## Project Structure

```
├── app/                 # FastAPI API
├── workers/             # MQTT workers + Selenium bots
│   └── bots/            # One bot per insurer
├── mosquitto/           # MQTT client (aiomqtt)
├── config/              # Configuration and settings
├── scripts/             # Deployment scripts
├── logs/                # Centralized logs (daily rotation)
└── tests/               # Unit and integration tests
```

## Further Documentation

- [Manual Tests](docs/manual-testing.md) — local testing guide
