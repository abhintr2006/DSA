interface PrivacyProps {
  activeView: string;
  darkMode: boolean;
}

const Privacy = ({ activeView, darkMode }: PrivacyProps) => {
  if (activeView !== "privacy") return null;

  return (
    <section className="pt-32 pb-20 px-6">
      <div
        className={`max-w-4xl mx-auto p-8 rounded-2xl ${darkMode ? "bg-white/5 border border-white/10" : "bg-white shadow-xl border border-gray-100"}`}>
        <h2 className="text-4xl font-bold mb-8 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">
          Privacy Policy
        </h2>
        <div className="space-y-6 opacity-80 leading-relaxed">
          <p>
            At DSA Study Hub, we value your privacy. This policy outlines how we
            handle information when you visit our site.
          </p>

          <h3 className="text-2xl font-semibold text-orange-500">
            1. Information Collection
          </h3>
          <p>
            We do not collect personal identifiable information unless you
            voluntarily provide it. We may use local storage to remember your
            theme preference (Dark/Light mode).
          </p>

          <h3 className="text-2xl font-semibold text-orange-500">
            2. Usage Data
          </h3>
          <p>
            We do not track your specific activity or sell your data to third
            parties. The platform is designed to be a private tool for learning.
          </p>

          <h3 className="text-2xl font-semibold text-orange-500">
            3. Local Storage
          </h3>
          <p>
            We use your browser's local storage solely to enhance your user
            experience, such as saving your dark mode toggle state.
          </p>

          <h3 className="text-2xl font-semibold text-orange-500">
            4. Third-Party Links
          </h3>
          <p>
            Our site may contain links to external repositories (like GitHub) or
            social media. We are not responsible for the privacy practices of
            those external sites.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Privacy;
