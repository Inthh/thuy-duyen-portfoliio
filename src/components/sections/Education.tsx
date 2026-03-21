"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HiAcademicCap } from "react-icons/hi";
import Image from "next/image";
import { SectionWrapper } from "./SectionWrapper";
import { useLocale } from "@/components/LocaleProvider";
import type { EducationItem } from "@/locales/types";
import { fadeInLeft, springSmooth, springGentle } from "@/lib/animations";

const CIRCLE_POSITIONS = [
  { angle: 210, label: "top-left" },
  { angle: 330, label: "top-right" },
  { angle: 90, label: "bottom" },
];

function CircularImageStack({ images }: { images: string[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const radius = { sm: 90, md: 105, lg: 115 };

  return (
    <div className="relative mt-8 mx-auto w-[280px] h-[280px] sm:w-[330px] sm:h-[330px] md:w-[360px] md:h-[360px]">
      {images.map((src, i) => {
        const pos = CIRCLE_POSITIONS[i % CIRCLE_POSITIONS.length];
        const rad = (pos.angle * Math.PI) / 180;
        const isActive = activeIndex === i;

        return (
          <motion.div
            key={i}
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
            onClick={() => setActiveIndex(isActive ? null : i)}
            className="absolute cursor-pointer"
            style={{
              left: "50%",
              top: "50%",
              zIndex: isActive ? 30 : 10 + i,
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ ...springGentle, delay: 0.12 * i }}
          >
            <motion.div
              animate={{
                x: `calc(-50% + ${Math.cos(rad) * radius.sm}px)`,
                y: `calc(-50% + ${Math.sin(rad) * radius.sm}px)`,
                scale: isActive ? 1.12 : 1,
              }}
              whileHover={{ scale: 1.1 }}
              transition={springGentle}
              className="relative w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] md:w-[180px] md:h-[180px] rounded-2xl overflow-hidden ring-3 ring-[var(--color-bg)]"
              style={{
                boxShadow: isActive
                  ? "0 16px 36px var(--color-shadow), 0 0 0 2px var(--color-shadow-accent)"
                  : "0 8px 24px var(--color-shadow)",
              }}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover transition-transform duration-500 ease-out hover:scale-110"
                sizes="(max-width: 640px) 140px, 180px"
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

function EducationCard({
  item,
  index,
}: {
  item: EducationItem;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const delay = index * 0.15;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ ...springSmooth, delay }}
      whileHover={{ y: -5, scale: 1.01 }}
      className="group relative bg-[var(--color-card)] backdrop-blur-sm rounded-2xl border border-[var(--color-border)] overflow-hidden shadow-sm hover:shadow-xl hover:border-[var(--color-accent)]/40 transition-shadow duration-300"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Left: Info */}
        <div className="flex-1 p-5 md:p-7 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : undefined}
              transition={{ ...springGentle, delay: delay + 0.1 }}
              className="shrink-0 w-11 h-11 rounded-xl bg-[var(--color-accent)]/20 flex items-center justify-center"
            >
              <HiAcademicCap className="w-5 h-5 text-[var(--color-accent)]" />
            </motion.div>
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-[var(--color-accent)]/20 text-xs font-semibold text-[var(--color-accent)] tracking-wide">
              {item.period}
            </span>
          </div>

          <motion.h3
            initial={{ opacity: 0, x: -12 }}
            animate={isInView ? { opacity: 1, x: 0 } : undefined}
            transition={{ ...springGentle, delay: delay + 0.12 }}
            className="text-lg md:text-xl font-bold text-[var(--color-text)] mb-1 leading-tight"
          >
            {item.institution}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : undefined}
            transition={{ ...springGentle, delay: delay + 0.16 }}
            className="text-sm font-medium text-[var(--color-accent)] mb-3"
          >
            {item.degree}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ ...springGentle, delay: delay + 0.2 }}
            className="text-[var(--color-text-muted)] text-sm leading-relaxed"
          >
            {item.description}
          </motion.p>
        </div>

        {/* Right: Image */}
        <div className="relative sm:w-[220px] md:w-[260px] lg:w-[300px] h-[200px] sm:h-auto shrink-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-card)]/60 via-transparent to-transparent z-10 hidden sm:block pointer-events-none" />
          <Image
            src={item.image}
            alt={item.institution}
            fill
            className="object-cover transition-all duration-500 ease-out group-hover:scale-105 group-hover:brightness-110"
            sizes="(max-width: 640px) 100vw, 300px"
          />
        </div>
      </div>
    </motion.article>
  );
}

export function Education() {
  const { translations } = useLocale();
  const { education, educationHeaderImages } = translations;

  return (
    <SectionWrapper id="education" className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-[250px_1fr] lg:grid-cols-[314px_1fr] gap-12 md:gap-16">
          <div className="md:sticky md:top-32">
            <motion.h2
              initial={fadeInLeft.initial}
              whileInView={fadeInLeft.animate}
              viewport={{ once: true, margin: "-50px" }}
              transition={fadeInLeft.transition}
              className="text-2xl md:text-3xl font-bold text-[var(--color-text)]"
            >
              {translations.common.sections.education}
            </motion.h2>
            {/* <CircularImageStack images={educationHeaderImages} /> */}
          </div>
          <div className="space-y-6">
            {education.map((item, i) => (
              <EducationCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
