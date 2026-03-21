"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionWrapper } from "./SectionWrapper";
import { useLocale } from "@/components/LocaleProvider";
import { fadeInLeft, springSmooth, springGentle } from "@/lib/animations";

export function MyJourney() {
  const { translations } = useLocale();
  const journey = translations.journey;
  const paragraphs = journey.content.split("\n\n").filter(Boolean);

  return (
    <SectionWrapper id="journey" className="py-16 md:py-24 bg-[var(--color-bg-secondary)]/40">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-[210px_1fr] gap-12 md:gap-16">
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
                <Image
                  src={journey.image}
                  alt={journey.title}
                  fill
                  className="object-cover transition-all duration-600 ease-out group-hover:scale-107 group-hover:brightness-110"
                  sizes="(max-width: 768px) 100vw, 314px"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[var(--color-text)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
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
