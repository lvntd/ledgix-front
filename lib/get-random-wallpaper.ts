const wallpapers = [
  '/wallpapers/skyscrapers.jpg',
  '/wallpapers/businessman.jpg',
]

export const getRandomWallpaper = (): string => {
  const randomIndex = Math.floor(Math.random() * wallpapers.length)
  return wallpapers[randomIndex]
}
