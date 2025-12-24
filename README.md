# ChaosLog: From Chaos to Clarity

**Maketronics Hiring Challenge Submission**

ChaosLog is an "Industrial Incident Intelligence Hub". It takes the messy, unstructured stream of operational reality—"motor overheating", "shipment delayed", "weird noise in sector 7"—and automatically structures it into actionable categories with severity assessments.

## The "Self-Organizing" Concept

The core philosophy is **Deterministic Chaos Parsing**. Instead of relying on a black-box AI that might hallucinate, ChaosLog uses a `Keyword Density Heuristic` engine. It scans inputs for domain-specific triggers (e.g., "temperature", "failed", "blocked") to assign:
1.  **Category**: Maintenance, Logistics, IT, Security, or General.
2.  **Severity**: Low, Medium, Critical.

This ensures that "Motor fire" is ALWAYS a Critical Maintenance issue, providing the reliability required for industrial systems.

## Project Architecture

This project follows **industry-standard architectural patterns**:
- **Backend**: MVC pattern with separate layers for models, services, controllers, and routes
- **Frontend**: Component-based architecture with services and utilities

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for detailed structure documentation.

## System Architecture

### Tech Stack
- **Frontend**: React (Vite) + TailwindCSS.
    - *Design Choice*: "Dark Glass" aesthetic. High contrast for factory floor visibility.
- **Backend**: Node.js + Express.
    - *Design Choice*: Lightweight, event-driven architecture.
- **Database**: SQLite.
    - *Design Choice*: Zero-configuration, file-based persistence. Perfect for embedded/isolated environments or quick prototypes.

### Project Structure
- `/server`: API and Classification Logic.
- `/client`: Dashboard UX.

## How to Run Locally

### Prerequisites
- Node.js (v18+)

### Steps
1.  **Clone & Install**:
    ```bash
    git clone <repo>
    cd maketronics_challenge
    
    # Install Server
    cd server
    npm install
    
    # Install Client
    cd ../client
    npm install
    ```

2.  **Start Development Mode**:
    - Term 1 (Server): `cd server && npm run dev` (Runs on port 3000)
    - Term 2 (Client): `cd client && npm run dev` (Runs on port 5173)

3.  **Open Browser**:
    Visist `http://localhost:5173`

## Trade-offs & Decisions
1.  **SQLite vs Postgres**: Chosen SQLite for portability and simpler deployment for this specific challenge context.
2.  **Heuristic vs LLM**: Chosen Heuristic for speed and predictability. In a production v2, this would be an ensemble model (Heuristic for speed + LLM for deep analysis).
3.  **UI Density**: Chosen a dense, "Battle Station" view to maximize information on a single screen without scrolling.
