# Home Components

Portfolio landing page with animated profile section, rotating job titles, and social links.

## 🎯 Quick Decision

**Need home page functionality?**

```
├─ Complete home section? → Home (main container)
├─ Profile picture with effects? → HomeAvatar
├─ Name with rotating titles? → HomeHeading + AnimatedRole
├─ Social media links? → HomeLinks
└─ Bio description? → HomeDescription
```

## 🚀 Quick Start

```tsx
import Home from '@/components/home'

// Complete home section with all features
function HomePage() {
  return <Home />
}
```

## 📊 Component Overview

| Component           | Purpose             | Key Features                            |
| ------------------- | ------------------- | --------------------------------------- |
| **Home**            | Main container      | Staggered animations, responsive layout |
| **HomeAvatar**      | Profile picture     | Image optimization, glow effects        |
| **HomeHeading**     | Name and job titles | Animated role rotation, gradients       |
| **HomeLinks**       | Social media links  | External link handling, hover effects   |
| **HomeDescription** | Bio text            | Responsive typography, animations       |

---

## 📋 Common Patterns

### Basic Home Section

```tsx
import Home from '@/components/home'

// Complete home page
;<Home />
```

### Individual Components

```tsx
import { HomeAvatar, HomeHeading, HomeLinks } from '@/components/home'

// Custom composition
;<div className="space-y-8">
  <HomeAvatar />
  <HomeHeading />
  <HomeLinks />
</div>
```

### Animated Role Titles

```tsx
import { AnimatedRole } from '@/components/home'

// Default rotating roles
<AnimatedRole />

// Custom roles and timing
const customRoles = [
  { first: 'Full Stack', second: 'Developer' },
  { first: 'React', second: 'Specialist' },
]

<AnimatedRole roles={customRoles} interval={3000} />
```

### Profile Avatar

```tsx
import { HomeAvatar } from '@/components/home'

// Default styling
<HomeAvatar />

// Custom CSS classes
<HomeAvatar className="w-40 h-40" />
```

---

## 🔧 Real-World Examples

### Portfolio Landing Page

```tsx
import Home from '@/components/home'
import { motion } from 'framer-motion'

function PortfolioLanding() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-6">
        <Home />

        {/* Optional call-to-action */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg">
            View My Work
          </button>
        </motion.div>
      </div>
    </div>
  )
}
```

### Custom About Section

```tsx
import { HomeAvatar, HomeHeading, HomeDescription } from '@/components/home'
import { motion } from 'framer-motion'

function AboutSection() {
  return (
    <motion.div
      className="space-y-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="text-center space-y-6">
        <HomeAvatar className="w-32 h-32" />
        <HomeHeading />

        {/* Extended description */}
        <div className="max-w-3xl mx-auto space-y-4">
          <HomeDescription />
          <p className="text-muted-foreground">
            With over 5 years of experience building scalable web applications, I specialize in
            React, TypeScript, and modern development practices.
          </p>
        </div>
      </div>
    </motion.div>
  )
}
```

### Team Page Profile

```tsx
import { HomeAvatar, HomeHeading } from '@/components/home'

function TeamMemberCard({ member }) {
  return (
    <div className="bg-card p-6 rounded-lg text-center">
      <HomeAvatar className="mx-auto mb-4" />

      {/* Custom heading for team member */}
      <h3 className="text-xl font-bold mb-2">{member.name}</h3>
      <p className="text-muted-foreground mb-4">{member.role}</p>

      <div className="flex justify-center space-x-2">
        {member.socialLinks.map((link) => (
          <a
            key={link.platform}
            href={link.url}
            className="text-muted-foreground hover:text-foreground"
          >
            <link.icon className="w-5 h-5" />
          </a>
        ))}
      </div>
    </div>
  )
}
```

### Contact Page Header

```tsx
import { HomeAvatar, HomeLinks } from '@/components/home'

function ContactHeader() {
  return (
    <div className="text-center space-y-8 mb-12">
      <HomeAvatar />

      <div>
        <h1 className="text-4xl font-bold mb-2">Get In Touch</h1>
        <p className="text-xl text-muted-foreground mb-6">Let's discuss your next project</p>
      </div>

      <HomeLinks />

      <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
        <span>📧 hello@nolindnaidoo.com</span>
        <span>•</span>
        <span>📱 Available for freelance work</span>
      </div>
    </div>
  )
}
```

### Animated Introduction

