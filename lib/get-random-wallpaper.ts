import dayjs from 'dayjs'

const wallpapers = [
  '/wallpapers/skyscrapers.jpg',
  '/wallpapers/businessman.jpg',
  '/wallpapers/ali_da_nino.jpg',
  '/wallpapers/mountainlake.jpg',
  '/wallpapers/mestia.jpg',
  '/wallpapers/businessman.jpg',
  '/wallpapers/businessman.jpg',
]

export const getRandomWallpaper = (add = 0): string => {
  const today = dayjs().day()

  return wallpapers[today + add]
}
