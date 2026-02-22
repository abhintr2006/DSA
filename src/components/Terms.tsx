interface TermsProps {
  activeView: string;
  darkMode: boolean;
}

const Terms = ({ activeView, darkMode }: TermsProps) => {
  if (activeView !== "terms") return null;

  return (
    <section className="pt-32 pb-20 px-6">
      <div
        className={`max-w-4xl mx-auto p-8 rounded-2xl ${darkMode ? "bg-white/5 border border-white/10" : "bg-white shadow-xl border border-gray-100"}`}>
        <h2 className="text-4xl font-bold mb-8 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">
          Terms of Service
        </h2>
        <div className="space-y-6 opacity-80 leading-relaxed">
          <p>
            Welcome to DSA Study Hub. By accessing or using our platform, you
            agree to comply with and be bound by the following terms and
            conditions.
          </p>

          <h3 className="text-2xl font-semibold text-orange-500">
            1. Educational Purpose
          </h3>
          <p>
            The content provided on this website is for educational and
            informational purposes only. While we strive for accuracy, we do not
            guarantee that the algorithms or explanations are error-free.
          </p>

          <h3 className="text-2xl font-semibold text-orange-500">
            2. Intellectual Property
          </h3>
          <p>
            The code, visualizations, and content are the property of DSA Study
            Hub and its contributors. You may use the provided code for personal
            learning and academic projects.
          </p>

          <h3 className="text-2xl font-semibold text-orange-500">
            3. User Conduct
          </h3>
          <p>
            Users are expected to use the platform responsibly. Any attempt to
            disrupt the service, scrape data maliciously, or use the simulator
            for unintended purposes is prohibited.
          </p>

          <h3 className="text-2xl font-semibold text-orange-500">
            4. Modifications
          </h3>
          <p>
            We reserve the right to modify these terms at any time. Continued
            use of the platform after changes indicates your acceptance of the
            new terms.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Terms;
