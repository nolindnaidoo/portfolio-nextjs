<div align="center">

![GitHub package.json version](https://img.shields.io/github/package-json/v/nolindnaidoo/portfolio-nextjs) [![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/) [![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://reactjs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/) [![Tailwind](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/) [![Bun](https://img.shields.io/badge/Bun-1.0+-FF1744?logo=bun)](https://bun.sh/) [![Security](https://img.shields.io/badge/Security-OWASP%20Compliant-green?logo=security)](https://owasp.org/) ![GitHub repo size](https://img.shields.io/github/repo-size/nolindnaidoo/portfolio-nextjs?color=g) ![GitHub](https://img.shields.io/github/license/nolindnaidoo/portfolio-nextjs)[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)

# Nolin Naidoo's Portfolio

_A modern, interactive portfolio with terminal-inspired navigation and premium design systems_

**[🌐 Live Demo](https://nolindnaidoo.com)** • **[📧 Contact](mailto:nolin@nolindnaidoo.com)**

</div>

---

## Overview

This portfolio represents a unique approach to developer portfolios, featuring a **dual-panel interface** with content on the left and an **interactive terminal** on the right. Built with modern web technologies and production-ready patterns, it showcases both technical expertise and attention to user experience.

### Key Highlights

🎯 **Interactive Terminal** - Fully functional command-line interface for navigation  
🎨 **Premium Design System** - Consistent theming with light/dark mode support  
⚡ **Performance Optimized** - Built with Next.js 15, React 19, and modern patterns  
🔒 **Enterprise Security** - OWASP compliant with comprehensive security headers  
🔧 **Production Ready** - Comprehensive error handling, logging, and monitoring  
📱 **Responsive Design** - Seamless experience across all device sizes  
🧩 **Modular Architecture** - Reusable components with extensive documentation

---

## Technical Architecture

### Core Technologies

- **Framework**: Next.js 15 with App Router and Turbopack
- **Runtime**: React 19 with concurrent features
- **Language**: TypeScript 5 with strict configuration
- **Styling**: Tailwind CSS 4 with design tokens
- **Package Manager**: Bun for fast installs and hot reloading
- **Animations**: Framer Motion with accessibility considerations

### Unique Features

#### 🖥️ **Dual-Panel Interface**

A sophisticated layout system with content panels and an integrated terminal interface, providing both traditional portfolio browsing and developer-friendly command navigation.

#### 📟 **Interactive Terminal**

- Real command execution with help system
- Device detection and system information
- Command history and auto-completion
- Smooth animations respecting user preferences

#### 🎨 **Design System Excellence**

- Radix UI primitives for accessibility
- Consistent color tokens and spacing
- Theme-aware components
- Premium visual effects and gradients

#### 🛡️ **Production-Grade Error Handling**

- Variant-specific error boundaries
- Graceful fallbacks with recovery options
- Integrated logging and monitoring
- Development vs production error displays

---

## 🔒 Security & Production Readiness

This portfolio implements **enterprise-grade security** following OWASP best practices and modern web security standards.

### Security Features

#### **🛡️ Security Headers**

- **Content Security Policy (CSP)** - Prevents XSS and code injection attacks
- **X-Frame-Options** - Protects against clickjacking attacks
- **X-Content-Type-Options** - Prevents MIME sniffing vulnerabilities
- **Referrer Policy** - Controls information leakage through referrers
- **Permissions Policy** - Disables unnecessary browser APIs

#### **🔐 Application Security**

- **Environment Variable Protection** - Secure configuration management
- **XSS Prevention** - React's built-in escaping + CSP enforcement
- **HTTPS Enforcement** - Automatic HTTP to HTTPS redirects
- **Secure Image Handling** - SVG sanitization and content policies
- **Error Information Control** - Environment-aware error disclosure

#### **⚡ Performance Security**

- **HSTS (HTTP Strict Transport Security)** - Force secure connections
- **Resource Optimization** - Prevent malicious resource loading
- **Console Log Removal** - Clean production builds
- **Cache Control** - Secure static asset caching

### Security Configuration

```typescript
// middleware.ts - Security headers applied to all routes
const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'origin-when-cross-origin',
  'Content-Security-Policy': 'default-src "self"; script-src "self" "unsafe-inline"...',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
}

// next.config.ts - Additional hardening
const securityConfig = {
  poweredByHeader: false, // Remove identifying headers
  dangerouslyAllowSVG: false, // Prevent SVG-based attacks
  removeConsole: true, // Clean production builds
}
```

### Environment Security

```bash
# .env.example - Secure environment template
NEXT_PUBLIC_SITE_URL=https://nolindnaidoo.com
NEXT_PUBLIC_EMAIL=nolin@nolindnaidoo.com

# All sensitive data uses environment variables
# No hardcoded secrets or API keys
# Production/development environment separation
```

### Security Compliance

| **Standard**       | **Compliance** | **Implementation**                    |
| ------------------ | -------------- | ------------------------------------- |
| **OWASP Top 10**   | ✅ Compliant   | CSP, input validation, secure headers |
| **CSP Level 3**    | ✅ Enforced    | Strict content security policy        |
| **HSTS**           | ✅ Enabled     | Max-age 1 year + preload ready        |
| **Secure Cookies** | ✅ Ready       | SameSite, Secure, HttpOnly flags      |
| **XSS Protection** | ✅ Multi-layer | React escaping + CSP + headers        |

### Security Testing

```bash
# Test security headers
curl -I https://nolindnaidoo.com

# Expected headers:
# ✅ X-Frame-Options: DENY
# ✅ X-Content-Type-Options: nosniff
# ✅ Content-Security-Policy: default-src 'self'...
# ✅ Strict-Transport-Security: max-age=31536000

# SSL/TLS validation
# Use SSL Labs: https://www.ssllabs.com/ssltest/
# Expected grade: A+ with HSTS
```

### Production Security Checklist

- [x] **Security headers** implemented via middleware
- [x] **Content Security Policy** configured for tech stack
- [x] **HTTPS enforcement** with HSTS preload
- [x] **Environment variables** properly secured
- [x] **Error handling** environment-aware
- [x] **Console logs** removed in production
- [x] **Input validation** on all user interactions
- [x] **Image security** with SVG protection
- [x] **Dependencies** regularly audited
- [x] **Static analysis** with TypeScript strict mode

---

## Getting Started

### Prerequisites

- **Bun** 1.0+ (recommended) or Node.js 18+
- **Git** for cloning the repository

### Quick Start

```bash
# Clone the repository
git clone https://github.com/nolindnaidoo/portfolio-nextjs.git
cd portfolio-nextjs

# Install dependencies
bun install

# Start development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Available Scripts

| Command         | Description                             |
| --------------- | --------------------------------------- |
| `bun dev`       | Start development server with Turbopack |
| `bun build`     | Create production build                 |
| `bun start`     | Start production server                 |
| `bun lint`      | Run ESLint checks                       |
| `bun typecheck` | Run TypeScript checks                   |
| `bun clean`     | Clean all build artifacts and reinstall |

---

## Project Structure

```
portfolio-nextjs/
├── middleware.ts               # Security headers & CSP
├── next.config.ts             # Production security config
├── .env.example               # Environment template
├── src/
│   ├── app/                   # Next.js App Router
│   ├── components/            # React components
│   │   ├── error/            # Error boundary system
│   │   ├── home/             # Landing page components
│   │   ├── interface/        # Dual-panel layout system
│   │   ├── terminal/         # Interactive terminal
│   │   ├── theme/            # Theme management
│   │   └── ui/               # Base UI components
│   ├── contexts/             # React context providers
│   ├── hooks/                # Custom React hooks
│   └── lib/                  # Utilities and configurations
│       ├── error/            # Error handling system
│       └── logger/           # Logging utilities
└── public/                   # Static assets
```

### Component Documentation

Each component system includes comprehensive documentation following progressive disclosure principles:

- **🎯 Quick Decision Trees** - Choose the right component instantly
- **🚀 Quick Start Examples** - Get running in seconds
- **📋 Common Patterns** - Real-world usage scenarios
- **🔧 Advanced Examples** - Complex implementations
- **📦 Complete API Reference** - Full TypeScript interfaces
- **💡 Best Practices** - Performance and accessibility guidance

---

## Development Principles

### Code Quality

- **Guard Clause Pattern** - Clean, readable conditional logic
- **Functional Architecture** - Composable, testable components
- **TypeScript First** - Full type safety throughout
- **Conventional Commits** - Standardized commit messages

### Performance

- **React 19 Features** - Concurrent rendering and optimizations
- **Bundle Optimization** - Code splitting and lazy loading
- **Image Optimization** - Next.js Image with responsive sizing
- **Animation Performance** - Hardware acceleration and reduced motion support

### Accessibility

- **WCAG Compliance** - Screen reader support and keyboard navigation
- **Semantic HTML** - Proper heading hierarchy and landmarks
- **Focus Management** - Logical tab order and focus indicators
- **Motion Preferences** - Respects user's motion settings

---

## Deployment

The portfolio is deployed on [Vercel](https://vercel.com) with automatic deployments from the main branch.

### Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nolindnaidoo/portfolio-nextjs)

### Environment Setup

The portfolio works out of the box with no required environment variables. For customization:

```bash
# Copy environment template
cp .env.example .env.local

# Configure your settings (optional)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_EMAIL=your-email@example.com
```

**Security Note**: All environment variables are properly validated and use secure defaults. The `.env.example` file documents all available configuration options.

---

## Contributing

While this is a personal portfolio, the codebase serves as a reference for modern React patterns and component architecture. Feel free to:

- **Study the patterns** - Each component demonstrates production-ready practices
- **Fork for your own use** - Adapt the structure for your portfolio
- **Report issues** - Help improve the codebase quality
- **Suggest improvements** - Contribute to the architectural patterns

### Code Standards

- Follow the existing TypeScript patterns
- Maintain component documentation standards
- Ensure accessibility compliance
- Write meaningful commit messages

---

## License & Attribution

**MIT License** - See [LICENSE](./LICENSE) for details.

### Recognition

This portfolio showcases:

- Modern React 19 and Next.js 15 patterns
- Production-ready component architecture
- Accessibility-first design principles
- Performance optimization techniques

Feel free to use this codebase as a reference for your own projects. Attribution is appreciated but not required.

---

## Connect

**Nolin Naidoo** - Software Engineer

- **Portfolio**: [nolindnaidoo.com](https://nolindnaidoo.com)
- **Email**: [nolin@nolindnaidoo.com](mailto:nolin@nolindnaidoo.com)
- **LinkedIn**: [linkedin.com/in/nolindnaidoo](https://www.linkedin.com/in/nolindnaidoo/)
- **GitHub**: [github.com/nolindnaidoo](https://github.com/nolindnaidoo)

---

<div align="center">

_Built with ❤️ and modern web technologies_

**[🌐 Visit Portfolio](https://nolindnaidoo.com)**

</div>
