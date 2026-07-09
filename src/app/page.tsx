import Background from "@/components/Background";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import WhyUs from "@/components/WhyUs";
import OnGoing from "@/components/OnGoing";
import Timer from "@/components/Timer";
import Timeline from "@/components/Timeline";
import OurEvents from "@/components/OurEvents";
import Faq from "@/components/Faq";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import Mascot from "@/components/Mascot";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Background />
      <Header />
      <main className="relative flex flex-col">
        <Hero />
        <AboutUs />
        <WhyUs />
        <OnGoing />
        <Timer />
        <Timeline />
        <OurEvents />
        <Faq />
        <Cta />
      </main>
      <div className="relative">
        <Mascot
          pose="wink-left"
          className="pointer-events-none absolute bottom-full left-1/2 z-0 h-20 w-29 -translate-x-1/2 translate-y-1/2 sm:h-32 sm:w-46 md:h-75 md:w-109 lg:h-87.5 lg:w-126"
        />
        <Footer className="relative z-10" />
      </div>
    </div>
  );
}
