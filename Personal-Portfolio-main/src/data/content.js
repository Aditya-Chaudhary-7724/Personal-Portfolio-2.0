// All portfolio content lives here. Components only render what is in this file,
// and empty strings / empty arrays are skipped, so it is safe to leave gaps.

export const profile = {
  name: 'Aditya Chaudhary',
  firstName: 'Aditya',
  lastName: 'Chaudhary',
  focus: ['AI', 'LLM systems', 'Software engineering'],
  lede:
    'I build LLM and agentic systems in Python, and the backend around them: what the model retrieves, what it is allowed to do, how you check its work, and how fast it runs.',
  now:
    'Right now: an agent that reads a codebase, proposes a change, tests it in a Docker sandbox and waits for a human before opening a pull request.',
  about: [
    'I’m a final-year B.Tech CSE student at SRM IST. Most of what I build sits between a language model and the rest of a system.',
    'At Samsung PRISM I worked on the security side of that: a guardrail model that had to catch jailbreaks and prompt injection while running on a CPU. Now I’m working on the other side, an agent that is allowed to change code, but only under tests and human review.',
    'FoodBridge is where I do full-stack work. It runs on Next.js, but a lot of its logic lives in Postgres: row-level security, RPCs for state changes, PostGIS for distance and pgvector for matching.',
  ],
  interests: ['LLM systems', 'Agentic AI', 'RAG', 'LLM evaluation', 'AI security', 'Backend engineering'],
  updated: 'Oct 2026',
};

export const links = {
  email: 'adityachaudhary7724@gmail.com',
  github: 'https://github.com/Aditya-Chaudhary-7724',
  linkedin: 'https://www.linkedin.com/in/aditya-chaudhary7724',
  leetcode: 'https://leetcode.com/u/ADITYA_CHAUDHARY_936',
};

export const contactLinks = [
  { label: 'Email', handle: links.email, href: `mailto:${links.email}` },
  { label: 'GitHub', handle: 'Aditya-Chaudhary-7724', href: links.github },
  { label: 'LinkedIn', handle: 'aditya-chaudhary7724', href: links.linkedin },
  { label: 'LeetCode', handle: 'ADITYA_CHAUDHARY_936', href: links.leetcode },
];

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

/* ---------------------------------------------------------------- Samsung */

export const samsung = {
  org: 'Samsung R&D Institute Bangalore',
  orgShort: 'SRI-B',
  program: 'Samsung PRISM research program, with SRM IST',
  role: 'PRISM Research Intern',
  period: 'Apr 2025 – Sept 2025',
  location: 'Remote',
  headline: 'One shared classifier instead of a stack of models.',
  summary:
    'I co-developed a performance-optimized guardrail framework for LLM and agentic security. One fine-tuned ModernBERT classifier is shared across every check, instead of running a separate model for each one.',
  attacks: ['Jailbreaks', 'Prompt injection', 'Evasion attacks', 'Document poisoning'],
  metrics: [
    { value: '92.8', unit: '%', label: 'detection accuracy', note: 'within 1.7 points of LLaMA Guard 2 (7B)' },
    { value: '150', unit: 'ms', label: 'inference latency', note: 'CPU only · ~3× faster than LLaMA Guard 2' },
    { value: '~60', unit: '%', label: 'lower peak memory', note: 'vs. a traditional multi-model guardrail pipeline' },
  ],
  details: [
    {
      title: 'Classifier',
      body: 'Fine-tuned ModernBERT with Hugging Face Transformers and PyTorch to flag jailbreaks, prompt injection, evasion attempts and poisoned documents.',
    },
    {
      title: 'Shared-model singleton',
      body: 'The model loads once and stays in memory, and every check (prompts and document chunks) calls the same instance. That is what makes CPU-only deployment practical.',
    },
    {
      title: 'Document inspection',
      body: 'TXT, PDF and DOCX attachments are split into chunks and each chunk is scanned, so a malicious instruction buried deep in a long file still gets caught (needle-in-a-haystack poisoning).',
    },
    {
      title: 'Output-side PII',
      body: 'Responses are anonymized before they leave the system, using Microsoft Presidio with spaCy NER.',
    },
  ],
  team: 'Built in a 4-member Agile team. I co-authored the resulting research paper.',
  stack: ['Python', 'PyTorch', 'Hugging Face Transformers', 'ModernBERT', 'Microsoft Presidio', 'spaCy'],
};

