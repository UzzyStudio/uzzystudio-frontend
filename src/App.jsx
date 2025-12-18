import React from "react";
import Header from "./components/headerSection";
import Hero from "./components/heroSection";
import SmoothAlternatingSlider from "./components/imagesSlider";
import CreativeTextSection from "./components/textSection";
import ManifestoSection from "./components/manifestoSection";
import MotionSection from "./components/MotionSection";
import FooterSection from "./components/FooterSection";
import VideoSection from "./components/VideoSection";
import PortfolioSection from "./components/PortfolioSection";
// import ServicesSection from './components/ServicesSection';
import ServicesStackSection from "./components/servicesStackSection";
import CursorFollower from "./components/CursorFollower";
import AnimatedMembers from "./components/AnimatedMembers";
import ContactSection from "./components/ContactSection";
import SmoothAlternatingSlider1 from "./components/imgsSlider";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
function App() {
  useEffect(() => {
    if (!window.lenis) return;

    window.lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length
          ? window.lenis.scrollTo(value)
          : window.lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    ScrollTrigger.defaults({
      scroller: document.body,
    });

    ScrollTrigger.refresh();
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      smoothTouch: true,
    });

    // ✅ expose globally (for header / other components)
    window.lenis = lenis;
    let rafId;

    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      // ✅ STOP RAF LOOP
      cancelAnimationFrame(rafId);

      // ✅ REMOVE ALL LENIS LISTENERS
      lenis.destroy();
      // ✅ remove global reference
      delete window.lenis;
    };
  }, []);
  return (
    <>
      <CursorFollower />
      <Header />
      <Hero />
      {/* <SmoothAlternatingSlider /> */}
      <SmoothAlternatingSlider1 />
      <CreativeTextSection />
      <ManifestoSection />
      <ServicesStackSection />
      {/* <ServicesSection /> */}
      <MotionSection />
      <VideoSection />
      <PortfolioSection />
      <AnimatedMembers />
      <ContactSection />
      <FooterSection />
    </>
  );
}

export default App;