```tsx
import { HomeAvatar, HomeHeading, HomeDescription, HomeLinks } from '@/components/home'
import { motion } from 'framer-motion'

function AnimatedIntro() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <HomeAvatar />
      </motion.div>

      <motion.div variants={itemVariants}>
        <HomeHeading />
      </motion.div>

      <motion.div variants={itemVariants}>
        <HomeDescription />
      </motion.div>

      <motion.div variants={itemVariants}>
        <HomeLinks />
      </motion.div>

      <motion.div variants={itemVariants} className="text-center text-sm text-muted-foreground">
        Scroll down to explore my work
      </motion.div>
    </motion.div>
  )
}
```

---

## 🎯 Advanced Patterns

### Dynamic Role Configuration

```tsx
import { AnimatedRole } from '@/components/home'
import { useState, useEffect } from 'react'

function DynamicRoles() {
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('/api/roles')
        const data = await response.json()
        setRoles(data.roles)
      } catch (error) {
        // Fallback to default roles
        setRoles([
          { first: 'Software', second: 'Engineer' },
          { first: 'Frontend', second: 'Developer' },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchRoles()
  }, [])

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-muted rounded w-48"></div>
      </div>
    )
  }

  return <AnimatedRole roles={roles} interval={2500} />
}
```

### Responsive Avatar Sizes

```tsx
import { HomeAvatar } from '@/components/home'
import { useMediaQuery } from '@/hooks'

function ResponsiveAvatar() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(max-width: 1024px)')

  const getAvatarSize = () => {
    if (isMobile) return 'w-24 h-24'
    if (isTablet) return 'w-32 h-32'
    return 'w-40 h-40'
  }

  return <HomeAvatar className={`${getAvatarSize()} transition-all duration-300`} />
}
```

### A/B Testing Home Variants

```tsx
import { HomeHeading, HomeDescription } from '@/components/home'
import { useState, useEffect } from 'react'

function ABTestHome() {
  const [variant, setVariant] = useState('A')

  useEffect(() => {
    // Simple A/B test logic
    const testVariant = Math.random() > 0.5 ? 'A' : 'B'
    setVariant(testVariant)

    // Track variant for analytics
    analytics.track('home_variant_shown', { variant: testVariant })
  }, [])

  return (
    <div className="space-y-8">
      <HomeHeading />

      {variant === 'A' ? (
        <HomeDescription />
      ) : (
        <div className="max-w-2xl mx-auto">
          <p className="text-lg md:text-xl text-muted-foreground/80 leading-relaxed">
            Building the future of web development, one line of code at a time. Specializing in
            React, TypeScript, and cutting-edge technologies.
          </p>
        </div>
      )}
    </div>
  )
}
```

### Interactive Social Links

```tsx
import { HomeLinks } from '@/components/home'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function InteractiveSocialLinks() {
  const [hoveredLink, setHoveredLink] = useState(null)
  const [clickCount, setClickCount] = useState({})

  const handleLinkClick = (label) => {
    setClickCount((prev) => ({
      ...prev,
      [label]: (prev[label] || 0) + 1,
    }))

    // Track engagement
    analytics.track('social_link_clicked', { platform: label })
  }

  return (
    <div className="space-y-4">
      <div onMouseEnter={() => setHoveredLink('social')} onMouseLeave={() => setHoveredLink(null)}>
        <HomeLinks onClick={handleLinkClick} />
      </div>

      <AnimatePresence>
        {hoveredLink && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-sm text-muted-foreground text-center"
          >
            Click to connect with me!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show engagement stats (dev mode only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="text-xs text-muted-foreground">Clicks: {JSON.stringify(clickCount)}</div>
      )}
    </div>
  )
}
```

### Performance Optimized Home

```tsx
import { lazy, Suspense, memo } from 'react'
import { HomeAvatar, HomeHeading } from '@/components/home'

// Lazy load heavy components
const HomeLinks = lazy(() => import('@/components/home/HomeLinks'))
const HomeDescription = lazy(() => import('@/components/home/HomeDescription'))

const OptimizedHome = memo(function OptimizedHome() {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-8">
        {/* Critical content loads immediately */}
        <HomeAvatar />
        <HomeHeading />

        {/* Non-critical content loads progressively */}
        <Suspense fallback={<div className="animate-pulse h-12 bg-muted rounded" />}>
          <HomeLinks />
        </Suspense>

        <Suspense fallback={<div className="animate-pulse h-8 bg-muted rounded" />}>
          <HomeDescription />
        </Suspense>
      </div>
    </div>
  )
})

export default OptimizedHome
```

