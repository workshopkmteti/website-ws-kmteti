import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WhyUsSection from "@/components/WhyUsSection";
import OnGoingSection from "@/components/OnGoingSection";
import CountdownTimer from "@/components/CountdownTimer";
import TimelineSection from "@/components/TimelineSection";
import OurEventsSection from "@/components/OurEventsSection";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

const REGISTRATION_DEADLINE = new Date("2025-07-01T23:59:59");
const UPCOMING_EVENT_NAME = "EVENT";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <WhyUsSection />
        <OnGoingSection />
        <CountdownTimer
          targetDate={REGISTRATION_DEADLINE}
          eventName={UPCOMING_EVENT_NAME}
        />
        <TimelineSection />
        <OurEventsSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
