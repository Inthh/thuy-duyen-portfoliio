"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { SectionWrapper } from "./SectionWrapper";
import { useLocale } from "@/components/LocaleProvider";
import { fadeInLeft, springSmooth, springGentle } from "@/lib/animations";

const JOURNEY_SLIDES = ["/avatar_2.jpg", "/avatar_3.jpg"];
const JOURNEY_SLIDE_INTERVAL = 3000;

export function MyJourney() {
  const { translations } = useLocale();
  const journey = translations.journey;
  const paragraphs = journey.content.split("\n\n").filter(Boolean);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setSlideIndex((i) => (i + 1) % JOURNEY_SLIDES.length),
      JOURNEY_SLIDE_INTERVAL,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <SectionWrapper id="journey" className="py-16 md:py-24 bg-[var(--color-bg-secondary)]/40">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-[310px_1fr] gap-12 md:gap-16">
          {/* Left column: Title + Image */}
          <div>
            <motion.h2
              initial={fadeInLeft.initial}
              whileInView={fadeInLeft.animate}
              viewport={{ once: true, margin: "-50px" }}
              transition={fadeInLeft.transition}
              className="text-2xl md:text-3xl font-bold text-[var(--color-text)] md:sticky md:top-32"
            >
              {journey.title}

              {/* Image below title */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ ...springSmooth, delay: 0.15 }}
                className="group relative mt-6 rounded-2xl overflow-hidden aspect-3/4 shadow-md"
              >
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.div
                    key={JOURNEY_SLIDES[slideIndex]}
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={JOURNEY_SLIDES[slideIndex]}
                      alt={journey.title}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.07] group-hover:brightness-110"
                      sizes="(max-width: 768px) 100vw, 314px"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-linear-to-t from-[var(--color-text)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
              </motion.div>
            </motion.h2>
          </div>

          {/* Right column: Paragraphs with alternating direction */}
          <div className="space-y-6 bg-[var(--color-card)] p-4 rounded-xl">
            {paragraphs.map((paragraph, i) => {
              const fromLeft = i % 2 === 0;
              return (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: fromLeft ? -28 : 28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ ...springGentle, delay: i * 0.08 }}
                  className="text-[var(--color-text-muted)] leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              );
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
