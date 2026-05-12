# Eurovision Sync Server

A robust, real-time synchronization server designed to orchestrate state between a **Detection Server** (Admin) and multiple **Frontend Clients**.

## 🚀 Overview

The Sync Server acts as the central hub for the Eurovision Party experience. It maintains the current state of the live show (which act is performing, which show is active) and broadcasts this information instantly via WebSockets.

## 🛠 Features

- **Real-time Broadcast**: Instant state updates to all connected clients via WebSockets.
- **Live Notifications**: Push global messages/toasts to all users with auto-timeout.
- **Admin API**: Secure HTTP endpoint for the Detection Server to push updates.
- **Validation**: Strict request validation using Zod.
- **Interactive Documentation**: Built-in Swagger/OpenAPI documentation.
- **Reliability**: Heartbeat mechanism to manage stale WebSocket connections.
- **Test Mode**: Automated simulation mode for UI development without external dependencies.

## 📖 API Documentation

The server provides interactive API documentation via Swagger.

- **URL**: `http://localhost:8080/docs` (default port)

### Admin HTTP API

Used by the Detection Server to update the live state.

- **Endpoint**: `POST /admin/state`
- **Auth**: `Authorization: Bearer <ADMIN_TOKEN>`
- **Payload**:
  ```json
  {
    "actId": "sweden-2026",
    "showId": "grand-final",
    "isLive": true
  }
  ```

### WebSocket API (Clients)

- **Endpoint**: `ws://<server-url>`
- **Messages**:
  - `ACT_CHANGE`: `{ "type": "ACT_CHANGE", "actId": "sweden-2026" }`
  - `SHOW_CHANGE`: `{ "type": "SHOW_CHANGE", "showId": "grand-final" }`

## 🚦 Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

```bash
cd SyncServer
npm install
```

### Configuration

Create a `.env` file in the `SyncServer` root (or use `.env.example` as a template):

```env
PORT=8080
ADMIN_TOKEN=your_secure_random_token
TEST_MODE=false
```

### Running the Server

**Development Mode (Auto-reload)**
```bash
npm run dev
```

**Production Build**
```bash
npm run build
npm start
```

**Simulation Mode**
To simulate a Detection Server pushing updates:
```bash
npm run sim
```

## 🧪 Testing

The project includes an end-to-end test suite using Vitest.

```bash
npm test
```

## 📜 Standards & Safety

- **OpenAPI 3.0**: Fully compliant API schema.
- **Security**: Admin token required for all state-mutating requests. No secrets are committed to the repository.
- **CORS**: Configured to allow cross-origin requests from the party frontend.

---
Built for Edd's Eurovision Party 2026.
