'use client'

import { fadeInUpVariants } from '@/components/home'
import { motion } from 'framer-motion'

export default function HomeDescription() {
  return (
    <motion.div className="max-w-2xl mx-auto" variants={fadeInUpVariants}>
      <p className="text-lg md:text-xl text-muted-foreground/80 leading-relaxed">
        Crafting exceptional digital experiences with modern technologies and
        thoughtful design. Passionate about building scalable solutions that
        make a difference.
      </p>
    </motion.div>
  )
}
