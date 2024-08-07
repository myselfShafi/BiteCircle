import {ReactVideoProps} from 'react-native-video';

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
  src: ReactVideoProps;
  img: string;
  name: string;
  comment: string;
}

export interface ChatListData {
  id: number;
  username: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
}
