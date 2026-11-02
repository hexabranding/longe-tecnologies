import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  animate,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { z } from "zod";
import { toast } from "sonner";
import {
  Laptop, Monitor, MonitorSmartphone, Keyboard, Cpu, DatabaseBackup, MemoryStick, AppWindow,
  ShieldCheck, Wrench, FileCheck2, Users, BadgeIndianRupee, Zap, PackageCheck, Headphones,
  PhoneCall, Search, Truck, Phone, Mail, MapPin, MessageCircle, Menu, X, ArrowRight,
  CheckCircle2, Briefcase, Facebook, Instagram, Linkedin, Twitter, Star, Clock, Send, ChevronUp,
  Navigation, ExternalLink, Building2, Printer, Cctv, ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ApplyDialog, POSITIONS } from "@/components/site/ApplyDialog";
import heroImg from "@/assets/hero-repair.jpg";
import aboutImg from "@/assets/about-workshop.jpg";
import logoImg from "@/assets/logo.png";
import logoWhiteImg from "@/assets/logo-white.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Longe Technologies — Laptop & Computer Repair Experts" },
      { name: "description", content: "Professional laptop & desktop repair, screen replacement, data recovery, upgrades and AMC across Kerala in Kozhikode, Kannur and Thiruvananthapuram." },
      { property: "og:title", content: "Longe Technologies — Laptop & Computer Repair Experts" },
      { property: "og:description", content: "Reliable laptop & computer repair with quality parts, quick turnaround and genuine support in Kozhikode, Kannur & Thiruvananthapuram." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const PHONE = "+91 7558 916 777";
const EMAIL = "longetechnologies@outlook.com";
const ADDRESS = "Door No: 35/2458/D Kanakassery Building, Near Lulu Mall, Mini Bypass Rd, Mankave, Kozhikode, Kerala 673007";
const WHATSAPP = "https://wa.me/917558916777?text=" + encodeURIComponent("Hi Longe Technologies, I need help with my laptop / computer.");

const BRANCHES = [
  {
    id: "kozhikode",
    city: "Kozhikode",
    area: "Mankave",
    type: "Head Office",
    isHeadOffice: true,
    door: "Door No: 35/2458/D Kanakassery Building, Near Lulu Mall, Mini Bypass Rd, Mankave, Kozhikode, Kerala 673007",
    landmark: "Near Lulu Mall, Mini Bypass Rd, Mankave",
    phone: "+91 7558 916 777",
    tel: "+917558916777",
    email: "longetechnologies@outlook.com",
    mapQuery: "Kanakassery Building, Mini Bypass Rd, Mankave, Kozhikode, Kerala 673007",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Door No: 35/2458/D Kanakassery Building Near Lulu Mall Mini Bypass Rd Mankave Kozhikode Kerala 673007"),
    whatsappUrl: "https://wa.me/917558916777?text=" + encodeURIComponent("Hi Longe Technologies (Kozhikode Head Office), I need service support."),
  },
  {
    id: "kannur",
    city: "Kannur",
    area: "Thana",
    type: "Branch",
    isHeadOffice: false,
    door: "Door No: 656, 1st Floor, Delta Tower, Thana, Kannur, Kerala 670012",
    landmark: "1st Floor, Delta Tower, Thana",
    phone: "+91 7025 916 777",
    tel: "+917025916777",
    email: "longetechnologies@outlook.com",
    mapQuery: "Delta Tower, Thana, Kannur, Kerala 670012",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Delta Tower Thana Kannur 670012"),
    whatsappUrl: "https://wa.me/917025916777?text=" + encodeURIComponent("Hi Longe Technologies (Kannur Branch), I need service support."),
  },
  {
    id: "trivandrum",
    city: "Thiruvananthapuram",
    area: "Kaimanam, Pappanamcode",
    type: "Branch",
    isHeadOffice: false,
    door: "Door: 52/237/7, KBN Tower Kaimanam, Pappanamcode, Thiruvananthapuram, Kerala 695040",
    landmark: "KBN Tower Kaimanam, Pappanamcode",
    phone: "+91 7510 916 777",
    tel: "+917510916777",
    email: "longetechnologies@outlook.com",
    mapQuery: "KBN Tower Kaimanam Pappanamcode Thiruvananthapuram Kerala 695040",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("KBN Tower Kaimanam Pappanamcode Thiruvananthapuram Kerala 695040"),
    whatsappUrl: "https://wa.me/917510916777?text=" + encodeURIComponent("Hi Longe Technologies (Trivandrum Branch), I need service support."),
  },
] as const;

const NAV = [
  ["Home", "home"], ["About", "about"], ["Services", "services"], ["Why Us", "why"],
  ["Process", "process"], ["Careers", "careers"], ["Contact", "contact"],
] as const;

const SERVICES = [
  {
    icon: Laptop,
    title: "Laptop & Desktop Sales & Service",
    desc: "Brand new system sales, custom PC builds, and complete diagnosis and repair for all brands.",
    badge: "Sales & Service",
  },
  {
    icon: Cpu,
    title: "Laptop Chip Level Service",
    desc: "Advanced motherboard BGA rework, micro-soldering, short-circuit troubleshooting & power IC fixes.",
    badge: "Chip Level",
  },
  {
    icon: ShoppingBag,
    title: "Used Laptop Sales",
    desc: "Fully tested, high-quality certified pre-owned laptops with warranty support at great prices.",
    badge: "Certified Pre-Owned",
  },
  {
    icon: Printer,
    title: "Printer Sales & Service",
    desc: "LaserJet, Inkjet, and thermal printer repair, cartridge toner refilling, printhead service & new sales.",
    badge: "Printers",
  },
  {
    icon: Cctv,
    title: "CCTV Installation & Service",
    desc: "End-to-end security camera setup, DVR/NVR configuration, mobile live-view, cabling & maintenance.",
    badge: "Surveillance",
  },
  {
    icon: DatabaseBackup,
    title: "Data Recovery",
    desc: "Safe data extraction and restoration from failed hard disks, SSDs, formatted drives & corrupt OS.",
    badge: "Data Care",
  },
  {
    icon: ShieldCheck,
    title: "Multi-Brand Warranty Support",
    desc: "Authorized-grade repairs and warranty assistance for HP, Dell, Lenovo, Asus, Acer, Apple & more.",
    badge: "Warranty Support",
  },
  {
    icon: FileCheck2,
    title: "AMC (Annual Maintenance Contract)",
    desc: "Proactive IT maintenance, regular servicing, and prioritized breakdown support for offices and homes.",
    badge: "AMC Contracts",
  },
  {
    icon: AppWindow,
    title: "Software Installation",
    desc: "Genuine OS setup (Windows/macOS/Linux), drivers, antivirus security, and specialized software setup.",
    badge: "Software & OS",
  },
  {
    icon: Truck,
    title: "Onsite Desktop & Laptop Service",
    desc: "Doorstep service engineer visits to your residence or office for immediate diagnosis and on-the-spot repair.",
    badge: "Doorstep Onsite",
  },
] as const;

const WHY = [
  { icon: Users, title: "Experienced Technicians", desc: "Certified engineers with years of hands-on repair experience." },
  { icon: BadgeIndianRupee, title: "Affordable Pricing", desc: "Transparent quotes before any work begins. No surprises." },
  { icon: Zap, title: "Quick Service", desc: "Most repairs completed same day or within 24–48 hours." },
  { icon: PackageCheck, title: "Quality Parts", desc: "Genuine and high-grade parts backed by service warranty." },
  { icon: Headphones, title: "Customer Support", desc: "Friendly updates and after-service support whenever needed." },
];

const PROCESS = [
  { icon: PhoneCall, title: "Contact", desc: "Call, WhatsApp or visit us and describe the issue." },
  { icon: Search, title: "Inspection", desc: "Free diagnosis with a clear, upfront estimate." },
  { icon: Wrench, title: "Repair", desc: "Expert repair using quality parts and careful handling." },
  { icon: Truck, title: "Delivery", desc: "Tested, cleaned and handed back ready to go." },
];

const JOBS = [
  { title: POSITIONS[0], icon: Laptop, desc: "Hardware troubleshooting, laptop repair and maintenance.", tags: ["Full-time", "On-site", "1+ yrs preferred"], points: ["Chip & component-level diagnosis", "Laptop & desktop repairs", "Preventive maintenance"] },
  { title: POSITIONS[1], icon: Briefcase, desc: "Customer handling, service scheduling and engineer coordination.", tags: ["Full-time", "On-site", "Freshers welcome"], points: ["Front-desk customer handling", "Service job scheduling", "Coordinating with engineers"] },
];

const fade = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "zoom";
  className?: string;
}) {
  const getVariants = () => {
    switch (direction) {
      case "left":
        return { hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0 } };
      case "right":
        return { hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0 } };
      case "down":
        return { hidden: { opacity: 0, y: -32 }, show: { opacity: 1, y: 0 } };
      case "zoom":
        return { hidden: { opacity: 0, scale: 0.92, y: 20 }, show: { opacity: 1, scale: 1, y: 0 } };
      case "up":
      default:
        return { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0 } };
    }
  };
  const v = getVariants();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-70px" }}
      variants={{
        hidden: v.hidden,
        show: {
          ...v.show,
          transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-1 origin-left bg-gradient-to-r from-primary via-primary-glow to-primary shadow-elegant"
    />
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="fixed right-5 bottom-22 z-40 grid size-12 place-items-center rounded-full border border-border/80 bg-background/90 text-navy shadow-card-hover backdrop-blur-md transition-all hover:scale-110 hover:border-primary hover:bg-primary hover:text-primary-foreground sm:right-6 sm:bottom-24"
        >
          <ChevronUp className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

const BRANDS = [
  "Apple MacBook", "Dell & Alienware", "HP Pavilion & Omen", "Lenovo & ThinkPad",
  "ASUS ROG & TUF", "Acer Predator", "MSI Gaming", "Samsung Galaxy Book",
  "Microsoft Surface", "Intel & AMD Systems", "Custom Gaming PC", "Toshiba Dynabook",
];

function BrandMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-border/70 bg-secondary/50 py-4.5 backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-secondary to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-secondary to-transparent" />
      <div className="flex w-max items-center overflow-hidden">
        <motion.div
          className="flex shrink-0 items-center gap-10 pr-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 32, repeat: Infinity }}
        >
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-navy/70 transition-colors hover:text-primary sm:text-sm"
            >
              <span className="size-2 rounded-full bg-primary/75 ring-2 ring-primary/20" />
              <span>{brand}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2, ease: "easeOut", onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{v.toLocaleString()}{suffix}</span>;
}

function SectionHead({ eyebrow, title, desc, light = false }: { eyebrow: string; title: string; desc?: string; light?: boolean }) {
  return (
    <Reveal className="mx-auto mb-14 max-w-2xl text-center">
      <span className={`inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] ${light ? "bg-navy-foreground/10 text-primary-glow" : "bg-accent text-accent-foreground"}`}>{eyebrow}</span>
      <h2 className={`mt-4 text-3xl font-bold sm:text-4xl md:text-5xl ${light ? "text-navy-foreground" : "text-navy"}`}>{title}</h2>
      {desc && <p className={`mt-4 text-lg ${light ? "text-navy-foreground/70" : "text-muted-foreground"}`}>{desc}</p>}
    </Reveal>
  );
}

function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <a href="#home" className={`inline-flex items-center transition-opacity hover:opacity-90 ${className}`}>
      <img
        src={light ? logoWhiteImg : logoImg}
        alt="Longe Technologies"
        className="h-8 w-auto object-contain sm:h-9 lg:h-10"
        width={596}
        height={146}
      />
    </a>
  );
}

