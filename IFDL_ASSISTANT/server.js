// // require('dotenv').config();
// // const express = require('express');
// // const cors    = require('cors');
// // const path    = require('path');
// // const OpenAI  = require('openai');

// // const app = express();

// // // ── Client OpenAI pointant vers OpenRouter ────────────────────
// // const client = new OpenAI({
// //   apiKey:  process.env.OPENROUTER_API_KEY,
// //   baseURL: 'https://openrouter.ai/api/v1',
// //   defaultHeaders: {
// //     'HTTP-Referer': process.env.SITE_URL || 'http://localhost:3000',
// //     'X-Title':      'EduBot Pédagogique',
// //   },
// // });

// // app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }));
// // app.use(express.json({ limit: '4mb' }));
// // app.use(express.static(path.join(__dirname, 'public')));

// // // ── Route principale ──────────────────────────────────────────
// // app.post('/api/chat', async (req, res) => {
// //   const { messages, system, max_tokens = 1200, model } = req.body;

// //   if (!messages || !Array.isArray(messages) || messages.length === 0) {
// //     return res.status(400).json({ error: 'Le champ "messages" est requis.' });
// //   }

// //   const selectedModel = model
// //     || process.env.AI_MODEL
// //     || 'mistralai/mistral-7b-instruct:free';

// //   try {
// //     const response = await client.chat.completions.create({
// //       model: selectedModel,
// //       max_tokens,
// //       messages: [
// //         { role: 'system', content: system || 'Tu es un assistant pédagogique bienveillant. Réponds en français.' },
// //         ...messages,
// //       ],
// //     });

// //     const text = response.choices[0].message.content;
// //     res.json({ content: text });

// //   } catch (err) {
// //     console.error('[OpenRouter Error]', err.status, err.message);
// //     if (err.status === 401) return res.status(401).json({ error: 'Clé OpenRouter invalide. Vérifiez OPENROUTER_API_KEY dans .env' });
// //     if (err.status === 402) return res.status(402).json({ error: 'Crédits insuffisants. Rechargez sur openrouter.ai' });
// //     if (err.status === 429) return res.status(429).json({ error: 'Trop de requêtes. Réessayez dans quelques secondes.' });
// //     if (err.status === 404) return res.status(404).json({ error: `Modèle introuvable : "${selectedModel}". Vérifiez openrouter.ai/models` });
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // ── Santé ─────────────────────────────────────────────────────
// // app.get('/api/health', (_req, res) => res.json({
// //   status:   'ok',
// //   provider: 'OpenRouter',
// //   model:    process.env.AI_MODEL || 'mistralai/mistral-7b-instruct:free',
// //   keySet:   !!process.env.OPENROUTER_API_KEY,
// // }));

// // // ── Démarrage ─────────────────────────────────────────────────
// // const PORT = process.env.PORT || 3000;
// // app.listen(PORT, () => {
// //   console.log(`\n🎓 EduBot Pédagogique (OpenRouter)`);
// //   console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
// //   console.log(`✅  Serveur : http://localhost:${PORT}`);
// //   console.log(`🤖  Modèle  : ${process.env.AI_MODEL || 'mistralai/mistral-7b-instruct:free'}`);
// //   console.log(`🔑  Clé API : ${process.env.OPENROUTER_API_KEY ? '✓ détectée' : '✗ MANQUANTE — ajoutez dans .env'}\n`);
// // });


// require('dotenv').config();
// const express = require('express');
// const cors    = require('cors');
// const path    = require('path');
// const OpenAI  = require('openai');

// const app = express();

// // ── Client OpenAI pointant vers OpenRouter ────────────────────
// // OpenRouter expose une API compatible OpenAI — seul baseURL change
// const client = new OpenAI({
//   apiKey:  process.env.OPENROUTER_API_KEY,
//   baseURL: 'https://openrouter.ai/api/v1',
//   defaultHeaders: {
//     'HTTP-Referer': 'http://localhost:3000',   // identifie votre app sur openrouter.ai
//     'X-Title':      'TuteurIA',                // nom affiché dans votre dashboard
//   },
// });

// app.use(cors());
// app.use(express.json({ limit: '2mb' }));
// app.use(express.static(path.join(__dirname, 'public')));