---

## 📦 Complete API Reference

### Home Props

```tsx
// Home component has no props - self-contained
interface HomeProps {
  // No props - fully self-contained component
}
```

### HomeAvatar Props

```tsx
interface HomeAvatarProps {
  className?: string // Custom CSS classes (default: 'relative inline-block')
}
```

### HomeHeading Props

```tsx
// HomeHeading has no props - uses internal AnimatedRole
interface HomeHeadingProps {
  // No props - uses default configuration
}
```

### AnimatedRole Props

```tsx
interface AnimatedRoleProps {
  roles?: RoleType[] // Array of role objects (default: 8 predefined roles)
  interval?: number // Rotation interval in ms (default: 2800)
  className?: string // Custom CSS classes
}

interface RoleType {
  first: string // First part of role (e.g., "Software")
  second: string // Second part of role (e.g., "Engineer")
}
```

### HomeLinks Props

```tsx
interface HomeLinksProps {
  onClick?: (label: string) => void // Optional click handler for tracking
}
```

### HomeDescription Props

```tsx
// HomeDescription has no props - static content
interface HomeDescriptionProps {
  // No props - static content component
}
```

### Animation Variants

```tsx
// Available animation variants from animations.ts
interface AnimationVariants {
  fadeInUpVariants: Variants // Standard fade in with upward motion
  staggerContainerVariants: Variants // Container for staggered children
  roleAnimationVariants: Variants // Role transition animations
}
```

---

## 🚨 Common Mistakes

```tsx
// ❌ Wrong - Modifying Home component props
function BadUsage() {
  return <Home className="custom" /> // Home doesn't accept props
}

// ❌ Wrong - Not providing proper role structure
function BadRoles() {
  const badRoles = ['Developer', 'Engineer'] // Should be objects with first/second
  return <AnimatedRole roles={badRoles} />
}

// ❌ Wrong - Missing image alt text or error handling
function BadAvatar() {
  return <img src="/avatar.jpg" className="w-32 h-32" /> // Use HomeAvatar instead
}

// ✅ Right - Using components as designed
function GoodUsage() {
  return (
    <div className="custom-container">
      <Home /> {/* Self-contained */}
    </div>
  )
}

// ✅ Right - Proper role structure
function GoodRoles() {
  const roles = [
    { first: 'Frontend', second: 'Developer' },
    { first: 'React', second: 'Expert' },
  ]
  return <AnimatedRole roles={roles} interval={3000} />
}

// ✅ Right - Using optimized avatar component
function GoodAvatar() {
  return <HomeAvatar className="w-32 h-32" />
}
```

## 💡 Best Practices

**Component usage:**

```tsx
// Use the complete Home component for landing pages
<Home />

// Or compose individual components for custom layouts
<div className="space-y-8">
  <HomeAvatar />
  <HomeHeading />
  <HomeLinks />
</div>
```

**Animation considerations:**

```tsx
// Components automatically respect reduced motion preferences
// Animations are optimized for performance with proper variants
// Staggered animations create smooth, professional transitions

// For custom animations, use the shared variants
import { fadeInUpVariants } from '@/components/home/animations'
;<motion.div variants={fadeInUpVariants}>Custom content</motion.div>
```

**Performance considerations:**

- HomeAvatar uses Next.js Image optimization with priority loading
- Animation variants are defined at module level to prevent recreation
- Components use guard clauses to prevent unnecessary renders
- Role rotation uses proper cleanup to prevent memory leaks
- Social links handle external navigation securely

**Accessibility:**

- HomeAvatar includes proper alt text and fallback handling
- HomeHeading uses semantic HTML with proper heading hierarchy
- AnimatedRole includes ARIA live regions for screen readers
- HomeLinks have proper ARIA labels and external link indicators
- All animations respect prefers-reduced-motion settings

**Styling customization:**

- Use consistent design tokens from the theme system
- Leverage CSS custom properties for dynamic theming
- Maintain responsive typography scales
- Follow gradient and glow effect patterns for visual consistency
- Use proper spacing and layout patterns

**Content management:**

- Role titles can be configured via props or API
- Social links are easily configurable in HomeLinks component
- Description text can be customized by creating variant components
- Profile image is optimized and handles loading states gracefully
- All content supports internationalization if needed
