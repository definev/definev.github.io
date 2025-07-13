# Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features a clean, minimalist design inspired by professional developer portfolios.

## ✨ Features

- **Responsive Design**: Looks great on all devices from mobile to desktop
- **Modern Stack**: Built with React 18, TypeScript, and Tailwind CSS
- **Smooth Animations**: Subtle hover effects and transitions
- **Section Navigation**: Smooth scrolling with active section highlighting
- **Mobile-First**: Optimized for mobile devices with collapsible navigation
- **Fast Performance**: Built with Vite for lightning-fast development and builds

## 🚀 Getting Started

### Prerequisites

- Bun (latest version)
- Node.js (version 16 or higher)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd definev-portfolio
```

2. Install dependencies:
```bash
bun install
```

3. Start the development server:
```bash
bun run dev
```

4. Open your browser and visit `http://localhost:5173`

## 🏗️ Build for Production

```bash
bun run build
```

The built files will be in the `dist` directory, ready for deployment.

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Hero.tsx        # Landing section
│   ├── Projects.tsx    # Projects showcase
│   ├── Experience.tsx  # Work experience timeline
│   ├── Skills.tsx      # Skills and technologies
│   └── Contact.tsx     # Contact information
├── App.tsx             # Main app component
├── main.tsx           # React entry point
└── index.css          # Global styles
```

## 🎨 Customization

### Personal Information

Edit the content in each component to reflect your own information:

- **Hero.tsx**: Update name, description, and intro text
- **Projects.tsx**: Replace with your actual projects
- **Experience.tsx**: Add your work experience
- **Skills.tsx**: Update with your technical skills
- **Contact.tsx**: Replace with your contact information

### Styling

The design uses Tailwind CSS with custom color variables defined in `tailwind.config.js`. You can easily customize:

- Colors: Modify the color palette in the Tailwind config
- Typography: Fonts are loaded from Google Fonts (Inter)
- Spacing: Adjust section padding and container sizes
- Animations: Customize transitions and hover effects

### Images

Currently using Unsplash placeholder images for projects. Replace with your actual project screenshots:

1. Add your images to the `public` folder
2. Update the `image` URLs in the projects array

## 🚀 Deployment

This project is configured for easy deployment to various platforms:

### GitHub Pages

1. Update `vite.config.ts` with your repository name:
```typescript
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/',
})
```

2. Build and deploy:
```bash
bun run build
# Deploy the dist folder to GitHub Pages
```

### Netlify/Vercel

Simply connect your repository and these platforms will automatically build and deploy your site.

## 🛠️ Built With

- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Lucide React](https://lucide.dev/) - Beautiful icons
- [Vite](https://vitejs.dev/) - Build tool

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 About

Created by Bùi Đại Dương - A passionate developer who loves exploring how machines think and building solutions that matter.

- Website: [definev.github.com](https://definev.github.com)
- GitHub: [@definev](https://github.com/definev)
- LinkedIn: [Bùi Đại Dương](https://www.linkedin.com/in/definev/)
- Twitter/X: [@definev2](https://x.com/definev2)
- Email: daiduong.workmail@gmail.com

---

*Always learning, always building.* 🚀 
