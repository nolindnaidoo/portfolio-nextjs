import { fadeInUpVariants } from '@/components/home/animations'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ExternalLink, FileText, Github, Linkedin } from 'lucide-react'
import Link from 'next/link'

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

export default function HomeLinks() {
  const SocialLink = ({ href, icon: Icon, label, className, variant }: (typeof socialLinks)[0]) => {
    const isExternal = href.startsWith('http')

    return (
      <Button
        key={label}
        size="lg"
        variant={variant}
        className={`group relative overflow-hidden text-white border-0 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
        asChild
      >
        <Link
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="flex items-center gap-3"
        >
          <Icon className="size-5 group-hover:scale-110 transition-transform duration-300" />
          <span className="font-medium">{label}</span>
          <ExternalLink className="size-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
        </Link>
      </Button>
    )
  }

  return (
    <motion.nav
      className="flex flex-col sm:flex-row gap-4 justify-center items-center"
      variants={fadeInUpVariants}
      aria-label="Social media and resume links"
    >
      {socialLinks.map((link) => (
        <SocialLink key={link.label} {...link} />
      ))}
    </motion.nav>
  )
}