export const otherExperience = [
  {
    org: 'EduSkills (AICTE)',
    role: 'AWS Cloud Virtual Intern',
    period: 'Apr 2025 – Jun 2025',
    body: '10-week remote program covering core AWS services, API and application deployment workflows, and infrastructure fundamentals.',
  },
  {
    org: 'SQAC Club, SRMIST',
    role: 'Technical member',
    period: 'Apr 2025 – Sept 2025',
    body: 'Contributed to the club website (React, Flask, Tailwind CSS) and to cross-functional event planning.',
  },
];

/* --------------------------------------------------------------- Projects */

export const agent = {
  id: 'agent',
  title: 'AI Software Engineering Agent',
  subtitle: 'Autonomous codebase understanding & modification',
  period: 'Sept 2026 – present',
  status: 'in progress',
  repo: 'https://github.com/Aditya-Chaudhary-7724/ai-software-engineering-agent',
  stack: ['Python', 'FastAPI', 'LangGraph', 'Anthropic API', 'Neo4j', 'PostgreSQL', 'pgvector', 'Tree-sitter', 'Docker', 'GitHub API'],
  intro:
    'An agent that can be pointed at a repository, work out how it fits together, and propose a change. It tests the change in a sandbox, scores it, and stops for a human before anything reaches GitHub.',
  // Each step lights up a set of nodes/edges in the pipeline diagram.
  steps: [
    {
      key: 'ingest',
      label: 'Ingest',
      title: 'Parse the repository',
      body: 'A code-intelligence pipeline ingests a repository and parses it with Tree-sitter across 8+ languages. Python files go through the AST where that gives more detail.',
      tags: ['Tree-sitter', 'Python AST'],
    },
    {
      key: 'index',
      label: 'Index',
      title: 'Two views of the same code',
      body: 'A Neo4j knowledge graph stores structure: imports, class hierarchy and file layout. PostgreSQL stores the text, with pgvector embeddings and full-text search.',
      tags: ['Neo4j', 'pgvector', 'Postgres FTS'],
    },
    {
      key: 'retrieve',
      label: 'Retrieve',
      title: 'Hybrid retrieval',
      body: 'Context comes from all three at once: semantic matches from pgvector, exact identifiers from full-text search, and related code from the graph: what a file imports and what a class inherits from.',
      tags: ['semantic', 'lexical', 'graph'],
    },
    {
      key: 'reason',
      label: 'Reason',
      title: 'A stateful LangGraph agent',
      body: 'A LangGraph state machine on the Anthropic API plans the task from the retrieved context and proposes a concrete code change.',
      tags: ['LangGraph', 'Anthropic API'],
    },
    {
      key: 'execute',
      label: 'Execute',
      title: 'Test it in a sandbox, iterate on failure',
      body: 'The patch is applied in a Docker sandbox and the tests run. When they fail, the output goes back to the agent, which revises the change and tries again.',
      tags: ['Docker', 'test loop'],
    },
    {
      key: 'evaluate',
      label: 'Evaluate',
      title: 'Judge it',
      body: 'An LLM-as-judge harness scores output quality and records latency. Every run is traced end to end.',
      tags: ['LLM-as-judge', 'latency', 'tracing'],
    },
    {
      key: 'approve',
      label: 'Approve',
      title: 'A human signs off',
      body: 'Before any change is applied or a GitHub PR is opened, the graph pauses with an interrupt and waits. It continues only when a person approves. The whole thing ships as a Dockerized FastAPI service.',
      tags: ['interrupt / resume', 'GitHub API', 'FastAPI'],
    },
  ],
};

