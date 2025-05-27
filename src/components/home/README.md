# Home Components

This directory contains the components that make up the home/landing page of the portfolio, following modern React patterns with guard clauses, nested arrow functions, and clean composition.

## Architecture Philosophy

### **Guard Clause Pattern**

All components use the "guard clause" or "early return" pattern to handle edge cases first, keeping the main logic path clean and readable.

### **Nested Arrow Functions**

Tightly coupled functionality is encapsulated within the main component using nested arrow functions, ensuring better encapsulation and reducing unnecessary abstractions.

### **Component Ordering**

- Constants and configuration first
- Main exported function
- Supporting functions in execution order

## Components

### `Home.tsx`

The main container component that orchestrates all home page elements with staggered animations.

**Architecture:**

```tsx
export default function Home() {
  return (
    <motion.div
      className="space-y-12"
      variants={staggerContainerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="text-center space-y-8">
        <HomeAvatar />
        <HomeHeading />
        <HomeLinks />
        <HomeDescription />
      </div>
    </motion.div>
  )
}
```

**Features:**

- Staggered animation orchestration using Framer Motion
- Responsive layout with semantic HTML structure
- Direct content rendering for optimal performance
- Imports and renders all home sub-components in logical order
- Centralized animation control with motion variants
- Clean, simple structure following React best practices

### `HomeAvatar.tsx`

Displays the profile picture with glow effects using guard clause patterns.

**Architecture:**

```tsx
interface HomeAvatarProps {
  className?: string
}

export default function HomeAvatar({ className = 'relative inline-block' }: HomeAvatarProps = {}) {
  const [imageError, setImageError] = useState(false)

  // Nested arrow functions for tightly coupled logic
  const AvatarImage = ({ onError }: { onError: () => void }) => (/* image JSX */)
  const AvatarFallbackContent = () => (/* fallback JSX */)
  const AvatarContent = ({ imageError, onImageError }: { imageError: boolean; onImageError: () => void }) => {
    if (imageError) return <AvatarFallbackContent /> // Guard clause
    return <AvatarImage onError={onImageError} />
  }

  return (/* main JSX with motion wrapper and glow effects */)
}
```

**Props:**

- `className?: string` - Custom CSS classes (default: 'relative inline-block')

**Features:**

- Guard clause pattern for error handling and conditional rendering
- Nested components for image and fallback with proper TypeScript interfaces
- Next.js Image optimization with priority loading and responsive sizes
- Graceful fallback handling with styled initials display
- Hover effects with grayscale to color transition
- Gradient glow background with blur effects
- Responsive sizing (128px mobile, 160px desktop)
- Proper error handling with state management

### `HomeHeading.tsx`

Displays the main heading with name and animated rotating job titles using gradient styling and accessibility features.

**Architecture:**

```tsx
// Constants first
const DEFAULT_ROLES: RoleType[] = [
  { first: 'Software', second: 'Engineer' },
  { first: 'Frontend', second: 'Developer' },
  // ... more roles
]
const DEFAULT_INTERVAL = 2800

// Main export
export default function HomeHeading() {
  return (
    <motion.div className="space-y-3" variants={fadeInUpVariants}>
      <h1 id="home-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
        <span className="bg-gradient-to-r from-foreground via-foreground/95 to-foreground/85 bg-clip-text text-transparent">
          Nolin Naidoo
        </span>
      </h1>
      <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-muted-foreground">
        <AnimatedRole />
      </p>
    </motion.div>
  )
}

// Supporting functions in execution order
export function AnimatedRole({ roles, interval, className }: AnimatedRoleProps = {}) {
  const { currentRole, currentIndex } = useRoleRotation(roles, interval)
  const prefersReducedMotion = useReducedMotion()

  // Nested component for role span rendering
  const RoleSpan = ({ role, index }: { role: RoleType; index: number }) => (/* role JSX with gradients */)

  return (/* animated role JSX with AnimatePresence */)
}

export function useRoleRotation(roles: RoleType[], intervalMs: number) {
  // Hook logic with useEffect and useState
}
```

**Features:**

- Constants defined at module level for reusability (8 default roles)
- Nested `RoleSpan` component with gradient text styling
- Custom hook for role rotation logic with proper cleanup
- Accessibility support with reduced motion detection
- ARIA live regions and proper labeling for screen readers
- Responsive typography scaling (text-4xl to text-6xl)
- Gradient text effects for visual appeal
- AnimatePresence for smooth role transitions
- Proper TypeScript interfaces and default parameters

### `HomeLinks.tsx`

Renders social media and resume links with guard clause patterns for external link handling and sophisticated styling.

**Architecture:**

```tsx
// Configuration first
const socialLinks = [
  {
    href: 'https://www.linkedin.com/in/nolindnaidoo/',
    icon: Linkedin,
    label: 'LinkedIn',
    className: 'bg-[#0077B5] hover:bg-[#006396]',
  },
  {
    href: 'https://github.com/nolindnaidoo',
    icon: Github,
    label: 'GitHub',
    className: 'bg-[#171515] hover:bg-[#0d1117]',
  },
  {
    href: '/resume.pdf',
    icon: FileText,
    label: 'Resume',
    className: 'border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5',
    variant: 'outline' as const,
  },
]

// Main export
export default function HomeLinks() {
  // Nested component for individual link rendering
  const SocialLink = ({ href, icon: Icon, label, className, variant }: (typeof socialLinks)[0]) => {
    const isExternal = href.startsWith('http') // Guard clause logic

    return (/* Button with Link wrapper and animations */)
  }

  return (/* navigation JSX with responsive layout */)
}
```

