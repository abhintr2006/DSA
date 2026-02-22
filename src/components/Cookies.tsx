interface CookiesProps {
  activeView: string;
  darkMode: boolean;
}

const Cookies = ({ activeView, darkMode }: CookiesProps) => {
  if (activeView !== "cookies") return null;

  return (
    <section className="pt-32 pb-20 px-6">
      <div
        className={`max-w-4xl mx-auto p-8 rounded-2xl ${darkMode ? "bg-white/5 border border-white/10" : "bg-white shadow-xl border border-gray-100"}`}>
        <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">
          Cookie Policy
        </h2>
        <div className="space-y-6 opacity-80 leading-relaxed">
          <p>
            This policy explains how DSA Study Hub uses cookies and similar
            technologies.
          </p>

          <h3 className="text-2xl font-semibold text-orange-500">
            1. What are Cookies?
          </h3>
          <p>
            Cookies are small text files that are stored on your device to help
            websites function properly and remember your preferences.
          </p>

          <h3 className="text-2xl font-semibold text-orange-500">
            2. How We Use Them
          </h3>
          <p>
            We use essential "functional" storage to save your preference for
            Dark Mode vs Light Mode. This ensures that the site looks the way
            you want it every time you return.
          </p>

          <h3 className="text-2xl font-semibold text-orange-500">
            3. Your Choices
          </h3>
          <p>
            You can manage or delete cookies through your browser settings. Note
            that disabling certain storage might affect the persistence of your
            theme preferences.
          </p>

          <h3 className="text-2xl font-semibold text-orange-500">
            4. No Tracking Cookies
          </h3>
          <p>
            We do not use advertising, marketing, or third-party tracking
            cookies on this platform.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Cookies;
