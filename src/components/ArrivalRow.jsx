import React from "react";
import { motion } from "framer-motion";
import { Train } from "lucide-react";

function formatTime(seconds) {
  if (seconds < 60) return "Due";
  const mins = Math.floor(seconds / 60);
  return `${mins} min`;
}

export default function ArrivalRow({ arrival, index }) {
  const isDue = arrival.timeToStation < 60;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex items-center gap-4 px-5 py-4 hover:bg-muted/40 transition-colors"
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
        isDue ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
      }`}>
        <Train className="w-5 h-5" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-foreground truncate">
          {arrival.destination}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">
          {arrival.platform}
        </p>
      </div>

      <div className="text-right shrink-0">
        <p className={`font-mono font-bold text-base ${
          isDue ? "text-primary" : "text-foreground"
        }`}>
          {formatTime(arrival.timeToStation)}
        </p>
        {isDue && (
          <span className="inline-block mt-0.5 text-[10px] uppercase tracking-wider font-bold text-primary animate-pulse">
            Arriving
          </span>
        )}
      </div>
    </motion.div>
  );
}