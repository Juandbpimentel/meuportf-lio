export const profile = {
    name: 'Juan Pimentel',
    role: {
        pt: 'Desenvolvedor Full-Stack',
        en: 'Full-Stack Developer',
    },
    location: 'Quixadá, CE',
    phone: '+55 (85) 99740-4333',
    email: 'juandbpimentel@gmail.com',
    social: {
        github: 'https://github.com/Juandbpimentel',
        linkedin: 'https://www.linkedin.com/in/juan-pimentel-3b6a67221/',
    },
    summary: {
        pt: 'Engenheiro de Software em formação (UFC) e Backend Java no Insight Data Science Lab. Foco em arquiteturas robustas e escaláveis com Java/Spring, integração de IA e IoT, e desenvolvimento de soluções orientadas a dados.',
        en: 'Software Engineer in training (UFC) and Java Backend at Insight Data Science Lab. Focused on robust, scalable architectures with Java/Spring, AI + IoT integrations, and data-driven solutions.',
    },
}

export const skills = [
    {
        enabled: true,
        category: { pt: 'Backend & Arquitetura', en: 'Backend & Architecture' },
        techs: ['Java (Spring Boot)', 'Kotlin', 'Node.js (Nest/Express)', 'Microsserviços', 'OpenAPI/Swagger', 'Testes (JUnit/Jest)'],
    },
    {
        enabled: true,
        category: { pt: 'Dados, IA & APIs', en: 'Data, AI & APIs' },
        techs: ['Python (FastAPI)', 'Pandas/Scikit-learn', 'PyTorch', 'YOLO (CV)', 'LangChain/Gemini', 'ETL Pipelines'],
    },
    {
        enabled: true,
        category: { pt: 'Front-end & Mobile', en: 'Front-end & Mobile' },
        techs: ['TypeScript', 'React/Next.js', 'React Native (Expo)', 'Vue.js', 'Tailwind CSS', 'Bootstrap 5'],
    },
    {
        enabled: true,
        category: { pt: 'Infra, DevOps & Dados', en: 'Infra, DevOps & Data' },
        techs: ['Docker', 'GCP', 'PostgreSQL', 'MongoDB', 'Redis', 'GitHub Actions'],
    },
]

export const experience = [
    {
        enabled: true,
        company: 'Insight Data Science Lab',
        role: { pt: 'Desenvolvedor Backend', en: 'Backend Developer' },
        period: '07/2024 - Atual',
        description: {
            pt: 'APIs REST com Spring Boot, PostgreSQL e integrações Keycloak/MinIO; testes JUnit, CI/CD com Docker; documentação OpenAPI. Paper premiado (Best Paper SBSI 2025).',
            en: 'REST APIs with Spring Boot, PostgreSQL, Keycloak/MinIO integrations; JUnit tests, Docker-based CI/CD; OpenAPI docs. Team paper awarded Best Paper at SBSI 2025.',
        },
    },
    {
        enabled: true,
        company: 'Mokai Comics',
        role: { pt: 'Desenvolvedor Mobile', en: 'Mobile Developer' },
        period: '04/2024 - 07/2024',
        description: {
            pt: 'MVP mobile com React Native (Expo), UI responsiva com Tailwind, navegação com React Navigation, integração com APIs REST e gestão de estado.',
            en: 'Mobile MVP with React Native (Expo), responsive UI with Tailwind, React Navigation, REST API integration, and state management.',
        },
    },
    {
        enabled: true,
        company: 'Sampaio do Nascimento Advogados',
        role: { pt: 'Desenvolvedor Web', en: 'Web Developer' },
        period: '07/2023 - 08/2023',
        description: {
            pt: 'Reestruturação do site com HTML5/CSS3/ES6+, migração para Bootstrap 5, formulários SMTP (Nodemailer) e otimizações de performance/acessibilidade (WCAG 2.1).',
            en: 'Site overhaul with HTML5/CSS3/ES6+, migration to Bootstrap 5, SMTP forms (Nodemailer), and performance/accessibility tuning (WCAG 2.1).',
        },
    },
    {
        enabled: true,
        company: 'INOVE UFC Quixadá',
        role: { pt: 'Desenvolvedor Full-Stack', en: 'Full-Stack Developer' },
        period: '04/2022 - 04/2024',
        description: {
            pt: 'Soluções full-stack com React/Next.js e Node.js/Express (TypeScript); modelagem de dados com Prisma/Mongoose; Docker, JWT/Firebase; atuação como líder técnico em projetos institucionais.',
            en: 'Full-stack solutions with React/Next.js and Node.js/Express (TypeScript); data modeling with Prisma/Mongoose; Docker and JWT/Firebase; served as tech lead on institutional projects.',
        },
    },
]

