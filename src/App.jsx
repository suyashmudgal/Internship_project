import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Terminal,
  Cpu,
  Database,
  Brain,
  Code2,
  Sparkles,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  FileText,
  Download,
  ChevronRight,
  Layers,
  ShieldCheck,
  Workflow,
  BarChart3,
  Globe,
  Search,
  CheckCircle2,
  Award,
  GraduationCap,
  Briefcase,
  MapPin,
  ArrowUpRight,
  MessageSquare,
  X,
  Send,
  Menu,
  Eye,
  Server,
  GitBranch,
  Lock,
  Activity,
  Zap,
  BookOpen,
  UserCheck,
  Filter,
  Copy,
  Check,
  RefreshCw,
  FolderGit2,
  Star,
  Play,
  Sun,
  Moon
} from 'lucide-react';

// ==========================================
// VERIFIED PORTFOLIO DATA (NO FABRICATION)
// ==========================================

const PERSONAL_INFO = {
  name: 'Suyash Mudgal',
  headline: 'AI/ML Engineer | Generative AI Developer | Data Science Student',
  education: 'B.Tech — Computer Science & Engineering (Data Science)',
  batch: '2023–2027',
  semester: '6th Semester',
  cgpa: '7.68',
  university: 'ITM University, Gwalior',
  location: 'Gwalior, Madhya Pradesh, India',
  github: 'https://github.com/suyashmudgal',
  careerGoal:
    'Build production-ready AI systems, especially Generative AI applications, RAG systems, multi-agent systems, conversational AI, and intelligent data-driven products.',
  openTo: [
    'AI/ML Engineer Roles',
    'Generative AI Engineer Roles',
    'Data Science Roles',
    'Data Analyst Roles',
    'AI/ML & GenAI Internships',
    'Early-Career Engineering Opportunities'
  ]
};

const STATS_DATA = [
  {
    value: '2023–2027',
    label: 'B.Tech CSE (Data Science)',
    sub: '6th Semester • ITM University',
    icon: GraduationCap,
    accent: 'from-sky-400 to-blue-600'
  },
  {
    value: '7.68',
    label: 'Cumulative CGPA',
    sub: 'Peak Sem VI: 8.53 SGPA',
    icon: BarChart3,
    accent: 'from-cyan-400 to-teal-500'
  },
  {
    value: '200+',
    label: 'LeetCode Problems',
    sub: 'Solved in C++ (DSA)',
    icon: Code2,
    accent: 'from-indigo-400 to-violet-600'
  },
  {
    value: '5th Place',
    label: 'ScandiBytes Mini AI Challenge',
    sub: 'Competitive AI Engineering',
    icon: Award,
    accent: 'from-amber-400 to-orange-500'
  },
  {
    value: "GSSOC '25",
    label: 'Open Source Contributor',
    sub: 'GirlScript Summer of Code 2025',
    icon: GitBranch,
    accent: 'from-emerald-400 to-cyan-500'
  }
];

const SKILL_CATEGORIES = [
  {
    id: 'genai',
    title: 'Generative AI & Agentic Systems',
    icon: Sparkles,
    color: 'text-sky-400',
    border: 'border-sky-500/30',
    bg: 'bg-sky-500/10',
    description: 'Building context-aware LLM pipelines, multi-agent workflows, and semantic retrieval architectures.',
    skills: [
      'RAG',
      'LLM Applications',
      'Prompt Engineering',
      'Embeddings',
      'Semantic Search',
      'Multi-Agent Systems',
      'Conversational AI',
      'LangGraph',
      'LlamaIndex',
      'AutoGen',
      'LangSmith'
    ]
  },
  {
    id: 'aiml',
    title: 'AI / Machine Learning & NLP',
    icon: Brain,
    color: 'text-indigo-400',
    border: 'border-indigo-500/30',
    bg: 'bg-indigo-500/10',
    description: 'Classical machine learning, deep neural networks, natural language processing, and computer vision.',
    skills: [
      'Machine Learning',
      'Deep Learning',
      'NLP',
      'Generative AI',
      'LLMs',
      'Scikit-Learn',
      'TensorFlow',
      'Keras',
      'PyTorch',
      'NLTK',
      'Hugging Face',
      'OpenCV'
    ]
  },
  {
    id: 'programming',
    title: 'Programming Languages',
    icon: Code2,
    color: 'text-cyan-400',
    border: 'border-cyan-500/30',
    bg: 'bg-cyan-500/10',
    description: 'Core languages for AI systems development, algorithmic problem solving, and querying data.',
    skills: ['Python', 'C++', 'C', 'JavaScript', 'SQL']
  },
  {
    id: 'backend',
    title: 'Backend & API Engineering',
    icon: Server,
    color: 'text-emerald-400',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10',
    description: 'Asynchronous API services, streaming endpoints, and ORM integration for AI backends.',
    skills: ['FastAPI', 'Flask', 'REST APIs', 'SQLAlchemy', 'Uvicorn']
  },
  {
    id: 'databases',
    title: 'Databases & Vector Stores',
    icon: Database,
    color: 'text-violet-400',
    border: 'border-violet-500/30',
    bg: 'bg-violet-500/10',
    description: 'Relational storage and high-dimensional vector indexing with metadata isolation.',
    skills: ['PostgreSQL', 'MySQL', 'SQLite', 'Supabase', 'ChromaDB', 'FAISS', 'Pinecone']
  },
  {
    id: 'data',
    title: 'Data Science & Analytics',
    icon: BarChart3,
    color: 'text-amber-400',
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/10',
    description: 'Exploratory data analysis, statistical profiling, wrangling, and business intelligence.',
    skills: ['Pandas', 'NumPy', 'Matplotlib', 'Power BI', 'Excel']
  },
  {
    id: 'tools',
    title: 'Developer Tools & Platforms',
    icon: Terminal,
    color: 'text-rose-400',
    border: 'border-rose-500/30',
    bg: 'bg-rose-500/10',
    description: 'Version control, interactive data web apps, and development environments.',
    skills: ['Git', 'GitHub', 'Streamlit', 'VS Code']
  }
];

const PROJECT_CATEGORY_TABS = [
  'All Projects',
  'GenAI & Agentic Systems',
  'Data Analysis & EDA',
  'Full-Stack & Product',
  'Machine Learning & NLP'
];

