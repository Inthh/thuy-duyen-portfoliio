"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "./SectionWrapper";
import { Badge } from "../ui/Badge";
import { useLocale } from "@/components/LocaleProvider";
import { fadeInLeft, staggerChildScale } from "@/lib/animations";

export function SkillSet() {
  const { translations } = useLocale();
  const { skills } = translations;

  return (
    <SectionWrapper id="skills" className="py-16 md:py-24 bg-[var(--color-bg-secondary)]/40">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-[250px_1fr] lg:grid-cols-[314px_1fr] gap-12 md:gap-16">
          <motion.h2
            initial={fadeInLeft.initial}
            whileInView={fadeInLeft.animate}
            viewport={{ once: true, margin: "-50px" }}
            transition={fadeInLeft.transition}
            className="text-2xl md:text-3xl font-bold text-[var(--color-text)] md:sticky md:top-32"
          >
            {translations.common.sections.skillsTools}
          </motion.h2>
          <div className="space-y-12">
            <motion.div
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-40px" }}
              variants={{
                initial: {},
                whileInView: {
                  transition: { staggerChildren: 0.04, delayChildren: 0.1 },
                },
              }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-[var(--color-text)]">{translations.common.sections.product}</h3>
              <div className="flex flex-wrap gap-3">
                {skills.product.map((skill, i) => (
                  <motion.div
                    key={skill}
                    variants={staggerChildScale}
                    viewport={{ once: true }}
                  >
                    <Badge>{skill}</Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-40px" }}
              variants={{
                initial: {},
                whileInView: {
                  transition: { staggerChildren: 0.04, delayChildren: 0.1 },
                },
              }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-[var(--color-text)]">{translations.common.sections.uxDesign}</h3>
              <div className="flex flex-wrap gap-3">
                {skills.uxDesign.map((skill, i) => (
                  <motion.div
                    key={skill}
                    variants={staggerChildScale}
                    viewport={{ once: true }}
                  >
                    <Badge>{skill}</Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