export const foodbridge = {
  id: 'foodbridge',
  title: 'FoodBridge',
  subtitle: 'AI-powered food donation coordination',
  period: 'Aug 2025 – Oct 2025',
  repo: 'https://github.com/Aditya-Chaudhary-7724/food-bridge',
  stack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'PostGIS', 'pgvector', 'Gemini API', 'Zod', 'Vitest'],
  intro:
    'When a donation is posted, FoodBridge ranks the NGOs that could take it and recommends the best matches in real time. Four kinds of users touch the same rows, so most of the hard work is in the database.',
  signals: [
    { key: 'semantic', label: 'Semantic fit', how: 'Gemini embeddings · pgvector' },
    { key: 'distance', label: 'Distance', how: 'PostGIS' },
    { key: 'capacity', label: 'Capacity', how: 'capacity score' },
    { key: 'urgency', label: 'Urgency', how: 'urgency score' },
  ],
  roles: ['donor', 'NGO', 'volunteer', 'logistics'],
  points: [
    'Four-role authorization (donor, NGO, volunteer, logistics) enforced with PostgreSQL Row-Level Security.',
    'Claiming a donation and assigning a pickup go through SECURITY DEFINER RPCs, so both are atomic and safe under races.',
    'Tested the live database and found RLS gaps: a privilege-escalation path and race conditions. Both are fixed.',
    'Next.js Server Actions with Zod schemas shared between client and server. 170+ Vitest unit tests.',
  ],
};

export const movienest = {
  id: 'movienest',
  title: 'MovieNest',
  subtitle: 'Movie discovery & recommendation',
  period: 'Jan 2025 – Mar 2025',
  live: 'https://movie-app-six-cyan.vercel.app/',
  stack: ['React', 'React Router', 'Vite', 'TMDB API', 'Vitest', 'React Testing Library'],
  intro:
    'A movie discovery app on the TMDB API with its own content-based recommender. It uses no ML APIs, and every recommendation explains why it was picked.',
  pipeline: [
    { key: 'rank', label: 'Rank', body: 'Score candidate titles on every similarity signal.' },
    { key: 'enrich', label: 'Enrich', body: 'Pull in more detail for the strongest candidates.' },
    { key: 'rerank', label: 'Re-rank', body: 'Score them again with that detail to get the final order.' },
    { key: 'explain', label: 'Explain', body: 'Show the user why each title was recommended.' },
  ],
  signals: ['TF / cosine text similarity', 'Genre overlap', 'Keyword overlap', 'Cast overlap', 'Director match'],
  tests: '160+ automated tests with Vitest and React Testing Library.',
};

// Older, smaller projects kept as a one-line archive.
export const earlier = [
  { title: 'Rhythmix', body: 'Music NFT platform', stack: 'React · Solidity · Hardhat · IPFS', href: 'https://rhythmix-rho.vercel.app' },
  { title: 'Estate Verse', body: 'Real-estate listings UI', stack: 'React · Tailwind CSS', href: 'https://real-estate-wine-tau.vercel.app/' },
  { title: 'Weather Wonder', body: 'Weather app', stack: 'React', href: 'https://weather-app-react-js-zeta-nine.vercel.app/weather' },
];

/* ----------------------------------------------------------------- Skills */