const PROJECTS_DATA = [
  {
    id: 'docchat-rag',
    title: 'DocChat AI — Multi-Tenant RAG System',
    subtitle: 'Retrieval-Augmented Generation with User-Level Data Isolation',
    category: 'GenAI & Agentic Systems',
    badge: 'Flagship Architecture',
    date: 'Production-Grade Pipeline',
    description:
      'An intelligent document question-answering system that allows users to upload documents and interact with them using a Retrieval-Augmented Generation pipeline.',
    highlightNote:
      'Engineered with strict user-level data isolation so one user’s documents, vector retrieval context, and chat memory cannot be accessed by another user.',
    technologies: [
      'FastAPI',
      'Python',
      'ChromaDB',
      'Embeddings',
      'PostgreSQL / Supabase',
      'Groq API',
      'RAG'
    ],
    features: [
      'Document upload & automated processing',
      'Embeddings & high-dimensional vector search',
      'Semantic retrieval with top-k context ranking',
      'LLM-based contextual answer generation (Groq API)',
      'User authentication & PostgreSQL user synchronization',
      'Strict user-wise data isolation (ChromaDB metadata isolation)',
      'Persistent multi-turn chat memory',
      'Low-latency streaming responses',
      'Secure document deletion & vector index cleanup'
    ],
    problem:
      'Many standard RAG prototypes store all uploaded document chunks in a flat, shared vector space. In multi-user scenarios, this creates severe privacy risks where semantic retrieval can inadvertently leak context across different users or leave orphaned vectors when documents are deleted.',
    solution:
      'Architected a full-stack RAG backend using FastAPI, PostgreSQL/Supabase, and ChromaDB that enforces strict user-level isolation at every layer. Authenticated users are synchronized with PostgreSQL, and every document embedding stored in ChromaDB is scoped with user metadata filters, paired with streaming Groq LLM responses and stateful chat memory.',
    challenges:
      'Synchronizing relational user records in PostgreSQL/Supabase with vector collections in ChromaDB while guaranteeing that document deletion removes both metadata records and underlying vector embeddings without cross-user leakage.',
    outcome:
      'A secure, multi-user conversational document intelligence system capable of real-time token streaming, isolated per-user semantic retrieval, and complete lifecycle management of uploaded documents.',
    architectureFlow: [
      { step: 'User', detail: 'Client Request & Query' },
      { step: 'Authentication', detail: 'PostgreSQL / Supabase User Sync' },
      { step: 'Document Upload', detail: 'Multi-user Scoped Ingestion' },
      { step: 'Document Processing', detail: 'Text Extraction & Chunking' },
      { step: 'Embeddings', detail: 'Dense Vector Representation' },
      { step: 'ChromaDB', detail: 'Metadata-Isolated Vector Store' },
      { step: 'Similarity Search', detail: 'User-Scoped Top-K Retrieval' },
      { step: 'Context Retrieval', detail: 'Prompt Augmentation + Chat Memory' },
      { step: 'LLM (Groq API)', detail: 'High-Speed Inference' },
      { step: 'Streaming Response', detail: 'Real-Time Token Stream to User' }
    ],
    github: 'https://github.com/suyashmudgal/RAG',
    backendUrl: 'https://github.com/suyashmudgal/RAG/tree/main/backend',
    liveDemo: null,
    repoKeywords: ['rag', 'docchat']
  },
  {
    id: 'multi-agent-research',
    title: 'Khoj AI — Multi-Agent Research System',
    subtitle: 'Collaborative 4-Stage Agentic AI Workflow for Autonomous Synthesis',
    category: 'GenAI & Agentic Systems',
    badge: 'Live Agentic App',
    date: 'Deployed on Streamlit',
    description:
      'A four-stage multi-agent AI research system designed around specialized autonomous agents that collaborate to research, process, verify, and synthesize citation-backed reports.',
    highlightNote:
      'Live deployed agentic workflow on Streamlit (Khoj AI) that decomposes complex queries across specialized LangGraph & Tavily research agents.',
    technologies: [
      'Python',
      'LLMs',
      'Agentic AI',
      'LangGraph',
      'LangChain',
      'Tavily',
      'Streamlit'
    ],
    features: [
      'Four-stage specialized multi-agent role decomposition',
      'Autonomous web research & evidence gathering via Tavily',
      'Structured inter-agent state management via LangGraph & LangChain',
      'Information filtering, verification & context processing pipeline',
      'Cohesive synthesis into citation-backed research reports',
      'Interactive Streamlit web interface for real-time agent execution'
    ],
    problem:
      'Single-prompt LLM calls often struggle with deep, multi-faceted research queries—suffering from shallow coverage, unverified reasoning, or disorganized output when asked to gather and synthesize complex topics.',
    solution:
      'Designed Khoj AI, a four-stage agentic workflow using Python, LangGraph, LangChain, and Tavily where specialized agents collaborate sequentially and iteratively: decomposing the user query, gathering live evidence, processing findings, and synthesizing a citation-backed final answer.',
    challenges:
      'Orchestrating clean state handoffs between research and synthesis agents while preventing redundant reasoning loops and preserving source citations across agent boundaries.',
    outcome:
      'A live, production-accessible multi-agent research application (khojai.streamlit.app) that transforms open-ended user queries into structured, citation-backed technical reports.',
    architectureFlow: [
      { step: 'User Query', detail: 'Complex Research Prompt' },
      { step: 'Research Agents', detail: 'Tavily & Multi-Angle Evidence Gathering' },
      { step: 'Information Processing', detail: 'Filtering, Verification & Structuring' },
      { step: 'Synthesis', detail: 'Cross-Agent Aggregation & Reasoning' },
      { step: 'Final Citation-Backed Answer', detail: 'Verified Report on Streamlit UI' }
    ],
    github: 'https://github.com/suyashmudgal/Multi-agent-research-system-main',
    backendUrl: null,
    liveDemo: 'https://khojai.streamlit.app/',
    repoKeywords: ['multi-agent', 'khoj']
  },
  {
    id: 'ai-data-explorer',
    title: 'AI Data Explorer',
    subtitle: 'Automated Exploratory Data Analysis & Statistical Profiling Platform',
    category: 'Data Analysis & EDA',
    badge: 'Live EDA Platform',
    date: 'Deployed on Streamlit',
    description:
      'An automated exploratory data analysis (EDA) platform that helps users inspect, clean, and understand datasets through automated statistical profiling and interactive visualizations.',
    highlightNote:
      'Turns raw CSV/Excel datasets into interactive statistical profiles, missing-value imputation insights, and correlation heatmaps in seconds.',
    technologies: [
      'Python',
      'Pandas',
      'NumPy',
      'Matplotlib',
      'Streamlit',
      'Data Science'
    ],
    features: [
      'Dataset upload supporting CSV & Excel tabular formats',
      'Automated Exploratory Data Analysis (EDA) & schema profiling',
      'Missing value analysis & imputation insights',
      'Comprehensive statistical summaries (mean, median, skewness, IQR)',
      'Feature distribution plots & correlation heatmaps',
      'Interactive, user-friendly Streamlit dashboard'
    ],
    problem:
      'Initial exploratory data analysis often requires writing repetitive boilerplate code in notebooks for every new dataset just to inspect data types, missing values, distributions, and correlations.',
    solution:
      'Built an interactive Streamlit application powered by Python, Pandas, NumPy, and Matplotlib that automates the entire profiling workflow upon dataset upload, presenting instant visual diagnostics and statistical summaries.',
    challenges:
      'Handling diverse dataset schemas, mixed column types, and high missing-value ratios gracefully without breaking visualization pipelines.',
    outcome:
      'A live, accessible web application (aidataexplorer.streamlit.app) that accelerates dataset understanding and exploratory analysis for data science workflows.',
    architectureFlow: [
      { step: 'Dataset Upload', detail: 'User Uploads CSV / Excel Data' },
      { step: 'Pandas & NumPy Profiler', detail: 'Schema, Types & Null Diagnostics' },
      { step: 'Imputation & Stats Engine', detail: 'Summary Stats & Missing Value Insights' },
      { step: 'Visual Renderer', detail: 'Distributions & Correlation Heatmaps' },
      { step: 'Interactive Dashboard', detail: 'Live Exploration on Streamlit' }
    ],
    github: 'https://github.com/suyashmudgal/Streamlit-project2',
    backendUrl: null,
    liveDemo: 'https://aidataexplorer.streamlit.app/',
    repoKeywords: ['aidataexplorer', 'data-explorer', 'data_explorer', 'streamlit-project2']
  },
  {
    id: 'indian-startup-analysis',
    title: 'Indian Startup Ecosystem & Funding Analysis',
    subtitle: 'Interactive Data Analytics on Investment Trends, Unicorns & Startup Hubs',
    category: 'Data Analysis & EDA',
    badge: 'Live Analytics App',
    date: 'Deployed on Streamlit',
    description:
      'An interactive data analytics platform analyzing Indian startup funding trends, investor networks, high-growth sectors, startup hubs, and year-on-year investment patterns.',
    highlightNote:
      'Delivers multi-dimensional drilldowns across Indian startup hubs (Bengaluru, Delhi-NCR, Mumbai), funding stages, and investor portfolios.',
    technologies: [
      'Python',
      'Pandas',
      'NumPy',
      'Matplotlib',
      'Plotly / Seaborn',
      'Streamlit',
      'Data Analytics'
    ],
    features: [
      'Overall year-on-year & month-on-month startup funding trend analysis',
      'Top startup hubs breakdown (Bengaluru, Delhi-NCR, Mumbai, etc.)',
      'Sector-wise investment distribution across FinTech, EdTech, SaaS & AI',
      'Stage-wise funding insights (Seed, Series A–F, Late Stage, Debt)',
      'Active investor portfolio drilldowns & startup-specific lookup',
      'Interactive Streamlit visualizations & custom filtering'
    ],
    problem:
      'Raw startup funding datasets contain noisy valuations, inconsistent city/sector naming conventions, and complex multi-investor records that obscure macro investment patterns.',
    solution:
      'Engineered an end-to-end data cleaning and visual analytics pipeline using Pandas, NumPy, Matplotlib, and Streamlit that standardizes Indian startup funding records and exposes interactive macro and micro drilldowns.',
    challenges:
      'Cleaning inconsistent funding amounts, normalizing city names (e.g., Bangalore vs. Bengaluru, Gurgaon vs. Gurugram), and structuring multi-dimensional views that remain responsive in the browser.',
    outcome:
      'A live interactive analytics dashboard (startupanalysisindia.streamlit.app) showcasing real-world data wrangling, storytelling, and business intelligence capabilities.',
    architectureFlow: [
      { step: 'Funding Dataset Ingestion', detail: 'Raw Indian Startup Funding Records' },
      { step: 'Data Wrangling & Cleaning', detail: 'Standardizing Hubs, Sectors & Valuations' },
      { step: 'Aggregation Engine', detail: 'YoY Trends, Stage & Investor Grouping' },
      { step: 'Visual Analytics', detail: 'Interactive Charts & Sector Breakdowns' },
      { step: 'Streamlit BI Dashboard', detail: 'Live Drilldowns by Startup & Investor' }
    ],
    github: 'https://github.com/suyashmudgal/streamlit-project',
    backendUrl: null,
    liveDemo: 'https://startupanalysisindia.streamlit.app/',
    repoKeywords: ['startup', 'startupanalysis', 'funding', 'streamlit-project']
  },
  {
    id: 'cardmakers-library',
    title: 'CardMakers — Digital ID & Library Membership Solution',
    subtitle: 'QR-Verified Digital Membership & Study Library Management Platform',
    category: 'Full-Stack & Product',
    badge: 'Active Development / WIP',
    statusNote: 'Actively Building • New Modules in Progress',
    date: 'Deployed on Vercel',
    description:
      'A digital ID card and QR-based membership management solution tailored for study libraries, gyms, and local institutions to automate member onboarding, digital card generation, and verification.',
    highlightNote:
      'Live on Vercel with instant QR-enabled digital library card generation; actively expanding with automated attendance and subscription tracking modules.',
    technologies: [
      'React / Next.js',
      'Tailwind CSS',
      'JavaScript',
      'QR Verification',
      'Vercel'
    ],
    features: [
      'Instant digital library & institutional membership card generation',
      'Custom organization branding & structured member profiles',
      'Dynamic QR code integration for rapid check-in & identity verification',
      'Exportable and print-ready high-resolution card layouts',
      'Actively expanding with member attendance & subscription tracking modules'
    ],
    problem:
      'Local study libraries, reading rooms, and membership centers often rely on manual paper registers or static physical cards that are slow to issue, easy to lose, and lack quick verification.',
    solution:
      'Built CardMakers (deployed on Vercel) to streamline member onboarding with instant, customizable digital ID cards embedded with verification QR codes, designed specifically for study libraries and local organizations.',
    challenges:
      'Ensuring crisp, responsive card rendering across devices while maintaining accurate QR code generation and preparing a modular architecture for upcoming subscription management features.',
    outcome:
      'A live product prototype (cardmakers.vercel.app) currently under active iterative expansion to become a full-suite study library management solution.',
    architectureFlow: [
      { step: 'Member Onboarding', detail: 'Input Student / Library Member Details' },
      { step: 'Custom Branding Engine', detail: 'Apply Library Theme & Validity Dates' },
      { step: 'QR Code Generator', detail: 'Embed Unique Verification Payload' },
      { step: 'Live Card Preview', detail: 'Instant Responsive ID Card Rendering' },
      { step: 'Export & Library Management', detail: 'Print/Download + Upcoming Attendance Sync' }
    ],
    github: 'https://github.com/suyashmudgal/Library-solution',
    backendUrl: null,
    liveDemo: 'https://cardmakers.vercel.app/',
    repoKeywords: ['library-solution', 'cardmaker', 'card-maker', 'library', 'id-card']
  },
  {
    id: 'info-trunk',
    title: 'Info Trunk',
    subtitle: 'Knowledge Management & Digital Resource Discovery Platform',
    category: 'Full-Stack & Product',
    badge: '1K+ Visitors • 5.5K+ Views',
    date: 'Dec 2025 – Present',
    description:
      'A centralized knowledge management platform for organizing, searching, and managing digital resources with real user traction.',
    highlightNote:
      'Real-world user adoption with 1K+ visitors, 5.5K+ page views, and an average session duration of ~5 minutes.',
    technologies: [
      'Knowledge Management',
      'Search & Indexing',
      'Analytics Dashboard',
      'Web Platform'
    ],
    features: [
      'Centralized digital resource management',
      'Fast search, categorization, and organization',
      'Built-in analytics dashboard tracking platform usage',
      '1K+ unique visitors with strong organic retention',
      '5.5K+ total page views across curated resources',
      '~5-minute average session duration demonstrating high utility'
    ],
    metrics: [
      { label: 'Total Visitors', value: '1K+' },
      { label: 'Page Views', value: '5.5K+' },
      { label: 'Avg. Session Duration', value: '~5 mins' }
    ],
    problem:
      'Valuable learning materials and digital resources are frequently scattered across bookmarks, chats, and folders, making fast retrieval and structured discovery difficult.',
    solution:
      'Created Info Trunk as a centralized knowledge management product featuring structured resource organization, intuitive search capabilities, and an integrated analytics dashboard.',
    challenges:
      'Designing an information hierarchy and search experience that keeps users engaged and enables rapid discovery across growing resource collections.',
    outcome:
      'Achieved verifiable user traction since launch (Dec 2025 – Present), reaching 1K+ visitors, 5.5K+ page views, and an average session duration of approximately 5 minutes.',
    architectureFlow: [
      { step: 'Resource Curation', detail: 'Structured Categorization & Tagging' },
      { step: 'Centralized Repository', detail: 'Unified Knowledge Base' },
      { step: 'Search & Discovery', detail: 'Fast Filtering & Organization' },
      { step: 'Analytics Engine', detail: '1K+ Visitors & 5.5K+ Views Tracked' }
    ],
    github: null,
    backendUrl: null,
    liveDemo: null,
    repoKeywords: ['infotrunk', 'info-trunk']
  },
  {
    id: 'fake-news-detection',
    title: 'Fake News Detection System',
    subtitle: 'NLP & Classical Machine Learning Classification Pipeline',
    category: 'Machine Learning & NLP',
    badge: 'NLP + Flask App',
    date: 'End-to-End ML System',
    description:
      'An NLP-based machine learning system designed to classify news articles as real or potentially fake using classical text vectorization and linear classifiers.',
    highlightNote:
      'Combines TF-IDF vectorization with Logistic Regression and Passive Aggressive Classifiers inside an authenticated Flask dashboard.',
    technologies: [
      'Python',
      'TF-IDF',
      'Logistic Regression',
      'Passive Aggressive Classifier',
      'NLP',
      'Flask'
    ],
    features: [
      'Text preprocessing & tokenization pipeline',
      'TF-IDF (Term Frequency–Inverse Document Frequency) feature extraction',
      'Dual ML classification (Logistic Regression & Passive Aggressive Classifier)',
      'Interactive prediction interface for real-time news verification',
      'Analytics dashboard & user authentication workflow'
    ],
    problem:
      'Rapid spread of unverified online articles requires automated natural language processing tools capable of analyzing linguistic patterns and classifying text credibility.',
    solution:
      'Developed an end-to-end NLP pipeline in Python that preprocesses raw news text, extracts high-dimensional TF-IDF features, evaluates predictions using Logistic Regression and Passive Aggressive Classifiers, and serves results via an authenticated Flask web application.',
    challenges:
      'Building a clean text normalization pipeline to reduce noise in raw article text and integrating the trained scikit-learn models seamlessly into a Flask dashboard with user authentication.',
    outcome:
      'A complete NLP web application coupling classical machine learning classifiers with an accessible dashboard and prediction interface.',
    architectureFlow: [
      { step: 'Raw News Input', detail: 'User Submits Article Text' },
      { step: 'Text Preprocessing', detail: 'Tokenization, Stopword Removal & Cleaning' },
      { step: 'TF-IDF Extraction', detail: 'Term Frequency-Inverse Document Frequency' },
      { step: 'ML Classifiers', detail: 'Logistic Regression & Passive Aggressive' },
      { step: 'Flask Dashboard', detail: 'Authenticated Prediction Interface' }
    ],
    github: 'https://github.com/suyashmudgal?tab=repositories',
    backendUrl: null,
    liveDemo: null,
    repoKeywords: ['fake-news', 'fakenews', 'news-detection']
  }
];

