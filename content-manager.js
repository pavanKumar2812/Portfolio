// Content Management System for Portfolio
class ContentManager {
    constructor() {
        this.content = {
            poems: [],
            stories: [],
            tutorials: [],
            rewards: []
        };
        this.currentSection = 'home';
    }

    // Load content from JSON files
    async loadContent() {
        try {
            const contentTypes = ['poems', 'stories', 'tutorials', 'rewards'];
            
            for (const type of contentTypes) {
                const response = await fetch(`./content/${type}/content.json`);
                if (response.ok) {
                    this.content[type] = await response.json();
                } else {
                    console.warn(`Could not load ${type} content`);
                }
            }
            
            this.renderNavigation();
            this.renderContent();
        } catch (error) {
            console.error('Error loading content:', error);
        }
    }

    // Render navigation with new sections
    renderNavigation() {
        const nav = document.querySelector('nav .max-w-7xl');
        nav.innerHTML = `
            <div class="flex items-center justify-between h-16">
                <div class="flex items-center">
                    <h1 class="text-2xl font-bold logo-font text-gray-800">Pavan Kumar</h1>
                </div>
                <div class="hidden md:block">
                    <div class="ml-10 flex items-baseline space-x-4">
                        <a href="#home" class="nav-link text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Home</a>
                        <a href="#skills" class="nav-link text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Skills</a>
                        <a href="#projects" class="nav-link text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Projects</a>
                        <a href="#tutorials" class="nav-link text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Tutorials</a>
                        <a href="#poems" class="nav-link text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">తెలుగు కవితలు</a>
                        <a href="#stories" class="nav-link text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">నేతి కథలు</a>
                        <a href="#rewards" class="nav-link text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Rewards</a>
                        <a href="#contact" class="nav-link text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Contact</a>
                    </div>
                </div>
                <div class="md:hidden">
                    <button id="mobile-menu-button" class="text-gray-700 hover:text-blue-600">
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        `;

        // Mobile menu
        document.getElementById('mobile-menu').innerHTML = `
            <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                <a href="#home" class="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium">Home</a>
                <a href="#skills" class="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium">Skills</a>
                <a href="#projects" class="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium">Projects</a>
                <a href="#tutorials" class="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium">Tutorials</a>
                <a href="#poems" class="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium">తెలుగు కవితలు</a>
                <a href="#stories" class="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium">నేతి కథలు</a>
                <a href="#rewards" class="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium">Rewards</a>
                <a href="#contact" class="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium">Contact</a>
            </div>
        `;
    }

    // Render content sections
    renderContent() {
        this.renderTutorials();
        this.renderPoems();
        this.renderStories();
        this.renderRewards();
    }

