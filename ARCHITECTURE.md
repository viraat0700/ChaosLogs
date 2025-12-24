# Project Architecture

## Backend Structure (MVC Pattern)

```
server/
├── index.js                    # Application entry point
├── config/
│   └── database.js            # Database configuration & initialization
├── models/
│   └── Event.js               # Event data model with DB operations
├── services/
│   └── classifierService.js   # Business logic for text classification
├── controllers/
│   └── eventController.js     # Request handlers for API endpoints
├── routes/
│   └── eventRoutes.js         # API route definitions
└── middlewares/               # (Reserved for future use)
```

### Architecture Explanation

**Config Layer** (`config/`)
- `database.js`: Initializes SQLite connection with WAL mode, creates tables

**Model Layer** (`models/`)
- `Event.js`: Data access layer
  - Prepared statements for performance
  - CRUD operations: create, getAll, getStats
  - JSON serialization for tags

**Service Layer** (`services/`)
- `classifierService.js`: Core business logic
  - Keyword-based classification algorithm
  - Category detection (Maintenance, Logistics, Network, Security)
  - Severity assignment (Low, Medium, Critical)
  - Tag extraction

**Controller Layer** (`controllers/`)
- `eventController.js`: Handles HTTP requests/responses
  - `ingestEvent`: POST /api/ingest
  - `getAllEvents`: GET /api/events
  - `getStats`: GET /api/stats
  - Error handling

**Routes Layer** (`routes/`)
- `eventRoutes.js`: Maps URLs to controllers

**Entry Point** (`index.js`)
- Express app setup
- Middleware registration (CORS, JSON parser)
- Route mounting
- Server startup

---

## Frontend Structure (Component-Based)

```
client/src/
├── main.jsx                   # Application entry point
├── App.jsx                    # Main container component
├── components/
│   ├── Header.jsx            # Application header with branding
│   ├── ChaosInput.jsx        # Text input form component
│   ├── LastAnalysis.jsx      # Displays most recent analysis
│   ├── PatternChart.jsx      # Bar chart visualization
│   └── EventStream.jsx       # Live event feed display
├── services/
│   └── api.js                # API client service
├── utils/
│   └── helpers.js            # Utility functions (icons, colors)
└── index.css                 # Global styles & Tailwind config
```

### Component Hierarchy

```
App
├── Header
├── Sidebar (Left Column)
│   ├── ChaosInput
│   ├── LastAnalysis
│   └── PatternChart
└── EventStream (Right Column)
```

### Separation of Concerns

**Services** (`services/`)
- `api.js`: All HTTP communication
  - `ingestEvent(text)`: POST to /api/ingest
  - `getEvents()`: GET from /api/events
  - `getStats()`: GET from /api/stats

**Utils** (`utils/`)
- `helpers.js`: Pure functions
  - `getSeverityColor()`: Maps severity to CSS classes
  - `getCategoryIcon()`: Maps category to Lucide icons

**Components** (`components/`)
- Each component has a single responsibility
- Props-based communication
- No direct API calls (uses `api.js` service)

### State Management

**App.jsx** holds global state:
- `input`: Current textarea value
- `events`: Array of all events
- `stats`: Aggregated statistics
- `loading`: Loading indicator
- `lastAnalysis`: Most recent classification result

State passed down via props to child components.

---

## Design Patterns Used

### Backend
- **MVC Pattern**: Separation of Models, Views (routes), Controllers
- **Singleton**: Database connection, service instances
- **Repository Pattern**: Event model abstracts DB queries
- **Dependency Injection**: Controllers receive services via require()

### Frontend
- **Component Composition**: Small, reusable UI pieces
- **Container/Presentational**: App.jsx (container) vs. components (presentational)
- **Service Layer**: API calls abstracted from components
- **Custom Hooks**: (Potential future improvement with `useEvents`, `useStats`)

---

## Data Flow

### Ingestion Flow
```
User Input → ChaosInput → App.handleSubmit()
          → api.ingestEvent()
          → POST /api/ingest
          → eventController.ingestEvent()
          → classifierService.analyze()
          → EventModel.create()
          → SQLite DB
          → Response → App.setLastAnalysis()
          → LastAnalysis component updates
```

### Retrieval Flow
```
Timer (5s) → App.fetchData()
           → api.getEvents() + api.getStats()
           → GET /api/events + /api/stats
           → eventController.getAllEvents/getStats()
           → EventModel.getAll/getStats()
           → SQLite DB
           → Response → App.setEvents/setStats()
           → EventStream + PatternChart update
```

---

## Benefits of This Structure

### Backend
✅ **Maintainability**: Easy to locate and modify specific functionality
✅ **Testability**: Each layer can be unit tested independently
✅ **Scalability**: Can add middleware, new routes without touching core logic
✅ **Clarity**: Clear separation between data, logic, and presentation

### Frontend
✅ **Reusability**: Components can be used elsewhere
✅ **Readability**: Each file < 100 lines, single responsibility
✅ **Debuggability**: Easier to trace issues to specific components
✅ **Performance**: Can optimize individual components (React.memo, etc.)

---

## Future Enhancements

**Backend:**
- Add middleware for authentication
- Create service for analytics
- Add validation middleware
- Implement rate limiting

**Frontend:**
- Create custom hooks (`useApi`, `usePolling`)
- Add React Context for global state (avoid prop drilling)
- Implement React Router for multi-page navigation
- Add error boundary components
