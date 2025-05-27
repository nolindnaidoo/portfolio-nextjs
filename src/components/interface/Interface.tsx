'use client'

import HomeSection from '@/components/home/Home'
import { Card } from '@/components/ui'
import { AnimatePresence, motion } from 'framer-motion'
import LeftSide from './LeftSide'
import RightSide from './RightSide'

export default function Interface() {
  const handleContentChange = () => {
    // Only home content now, no state needed
  }

  // Ultra-premium animation variants
  const containerVariants = {
    initial: {
      opacity: 0,
      scale: 0.95,
      rotateY: -15,
      z: -100,
    },
    animate: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      z: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      rotateY: 15,
      z: -100,
      transition: {
        duration: 0.6,
        ease: [0.55, 0.06, 0.68, 0.19],
      },
    },
  }

  const contentVariants = {
    initial: {
      opacity: 0,
      y: 30,
      scale: 0.98,
      filter: 'blur(10px)',
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.98,
      filter: 'blur(10px)',
      transition: {
        duration: 0.5,
        ease: [0.55, 0.06, 0.68, 0.19],
      },
    },
  }

  const renderLeftPanelContent = () => {
    return (
      <motion.div
        key="home"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="h-full"
      >
        <motion.div variants={contentVariants}>
          <HomeSection />
        </motion.div>
      </motion.div>
    )
  }

  return (
    <main
      id="main-content"
      className="min-h-screen flex items-start justify-center pt-8 pb-32 px-4 bg-background"
    >
      <div className="w-full max-w-7xl">
        {/* Premium Apple-style container */}
        <Card className="relative w-full h-[800px] bg-card border border-border/30 shadow-2xl rounded-3xl overflow-hidden ring-1 ring-border/10">
          {/* Subtle inner border for premium feel */}
          <div className="absolute inset-[1px] rounded-3xl border border-card/50"></div>

          {/* Content area with refined separation */}
          <div className="relative h-full">
            <section className="grid md:grid-cols-2 h-full">
              <LeftSide>
                <AnimatePresence mode="wait" initial={false}>
                  {renderLeftPanelContent()}
                </AnimatePresence>
              </LeftSide>
              <RightSide onContentChangeAction={handleContentChange} />
            </section>
          </div>
        </Card>
      </div>
    </main>
  )
}
