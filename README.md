# ChaosLog: Industrial Incident Intelligence Hub

ChaosLog is a specialized incident parsing engine designed for high-stress industrial environments. It transforms unstructured factory floor reports into structured, actionable intelligence.

## Approach

ChaosLog uses a **Hybrid Inference Strategy**:
1.  **Local AI (Transformer Model)**: Uses `@xenova/transformers` to run a small, efficient model locally for intelligent classification and tagging.
2.  **Heuristic Engine**: A deterministic keyword-based system that ensures 100% reliability for critical safety triggers (e.g., "fire", "smoke").

This dual-layer approach provides both the flexibility of machine learning and the predictability required for industrial safety.

## Technologies

-   **Frontend**: React (Vite), TailwindCSS, Framer Motion, Recharts.
-   **Backend**: Node.js, Express, better-sqlite3.
-   **AI Engine**: Hugging Face Transformers.

## Getting Started

### Prerequisites
-   Node.js (v18+)

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/viraat0700/Chao_Logs.git
    cd Chao_Logs
    ```

2.  **Setup Server**
    ```bash
    cd server
    npm install
    npm run dev
    ```

3.  **Setup Client** (New Terminal)
    ```bash
    cd client
    npm install
    npm run dev
    ```

4.  **Access App**
    Open `http://localhost:5173` in your browser.

## Environment Variables (.env)

Create a `.env` file in the `server` directory:

```env
PORT=3000
DB_PATH=./chaoslog.db
```
