"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  SiFigma,
  SiFramer,
  SiWebflow,
  SiShopify,
  SiNotion,
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiNextdotjs,
  SiFacebook,
  SiCanva,
} from "react-icons/si";
import { CapCutIcon } from "@/components/icons/CapCutIcon";
import { ShopeeIcon } from "@/components/icons/ShopeeIcon";
import { SectionWrapper } from "./SectionWrapper";
import { Badge } from "../ui/Badge";
import { useLocale } from "@/components/LocaleProvider";
import {
  fadeInUp,
  fadeInLeft,
  staggerChildScale,
  springGentle,
  springSmooth,
} from "@/lib/animations";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  figma: SiFigma,
  framer: SiFramer,
  webflow: SiWebflow,
  shopify: SiShopify,
  shopee: ShopeeIcon,
  notion: SiNotion,
  xd: SiFigma,
  illustrator: SiFigma,
  photoshop: SiFigma,
  ae: SiFigma,
  vscode: SiNextdotjs,
  typescript: SiTypescript,
  react: SiReact,
  tailwind: SiTailwindcss,
  facebook: SiFacebook,
  canva: SiCanva,
  capcut: CapCutIcon,
};

type Tab = "skills" | "tools";

export function SkillsAndTools() {
  const { locale, translations } = useLocale();
  const { skills, toolbox } = translations;
  const [activeTab, setActiveTab] = useState<Tab>("skills");

  return (
    <SectionWrapper
      id="skills-tools"
      className="py-16 md:py-24 bg-[var(--color-bg-secondary)]/40"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={fadeInUp.initial}
          whileInView={fadeInUp.animate}
          viewport={{ once: true, margin: "-50px" }}
          transition={fadeInUp.transition}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--color-text)] mb-2">
            {translations.common.sections.skillsTools}
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto text-sm md:text-base">
            {toolbox.subtitle}
          </p>

          {/* Mobile / Tablet: Tab switcher */}
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            <button
              type="button"
              onClick={() => setActiveTab("skills")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "skills"
                  ? "bg-[var(--color-accent)] text-white shadow-md"
                  : "bg-[var(--color-card)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-bg)]/50"
              }`}
            >
              {translations.common.sections.skills}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("tools")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "tools"
                  ? "bg-[var(--color-accent)] text-white shadow-md"
                  : "bg-[var(--color-card)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-bg)]/50"
              }`}
            >
              {translations.common.sections.tools}
            </button>
          </div>
        </motion.div>

        {/* Content: Grid on desktop, tab content on mobile */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Skills panel */}
          <motion.div
            initial={fadeInLeft.initial}
            whileInView={fadeInLeft.animate}
            viewport={{ once: true, margin: "-40px" }}
            transition={fadeInLeft.transition}
            className={`lg:block ${activeTab === "skills" ? "block" : "hidden md:block"}`}
          >
            <div className="bg-[var(--color-card)] backdrop-blur-sm rounded-2xl border border-[var(--color-border)] p-5 md:p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[var(--color-text)] mb-4 flex items-center gap-2">
                <span className="w-1 h-5 rounded-full bg-[var(--color-accent)]" />
                {translations.common.sections.skills}
              </h3>

              <div className="space-y-6" key={locale}>
                {Object.entries(skills).map(([categoryKey, skillList]) => {
                  const sectionLabel =
                    translations.common.sections[categoryKey] ?? categoryKey;
                  return (
                    <motion.div
                      key={`${locale}-${categoryKey}`}
                      initial="initial"
                      whileInView="whileInView"
                      viewport={{ once: true }}
                      variants={{
                        initial: {},
                        whileInView: {
                          transition: {
                            staggerChildren: 0.04,
                            delayChildren: 0.1,
                          },
                        },
                      }}
                      className="space-y-3"
                    >
                      <h4 className="text-sm font-semibold text-[var(--color-text-muted)]">
                        {sectionLabel}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skillList.map((skill) => (
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
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Tools panel */}
          <motion.div
            initial={fadeInUp.initial}
            whileInView={fadeInUp.animate}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
            className={`lg:block ${activeTab === "tools" ? "block" : "hidden md:block"}`}
          >
            <div className="bg-[var(--color-card)] backdrop-blur-sm rounded-2xl border border-[var(--color-border)] p-5 md:p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[var(--color-text)] mb-4 flex items-center gap-2">
                <span className="w-1 h-5 rounded-full bg-[var(--color-accent)]" />
                {translations.common.sections.tools}
              </h3>

              <div className="flex flex-wrap justify-center sm:justify-start gap-3 md:gap-4">
                {toolbox.tools.map((tool, i) => {
                  const IconComponent = iconMap[tool.icon] || SiFigma;
                  return (
                    <motion.div
                      key={tool.name}
                      initial={staggerChildScale.initial}
                      whileInView={staggerChildScale.whileInView}
                      viewport={{ once: true }}
                      transition={{ ...springGentle, delay: i * 0.04 }}
                      whileHover={{
                        scale: 1.08,
                        y: -4,
                        transition: springSmooth,
                      }}
                      className="w-16 h-16 sm:w-[72px] sm:h-[72px] md:w-20 md:h-20 rounded-xl bg-[var(--color-bg)]/90 border border-[var(--color-border)] flex items-center justify-center hover:shadow-lg hover:border-[var(--color-accent)]/40 transition-shadow cursor-default"
                      title={tool.name}
                    >
                      <IconComponent className="w-8 h-8 md:w-9 md:h-9 text-[var(--color-text)]" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
