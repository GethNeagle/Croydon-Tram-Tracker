import React from "react";
import { RefreshCw, Clock, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import ArrivalRow from "./ArrivalRow";

export default function ArrivalBoard({ station, arrivals, loading, error, lastUpdated, onRefresh }) {
  if (!station) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-lg mx-auto mt-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-1 mb-3">
        <div>
          <h2 className="text-lg font-bold text-foreground">{station.name}</h2>
          {lastUpdated && (
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <Clock className="w-3 h-3" />
              Updated {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onRefresh}
          disabled={loading}
          className="rounded-xl"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </div>

      {/* Board */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        {error && (
          <div className="flex items-center gap-3 px-5 py-4 text-destructive">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {loading && arrivals.length === 0 && (
          <div className="px-5 py-10 text-center">
            <div className="w-8 h-8 border-3 border-muted border-t-primary rounded-full animate-spin mx-auto" />
            <p className="text-sm text-muted-foreground mt-3">Loading arrivals…</p>
          </div>
        )}

        {!loading && !error && arrivals.length === 0 && (
          <div className="px-5 py-10 text-center">
            <p className="text-sm text-muted-foreground">No trams scheduled at this stop right now.</p>
          </div>
        )}

        <AnimatePresence mode="wait">
          <div className="divide-y divide-border">
            {arrivals.map((arrival, i) => (
              <ArrivalRow key={arrival.id} arrival={arrival} index={i} />
            ))}
          </div>
        </AnimatePresence>
      </div>

      <p className="text-center text-[11px] text-muted-foreground mt-4">
        Live data from TfL · Refreshes every 30 seconds
      </p>
    </motion.div>
  );
}