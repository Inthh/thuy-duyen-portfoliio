"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "./SectionWrapper";
import { Badge } from "../ui/Badge";
import { useLocale } from "@/components/LocaleProvider";
import type { WorkHistoryItem } from "@/locales/types";
import {
  fadeInLeft,
  springSmooth,
  springBouncy,
  springGentle,
} from "@/lib/animations";

function TimelineEntry({
  job,
  index,
  isLast,
}: {
  job: WorkHistoryItem;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const delay = index * 0.12;

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-[28px_1fr] md:grid-cols-[260px_48px_1fr] lg:grid-cols-[300px_56px_1fr] gap-x-3 md:gap-x-0"
    >
      {/* LEFT: Period + Company (md+) */}
      <motion.div
        initial={{ opacity: 0, x: 0 }}
        animate={isInView ? { opacity: 1, x: 0 } : undefined}
        transition={{ ...springSmooth, delay }}
        className="hidden md:flex flex-col items-end justify-start pt-1 pr-6"
      >
        <span className="inline-block px-3 py-1 rounded-full bg-[var(--color-accent)]/12 text-xs font-semibold text-[var(--color-accent)] mb-2 tracking-wide">
          {job.period}
        </span>
        <h3 className="text-lg font-bold text-[var(--color-text)] text-right leading-tight">
          {job.company}
        </h3>
        <p className="text-sm text-[var(--color-text-muted)] mt-0.5">{job.role}</p>
      </motion.div>

      {/* CENTER: Dot + Line */}
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : undefined}
          transition={{ ...springBouncy, delay: delay + 0.06 }}
          className="relative z-10 mt-1.5"
        >
          <div className="w-[18px] h-[18px] rounded-full bg-[var(--color-accent)] border-[3px] border-[var(--color-bg)] shadow-[0_0_0_3px_var(--color-shadow-accent),0_0_14px_var(--color-shadow-accent)]" />
          {index === 0 && (
            <motion.div
              className="absolute -inset-1.5 rounded-full border-2 border-[var(--color-accent)]/25"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut" as const,
              }}
            />
          )}
        </motion.div>

        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : undefined}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + 0.15,
            }}
            style={{ transformOrigin: "top" }}
            className="flex-1 w-[2px] bg-linear-to-b from-[var(--color-accent)] via-[var(--color-accent)] to-transparent mt-3"
          />
        )}
      </div>

      {/* RIGHT: Content */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ ...springGentle, delay: delay + 0.1 }}
        className={`${isLast ? "pb-0" : "pb-10 md:pb-14"} md:pl-6`}
      >
        {/* Mobile header */}
        <div className="md:hidden mb-3">
          <span className="inline-block px-3 py-1 rounded-full bg-[var(--color-accent)]/12 text-xs font-semibold text-[var(--color-accent)] mb-1.5 tracking-wide">
            {job.period}
          </span>
          <h3 className="text-lg font-bold text-[var(--color-text)] leading-tight">
            {job.company}
          </h3>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">{job.role}</p>
        </div>

        {/* Detail card */}
        <motion.article
          whileHover={{
            y: -4,
            boxShadow:
              "0 16px 40px var(--color-shadow), 0 0 0 1px var(--color-shadow-accent)",
          }}
          transition={springGentle}
          className="bg-[var(--color-card)] backdrop-blur-sm rounded-2xl border border-[var(--color-border)] p-5 md:p-6 shadow-sm transition-shadow duration-300"
        >
          <p className="text-[var(--color-text-muted)] leading-relaxed">{job.description}</p>

          {job.achievements && job.achievements.length > 0 && (
            <ul className="mt-4 space-y-2">
              {job.achievements.map((achievement, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={isInView ? { opacity: 1, x: 0 } : undefined}
                  transition={{
                    ...springGentle,
                    delay: delay + 0.2 + i * 0.06,
                  }}
                  className="flex items-start gap-2.5 text-[var(--color-text-muted)] text-sm leading-relaxed"
                >
                  <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] shrink-0" />
                  {achievement}
                </motion.li>
              ))}
            </ul>
          )}

          <div className="border-t border-[var(--color-border)] mt-5 pt-4 flex flex-wrap gap-2">
            {job.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </motion.article>
      </motion.div>
    </div>
  );
}

export function WorkHistory() {
  const { translations } = useLocale();
  const { workHistory } = translations;

  return (
    <SectionWrapper id="work-history" className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={fadeInLeft.initial}
          whileInView={fadeInLeft.animate}
          viewport={{ once: true, margin: "-50px" }}
          transition={fadeInLeft.transition}
          className="text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-12 md:mb-16"
        >
          {translations.common.sections.workHistory}
        </motion.h2>

        <div className="relative">
          {workHistory.map((job, i) => (
            <TimelineEntry
              key={job.id}
              job={job}
              index={i}
              isLast={i === workHistory.length - 1}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
