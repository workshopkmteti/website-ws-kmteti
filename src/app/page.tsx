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
      <Footer />
    </div>
  );
}
