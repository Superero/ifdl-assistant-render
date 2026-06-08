# 🎓 IFDL Assistant

Chatbot pédagogique IA pour le Master IFDL, basé sur Node.js + Express + OpenRouter.

---

## 🚀 Déploiement sur Render (gratuit)

### 1. Préparer le dépôt GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/votre-compte/ifdl-assistant.git
git push -u origin main
```

> ⚠️ Le fichier `.env` est dans `.gitignore` — ne jamais le committer avec vos vraies clés.

---

### 2. Créer le service sur Render

1. Connectez-vous sur [render.com](https://render.com)
2. Cliquez **New → Web Service**
3. Connectez votre dépôt GitHub
4. Configurez :
   - **Name** : `ifdl-assistant` (ou autre)
   - **Environment** : `Node`
   - **Build Command** : `npm install`
   - **Start Command** : `node server.js`
   - **Plan** : Free

---

### 3. Configurer les variables d'environnement

Dans Render → **Environment** → **Environment Variables**, ajouter :

| Variable | Valeur |
|---|---|
| `OPENROUTER_API_KEY` | `sk-or-v1-xxxx...` (votre clé OpenRouter) |
| `AI_MODEL` | `mistralai/mistral-7b-instruct:free` |
| `SITE_URL` | `https://ifdl-assistant.onrender.com` (votre URL Render) |
| `ALLOWED_ORIGIN` | `*` ou votre domaine Moodle |

> 🔑 Obtenez une clé gratuite sur [openrouter.ai/keys](https://openrouter.ai/keys)

---

### 4. Déployer

Cliquez **Create Web Service** — Render va builder et lancer l'app automatiquement.

L'URL sera : `https://ifdl-assistant.onrender.com`

---

## 🔧 Développement local

```bash
npm install
cp .env.example .env
# Éditez .env avec vos vraies valeurs
npm start
```

Accéder à : http://localhost:3000

---

## 📁 Structure du projet

```
IFDL_ASSISTANT/
├── server.js              # Serveur Express principal
├── package.json
├── .env.example           # Template des variables d'environnement
├── .gitignore
├── public/
│   ├── index.html         # Interface utilisateur
│   ├── style.css
│   └── ifdl-logo.png
└── knowledge/
    ├── master_ifdl.yaml   # Informations générales du Master
    └── modules/
        ├── module1_sciences_education.yaml
        ├── module2_digital_learning.yaml
        ├── module3_ingenierie_pedagogique.yaml
        ├── module4_ia_education.yaml
        ├── module5_psychologie_du_travail.yaml
        └── module6_initiation_grh.yaml
```

---

## 🤖 Modèles IA gratuits (OpenRouter)

| Modèle | ID |
|---|---|
| Mistral 7B | `mistralai/mistral-7b-instruct:free` |
| Llama 3 8B | `meta-llama/llama-3-8b-instruct:free` |
| Gemma 3 12B | `google/gemma-3-12b-it:free` |

---

## 🔗 Intégration Moodle

Pour intégrer dans Moodle via iframe :

```html
<iframe 
  src="https://ifdl-assistant.onrender.com" 
  width="100%" 
  height="700px"
  frameborder="0">
</iframe>
```

Pensez à configurer `ALLOWED_ORIGIN` avec l'URL de votre Moodle.