// // ── Route principale ──────────────────────────────────────────
// app.post('/api/chat', async (req, res) => {
//   const { messages, system, max_tokens = 1000 } = req.body;

//   if (!messages || !Array.isArray(messages) || messages.length === 0) {
//     return res.status(400).json({ error: 'Le champ "messages" est requis.' });
//   }

//   // Modèle choisi : priorité à la requête, sinon .env, sinon défaut
//   const model = req.body.model
//     || process.env.AI_MODEL
//     // || 'anthropic/claude-sonnet-4-5'; just for test
//     || 'nvidia/nemotron-3-super-120b-a12b:free';

//   try {
//     const response = await client.chat.completions.create({
//       model,
//       max_tokens,
//       messages: [
//         { role: 'system', content: system || 'Tu es un assistant pédagogique bienveillant.' },
//         ...messages,
//       ],
//     });

//     const text = response.choices[0].message.content;
//     res.json({ content: text });

//   } catch (err) {
//     console.error('[OpenRouter Error]', err.status, err.message);
//     if (err.status === 401) return res.status(401).json({ error: 'Clé OpenRouter invalide. Vérifiez OPENROUTER_API_KEY dans .env' });
//     if (err.status === 402) return res.status(402).json({ error: 'Crédits OpenRouter insuffisants. Rechargez sur openrouter.ai' });
//     if (err.status === 429) return res.status(429).json({ error: 'Trop de requêtes. Réessayez dans quelques secondes.' });
//     if (err.status === 404) return res.status(404).json({ error: `Modèle introuvable : "${model}". Vérifiez le nom sur openrouter.ai/models` });
//     res.status(500).json({ error: err.message });
//   }
// });

// // ── Route : liste les modèles disponibles ─────────────────────
// app.get('/api/models', async (_req, res) => {
//   try {
//     const response = await fetch('https://openrouter.ai/api/v1/models', {
//       headers: { Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}` },
//     });
//     const data = await response.json();
//     // Retourne seulement id + name pour ne pas surcharger
//     const models = data.data.map(m => ({
//       id:          m.id,
//       name:        m.name,
//       context:     m.context_length,
//       promptPrice: m.pricing?.prompt,
//     }));
//     res.json({ models });
//   } catch (err) {
//     res.status(500).json({ error: 'Impossible de récupérer les modèles : ' + err.message });
//   }
// });

// // ── Santé ─────────────────────────────────────────────────────
// app.get('/api/health', (_req, res) => res.json({
//   status:   'ok',
//   provider: 'OpenRouter',
//   // model:    process.env.AI_MODEL || 'anthropic/claude-sonnet-4-5', just for testing the free version
//   model:    process.env.AI_MODEL || 'nvidia/nemotron-3-super-120b-a12b:free',
//   keySet:   !!process.env.OPENROUTER_API_KEY,
// }));

// // ── Démarrage ─────────────────────────────────────────────────
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`\n✅  TuteurIA (OpenRouter) démarré sur http://localhost:${PORT}`);
//   // console.log(`   Modèle  : ${process.env.AI_MODEL || 'anthropic/claude-sonnet-4-5'}`); judt for testing the free version
//   console.log(`   Modèle  : ${process.env.AI_MODEL || 'nvidia/nemotron-3-super-120b-a12b:free'}`);
//   console.log(`   Clé API : ${process.env.OPENROUTER_API_KEY ? '✓ détectée' : '✗ MANQUANTE'}`);
//   console.log(`   Modèles disponibles : http://localhost:${PORT}/api/models\n`);
// });

// ═══════════════════════════════════════════════════════════
//  IFDL ASSISTANT — server.js
//  Serveur Node.js + Express + OpenRouter
//  Lit les fichiers de connaissances (.yaml/.txt/.md) dynamiquement
// ═══════════════════════════════════════════════════════════
// test un nouveau server.js file
require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');
const fs      = require('fs');
const OpenAI  = require('openai');
const yaml    = require('js-yaml');

const app = express();

// ── Client OpenRouter ──────────────────────────────────────
const client = new OpenAI({
  apiKey:  process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': process.env.SITE_URL || 'http://localhost:3000',
    'X-Title':      'IFDL Assistant',
  },
});

