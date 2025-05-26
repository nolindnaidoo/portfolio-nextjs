import { isEnv } from '@/lib/constants'
import { createPageMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'

export const metadata: Metadata = createPageMetadata({
  title: 'Home',
  description: '',
  keywords: [],
})

export default function RootPage(): React.ReactNode {
  return <h1>Hello World {isEnv}</h1>
}
