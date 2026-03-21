import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BackgroundPattern } from "@/components/BackgroundPattern";
import { GoToTop } from "@/components/GoToTop";
import { MyJourney } from "@/components/sections/MyJourney";
import { WorkHistory } from "@/components/sections/WorkHistory";
import { Education } from "@/components/sections/Education";
import { SkillsAndTools } from "@/components/sections/SkillsAndTools";
import { Portfolio } from "@/components/sections/Portfolio";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <BackgroundPattern />
      <Header />
      <GoToTop />
      <main>
        <Hero />
        <MyJourney />
        <WorkHistory />
        <Education />
        <SkillsAndTools />
        {/* <Portfolio /> */}
        <Footer />
      </main>
    </div>
  );
}
