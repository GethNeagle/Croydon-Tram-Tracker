import React, { useState, useMemo, useRef, useEffect } from "react";
import { Search, MapPin, X, Navigation } from "lucide-react"; 
import { Input } from "../components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import TRAM_STATIONS from "../lib/tramStations";

export default function StationSearch({ selectedStation, onSelect }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const filtered = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return TRAM_STATIONS;
    return TRAM_STATIONS.filter((s) =>
      s.name.toLowerCase().includes(trimmed) ||
      s.lines?.some(line => line.toLowerCase().includes(trimmed)) 
    );
  }, [query]);

  useEffect(() => {
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleClick);
    return () => document.removeEventListener("pointerdown", handleClick);
  }, []);

  const getLineBadgeStyle = (line) => {
    if (line.includes("Wimbledon")) return "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300";
    if (line.includes("Beckenham")) return "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300";
    return "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300";
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-lg mx-auto z-[100]">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          ref={inputRef}
          placeholder="Search for a tram stop (e.g., East Croydon)..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          className="pl-12 pr-10 h-14 text-base bg-card border-border rounded-2xl shadow-sm focus:shadow-md transition-shadow"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 touch-manipulation"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {open && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            /* UPDATED CSS CLASSES BELOW:
              - Changed max-h-72 to max-h-[60vh] so it scales vertically based on the screen height.
              - Ensured overflow-y-auto is set directly on the animated container.
              - Added a subtle bottom border check and smooth scrollbar properties.
            */
            className="absolute left-0 right-0 z-[110] mt-2 bg-card border border-border rounded-2xl shadow-xl overflow-hidden max-h-[60vh] overflow-y-auto overscroll-contain snap-y"
          >
            {filtered.map((station) => (
              <button
                key={station.id}
                type="button"
                onClick={() => {
                  onSelect(station);
                  setQuery(station.name);
                  setOpen(false);
                }}
                /* Increased py-3.5 to py-4 for touch-friendly targets on mobile screens */
                className={`w-full flex items-center justify-between gap-3 px-4 py-4 text-left border-b border-border/40 last:border-0 hover:bg-muted/60 active:bg-muted transition-colors touch-manipulation snap-start ${
                  selectedStation?.id === station.id
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-foreground"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <MapPin className="w-4 h-4 shrink-0 text-primary" />
                  <span className="font-medium text-sm truncate">{station.name}</span>
                </div>
                
                {station.lines && (
                  <div className="flex gap-1 shrink-0">
                    {station.lines.map((line, idx) => (
                      <span key={idx} className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${getLineBadgeStyle(line)}`}>
                        {line.split(" ")[0]}
                      </span>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}