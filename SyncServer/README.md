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

The server provides interactive API documentation via Swagger at `http://localhost:8080/docs`.

---

## 🔐 Admin Connection Guide

The **Detection Server** (or any admin tool) communicates with the Sync Server via a secure HTTP POST endpoint.

### 1. Authentication
All requests to the admin endpoint must include a Bearer Token in the headers. 
- **Header**: `Authorization: Bearer <ADMIN_TOKEN>`
- **Token**: Defined in your `.env` file. If not set, it defaults to `development_fallback_token`.
- **Tip**: Run `bun run start:debug` to see the active token logged on boot.

### 2. Updating Live State
**Endpoint**: `POST /admin/state`

#### Payload Options:
You can update one or all of these fields in a single request.

| Field | Type | Description |
| :--- | :--- | :--- |
| `actId` | `string` | The ID of the currently performing country (e.g., `"sweden-2026"`). |
| `showId` | `string` | The ID of the current show (e.g., `"grand-final"`). |
| `isLive` | `boolean` | Whether the show is currently "active" or in a break. |

**Example Request (cURL):**
```bash
curl -X POST http://localhost:8080/admin/state \
  -H "Authorization: Bearer development_fallback_token" \
  -H "Content-Type: application/json" \
  -d '{"actId": "uk-2026", "isLive": true}'
```

### 3. Sending Global Messages (Toasts)
You can push a notification to all connected clients by including a `message` object.

| Field | Type | Description |
| :--- | :--- | :--- |
| `text` | `string` | The message to display. |
| `type` | `string` | `info`, `success`, `warning`, or `error`. (Default: `info`) |
| `duration`| `number` | How long to show the message in ms. (Default: `5000`) |

**Example Request:**
```bash
curl -X POST http://localhost:8080/admin/state \
  -H "Authorization: Bearer development_fallback_token" \
  -H "Content-Type: application/json" \
  -d '{
    "message": {
      "text": "Voting is now OPEN!",
      "type": "success",
      "duration": 10000
    }
  }'
```

### 4. Troubleshooting
If you are having trouble connecting:
1. **Enable Debug Mode**: Run `bun run start:debug`.
2. **Check Logs**: The server will log every HTTP request and WebSocket upgrade attempt.
3. **Verify Token**: Ensure your `Authorization` header exactly matches the token logged on boot.
4. **IP Address**: If running in Docker or on a separate machine, ensure you are hitting the correct IP/port and that CORS is not an issue.

---

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
