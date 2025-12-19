import { type CSSProperties } from 'react'
import { type SelectableSubCategoryKey } from '@/constant/items'

export const zIndexMap: { [key in SelectableSubCategoryKey]?: number } = {
  body: 2,
  onePiece: 3,
  top: 3,
  pants: 3,
  blush: 7,
  accessory: 5,
  mouth: 7,
  eyes: 7,
  hair: 4,
  hat: 6,
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

export const styleMap2: { [key in SelectableSubCategoryKey]?: CSSProperties } =
  {
    body: { width: '100%', transform: 'translate(-50%, -60%)' },
    eyes: { width: '100%', transform: 'translate(-50%, -60%)' },
    mouth: { width: '100%', transform: 'translate(-50%, -60%)' },
    hair: { width: '100%', transform: 'translate(-50%, -60%)' },
    blush: { width: '100%', transform: 'translate(-50%, -60%)' },
    hat: { width: '100%', transform: 'translate(-50%, -60%)' },
    top: { width: '100%', transform: 'translate(-50%, -60%)' },
    pants: { width: '100%', transform: 'translate(-50%, -60%)' },
    onePiece: { width: '100%', transform: 'translate(-50%, -60%)' },
    accessory: { width: '100%', transform: 'translate(-50%, -60%)' },
  }