**Features:**

- Configuration data at module level with brand-specific colors
- Nested `SocialLink` component with proper TypeScript inference
- Guard clause pattern for external link detection
- Smart target and rel attribute handling for security
- Button component integration with variant support
- Responsive layout (flex-col on mobile, flex-row on desktop)
- Hover animations with scale and translate effects
- Brand-specific styling for LinkedIn and GitHub
- ExternalLink icon with smooth transitions
- Proper ARIA labeling for navigation

### `HomeDescription.tsx`

Simple description component following the established patterns with responsive typography.

**Architecture:**

```tsx
export default function HomeDescription() {
  return (
    <motion.div className="max-w-2xl mx-auto" variants={fadeInUpVariants}>
      <p className="text-lg md:text-xl text-muted-foreground/80 leading-relaxed">
        Crafting exceptional digital experiences with modern technologies and thoughtful design.
        Passionate about building scalable solutions that make a difference.
      </p>
    </motion.div>
  )
}
```

**Features:**

- Responsive typography with fade-in animation
- Centered layout with proper content hierarchy
- Consistent with overall component architecture
- Max-width constraint for optimal readability
- Muted foreground styling with opacity

## Shared Dependencies

### Animation System

All components use shared animation variants from `@/components/home/animations`:

- `fadeInUpVariants` - Standard fade in with upward motion and scale
- `staggerContainerVariants` - Container for staggered children with delay
- `roleAnimationVariants` - Specialized animations for role transitions with blur effects
- `createAnimationVariants()` - Accessibility-aware animation factory for reduced motion

### Types and Interfaces

- `RoleType` - Interface for animated role objects with first and second properties
- `AnimatedRoleProps` - Props interface for role animation with optional parameters
- `HomeAvatarProps` - Props interface for avatar component with className

## Best Practices Implemented

### **1. Guard Clause Pattern**

```tsx
// ❌ Avoid nested ternary
return condition ? <ComponentA /> : <ComponentB />

// ✅ Use guard clauses
if (condition) return <ComponentA />
return <ComponentB />
```

### **2. Nested Arrow Functions**

```tsx
export default function MainComponent() {
  // Tightly coupled logic stays nested
  const HelperComponent = ({ data }) => {
    if (!data) return null // Guard clause
    return <div>{data}</div>
  }

  return <HelperComponent data={someData} />
}
```

### **3. Proper Code Ordering**

```tsx
// 1. Constants and configuration
const CONFIG = {}

// 2. Main exported function
export default function Component() {}

// 3. Supporting functions in execution order
function helperA() {}
function helperB() {}
```

### **4. Component Composition**

- **Encapsulation**: Related logic stays within the same component
- **Reusability**: Only extract when actually needed elsewhere
- **Testability**: Components can be tested in isolation
- **Maintainability**: Clear separation of concerns

### **5. Performance Considerations**

- Nested functions are recreated on each render but React optimizes this
- Guard clauses prevent unnecessary rendering
- Early returns reduce computational overhead
- Proper dependency arrays in hooks

## File Structure

```
home/
├── Home.tsx             # Main container (with Content)
├── HomeAvatar.tsx       # Profile picture (with nested components)
├── HomeHeading.tsx      # Name and roles (with AnimatedRole)
├── HomeLinks.tsx        # Social links (with SocialLink)
├── HomeDescription.tsx  # Bio text
├── animations.ts        # Shared animation variants
├── index.ts            # Barrel exports
└── README.md           # This documentation
```

## Component Hierarchy

```
Home (Container)
├── HomeAvatar
│   ├── AvatarContent (nested)
│   ├── AvatarImage (nested)
│   └── AvatarFallbackContent (nested)
├── HomeHeading
│   └── AnimatedRole
│       └── RoleSpan (nested)
├── HomeLinks
│   └── SocialLink (nested)
└── HomeDescription
```

## Usage Examples

### Basic Usage

```tsx
import { Home } from '@/components/home'

export default function HomePage() {
  return <Home />
}
```

### Individual Components

```tsx
import { HomeAvatar, HomeHeading } from '@/components/home'

export default function CustomLayout() {
  return (
    <div>
      <HomeAvatar />
      <HomeHeading />
    </div>
  )
}
```

### Custom Role Configuration

```tsx
import { AnimatedRole } from '@/components/home'

const customRoles = [
  { first: 'Custom', second: 'Role' },
  { first: 'Another', second: 'Title' },
]

export default function CustomRoles() {
  return <AnimatedRole roles={customRoles} interval={3000} />
}
```

## Dependencies

- `framer-motion` - Animations and transitions with AnimatePresence
- `next/image` - Optimized image loading with responsive sizes
- `next/link` - Client-side navigation for internal/external links
- `lucide-react` - Icon components (Linkedin, Github, FileText, ExternalLink)
- `@radix-ui/react-avatar` - Avatar primitive components
- `react` - useState, useEffect hooks for state management
- Custom UI components from `@/components/ui` (Button, Avatar, AvatarFallback)

## Performance & Accessibility

- **Motion Preferences**: All animations respect `prefers-reduced-motion`
- **Type Safety**: Full TypeScript support with proper interfaces
- **WCAG Compliance**: Proper ARIA attributes and semantic HTML
- **Mobile-First**: Responsive design with breakpoint considerations
- **Error Handling**: Graceful fallbacks for all failure scenarios
- **Optimized Rendering**: Guard clauses prevent unnecessary renders
