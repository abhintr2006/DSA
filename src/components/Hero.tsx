interface HeroProps {
  activeView: string;
}

const Hero = ({ activeView }: HeroProps) => {
  if (activeView !== "home") return null;

  return (
    <section className="pt-32 pb-20 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold mb-6 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">
          Master Data Structures & Algorithms
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Explore comprehensive study materials and coding programs to ace DSA.
        </p>
      </div>
    </section>
  );
};

export default Hero;
