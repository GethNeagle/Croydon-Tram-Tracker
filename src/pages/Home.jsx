import React, { useState } from "react";
import { Train } from "lucide-react";
import { motion } from "framer-motion";
import StationSearch from "../components/StationSearch";
import ArrivalBoard from "../components/ArrivalBoard";
import PopularStations from "../components/PopularStations";
import useTramArrivals from "../lib/useTramArrivals";

export default function Home() {
  const [selectedStation, setSelectedStation] = useState(null);
  const { arrivals, loading, error, lastUpdated, refresh } = useTramArrivals(
    selectedStation?.id
  );

  const handleSelect = (station) => {
    setSelectedStation(station);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-primary/4" />
        <div className="relative px-4 pt-12 pb-8 sm:pt-16 sm:pb-10 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary text-primary-foreground mb-4 shadow-lg shadow-primary/20">
              <Train className="w-7 h-7" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-heading">
              Croydon Tram
            </h1>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base">
              Live departure times for London Tramlink
            </p>
          </motion.div>

          <StationSearch
            selectedStation={selectedStation}
            onSelect={handleSelect}
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-16">
        {selectedStation ? (
          <ArrivalBoard
            station={selectedStation}
            arrivals={arrivals}
            loading={loading}
            error={error}
            lastUpdated={lastUpdated}
            onRefresh={refresh}
          />
        ) : (
          <PopularStations onSelect={handleSelect} />
        )}
      </div>
    </div>
  );
}