export interface CommentData {
  id: number;
  image: string;
  name: string;
  createdAt: number;
  comment: string;
}

export interface StoryData {
  id: number;
  image: string;
}

export interface TrendsData {
  id: string;
  url: string;
  category: string;
}

export interface ReelsData {
  id: string;
  src: string;
  img: string;
  name: string;
  comment: string;
}
