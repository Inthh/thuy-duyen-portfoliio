"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineMail } from "react-icons/hi";
import { SiZalo } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import Image from "next/image";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { useLocale } from "@/components/LocaleProvider";
import {
  springSmooth,
  springBouncy,
  springGentle,
  floatUp,
} from "@/lib/animations";

const TYPING_DELAY = 85;
const ERASING_DELAY = 50;
const PAUSE_AFTER_TYPING = 2400;
const PAUSE_AFTER_ERASING = 600;

function TypingTitle({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "pause" | "erasing">("typing");

  if (!text) return <span>{text}</span>;

  useEffect(() => {
    if (!text) return;

    if (phase === "typing") {
      if (displayed.length >= text.length) {
        setPhase("pause");
        return;
      }
      const t = setTimeout(
        () => setDisplayed(text.slice(0, displayed.length + 1)),
        TYPING_DELAY,
      );
      return () => clearTimeout(t);
    }
    if (phase === "pause") {
      const t = setTimeout(() => setPhase("erasing"), PAUSE_AFTER_TYPING);
      return () => clearTimeout(t);
    }
    if (phase === "erasing") {
      if (displayed.length === 0) {
        const t = setTimeout(() => setPhase("typing"), PAUSE_AFTER_ERASING);
        return () => clearTimeout(t);
      }
      const t = setTimeout(
        () => setDisplayed(text.slice(0, displayed.length - 1)),
        ERASING_DELAY,
      );
      return () => clearTimeout(t);
    }
  }, [displayed, phase, text]);

  return (
    <span>
      {displayed}
      <span
        className="inline-block w-0.5 h-[0.9em] align-middle ml-0.5 bg-[var(--color-text)] animate-[typing-caret-blink_1.1s_steps(2,end)_infinite]"
        aria-hidden
      />
    </span>
  );
}

export function Hero() {
  const { translations } = useLocale();
  const hero = translations.hero;

  return (
    <section
      id="home"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Floating recommendation card - left */}
        <motion.div
          initial={{ opacity: 0, x: -48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...springSmooth, delay: 0.6 }}
          className="hidden lg:flex absolute left-[8%] top-[35%] items-center gap-3 bg-[var(--color-card-alt)] rounded-2xl shadow-lg border border-[var(--color-border)] p-4 w-[220px]"
        >
          <motion.div
            animate={floatUp.animate}
            transition={floatUp.transition}
            className="shrink-0 w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center shadow-sm"
          >
            <SiZalo className="w-6 h-6 text-[var(--color-text)]" />
          </motion.div>
          <div>
            <p className="text-xs text-[var(--color-text-muted)]">{hero.recommendation.text}</p>
            <p className="text-sm font-semibold text-[var(--color-text)]">
              {hero.recommendation.name}
            </p>
          </div>
          <HiArrowRight className="w-4 h-4 text-[var(--color-text-muted)] shrink-0" />
        </motion.div>

        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ ...springBouncy, delay: 0.15 }}
          className="flex justify-center mb-6"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={springGentle}
            className="avatar-glow relative w-68 h-68 sm:w-76 sm:h-76 md:w-92 md:h-92 rounded-full overflow-hidden border-4 border-[var(--color-bg-secondary)] bg-[var(--color-bg-secondary)]/50 transition-shadow duration-300"
          >
            <Image
              src="https://api.dicebear.com/7.x/avataaars/png?seed=portfolio&size=288"
              alt={hero.name}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            initial: {},
            animate: {
              transition: { staggerChildren: 0.06, delayChildren: 0.25 },
            },
          }}
          className="flex flex-wrap justify-center gap-2 mb-6"
        >
          {hero.badges.map((badge) => (
            <motion.div
              key={badge}
              variants={{
                initial: { opacity: 0, y: 16, scale: 0.9 },
                animate: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: springGentle,
                },
              }}
            >
              <Badge>{badge}</Badge>
            </motion.div>
          ))}
        </motion.div>

        {/* Name - typing effect */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springSmooth, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--color-text)] text-center mb-6 tracking-tight min-h-[1.2em] flex items-center justify-center"
        >
          <TypingTitle text={hero.name} />
        </motion.h1>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springSmooth, delay: 0.5 }}
          className="max-w-3xl mx-auto text-center text-lg text-[var(--color-text-muted)] mb-10 leading-relaxed"
        >
          {hero.bio}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springSmooth, delay: 0.6 }}
          className="flex justify-center"
        >
          <Button
            href="#contact"
            variant="primary"
            size="lg"
            icon={<HiOutlineMail className="w-5 h-5" />}
          >
            {hero.ctaText}
          </Button>
        </motion.div>

        {/* Floating recommendation card - right */}
        <motion.div
          initial={{ opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...springSmooth, delay: 0.7 }}
          className="hidden lg:flex absolute right-[8%] top-[28%] items-center gap-3 bg-[var(--color-card-alt)] rounded-2xl shadow-lg border border-[var(--color-border)] p-4 w-[220px]"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            className="shrink-0 w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center shadow-sm"
          >
            <FaLinkedinIn className="w-6 h-6 text-[var(--color-text)]" />
          </motion.div>
          <div>
            <p className="text-xs text-[var(--color-text-muted)]">{hero.recommendation.text}</p>
            <p className="text-sm font-semibold text-[var(--color-text)]">
              {hero.recommendation.name}
            </p>
          </div>
          <HiArrowRight className="w-4 h-4 text-[var(--color-text-muted)] flex-shrink-0" />
        </motion.div>
      </div>
    </section>
  );
}
