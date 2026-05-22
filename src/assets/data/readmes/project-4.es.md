# Agentic DevStudio: Framework de Orquestación Multi-Developer

## Objetivo
Ofrecer un entorno descentralizado y multiusuario en el que equipos de humanos y agentes colaboren sobre una misma base de código. Cada "Developer" es un **Power-Pod** (Humano + Equipo de Agentes) que construye componentes modulares de forma aislada, sincronizados por una capa de memoria global y orquestación automática vía Git.

---

## Arquitectura: el modelo "Pod Descentralizado"

### 1. El Power-Pod (por developer)
Cada integrante del equipo opera su propio stack de SDLC:
*   **LangGraph Pod:** orquesta los agentes Builder y QA locales.
*   **CopilotKit:** interfaz para que el developer humano asigne tareas.
*   **A2UI:** renderiza previews locales del componente que se está construyendo.

### 2. Capa Axiom Global (ChromaDB Cloud)
Para mantener al equipo sincronizado sin disparar el costo en tokens:
*   **Indexación de Axiomas:** cada vez que se mergea una rama, un agente genera un resumen semántico de los cambios y lo guarda como **axiomas** en ChromaDB Cloud, compartidos entre todos los pods.
*   **Inyección de Axiomas:** cuando el Dev B arranca la "Home Page", su agente Architect consulta la capa: *"¿cuál es el estado del Login Form?"*. Recibe los endpoints y nombres de componentes creados por el Dev A, garantizando consistencia de naming e integración.

### 3. El "Semáforo" (Orquestación Git)
Para prevenir merge conflicts y errores humanos:
*   **Branching automático:** las tareas se acotan estrictamente a feature branches.
*   **Pre-Flight Check:** el **Reviewer Agent** ejecuta tests automáticos y un "Conflict Analysis" contra `main` antes de cualquier commit.
*   **Integración CI/CD:** los agentes interactúan con GitHub Actions para reportar el estado del build al dashboard de CopilotKit.

---

## Flujo: el SDLC modular

1.  **Asignación de tarea:** el humano asigna `feat/login` a su pod.
2.  **Context Pull:** el Architect consulta la capa de axiomas por patrones de UI y constantes compartidas.
3.  **Build autónomo:** el Builder Agent edita archivos vía **MCP (Filesystem Tool)**.
4.  **QA local:** el QA Agent corre tests en una **MCP Terminal** aislada.
5.  **Sync con el Semáforo:** el agente abre un PR. Si hay conflicts con `main`, el **Architect** propone una resolución al humano.

---

## Quick Start

### 1. Prerrequisitos

```powershell
# Instalar uv (gestor de paquetes de Python)
pip install uv

# Clonar y entrar al repo
git clone https://github.com/your-org/agentic_dev.git
cd agentic-devstudio

# Instalar todas las dependencias
uv sync --all-packages
uv sync --all-extras

# Configurar entorno
Copy-Item .env.example .env
# Abre .env y define POD_BRAIN_GEMINI_API_KEY
```

### 2. Iniciar los servicios de backend (Windows)

```powershell
# Apunta al repo en el que quieres que trabajen los agentes
.\scripts\start_services.ps1
```

Esto abre **tres ventanas de terminal** automáticamente:

| Ventana | Servicio | Puerto |
|---|---|---|
| Verde   | `pod-memory` — índice semántico ChromaDB | 8000 |
| Amarilla | `pod-mcp` — herramientas de filesystem / shell / git | 8001 |
| Magenta | `studio-api` — API de orquestación de agentes | 8080 |

Espera ~10 segundos a que cargue el modelo sentence-transformer antes de mandar requests.

> **`-TargetRepo`** indica el directorio raíz que los agentes Builder y QA podrán leer y escribir. Debe ser una ruta absoluta a un directorio existente (tu proyecto clonado). También puedes definir `TARGET_REPO_PATH` en `.env` y omitir la flag.

