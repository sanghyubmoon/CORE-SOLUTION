import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Select } from '@/components/ui/Select'
import { Input } from '@/components/ui/Input'
import { Sparkles, TrendingUp, Hash } from 'lucide-react'

interface ContentIdea {
  title: string
  hook: string
  mainPoints: string[]
  callToAction: string
  engagementPotential: number
}

export function ContentGenerator() {
  const [topic, setTopic] = useState('')
  const [platform, setPlatform] = useState('tiktok')
  const [targetAudience, setTargetAudience] = useState('')
  const [tone, setTone] = useState('funny')
  const [contentId, setContentId] = useState<string | null>(null)

  const generateIdeas = useMutation({
    mutationFn: async () => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/content/ideas`, {
        topic,
        platform,
        targetAudience,
        tone
      })
      return response.data
    },
    onSuccess: (data) => {
      setContentId(data.data.contentId)
    }
  })

  const trendsQuery = useQuery({
    queryKey: ['trends', platform],
    queryFn: async () => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/content/trending`, {
        platform
      })
      return response.data
    },
    enabled: false
  })

  const keywordsQuery = useQuery({
    queryKey: ['keywords', platform],
    queryFn: async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/content/keywords`, {
        params: { platform }
      })
      return response.data
    }
  })

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-xl font-semibold mb-4">Generate Content Ideas</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter your content topic..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
              <Select value={platform} onValueChange={setPlatform}>
                <option value="tiktok">TikTok</option>
                <option value="instagram">Instagram Reels</option>
                <option value="youtube">YouTube Shorts</option>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
              <Input
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g., Gen Z, millennials"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
              <Select value={tone} onValueChange={setTone}>
                <option value="funny">Funny</option>
                <option value="serious">Serious</option>
                <option value="educational">Educational</option>
                <option value="inspiring">Inspiring</option>
              </Select>
            </div>
          </div>

          <Button
            onClick={() => generateIdeas.mutate()}
            disabled={!topic || generateIdeas.isPending}
            className="w-full"
          >
            <Sparkles className="mr-2" size={16} />
            {generateIdeas.isPending ? 'Generating...' : 'Generate Ideas'}
          </Button>
        </div>
      </Card>

      {generateIdeas.data && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Generated Ideas</h3>
          {generateIdeas.data.data.ideas.map((idea: ContentIdea, index: number) => (
            <Card key={index}>
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-lg">{idea.title}</h4>
                  <span className="text-sm text-gray-500">
                    Engagement: {idea.engagementPotential}/10
                  </span>
                </div>
                <p className="text-gray-700"><strong>Hook:</strong> {idea.hook}</p>
                <div>
                  <strong>Main Points:</strong>
                  <ul className="list-disc list-inside mt-1">
                    {idea.mainPoints.map((point, idx) => (
                      <li key={idx} className="text-gray-700">{point}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-gray-700"><strong>Call to Action:</strong> {idea.callToAction}</p>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Trending Topics</h3>
            <Button
              size="sm"
              variant="outline"
              onClick={() => trendsQuery.refetch()}
            >
              <TrendingUp className="mr-2" size={16} />
              Check Trends
            </Button>
          </div>
          {trendsQuery.data && (
            <div className="space-y-2">
              {trendsQuery.data.data.trends.map((trend: string, index: number) => (
                <div key={index} className="p-2 bg-gray-50 rounded">
                  #{index + 1} {trend}
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recommended Keywords</h3>
            <Hash size={20} className="text-gray-500" />
          </div>
          {keywordsQuery.data && (
            <div className="flex flex-wrap gap-2">
              {keywordsQuery.data.data.keywords.map((keyword: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                >
                  #{keyword}
                </span>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}