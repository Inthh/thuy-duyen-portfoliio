"use client";

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
} from "react-icons/si";
import { SectionWrapper } from "./SectionWrapper";
import { useLocale } from "@/components/LocaleProvider";
import { fadeInUp, staggerChildScale, springGentle, springSmooth } from "@/lib/animations";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  figma: SiFigma,
  framer: SiFramer,
  webflow: SiWebflow,
  shopify: SiShopify,
  notion: SiNotion,
  xd: SiFigma,
  illustrator: SiFigma,
  photoshop: SiFigma,
  ae: SiFigma,
  vscode: SiNextdotjs,
  typescript: SiTypescript,
  react: SiReact,
  tailwind: SiTailwindcss,
};

export function Toolbox() {
  const { translations } = useLocale();
  const { toolbox } = translations;

  return (
    <SectionWrapper id="toolbox" className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={fadeInUp.initial}
          whileInView={fadeInUp.animate}
          viewport={{ once: true, margin: "-50px" }}
          transition={fadeInUp.transition}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
            {toolbox.title}
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
            {toolbox.subtitle}
          </p>
        </motion.div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {toolbox.tools.map((tool, i) => {
            const IconComponent = iconMap[tool.icon] || SiFigma;
            return (
              <motion.div
                key={tool.name}
                initial={staggerChildScale.initial}
                whileInView={staggerChildScale.whileInView}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ ...springGentle, delay: i * 0.05 }}
                whileHover={{ scale: 1.08, y: -6, transition: springSmooth }}
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[var(--color-card-alt)] border border-[var(--color-border)] shadow-sm flex items-center justify-center hover:shadow-lg hover:border-[var(--color-accent)]/50 transition-shadow cursor-default"
                title={tool.name}
              >
                <IconComponent className="w-10 h-10 md:w-12 md:h-12 text-[var(--color-text)]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
