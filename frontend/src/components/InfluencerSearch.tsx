import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Search, Users, TrendingUp, Mail } from 'lucide-react'

interface Influencer {
  id: string
  name: string
  bio: string
  platforms: string[]
  categories: string[]
  followers: number
  engagementRate: number
  email: string
}

export function InfluencerSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [platform, setPlatform] = useState('')
  const [category, setCategory] = useState('')
  const [minFollowers, setMinFollowers] = useState('')
  const [maxFollowers, setMaxFollowers] = useState('')
  const [selectedInfluencer, setSelectedInfluencer] = useState<string | null>(null)

  // For recommendations
  const [contentType, setContentType] = useState('')
  const [targetAudience, setTargetAudience] = useState('')

  const searchInfluencers = useQuery({
    queryKey: ['influencers', searchQuery, platform, category, minFollowers, maxFollowers],
    queryFn: async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/influencers/search`, {
        params: {
          query: searchQuery,
          platform,
          category,
          minFollowers: minFollowers || undefined,
          maxFollowers: maxFollowers || undefined
        }
      })
      return response.data
    },
    enabled: false
  })

  const influencerDetails = useQuery({
    queryKey: ['influencer', selectedInfluencer],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/influencers/${selectedInfluencer}`
      )
      return response.data
    },
    enabled: !!selectedInfluencer
  })

  const recommendInfluencers = useMutation({
    mutationFn: async () => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/influencers/recommend`, {
        contentType,
        targetAudience,
        platform: platform || 'tiktok'
      })
      return response.data
    }
  })

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-xl font-semibold mb-4">Search Influencers</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search Query</label>
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or keywords..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
              <Select value={platform} onValueChange={setPlatform}>
                <option value="">All</option>
                <option value="tiktok">TikTok</option>
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <option value="">All</option>
                <option value="tech">Tech</option>
                <option value="beauty">Beauty</option>
                <option value="food">Food</option>
                <option value="fitness">Fitness</option>
                <option value="travel">Travel</option>
                <option value="lifestyle">Lifestyle</option>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Followers Range</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={minFollowers}
                  onChange={(e) => setMinFollowers(e.target.value)}
                  placeholder="Min"
                />
                <Input
                  type="number"
                  value={maxFollowers}
                  onChange={(e) => setMaxFollowers(e.target.value)}
                  placeholder="Max"
                />
              </div>
            </div>
          </div>

          <Button
            onClick={() => searchInfluencers.refetch()}
            className="w-full"
          >
            <Search className="mr-2" size={16} />
            Search Influencers
          </Button>
        </div>
      </Card>

      {searchInfluencers.data && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Search Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {searchInfluencers.data.data.influencers.map((influencer: Influencer) => (
              <Card
                key={influencer.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedInfluencer(influencer.id)}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-lg">{influencer.name}</h4>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <TrendingUp size={14} />
                      <span>{influencer.engagementRate}%</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm">{influencer.bio}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {influencer.platforms.map((p) => (
                      <span key={p} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                        {p}
                      </span>
                    ))}
                    {influencer.categories.map((c) => (
                      <span key={c} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                        {c}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users size={16} />
                      <span>{(influencer.followers / 1000).toFixed(0)}k followers</span>
                    </div>
                    {influencer.email && (
                      <Mail size={16} className="text-gray-600" />
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      <Card>
        <h3 className="text-xl font-semibold mb-4">Get AI Recommendations</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content Type</label>
            <Input
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              placeholder="e.g., tech reviews, beauty tutorials"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
            <Input
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g., Gen Z, professionals"
            />
          </div>

          <Button
            onClick={() => recommendInfluencers.mutate()}
            disabled={!contentType || !targetAudience || recommendInfluencers.isPending}
            className="w-full"
          >
            <Users className="mr-2" size={16} />
            {recommendInfluencers.isPending ? 'Getting Recommendations...' : 'Get Recommendations'}
          </Button>
        </div>

        {recommendInfluencers.data && (
          <div className="mt-6 space-y-4">
            <h4 className="font-semibold">Recommended Influencers</h4>
            {recommendInfluencers.data.data.recommendations.map((influencer: Influencer) => (
              <div key={influencer.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-medium">{influencer.name}</h5>
                    <p className="text-sm text-gray-600">{influencer.bio}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{influencer.engagementRate}% engagement</div>
                    <div className="text-sm text-gray-600">{(influencer.followers / 1000).toFixed(0)}k followers</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}