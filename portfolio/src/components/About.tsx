import { motion } from 'framer-motion';

const skills = {
  frontend: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Bootstrap', 'GSAP'],
  backend: ['Node.js', 'PHP', 'MySQL', 'Symfony', 'Supabase'],
  other: ['Docker', 'Firebase', 'MongoDB', 'Git', 'Vercel'],
  design: ['Figma', 'Photoshop', 'WordPress'],
  applications: ['Desktop (Electron)', 'Mobile (React Native + Expo)']
};

const experiences = [
  {
    period: '06/2024 – 08/2024',
    title: 'Stage Développeur Web Fullstack',
    company: 'Firham Assureur Conseil'
  },
  {
    period: '06/2023 – 08/2023',
    title: 'Stage académique Développeur Back-end',
    company: 'TICS MASTER'
  },
  {
    period: '05/2022 – 08/2022',
    title: 'Stage académique Développeur Front-end',
    company: 'TICS MASTER'
  }
];

const education = [
  {
    period: '09/2024 – en cours',
    title: '2e année Développement Web',
    school: 'École Multimédia – Paris'
  },
  {
    period: '09/2023 – 05/2024',
    title: '1ère année Développement Web',
    school: 'École Multimédia – Paris'
  },
  {
    period: '09/2021 – 06/2023',
    title: '1ère et 2ème année Systèmes Informatiques et Logiciels',
    school: 'UATM GASA, Cotonou'
  }
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">À propos de moi</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Étudiant en développement web full stack de 21 ans, basé à Paris. Je suis passionné par la création d'applications web et mobiles modernes et performantes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Compétences</h3>
            <div className="space-y-6">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category}>
                  <h4 className="text-lg font-medium text-lavender mb-2 capitalize">
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-gray-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Expériences</h3>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={index} className="border-l-2 border-lavender pl-4">
                    <p className="text-sm text-gray-500">{exp.period}</p>
                    <h4 className="text-lg font-medium text-gray-900">{exp.title}</h4>
                    <p className="text-gray-600">{exp.company}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Formation</h3>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-lavender pl-4">
                    <p className="text-sm text-gray-500">{edu.period}</p>
                    <h4 className="text-lg font-medium text-gray-900">{edu.title}</h4>
                    <p className="text-gray-600">{edu.school}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 