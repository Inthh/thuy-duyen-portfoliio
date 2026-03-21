"use client";

import { motion } from "framer-motion";
import { SiPinterest, SiBehance, SiDribbble } from "react-icons/si";
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { useLocale } from "@/components/LocaleProvider";
import { springSmooth } from "@/lib/animations";

const socialIcons = [
  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  { icon: FaXTwitter, href: "#", label: "X / Twitter" },
  { icon: SiPinterest, href: "#", label: "Pinterest" },
  { icon: SiBehance, href: "#", label: "Behance" },
  { icon: SiDribbble, href: "#", label: "Dribbble" },
];

export function Footer() {
  const { translations } = useLocale();
  const footer = translations.footer;

  return (
    <footer id="contact" className="bg-[var(--color-card-alt)] border-t border-[var(--color-border)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ ...springSmooth, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-[var(--color-text-muted)]">{footer.copyright}</p>
          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={{
              initial: {},
              whileInView: {
                transition: { staggerChildren: 0.05, delayChildren: 0.2 },
              },
            }}
            className="flex gap-4"
          >
            {socialIcons.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                variants={{
                  initial: { opacity: 0, scale: 0.9 },
                  whileInView: { opacity: 1, scale: 1 },
                }}
                whileHover={{ scale: 1.1, y: -2 }}
                transition={springSmooth}
                className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors p-2 rounded-lg hover:bg-[var(--color-bg)]/30"
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
