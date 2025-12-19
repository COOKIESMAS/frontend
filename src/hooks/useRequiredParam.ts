import { useParams } from 'react-router-dom'

export function useRequiredParam<T extends string>(key: T): string {
  const params = useParams()
  const value = params[key]

  if (!value) {
    throw new Error(`Missing required route param: ${key}`)
  }

  return value
}
