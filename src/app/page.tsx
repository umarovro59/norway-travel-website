import { DestinationsGrid } from "@/components/DestinationsGrid/DestinationsGrid";
import { FeaturedTours } from "@/components/FeaturedTours/FeaturedTours";
import { FinalCTA } from "@/components/FinalCTA/FinalCTA";
import { Footer } from "@/components/Footer/Footer";
import { Hero } from "@/components/Hero/Hero";
import { SkipLink } from "@/components/SkipLink/SkipLink";
import { StorySection } from "@/components/StorySection/StorySection";
import { Testimonial } from "@/components/Testimonial/Testimonial";

export default function Home() {
  return (
    <>
      <SkipLink />
      <main id="main">
        <Hero />
        <StorySection />
        <DestinationsGrid />
        <FeaturedTours />
        <Testimonial />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
