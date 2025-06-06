import { motion } from 'framer-motion';

const contactInfo = {
  email: 'abdulmvlick@gmail.com',
  phone: '07 53 04 63 03',
  location: 'Paris, France',
  social: {
    github: 'https://github.com/ABDULMVLICK',
    linkedin: 'https://www.linkedin.com/in/Abdou%20Malick%20SEIBOU'
  }
};

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            N'hésitez pas à me contacter pour discuter de vos projets ou d'opportunités d'alternance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Informations de contact</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium text-lavender mb-2">Email</h4>
                <a
                  href={'mailto:' + contactInfo.email}
                  className="text-gray-600 hover:text-lavender transition-colors"
                >
                  {contactInfo.email}
                </a>
              </div>
              <div>
                <h4 className="text-lg font-medium text-lavender mb-2">Téléphone</h4>
                <a
                  href={'tel:' + contactInfo.phone.replace(/\s/g, '')}
                  className="text-gray-600 hover:text-lavender transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </div>
              <div>
                <h4 className="text-lg font-medium text-lavender mb-2">Localisation</h4>
                <p className="text-gray-600">{contactInfo.location}</p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-lavender mb-2">Réseaux sociaux</h4>
                <div className="flex gap-4">
                  <a
                    href={contactInfo.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-lavender transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href={contactInfo.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-lavender transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Envoyez-moi un message</h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-lavender text-white py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
              >
                Envoyer
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 