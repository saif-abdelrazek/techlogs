# TechLogs 🚀

A modern project sharing platform where developers can showcase their work, discover innovative solutions, and connect with the tech community.


## 🌟 Features

### 🎯 Core Functionality
- **Project Showcase**: Share your projects with detailed descriptions, live demos, and code repositories
- **Community Discovery**: Browse and explore projects from developers worldwide
- **View Analytics**: Track how many people view your projects
- **Interactive Dashboard**: Manage all your projects from one centralized location
- **Real-time Search**: Find projects by name, description, or technology stack

### 🔐 Authentication & User Management
- **Secure Authentication**: GitHub and Google OAuth integration
- **User Profiles**: Personalized author pages with project portfolios
- **Project Ownership**: Edit and delete your own projects with proper authorization

### 📝 Rich Content Creation
- **Markdown Support**: Write detailed project descriptions with full markdown rendering
- **Image Upload**: Showcase your projects with custom thumbnails
- **Live Links**: Direct links to demos and repositories
- **Category Tagging**: Organize projects by technology or type

### 🎨 Modern UI/UX
- **Responsive Design**: Perfect experience across all devices
- **Dark/Light Mode**: Automatic theme switching based on system preferences
- **Beautiful Animations**: Smooth transitions and hover effects
- **Accessibility**: Built with accessibility best practices

## 🛠️ Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and better DX
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** - Beautiful icons

### Backend & Database
- **[Sanity CMS](https://www.sanity.io/)** - Headless CMS for content management
- **[Prisma](https://prisma.io/)** - Database ORM and schema management
- **PostgreSQL** - Primary database (via Prisma)

### Authentication & Security
- **[Auth.js (NextAuth)](https://authjs.dev/)** - Authentication solution
- **OAuth Providers**: GitHub, Google integration
- **JWT Tokens** - Secure session management

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Turbopack](https://turbo.build/pack)** - Fast development builds

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- PostgreSQL database
- Sanity account
- GitHub/Google OAuth apps (for authentication)

### 1. Clone the Repository
```bash
git clone https://github.com/saifabdelrazek011/techlogs.git
cd techlogs
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/techlogs"

AUTH_SECRET="your-secret-key-here"

# OAuth Providers
AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID="your-sanity-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION=vX
SANITY_WRITE_TOKEN="your-sanity-token"
```

### 4. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev
```

### 5. Sanity Setup
```bash
# Install Sanity CLI (if not already installed)
npm install -g @sanity/cli

# Navigate to Sanity directory and start studio
cd sanity
npx sanity dev
```

### 6. Start Development Server
```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
techlogs/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (protected)/       # Protected routes (dashboard, edit)
│   ├── (public)/          # Public pages (home, projects, authors)
│   └── api/               # API routes
├── components/            # Reusable React components
├── lib/                   # Utility functions and configurations
│   ├── auth.ts           # Authentication configuration
│   ├── prisma.ts         # Database client
│   └── utils/            # Helper functions
├── actions/              # Server actions
├── sanity/               # Sanity CMS configuration
│   ├── lib/              # Sanity client setup
│   ├── schemaTypes/      # Content schemas
│   └── studio/           # Studio configuration
├── types/                # TypeScript type definitions
├── prisma/               # Database schema and migrations
└── public/               # Static assets
```

## 🎯 Key Features Explained

### Project Sharing
Users can create detailed project entries with:
- **Rich descriptions** using Markdown
- **Live demo links** and **repository links**
- **Custom thumbnails** and **category tags**
- **View tracking** to see project popularity

### Discovery & Learning
- **Browse all projects** with search functionality
- **Filter by categories** (Web Development, Mobile, AI/ML, etc.)
- **View author profiles** to see their complete portfolio
- **Most viewed projects** section for trending content

### User Dashboard
- **Project management** - Create, edit, delete projects
- **Analytics overview** - Track total views across projects
- **Profile management** - Update user information
- **Quick actions** - Easy access to create new projects

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Set build command: `prisma generate && prisma migrate deploy && next build`
5. Deploy!

### Environment Variables for Production
Make sure to set all environment variables in your deployment platform:
- Database connection string
- Authentication secrets and OAuth credentials
- Sanity configuration
- Any additional API keys

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Add TypeScript types for new features
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js team** for the amazing React framework
- **Sanity** for the flexible CMS solution
- **Auth.js** for authentication made simple
- **Tailwind CSS** for the utility-first CSS framework
- **Vercel** for seamless deployment experience

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/saifabdelrazek011/techlogs/issues)
- **Discussions**: [GitHub Discussions](https://github.com/saifabdelrazek011/techlogs/discussions)
- **Email**: contact@saifdev.org

---

<div align="center">
  <p>Built with ❤️ by developers, for developers</p>
  <p>
    <a href="https://techlogs.saifdev.org">Live Demo</a> •
    <a href="#getting-started">Get Started</a> •
    <a href="#contributing">Contribute</a>
  </p>
</div>