app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }));
app.use(express.json({ limit: '4mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// ═══════════════════════════════════════════════════════════
//  CHARGEMENT DES FICHIERS DE CONNAISSANCES
// ═══════════════════════════════════════════════════════════
const KNOWLEDGE_DIR = path.join(__dirname, 'knowledge');
const MODULES_DIR   = path.join(KNOWLEDGE_DIR, 'modules');
const MASTER_FILE   = path.join(KNOWLEDGE_DIR, 'master_ifdl.yaml');

function readFile(filePath) {
  try { return fs.readFileSync(filePath, 'utf-8'); } catch { return ''; }
}

/**
 * Charge toute la base de connaissances depuis les fichiers.
 * Appelé à chaque requête => modifications prises en compte
 * sans redémarrer le serveur.
 */
function loadKnowledge() {
  const kb = { master: readFile(MASTER_FILE), modules: {} };

  if (fs.existsSync(MODULES_DIR)) {
    fs.readdirSync(MODULES_DIR)
      .filter(f => /\.(yaml|yml|txt|md)$/.test(f))
      .sort()
      .forEach(file => {
        const id = file.replace(/\.(yaml|yml|txt|md)$/, '');
        kb.modules[id] = readFile(path.join(MODULES_DIR, file));
      });
  }

  kb.all = [
    '=== INFORMATIONS GÉNÉRALES DU MASTER IFDL ===',
    kb.master,
    ...Object.entries(kb.modules).map(([id, c]) =>
      `=== MODULE : ${id.toUpperCase()} ===\n${c}`
    ),
  ].join('\n\n');

  return kb;
}

// ═══════════════════════════════════════════════════════════
//  ROUTE — CHAT PRINCIPAL
// ═══════════════════════════════════════════════════════════
app.post('/api/chat', async (req, res) => {
  const { messages, system, max_tokens = 1400, model, moduleId } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0)
    return res.status(400).json({ error: 'Le champ "messages" est requis.' });

  const selectedModel = model || process.env.AI_MODEL || 'mistralai/mistral-7b-instruct:free';
  const kb = loadKnowledge();

  // Contexte adapté : module spécifique ou base complète
  const knowledgeContext = (moduleId && kb.modules[moduleId])
    ? `=== INFORMATIONS GÉNÉRALES DU MASTER IFDL ===\n${kb.master}\n\n=== CONTENU DU MODULE ACTIF (${moduleId}) ===\n${kb.modules[moduleId]}`
    : kb.all;

  const SEP = '═'.repeat(60);
  const enrichedSystem = system
    ? `${system}\n\n${SEP}\nBASE DE CONNAISSANCES OFFICIELLE DU MASTER IFDL\nUtilisez EXCLUSIVEMENT ces informations pour répondre aux questions.\n${SEP}\n${knowledgeContext}`
    : `Tu es l'assistant pédagogique officiel du Master IFDL. Base-toi UNIQUEMENT sur la base de connaissances ci-dessous pour répondre. Ne génère pas d'informations inventées.\n\n${knowledgeContext}`;

  try {
    const response = await client.chat.completions.create({
      model: selectedModel,
      max_tokens,
      messages: [{ role: 'system', content: enrichedSystem }, ...messages],
    });
    res.json({ content: response.choices[0].message.content });
  } catch (err) {
    console.error('[OpenRouter Error]', err.status, err.message);
    const errors = {
      401: 'Clé OpenRouter invalide. Vérifiez OPENROUTER_API_KEY dans .env',
      402: 'Crédits insuffisants. Rechargez sur openrouter.ai',
      429: 'Trop de requêtes. Réessayez dans quelques secondes.',
      404: `Modèle introuvable : "${selectedModel}". Vérifiez openrouter.ai/models`,
    };
    res.status(err.status || 500).json({ error: errors[err.status] || err.message });
  }
});

// ═══════════════════════════════════════════════════════════
//  ROUTE — LISTE DES MODULES DISPONIBLES
// ═══════════════════════════════════════════════════════════
app.get('/api/modules', (_req, res) => {
  const kb = loadKnowledge();

  // Helper: extract a value from YAML content (handles both parsed and commented-out)
  function parseModuleMeta(raw) {
    // Try full YAML parse first (some files have commented sections)
    let parsed = {};
    try {
      // Remove lines that are fully commented (module5 style: "# key: value")
      const uncommented = raw.split('\n')
        .map(l => l.startsWith('#') ? '' : l)
        .join('\n');
      parsed = yaml.load(uncommented) || {};
    } catch {}

    // If that failed or is sparse, try to extract from commented block (module5)
    if (!parsed.nom) {
      const commentedYaml = raw.split('\n')
        .filter(l => /^#\s+\w/.test(l))
        .map(l => l.replace(/^#\s?/, ''))
        .join('\n');
      try { parsed = { ...yaml.load(commentedYaml), ...parsed }; } catch {}
    }

    // Extract tags from content keywords
    const tagMatches = raw.match(/tags?:\s*\[([^\]]+)\]/i);
    let tags = [];
    if (tagMatches) {
      tags = tagMatches[1].split(',').map(t => t.trim().replace(/['"]/g, ''));
    }
    // Fallback: pick capitalized keywords from objectifs
    if (!tags.length && parsed.objectifs_specifiques) {
      const words = (parsed.objectifs_specifiques || '').match(/[A-ZÀÉÈÊ][a-zàéèê]+(?:\s[A-Za-zàéèê]+)?/g) || [];
      tags = [...new Set(words)].slice(0, 4);
    }

    return {
      nom: parsed.nom || parsed.name || null,
      icone: parsed.icone || parsed.icon || '📘',
      semestre: parsed.semestre || null,
      credits: parsed.credits_ects || parsed.credits || null,
      volume: parsed.volume_horaire || null,
      responsable: parsed.responsable || null,
      objectif: parsed.objectif_general
        ? String(parsed.objectif_general).trim().slice(0, 160)
        : null,
      tags,
    };
  }

  res.json({
    modules: Object.entries(kb.modules).map(([id, c]) => ({
      id,
      filename: id + '.yaml',
      available: c.length > 100,
      size: c.length,
      meta: parseModuleMeta(c),
    })),
    masterAvailable: kb.master.length > 0,
    totalChars: kb.all.length,
  });
});

// ═══════════════════════════════════════════════════════════
//  ROUTE — SANTÉ
// ═══════════════════════════════════════════════════════════
app.get('/api/health', (_req, res) => {
  const kb = loadKnowledge();
  res.json({
    status:              'ok',
    provider:            'OpenRouter',
    model:               process.env.AI_MODEL || 'mistralai/mistral-7b-instruct:free',
    keySet:              !!process.env.OPENROUTER_API_KEY,
    masterFile:          fs.existsSync(MASTER_FILE),
    modulesCount:        Object.keys(kb.modules).length,
    modulesWithContent:  Object.values(kb.modules).filter(c => c.length > 100).length,
    knowledgeTotalChars: kb.all.length,
  });
});

// ═══════════════════════════════════════════════════════════
//  DÉMARRAGE
// ═══════════════════════════════════════════════════════════
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  const kb = loadKnowledge();
  console.log(`\n🎓 IFDL Assistant`);
  console.log('━'.repeat(52));
  console.log(`✅  URL      : http://localhost:${PORT}`);
  console.log(`🤖  Modèle  : ${process.env.AI_MODEL || 'mistralai/mistral-7b-instruct:free'}`);
  console.log(`🔑  Clé API : ${process.env.OPENROUTER_API_KEY ? '✓ configurée' : '✗ MANQUANTE dans .env'}`);
  console.log('─'.repeat(52));
  console.log('📁  Base de connaissances :');
  console.log(`    master_ifdl.yaml : ${kb.master.length > 0 ? `✓ (${kb.master.length} chars)` : '✗ non trouvé'}`);
  Object.entries(kb.modules).forEach(([id, c]) => {
    const icon = c.length > 100 ? '✓' : '⚠ vide';
    console.log(`    ${id.padEnd(38)} : ${icon} (${c.length} chars)`);
  });
  console.log('─'.repeat(52));
  console.log(`    Total base : ${kb.all.length.toLocaleString()} caractères`);
  console.log('─'.repeat(52));
  // console.log('💡  Modifiez les fichiers knowledge/ sans redémarrer.');
  // console.log('    Voir COMMENT_EDITER.md pour les instructions.\n');
});