function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = NAV.map(([, id]) => document.getElementById(id));
      const scrollPosition = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const s = sections[i];
        if (s && s.offsetTop <= scrollPosition) {
          setActiveSection(NAV[i][1]);
          break;
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-border/80 bg-background/90 shadow-soft backdrop-blur-xl"
          : "border-b border-border/60 bg-background/95 shadow-xs backdrop-blur-xl lg:border-transparent lg:bg-transparent lg:shadow-none"
      }`}
    >
      <nav className="mx-auto flex h-16 sm:h-18 lg:h-20 max-w-7xl items-center justify-between px-4 sm:px-5 py-2 lg:px-8">
        <Logo />
        <ul className="hidden items-center gap-1 rounded-full border border-border/90 bg-background/90 p-1.5 shadow-soft ring-1 ring-black/5 backdrop-blur-xl transition-all duration-300 hover:border-primary/50 lg:flex">
          {NAV.map(([l, id]) => {
            const isActive = activeSection === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`relative block rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-accent text-primary shadow-xs"
                      : "text-navy/75 hover:bg-accent/60 hover:text-primary"
                  }`}
                >
                  {l}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="hero"
            size="sm"
            className="h-9 px-3 text-xs font-bold sm:h-10 sm:px-4 sm:text-sm lg:h-11 lg:px-5 lg:text-base"
            asChild
          >
            <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="flex items-center gap-1.5">
              <Phone className="size-3.5 sm:size-4" />
              <span>Call Now</span>
            </a>
          </Button>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
            className="grid size-9 sm:size-9.5 place-items-center rounded-xl border bg-background text-navy shadow-xs transition-colors hover:bg-accent lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t bg-background/95 backdrop-blur-xl shadow-card-hover lg:hidden">
            <ul className="space-y-1 px-5 py-4">
              {NAV.map(([l, id]) => {
                const isActive = activeSection === id;
                return (
                  <li key={id}>
                    <a
                      onClick={() => setOpen(false)}
                      href={`#${id}`}
                      className={`block rounded-xl px-4 py-3 font-semibold transition-colors ${
                        isActive ? "bg-accent text-primary" : "text-navy hover:bg-accent hover:text-primary"
                      }`}
                    >
                      {l}
                    </a>
                  </li>
                );
              })}
              <li className="pt-2">
                <Button variant="hero" className="w-full" asChild>
                  <a href={`tel:${PHONE.replace(/\s/g, "")}`}><Phone className="size-4" /> Call Head Office</a>
                </Button>
              </li>
              <li className="pt-2">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-success/30 bg-success/10 py-2.5 text-xs font-bold text-success hover:bg-success hover:text-white transition-colors"
                >
                  <WhatsAppIcon className="size-4" /> WhatsApp (+91 7558 916 777)
                </a>
              </li>
              <li className="pt-2 text-[11px] text-muted-foreground text-center">
                <span>3 Centers: Kozhikode (HQ) • Kannur • Trivandrum</span>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);

  return (
    <section ref={heroRef} id="home" className="relative overflow-hidden bg-gradient-hero pt-16 pb-14 sm:pt-24 sm:pb-20 lg:pt-36 lg:pb-28">
      {/* Mobile Top Image with smooth bottom fade (matching reference screenshot) */}
      <div className="absolute inset-x-0 top-0 h-[380px] xs:h-[420px] sm:h-[480px] overflow-hidden lg:hidden pointer-events-none">
        <img
          src={heroImg}
          alt="Technician repairing laptop"
          className="h-full w-full object-cover object-top opacity-90"
        />
        {/* Soft multi-stop gradient fade into background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/95 to-transparent" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-14 px-5 lg:px-8">
        
        {/* Text Content */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="pt-56 xs:pt-64 sm:pt-76 lg:pt-0"
        >
          {/* Top pill badge floating over fading image */}
          <motion.div variants={fade}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/95 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-navy shadow-soft backdrop-blur-md">
              <span className="size-2 animate-pulse rounded-full bg-success" />
              <span>3 Centers in Kerala: Kozhikode (HQ) • Kannur • Trivandrum</span>
            </span>
          </motion.div>

          {/* Eyebrow */}
          <motion.div variants={fade} className="mt-4">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Longe Technologies • Kerala's Laptop & Computer Care
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fade}
            className="mt-2 text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.12] tracking-tight text-navy"
          >
            Trusted care,{" "}
            <span className="text-gradient block xs:inline">right when you need it.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fade}
            className="mt-3.5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Rigorously certified engineers for home and office repairs — chip-level motherboard fixes, screen and keyboard replacement, data recovery and upgrades with genuine warranty.
          </motion.p>

          {/* Stacked Action Buttons */}
          <motion.div
            variants={fade}
            className="mt-6 sm:mt-7 flex flex-col xs:flex-row gap-3 sm:gap-4"
          >
            <Button
              variant="hero"
              size="lg"
              className="h-12 w-full xs:w-auto text-base font-bold shadow-elegant rounded-xl"
              asChild
            >
              <a href="#services">
                Book a Repair <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 w-full xs:w-auto text-base font-semibold border-border/90 bg-background shadow-xs hover:bg-accent rounded-xl"
              asChild
            >
              <a href="#contact">Get Free Diagnosis</a>
            </Button>
          </motion.div>

          {/* Rating & Trust stats below buttons */}
          <motion.div
            variants={fade}
            className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-navy/85"
          >
            <div className="flex items-center gap-1">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-navy ml-1">4.9 / 5</span>
              <span className="text-muted-foreground">(15,000+ repaired)</span>
            </div>
            <span className="hidden xs:inline text-muted-foreground/60">•</span>
            <span className="inline-flex items-center gap-1.5 text-navy/80">
              <CheckCircle2 className="size-3.5 text-primary" />
              <span>Service Warranty</span>
            </span>
          </motion.div>
        </motion.div>

        {/* Desktop Framed Image Showcase (hidden on mobile, shown on lg) */}
        <motion.div
          style={{ y: heroY }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block relative mx-auto w-full max-w-lg lg:max-w-none"
        >
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-primary opacity-20 blur-3xl" />
          <div className="overflow-hidden rounded-[2rem] border-8 border-background shadow-card-hover">
            <img
              src={heroImg}
              alt="Technician repairing a laptop motherboard"
              width={1280}
              height={1024}
              className="aspect-[5/4] w-full object-cover"
            />
          </div>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl border border-border/80 bg-background/95 p-4 shadow-card-hover backdrop-blur-md"
          >
            <span className="grid size-12 place-items-center rounded-xl bg-accent text-primary">
              <Clock className="size-6" />
            </span>
            <div>
              <span className="block font-display text-xl font-bold text-navy leading-tight">24–48 hrs</span>
              <span className="text-xs text-muted-foreground">Average turnaround</span>
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-5 -right-6 flex items-center gap-2 rounded-2xl bg-navy/95 p-4 text-navy-foreground shadow-card-hover backdrop-blur-md"
          >
            <Star className="size-5 fill-primary-glow text-primary-glow shrink-0" />
            <span className="font-display text-base font-bold">4.9 / 5</span>
            <span className="text-xs text-navy-foreground/70">Rating</span>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

function About() {
  const stats = [
    { n: 10, s: "+", l: "Years Experience" },
    { n: 15000, s: "+", l: "Devices Repaired" },
    { n: 98, s: "%", l: "Happy Customers" },
    { n: 25, s: "+", l: "Brands Serviced" },
  ];
  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <Reveal direction="right" className="relative">
          <img src={aboutImg} alt="Longe technician servicing a laptop" loading="lazy" width={1024} height={1024} className="aspect-square w-full rounded-[2rem] object-cover shadow-card-hover" />
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="absolute -right-4 bottom-8 rounded-2xl bg-gradient-primary p-6 text-primary-foreground shadow-elegant sm:-right-8"
          >
            <span className="block font-display text-4xl font-extrabold"><Counter to={10} suffix="+" /></span>
            <span className="text-sm font-semibold opacity-90">Years of trusted service</span>
          </motion.div>
        </Reveal>
        <Reveal direction="left">
          <span className="inline-block rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-accent-foreground">About Us</span>
          <h2 className="mt-4 text-3xl font-bold text-navy sm:text-4xl md:text-5xl">Your devices, in expert hands.</h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Longe Technologies is a dedicated laptop and computer repair & service company. We focus on one thing — getting your machines working like new — with honest advice, skilled hands and quality parts.
          </p>
          <div className="mt-8 space-y-4">
            {[
              ["Proven Experience", "A decade of repairing laptops and desktops across every major brand."],
              ["Quality Service", "Careful diagnosis, clean workmanship and tested results every time."],
              ["Customer Satisfaction", "Clear communication, fair pricing and warranty-backed repairs."],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.12} direction="up" className="flex gap-4 rounded-2xl border p-4 transition-colors hover:border-primary/40 hover:bg-accent/40">
                <CheckCircle2 className="mt-0.5 size-6 shrink-0 text-primary" />
                <div><h3 className="font-bold text-navy">{t}</h3><p className="text-sm text-muted-foreground">{d}</p></div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
      <div className="mx-auto mt-20 max-w-7xl px-5 lg:px-8">
        <Reveal direction="zoom" delay={0.15}>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-border shadow-soft lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.l} className="bg-background p-8 text-center transition-colors hover:bg-accent/30">
                <div className="font-display text-4xl font-extrabold text-gradient sm:text-5xl"><Counter to={s.n} suffix={s.s} /></div>
                <div className="mt-2 text-sm font-semibold text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead
          eyebrow="Our Services"
          title="Complete sales, service & IT solutions"
          desc="From chip-level laptop repairs to CCTV, printers, used laptops, and doorstep support across Kerala."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border bg-card p-7 transition-shadow duration-300 hover:shadow-card-hover"
            >
              <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-primary transition-transform duration-500 group-hover:scale-x-100" />
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="grid size-14 place-items-center rounded-2xl bg-accent text-primary transition-all duration-300 group-hover:bg-gradient-primary group-hover:text-primary-foreground group-hover:shadow-elegant">
                    <s.icon className="size-7" />
                  </span>
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-navy/70">
                    {s.badge}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-navy leading-snug">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
              <a
                href="#contact"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-primary opacity-85 transition-all group-hover:gap-2.5 group-hover:opacity-100"
              >
                Inquire now <ArrowRight className="size-4" />
              </a>
            </motion.div>
          ))}
          <Reveal className="flex flex-col justify-between rounded-3xl bg-gradient-navy p-7 text-navy-foreground sm:col-span-2 lg:col-span-1 xl:col-span-2">
            <div>
              <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-bold text-primary-glow">
                Need Fast Assistance?
              </span>
              <h3 className="mt-4 text-2xl font-bold">Have a specific device issue or requirement?</h3>
              <p className="mt-2 text-sm text-navy-foreground/75 leading-relaxed">
                Connect with our certified engineers for instant consultation, free diagnosis, or on-site service booking across Kerala.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button variant="hero" asChild>
                <a href={WHATSAPP} target="_blank" rel="noreferrer">
                  <WhatsAppIcon className="size-4" /> WhatsApp Us
                </a>
              </Button>
              <Button
                variant="ghostLight"
                asChild
                className="border border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white font-semibold"
              >
                <a href="#contact">Send Inquiry</a>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section id="why" className="relative overflow-hidden bg-navy py-24 lg:py-32">
      <div className="absolute inset-0 bg-grid opacity-60" />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 left-1/2 size-[600px] -translate-x-1/2 rounded-full bg-primary blur-[120px]"
      />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead light eyebrow="Why Choose Us" title="Repairs you can trust" desc="What makes Longe the go-to service centre for laptops and computers." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.08} direction="up">
              <div className="group h-full rounded-3xl border border-navy-foreground/10 bg-navy-foreground/5 p-7 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:border-primary/60 hover:bg-navy-foreground/10">
                <span className="grid size-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elegant transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                  <w.icon className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy-foreground">{w.title}</h3>
                <p className="mt-2 text-sm text-navy-foreground/65">{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead eyebrow="Our Process" title="Simple, transparent, fast" desc="Four easy steps from problem to perfectly working device." />
        <div className="relative flex flex-col gap-6 sm:gap-8 md:grid md:grid-cols-4 md:gap-6">
          {/* Desktop horizontal timeline line */}
          <div className="absolute top-10 right-[12%] left-[12%] hidden h-0.5 bg-border/80 md:block">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="h-full origin-left bg-gradient-primary shadow-elegant"
            />
          </div>

          {/* Mobile responsive vertical timeline line */}
          <div className="absolute top-8 bottom-8 left-8 sm:top-10 sm:bottom-10 sm:left-10 w-0.5 -translate-x-1/2 bg-border/80 md:hidden">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full origin-top bg-gradient-primary shadow-elegant"
            />
          </div>

          {PROCESS.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 0.12}
              direction="up"
              className="relative flex items-start gap-4 sm:gap-6 md:flex-col md:items-center md:text-center"
            >
              <motion.div
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="relative z-10 grid size-16 shrink-0 place-items-center rounded-full border-4 border-background bg-gradient-primary text-primary-foreground shadow-elegant sm:size-20"
              >
                <p.icon className="size-6 sm:size-8" />
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, type: "spring" }}
                  className="absolute -top-1 -right-1 grid size-6 sm:size-7 place-items-center rounded-full bg-navy text-[11px] sm:text-xs font-bold text-navy-foreground ring-2 ring-background"
                >
                  {i + 1}
                </motion.span>
              </motion.div>
              <div className="flex-1 rounded-2xl border border-border/70 bg-card/70 p-4 shadow-2xs backdrop-blur-xs md:border-0 md:bg-transparent md:p-0 md:shadow-none">
                <span className="mb-1 inline-block rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-foreground md:hidden">
                  Step {i + 1}
                </span>
                <h3 className="text-lg font-bold text-navy sm:text-xl md:mt-6">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground sm:mt-2 md:mx-auto md:max-w-[220px]">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Careers() {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<(typeof POSITIONS)[number]>(POSITIONS[0]);
  return (
    <section id="careers" className="bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHead eyebrow="We're Hiring" title="Build your career with Longe" desc="Join a skilled, friendly team that takes pride in fixing things right." />
        <div className="grid gap-8 md:grid-cols-2">
          {JOBS.map((j, i) => (
            <Reveal key={j.title} delay={i * 0.12}>
              <div className="group flex h-full flex-col rounded-3xl border bg-card p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-card-hover">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-14 place-items-center rounded-2xl bg-gradient-navy text-navy-foreground"><j.icon className="size-7" /></span>
                  <span className="rounded-full bg-success/15 px-3 py-1 text-xs font-bold text-success">Now hiring</span>
                </div>
                <h3 className="mt-6 text-2xl font-bold text-navy">{j.title}</h3>
                <p className="mt-2 text-muted-foreground">{j.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {j.tags.map((t) => <span key={t} className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">{t}</span>)}
                </div>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {j.points.map((p) => <li key={p} className="flex items-center gap-2.5 text-sm text-navy/80"><CheckCircle2 className="size-4 text-primary" />{p}</li>)}
                </ul>
                <Button variant="hero" size="lg" className="mt-8 w-full" onClick={() => { setPos(j.title); setOpen(true); }}>
                  Apply Now <ArrowRight />
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <ApplyDialog open={open} onOpenChange={setOpen} position={pos} />
    </section>
  );
}

const contactSchema = z.object({
  branch: z.string().optional(),
  service: z.string().optional(),
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().regex(/^[+\d\s-]{7,15}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(5, "Tell us a little about the issue").max(1000),
});

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeMapBranch, setActiveMapBranch] = useState(0);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const res = contactSchema.safeParse(Object.fromEntries(new FormData(form)));
    if (!res.success) {
      const errs: Record<string, string> = {};
      res.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    form.reset();
    toast.success("Inquiry sent successfully!", {
      description: "Our service team will connect with you promptly.",
    });
  }

  const err = (k: string) => errors[k] && <p className="mt-1 text-xs text-destructive">{errors[k]}</p>;
  const currentMap = BRANCHES[activeMapBranch];

  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead
          eyebrow="Our Service Centers & Contact"
          title="Visit or reach out to our service centers"
          desc="3 convenient locations across Kerala — Kozhikode (Head Office), Kannur, and Thiruvananthapuram. Walk in or contact us for prompt support."
        />

        {/* 3 Service Center Location Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {BRANCHES.map((b, i) => (
            <Reveal key={b.id} delay={i * 0.1}>
              <div
                className={`relative flex h-full flex-col justify-between rounded-3xl border bg-card p-6 sm:p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ${
                  b.isHeadOffice ? "border-primary/50 ring-2 ring-primary/10" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-xl font-bold text-navy">{b.city}</span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        b.isHeadOffice
                          ? "bg-gradient-primary text-white shadow-xs"
                          : "bg-accent text-primary"
                      }`}
                    >
                      {b.type}
                    </span>
                  </div>

                  <div className="mt-4 flex gap-2.5 text-xs text-muted-foreground leading-relaxed">
                    <MapPin className="size-4 shrink-0 text-primary mt-0.5" />
                    <span>{b.door}</span>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-border/70 space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone className="size-4 text-primary shrink-0" />
                    <a
                      href={`tel:${b.tel}`}
                      className="text-sm font-bold text-navy hover:text-primary transition-colors"
                    >
                      {b.phone}
                    </a>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Button variant="outline" size="sm" asChild className="text-xs">
                      <a href={b.directionsUrl} target="_blank" rel="noreferrer">
                        <Navigation className="size-3.5" /> Map & Directions
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-success/30 text-success hover:bg-success hover:text-white text-xs"
                    >
                      <a href={b.whatsappUrl} target="_blank" rel="noreferrer">
                        <WhatsAppIcon className="size-3.5" /> WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Contact Form & Quick Info */}
        <div className="grid gap-8 lg:grid-cols-5 items-start">
          <Reveal className="space-y-4 lg:col-span-2">
            <div className="rounded-3xl border bg-card p-6 sm:p-7 shadow-soft space-y-4">
              <h3 className="font-display text-lg font-bold text-navy">Direct Assistance</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Speak directly with our senior technicians or central support desk.
              </p>

              <div className="space-y-3 pt-2">
                <a
                  href={`tel:${PHONE.replace(/\s/g, "")}`}
                  className="flex items-center gap-3.5 rounded-2xl border p-4 transition-all hover:border-primary/40 hover:bg-accent/40 hover:shadow-xs"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent text-primary">
                    <Phone className="size-5" />
                  </span>
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      Head Office Hotline
                    </span>
                    <span className="text-sm font-bold text-navy">{PHONE}</span>
                  </div>
                </a>

                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-3.5 rounded-2xl border p-4 transition-all hover:border-primary/40 hover:bg-accent/40 hover:shadow-xs"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent text-primary">
                    <Mail className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      Email Us
                    </span>
                    <span className="block truncate text-sm font-bold text-navy">{EMAIL}</span>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 rounded-2xl border p-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent text-primary">
                    <Clock className="size-5" />
                  </span>
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      Service Hours
                    </span>
                    <span className="text-sm font-semibold text-navy">Mon – Sat: 9:30 AM – 7:30 PM</span>
                  </div>
                </div>
              </div>

              <Button variant="navy" size="lg" className="w-full mt-2" asChild>
                <a href={WHATSAPP} target="_blank" rel="noreferrer">
                  <WhatsAppIcon className="size-4" /> WhatsApp Head Office
                </a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <form onSubmit={submit} className="grid gap-5 rounded-3xl border bg-card p-7 shadow-soft sm:grid-cols-2 sm:p-9">
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Select Service Center
                </label>
                <select
                  name="branch"
                  className="flex h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  defaultValue="Kozhikode (Head Office)"
                >
                  <option value="Kozhikode (Head Office)">Kozhikode (HQ) — Kanakassery Bldg, Mankave</option>
                  <option value="Kannur">Kannur — Delta Tower, Thana</option>
                  <option value="Thiruvananthapuram">Trivandrum — KBN Tower, Kaimanam</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Service Needed
                </label>
                <select
                  name="service"
                  className="flex h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  defaultValue={SERVICES[0].title}
                >
                  {SERVICES.map((s) => (
                    <option key={s.title} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="General Consultation">Other / General Consultation</option>
                </select>
              </div>
              <div>
                <Input name="name" placeholder="Your name" maxLength={100} className="h-12" />
                {err("name")}
              </div>
              <div>
                <Input name="phone" placeholder="Phone number" maxLength={15} className="h-12" />
                {err("phone")}
              </div>
              <div className="sm:col-span-2">
                <Input name="email" type="email" placeholder="Email address" maxLength={255} className="h-12" />
                {err("email")}
              </div>
              <div className="sm:col-span-2">
                <Textarea name="message" placeholder="Describe the problem with your laptop or computer…" maxLength={1000} rows={4} />
                {err("message")}
              </div>
              <Button type="submit" variant="hero" size="lg" className="sm:col-span-2">
                Send Inquiry <Send />
              </Button>
            </form>
          </Reveal>
        </div>

        {/* Interactive Google Map Section with Branch Toggle */}
        <Reveal className="mt-12">
          <div className="rounded-3xl border bg-card p-6 shadow-soft sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/80">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Interactive Locations</span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-navy">Find us on Google Maps</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {BRANCHES.map((b, i) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setActiveMapBranch(i)}
                    className={`rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                      activeMapBranch === i
                        ? "bg-primary text-primary-foreground shadow-soft ring-2 ring-primary/20"
                        : "border border-border bg-background text-navy/80 hover:bg-accent"
                    }`}
                  >
                    📍 {b.city} {b.isHeadOffice ? "(Head Office)" : "Branch"}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3 items-stretch">
              <div className="lg:col-span-1 flex flex-col justify-between rounded-2xl border bg-secondary/50 p-6">
                <div>
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                    currentMap.isHeadOffice
                      ? "bg-primary text-primary-foreground"
                      : "bg-navy text-navy-foreground"
                  }`}>
                    {currentMap.type}
                  </span>
                  <h4 className="mt-3 text-xl font-bold text-navy">{currentMap.city}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {currentMap.door}
                  </p>

                  <div className="mt-5 space-y-2 border-t border-border/60 pt-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-navy">
                      <Phone className="size-3.5 text-primary" />
                      <a href={`tel:${currentMap.tel}`} className="hover:text-primary transition-colors">
                        {currentMap.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Mail className="size-3.5 text-primary" />
                      <a href={`mailto:${currentMap.email}`} className="hover:text-primary transition-colors">
                        {currentMap.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-2 pt-2">
                  <Button variant="hero" size="sm" className="flex-1" asChild>
                    <a href={currentMap.directionsUrl} target="_blank" rel="noreferrer">
                      <Navigation className="size-3.5" /> Directions
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex-1 border-success/40 text-success hover:bg-success hover:text-white"
                  >
                    <a href={currentMap.whatsappUrl} target="_blank" rel="noreferrer">
                      <WhatsAppIcon className="size-3.5" /> WhatsApp
                    </a>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-2 overflow-hidden rounded-2xl border bg-muted h-80 sm:h-96 shadow-inner relative">
                <iframe
                  title={`Google Map - ${currentMap.city}`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(currentMap.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  className="h-full w-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  const socials = [Facebook, Instagram, Linkedin, Twitter];
  return (
    <footer className="bg-navy pt-20 pb-8 text-navy-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-4 lg:px-8">
        <div className="flex flex-col items-center sm:items-start">
          <Logo light />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-navy-foreground/70 sm:max-w-none">
            Premier laptop & computer repair, chip-level diagnosis, upgrades and maintenance across Kerala.
          </p>
          <div className="mt-6 flex justify-center gap-3 sm:justify-start">
            {socials.map((S, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="grid size-10 place-items-center rounded-full border border-navy-foreground/15 transition-all hover:-translate-y-1 hover:border-primary hover:bg-primary"
              >
                <S className="size-4" />
              </a>
            ))}
          </div>
          <div className="mt-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary-glow">
              <span className="size-2 animate-pulse rounded-full bg-success" />
              Kozhikode • Kannur • Trivandrum
            </span>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white">Quick Links</h4>
          <ul className="mt-5 space-y-3 text-sm text-navy-foreground/70">
            {NAV.map(([l, id]) => (
              <li key={id}>
                <a href={`#${id}`} className="transition-colors hover:text-primary-glow">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white">Our Services</h4>
          <ul className="mt-5 space-y-2 text-xs text-navy-foreground/75">
            {SERVICES.map((s) => (
              <li key={s.title}>
                <a href="#services" className="transition-colors hover:text-primary-glow">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white">Our Service Centers</h4>
          <div className="mt-5 space-y-3.5 text-xs text-navy-foreground/80">
            {/* Kozhikode HQ */}
            <div className="rounded-xl border border-navy-foreground/10 bg-navy-soft/30 p-3.5 text-left">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-white text-xs">Kozhikode (Head Office)</span>
                <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary-glow">HQ</span>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-navy-foreground/60">
                Near Lulu Mall, Mini Bypass Rd, Mankave, Kozhikode
              </p>
              <a
                href="tel:+917558916777"
                className="mt-1.5 inline-flex items-center gap-1.5 font-bold text-primary-glow hover:underline"
              >
                <Phone className="size-3" /> +91 7558 916 777
              </a>
            </div>

            {/* Kannur Branch */}
            <div className="rounded-xl border border-navy-foreground/10 bg-navy-soft/30 p-3.5 text-left">
              <span className="font-bold text-white block text-xs">Kannur Branch</span>
              <p className="mt-1 text-[11px] leading-relaxed text-navy-foreground/60">
                Delta Tower, Thana, Kannur 670012
              </p>
              <a
                href="tel:+917025916777"
                className="mt-1.5 inline-flex items-center gap-1.5 font-bold text-primary-glow hover:underline"
              >
                <Phone className="size-3" /> +91 7025 916 777
              </a>
            </div>

            {/* Trivandrum Branch */}
            <div className="rounded-xl border border-navy-foreground/10 bg-navy-soft/30 p-3.5 text-left">
              <span className="font-bold text-white block text-xs">Thiruvananthapuram Branch</span>
              <p className="mt-1 text-[11px] leading-relaxed text-navy-foreground/60">
                KBN Tower Kaimanam, Pappanamcode 695040
              </p>
              <a
                href="tel:+917510916777"
                className="mt-1.5 inline-flex items-center gap-1.5 font-bold text-primary-glow hover:underline"
              >
                <Phone className="size-3" /> +91 7510 916 777
              </a>
            </div>

            <div className="pt-1">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 text-xs text-navy-foreground/70 hover:text-primary-glow"
              >
                <Mail className="size-3.5 text-primary-glow" /> {EMAIL}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-navy-foreground/10 px-5 pt-8 text-center text-xs text-navy-foreground/50 sm:flex-row sm:text-left lg:px-8">
        <span>© {new Date().getFullYear()} Longe Technologies. All rights reserved.</span>
        <span>Kerala: Kozhikode (Head Office) • Kannur • Thiruvananthapuram</span>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />
      <Navbar />
      <main>
        <Hero />
        <BrandMarquee />
        <About />
        <Services />
        <WhyUs />
        <Process />
        <Careers />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="fixed right-5 bottom-5 z-40 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-card-hover transition-all duration-200 hover:scale-110 hover:bg-[#20ba5a] active:scale-95"
      >
        <WhatsAppIcon className="size-7" />
      </a>
    </div>
  );
}
