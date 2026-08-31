import React, { useEffect, useRef, useState } from "react";

const COLORS = {
  cream: "#EFE7D6",
  creamDeep: "#E4D9C2",
  terracotta: "#C1552F",
  terracottaDeep: "#9E4224",
  ink: "#2A2118",
  stone: "#D8D2C3",
  ribbon: "#8C2F22",
  sage: "#6E7C55",
};
 
const NAV_LINKS = [
  { label: "Sip · Savour · Stay", href: "#triad" },
  { label: "Menu", href: "#menu" },
  { label: "Visit", href: "#visit" },
];
 
const TRIAD = [
  {
    word: "Sip",
    title: "Coffee, slow bar and beyond",
    body:
      "Classic espresso drinks and hand-poured V60, Aeropress and French Press, plus fruit-espresso tonics, cold brews and ceremonial matcha.",
  },
  {
    word: "Savour",
    title: "An all-vegetarian kitchen",
    body:
      "Sourdough toasts, Napoli-style pizzas, burrata bowls and all-day breakfast bowls — a menu built for a table that keeps ordering.",
  },
  {
    word: "Stay",
    title: "Rooms to disappear into",
    body:
      "Indoor booths, an open patio and a string-lit rooftop — free Wi-Fi throughout, so one coffee has a way of becoming three.",
  },
];
 
const MENU_CATEGORIES = [
  {
    name: "Sourdough & Starters",
    items: ["Avocado Toast", "Mushroom Toast", "Truffle Fries", "Honey Chilli Lotus Stem", "Nachos For Sure"],
  },
  {
    name: "Napoli-Style Pizza",
    items: ["Classic Napoli", "Truffle Fungi", "Burrata Verde", "Formaggio Ricotta"],
  },
  {
    name: "Mains & Bowls",
    items: ["Pesto Burrata Bowl", "Burrata Garlic Rice", "Paneer Chilli Jasmine Rice Bowl"],
  },
  {
    name: "Breakfast & Desserts",
    items: ["Sunrise Yogurt Bowl", "Cocoa Fuel Bowl", "Green Glow Bowl", "Basque Cheesecake", "New York Cheesecake", "Fudge Forest", "Double Chocolate Cake"],
  },
  {
    name: "Coffee & Slow Bar",
    items: ["Espresso", "Cappuccino", "Cortado", "Flat White", "V60 Pour Over", "Aeropress", "French Press"],
  },
  {
    name: "Iced Tonics & Cold Brews",
    items: ["Orange Tonic", "Cranberry Tonic", "Blueberry Tonic", "Strawberry Tonic", "Classic Cold Brew", "Whiskey Cold Brew Tonic", "Vietnamese Cold Brew"],
  },
  {
    name: "Matcha & Shakes",
    items: ["Matcha Tonic", "Strawberry Matcha Latte", "Coconut Cold-foam Matcha", "Biscoff Cheesecake Shake", "Ferrero Rocher Shake", "Blueberry Cheesecake Shake"],
  },
];
 
const INFO = {
  address:
    "Plot 85, Sant Tukaram Society, Jeevkar Nagar, near KP Group, Ghod Dod Road, Althan Bhatar, Surat",
  hours: "Open daily · 8:00 AM – 12:00 AM",
  price: "₹200–₹1,200 a dish · ≈ ₹800 for two",
  phone: "+91 97270 22066",
  phoneHref: "tel:+919727022066",
  mapUrl: "https://www.google.com/maps/search/One+Third+Cafe+Ghod+Dod+Road+Surat",
  instagram: "https://www.instagram.com/onethird.cafe/",
};
 