// `usedIn` points at where the skill shows up on this page (project / experience ids).
export const skills = [
  {
    key: 'ai',
    label: 'AI / LLM',
    items: [
      { name: 'LangGraph', usedIn: ['agent'] },
      { name: 'Anthropic API', usedIn: ['agent'] },
      { name: 'Gemini API', usedIn: ['foodbridge'] },
      { name: 'RAG', usedIn: ['agent'] },
      { name: 'LLM evaluation', usedIn: ['agent'] },
      { name: 'Hugging Face', usedIn: ['samsung'] },
      { name: 'PyTorch', usedIn: ['samsung'] },
      { name: 'ModernBERT', usedIn: ['samsung'] },
      { name: 'spaCy', usedIn: ['samsung'] },
      { name: 'NLP', usedIn: ['samsung'] },
      { name: 'scikit-learn' },
      { name: 'pgvector', usedIn: ['agent', 'foodbridge'] },
    ],
  },
  {
    key: 'backend',
    label: 'Backend',
    items: [
      { name: 'FastAPI', usedIn: ['agent'] },
      { name: 'Flask', usedIn: ['sqac'] },
      { name: 'REST API design' },
      { name: 'Next.js', usedIn: ['foodbridge'] },
      { name: 'Next.js Server Actions', usedIn: ['foodbridge'] },
    ],
  },
  {
    key: 'data',
    label: 'Databases',
    items: [
      { name: 'PostgreSQL', usedIn: ['agent', 'foodbridge'] },
      { name: 'Supabase', usedIn: ['foodbridge'] },
      { name: 'PostGIS', usedIn: ['foodbridge'] },
      { name: 'pgvector', usedIn: ['agent', 'foodbridge'] },
      { name: 'Neo4j', usedIn: ['agent'] },
      { name: 'MySQL' },
    ],
  },
  {
    key: 'languages',
    label: 'Languages',
    items: [
      { name: 'Python', usedIn: ['agent', 'samsung'] },
      { name: 'TypeScript', usedIn: ['foodbridge'] },
      { name: 'JavaScript', usedIn: ['movienest'] },
      { name: 'SQL', usedIn: ['foodbridge', 'agent'] },
      { name: 'C++' },
    ],
  },
  {
    key: 'frontend',
    label: 'Frontend',
    items: [
      { name: 'React', usedIn: ['foodbridge', 'movienest'] },
      { name: 'Tailwind CSS', usedIn: ['sqac'] },
      { name: 'HTML / CSS' },
    ],
  },
  {
    key: 'devops',
    label: 'Cloud / DevOps / Testing',
    items: [
      { name: 'Docker', usedIn: ['agent'] },
      { name: 'AWS', usedIn: ['aws'] },
      { name: 'Oracle Cloud Infrastructure' },
      { name: 'Git / GitHub' },
      { name: 'Postman' },
      { name: 'pytest' },
      { name: 'Vitest', usedIn: ['foodbridge', 'movienest'] },
    ],
  },
  {
    key: 'core',
    label: 'Core CS',
    items: [
      { name: 'Data structures & algorithms' },
      { name: 'Object-oriented programming' },
      { name: 'DBMS' },
      { name: 'Operating systems' },
      { name: 'Computer networks' },
    ],
  },
];

// Human-readable names for the `usedIn` ids above.
export const workIndex = {
  agent: { label: 'SWE Agent', href: '#agent' },
  foodbridge: { label: 'FoodBridge', href: '#foodbridge' },
  movienest: { label: 'MovieNest', href: '#movienest' },
  samsung: { label: 'Samsung PRISM', href: '#experience' },
  sqac: { label: 'SQAC Club', href: '#experience' },
  aws: { label: 'AWS internship', href: '#experience' },
};

/* -------------------------------------------------------------- Education */

export const education = {
  school: 'SRM Institute of Science and Technology',
  degree: 'B.Tech, Computer Science and Engineering',
  period: 'Expected 2027',
  cgpa: '9.33 / 10',
};

export const certifications = [
  { name: 'Introduction to Machine Learning (Elite)', issuer: 'NPTEL — IIT Kharagpur', date: 'Sept 2025' },
  { name: 'Oracle Cloud Infrastructure 2024 Certified Foundations Associate', issuer: 'Oracle', date: 'Jan 2025' },
  { name: 'SAP Certified — SAP Generative AI Developer', issuer: 'SAP', date: 'Mar 2026 – Mar 2027' },
];