const EXPERIENCE_DATA = [
  {
    role: 'Web Developer & Tester Intern',
    organization: 'ITM University, Gwalior',
    period: 'Jan 2026 – Present',
    location: 'Gwalior, Madhya Pradesh, India',
    type: 'Internship',
    responsibilities: [
      'Contributed to the college website project using AI-assisted development tools.',
      'Analyzed Software Requirement Specification (SRS) documents to align technical deliverables.',
      'Performed comprehensive manual and functional testing across core workflows.',
      'Tested responsive behavior across different screen sizes and device viewports.',
      'Identified performance bottlenecks and latency issues across web pages.',
      'Reported documented bugs and collaborated closely with the development team on fixes.',
      'Helped improve overall website reliability, responsiveness, and user experience.'
    ]
  }
];

const EDUCATION_DATA = {
  degree: 'B.Tech — Computer Science & Engineering (Data Science)',
  institution: 'ITM University, Gwalior',
  period: '2023 – 2027',
  currentSemester: '6th Semester',
  cgpa: '7.68',
  semesters: [
    { sem: 'Semester I', score: 68.1, label: '6.81 SGPA' },
    { sem: 'Semester II', score: 75.2, label: '7.52 SGPA' },
    { sem: 'Semester III', score: 76.2, label: '7.62 SGPA' },
    { sem: 'Semester IV', score: 72.9, label: '7.29 SGPA' },
    { sem: 'Semester V', score: 83.3, label: '8.33 SGPA' },
    { sem: 'Semester VI', score: 85.3, label: '8.53 SGPA' }
  ]
};

const ACHIEVEMENTS_DATA = [
  {
    title: '5th Place — ScandiBytes Mini AI Challenge',
    category: 'AI Competition',
    description:
      'Secured 5th place in the ScandiBytes Mini AI Challenge, demonstrating practical problem-solving and rapid execution in building AI solutions.',
    icon: Award,
    accent: 'border-amber-500/30 bg-amber-500/5 text-amber-300'
  },
  {
    title: 'GSSOC Contributor — 2025',
    category: 'Open Source',
    description:
      'Selected contributor for GirlScript Summer of Code (GSSOC) 2025, collaborating on open-source repositories, version control workflows, and community-driven software engineering.',
    icon: GitBranch,
    accent: 'border-sky-500/30 bg-sky-500/5 text-sky-300'
  },
  {
    title: 'Solved 200+ LeetCode Problems in C++',
    category: 'Algorithmic Problem Solving',
    description:
      'Solved 200+ data structures and algorithms problems on LeetCode using C++, strengthening core foundations in memory efficiency, time complexity, and competitive problem solving.',
    icon: Code2,
    accent: 'border-indigo-500/30 bg-indigo-500/5 text-indigo-300'
  }
];

const CERTIFICATIONS_DATA = [
  {
    title: 'AICTE & EduSkills Alteryx Internship',
    issuer: 'AICTE & EduSkills',
    category: 'Data Analytics & Automation',
    icon: Workflow
  },
  {
    title: 'AICTE Python Full Stack Developer Internship',
    issuer: 'AICTE',
    category: 'Full Stack Python Engineering',
    icon: Code2
  },
  {
    title: 'Alteryx Core Designer',
    issuer: 'Alteryx',
    category: 'Data Preparation & Analytics',
    icon: Database
  },
  {
    title: 'Excel for Data Analysis — edX',
    issuer: 'edX',
    category: 'Data Analysis & Spreadsheets',
    icon: BarChart3
  },
  {
    title: 'Power BI',
    issuer: 'Business Intelligence Certification',
    category: 'Data Visualization & Dashboards',
    icon: Layers
  }
];

const FALLBACK_GITHUB_REPOS = [
  {
    id: 'rag-repo',
    name: 'RAG',
    description:
      'DocChat AI — Intelligent document Q&A system using FastAPI, ChromaDB, PostgreSQL/Supabase, Groq API, and strict user-level data isolation.',
    html_url: 'https://github.com/suyashmudgal/RAG',
    language: 'Python',
    topics: ['fastapi', 'chromadb', 'rag', 'postgresql', 'groq-api', 'llm']
  },
  {
    id: 'multi-agent-repo',
    name: 'Multi-agent-research-system-main',
    description:
      'Khoj AI — Collaborative four-stage multi-agent AI research system designed to research, process, and synthesize citation-backed reports using LangGraph, Tavily, and Streamlit.',
    html_url: 'https://github.com/suyashmudgal/Multi-agent-research-system-main',
    language: 'Python',
    topics: ['agentic-ai', 'langgraph', 'multi-agent-systems', 'python', 'streamlit']
  }
];

const AI_ASSISTANT_PRESETS = [
  {
    q: 'What does Suyash build?',
    a: 'Suyash builds production-oriented Generative AI applications, Retrieval-Augmented Generation (RAG) systems with strict user-level data isolation, Khoj AI (LangGraph multi-agent research pipelines), automated EDA & startup analytics platforms, full-stack digital library solutions (CardMakers), and NLP systems.'
  },
  {
    q: 'Tell me about the DocChat RAG architecture',
    a: 'Suyash’s DocChat AI RAG system is built with FastAPI, ChromaDB, PostgreSQL/Supabase, and Groq API. Its standout engineering feature is strict user-level data isolation: authenticated users are synced with PostgreSQL and every vector chunk in ChromaDB is isolated by user metadata so no user can ever retrieve another user’s documents or chat context.'
  },
  {
    q: 'What are his technical skills?',
    a: '• Generative AI: RAG, LangGraph, LlamaIndex, AutoGen, LangSmith, Embeddings, Semantic Search, Prompt Engineering\n• AI/ML: Python, PyTorch, TensorFlow, Keras, Scikit-Learn, Hugging Face, NLP, OpenCV\n• Backend & DBs: FastAPI, Flask, PostgreSQL, Supabase, ChromaDB, FAISS, Pinecone\n• Data & Core: C++ (200+ LeetCode problems), SQL, Pandas, NumPy, Matplotlib, Power BI, Streamlit.'
  },
  {
    q: 'Show his 7 featured projects',
    a: '1. DocChat AI / RAG System (FastAPI, ChromaDB, PostgreSQL, Groq)\n2. Khoj AI — Multi-Agent Research System (Live: khojai.streamlit.app)\n3. AI Data Explorer (Live: aidataexplorer.streamlit.app)\n4. Indian Startup Ecosystem & Funding Analysis (Live: startupanalysisindia.streamlit.app)\n5. CardMakers — Digital ID & Library Solution (Live WIP: cardmakers.vercel.app)\n6. Info Trunk (1K+ visitors & 5.5K+ page views)\n7. Fake News Detection System (NLP, TF-IDF, Flask).'
  },
  {
    q: 'What are his achievements & education?',
    a: '• Achievements: Solved 200+ LeetCode Problems in C++, 5th Place in ScandiBytes Mini AI Challenge, and GSSOC 2025 Contributor.\n• Experience: Web Developer & Tester Intern at ITM University, Gwalior (Jan 2026 – Present).\n• Education: B.Tech CSE (Data Science) at ITM University, Gwalior (2023–2027), 6th Semester with a 7.53 CGPA (79.14% in Semester V).'
  },
  {
    q: 'How can I contact him?',
    a: 'You can explore his code directly on GitHub (github.com/suyashmudgal), launch his live deployments on Streamlit and Vercel, use the Contact section at the bottom of this portfolio, or view/download his resume from the top navigation bar.'
  }
];

