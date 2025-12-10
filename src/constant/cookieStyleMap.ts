import { type CSSProperties } from 'react'
import { type SelectableSubCategoryKey } from '@/constant/items'

export const zIndexMap: { [key in SelectableSubCategoryKey]?: number } = {
  body: 2,
  onePiece: 6,
  top: 6,
  pants: 6,
  blush: 4,
  accessory: 7,
  mouth: 5,
  eyes: 5,
  hair: 3,
  hat: 4,
}

export const styleMap: { [key in SelectableSubCategoryKey]?: CSSProperties } = {
  body: { width: '80%', transform: 'translate(-50%, -60%)' },
  eyes: { width: '80%', transform: 'translate(-50%, -60%)' },
  mouth: { width: '80%', transform: 'translate(-50%, -60%)' },
  hair: { width: '80%', transform: 'translate(-50%, -60%)' },
  blush: { width: '80%', transform: 'translate(-50%, -60%)' },
  hat: { width: '80%', transform: 'translate(-50%, -60%)' },
  top: { width: '80%', transform: 'translate(-50%, -60%)' },
  pants: { width: '80%', transform: 'translate(-50%, -60%)' },
  onePiece: { width: '80%', transform: 'translate(-50%, -60%)' },
  accessory: { width: '80%', transform: 'translate(-50%, -60%)' },
}
