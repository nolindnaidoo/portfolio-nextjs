'use client'

import HomeSection from '@/components/home/Home'
import { Card } from '@/components/ui'
import LeftSide from './LeftSide'
import RightSide from './RightSide'

export default function Interface() {
  const handleContentChange = () => {
    // Only home content now, no state needed
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
              <LeftSide pageTitle="Home" transitionKey="home">
                <HomeSection />
              </LeftSide>
              <RightSide onContentChangeAction={handleContentChange} />
            </section>
          </div>
        </Card>
      </div>
    </main>
  )
}
