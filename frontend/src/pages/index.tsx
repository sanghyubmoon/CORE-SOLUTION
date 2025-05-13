import { useState } from 'react'
import Head from 'next/head'
import { ContentGenerator } from '@/components/ContentGenerator'
import { StoryboardCreator } from '@/components/StoryboardCreator'
import { InfluencerSearch } from '@/components/InfluencerSearch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { Sparkles, FileText, Users } from 'lucide-react'

export default function Home() {
  const [activeTab, setActiveTab] = useState('content')

  return (
    <>
      <Head>
        <title>CORE-SOLUTION - AI Content Creator</title>
        <meta name="description" content="AI-powered short-form content creation and influencer recommendation solution" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <h1 className="text-2xl font-bold text-gray-900">CORE-SOLUTION</h1>
              <nav className="hidden md:flex space-x-8">
                <a href="#" className="text-gray-700 hover:text-primary-600">Dashboard</a>
                <a href="#" className="text-gray-700 hover:text-primary-600">Analytics</a>
                <a href="#" className="text-gray-700 hover:text-primary-600">Settings</a>
              </nav>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">AI Content Creation Suite</h2>
            <p className="mt-2 text-gray-600">Create engaging short-form content with AI assistance</p>
          </div>

          <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content" className="flex items-center gap-2">
                <Sparkles size={16} />
                <span>Content Ideas</span>
              </TabsTrigger>
              <TabsTrigger value="storyboard" className="flex items-center gap-2">
                <FileText size={16} />
                <span>Storyboard</span>
              </TabsTrigger>
              <TabsTrigger value="influencers" className="flex items-center gap-2">
                <Users size={16} />
                <span>Influencers</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="mt-6">
              <ContentGenerator />
            </TabsContent>

            <TabsContent value="storyboard" className="mt-6">
              <StoryboardCreator />
            </TabsContent>

            <TabsContent value="influencers" className="mt-6">
              <InfluencerSearch />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  )
}