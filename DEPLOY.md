# Deployment Guide

This application is containerized with **Docker** to support Local AI and SQLite persistence.

## 1. Why Docker?
- **SQLite**: requires a writable file (`chaoslog.db`). Serverless platforms (like standard Vercel) delete files when they restart.
- **Local AI**: runs in memory and needs a consistent environment.

## 2. Deploying to Render (Recommended)
**Render** offers simple container hosting with persistent disks.

1.  Push your code to **GitHub**.
2.  Create a **Web Service** on Render connected to your repo.
3.  **Environment**: Select `Docker`.
4.  **Persistent Disk (Crucial)**:
    - Add a **Disk** in the advanced settings.
    - Name: `chaoslog-data`
    - Mount Path: `/data` (This matches our Docker configuration).
5.  **Environment Variables**:
    - Add `DB_PATH=/data/chaoslog.db`
    - Add `PORT=3000`
6.  **Deploy**: Render will build your Dockerfile and start the app. The database will be saved to the persistent disk, safe from restarts.

## 3. Running Locally with Docker

To test the production build on your machine:

```bash
docker-compose up --build
```

This will:
- Build the React frontend.
- Build the Node backend.
- Start the server on `http://localhost:3000`.
- Save database data to a `data/` folder in your project root.