export const projects = [
    {
        enabled: true,
        id: 'pdf-microservice',
        title: 'Microserviço de Geração de PDF',
        type: { pt: 'API Interativa', en: 'Interactive API' },
        description: {
            pt: 'API isolada para geração de PDFs via templates JSON, com documentação OpenAPI e deploy na Render.',
            en: 'Isolated API that generates PDFs from JSON templates, OpenAPI documented and deployed on Render.',
        },
        techs: ['Java', 'Spring Boot', 'Render'],
        repoUrl: 'https://github.com/Juandbpimentel/pdf-microservice',
        isInteractive: true,
        apiConfig: {
            baseUrl: 'https://pdf-microservice-6m30.onrender.com',
            placeholder: '/docs',
            healthPath: '/health',
            method: 'GET' as const,
            note: 'Endpoint de Health Check/Docs. A geração de PDF requer POST (ver doc).',
        },
        endpoints: [
            {
                method: 'GET',
                path: '/health',
                description: {
                    pt: 'Health check da API.',
                    en: 'API health check.',
                },
                docsUrl: '/docs',
            },
            {
                method: 'POST',
                path: '/generate-pdf',
                description: {
                    pt: 'Gera PDF a partir de template JSON/Handlebars.',
                    en: 'Generates PDF from a JSON/Handlebars template.',
                },
                docsUrl: '/docs',
                sampleBody: {
                    templateName: 'builder',
                    fileName: 'meu-documento-customizado.pdf',
                    data: {
                        layout: {
                            margemCima: 20,
                            margemBaixo: 20,
                            margemEsquerda: 20,
                            margemDireita: 20,
                        },
                        secoes: [
                            {
                                componente: 'texto',
                                conteudo: '<h1>Relatório Dinâmico</h1><p>Gerado via API Builder.</p>',
                                alinhamento: 'center',
                            },
                            {
                                componente: 'grafico',
                                config: {
                                    type: 'bar',
                                    data: {
                                        labels: ['Jan', 'Fev', 'Mar'],
                                        datasets: [
                                            {
                                                label: 'Vendas',
                                                data: [12, 19, 3],
                                                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                                            },
                                        ],
                                    },
                                },
                            },
                        ],
                    },
                },
            },
        ],
    },
    {
        enabled: true,
        id: 'ia-amiga',
        title: 'RAG Universitário (Gemini)',
        type: { pt: 'Solução de IA', en: 'AI Solution' },
        description: {
            pt: 'Chatbot RAG usando Google Gemini API e LangChain para dúvidas acadêmicas, backend Python e UI Next.js.',
            en: 'RAG chatbot using Google Gemini API and LangChain for academic Q&A, Python backend with a Next.js UI.',
        },
        techs: ['Python', 'LangChain', 'Gemini API', 'Next.js'],
        repoUrl: 'https://github.com/Juandbpimentel/projeto-ia-amiga-do-estudante',
        isInteractive: true,
        apiConfig: {
            baseUrl: 'https://projeto-ia-amiga-do-estudante.onrender.com',
            placeholder: '/docs',
            healthPath: '/health',
            method: 'GET' as const,
            note: 'Backend Python com FastAPI/Flask.',
        },
        endpoints: [
            {
                method: 'GET',
                path: '/health',
                description: {
                    pt: 'Health check do backend.',
                    en: 'Backend health check.',
                },
                docsUrl: '/docs',
            },
            {
                method: 'GET',
                path: '/docs',
                description: {
                    pt: 'Documentação Swagger/OpenAPI.',
                    en: 'Swagger/OpenAPI docs.',
                },
            },
            {
                method: 'POST',
                path: '/start-chat',
                description: {
                    pt: 'Inicia uma sessão e retorna o session_id.',
                    en: 'Starts a session and returns the session_id.',
                },
                docsUrl: '/docs',
            },
            {
                method: 'POST',
                path: '/chat/{session_id}',
                description: {
                    pt: 'Envia mensagem para a sessão existente.',
                    en: 'Sends a message to an existing session.',
                },
                docsUrl: '/docs',
                pathParams: [{ name: 'session_id', placeholder: 'abc123' }],
                sampleBody: {
                    message: 'Como funciona a automação de matrícula?',
                },
            },
        ],
    },
    {
        enabled: true,
        id: 'constrular',
        title: 'Constrular',
        type: { pt: 'Full-Stack SaaS', en: 'Full-Stack SaaS' },
        description: {
            pt: 'Sistema de gestão para loja de materiais de construção com autenticação, estoque e vendas, focado em qualidade e CI/CD.',
            en: 'Management system for a construction supply store with auth, inventory, and sales, built with quality gates and CI/CD.',
        },
        techs: ['Java Spring Boot', 'Next.js', 'PostgreSQL', 'Docker'],
        repoUrl: 'https://github.com/Juandbpimentel',
        isInteractive: false,
    },
    {
        enabled: true,
        id: 'iot-game',
        title: 'IoT Game Colors',
        type: { pt: 'Case AI + IoT', en: 'AI + IoT Case' },
        description: {
            pt: 'Visão computacional (YOLO) acionando dispositivos IoT via Home Assistant conforme eventos do jogo em tempo real.',
            en: 'Computer vision (YOLO) triggers IoT devices through Home Assistant based on real-time game events.',
        },
        techs: ['YOLO v12', 'Home Assistant', 'Python'],
        repoUrl: 'https://github.com/Juandbpimentel',
        isInteractive: false,
    },
    {
        enabled: true,
        id: 'insight-challenge',
        title: 'Insight Full-Stack Challenge',
        type: { pt: 'Desafio Cloud', en: 'Cloud Challenge' },
        description: {
            pt: 'Solução full-stack no GCP com Compute Engine, Nginx e Docker; backend Java Spring, MongoDB e frontend Next.js.',
            en: 'Full-stack solution on GCP with Compute Engine, Nginx, and Docker; Java Spring backend, MongoDB, and Next.js frontend.',
        },
        techs: ['Java Spring', 'MongoDB', 'Next.js', 'Docker', 'Nginx', 'GCP'],
        repoUrl: 'https://github.com/Juandbpimentel',
        isInteractive: false,
    },
]

