import React, { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

import Header from "./components/headerSection";
import Hero from "./components/heroSection";
import CreativeTextSection from "./components/textSection";
import ManifestoSection from "./components/manifestoSection";
import MotionSection from "./components/MotionSection";
import FooterSection from "./components/FooterSection";
import VideoSection from "./components/VideoSection";
import PortfolioSection from "./components/PortfolioSection";
import ServicesStackSection from "./components/servicesStackSection";
import CursorFollower from "./components/CursorFollower";
import AnimatedMembers from "./components/AnimatedMembers";
import ContactSection from "./components/ContactSection";
import SmoothAlternatingSlider1 from "./components/imgsSlider";
import Loader from "./loader.jsx";
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);

  /* -------------------------------
     INIT LENIS + SCROLLTRIGGER
     ONLY AFTER LOADER FINISHES
  -------------------------------- */
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      smoothTouch: true,
    });

    window.lenis = lenis;

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // 🔗 connect Lenis with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length
          ? lenis.scrollTo(value, { immediate: true })
          : lenis.scroll;
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

    ScrollTrigger.defaults({ scroller: document.body });
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      delete window.lenis;
    };
  }, [loading]);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}

      {!loading && (
        <>
          <CursorFollower />
          <Header />
          <Hero />
          <SmoothAlternatingSlider1 />
          <CreativeTextSection />
          <ManifestoSection />
          <ServicesStackSection />
          <MotionSection />
          <VideoSection />
          <PortfolioSection />
          <AnimatedMembers />
          <ContactSection />
          <FooterSection />
        </>
      )}
    </>
  );
}

export default App;
