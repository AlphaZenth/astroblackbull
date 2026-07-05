import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "@/assets/astrologo.jpeg.asset.json";
import { StarField } from "./StarField";

export function LoadingScreen() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let p = 0;
    const t = setInterval(() => {
      p += Math.random() * 9 + 2;
      if (p >= 100) {
        p = 100;
        clearInterval(t);
        setTimeout(() => setDone(true), 500);
      }
      setPct(Math.min(100, Math.floor(p)));
    }, 120);
    return () => clearInterval(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          <StarField density={120} />
          <motion.img
            src={logo.url}
            alt="Astro Black Bull"
            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="relative z-10 h-40 w-40 rounded-full object-cover shadow-[0_0_80px_rgba(255,255,255,0.25)] ring-1 ring-white/20"
          />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="relative z-10 mt-8 font-display text-xs uppercase tracking-[0.5em] text-muted-foreground"
          >
            Initiating Mission
          </motion.div>
          <div className="relative z-10 mt-4 h-[2px] w-64 overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-white"
              animate={{ width: `${pct}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          </div>
          <div className="relative z-10 mt-3 font-display text-4xl font-black text-chrome tabular-nums">
            {pct.toString().padStart(3, "0")}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}