export const education = [
    {
        enabled: true,
        institution: 'Universidade Federal do Ceará (UFC)',
        degree: { pt: 'Bacharelado em Engenharia de Software', en: 'B.Sc. Software Engineering' },
        period: '2023 - 2026 (Previsão)',
    },
    {
        enabled: true,
        institution: 'Universidade Federal do Ceará (UFC)',
        degree: { pt: 'Engenharia da Computação (incompleto)', en: 'Computer Engineering (incomplete)' },
        period: '2019 - 2023',
    },
]

export const certifications = [
    {
        enabled: true,
        name: { pt: 'Fundamentals of Deep Learning — NVIDIA DLI', en: 'Fundamentals of Deep Learning — NVIDIA DLI' },
        issuer: 'NVIDIA Deep Learning Institute',
        focus: { pt: 'Redes neurais, treinamento de modelos e transferência de aprendizado usando PyTorch.', en: 'Neural networks, model training, and transfer learning with PyTorch.' },
    },
    {
        enabled: true,
        name: { pt: 'Voxy Proficiency Achievement — Intermediário', en: 'Voxy Proficiency Achievement — Intermediate' },
        issuer: 'Voxy',
        focus: { pt: 'Proficiência intermediária em inglês para comunicação técnica e profissional.', en: 'Intermediate English proficiency for technical and professional communication.' },
    },
]

export const languages = ['pt', 'en']

export const avatarPath = '/avatar.jpeg'
