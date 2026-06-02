import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const POPULAR = [
  { id: "940GZZCRECR", name: "East Croydon" },
  { id: "940GZZCRWCR", name: "West Croydon" },
  { id: "940GZZCRWMB", name: "Wimbledon" },
  { id: "940GZZCRELM", name: "Elmers End" },
  { id: "940GZZCRBEK", name: "Beckenham Junction" },
  { id: "940GZZCRNWA", name: "New Addington" },
];

export default function PopularStations({ onSelect }) {
  return (
    <div className="w-full max-w-lg mx-auto mt-8">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-1">
        Popular stops
      </p>
      <div className="grid grid-cols-2 gap-2">
        {POPULAR.map((station, i) => (
          <motion.button
            key={station.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            onClick={() => onSelect(station)}
            className="flex items-center gap-2.5 px-4 py-3 bg-card border border-border rounded-xl hover:border-primary/40 hover:bg-primary/5 transition-all text-left group"
          >
            <MapPin className="w-4 h-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-foreground truncate">{station.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}