### 3. Iniciar el frontend (UI Next.js)

La UI vive en `apps/studio-ui`. Envía tareas a `studio-api`, transmite progreso en vivo y muestra el modal de revisión humana cuando hay un interrupt.

```powershell
cd apps\studio-ui

# Instalar dependencias JS (solo la primera vez)
npm install

# Apuntar la UI a studio-api (por defecto http://localhost:8000)
"NEXT_PUBLIC_API_BASE_URL=http://localhost:8080" | Out-File -Encoding utf8 .env.local

# Levantar el dev server (Turbopack)
npm run dev
```

Abre <http://localhost:3000>, rellena la tarea y `target_repo`, envía y observa el log de actividad en streaming. Cuando el agente pause para revisión, aprueba o envía instrucciones desde el modal.

Otros scripts:

| Comando | Propósito |
|---|---|
| `npm run dev` | Dev server con hot reload (puerto 3000) |
| `npm run build` | Build de producción |
| `npm run start` | Ejecuta el build de producción |
| `npm run lint` | Lint con Next/ESLint |

### 4. Lanza tu primera tarea

```powershell
# Inicia una nueva ejecución de agentes — reemplaza los valores con tu tarea y repo
curl -N -X POST http://localhost:8080/api/run `
  -H "Content-Type: application/json" `
  -d '{
    "task": "Create a simple hello world webpage for kids using HTML, CSS, and JavaScript (basics).",
    "target_repo": "example",
    "thread_id": "dev1-task1"
  }'
```

La respuesta es un **stream de Server-Sent Events**. Verás eventos como:
```
data: {"type": "NODE_STARTED", "data": {"node": "architect", "label": "Architect is planning..."}}
data: {"type": "INTERRUPT", "data": {"message": "Human review required.", "thread_id": "dev1-task1"}}
```

Cuando recibas `INTERRUPT`, inspecciona el plan de diseño y reanuda:

```powershell
# Aprueba el plan y deja al Builder continuar
curl -X POST http://localhost:8080/api/resume `
  -H "Content-Type: application/json" `
  -d '{
    "thread_id": "dev1-task1",
    "approved": true,
    "comment": "Looks good, proceed"
  }'
```

### 5. Opcional — indexa el repo objetivo para contexto semántico

Antes de correr tareas, indexa el repo objetivo para que el Architect tenga consciencia de la base de código:

```powershell
curl -X POST http://localhost:8000/index `
  -H "Content-Type: application/json" `
  -d '{
    "repo_path": "C:\\path\\to\\your\\target-repo",
    "repo_id": "org/my-app"
  }'
# Devuelve: {"indexed": 142, "repo_id": "org/my-app"}
```

> **`repo_id`** es un identificador libre del repo (p. ej. `"org/my-app"`). Debe coincidir con el campo `target_repo` que envías a `/api/run`: el Architect lo usa para consultar los axiomas correctos en ChromaDB.

---

## Setup del Ecosistema (actualizado)

### Paso 1: el Registro Global
*   Levanta **ChromaDB Cloud** (o una instancia self-hosted) como almacén compartido de axiomas accesible por todos los pods.

### Paso 2: Middleware de GitHub / Git
*   Inicializa el **Git-Gatekeeper MCP Server**. Permite a los agentes ejecutar `git checkout -b`, `git pull` y `gh pr create` según el estado de la tarea.

### Paso 3: Indexado semántico
*   Ejecuta el script `index-project` para generar el "mapa" arquitectónico inicial del repo existente, listo para que los agentes lo lean.

---

## La visión: "Autonomía Component-Driven"
Al enfocarnos en **componentes específicos** en lugar de toda la app, minimizamos el "ruido" que el LLM debe procesar. Construimos la app como bloques de Lego — cada developer (Humano + Agente) se asegura de que su bloque esté perfecto antes de que el Git-Gatekeeper lo encaje en el proyecto maestro.
