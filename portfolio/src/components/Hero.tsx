import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
            Abdou-malick <span className="text-lavender">SEIBOU</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8">
            Développeur Full Stack
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-12">
            Passionné par le développement web, mobile et desktop.
            En recherche d'alternance pour Septembre 2025.
          </p>
          <div className="flex justify-center gap-4">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-lavender text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-opacity-90 transition-colors"
            >
              Me contacter
            </motion.a>
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-lavender px-8 py-3 rounded-lg font-semibold shadow-lg border-2 border-lavender hover:bg-lavender hover:text-white transition-colors"
            >
              Voir mes projets
            </motion.a>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-gray-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
} 