// ==========================================
// SUBTLE NEURAL NETWORK CANVAS BACKGROUND
// ==========================================
function NeuralBackground({ theme = 'black' }) {
  const canvasRef = useRef(null);
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nodeCount = Math.min(42, Math.floor((width * height) / 38000));

    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      radius: Math.random() * 1.6 + 0.8
    }));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = themeRef.current === 'black';

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (!prefersReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? 'rgba(6, 182, 212, 0.45)' : 'rgba(2, 132, 199, 0.35)';
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 155) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            const alpha = (1 - dist / 155) * 0.14;
            ctx.strokeStyle = isDark
              ? `rgba(99, 102, 241, ${alpha})`
              : `rgba(79, 70, 229, ${alpha * 0.8})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 opacity-75"
    />
  );
}

// ==========================================
// HERO INTERACTIVE AI ARCHITECTURE INSPECTOR
// ==========================================
function HeroArchitectureVisual({ onSelectProject }) {
  const [activePipeline, setActivePipeline] = useState('rag');
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const pipelines = {
    rag: {
      name: 'DocChat AI • Isolated RAG Pipeline',
      projectRef: 'docchat-rag',
      status: 'FastAPI + ChromaDB + Groq API',
      nodes: [
        {
          id: 'auth',
          title: 'PostgreSQL / Supabase Auth',
          detail: 'Validates JWT & syncs user_id for strict tenant scoping',
          metric: 'User Isolated',
          color: 'text-emerald-400'
        },
        {
          id: 'embed',
          title: 'Document Chunking & Embeddings',
          detail: 'Transforms uploaded PDFs/docs into dense vector representations',
          metric: 'Vectorized',
          color: 'text-sky-400'
        },
        {
          id: 'chroma',
          title: 'ChromaDB Metadata Isolation',
          detail: 'Queries vector index filtered strictly by authenticated user_id',
          metric: 'Zero Cross-Leakage',
          color: 'text-indigo-400'
        },
        {
          id: 'groq',
          title: 'Groq LLM Token Streaming',
          detail: 'Synthesizes retrieved context + chat memory into real-time stream',
          metric: 'Streaming SSE',
          color: 'text-cyan-400'
        }
      ],
      logs: [
        '[INFO] POST /api/v1/documents/upload -> user_sync=verified (PostgreSQL)',
        '[INFO] ChromaDB upsert: metadata={"user_id": "usr_94x", "isolation": "strict"}',
        '[RETRIEVAL] Semantic top-k search scoped to usr_94x -> 4 relevant chunks',
        '[STREAM] Groq LLM generating contextual response with chat memory...'
      ]
    },
    agents: {
      name: 'Khoj AI • 4-Stage Multi-Agent Research',
      projectRef: 'multi-agent-research',
      status: 'LangGraph + LangChain + Tavily + Streamlit',
      nodes: [
        {
          id: 'query',
          title: 'User Query Decomposition',
          detail: 'Breaks complex research prompt into targeted sub-questions',
          metric: 'Planner Node',
          color: 'text-sky-400'
        },
        {
          id: 'research',
          title: 'Specialized Research Agents (Tavily)',
          detail: 'Autonomous agents gather domain-specific evidence in parallel',
          metric: 'Multi-Agent',
          color: 'text-indigo-400'
        },
        {
          id: 'process',
          title: 'Information Processing & Verification',
          detail: 'Validates relevance, removes redundancy, structures context',
          metric: 'State Graph',
          color: 'text-amber-400'
        },
        {
          id: 'synthesis',
          title: 'Citation-Backed Synthesis Report',
          detail: 'Compiles verified findings into structured output on khojai.streamlit.app',
          metric: 'Live App',
          color: 'text-emerald-400'
        }
      ],
      logs: [
        '[KHOJ_AI] State initialized: User Query -> Research Agents dispatched',
        '[TAVILY_AGENT] Completed live web retrieval & source extraction',
        '[PROCESS] Information Processing node verified key evidence blocks',
        '[SYNTHESIS] Final citation-backed report rendered on Streamlit UI.'
      ]
    }
  };

  const current = pipelines[activePipeline];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % current.nodes.length);
    }, 2600);
    return () => clearInterval(interval);
  }, [activePipeline, current.nodes.length]);

  return (
    <div className="relative rounded-2xl border border-slate-800/90 bg-slate-900/75 backdrop-blur-xl shadow-2xl shadow-sky-950/30 overflow-hidden">
      {/* Subtle Top Glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Window Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-slate-800/90 bg-slate-950/70">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-xs font-mono text-slate-400">
            suyash@ai-systems:~/architecture-inspector
          </span>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
          <button
            type="button"
            onClick={() => {
              setActivePipeline('rag');
              setActiveStepIndex(0);
            }}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              activePipeline === 'rag'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            RAG Isolation
          </button>
          <button
            type="button"
            onClick={() => {
              setActivePipeline('agents');
              setActiveStepIndex(0);
            }}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              activePipeline === 'agents'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Multi-Agent Graph
          </button>
        </div>
      </div>

      {/* Pipeline Status Header */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-slate-800/50">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-sm font-semibold text-slate-100">{current.name}</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 font-mono">{current.status}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            const found = PROJECTS_DATA.find((p) => p.id === current.projectRef);
            if (found) onSelectProject(found);
          }}
          className="text-xs font-medium text-sky-400 hover:text-sky-300 flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 transition"
        >
          Inspect Spec <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Interactive Node Flow */}
      <div className="p-5 space-y-3">
        {current.nodes.map((node, index) => {
          const isActive = index === activeStepIndex;
          return (
            <div
              key={node.id}
              onClick={() => setActiveStepIndex(index)}
              className={`cursor-pointer rounded-xl p-3.5 border transition-all duration-300 ${
                isActive
                  ? 'bg-slate-800/90 border-sky-500/50 shadow-lg shadow-sky-950/40 translate-x-1'
                  : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${
                      isActive
                        ? 'bg-sky-500 text-slate-950'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    0{index + 1}
                  </span>
                  <span className="text-sm font-semibold text-slate-100">{node.title}</span>
                </div>
                <span
                  className={`text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 ${node.color}`}
                >
                  {node.metric}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1.5 pl-8 leading-relaxed">
                {node.detail}
              </p>
            </div>
          );
        })}
      </div>

      {/* Live Execution Telemetry Console */}
      <div className="px-5 py-3.5 bg-slate-950/90 border-t border-slate-800/90 font-mono text-[11px] space-y-1.5">
        <div className="flex items-center justify-between text-slate-500 pb-1 border-b border-slate-900">
          <span>PIPELINE TELEMETRY</span>
          <span className="text-sky-400">STEP {activeStepIndex + 1}/4 ACTIVE</span>
        </div>
        {current.logs.map((log, idx) => (
          <div
            key={idx}
            className={`truncate transition-opacity duration-300 ${
              idx === activeStepIndex ? 'text-sky-300 font-medium' : 'text-slate-500'
            }`}
          >
            {idx === activeStepIndex ? '▸ ' : '  '}
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// PROJECT DETAIL & ARCHITECTURE MODAL
// ==========================================
function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 text-slate-100 shadow-2xl">
        {/* Sticky Top Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-slate-900/95 backdrop-blur border-b border-slate-800">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-sky-400">
              {project.category} • {project.badge}
            </span>
            <h2 id="modal-project-title" className="text-xl sm:text-2xl font-bold text-white">
              {project.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Overview Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-transparent border border-sky-500/25">
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              {project.description}
            </p>
            {project.highlightNote && (
              <div className="mt-3 flex items-start gap-2 text-xs sm:text-sm text-sky-300 font-medium">
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-sky-400" />
                <span>{project.highlightNote}</span>
              </div>
            )}
          </div>

          {/* Info Trunk Real Metrics (if present) */}
          {project.metrics && (
            <div className="grid grid-cols-3 gap-3">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-center"
                >
                  <div className="text-xl sm:text-2xl font-bold text-sky-400">{m.value}</div>
                  <div className="text-xs text-slate-400 mt-1">{m.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/90">
              <h3 className="text-xs font-mono uppercase tracking-wider text-rose-400 mb-2">
                01 / Problem Statement
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">{project.problem}</p>
            </div>
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/90">
              <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
                02 / Engineered Solution
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">{project.solution}</p>
            </div>
          </div>

          {/* System Architecture Flow Diagram */}
          <div className="p-5 rounded-xl bg-slate-950/90 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-sky-400 flex items-center gap-2">
                <Workflow className="w-4 h-4" />
                03 / System Architecture & Execution Pipeline
              </h3>
              <span className="text-[11px] font-mono text-slate-500">
                {project.architectureFlow.length} Stages
              </span>
            </div>

            {project.id === 'docchat-rag' ? (
              /* Vertical + Grid Architecture Diagram specifically tailored for RAG System */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.architectureFlow.map((node, index) => (
                  <div
                    key={node.step}
                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/90 border border-slate-800/90"
                  >
                    <div className="w-7 h-7 rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {index + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-white truncate">
                        {node.step}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">{node.detail}</div>
                    </div>
                    {index < project.architectureFlow.length - 1 && (
                      <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              /* Horizontal / Responsive Flow for Multi-Agent & Other Projects */
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
                {project.architectureFlow.map((node, index) => (
                  <div
                    key={node.step}
                    className="relative p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col justify-between"
                  >
                    <span className="text-[10px] font-mono text-sky-400">
                      STAGE 0{index + 1}
                    </span>
                    <div className="text-xs font-semibold text-white mt-1">{node.step}</div>
                    <div className="text-[11px] text-slate-400 mt-1 leading-snug">
                      {node.detail}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Key Features & Technologies */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 p-5 rounded-xl bg-slate-950/60 border border-slate-800">
              <h3 className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-3">
                04 / Key Technical Features
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3">
                  05 / Tech Stack
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-900 border border-slate-700/80 text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <div className="text-xs text-slate-400">
                  <span className="text-slate-200 font-semibold">Outcome: </span>
                  {project.outcome}
                </div>
              </div>
            </div>
          </div>

          {/* Challenges Box */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
              06 / Engineering Challenges Addressed
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.challenges}
            </p>
          </div>

          {/* Action Links Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
            <div className="flex flex-wrap items-center gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-950 font-semibold text-sm hover:bg-white transition"
                >
                  <Github className="w-4 h-4" />
                  View Source on GitHub
                </a>
              )}
              {project.backendUrl && (
                <a
                  href={project.backendUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 text-slate-100 border border-slate-700 font-medium text-sm hover:bg-slate-700 transition"
                >
                  <Server className="w-4 h-4 text-sky-400" />
                  Backend Architecture Code
                </a>
              )}
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 text-slate-950 font-semibold text-sm hover:bg-sky-400 transition"
                >
                  <ExternalLink className="w-4 h-4" />
                  Launch Live App
                </a>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:text-white text-sm"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// INTERACTIVE RESUME VIEWER & PRINT MODAL
// ==========================================
function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Suyash Mudgal Resume"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 text-slate-100 shadow-2xl">
        {/* Top Action Bar */}
        <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-2 px-6 py-4 bg-slate-900/95 backdrop-blur border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-sky-400" />
            <span className="font-bold text-white text-base">
              Suyash Mudgal — Official Curriculum Vitae
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-sky-500 text-slate-950 font-semibold text-xs sm:text-sm hover:bg-sky-400 transition"
            >
              <Download className="w-4 h-4" />
              Print / Save as PDF
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Structured Resume Sheet */}
        <div className="p-6 sm:p-10 space-y-6 bg-slate-950/60">
          {/* Header */}
          <div className="border-b border-slate-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                SUYASH MUDGAL
              </h1>
              <p className="text-sm sm:text-base text-sky-400 font-medium mt-1">
                AI/ML Engineer | Generative AI Developer | Data Science Student
              </p>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                Gwalior, Madhya Pradesh, India
              </p>
            </div>
            <div className="text-xs font-mono space-y-1 text-slate-300">
              <div>
                GitHub:{' '}
                <a
                  href="https://github.com/suyashmudgal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 underline"
                >
                  github.com/suyashmudgal
                </a>
              </div>
              <div>Degree: B.Tech CSE (Data Science) • 2023–2027</div>
              <div>Current: 6th Semester • CGPA: 7.68</div>
            </div>
          </div>

          {/* Summary */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-sky-400 mb-2">
              Career Objective
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {PERSONAL_INFO.careerGoal}
            </p>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-sky-400 mb-2">
              Education
            </h2>
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="flex flex-wrap justify-between gap-2">
                <div className="font-semibold text-white">
                  B.Tech — Computer Science & Engineering (Data Science)
                </div>
                <div className="text-xs font-mono text-sky-400">2023 – 2027 (6th Semester)</div>
              </div>
              <div className="text-sm text-slate-300 mt-0.5">
                ITM University, Gwalior • <span className="text-white font-semibold">CGPA: 7.68</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-mono text-slate-400">
                <span>Sem I: 6.81 SGPA</span> • <span>Sem II: 7.52 SGPA</span> •{' '}
                <span>Sem III: 7.62 SGPA</span> • <span>Sem IV: 7.29 SGPA</span> •{' '}
                <span>Sem V: 8.33 SGPA</span> •{' '}
                <span className="text-emerald-400 font-semibold">Sem VI: 8.53 SGPA</span>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-sky-400 mb-2">
              Experience
            </h2>
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="flex flex-wrap justify-between gap-2">
                <div className="font-semibold text-white">Web Developer & Tester Intern</div>
                <div className="text-xs font-mono text-sky-400">Jan 2026 – Present</div>
              </div>
              <div className="text-xs text-slate-400 mb-2">ITM University, Gwalior</div>
              <ul className="list-disc list-inside text-xs sm:text-sm text-slate-300 space-y-1">
                {EXPERIENCE_DATA[0].responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-sky-400 mb-2">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {SKILL_CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  className="p-3 rounded-lg bg-slate-900/80 border border-slate-800"
                >
                  <span className="font-semibold text-white">{cat.title}: </span>
                  <span className="text-slate-300">{cat.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-sky-400 mb-2">
              Key AI & Engineering Projects
            </h2>
            <div className="space-y-3">
              {PROJECTS_DATA.map((proj) => (
                <div
                  key={proj.id}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800"
                >
                  <div className="flex flex-wrap justify-between gap-2">
                    <span className="font-semibold text-white text-sm">{proj.title}</span>
                    <span className="text-xs font-mono text-slate-400">
                      {proj.technologies.join(' • ')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{proj.description}</p>
                  {proj.highlightNote && (
                    <p className="text-xs text-sky-300 mt-1 font-medium">{proj.highlightNote}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Achievements & Certifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-xs font-mono uppercase tracking-wider text-sky-400 mb-2">
                Achievements
              </h3>
              <ul className="list-disc list-inside text-xs text-slate-300 space-y-1.5">
                {ACHIEVEMENTS_DATA.map((a) => (
                  <li key={a.title}>{a.title}</li>
                ))}
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-xs font-mono uppercase tracking-wider text-sky-400 mb-2">
                Certifications
              </h3>
              <ul className="list-disc list-inside text-xs text-slate-300 space-y-1.5">
                {CERTIFICATIONS_DATA.map((c) => (
                  <li key={c.title}>{c.title}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// FLOATING INTERACTIVE AI ASSISTANT WIDGET
// ==========================================
function PortfolioAIAssistant({ onOpenProject }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hi! I'm Suyash's interactive portfolio assistant (frontend simulation). Ask me about his RAG system, multi-agent pipelines, skills, or internship experience."
    }
  ]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const generateResponse = (queryText) => {
    const q = queryText.toLowerCase();
    if (q.includes('rag') || q.includes('docchat') || q.includes('isolation') || q.includes('chroma')) {
      return AI_ASSISTANT_PRESETS[1].a;
    }
    if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('python')) {
      return AI_ASSISTANT_PRESETS[2].a;
    }
    if (q.includes('project') || q.includes('work') || q.includes('agent') || q.includes('info trunk')) {
      return AI_ASSISTANT_PRESETS[3].a;
    }
    if (q.includes('experience') || q.includes('intern') || q.includes('education') || q.includes('cgpa') || q.includes('itm')) {
      return AI_ASSISTANT_PRESETS[4].a;
    }
    if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('github') || q.includes('reach')) {
      return AI_ASSISTANT_PRESETS[5].a;
    }
    return AI_ASSISTANT_PRESETS[0].a;
  };

  const handleSend = (customQuery) => {
    const textToSend = customQuery || input.trim();
    if (!textToSend) return;

    const reply = generateResponse(textToSend);
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: textToSend },
      { role: 'assistant', text: reply }
    ]);
    if (!customQuery) setInput('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {isOpen ? (
        <div className="w-[340px] sm:w-[390px] rounded-2xl border border-slate-700/90 bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-sky-950/50 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  Suyash AI Assistant
                  <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-slate-800 text-sky-400">
                    Simulated
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Interactive Portfolio Knowledge Base
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close AI Assistant"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="p-4 h-72 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3.5 py-2.5 whitespace-pre-line leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-sky-500 text-slate-950 font-medium'
                      : 'bg-slate-800/90 text-slate-200 border border-slate-700/70'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3 py-2 bg-slate-950/60 border-t border-slate-800/80 flex gap-1.5 overflow-x-auto no-scrollbar">
            {AI_ASSISTANT_PRESETS.map((preset) => (
              <button
                key={preset.q}
                type="button"
                onClick={() => handleSend(preset.q)}
                className="shrink-0 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-sky-300 border border-slate-800 text-[11px] transition"
              >
                {preset.q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2.5 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Suyash's AI systems..."
              className="flex-1 bg-slate-900 text-slate-100 placeholder-slate-500 text-xs px-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-500"
            />
            <button
              type="submit"
              aria-label="Send question"
              className="p-2 rounded-xl bg-sky-500 text-slate-950 hover:bg-sky-400 transition"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-900/95 hover:bg-slate-800 text-slate-100 border border-sky-500/40 shadow-xl shadow-sky-950/60 backdrop-blur-xl transition-all hover:scale-105"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500" />
          </span>
          <Terminal className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-semibold tracking-wide">Ask Portfolio AI</span>
        </button>
      )}
    </div>
  );
}

// ==========================================
// MAIN PORTFOLIO APPLICATION
// ==========================================
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedSkillCategory, setSelectedSkillCategory] = useState('all');
  const [skillSearch, setSkillSearch] = useState('');
  const [selectedProjectFilter, setSelectedProjectFilter] = useState('All Projects');
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  // Theme Management: 'black' (Pure OLED Pitch Black) vs 'white' (Pure Clean White)
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('portfolio_theme') || 'black';
    } catch {
      return 'black';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_theme', theme);
    } catch {}
    if (theme === 'white') {
      document.documentElement.classList.add('theme-white');
      document.documentElement.classList.remove('theme-black');
    } else {
      document.documentElement.classList.add('theme-black');
      document.documentElement.classList.remove('theme-white');
    }
  }, [theme]);

  // Keyboard shortcut: Press 'T' to toggle theme instantly
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.key === 't' || e.key === 'T') {
        setTheme((prev) => (prev === 'black' ? 'white' : 'black'));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'black' ? 'white' : 'black'));
  };

  // Live GitHub Public Data State (Authentic API fetch + verified fallback)
  const [githubProfile, setGithubProfile] = useState(null);
  const [githubRepos, setGithubRepos] = useState(FALLBACK_GITHUB_REPOS);
  const [githubLoading, setGithubLoading] = useState(true);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: 'AI/ML Engineering Opportunity',
    message: ''
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Set Document Title & Meta Description for SEO
  useEffect(() => {
    document.title = 'Suyash Mudgal | AI/ML Engineer & Generative AI Developer';
  }, []);

  // Fetch Authentic Public GitHub Profile & up to 100 Repositories for Live Repo Matching
  useEffect(() => {
    let isMounted = true;
    async function fetchGithubData() {
      try {
        setGithubLoading(true);
        const [userRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/suyashmudgal'),
          fetch('https://api.github.com/users/suyashmudgal/repos?sort=updated&per_page=100')
        ]);

        if (userRes.ok && isMounted) {
          const userData = await userRes.json();
          setGithubProfile(userData);
        }

        if (reposRes.ok && isMounted) {
          const reposData = await reposRes.json();
          if (Array.isArray(reposData) && reposData.length > 0) {
            setGithubRepos(reposData);
          }
        }
      } catch (err) {
        // Silently retain verified fallback repositories if rate-limited
      } finally {
        if (isMounted) setGithubLoading(false);
      }
    }
    fetchGithubData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Dynamically resolve exact GitHub repository URLs for projects using fetched repos
  const resolvedProjects = useMemo(() => {
    return PROJECTS_DATA.map((project) => {
      // Keep explicit exact links for RAG and Multi-agent-research-system-main
      if (
        project.id === 'docchat-rag' ||
        project.id === 'multi-agent-research' ||
        !project.repoKeywords
      ) {
        return project;
      }

      const matchedRepo = githubRepos.find((repo) => {
        const repoName = (repo.name || '').toLowerCase();
        const repoDesc = (repo.description || '').toLowerCase();
        const homepage = (repo.homepage || '').toLowerCase();

        // Check if liveDemo matches repo homepage
        if (project.liveDemo && homepage && homepage.includes(project.liveDemo.replace('https://', '').replace('/', ''))) {
          return true;
        }

        return project.repoKeywords.some(
          (kw) => repoName.includes(kw.toLowerCase()) || repoDesc.includes(kw.toLowerCase())
        );
      });

      if (matchedRepo && matchedRepo.html_url) {
        return {
          ...project,
          github: matchedRepo.html_url,
          matchedRepoName: matchedRepo.name
        };
      }

      return project;
    });
  }, [githubRepos]);

  // Filtered Skill Categories
  const filteredSkillCategories = useMemo(() => {
    return SKILL_CATEGORIES.filter((cat) => {
      if (selectedSkillCategory !== 'all' && cat.id !== selectedSkillCategory) {
        return false;
      }
      if (!skillSearch.trim()) return true;
      const q = skillSearch.toLowerCase();
      return (
        cat.title.toLowerCase().includes(q) ||
        cat.skills.some((s) => s.toLowerCase().includes(q))
      );
    });
  }, [selectedSkillCategory, skillSearch]);

  // Filtered Projects by Category Tabs
  const filteredProjects = useMemo(() => {
    if (selectedProjectFilter === 'All Projects') return resolvedProjects;
    return resolvedProjects.filter((p) => p.category === selectedProjectFilter);
  }, [selectedProjectFilter, resolvedProjects]);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopyGithub = () => {
    navigator.clipboard?.writeText(PERSONAL_INFO.github);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Education', id: 'education' },
    { label: 'Achievements', id: 'achievements' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 selection:bg-cyan-500 selection:text-slate-950 relative overflow-x-hidden font-sans transition-colors duration-300">
      {/* Subtle Animated Neural Node Canvas */}
      <NeuralBackground theme={theme} />

      {/* Subtle Top Radial Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[950px] h-[420px] bg-gradient-to-b from-sky-500/10 via-indigo-500/5 to-transparent blur-3xl z-0"
      />

      {/* ==========================================
          STICKY NAVIGATION BAR
      ========================================== */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#060913]/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            type="button"
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-600 p-[1px]">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center font-mono font-bold text-sm text-sky-400 group-hover:text-white transition">
                SM
              </div>
            </div>
            <div>
              <span className="font-bold text-white tracking-tight text-sm sm:text-base block leading-none">
                Suyash Mudgal
              </span>
              <span className="text-[11px] font-mono text-slate-400 block mt-0.5">
                AI/ML & GenAI Engineer
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary Navigation">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/70 transition"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right CTA Buttons & Theme Toggle */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Theme Toggle Button (Pure OLED Black <-> Pure White) */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'black' ? 'Pure White' : 'Pure OLED Black'} mode`}
              title="Toggle White / Pure Black (Shortcut: Press 'T')"
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono font-medium transition-all duration-300 shadow-sm ${
                theme === 'black'
                  ? 'border-white/10 bg-zinc-900/90 text-zinc-200 hover:border-cyan-400/50 hover:text-white'
                  : 'border-slate-200 bg-white text-slate-800 hover:border-cyan-500 hover:text-cyan-600'
              }`}
            >
              {theme === 'black' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span className="hidden md:inline text-[11px] font-semibold">White Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-500" />
                  <span className="hidden md:inline text-[11px] font-semibold">Pure Black</span>
                </>
              )}
            </button>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-xl border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-white hover:border-slate-700 transition"
            >
              <Github className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={() => setResumeModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-slate-950 font-bold text-xs transition shadow-lg shadow-cyan-500/20"
            >
              <FileText className="w-3.5 h-3.5" />
              Resume
            </button>
          </div>

          {/* Mobile Hamburger Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="lg:hidden p-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-800 bg-slate-950/98 px-4 pt-3 pb-5 space-y-2">
            <div className="grid grid-cols-2 gap-1.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="text-left px-3 py-2.5 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-800/80"
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="pt-2 flex flex-col gap-2 border-t border-slate-800/80">
              <button
                type="button"
                onClick={toggleTheme}
                className="w-full py-2 px-3 rounded-xl border border-slate-700 bg-slate-900 text-xs font-mono text-slate-200 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  {theme === 'black' ? (
                    <>
                      <Sun className="w-4 h-4 text-amber-400" />
                      <span>Switch to Pure White Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4 text-indigo-400" />
                      <span>Switch to Pure OLED Black</span>
                    </>
                  )}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">T key</span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setResumeModalOpen(true);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-4 h-4" />
                  View / Download Resume
                </button>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-medium flex items-center gap-1.5"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ==========================================
          MAIN CONTENT CONTAINER
      ========================================== */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ==========================================
            1. HERO SECTION
        ========================================== */}
        <section id="home" className="pt-10 pb-20 md:pt-16 md:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Core Pitch & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Availability & Location Pill */}
              <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-slate-200 font-medium">
                  Open to AI/ML, GenAI & Data Science Roles / Internships
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-sky-400 font-mono flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Gwalior, India
                </span>
              </div>

              {/* Role Tag */}
              <div className="text-xs sm:text-sm font-mono uppercase tracking-widest text-sky-400">
                {PERSONAL_INFO.headline}
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-white leading-[1.12]">
                Building Intelligent Systems with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400">
                  AI, Data & Code.
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                AI/ML Engineer and Data Science student building Generative AI applications, RAG
                pipelines, multi-agent systems, conversational assistants, and data-driven
                products.
              </p>

              {/* Builder Identity Highlight */}
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/90 max-w-2xl flex items-start gap-3">
                <Cpu className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <span className="text-white font-semibold">
                    Actively engineering AI systems:
                  </span>{' '}
                  From multi-tenant RAG architectures with ChromaDB metadata isolation and FastAPI
                  streaming to collaborative LangGraph multi-agent workflows.
                </p>
              </div>

              {/* Primary & Secondary CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => scrollToSection('projects')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-sky-500/25"
                >
                  View My Work
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setResumeModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-semibold text-sm transition"
                >
                  <Download className="w-4 h-4 text-sky-400" />
                  Download Resume
                </button>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-800 font-medium text-sm transition"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>

                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-800 font-medium text-sm transition"
                >
                  <Linkedin className="w-4 h-4 text-sky-400" />
                  LinkedIn
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-800 font-medium text-sm transition"
                >
                  <Mail className="w-4 h-4 text-cyan-400" />
                  Contact Me
                </button>
              </div>
            </div>

            {/* Right Column: Interactive AI Architecture Visual */}
            <div className="lg:col-span-5">
              <HeroArchitectureVisual
                onSelectProject={(proj) => setActiveProjectModal(proj)}
              />
            </div>
          </div>
        </section>

        {/* ==========================================
            2. ABOUT ME & KEY STATISTICS
        ========================================== */}
        <section id="about" className="py-16 border-t border-slate-800/70">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Heading & Bio */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-sky-400">
                <Sparkles className="w-3.5 h-3.5" /> 01 / About Me
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                Not Just Studying AI Theory — Actively Building Production-Oriented AI Systems.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                I am <span className="text-white font-semibold">Suyash Mudgal</span>, a 6th-semester
                B.Tech Computer Science & Engineering (Data Science) student at{' '}
                <span className="text-white font-medium">ITM University, Gwalior</span> (2023–2027).
                My focus lies at the intersection of <span className="text-sky-300">Generative AI</span>,{' '}
                <span className="text-sky-300">Retrieval-Augmented Generation (RAG)</span>,{' '}
                <span className="text-sky-300">Multi-Agent Systems</span>, and{' '}
                <span className="text-sky-300">Backend Engineering</span>.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Rather than restricting my learning to isolated notebooks or theoretical exercises,
                I enjoy architecting end-to-end systems—connecting vector databases like{' '}
                <span className="text-slate-100 font-mono text-xs px-1.5 py-0.5 rounded bg-slate-800">
                  ChromaDB
                </span>
                ,{' '}
                <span className="text-slate-100 font-mono text-xs px-1.5 py-0.5 rounded bg-slate-800">
                  FAISS
                </span>
                , and{' '}
                <span className="text-slate-100 font-mono text-xs px-1.5 py-0.5 rounded bg-slate-800">
                  Pinecone
                </span>{' '}
                with{' '}
                <span className="text-slate-100 font-mono text-xs px-1.5 py-0.5 rounded bg-slate-800">
                  FastAPI
                </span>
                ,{' '}
                <span className="text-slate-100 font-mono text-xs px-1.5 py-0.5 rounded bg-slate-800">
                  PostgreSQL / Supabase
                </span>
                , and agentic frameworks such as{' '}
                <span className="text-slate-100 font-mono text-xs px-1.5 py-0.5 rounded bg-slate-800">
                  LangGraph
                </span>
                ,{' '}
                <span className="text-slate-100 font-mono text-xs px-1.5 py-0.5 rounded bg-slate-800">
                  LlamaIndex
                </span>
                , and{' '}
                <span className="text-slate-100 font-mono text-xs px-1.5 py-0.5 rounded bg-slate-800">
                  AutoGen
                </span>
                .
              </p>

              {/* Core Focus Domains */}
              <div className="pt-2">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Core Engineering Focus Areas
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Generative AI',
                    'LLM Applications',
                    'RAG Pipelines',
                    'Vector Databases',
                    'FastAPI Backends',
                    'Multi-Agent AI Systems',
                    'Machine Learning',
                    'Natural Language Processing',
                    'Data Science & Analytics'
                  ].map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Target Roles & Career Goal Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-slate-900/75 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-sky-400">
                    Career Mission
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    Available for Roles
                  </span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">
                  “{PERSONAL_INFO.careerGoal}”
                </p>
                <div className="pt-3 border-t border-slate-800">
                  <div className="text-xs font-mono text-slate-400 mb-2.5">
                    OPEN TO OPPORTUNITIES IN:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PERSONAL_INFO.openTo.map((role) => (
                      <div
                        key={role}
                        className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950/60 px-3 py-2 rounded-lg border border-slate-800/80"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span className="truncate">{role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5-Card Statistics Bar */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {STATS_DATA.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/90 hover:border-slate-700 transition group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-extrabold text-white tracking-tight">
                      {stat.value}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-xl bg-gradient-to-br ${stat.accent} p-[1px]`}
                    >
                      <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                        <IconComponent className="w-4 h-4 text-slate-200" />
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-slate-200">{stat.label}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{stat.sub}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ==========================================
            3. TECHNICAL SKILLS SECTION
        ========================================== */}
        <section id="skills" className="py-16 border-t border-slate-800/70">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-sky-400">
                <Code2 className="w-3.5 h-3.5" /> 02 / Technical Arsenal
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mt-1">
                Categorized AI, Backend & Data Stack
              </h2>
            </div>

            {/* Interactive Skill Search */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={skillSearch}
                onChange={(e) => setSkillSearch(e.target.value)}
                placeholder="Filter skill (e.g. LangGraph, FastAPI)..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              type="button"
              onClick={() => setSelectedSkillCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition ${
                selectedSkillCategory === 'all'
                  ? 'bg-sky-500 text-slate-950 font-semibold'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
              }`}
            >
              All Categories ({SKILL_CATEGORIES.reduce((acc, c) => acc + c.skills.length, 0)})
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedSkillCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition ${
                  selectedSkillCategory === cat.id
                    ? 'bg-sky-500 text-slate-950 font-semibold'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {cat.title} ({cat.skills.length})
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSkillCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.id}
                  className="p-6 rounded-2xl bg-slate-900/75 border border-slate-800/90 hover:border-slate-700 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl ${category.bg} border ${category.border} flex items-center justify-center ${category.color}`}
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-white text-base">{category.title}</h3>
                      </div>
                      <span className="text-xs font-mono text-slate-500">
                        {category.skills.length} skills
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => {
                      const isHighlighted =
                        skillSearch.trim() &&
                        skill.toLowerCase().includes(skillSearch.toLowerCase());
                      return (
                        <span
                          key={skill}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
                            isHighlighted
                              ? 'bg-sky-500 text-slate-950 font-bold'
                              : 'bg-slate-950/90 text-slate-200 border border-slate-800 hover:border-sky-500/50 hover:text-sky-300'
                          }`}
                        >
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ==========================================
            4. FEATURED PROJECTS SECTION
        ========================================== */}
        <section id="projects" className="py-16 border-t border-slate-800/70">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-sky-400">
                <Layers className="w-3.5 h-3.5" /> 03 / Featured Systems & Engineering Work
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mt-1">
                Categorized AI, Data Analytics & Product Portfolio
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Filter across <span className="text-slate-200 font-medium">7 real-world systems</span> or click{' '}
                <span className="text-sky-400 font-medium">View Details & Architecture</span> to inspect system design and live deployments.
              </p>
            </div>

            {/* Interactive Category Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {PROJECT_CATEGORY_TABS.map((cat) => {
                const count =
                  cat === 'All Projects'
                    ? resolvedProjects.length
                    : resolvedProjects.filter((p) => p.category === cat).length;
                const isSelected = selectedProjectFilter === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedProjectFilter(cat)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-medium transition flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-sky-500 text-slate-950 font-bold shadow-lg shadow-sky-500/20'
                        : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono ${
                        isSelected
                          ? 'bg-slate-950/25 text-slate-950 font-bold'
                          : 'bg-slate-950 text-slate-400'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Projects List */}
          <div className="space-y-6">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                className="group rounded-2xl border border-slate-800/90 bg-slate-900/70 hover:border-sky-500/40 transition-all duration-300 overflow-hidden shadow-xl"
              >
                <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left 7 Columns: Project Content */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-sky-500/15 text-sky-300 border border-sky-500/30">
                        0{idx + 1} • {project.category}
                      </span>
                      <span
                        className={`px-2.5 py-1 rounded-md text-xs font-mono border ${
                          project.statusNote
                            ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                            : 'bg-slate-950 text-slate-300 border-slate-800'
                        }`}
                      >
                        {project.badge}
                      </span>
                      {project.liveDemo && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/25">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Live Preview Available
                        </span>
                      )}
                      <span className="text-xs font-mono text-slate-400">{project.date}</span>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-sky-300 transition">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
                        {project.subtitle}
                      </p>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Architectural Highlight Callout */}
                    {project.highlightNote && (
                      <div className="p-3.5 rounded-xl bg-slate-950/90 border border-sky-500/25 flex items-start gap-2.5">
                        <Sparkles className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-sky-200 leading-relaxed">
                          {project.highlightNote}
                        </p>
                      </div>
                    )}

                    {/* Info Trunk Metrics Callout if applicable */}
                    {project.metrics && (
                      <div className="grid grid-cols-3 gap-3 pt-1">
                        {project.metrics.map((metric) => (
                          <div
                            key={metric.label}
                            className="p-3 rounded-xl bg-slate-950 border border-slate-800"
                          >
                            <div className="text-lg font-extrabold text-emerald-400">
                              {metric.value}
                            </div>
                            <div className="text-[11px] text-slate-400">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-950 text-slate-200 border border-slate-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setActiveProjectModal(project)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs sm:text-sm transition"
                      >
                        <Eye className="w-4 h-4" />
                        View Details & Architecture
                      </button>

                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs sm:text-sm font-semibold transition"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Preview
                        </a>
                      )}

                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs sm:text-sm font-medium transition"
                        >
                          <Github className="w-4 h-4" />
                          {project.matchedRepoName
                            ? `Repo (${project.matchedRepoName})`
                            : 'GitHub Repo'}
                        </a>
                      )}

                      {project.backendUrl && (
                        <a
                          href={project.backendUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-sky-300 border border-slate-800 text-xs sm:text-sm font-mono transition"
                        >
                          <Server className="w-3.5 h-3.5" />
                          /backend
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right 5 Columns: Visual Pipeline & Key Features Card */}
                  <div className="lg:col-span-5 space-y-3 bg-slate-950/80 p-5 rounded-xl border border-slate-800/90">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                      <span className="text-xs font-mono uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                        <Workflow className="w-3.5 h-3.5" />
                        System Pipeline Flow
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveProjectModal(project)}
                        className="text-[11px] font-mono text-slate-400 hover:text-white underline"
                      >
                        Expand Diagram
                      </button>
                    </div>

                    {/* Visual Workflow Steps */}
                    <div className="space-y-2">
                      {project.architectureFlow.slice(0, 5).map((stepObj, sIdx) => (
                        <div
                          key={stepObj.step}
                          className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-800/80 text-xs"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="w-5 h-5 rounded bg-sky-500/15 text-sky-400 font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                              {sIdx + 1}
                            </span>
                            <span className="font-semibold text-slate-200 truncate">
                              {stepObj.step}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400 truncate ml-2">
                            {stepObj.detail}
                          </span>
                        </div>
                      ))}
                      {project.architectureFlow.length > 5 && (
                        <button
                          type="button"
                          onClick={() => setActiveProjectModal(project)}
                          className="w-full py-1.5 text-center text-xs font-mono text-sky-400 hover:text-sky-300 bg-sky-500/5 rounded-lg border border-sky-500/20"
                        >
                          + {project.architectureFlow.length - 5} more pipeline stages (Click to inspect full RAG flow)
                        </button>
                      )}
                    </div>

                    {/* Top Features Preview */}
                    <div className="pt-2 border-t border-slate-800/80">
                      <div className="text-[11px] font-mono uppercase text-slate-400 mb-2">
                        Key Capabilities ({project.features.length})
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {project.features.slice(0, 6).map((f) => (
                          <div
                            key={f}
                            className="flex items-center gap-1.5 text-xs text-slate-300 truncate"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                            <span className="truncate">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================
            5. EXPERIENCE & 6. EDUCATION SECTION
        ========================================== */}
        <section id="experience" className="py-16 border-t border-slate-800/70">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Experience Column (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-sky-400">
                  <Briefcase className="w-3.5 h-3.5" /> 04 / Professional Experience
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                  Industry & Campus Engineering
                </h2>
              </div>

              <div className="relative pl-6 border-l-2 border-sky-500/40 space-y-6">
                {EXPERIENCE_DATA.map((exp) => (
                  <div
                    key={exp.role}
                    className="relative p-6 rounded-2xl bg-slate-900/75 border border-slate-800"
                  >
                    <span className="absolute -left-[31px] top-6 w-4 h-4 rounded-full bg-sky-400 border-4 border-[#060913]" />

                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        {exp.period}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{exp.type}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mt-3">{exp.role}</h3>
                    <div className="text-sm text-sky-400 font-medium mt-0.5">
                      {exp.organization} • {exp.location}
                    </div>

                    <ul className="mt-4 space-y-2.5">
                      {exp.responsibilities.map((resp) => (
                        <li
                          key={resp}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed"
                        >
                          <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Column (6 cols) */}
            <div id="education" className="lg:col-span-6 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-sky-400">
                  <GraduationCap className="w-3.5 h-3.5" /> 05 / Education & Academic Progression
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                  Academic Foundation
                </h2>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/75 border border-slate-800 space-y-6">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-5">
                  <div>
                    <span className="text-xs font-mono text-sky-400">
                      {EDUCATION_DATA.period} • {EDUCATION_DATA.currentSemester}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                      {EDUCATION_DATA.degree}
                    </h3>
                    <p className="text-sm text-slate-300 mt-0.5">
                      {EDUCATION_DATA.institution}
                    </p>
                  </div>

                  <div className="px-4 py-2.5 rounded-xl bg-slate-950 border border-sky-500/30 text-center">
                    <div className="text-xs font-mono text-slate-400">Cumulative CGPA</div>
                    <div className="text-2xl font-extrabold text-sky-400">
                      {EDUCATION_DATA.cgpa}
                    </div>
                  </div>
                </div>

                {/* Visual Semester Performance Chart */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-300">
                      Semester-Wise Academic Performance
                    </span>
                    <span className="text-xs font-mono text-emerald-400">
                      Latest Sem VI: 8.53 SGPA
                    </span>
                  </div>

                  <div className="space-y-3">
                    {EDUCATION_DATA.semesters.map((item, idx) => {
                      const isPeak = idx === EDUCATION_DATA.semesters.length - 1;
                      return (
                        <div key={item.sem} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-medium text-slate-300">{item.sem}</span>
                            <span
                              className={`font-mono font-semibold ${
                                isPeak ? 'text-emerald-400' : 'text-sky-300'
                              }`}
                            >
                              {item.label}
                            </span>
                          </div>
                          <div className="w-full h-2.5 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                            <div
                              className={`h-full rounded-full transition-all duration-700 ${
                                isPeak
                                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-400'
                                  : 'bg-gradient-to-r from-sky-500 to-indigo-500'
                              }`}
                              style={{ width: `${item.score}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            7. ACHIEVEMENTS & 8. CERTIFICATIONS
        ========================================== */}
        <section id="achievements" className="py-16 border-t border-slate-800/70">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-sky-400">
              <Award className="w-3.5 h-3.5" /> 06 / Honours & Credentials
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mt-1">
              Achievements & Verified Certifications
            </h2>
          </div>

          {/* 3 Verified Achievements Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {ACHIEVEMENTS_DATA.map((ach) => {
              const IconComponent = ach.icon;
              return (
                <div
                  key={ach.title}
                  className="p-6 rounded-2xl bg-slate-900/75 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-mono border ${ach.accent}`}
                      >
                        {ach.category}
                      </span>
                      <IconComponent className="w-5 h-5 text-sky-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{ach.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                      {ach.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Certifications Grid */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
            <h3 className="text-sm font-mono uppercase tracking-wider text-sky-400 mb-5 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Professional Certifications & Virtual Internships ({CERTIFICATIONS_DATA.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {CERTIFICATIONS_DATA.map((cert) => {
                const IconComponent = cert.icon;
                return (
                  <div
                    key={cert.title}
                    className="p-4 rounded-xl bg-slate-950/90 border border-slate-800/90 hover:border-sky-500/40 transition flex flex-col justify-between"
                  >
                    <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-3">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white leading-snug">
                        {cert.title}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">{cert.issuer}</div>
                      <div className="text-[11px] font-mono text-sky-400 mt-2">
                        {cert.category}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==========================================
            9. GITHUB / CODING ACTIVITY SECTION
        ========================================== */}
        <section className="py-16 border-t border-slate-800/70">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-sky-400">
                <Github className="w-3.5 h-3.5" /> 07 / Open Source & Codebase
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mt-1">
                GitHub Engineering Profile
              </h2>
            </div>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700 text-xs sm:text-sm font-semibold transition"
            >
              <Github className="w-4 h-4 text-sky-400" />
              github.com/suyashmudgal
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* GitHub Profile Banner */}
          <div className="p-6 rounded-2xl bg-slate-900/75 border border-slate-800 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-700 flex items-center justify-center text-sky-400 font-mono font-bold text-xl">
                <FolderGit2 className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">
                    {githubProfile?.name || 'Suyash Mudgal'}
                  </h3>
                  <span className="text-xs font-mono text-sky-400">@suyashmudgal</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                  {githubProfile?.bio ||
                    'Building Generative AI applications, RAG pipelines, Multi-Agent Research systems & Data Science solutions.'}
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs font-mono text-slate-400">
                  <span>Primary Stack: Python • FastAPI • C++ • SQL</span>
                  {typeof githubProfile?.public_repos === 'number' && (
                    <span>• Public Repositories: {githubProfile.public_repos}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href="https://github.com/suyashmudgal/RAG"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-sky-500/15 text-sky-300 border border-sky-500/30 text-xs font-mono hover:bg-sky-500/25 transition"
              >
                suyashmudgal/RAG
              </a>
              <a
                href="https://github.com/suyashmudgal/Multi-agent-research-system-main"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 text-xs font-mono hover:bg-indigo-500/25 transition"
              >
                suyashmudgal/Multi-agent-research-system
              </a>
            </div>
          </div>

          {/* Repositories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {githubRepos.slice(0, 6).map((repo) => (
              <a
                key={repo.id || repo.name}
                href={repo.html_url || PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/40 transition flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 font-mono text-sm font-bold text-sky-400 group-hover:text-sky-300 min-w-0">
                      <FolderGit2 className="w-4 h-4 shrink-0" />
                      <span className="truncate">{repo.name}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-slate-300 shrink-0" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed line-clamp-2">
                    {repo.description ||
                      'AI/ML, Data Science, and software engineering repository by Suyash Mudgal.'}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800/80 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                    {repo.language || 'Python / JS'}
                  </span>
                  <span>View Repository →</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ==========================================
            10. DEDICATED RESUME CTA BANNER
        ========================================== */}
        <section className="py-12">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="text-xs font-mono uppercase tracking-widest text-sky-400">
                Curriculum Vitae & Academic Dossier
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Want to know more about my experience?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Review my complete educational breakdown, technical skills, internship responsibilities at ITM University, and AI system architectures in a clean, printable format.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setResumeModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-sky-500/20"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </button>
              <button
                type="button"
                onClick={() => setResumeModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-semibold text-sm transition"
              >
                <Eye className="w-4 h-4 text-sky-400" />
                View Resume
              </button>
            </div>
          </div>
        </section>

        {/* ==========================================
            11. CONTACT SECTION
        ========================================== */}
        <section id="contact" className="py-16 border-t border-slate-800/70">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Direct Details */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-sky-400">
                  <MessageSquare className="w-3.5 h-3.5" /> 08 / Get In Touch
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-1">
                  Let&apos;s Build Something Intelligent.
                </h2>
                <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
                  Have an opportunity, project idea, or just want to talk about AI? I&apos;d love
                  to connect.
                </p>
              </div>

              {/* Verified Contact Channels */}
              <div className="space-y-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/40 transition group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-sky-400">
                      <Github className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400">GitHub Profile</div>
                      <div className="text-sm font-semibold text-white group-hover:text-sky-300">
                        github.com/suyashmudgal
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white" />
                </a>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-indigo-400">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400">LinkedIn</div>
                      <div className="text-sm font-semibold text-white">
                        Suyash Mudgal • ITM University, Gwalior
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyGithub}
                    className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy Profile Link
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400">Current Location</div>
                      <div className="text-sm font-semibold text-white">
                        {PERSONAL_INFO.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Message Form */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/75 border border-slate-800">
                <h3 className="text-lg font-bold text-white mb-1">Send a Direct Message</h3>
                <p className="text-xs text-slate-400 mb-6">
                  Fill out the form below to compose a message regarding AI/ML roles, Generative AI internships, or project collaborations.
                </p>

                {contactSubmitted ? (
                  <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                    <h4 className="text-base font-bold text-white">
                      Message Drafted for Suyash Mudgal!
                    </h4>
                    <p className="text-xs text-slate-300 max-w-md mx-auto">
                      Thank you, <span className="text-white font-semibold">{contactForm.name}</span>. Your inquiry regarding{' '}
                      <span className="text-sky-300">{contactForm.subject}</span> has been logged in this session. You can also connect immediately via GitHub.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setContactSubmitted(false);
                        setContactForm({
                          name: '',
                          email: '',
                          subject: 'AI/ML Engineering Opportunity',
                          message: ''
                        });
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-200 hover:bg-slate-700"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setContactSubmitted(true);
                    }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1.5">
                          YOUR NAME *
                        </label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) =>
                            setContactForm({ ...contactForm, name: e.target.value })
                          }
                          placeholder="Recruiter / Engineer Name"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1.5">
                          YOUR EMAIL *
                        </label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) =>
                            setContactForm({ ...contactForm, email: e.target.value })
                          }
                          placeholder="you@company.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        OPPORTUNITY / TOPIC
                      </label>
                      <select
                        value={contactForm.subject}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, subject: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-500"
                      >
                        <option value="AI/ML Engineering Opportunity">
                          AI/ML Engineer Role / Internship
                        </option>
                        <option value="Generative AI / RAG Engineering">
                          Generative AI / RAG Developer Role
                        </option>
                        <option value="Data Science / Analytics Role">
                          Data Science / Data Analyst Opportunity
                        </option>
                        <option value="Open Source / Project Collaboration">
                          Technical Project Collaboration
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        MESSAGE *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={contactForm.message}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, message: e.target.value })
                        }
                        placeholder="Hi Suyash, we were impressed by your DocChat RAG isolation architecture and Multi-Agent Research system..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-sky-500/20"
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ==========================================
          FOOTER
      ========================================== */}
      <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950/90 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">Suyash Mudgal</span>
            <span>•</span>
            <span>AI/ML Engineer | Generative AI Developer | Data Science Student</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition"
            >
              GitHub
            </a>
            <button
              type="button"
              onClick={() => setResumeModalOpen(true)}
              className="hover:text-sky-400 transition"
            >
              Resume
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('home')}
              className="hover:text-sky-400 transition"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </footer>

      {/* ==========================================
          MODALS & INTERACTIVE AI WIDGET
      ========================================== */}
      <ProjectModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
      />

      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      <PortfolioAIAssistant
        onOpenProject={(proj) => setActiveProjectModal(proj)}
      />

      {/* Floating Theme Quick Toggle Switch (Bottom Left) */}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle White or Pure Black theme"
        title="Toggle Theme: Pure OLED Black / Pure White (Shortcut: Press 'T')"
        className={`fixed bottom-5 left-5 z-40 p-3 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center gap-2 group ${
          theme === 'black'
            ? 'border-white/10 bg-zinc-950/90 text-amber-400 hover:border-amber-400/50 shadow-black'
            : 'border-slate-300 bg-white/95 text-indigo-600 hover:border-indigo-400 shadow-slate-300'
        }`}
      >
        {theme === 'black' ? (
          <>
            <Sun className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
            <span className="hidden sm:inline text-xs font-mono font-semibold text-zinc-200">
              White
            </span>
          </>
        ) : (
          <>
            <Moon className="w-4 h-4 group-hover:-rotate-12 transition-transform duration-300" />
            <span className="hidden sm:inline text-xs font-mono font-semibold text-slate-800">
              Pure Black
            </span>
          </>
        )}
      </button>
    </div>
  );
}