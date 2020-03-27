export interface PlawSwipeData {
  items: ContentType[]
}

export interface ContentType {
  title: string;
  description: string;
  imageSource: string;
}

const data: PlawSwipeData = {
  items: [
    {
      title: 'Knight and Day',
      description: '$0.99',
      imageSource: 'https://www.gstatic.com/tv/thumb/v22vodart/7963670/p7963670_v_v8_ah.jpg',
    },
    {
      title: 'The Vanishing',
      description: '$1.99',
      imageSource: 'https://m.media-amazon.com/images/M/MV5BMTU5NDQxNzE0Ml5BMl5BanBnXkFtZTgwNDMwODE1NzM@._V1_.jpg',
    },
    {
      title: 'Ultimate Avengers',
      description: '$1.99',
      imageSource: 'https://tinyurl.com/play-swipe-3',
    },
    {
      title: 'Humanity Bureau',
      description: '$4.99',
      imageSource: 'https://i.pinimg.com/originals/02/db/8a/02db8ab3e345325f275bc916258faf06.png',
    },
    {
      title: 'Trading Paint',
      description: '$1.99',
      imageSource: 'https://tinyurl.com/play-swipe-5',
    },
  ],
};

export default data;
