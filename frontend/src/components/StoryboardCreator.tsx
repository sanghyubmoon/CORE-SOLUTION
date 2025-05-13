import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { FileText, Film, Clock } from 'lucide-react'

interface Scene {
  sceneNumber: number
  duration: number
  visualDescription: string
  audioDialogue: string
  cameraAngle: string
  transition: string
  propsEffects: string[]
}

export function StoryboardCreator() {
  const [contentId, setContentId] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState(30)
  const [platform, setPlatform] = useState('tiktok')
  const [selectedStoryboard, setSelectedStoryboard] = useState<string | null>(null)

  const createStoryboard = useMutation({
    mutationFn: async () => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/storyboard/create`, {
        contentId,
        title,
        description,
        duration,
        platform
      })
      return response.data
    },
    onSuccess: (data) => {
      setSelectedStoryboard(data.data.id)
    }
  })

  const storyboardQuery = useQuery({
    queryKey: ['storyboard', selectedStoryboard],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/storyboard/${selectedStoryboard}`
      )
      return response.data
    },
    enabled: !!selectedStoryboard
  })

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-xl font-semibold mb-4">Create Storyboard</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content ID</label>
            <Input
              value={contentId}
              onChange={(e) => setContentId(e.target.value)}
              placeholder="Enter content ID from generated ideas"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter video title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              rows={3}
              placeholder="Brief description of the video"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (seconds)</label>
              <Input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                min={15}
                max={180}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
              <Select value={platform} onValueChange={setPlatform}>
                <option value="tiktok">TikTok</option>
                <option value="instagram">Instagram Reels</option>
                <option value="youtube">YouTube Shorts</option>
              </Select>
            </div>
          </div>

          <Button
            onClick={() => createStoryboard.mutate()}
            disabled={!contentId || !title || createStoryboard.isPending}
            className="w-full"
          >
            <FileText className="mr-2" size={16} />
            {createStoryboard.isPending ? 'Creating...' : 'Create Storyboard'}
          </Button>
        </div>
      </Card>

      {storyboardQuery.data && (
        <Card>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Storyboard</h3>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock size={16} />
                <span>{storyboardQuery.data.data.duration}s</span>
              </div>
            </div>

            <div className="space-y-4">
              {storyboardQuery.data.data.scenes.map((scene: Scene, index: number) => (
                <div key={index} className="border-l-4 border-primary-500 pl-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Scene {scene.sceneNumber}</h4>
                    <span className="text-sm text-gray-500">{scene.duration}s</span>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm"><strong>Visual:</strong> {scene.visualDescription}</p>
                    <p className="text-sm"><strong>Audio:</strong> {scene.audioDialogue}</p>
                    <p className="text-sm"><strong>Camera:</strong> {scene.cameraAngle}</p>
                    <p className="text-sm"><strong>Transition:</strong> {scene.transition}</p>
                    {scene.propsEffects.length > 0 && (
                      <p className="text-sm">
                        <strong>Props/Effects:</strong> {scene.propsEffects.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}