export interface DataType {
  headerTitle: string;
  headerSubtitle: string;
  items: ContentType[]
}

export interface ContentType {
  title: string;
  description: string;
  imageSource: string;
}

const data: DataType = {
  headerTitle: 'Rentals from $0.99',
  headerSubtitle: 'Discover a new favourite',
  items: [
    {
      title: 'Knight and Day',
      description: '$0.99',
      imageSource: 'https://tinyurl.com/play-swipe-1',
    },
    {
      title: 'The Vanishing',
      description: '$1.99',
      imageSource: 'https://tinyurl.com/play-swipe-2',
    },
    {
      title: 'Ultimate Avengers 2',
      description: '$1.99',
      imageSource: 'https://tinyurl.com/play-swipe-3',
    },
    {
      title: 'The Humanity Bureau',
      description: '$4.99',
      imageSource: 'https://tinyurl.com/play-swipe-4',
    },
    {
      title: 'Trading Paint',
      description: '$1.99',
      imageSource: 'https://tinyurl.com/play-swipe-5',
    },
  ],
};

export default data;
