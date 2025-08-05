// Portfolio App - Main JavaScript File
class PortfolioApp {
    constructor() {
        this.currentPage = 'home';
        this.content = {
            tutorials: [],
            poems: [],
            stories: [],
            rewards: []
        };
        this.isLoading = false;
        this.init();
    }

    async init() {
        this.showLoadingScreen();
        await this.loadContent();
        this.initializeComponents();
        this.setupEventListeners();
        this.initializeAnimations();
        this.hideLoadingScreen();
    }

    // Loading Screen Management
    showLoadingScreen() {
        document.getElementById('loading-screen').style.display = 'flex';
    }

    hideLoadingScreen() {
        setTimeout(() => {
            document.getElementById('loading-screen').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('loading-screen').style.display = 'none';
            }, 500);
        }, 1500);
    }

    // Content Loading
    async loadContent() {
        const contentTypes = ['tutorials', 'poems', 'stories', 'rewards'];
        
        for (const type of contentTypes) {
            try {
                const response = await fetch(`./content/${type}/content.json`);
                if (response.ok) {
                    this.content[type] = await response.json();
                } else {
                    console.warn(`Could not load ${type} content`);
                }
            } catch (error) {
                console.error(`Error loading ${type} content:`, error);
            }
        }
    }

    // Initialize Components
    initializeComponents() {
        this.initTypedText();
        this.initAOS();
        this.createParticleBackground();
    }

    // Typed Text Effect
    initTypedText() {
        if (typeof Typed !== 'undefined') {
            new Typed('#typed-text', {
                strings: [
                    'AI/ML Engineer',
                    'Computer Vision Specialist',
                    'Full Stack Developer',
                    'Telugu Poet',
                    'Story Teller',
                    'Problem Solver'
                ],
                typeSpeed: 100,
                backSpeed: 50,
                backDelay: 2000,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
        }
    }

    // Initialize AOS (Animate On Scroll)
    initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-out-cubic',
                once: true,
                offset: 100
            });
        }
    }

    // Create Particle Background
    createParticleBackground() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    // Event Listeners
    setupEventListeners() {
        // Navigation
        this.setupNavigation();
        
        // Mobile menu
        this.setupMobileMenu();
        
        // Smooth scrolling
        this.setupSmoothScrolling();
        
        // Modal close on outside click
        this.setupModalHandlers();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href').substring(1);
                this.navigateTo(target);
            });
        });
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupModalHandlers() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    // Navigation and Page Management
    navigateTo(page) {
        this.currentPage = page;
        this.updateActiveNavLink(page);
        
        if (page === 'home' || page === 'about') {
            this.scrollToSection(page);
        } else {
            this.loadPage(page);
        }
    }

    updateActiveNavLink(page) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('text-purple-400');
            if (link.getAttribute('href') === `#${page}`) {
                link.classList.add('text-purple-400');
            }
        });
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    loadPage(page) {
        const pageContent = document.getElementById('page-content');
        pageContent.innerHTML = '';
        
        switch (page) {
            case 'projects':
                this.loadProjectsPage();
                break;
            case 'tutorials':
                this.loadTutorialsPage();
                break;
            case 'poetry':
                this.loadPoetryPage();
                break;
            case 'stories':
                this.loadStoriesPage();
                break;
            case 'achievements':
                this.loadAchievementsPage();
                break;
            case 'contact':
                this.loadContactPage();
                break;
        }
        
        pageContent.scrollIntoView({ behavior: 'smooth' });
    }

    // Page Loaders
    loadProjectsPage() {
        const pageContent = document.getElementById('page-content');
        pageContent.innerHTML = `
            <section class="content-page py-20">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-16" data-aos="fade-up">
                        <h2 class="text-4xl md:text-5xl font-bold mb-4 gradient-text">My Projects</h2>
                        <p class="text-xl text-gray-300 max-w-3xl mx-auto">
                            Innovative solutions crafted with cutting-edge technology
                        </p>
                        <div class="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-600 mx-auto mt-6"></div>
                    </div>
                    
                    <div class="content-grid">
                        ${this.generateProjectCards()}
                    </div>
                </div>
            </section>
        `;
    }

    generateProjectCards() {
        const projects = [
            {
                title: "AI Job Assistant",
                description: "End-to-end tool to scrape LinkedIn job posts, analyze job market trends visually, and auto-generate resumes & cover letters using Mistral-7B.",
                video: "./videos/ResumeRAG_HuggingFaceLangchain.mp4",
                github: "https://github.com/pavanKumar2812/langchain/tree/main/ResumeRAG",
                linkedin: "https://www.linkedin.com/feed/update/urn:li:activity:7314263439281995776/",
                tags: ["AI", "LLM", "Streamlit", "LangChain", "Python"],
                gradient: "from-blue-500 to-purple-600"
            },
            {
                title: "Gen Cartoon",
                description: "Real-time image & video cartoonizer using GANs. Upload a pic or go live with your camera and watch the cartoon magic unfold!",
                video: "./videos/GenCartoon_Demo.mp4",
                github: "https://github.com/pavanKumar2812/CartoonGAN-Web-App",
                linkedin: "https://www.linkedin.com/feed/update/urn:li:activity:7271067962013302784/",
                tags: ["GAN", "DeepLearning", "OpenCV", "TensorFlow", "Flask"],
                gradient: "from-green-500 to-blue-600"
            },
            {
                title: "Formula Generator",
                description: "Converts user-provided descriptions into LaTeX-rendered formula images using a Flask backend and jQuery frontend.",
                video: "./videos/FormulaGenerator_Demo.mp4",
                github: "https://github.com/pavanKumar2812/FormulaGenWebApp",
                linkedin: "https://www.linkedin.com/feed/update/urn:li:activity:7271776744863379457/",
                tags: ["Flask", "jQuery", "LaTeX", "OpenAI", "Bootstrap"],
                gradient: "from-purple-500 to-pink-600"
            },
            {
                title: "PDF Query Application",
                description: "A natural language-powered tool to query and interact with uploaded PDFs using LangChain, FAISS, and Ollama Embeddings.",
                video: "./videos/PDFQuery_Demo.mp4",
                github: "https://github.com/pavanKumar2812/langchain/tree/main/PDFQueryApp",
                tags: ["AI", "LangChain", "RAG", "Streamlit", "NLP"],
                gradient: "from-red-500 to-orange-600"
            },
            {
                title: "Easy PDF Craft",
                description: "A web application offering tools to Merge, Split, Compress, and Remove pages from PDF files.",
                website: "https://easypdfcraft.onrender.com/",
                tags: ["WebDev", "PDF", "Python", "Tools"],
                gradient: "from-yellow-500 to-red-600",
                images: [
                    "images/EasyPDFCraft_mainpage.png",
                    "images/EasyPDFCraft_compresspdf.png",
                    "images/EasyPDFCraft_mergepdf.png"
                ]
            },
            {
                title: "VisionAI",
                description: "A Flask-based web application for real-time video processing, integrating OpenCV and YOLO for object detection and various video modes.",
                github: "https://github.com/pavanKumar2812/VisionAI-WebSite/tree/main",
                linkedin: "https://www.linkedin.com/feed/update/urn:li:activity:7271036165330247680/",
                tags: ["OpenCV", "YOLO", "ComputerVision", "Flask"],
                gradient: "from-indigo-500 to-purple-600",
                images: [
                    "images/OpenCV_HSV.jpg",
                    "images/OpenCV_ROI.jpg",
                    "images/OpenCV_FaceDetection.jpg"
                ]
            }
        ];

        return projects.map(project => `
            <div class="project-card glass-card group" data-aos="fade-up">
                <div class="relative mb-6 overflow-hidden rounded-lg">
                    ${project.video ? `
                        <video class="w-full h-48 object-cover cursor-pointer rounded-lg transition-transform duration-300 group-hover:scale-105" 
                               onclick="portfolioApp.openVideoModal('${project.video}')" 
                               muted autoplay loop playsinline>
                            <source src="${project.video}" type="video/mp4">
                        </video>
                    ` : project.images ? `
                        <div class="relative h-48 bg-gradient-to-r ${project.gradient} rounded-lg flex items-center justify-center">
                            <img src="${project.images[0]}" alt="${project.title}" class="w-full h-full object-cover rounded-lg">
                        </div>
                    ` : `
                        <div class="h-48 bg-gradient-to-r ${project.gradient} rounded-lg flex items-center justify-center">
                            <i class="fas fa-code text-4xl text-white"></i>
                        </div>
                    `}
                </div>
                
                <h3 class="text-xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">
                    ${project.title}
                </h3>
                
                <p class="text-gray-300 mb-4 leading-relaxed">
                    ${project.description}
                </p>
                
                <div class="flex flex-wrap gap-2 mb-6">
                    ${project.tags.map(tag => `
                        <span class="tag">${tag}</span>
                    `).join('')}
                </div>
                
                <div class="flex space-x-4">
                    ${project.github ? `
                        <a href="${project.github}" target="_blank" 
                           class="text-purple-400 hover:text-purple-300 transition-colors">
                            <i class="fab fa-github mr-1"></i> GitHub
                        </a>
                    ` : ''}
                    ${project.website ? `
                        <a href="${project.website}" target="_blank" 
                           class="text-blue-400 hover:text-blue-300 transition-colors">
                            <i class="fas fa-external-link-alt mr-1"></i> Live Demo
                        </a>
                    ` : ''}
                    ${project.linkedin ? `
                        <a href="${project.linkedin}" target="_blank" 
                           class="text-blue-400 hover:text-blue-300 transition-colors">
                            <i class="fab fa-linkedin mr-1"></i> Post
                        </a>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    loadTutorialsPage() {
        const pageContent = document.getElementById('page-content');
        pageContent.innerHTML = `
            <section class="content-page py-20">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-16" data-aos="fade-up">
                        <h2 class="text-4xl md:text-5xl font-bold mb-4 gradient-text">Pet Project Tutorials</h2>
                        <p class="text-xl text-gray-300 max-w-3xl mx-auto">
                            Step-by-step guides to build amazing projects from scratch
                        </p>
                        <div class="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-600 mx-auto mt-6"></div>
                    </div>
                    
                    <div class="content-grid">
                        ${this.content.tutorials.map(tutorial => `
                            <div class="content-card cursor-pointer" data-aos="fade-up" 
                                 onclick="portfolioApp.openTutorialModal('${tutorial.id}')">
                                <div class="flex items-center justify-between mb-4">
                                    <span class="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-medium">
                                        ${tutorial.category}
                                    </span>
                                    <span class="text-gray-400 text-sm">${tutorial.readTime}</span>
                                </div>
                                
                                <h3 class="text-xl font-bold mb-3 text-white hover:text-purple-400 transition-colors">
                                    ${tutorial.title}
                                </h3>
                                
                                <p class="text-gray-300 mb-4 leading-relaxed">
                                    ${tutorial.description}
                                </p>
                                
                                <div class="flex flex-wrap gap-2 mb-4">
                                    ${tutorial.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                                </div>
                                
                                <div class="flex items-center justify-between">
                                    <span class="text-gray-400 text-sm">${new Date(tutorial.date).toLocaleDateString()}</span>
                                    <span class="px-2 py-1 rounded-full text-xs font-medium
                                        ${tutorial.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' : 
                                          tutorial.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' : 
                                          'bg-red-500/20 text-red-400'}">
                                        ${tutorial.difficulty}
                                    </span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    loadPoetryPage() {
        const pageContent = document.getElementById('page-content');
        pageContent.innerHTML = `
            <section class="content-page py-20">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-16" data-aos="fade-up">
                        <h2 class="text-4xl md:text-5xl font-bold mb-4 gradient-text">తెలుగు కవితలు</h2>
                        <p class="text-xl text-gray-300 max-w-3xl mx-auto">
                            హృదయపూర్వక భావాలతో రచించిన కవితలు
                        </p>
                        <div class="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-600 mx-auto mt-6"></div>
                    </div>
                    
                    <div class="content-grid">
                        ${this.content.poems.map(poem => `
                            <div class="content-card cursor-pointer" data-aos="fade-up" 
                                 onclick="portfolioApp.openPoemModal('${poem.id}')">
                                <h3 class="text-xl font-bold mb-4 text-white hover:text-purple-400 transition-colors telugu-text">
                                    ${poem.title}
                                </h3>
                                
                                <div class="text-gray-300 mb-4 telugu-text leading-relaxed">
                                    ${poem.content.split('\\n').slice(0, 4).join('<br>')}${poem.content.split('\\n').length > 4 ? '...' : ''}
                                </div>
                                
                                <div class="flex items-center justify-between">
                                    <span class="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full text-sm font-medium">
                                        ${poem.category}
                                    </span>
                                    <span class="text-gray-400 text-sm">${new Date(poem.date).toLocaleDateString()}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    loadStoriesPage() {
        const pageContent = document.getElementById('page-content');
        pageContent.innerHTML = `
            <section class="content-page py-20">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-16" data-aos="fade-up">
                        <h2 class="text-4xl md:text-5xl font-bold mb-4 gradient-text">నేతి కథలు</h2>
                        <p class="text-xl text-gray-300 max-w-3xl mx-auto">
                            జ్ఞానవంతమైన కథలు మరియు అనుభవాలు
                        </p>
                        <div class="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-600 mx-auto mt-6"></div>
                    </div>
                    
                    <div class="content-grid">
                        ${this.content.stories.map(story => `
                            <div class="content-card cursor-pointer" data-aos="fade-up" 
                                 onclick="portfolioApp.openStoryModal('${story.id}')">
                                <h3 class="text-xl font-bold mb-4 text-white hover:text-purple-400 transition-colors telugu-text">
                                    ${story.title}
                                </h3>
                                
                                <div class="text-gray-300 mb-4 telugu-text leading-relaxed">
                                    ${story.content.substring(0, 200)}${story.content.length > 200 ? '...' : ''}
                                </div>
                                
                                <div class="flex items-center justify-between">
                                    <span class="px-3 py-1 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-full text-sm font-medium">
                                        ${story.category}
                                    </span>
                                    <span class="text-gray-400 text-sm">${new Date(story.date).toLocaleDateString()}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    loadAchievementsPage() {
        const pageContent = document.getElementById('page-content');
        pageContent.innerHTML = `
            <section class="content-page py-20">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-16" data-aos="fade-up">
                        <h2 class="text-4xl md:text-5xl font-bold mb-4 gradient-text">Achievements & Rewards</h2>
                        <p class="text-xl text-gray-300 max-w-3xl mx-auto">
                            Recognition and milestones in my professional journey
                        </p>
                        <div class="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-600 mx-auto mt-6"></div>
                    </div>
                    
                    <!-- Freelancer Rewards -->
                    <div class="mb-16">
                        <h3 class="text-2xl font-bold mb-8 text-center text-purple-400">Freelancer.in Rewards</h3>
                        <div class="content-grid">
                            ${this.content.rewards.map(reward => `
                                <div class="achievement-card glass-card text-center" data-aos="fade-up">
                                    <div class="text-4xl mb-4">${reward.badge}</div>
                                    <h4 class="text-xl font-bold mb-3 text-white">${reward.title}</h4>
                                    <p class="text-gray-300 mb-4">${reward.description}</p>
                                    
                                    <div class="space-y-2 mb-4">
                                        <div class="flex justify-between">
                                            <span class="text-gray-400">Platform:</span>
                                            <span class="text-purple-400 font-medium">${reward.platform}</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-gray-400">Rating:</span>
                                            <div class="flex items-center">
                                                <span class="text-yellow-400 mr-2">${reward.rating}</span>
                                                ${Array(5).fill().map((_, i) => `
                                                    <i class="fas fa-star text-sm ${i < reward.rating ? 'text-yellow-400' : 'text-gray-600'}"></i>
                                                `).join('')}
                                            </div>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-gray-400">Projects:</span>
                                            <span class="text-white font-medium">${reward.totalProjects}</span>
                                        </div>
                                    </div>
                                    
                                    <div class="flex justify-between items-center">
                                        <span class="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm">
                                            ${reward.category}
                                        </span>
                                        <span class="text-gray-400 text-sm">${new Date(reward.date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- Certifications -->
                    <div>
                        <h3 class="text-2xl font-bold mb-8 text-center text-purple-400">Certifications</h3>
                        <div class="content-grid">
                            ${this.generateCertifications()}
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    generateCertifications() {
        const certifications = [
            {
                title: "IBM AI Engineering Professional Certificate (V2)",
                issuer: "IBM via Coursera",
                url: "https://www.credly.com/badges/284d8ee7-213b-4c14-bf62-f4ce6eb30336/public_url",
                icon: "fab fa-aws",
                color: "text-blue-400"
            },
            {
                title: "Google Cloud Platform Certified Associate Cloud Engineer",
                issuer: "Google Cloud",
                url: "https://www.credly.com/badges/bc782115-c268-4683-b602-3cf665196187/public_url",
                icon: "fab fa-google",
                color: "text-red-400"
            },
            {
                title: "AWS Cloud Practitioner",
                issuer: "Amazon Web Services",
                url: "https://www.credly.com/badges/3d0b1090-67d6-4b62-978c-4b500c8f42a7/public_url",
                icon: "fab fa-aws",
                color: "text-orange-400"
            },
            {
                title: "Microsoft Azure Fundamentals",
                issuer: "Microsoft Azure",
                url: "https://www.credly.com/badges/e4ddf1d6-0115-40ba-8a9a-e3eb4a9157a2/public_url",
                icon: "fab fa-microsoft",
                color: "text-blue-400"
            },
            {
                title: "Microsoft Azure Data Fundamentals",
                issuer: "Microsoft Azure",
                url: "https://www.credly.com/badges/cf309f69-96ee-45b5-a417-4e3596212df5/public_url",
                icon: "fab fa-microsoft",
                color: "text-blue-400"
            },
            {
                title: "Microsoft Azure AI Fundamentals",
                issuer: "Microsoft Azure",
                url: "https://www.credly.com/badges/1c0c1abe-2c32-48dc-87f5-f1ed82a8bdc1/public_url",
                icon: "fab fa-microsoft",
                color: "text-blue-400"
            }
        ];

        return certifications.map(cert => `
            <a href="${cert.url}" target="_blank" class="achievement-card glass-card hover-lift" data-aos="fade-up">
                <div class="flex items-start space-x-4">
                    <i class="${cert.icon} text-3xl ${cert.color}"></i>
                    <div class="flex-1">
                        <h4 class="font-bold text-white mb-2">${cert.title}</h4>
                        <p class="text-gray-400 text-sm">${cert.issuer}</p>
                    </div>
                    <i class="fas fa-external-link-alt text-purple-400"></i>
                </div>
            </a>
        `).join('');
    }

    loadContactPage() {
        const pageContent = document.getElementById('page-content');
        pageContent.innerHTML = `
            <section class="content-page py-20">
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-16" data-aos="fade-up">
                        <h2 class="text-4xl md:text-5xl font-bold mb-4 gradient-text">Let's Connect</h2>
                        <p class="text-xl text-gray-300 max-w-3xl mx-auto">
                            Ready to bring your ideas to life? Let's create something amazing together!
                        </p>
                        <div class="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-600 mx-auto mt-6"></div>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div data-aos="fade-right">
                            <h3 class="text-2xl font-bold mb-6 text-purple-400">Get In Touch</h3>
                            <div class="space-y-4">
                                <a href="mailto:adinanipavankumar@gmail.com" class="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors p-3 rounded-lg hover:bg-white/5">
                                    <i class="fas fa-envelope text-purple-400 text-xl"></i>
                                    <span>adinanipavankumar@gmail.com</span>
                                </a>
                                <a href="tel:+918179090163" class="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors p-3 rounded-lg hover:bg-white/5">
                                    <i class="fas fa-phone text-purple-400 text-xl"></i>
                                    <span>+91 8179090163</span>
                                </a>
                                <a href="https://github.com/pavanKumar2812" target="_blank" class="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors p-3 rounded-lg hover:bg-white/5">
                                    <i class="fab fa-github text-purple-400 text-xl"></i>
                                    <span>github.com/pavanKumar2812</span>
                                </a>
                                <a href="https://www.linkedin.com/in/pavan-kumar-adinani-924272232/" target="_blank" class="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors p-3 rounded-lg hover:bg-white/5">
                                    <i class="fab fa-linkedin text-purple-400 text-xl"></i>
                                    <span>LinkedIn Profile</span>
                                </a>
                            </div>
                        </div>
                        
                        <div data-aos="fade-left">
                            <div class="glass-card p-8">
                                <h3 class="text-2xl font-bold mb-6 text-white">Quick Message</h3>
                                <form class="space-y-4">
                                    <div>
                                        <input type="text" placeholder="Your Name" class="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400">
                                    </div>
                                    <div>
                                        <input type="email" placeholder="Your Email" class="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400">
                                    </div>
                                    <div>
                                        <textarea rows="4" placeholder="Your Message" class="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 resize-none"></textarea>
                                    </div>
                                    <button type="submit" class="w-full btn-primary">
                                        <i class="fas fa-paper-plane mr-2"></i>
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    // Modal Functions
    openVideoModal(videoPath) {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content max-w-4xl">
                <button class="modal-close" onclick="portfolioApp.closeModal()">&times;</button>
                <video class="w-full rounded-lg" autoplay controls>
                    <source src="${videoPath}" type="video/mp4">
                </video>
            </div>
        `;
        document.body.appendChild(modal);
    }

    openTutorialModal(tutorialId) {
        const tutorial = this.content.tutorials.find(t => t.id === tutorialId);
        if (!tutorial) return;

        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content max-w-4xl">
                <button class="modal-close" onclick="portfolioApp.closeModal()">&times;</button>
                <div class="prose prose-invert max-w-none">
                    <h1 class="gradient-text">${tutorial.title}</h1>
                    <div class="flex items-center space-x-4 mb-6 text-sm text-gray-400">
                        <span>📅 ${new Date(tutorial.date).toLocaleDateString()}</span>
                        <span>⏱️ ${tutorial.readTime}</span>
                        <span class="px-2 py-1 bg-purple-500/20 text-purple-400 rounded">${tutorial.difficulty}</span>
                    </div>
                    <div class="tutorial-content">
                        ${this.markdownToHtml(tutorial.content)}
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    openPoemModal(poemId) {
        const poem = this.content.poems.find(p => p.id === poemId);
        if (!poem) return;

        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content max-w-2xl text-center">
                <button class="modal-close" onclick="portfolioApp.closeModal()">&times;</button>
                <h1 class="text-3xl font-bold gradient-text mb-6 telugu-text">${poem.title}</h1>
                <div class="text-lg text-gray-300 telugu-text leading-relaxed mb-6 whitespace-pre-line">
                    ${poem.content}
                </div>
                <div class="flex items-center justify-center space-x-4 text-sm text-gray-400">
                    <span class="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full">${poem.category}</span>
                    <span>📅 ${new Date(poem.date).toLocaleDateString()}</span>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    openStoryModal(storyId) {
        const story = this.content.stories.find(s => s.id === storyId);
        if (!story) return;

        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content max-w-3xl">
                <button class="modal-close" onclick="portfolioApp.closeModal()">&times;</button>
                <h1 class="text-3xl font-bold gradient-text mb-6 telugu-text">${story.title}</h1>
                <div class="text-lg text-gray-300 telugu-text leading-relaxed whitespace-pre-line mb-6">
                    ${story.content}
                </div>
                <div class="flex items-center justify-center space-x-4 text-sm text-gray-400">
                    <span class="px-3 py-1 bg-green-500/20 text-green-400 rounded-full">${story.category}</span>
                    <span>📅 ${new Date(story.date).toLocaleDateString()}</span>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    closeModal() {
        const modal = document.querySelector('.modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
    }

    // Utility Functions
    markdownToHtml(markdown) {
        return markdown
            .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-4 text-white">$1</h1>')
            .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mb-3 mt-6 text-purple-400">$1</h2>')
            .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mb-2 mt-4 text-white">$1</h3>')
            .replace(/```([^`]+)```/g, '<div class="code-block"><pre><code>$1</code></pre></div>')
            .replace(/`([^`]+)`/g, '<code class="bg-gray-800 px-2 py-1 rounded text-purple-300">$1</code>')
            .replace(/^\* (.*$)/gm, '<li class="ml-4 text-gray-300">$1</li>')
            .replace(/\n\n/g, '</p><p class="mb-4 text-gray-300">')
            .replace(/^(?!<[h|l|p|d])/gm, '<p class="mb-4 text-gray-300">')
            .replace(/(<li.*<\/li>)/s, '<ul class="list-disc pl-6 mb-4">$1</ul>');
    }

    // Initialize animations
    initializeAnimations() {
        // Add entrance animations to existing elements
        document.querySelectorAll('section').forEach((section, index) => {
            section.style.animationDelay = `${index * 0.1}s`;
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioApp = new PortfolioApp();
});