function MoonMark({ size = 40, color = COLORS.ink, opacity = 1, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      style={{ opacity }}
      className={className}
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="2.5" />
      <path d="M32 44c4-5 10-5 14 0" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M54 44c4-5 10-5 14 0" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M42 64c4 4 12 4 16 0" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
 
function ArchShape({ children, height = 380, style = {} }) {
  const radius = "50% 50% 0 0 / 46% 46% 0 0";
  return (
    <div
      className="w-full relative"
      style={{
        height,
        borderRadius: radius,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
 
function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
 
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
 
  return [ref, shown];
}
 
function Reveal({ as: Tag = "div", delay = 0, className = "", style = {}, children }) {
  const [ref, shown] = useReveal();
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
 
export default function OneThirdCafe() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0].name);
 
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
 
  const activeItems = MENU_CATEGORIES.find((c) => c.name === activeCategory)?.items ?? [];
 
  return (
    <div style={{ background: COLORS.cream, color: COLORS.ink }} className="min-h-screen w-full">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,500&family=Work+Sans:wght@400;500;600&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'Work Sans', sans-serif; }
        html { scroll-behavior: smooth; }
        a, button { outline-offset: 3px; }
        a:focus-visible, button:focus-visible {
          outline: 2px solid ${COLORS.terracotta};
          border-radius: 4px;
        }
        .menu-tab {
          transition: color 0.25s ease, border-color 0.25s ease;
        }
        .menu-item {
          transition: transform 0.25s ease, opacity 0.25s ease;
        }
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-3px);
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
 
      <header
        className="sticky top-0 z-20 font-body"
        style={{
          background: COLORS.cream,
          borderBottom: `1px solid ${COLORS.creamDeep}`,
          boxShadow: scrolled ? "0 6px 16px -12px rgba(42,33,24,0.35)" : "none",
          transition: "box-shadow 0.3s ease",
        }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2">
            <MoonMark size={26} />
            <span className="font-display text-lg tracking-wide">ONE THRD</span>
          </a>
 
          <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="hover:opacity-60 transition-opacity">
                {l.label}
              </a>
            ))}
            <a
              href={INFO.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full text-white text-xs hover-lift inline-block"
              style={{ background: COLORS.terracotta }}
            >
              Find Us
            </a>
          </nav>
 
          <button
            className="md:hidden text-sm uppercase tracking-widest relative w-6 h-5"
            onClick={() => setNavOpen((v) => !v)}
            aria-expanded={navOpen}
            aria-label="Toggle menu"
          >
            <span
              className="absolute left-0 w-6 h-[2px]"
              style={{
                background: COLORS.ink,
                top: navOpen ? "9px" : "2px",
                transform: navOpen ? "rotate(45deg)" : "none",
                transition: "all 0.25s ease",
              }}
            />
            <span
              className="absolute left-0 w-6 h-[2px]"
              style={{
                background: COLORS.ink,
                top: "9px",
                opacity: navOpen ? 0 : 1,
                transition: "opacity 0.2s ease",
              }}
            />
            <span
              className="absolute left-0 w-6 h-[2px]"
              style={{
                background: COLORS.ink,
                top: navOpen ? "9px" : "16px",
                transform: navOpen ? "rotate(-45deg)" : "none",
                transition: "all 0.25s ease",
              }}
            />
          </button>
        </div>
 
        <div
          className="md:hidden overflow-hidden"
          style={{
            maxHeight: navOpen ? 220 : 0,
            transition: "max-height 0.3s ease",
          }}
        >
          <div className="flex flex-col gap-4 px-6 pb-6 text-sm uppercase tracking-widest">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} onClick={() => setNavOpen(false)}>
                {l.label}
              </a>
            ))}
            <a href={INFO.mapUrl} target="_blank" rel="noreferrer">
              Find Us →
            </a>
          </div>
        </div>
      </header>
 
      <section id="top" className="max-w-5xl mx-auto px-6 pt-16 pb-8">
        <Reveal>
          <p
            className="font-body text-xs uppercase tracking-[0.3em] mb-4"
            style={{ color: COLORS.terracottaDeep }}
          >
            Ghod Dod Road · Surat
          </p>
        </Reveal>
 
        <Reveal delay={100}>
          <div className="relative w-full flex justify-center">
            <div
              className="w-full max-w-3xl relative overflow-hidden"
              style={{
                background: COLORS.terracotta,
                borderTopLeftRadius: "9999px 220px",
                borderTopRightRadius: "9999px 220px",
              }}
            >
              <div className="flex flex-col items-center justify-center text-center px-6 pt-24 pb-20 md:pt-32 md:pb-24">
                <MoonMark size={56} color={COLORS.cream} />
                <h1 className="font-display text-5xl md:text-7xl text-white mt-6 leading-none">
                  ONE THRD
                </h1>
                <p className="font-body text-white/90 tracking-[0.35em] text-xs md:text-sm uppercase mt-5">
                  Sip &nbsp;·&nbsp; Savour &nbsp;·&nbsp; Stay
                </p>
              </div>
              <div className="h-3" style={{ background: COLORS.terracottaDeep }} />
            </div>
          </div>
        </Reveal>
 
        <Reveal delay={200}>
          <p
            className="font-body max-w-md mx-auto text-center mt-8 text-[15px] leading-relaxed"
            style={{ color: COLORS.ink + "cc" }}
          >
            A vegetarian café built for the long visit — indoor booths, an open patio,
            and a rooftop strung with light, one archway off Ghod Dod Road.
          </p>
        </Reveal>
      </section>
 
      <section id="triad" className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {TRIAD.map((item, i) => (
            <Reveal key={item.word} delay={i * 120} className="font-body">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-display italic text-3xl" style={{ color: COLORS.terracotta }}>
                  {item.word}
                </span>
              </div>
              <h3 className="font-display text-xl mb-2">{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: COLORS.ink + "b3" }}>
                {item.body}
              </p>
              {i < TRIAD.length - 1 && (
                <div className="md:hidden mt-8 h-px w-full" style={{ background: COLORS.creamDeep }} />
              )}
            </Reveal>
          ))}
        </div>
      </section>
 
      <section id="menu" style={{ background: COLORS.creamDeep }} className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="flex items-end justify-between mb-3">
            <h2 className="font-display text-3xl md:text-4xl">The full menu</h2>
            <MoonMark size={30} opacity={0.5} />
          </Reveal>
          <Reveal delay={80}>
            <p className="font-body text-sm mb-10" style={{ color: COLORS.ink + "99" }}>
              {INFO.price}
            </p>
          </Reveal>
 
          <Reveal delay={120}>
            <div
              className="flex flex-wrap gap-x-6 gap-y-3 mb-10 pb-4 font-body text-sm uppercase tracking-wider"
              style={{ borderBottom: `1px solid ${COLORS.ink}22` }}
              role="tablist"
              aria-label="Menu categories"
            >
              {MENU_CATEGORIES.map((cat) => {
                const active = cat.name === activeCategory;
                return (
                  <button
                    key={cat.name}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveCategory(cat.name)}
                    className="menu-tab pb-3 -mb-[17px]"
                    style={{
                      color: active ? COLORS.terracottaDeep : COLORS.ink + "88",
                      borderBottom: active ? `2px solid ${COLORS.terracotta}` : "2px solid transparent",
                    }}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </Reveal>
 
          <div
            className="rounded-2xl p-8 md:p-10"
            style={{ background: COLORS.cream, border: `1px solid ${COLORS.creamDeep}` }}
          >
            <h3 className="font-display text-2xl mb-6" style={{ color: COLORS.terracottaDeep }}>
              {activeCategory}
            </h3>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 font-body text-sm" style={{ color: COLORS.ink + "cc" }}>
              {activeItems.map((item, i) => (
                <li
                  key={item}
                  className="menu-item flex items-baseline gap-3"
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  <span aria-hidden="true" style={{ color: COLORS.terracotta }}>
                    ·
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
 
      <section id="visit" className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <Reveal
          className="rounded-3xl px-6 md:px-14 py-12 md:py-16 grid md:grid-cols-2 gap-10 items-center"
          style={{ background: COLORS.ink, color: COLORS.cream }}
        >
          <div className="font-body">
            <h2 className="font-display text-3xl md:text-4xl mb-6" style={{ color: COLORS.cream }}>
              Come find the archway
            </h2>
            <dl className="space-y-5 text-sm">
              <div>
                <dt className="uppercase tracking-widest text-xs mb-1" style={{ color: COLORS.stone }}>
                  Address
                </dt>
                <dd className="leading-relaxed">{INFO.address}</dd>
              </div>
              <div>
                <dt className="uppercase tracking-widest text-xs mb-1" style={{ color: COLORS.stone }}>
                  Hours
                </dt>
                <dd>{INFO.hours}</dd>
              </div>
              <div>
                <dt className="uppercase tracking-widest text-xs mb-1" style={{ color: COLORS.stone }}>
                  For two
                </dt>
                <dd>{INFO.price}</dd>
              </div>
              <div>
                <dt className="uppercase tracking-widest text-xs mb-1" style={{ color: COLORS.stone }}>
                  Phone
                </dt>
                <dd>
                  <a href={INFO.phoneHref} className="underline underline-offset-2">
                    {INFO.phone}
                  </a>
                </dd>
              </div>
            </dl>
 
            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href={INFO.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="hover-lift inline-block px-6 py-3 rounded-full text-sm"
                style={{ background: COLORS.terracotta, color: "white" }}
              >
                Get directions
              </a>
              <a
                href={INFO.instagram}
                target="_blank"
                rel="noreferrer"
                className="hover-lift inline-block px-6 py-3 rounded-full text-sm border"
                style={{ borderColor: COLORS.stone, color: COLORS.cream }}
              >
                @onethird.cafe
              </a>
            </div>
          </div>
 
          <div className="flex justify-center">
            <div
              className="w-full max-w-[260px] relative overflow-hidden"
              style={{
                background: COLORS.terracotta,
                borderTopLeftRadius: "9999px 160px",
                borderTopRightRadius: "9999px 160px",
              }}
            >
              <div className="flex flex-col items-center justify-center text-center px-6 pt-16 pb-20">
                <MoonMark size={64} color={COLORS.cream} />
                <p className="font-body text-white/90 text-xs uppercase tracking-[0.3em] mt-6">
                  All vegetarian
                </p>
                <p className="font-body text-white/70 text-xs mt-2">Free Wi-Fi · Rooftop seating</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
 
      <footer className="font-body border-t" style={{ borderColor: COLORS.creamDeep }}>
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <MoonMark size={20} />
            <span className="tracking-widest uppercase">ONE THRD · Sip Savour Stay</span>
          </div>
          <p style={{ color: COLORS.ink + "80" }}>Ghod Dod Road, Surat</p>
          <a href="#top" className="hover:opacity-60 transition-opacity uppercase tracking-widest">
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
 