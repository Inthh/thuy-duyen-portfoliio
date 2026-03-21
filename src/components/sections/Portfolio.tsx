"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { HiExternalLink } from "react-icons/hi";
import { SectionWrapper } from "./SectionWrapper";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { useLocale } from "@/components/LocaleProvider";

export function Portfolio() {
  const { translations } = useLocale();
  const { portfolio } = translations;

  return (
    <SectionWrapper id="portfolio" className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
            {portfolio.title}
          </h2>
          <p className="text-[var(--color-text-muted)]">{portfolio.subtitle}</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 mb-12">
          {portfolio.projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-[var(--color-card-alt)] rounded-2xl overflow-hidden border border-[var(--color-border)] hover:shadow-xl hover:border-[var(--color-accent)]/50 transition-all duration-300"
            >
              <div className="relative aspect-[4/3] bg-[var(--color-bg)]/30 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2 group-hover:text-[var(--color-text-muted)]">
                  {project.title}
                </h3>
                <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Button variant="outline" size="lg" icon={<HiExternalLink className="w-5 h-5" />}>
            {portfolio.viewMoreText}
          </Button>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
