export interface ContentIdea {
  title: string
  hook: string
  mainPoints: string[]
  callToAction: string
  engagementPotential: number
}

export interface Scene {
  sceneNumber: number
  duration: number
  visualDescription: string
  audioDialogue: string
  cameraAngle: string
  transition: string
  propsEffects: string[]
}

export interface Influencer {
  id: string
  name: string
  bio: string
  platforms: string[]
  categories: string[]
  followers: number
  engagementRate: number
  email?: string
}

export interface InfluencerMetrics {
  avgViews: number
  avgLikes: number
  avgComments: number
  avgShares: number
  growthRate: number
  demographics: {
    age: Record<string, number>
    gender: Record<string, number>
  }
}