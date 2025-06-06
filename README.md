# Portfolio & Panel Admin - Abdou-malick SEIBOU

## 📋 Description
Portfolio professionnel avec panel d'administration intégré, développé avec React, TypeScript et Tailwind CSS.

## 🚀 Fonctionnalités

### Portfolio
- Design moderne et responsive
- Mode sombre/clair
- Sections : Accueil, À propos, Projets, Contact
- Animations fluides
- Optimisé pour le SEO

### Panel Admin
- Interface sécurisée
- Gestion complète des projets (CRUD)
- Stockage des données avec Supabase
- Interface utilisateur intuitive
- Mode sombre/clair

## 🛠 Technologies

- **Frontend**
  - React 18
  - TypeScript
  - Tailwind CSS
  - Vite
  - React Icons
  - Headless UI

- **Backend**
  - Supabase (PostgreSQL)
  - Authentication
  - Storage

## 📦 Installation

1. Cloner le projet
```bash
git clone https://github.com/votre-username/portfolio.git
cd portfolio
```

2. Installer les dépendances pour les deux projets
```bash
# Portfolio
cd portfolio
npm install

# Panel Admin
cd ../admin-panel
npm install
```

3. Configurer les variables d'environnement
```bash
# Dans le dossier portfolio
cp .env.example .env
# Dans le dossier admin-panel
cp .env.example .env
```

4. Démarrer les serveurs de développement
```bash
# Portfolio
cd portfolio
npm run dev

# Panel Admin
cd ../admin-panel
npm run dev
```

## 🔧 Configuration

### Supabase
1. Créer un projet sur [Supabase](https://supabase.com)
2. Copier les clés d'API dans les fichiers `.env`
3. Exécuter les migrations SQL pour créer les tables nécessaires

### Variables d'environnement
```env
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_clé_anon_supabase
```

## 🌐 Déploiement

Le projet peut être déployé sur n'importe quelle plateforme supportant Node.js. Recommandations :
- Portfolio : Vercel, Netlify
- Panel Admin : Vercel, Netlify

## 🔐 Sécurité

- Authentification sécurisée pour le panel admin
- Variables d'environnement pour les clés sensibles
- Validation des données côté client et serveur

## 📝 License

MIT License - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👤 Contact

Abdou-malick SEIBOU
- 🌐 [Portfolio](https://votre-portfolio.com)
- 📧 [Email](mailto:votre-email@example.com)
- 💼 [LinkedIn](https://linkedin.com/in/votre-profil)
- 🐱 [GitHub](https://github.com/votre-username) 