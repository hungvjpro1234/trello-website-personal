const CARD_COVER_BASE = 'https://picsum.photos/seed'
const AVATAR_BASE = 'https://api.dicebear.com/9.x/notionists/svg'

export const BOARD_MEMBERS = [
  'manhung',
  'an',
  'linh',
  'khoa',
  'trang',
  'minh',
  'vy',
  'son'
]

export const buildCardCoverUrl = (seed, width = 640, height = 360) => {
  return `${CARD_COVER_BASE}/${encodeURIComponent(seed)}/${width}/${height}`
}

export const buildAvatarUrl = (seed) => {
  const params = new URLSearchParams({
    seed,
    backgroundColor: 'c0aede,d1d4f9,b6e3f4,ffd5dc,ffdfbf',
    scale: '110'
  })

  return `${AVATAR_BASE}?${params.toString()}`
}
