# Modern Portfolio Website

A modern, responsive portfolio website featuring dynamic content management for tutorials, Telugu poems, stories, and freelancer rewards.

## Features

### 🚀 Modern Design
- **Mobile-responsive** design with Tailwind CSS
- **Dark/light mode** support
- **Smooth animations** and transitions
- **Professional layout** with modern typography

### 📝 Dynamic Content Management
- **Pet Project Tutorials** - Step-by-step coding guides
- **తెలుగు కవితలు (Telugu Poems)** - Personal poetry collection
- **నేతి కథలు (Stories)** - Wisdom stories and experiences  
- **Freelancer Rewards** - Achievements and ratings from Freelancer.in

### 🛠️ Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+), jQuery
- **Styling**: Tailwind CSS with custom CSS
- **Content**: JSON-based content management
- **Animations**: Lottie animations and CSS transitions
- **Hosting**: GitHub Pages

## Content Management

### Adding New Content

The website uses a JSON-based content management system. Simply add content to the respective JSON files:

#### 1. Tutorials (`content/tutorials/content.json`)
```json
{
  "id": "unique-id",
  "title": "Tutorial Title",
  "description": "Brief description",
  "content": "Full tutorial content in Markdown format",
  "date": "2024-01-20",
  "category": "backend|frontend|ai|etc",
  "tags": ["python", "flask", "api"],
  "difficulty": "beginner|intermediate|advanced",
  "readTime": "15 min"
}
```

#### 2. Telugu Poems (`content/poems/content.json`)
```json
{
  "id": "poem-id",
  "title": "కవిత శీర్షిక",
  "content": "Complete poem text with line breaks",
  "date": "2024-01-15",
  "category": "nature|motivation|love|etc"
}
```

#### 3. Stories (`content/stories/content.json`)
```json
{
  "id": "story-id",
  "title": "కథ శీర్షిక",
  "content": "Complete story text",
  "date": "2024-01-10",
  "category": "moral|wisdom|adventure|etc"
}
```

#### 4. Freelancer Rewards (`content/rewards/content.json`)
```json
{
  "id": "reward-id",
  "title": "Achievement Title",
  "platform": "Freelancer.in",
  "description": "Achievement description",
  "date": "2024-01-15",
  "badge": "🏆",
  "rating": 5.0,
  "totalProjects": 25,
  "category": "Web Development"
}
```

### Content Features
- **Automatic rendering** - Content appears automatically when JSON files are updated
- **Modal popups** - Full content displayed in elegant modals
- **Search & filter** - Easy content discovery
- **Mobile optimization** - Perfect display on all devices

## Project Structure

```
Portfolio/
├── index.html              # Main HTML file
├── index.css               # Custom styles
├── index.js                # Main JavaScript
├── content-manager.js      # Content management system
├── content/                # Content directory
│   ├── tutorials/
│   │   └── content.json
│   ├── poems/
│   │   └── content.json
│   ├── stories/
│   │   └── content.json
│   └── rewards/
│       └── content.json
├── images/                 # Image assets
├── videos/                 # Video assets
└── README.md              # This file
```

## Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/pavanKumar2812/Portfolio.git
   cd Portfolio
   ```

2. **Serve locally**
   - Option 1: Use VS Code Live Server extension
   - Option 2: Use Python's built-in server
     ```bash
     python -m http.server 8000
     ```
   - Option 3: Use Node.js serve package
     ```bash
     npx serve .
     ```

3. **Open in browser**
   Navigate to `http://localhost:8000` (or the port shown)

## GitHub Pages Deployment

The site is automatically deployed to GitHub Pages. Any changes pushed to the main branch will be reflected on the live site.

**Live URL**: `https://pavankumar2812.github.io/Portfolio/`

## Customization

### Adding New Sections
1. Create content JSON file in `content/` directory
2. Add rendering logic in `content-manager.js`
3. Update navigation in the `renderNavigation()` method

### Styling
- Main styles: `index.css`
- Tailwind CSS classes used throughout HTML
- Custom animations and transitions included

### Content Types
The system supports:
- **Markdown rendering** for tutorials
- **Multi-line text** for poems and stories
- **Rich metadata** for all content types
- **Category and tag filtering**

## Performance Features

- **Lazy loading** of content
- **Optimized images** and videos
- **Minimal JavaScript** for fast loading
- **CDN-hosted libraries** (Tailwind, jQuery, Lottie)

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add your content or features
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Pavan Kumar** | AI/ML Engineer | Computer Vision Engineer
- 📧 adinanipavankumar@gmail.com
- 🔗 [LinkedIn](https://www.linkedin.com/in/pavan-kumar-adinani-924272232/)
- 💻 [GitHub](https://github.com/pavanKumar2812)