    // Render tutorials section
    renderTutorials() {
        const tutorialsSection = document.createElement('section');
        tutorialsSection.id = 'tutorials';
        tutorialsSection.className = 'py-16 bg-white';
        
        tutorialsSection.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center">
                    <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Pet Project Tutorials
                    </h2>
                    <p class="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                        Step-by-step guides for building amazing projects
                    </p>
                </div>
                <div class="mt-12 grid gap-8 lg:grid-cols-2">
                    ${this.content.tutorials.map(tutorial => `
                        <div class="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer" onclick="contentManager.showTutorialModal('${tutorial.id}')">
                            <div class="flex items-center justify-between mb-4">
                                <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                    ${tutorial.category}
                                </span>
                                <span class="text-sm text-gray-500">${tutorial.readTime}</span>
                            </div>
                            <h3 class="text-xl font-semibold text-gray-900 mb-2">${tutorial.title}</h3>
                            <p class="text-gray-600 mb-4">${tutorial.description}</p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                ${tutorial.tags.map(tag => `
                                    <span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-200 text-gray-700">
                                        ${tag}
                                    </span>
                                `).join('')}
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-500">${new Date(tutorial.date).toLocaleDateString()}</span>
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
                                    ${tutorial.difficulty === 'beginner' ? 'bg-green-100 text-green-800' : 
                                      tutorial.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' : 
                                      'bg-red-100 text-red-800'}">
                                    ${tutorial.difficulty}
                                </span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.insertSectionAfter(tutorialsSection, 'projects');
    }

    // Render poems section
    renderPoems() {
        const poemsSection = document.createElement('section');
        poemsSection.id = 'poems';
        poemsSection.className = 'py-16 bg-gray-50';
        
        poemsSection.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center">
                    <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        తెలుగు కవితలు
                    </h2>
                    <p class="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                        హృదయపూర్వక భావాలతో రचించిన కవితలు
                    </p>
                </div>
                <div class="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    ${this.content.poems.map(poem => `
                        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer" onclick="contentManager.showPoemModal('${poem.id}')">
                            <h3 class="text-xl font-semibold text-gray-900 mb-3">${poem.title}</h3>
                            <div class="text-gray-600 mb-4 line-clamp-4 whitespace-pre-line">
                                ${poem.content.split('\n').slice(0, 4).join('\n')}${poem.content.split('\n').length > 4 ? '...' : ''}
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                                    ${poem.category}
                                </span>
                                <span class="text-sm text-gray-500">${new Date(poem.date).toLocaleDateString()}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.insertSectionAfter(poemsSection, 'tutorials');
    }

    // Render stories section
    renderStories() {
        const storiesSection = document.createElement('section');
        storiesSection.id = 'stories';
        storiesSection.className = 'py-16 bg-white';
        
        storiesSection.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center">
                    <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        నేతి కథలు
                    </h2>
                    <p class="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                        జ్ఞానవంతమైన కథలు మరియు అనుభవాలు
                    </p>
                </div>
                <div class="mt-12 grid gap-8 lg:grid-cols-2">
                    ${this.content.stories.map(story => `
                        <div class="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer" onclick="contentManager.showStoryModal('${story.id}')">
                            <h3 class="text-xl font-semibold text-gray-900 mb-3">${story.title}</h3>
                            <div class="text-gray-600 mb-4 line-clamp-4">
                                ${story.content.substring(0, 200)}${story.content.length > 200 ? '...' : ''}
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                    ${story.category}
                                </span>
                                <span class="text-sm text-gray-500">${new Date(story.date).toLocaleDateString()}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.insertSectionAfter(storiesSection, 'poems');
    }

    // Render rewards section
    renderRewards() {
        const rewardsSection = document.createElement('section');
        rewardsSection.id = 'rewards';
        rewardsSection.className = 'py-16 bg-gray-50';
        
        rewardsSection.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center">
                    <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Freelancer Rewards & Achievements
                    </h2>
                    <p class="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                        Recognition and awards from Freelancer.in platform
                    </p>
                </div>
                <div class="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    ${this.content.rewards.map(reward => `
                        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                            <div class="text-center">
                                <div class="text-4xl mb-4">${reward.badge}</div>
                                <h3 class="text-xl font-semibold text-gray-900 mb-2">${reward.title}</h3>
                                <p class="text-gray-600 mb-4">${reward.description}</p>
                                <div class="space-y-2">
                                    <div class="flex items-center justify-between">
                                        <span class="text-sm text-gray-500">Platform:</span>
                                        <span class="text-sm font-medium text-blue-600">${reward.platform}</span>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <span class="text-sm text-gray-500">Rating:</span>
                                        <div class="flex items-center">
                                            <span class="text-sm font-medium">${reward.rating}</span>
                                            <div class="ml-1 flex">
                                                ${Array(5).fill().map((_, i) => `
                                                    <svg class="h-4 w-4 ${i < reward.rating ? 'text-yellow-400' : 'text-gray-300'}" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                `).join('')}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <span class="text-sm text-gray-500">Projects:</span>
                                        <span class="text-sm font-medium">${reward.totalProjects}</span>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <span class="text-sm text-gray-500">Date:</span>
                                        <span class="text-sm text-gray-500">${new Date(reward.date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div class="mt-4">
                                    <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                        ${reward.category}
                                    </span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.insertSectionAfter(rewardsSection, 'stories');
    }

    // Helper method to insert section after another section
    insertSectionAfter(newSection, afterSectionId) {
        const afterSection = document.getElementById(afterSectionId);
        if (afterSection) {
            afterSection.parentNode.insertBefore(newSection, afterSection.nextSibling);
        } else {
            // If section doesn't exist, append to body
            document.body.appendChild(newSection);
        }
    }

    // Modal functions
    showTutorialModal(tutorialId) {
        const tutorial = this.content.tutorials.find(t => t.id === tutorialId);
        if (!tutorial) return;

        this.showModal(`
            <div class="max-w-4xl mx-auto">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-bold text-gray-900">${tutorial.title}</h2>
                    <button onclick="contentManager.closeModal()" class="text-gray-400 hover:text-gray-600">
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="prose prose-lg max-w-none">
                    ${this.markdownToHtml(tutorial.content)}
                </div>
            </div>
        `);
    }

    showPoemModal(poemId) {
        const poem = this.content.poems.find(p => p.id === poemId);
        if (!poem) return;

        this.showModal(`
            <div class="max-w-2xl mx-auto text-center">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-bold text-gray-900">${poem.title}</h2>
                    <button onclick="contentManager.closeModal()" class="text-gray-400 hover:text-gray-600">
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="text-lg text-gray-700 whitespace-pre-line leading-relaxed mb-6">
                    ${poem.content}
                </div>
                <div class="flex items-center justify-center space-x-4 text-sm text-gray-500">
                    <span class="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800">
                        ${poem.category}
                    </span>
                    <span>${new Date(poem.date).toLocaleDateString()}</span>
                </div>
            </div>
        `);
    }

    showStoryModal(storyId) {
        const story = this.content.stories.find(s => s.id === storyId);
        if (!story) return;

        this.showModal(`
            <div class="max-w-3xl mx-auto">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-bold text-gray-900">${story.title}</h2>
                    <button onclick="contentManager.closeModal()" class="text-gray-400 hover:text-gray-600">
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                    ${story.content}
                </div>
                <div class="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-500">
                    <span class="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800">
                        ${story.category}
                    </span>
                    <span>${new Date(story.date).toLocaleDateString()}</span>
                </div>
            </div>
        `);
    }

    showModal(content) {
        const modal = document.createElement('div');
        modal.id = 'contentModal';
        modal.className = 'fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50';
        modal.innerHTML = `
            <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white">
                ${content}
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }

    closeModal() {
        const modal = document.getElementById('contentModal');
        if (modal) {
            modal.remove();
        }
    }

    // Simple markdown to HTML converter
    markdownToHtml(markdown) {
        return markdown
            .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
            .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mb-3 mt-6">$1</h2>')
            .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mb-2 mt-4">$1</h3>')
            .replace(/```([^`]+)```/g, '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4"><code>$1</code></pre>')
            .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded">$1</code>')
            .replace(/^\* (.*$)/gm, '<li class="ml-4">$1</li>')
            .replace(/\n\n/g, '</p><p class="mb-4">')
            .replace(/^(?!<[h|l|p|c])/gm, '<p class="mb-4">')
            .replace(/(<li.*<\/li>)/s, '<ul class="list-disc pl-6 mb-4">$1</ul>');
    }
}

// Initialize content manager
const contentManager = new ContentManager();

// Load content when DOM is ready
$(document).ready(function() {
    contentManager.loadContent();
});
