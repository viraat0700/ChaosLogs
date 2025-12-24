# ChaosLog Core 🚀

A real-time log ingestion and intelligent analysis engine designed to turn unstructured system logs into actionable data using local Transformer-based AI and MongoDB.

## 🧠 Problem Interpreted

Modern systems generate massive amounts of unstructured logs ("Chaos"). The challenge is not just storing them, but **interpreting** them in real-time without manual regex writing. 

ChaosLog solves this by:
1. **Ingesting** raw text via a simple REST API.
2. **Classifying** intent (e.g., Maintenance, Security, Network) using NLP.
3. **Escalating** severity based on intent and content (e.g., Critical, Medium, Low).
4. **Visualizing** system health trends via a live dashboard.

## 🏗️ System Design

The system follows a modern, decoupled monorepo architecture:

### 1. Frontend (Root Directory)
- **Tech Stack**: React + Vite + Tailwind CSS + Framer Motion.
- **Role**: Provides a dynamic, glassmorphic UI for real-time log monitoring and system health visualization (using Recharts).

### 2. Backend API (`/api`)
- **Tech Stack**: Node.js + Express.
- **Role**: Orchestrates data flow. It runs a hybrid classification engine combining heuristic analysis with local AI inference.

### 3. Intelligence Layer (`/api/services`)
- **Library**: `@xenova/transformers` (Transformers.js).
- **Model**: `MobileBERT-uncased-mnli` (Zero-shot classification).
- **Function**: Performs on-device/on-server NLP classification without sending data to external LLM providers (like OpenAI), ensuring data privacy.

### 4. Persistence Layer
- **Database**: MongoDB Atlas.
- **Integration**: Mongoose ODM.

## ⚖️ Trade-offs Made

### Local Transformers.js vs. External LLM API
- **Trade-off**: Latency & Cold Starts vs. Cost & Privacy.
- **Decision**: Used Transformers.js locally. This ensures no per-request costs and maximum data privacy. However, it introduces a "cold start" delay on serverless platforms (like Vercel) while the model (~177MB) loads into memory.

### Monorepo Structure
- **Trade-off**: Build Complexity vs. Orchestration Ease.
- **Decision**: Moved frontend to root and backend to `/api` for **Vercel Zero-Config**. This allows a single deployment to handle both static hosting and serverless functions without complex cross-origin configuration.

### Hybrid Classification Engine
- **Trade-off**: Accuracy vs. Performance.
- **Decision**: Implemented a hybrid approach. Heuristics handle obvious keywords instantly, while the AI validates and categorizes complex text. This reduces the burden on the AI model for simple logs.

## 🚀 How to Run Locally

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas URI)

### 2. Environment Setup
Create an `.env` file in the **root** (for frontend) and inside the **/api** folder (for backend).

**api/.env**:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
```

**.env** (root):
```env
VITE_API_URL=http://localhost:3000/api
```

### 3. Installation
```bash
# Install root (frontend) dependencies
npm install

# Install backend dependencies
cd api
npm install
cd ..
```

### 4. Running the App
Open two terminals:

**Terminal 1 (Frontend)**:
```bash
npm run dev
```

**Terminal 2 (Backend)**:
```bash
cd api
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🐋 Docker Support
To run the entire stack via Docker:
```bash
docker-compose up --build
```
