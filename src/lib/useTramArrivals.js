import { useState, useEffect, useCallback } from "react";

const API_BASE = "https://api.tfl.gov.uk";

export default function useTramArrivals(stationId) {
  const [arrivals, setArrivals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchArrivals = useCallback(async () => {
    if (!stationId) return;
    setLoading(true);
    setError(null);
    
    const res = await fetch(`${API_BASE}/StopPoint/${stationId}/Arrivals`);
    if (!res.ok) {
      setError("Failed to fetch arrivals");
      setLoading(false);
      return;
    }
    
    const data = await res.json();
    
    const sorted = data
      .map((a) => ({
        id: a.id,
        destination: a.destinationName,
        towards: a.towards,
        platform: a.platformName,
        timeToStation: a.timeToStation,
        expectedArrival: a.expectedArrival,
        vehicleId: a.vehicleId,
        direction: a.direction,
      }))
      .sort((a, b) => a.timeToStation - b.timeToStation);
    
    setArrivals(sorted);
    setLastUpdated(new Date());
    setLoading(false);
  }, [stationId]);

  useEffect(() => {
    fetchArrivals();
    const interval = setInterval(fetchArrivals, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, [fetchArrivals]);

  return { arrivals, loading, error, lastUpdated, refresh: fetchArrivals };
}