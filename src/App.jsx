import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ChaosInput from './components/ChaosInput';
import LastAnalysis from './components/LastAnalysis';
import PatternChart from './components/PatternChart';
import EventStream from './components/EventStream';
import { api } from './services/api';

function App() {
  const [input, setInput] = useState('');
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({ categories: [], severities: [] });
  const [loading, setLoading] = useState(false);
  const [lastAnalysis, setLastAnalysis] = useState(null);

  const fetchData = async () => {
    try {
      const [eventsData, statsData] = await Promise.all([
        api.getEvents(),
        api.getStats()
      ]);
      setEvents(eventsData);
      setStats(statsData);
    } catch (e) {
      console.error('Connection lost', e);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    try {
      const data = await api.ingestEvent(input);
      setLastAnalysis(data.analysis);
      setInput('');
      fetchData();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 text-gray-300">
      <Header />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <ChaosInput
            input={input}
            setInput={setInput}
            onSubmit={handleSubmit}
            loading={loading}
          />
          <LastAnalysis analysis={lastAnalysis} />
          <PatternChart stats={stats} />
        </div>

        <EventStream events={events} />
      </div>
    </div>
  );
}

export default App;
