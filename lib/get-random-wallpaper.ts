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

export const getRandomWallpaper = (): string => {
  const today = dayjs().day()

  console.log(today)
  return wallpapers[today]
}
