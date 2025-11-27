import dayjs from 'dayjs'

const wallpapers = [
  {
    path: '/wallpapers/old-tbilisi.jpg',
    author: 'Artem Makarov',
    url: 'https://www.pexels.com/photo/buildings-in-a-town-15820823/',
  },
  {
    path: '/wallpapers/horse.jpg',
    author: 'Tomáš Malík',
    url: 'https://www.pexels.com/photo/brown-horse-eating-grass-2990836/',
  },
  {
    path: '/wallpapers/jiguli.jpg',
    author: 'Artūras Kokorevas',
    url: 'https://www.pexels.com/photo/yellow-sedan-driving-on-road-3127348/',
  },
  {
    path: '/wallpapers/ali_da_nino.jpg',
    author: 'Alexandr Nikulin',
    url: 'https://www.pexels.com/photo/kissing-man-and-woman-statue-3559972/',
  },
  {
    path: '/wallpapers/mestia.jpg',
    author: 'Tomáš Malík',
    url: 'https://www.pexels.com/@tomas-malik-793526/',
  },
  {
    path: '/wallpapers/gergeti2.jpg',
    author: 'Andrew Schwark',
    url: 'https://www.pexels.com/photo/church-georgia-georgia-republic-gergeti-trinity-church-1280841/',
  },
  {
    path: '/wallpapers/mountainlake.jpg',
    author: 'Ramaz Bluashvili',
    url: 'https://www.pexels.com/photo/majestic-snowy-mountains-and-pristine-lake-reflection-31674073/',
  },
  {
    path: '/wallpapers/mestia2.jpg',
    author: 'Marek Piwnicki',
    url: 'https://www.pexels.com/photo/brown-concrete-building-on-top-of-mountain-11032491/',
  },
]

export const getRandomWallpaper = (add = 0) => {
  const today = dayjs().day()

  console.log(today)

  return wallpapers[today + add]
}
