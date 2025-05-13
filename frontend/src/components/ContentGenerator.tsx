// Demo version that works without backend
import React from 'react'
import { useState } from 'react'
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

// Demo data
const mockIdeas: ContentIdea[] = [
  {
    title: "30초 만에 배우는 요리 팁",
    hook: "집에서 쉽게 따라할 수 있는 요리 꿀팁!",
    mainPoints: ["재료 준비", "조리 과정", "플레이팅"],
    callToAction: "더 많은 요리 팁을 보려면 팔로우하세요!",
    engagementPotential: 8
  },
  {
    title: "초보자를 위한 운동 루틴",
    hook: "운동 처음이라면 이것부터 시작하세요",
    mainPoints: ["워밍업", "기본 운동", "쿨다운"],
    callToAction: "매일 운동하는 습관을 만들어보세요!",
    engagementPotential: 9
  }
]

const mockTrends = ["#요리", "#홈트레이닝", "#일상브이로그", "#뷰티팁", "#테크리뷰"]
const mockKeywords = ["쉬운요리", "다이어트", "운동", "메이크업", "리뷰"]

export function ContentGenerator() {
  const [topic, setTopic] = useState('')
  const [platform, setPlatform] = useState('tiktok')
  const [targetAudience, setTargetAudience] = useState('')
  const [tone, setTone] = useState('funny')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleGenerateIdeas = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setShowResults(true)
    }, 1500)
  }

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
            onClick={handleGenerateIdeas}
            disabled={!topic || isGenerating}
            className="w-full"
          >
            <Sparkles className="mr-2" size={16} />
            {isGenerating ? 'Generating...' : 'Generate Ideas'}
          </Button>
        </div>
      </Card>

      {showResults && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Generated Ideas</h3>
          {mockIdeas.map((idea, index) => (
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
              onClick={() => {}}
            >
              <TrendingUp className="mr-2" size={16} />
              Check Trends
            </Button>
          </div>
          <div className="space-y-2">
            {mockTrends.map((trend, index) => (
              <div key={index} className="p-2 bg-gray-50 rounded">
                #{index + 1} {trend}
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recommended Keywords</h3>
            <Hash size={20} className="text-gray-500" />
          </div>
          <div className="flex flex-wrap gap-2">
            {mockKeywords.map((keyword, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
              >
                #{keyword}
              </span>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}