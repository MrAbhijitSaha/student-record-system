import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";

const HomePage = () => {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <Hero />
      <Features />
      <HowItWorks />
    </div>
  );
};

export default HomePage;
