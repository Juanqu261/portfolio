# EduCAPTCHA

Pausas breves de verificación que enseñan alfabetización mediática dentro de un feed social —
no es un clasificador de "verdad" ni una promesa de precisión para producción.

Desarrollado para el **UNESCO Youth Hackathon 2026**.

---

## 🧭 Arquitectura

```text
frontend/   Producto React/Vite + skins simulados de hosts (Y, Bookface)
backend/    FastAPI, políticas de intervención, sesiones, caché, métricas, catálogo
agents/     Especialistas LangGraph (texto / imagen / gráficas) + prompts
```

```text
UI del host
  → Cliente de riesgo en el frontend
  → Backend FastAPI
  → pretriage / políticas
  → agentes (texto | imagen | gráficas)
  → score de riesgo / gates
  → decisión de reto EduCAPTCHA
```

- Los **agentes** detectan *señales* de riesgo.
- El **backend** decide si interviene y qué reto abrir.
- El **frontend** presenta el EduCAPTCHA y devuelve al usuario a su acción original.

Y y Bookface son **skins simulados de hosts** que demuestran que EduCAPTCHA es agnóstico
a la plataforma. **No** son integraciones reales con las APIs de X/Facebook.

---

## 🛠 Stack

- **Frontend:** React · Vite · Playwright (E2E)
- **Backend:** FastAPI · políticas de intervención · sesiones, caché, métricas
- **Agentes:** especialistas LangGraph para texto, imagen y gráficas (Gemini)
- **Tooling:** workspace de Python con `uv` · Ruff · pytest · Docker · Cloud Run

---

## 🚀 Instalación local

```bash
cp .env.example .env
# Edita GOOGLE_API_KEY y opcionalmente VITE_RISK_API_URL=http://127.0.0.1:8080
```

Un único `.env` en la raíz. El frontend lee las variables `VITE_*` mediante `envDir` de Vite
(raíz del repo). El backend resuelve `PROJECT_ROOT/.env`. Los agentes nunca leen `.env`.

### Frontend

```bash
cd frontend
npm ci
npm run dev          # http://127.0.0.1:5173
```

Con `VITE_RISK_API_URL` vacío → `LearningTriggerEngine` totalmente local (sin red).

### Backend + agentes

```bash
uv sync --frozen --all-packages
uv run --project backend uvicorn app.main:app --reload --app-dir backend --port 8080
```

`ALLOW_NO_LLM=true` ejecuta solo las políticas, sin Gemini.

### Pruebas

```bash
# Frontend
cd frontend && npm run test:full   # build + unit + E2E (incl. proyecto remoto)

# Workspace de Python
uv run ruff check backend agents
uv run pytest backend/tests agents/tests
uv run --project backend python backend/tools/replay_corpus.py --fake --sequential

# Imagen (desde la raíz del repo)
docker build -f backend/Dockerfile -t educaptcha-risk .
```

Guardia contra fuga de secretos (tras un build con variables centinela):

```bash
cd frontend && npm run test:secrets
```

---

## ⚖️ Límites honestos

- Los agentes **no** determinan si algo es verdadero o falso.
- Es un sistema de demo / hackathon, no una promesa de precisión para producción.
- El despliegue en Cloud Run se configura aparte; el repo solo documenta las variables de entorno
  (`VITE_RISK_API_URL`, `CORS_ALLOW_ORIGINS`, `GOOGLE_API_KEY`, …).
