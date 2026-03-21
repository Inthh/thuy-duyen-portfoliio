"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMail, HiMenu, HiX, HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import { Button } from "./ui/Button";
import { springSmooth, fadeInDown } from "@/lib/animations";
import { useTheme } from "@/components/ThemeProvider";
import { useLocale } from "@/components/LocaleProvider";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { locale, translations, toggleLocale } = useLocale();
  const navLinks = translations.navLinks;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={fadeInDown.initial}
      animate={fadeInDown.animate}
      transition={springSmooth}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-transparent backdrop-blur-xl shadow-lg shadow-[var(--color-shadow)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16 md:h-20">
          {/* Desktop: Floating pill nav */}
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springSmooth, delay: 0.15 }}
            className="hidden md:flex items-center gap-0.5 p-1.5 rounded-full bg-[var(--color-card-alt)] border border-[var(--color-border)] shadow-lg shadow-[var(--color-shadow)] max-w-full overflow-x-auto"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...springSmooth, delay: 0.2 + i * 0.05 }}
                className="relative px-3 py-2 text-xs sm:text-sm font-medium text-[var(--color-text)] rounded-full transition-colors hover:text-[var(--color-text-muted)] hover:bg-[var(--color-bg)]/30 whitespace-nowrap"
              >
                {link.label}
              </motion.a>
            ))}
            <div className="w-px h-5 bg-[var(--color-border)] mx-1" aria-hidden />
            <motion.button
              type="button"
              onClick={toggleLocale}
              aria-label={
                locale === "vi"
                  ? translations.common.switchToEnglish
                  : translations.common.switchToVietnamese
              }
              className="p-2.5 rounded-full text-xs font-semibold text-[var(--color-text)] hover:bg-[var(--color-border)] transition-colors min-w-[2.5rem]"
              whileTap={{ scale: 0.95 }}
            >
              {locale === "vi" ? "EN" : "VI"}
            </motion.button>
            <motion.button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="p-2.5 rounded-full text-[var(--color-text)] hover:bg-[var(--color-border)] transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {theme === "dark" ? (
                <HiOutlineSun className="w-5 h-5" />
              ) : (
                <HiOutlineMoon className="w-5 h-5" />
              )}
            </motion.button>
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...springSmooth, delay: 0.35 }}
            >
              <Button
                href="#contact"
                variant="primary"
                size="sm"
                icon={<HiOutlineMail className="w-4 h-4" />}
                className="h-10 px-5 min-w-0"
              >
                {translations.common.getInTouch}
              </Button>
            </motion.div>
          </motion.nav>

          {/* Mobile: Language + Theme toggle + Menu button */}
          <div className="flex md:hidden absolute right-4 top-1/2 -translate-y-1/2 items-center gap-2">
            <motion.button
              type="button"
              onClick={toggleLocale}
              aria-label={
                locale === "vi"
                  ? translations.common.switchToEnglish
                  : translations.common.switchToVietnamese
              }
              className="p-2.5 rounded-full bg-[var(--color-card-alt)]/80 border border-[var(--color-border)] text-xs font-semibold text-[var(--color-text)] transition-colors min-w-[2.5rem]"
              whileTap={{ scale: 0.95 }}
            >
              {locale === "vi" ? "EN" : "VI"}
            </motion.button>
            <motion.button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="p-2.5 rounded-full bg-[var(--color-card-alt)]/80 border border-[var(--color-border)] text-[var(--color-text)] transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {theme === "dark" ? (
                <HiOutlineSun className="w-5 h-5" />
              ) : (
                <HiOutlineMoon className="w-5 h-5" />
              )}
            </motion.button>
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-3 rounded-full bg-[var(--color-card-alt)] border border-[var(--color-border)] text-[var(--color-text)] shadow-md hover:bg-[var(--color-bg)]/30 transition-colors"
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <HiX className="w-6 h-6" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <HiMenu className="w-6 h-6" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Full screen overlay (add theme toggle in menu) */}
      <AnimatePresence>
        {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 md:hidden pt-24 pb-8 px-6 bg-[var(--color-bg)]/95 backdrop-blur-xl"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.nav
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ ...springSmooth, delay: 0.05 }}
              className="flex flex-col items-center gap-2 max-w-sm mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...springSmooth, delay: 0.08 + i * 0.06 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-4 px-6 text-lg font-semibold text-[var(--color-text)] bg-[var(--color-card-alt)] rounded-2xl text-center hover:bg-[var(--color-accent)]/30 transition-colors border border-[var(--color-border)]"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                type="button"
                onClick={() => {
                  toggleLocale();
                  setMobileMenuOpen(false);
                }}
                aria-label={
                  locale === "vi"
                    ? translations.common.switchToEnglish
                    : translations.common.switchToVietnamese
                }
                className="w-full py-4 px-6 flex items-center justify-center gap-2 text-lg font-semibold rounded-2xl border transition-colors bg-[var(--color-card-alt)] text-[var(--color-text)] border-[var(--color-border)] hover:opacity-90"
              >
                {locale === "vi" ? "English" : "Tiếng Việt"}
              </motion.button>
              <motion.button
                type="button"
                onClick={() => {
                  toggleTheme();
                  setMobileMenuOpen(false);
                }}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                className="w-full py-4 px-6 flex items-center justify-center gap-2 text-lg font-semibold rounded-2xl border transition-colors bg-[var(--color-card-alt)] text-[var(--color-text)] border-[var(--color-border)] hover:opacity-90"
              >
                {theme === "dark" ? (
                  <HiOutlineSun className="w-5 h-5" />
                ) : (
                  <HiOutlineMoon className="w-5 h-5" />
                )}
                {theme === "dark" ? "Light mode" : "Dark mode"}
              </motion.button>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springSmooth, delay: 0.28 }}
                className="w-full pt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button
                  href="#contact"
                  variant="primary"
                  size="lg"
                  icon={<HiOutlineMail className="w-5 h-5" />}
                  className="w-full"
                >
                  {translations.common.getInTouch}
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
