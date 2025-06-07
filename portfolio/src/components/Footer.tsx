export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <div className="flex space-x-6 mb-4">
            <a
              href="https://github.com/ABDULMVLICK"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-lavender transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/abdou-malick-seibou-192356267/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-lavender transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:abdulmvlick@gmail.com"
              className="text-gray-600 hover:text-lavender transition-colors"
            >
              Email
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            © {currentYear} Abdou-malick SEIBOU. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
} 