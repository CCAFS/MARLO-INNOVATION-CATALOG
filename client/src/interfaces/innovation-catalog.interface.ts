export interface InnovationCatalog {
  scales: Scale[]
}
export interface Scale {
  id: number
  name: string
  description: string
  innovations: Innovation[]
}
export interface Innovation {
  id: string
  country: string
  title: string
  summary: string
  key_metrics?: KeyMetrics
  expected_outcomes?: string
  intended_beneficiaries?: string
  comments: Comment[]
}
export interface KeyMetrics {
  geoscope: string
  typology: string
  scaling_readiness: number
}
export interface Comment {
  author: string
  date: string
  text: string
}