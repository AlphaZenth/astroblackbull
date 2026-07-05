import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, animate, useInView } from "framer-motion";
import {
  Copy,
  Twitter,
  Rocket,
  Zap,
  Users,
  Shield,
  Infinity as InfinityIcon,
  Flame,
  Check,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import logo from "@/assets/astrologo.jpeg";
import banner from "@/assets/astrobanner.jpeg";
import { StarField } from "@/components/StarField";
import { Meteors } from "@/components/Meteors";
import { CursorLight } from "@/components/CursorLight";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Button } from "@/components/ui/button";

const CONTRACT = "SOON";
const TWITTER = "https://x.com/AstroBlackBull";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Mission", href: "#mission" },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Community", href: "#community" },
];

export function AstroSite() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <LoadingScreen />
      <CursorLight />
      <Navbar />
      <Hero />
      <LiveCounter />
      <About />
      <WhySection />
      <Tokenomics />
      <Roadmap />
      <BuySection />
      <Community />
      <Footer />
    </div>
  );
}

/* -------------------- NAVBAR -------------------- */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-4 z-50 mx-auto flex max-w-6xl items-center justify-between px-4"
    >
      <div
        className={`glass flex w-full items-center justify-between rounded-full px-4 py-2.5 transition-all ${
          scrolled ? "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]" : ""
        }`}
      >
        <a href="#home" className="flex items-center gap-2.5">
          <img
            src={logo}
            alt=""
            className="h-9 w-9 rounded-full object-cover ring-1 ring-white/20"
          />
          <span className="font-display text-sm font-black uppercase tracking-[0.2em] text-chrome">
            Astro Bull
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="group relative text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              {n.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#buy"
            className="group hidden items-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-bold uppercase tracking-widest text-black transition-all hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] sm:flex"
          >
            Buy $ANSTRO
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-full border border-white/10 p-2 md:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass absolute inset-x-4 top-16 flex flex-col gap-3 rounded-2xl p-4 md:hidden"
        >
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="text-xs font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}

/* -------------------- HERO -------------------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      mx.set(nx);
      my.set(ny);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const bullX = useTransform(mx, [-1, 1], [-20, 20]);
  const bullY = useTransform(my, [-1, 1], [-15, 15]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-24"
    >
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -z-10"
      >
        <img
          src={banner}
          alt=""
          className="h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/60" />
      </motion.div>
      <StarField density={200} />
      <Meteors count={6} />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-[1.2fr,1fr]">
        <motion.div style={{ y: titleY, opacity: titleOpacity }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="glass mb-6 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] uppercase tracking-[0.35em] text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            Mission Live · Solana
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1, ease: "easeOut" }}
            className="font-display text-[clamp(3.5rem,10vw,8.5rem)] font-black leading-[0.85] tracking-tight text-chrome"
          >
            ASTRO
            <br />
            <span className="italic font-black">BLACK BULL</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3, duration: 0.8 }}
            className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            The Black Bull started the run.
            <br />
            Astro Black Bull continues the mission.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#buy"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-4 text-sm font-bold uppercase tracking-widest text-black transition-all hover:shadow-[0_0_50px_rgba(255,255,255,0.5)]"
            >
              <Rocket className="h-4 w-4" />
              Buy $ANSTRO
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </a>
            <a
              href={TWITTER}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-sm font-bold uppercase tracking-widest text-foreground backdrop-blur transition-all hover:border-white/40 hover:bg-white/10"
            >
              <Twitter className="h-4 w-4" />
              Join Community
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ x: bullX, y: bullY }}
          className="relative hidden lg:block"
        >
          <div className="animate-float-y">
            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-full bg-white/10 blur-3xl" />
              <img
                src={logo}
                alt="Astro Black Bull mascot"
                className="mx-auto aspect-square w-full max-w-md rounded-full object-cover shadow-[0_0_100px_rgba(255,255,255,0.15)] ring-1 ring-white/20"
              />
            </div>
            <div className="mt-6 text-center font-display text-[10px] uppercase tracking-[0.5em] text-muted-foreground">
              Callsign · The Bull
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-display text-[10px] uppercase tracking-[0.5em] text-muted-foreground"
      >
        Scroll · Initiate Sequence
      </motion.div>
    </section>
  );
}

/* -------------------- LIVE COUNTER -------------------- */
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 2.2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.floor(v)),
    });
    return () => controls.stop();
  }, [inView, value]);
  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

