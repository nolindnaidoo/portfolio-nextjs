'use client'

import {
  HomeAvatar,
  HomeDescription,
  HomeHeading,
  HomeLinks,
  staggerContainerVariants,
} from '@/components/home'
import { motion } from 'framer-motion'

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
