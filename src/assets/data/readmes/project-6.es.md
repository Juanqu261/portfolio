# Aligo Mission Ledger C2

Plataforma C2 (Command & Control) de **laboratorio autorizado** con ledger blockchain de
**prueba de ejecución**. Desarrollada para la hackathon **Aligo Defensores Informáticos**.

Orquesta nodos modulares con plugins seguros, misiones reutilizables, evidencia verificable
anclada on-chain y un agente de IA que propone misiones bajo aprobación humana.

> **Uso exclusivo en laboratorio cerrado y autorizado.** No es malware ni herramienta ofensiva.

---

## 🧩 Componentes

- **Servidor / API** — FastAPI con documentación Swagger y canal WebSocket para el control en tiempo real de los nodos.
- **Nodos** — agentes modulares con registro, políticas de ejecución, plugins y reporte de salud.
- **Ledger blockchain** — contrato desplegado sobre Hardhat que ancla el hash de cada ejecución, haciendo la evidencia verificable e inalterable.
- **Gateway IoT** — sensores y actuadores simulados integrados al mismo flujo de misiones.
- **Agente de IA** — orquestador basado en Claude que propone misiones; toda ejecución requiere aprobación humana explícita.
- **Dashboard** — frontend para lanzar misiones, seguir nodos y auditar evidencia.

---

## 🛠 Stack

- **Backend:** Python 3.12+ · FastAPI · WebSocket
- **Blockchain:** Hardhat (Ethereum) · contrato de prueba de ejecución
- **Frontend:** Node.js 20+ · npm
- **Infraestructura:** despliegue local, Docker y Google Cloud

---

## 🚀 Inicio rápido

```bash
cp .env.example .env
python dev.py
```

Eso levanta la cadena Hardhat, despliega el contrato, el servidor API, el frontend, nodos
simulados y el gateway IoT. Abre:

- **Dashboard:** https://127.0.0.1:5173
- **API (Swagger):** https://127.0.0.1:8000/docs

Opciones útiles: `python dev.py --no-tls`, `python dev.py --no-iot`, `python dev.py --help`.

---

## 📚 Documentación

El repositorio incluye documentación técnica detallada en [`docs/`](https://github.com/ybedoyab/aligo-c2/tree/main/docs):
arquitectura y protocolo WebSocket, ledger y verificación de evidencia, registro y políticas de
nodos, gateway IoT, escaneo de vulnerabilidades lab-safe, modelo de amenazas y límites éticos,
guías de despliegue y el guion de demo.

---

## 👥 Equipo UNcontrolled

Yulian Bedoya · Alejandro Feria · Marycielo Berrio · Juan Fernando Quintero · Yulieth Urrego
