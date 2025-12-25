# ChaosLog: Industrial Incident Intelligence Hub 🚀

**ChaosLog** is a self-organizing system built for the Maketronics Exploratory Challenge. It is designed to transform unstructured operational logs into structured, actionable intelligence in real-time.

## 🧠 Problems Interpreted

Operational environments (factories, warehouses, logistics) generate massive amounts of unstructured data—log messages like *"Motor overheating after 3 hours"* or *"Voltage drop at Node A"*. 

The core challenge is that this data is **"Chaos"**:
1.  **Incompleteness**: Inputs often lack categories or severity levels.
2.  **Noisiness**: Human and machine logs are inconsistent in format.
3.  **Volume**: Without organization, trends like recurring mechanical failures remain hidden.

**ChaosLog** interprets this by turning every raw string into a structured "Incident Entity" with derived categories and priorities.

## 🚀 Approach Used

I used a **Deterministic Heuristic Analysis** approach. 
Instead of relying on black-box AI models which can be slow and unpredictable in a critical industrial setting, I built a custom classification engine that:
- Uses **Weighted Keyword Matching** to identify domain-specific categories (Mechanical, Electrical, Safety, etc.).
- Performs **Sentiment & Context Extraction** to determine severity (Critical vs. Info).
- Automatically **Tags** data for multi-dimensional filtering.
- Ensures the system is **Resilient** by providing defensive defaults for unknown formats, ensuring it never breaks on "noisy" data.

## 🛠️ Technologies Used

### Frontend
- **React**: Modern component-based UI.
- **Vite**: Ultra-fast build tool and dev server.
- **Tailwind CSS**: For a premium "Cyberpunk Terminal" design.
- **Framer Motion**: For smooth micro-animations and loading states.
- **Recharts**: For real-time visual analytics and charting.

### Backend
- **Node.js**: As the runtime environment.
- **Express.js**: Handling RESTful API ingestion, filtering, and stats.
- **MongoDB Atlas**: Scalable cloud database for persistence.
- **Mongoose**: ODM for structured data modeling.

## 🏗️ System Design

The system follows a decoupled **MERN Stack** architecture:
- **`client/`**: A standalone React application that handles user input and visualization.
- **`server/`**: A Node/Express API that processes raw text, interacts with MongoDB, and exposes analytics endpoints.
- **Data Model**: Stores both the `raw_content` (source of truth) and `processed_data` (derived insights) to allow for future re-processing.

## ⚖️ Trade-offs Made

### 1. Heuristics vs. AI
- **Trade-off**: High Accuracy/Latency (AI) vs. High Speed/Determinism (Heuristics).
- **Decision**: Chose Heuristics. In industrial environments, knowing *exactly* why a log was marked "Critical" (based on specific keywords like "Fire" or "Failure") is often more valuable than a probabilistic AI guess.

### 2. Monorepo Structure
- **Trade-off**: Independent scaling vs. Orchestration simplicity.
- **Decision**: Used a monorepo with `client/` and `server/` folders. This allows for a simplified local setup and easier deployment synchronization.

## � How to Run Locally

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd maketronics_challenge
```

### 2. Install Dependencies
Install all dependencies for both the client and server with a single command from the root:
```bash
# Install root manager
npm install

# Install both client and server dependencies
npm run install:all
```

### 3. Environment Variables
Create a `.env` file in the `server/` directory:
```env
PORT=3000
MONGODB_URI=your_mongodb_atlas_connection_string
```

### 4. Start the Project
Run both the frontend and backend concurrently:
```bash
npm run dev
```

- **Frontend**: `http://localhost:5173`
- **Backend**: `http://localhost:3000`