function LiveCounter() {
  const stats = [
    { label: "Mission Progress", value: 87, suffix: "%" },
    { label: "Moon Distance (km)", value: 384400 },
    { label: "Bull Power", value: 9999 },
    { label: "Diamond Hands", value: 4200 },
    { label: "Community", value: 12500 },
  ];
  return (
    <section className="relative border-y border-white/5 py-14">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-6 md:grid-cols-5">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            className="text-center"
          >
            <div className="font-display text-3xl font-black text-chrome md:text-4xl">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* -------------------- ABOUT -------------------- */
function About() {
  return (
    <section id="about" className="relative overflow-hidden py-32">
      <StarField density={60} />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="absolute inset-0 -z-10 rounded-3xl bg-white/5 blur-2xl" />
          <img
            src={logo}
            alt="Astro Black Bull on the moon"
            className="w-full rounded-3xl object-cover shadow-[var(--shadow-elevated)] ring-1 ring-white/10"
          />
          <div className="glass absolute -bottom-6 -right-6 hidden rounded-2xl p-4 sm:block">
            <div className="font-display text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Status
            </div>
            <div className="mt-1 flex items-center gap-2 font-display text-sm font-bold text-foreground">
              <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
              In Transit · Moon
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
        >
          <div className="font-display text-[10px] uppercase tracking-[0.5em] text-muted-foreground">
            Mission Brief · 001
          </div>
          <h2 className="mt-4 font-display text-5xl font-black leading-none text-chrome md:text-6xl">
            No Fear.
            <br />
            No Brakes.
            <br />
            <span className="italic">Only Bull.</span>
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              The Black Bull already started the run. Now Astro Black Bull continues the mission
              across the galaxy — helmet on, horns up, coordinates locked.
            </p>
            <p className="text-foreground/90">
              Built by degens. Fueled by memes. Piloted by the strongest bull in the solar system.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[
              { k: "Origin", v: "Earth" },
              { k: "Destination", v: "The Moon" },
              { k: "Fuel", v: "Pure Bull" },
            ].map((f) => (
              <div key={f.k} className="glass rounded-xl p-3">
                <div className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                  {f.k}
                </div>
                <div className="mt-1 font-display text-sm font-bold text-foreground">{f.v}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------- WHY -------------------- */
function WhySection() {
  const items = [
    { icon: Zap, title: "Bull Strength", desc: "Unbreakable resolve. Charging through every dip." },
    { icon: Rocket, title: "Moon Mission", desc: "Trajectory locked. Destination confirmed." },
    { icon: Users, title: "Community Driven", desc: "The herd is the mission. Every holder counts." },
    { icon: Flame, title: "Meme Energy", desc: "Pure cultural nuclear fusion, weaponized." },
    { icon: Shield, title: "Zero Fear", desc: "0% taxes. 0% panic. 100% conviction." },
    { icon: InfinityIcon, title: "Infinite Bull Run", desc: "Once the horns are up, they don't come down." },
  ];
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <div className="font-display text-[10px] uppercase tracking-[0.5em] text-muted-foreground">
            Manifesto · 002
          </div>
          <h2 className="mt-4 font-display text-5xl font-black text-chrome md:text-7xl">
            Why Astro Bull
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.7 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card p-8 transition-all hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_20px_60px_-20px_rgba(255,255,255,0.15)]"
            >
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/5 blur-2xl transition-all group-hover:bg-white/10" />
              <it.icon className="h-8 w-8 text-foreground/90" strokeWidth={1.5} />
              <h3 className="mt-6 font-display text-xl font-black uppercase tracking-wide text-foreground">
                {it.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
              <div className="mt-6 font-display text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">
                Protocol · 00{i + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- TOKENOMICS -------------------- */
function Tokenomics() {
  const tiles = [
    { k: "Symbol", v: "$ANSTRO" },
    { k: "Network", v: "Solana" },
    { k: "Total Supply", v: "1,000,000,000" },
    { k: "Taxes", v: "0 / 0" },
  ];
  return (
    <section id="tokenomics" className="relative overflow-hidden py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{ background: "radial-gradient(ellipse at center, rgba(255,255,255,0.08), transparent 60%)" }}
      />
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center">
          <div className="font-display text-[10px] uppercase tracking-[0.5em] text-muted-foreground">
            Specs · 003
          </div>
          <h2 className="mt-4 font-display text-5xl font-black text-chrome md:text-7xl">
            Tokenomics
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {tiles.map((t, i) => (
            <motion.div
              key={t.k}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <div className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                {t.k}
              </div>
              <div className="mt-3 font-display text-xl font-black text-chrome md:text-2xl">
                {t.v}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-card p-6"
        >
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Contract Address
            </div>
            <div className="mt-1 font-display text-lg font-bold text-foreground">
              {CONTRACT}
            </div>
          </div>
          <CopyButton text={CONTRACT} />
        </motion.div>
      </div>
    </section>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }}
      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-foreground transition-all hover:border-white/40 hover:bg-white/10"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

/* -------------------- ROADMAP -------------------- */
function Roadmap() {
  const missions = [
    { n: "01", t: "Launch on pump.fun", d: "Ignite engines. Lift off. Herd assembles." },
    { n: "02", t: "Community Growth", d: "The bull calls. The degens answer." },
    { n: "03", t: "Moon Landing", d: "First hooves on lunar dust. Flag planted." },
    { n: "04", t: "Galaxy Expansion", d: "Cross-chain, cross-cluster, cross-orbit." },
    { n: "05", t: "Bull Empire", d: "Every asteroid, every planet — under horns." },
  ];
  return (
    <section id="roadmap" className="relative py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-16 text-center">
          <div className="font-display text-[10px] uppercase tracking-[0.5em] text-muted-foreground">
            Flight Plan · 004
          </div>
          <h2 className="mt-4 font-display text-5xl font-black text-chrome md:text-7xl">
            Mission Roadmap
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/30 to-transparent md:left-1/2" />
          <div className="space-y-8">
            {missions.map((m, i) => (
              <motion.div
                key={m.n}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7 }}
                className={`relative flex items-start gap-6 md:grid md:grid-cols-2 md:gap-16 ${
                  i % 2 === 1 ? "md:[&>div:first-child]:col-start-2" : ""
                }`}
              >
                <div className={`glass rounded-2xl p-6 ${i % 2 === 1 ? "md:text-right" : ""}`}>
                  <div className="font-display text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    Mission {m.n}
                  </div>
                  <div className="mt-2 font-display text-2xl font-black text-foreground">
                    {m.t}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{m.d}</p>
                </div>
                <div className="absolute left-6 top-6 -translate-x-1/2 md:left-1/2">
                  <div className="relative flex h-4 w-4 items-center justify-center">
                    <div className="absolute inset-0 animate-ping rounded-full bg-white/40" />
                    <div className="relative h-3 w-3 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- BUY -------------------- */
function BuySection() {
  return (
    <section id="buy" className="relative overflow-hidden py-32">
      <StarField density={80} />
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="relative overflow-hidden rounded-3xl border border-white/15 bg-card p-10 md:p-14"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.18), transparent 55%)",
            }}
          />
          <div className="relative text-center">
            <div className="font-display text-[10px] uppercase tracking-[0.5em] text-muted-foreground">
              Boarding · 005
            </div>
            <h2 className="mt-3 font-display text-5xl font-black text-chrome md:text-7xl">
              Buy $ANSTRO
            </h2>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground">
              Strap in. Grab your helmet. The next launch window is now.
            </p>

            <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-white/10 bg-background/60 p-4">
              <div className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                Contract
              </div>
              <div className="mt-2 flex items-center justify-between gap-3">
                <code className="truncate font-display text-lg font-bold text-foreground">
                  {CONTRACT}
                </code>
                <CopyButton text={CONTRACT} />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://pump.fun"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-black transition-all hover:shadow-[0_0_60px_rgba(255,255,255,0.6)]"
              >
                <Rocket className="h-4 w-4" />
                Buy on pump.fun
              </a>
              <Button
                variant="outline"
                className="rounded-full border-white/20 bg-white/5 px-8 py-6 text-sm font-bold uppercase tracking-widest hover:bg-white/10"
              >
                Connect Wallet
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------- COMMUNITY -------------------- */
function Community() {
  return (
    <section id="community" className="relative overflow-hidden py-32">
      <div className="absolute inset-0 -z-10">
        <img src={banner} alt="" className="h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
      </div>
      <StarField density={100} />

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr,1.2fr]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative animate-float-y"
          >
            <div className="absolute inset-0 -z-10 rounded-full bg-white/10 blur-3xl" />
            <img
              src={logo}
              alt="Astro Black Bull"
              className="mx-auto aspect-square w-full max-w-sm rounded-full object-cover ring-1 ring-white/20"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <div className="font-display text-[10px] uppercase tracking-[0.5em] text-muted-foreground">
              The Herd · 006
            </div>
            <h2 className="mt-4 font-display text-5xl font-black leading-none text-chrome md:text-7xl">
              Join the
              <br />
              <span className="italic">Herd.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              A bull doesn't run alone. Assemble with the strongest degens in the galaxy.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={TWITTER}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold uppercase tracking-widest text-black transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.5)]"
              >
                <Twitter className="h-4 w-4" />
                Follow on X
              </a>
              <a
                href={TWITTER}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-sm font-bold uppercase tracking-widest text-foreground hover:bg-white/10"
              >
                Join Community
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- FOOTER -------------------- */
function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt=""
            className="h-10 w-10 rounded-full object-cover ring-1 ring-white/20"
          />
          <div>
            <div className="font-display text-sm font-black uppercase tracking-[0.2em] text-chrome">
              Astro Black Bull
            </div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Made for the Bull Market
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <a
            href={TWITTER}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="X / Twitter"
          >
            <Twitter className="h-5 w-5" />
          </a>
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            © {new Date().getFullYear()} Astro Black Bull
          </div>
        </div>
      </div>
    </footer>
  );
}