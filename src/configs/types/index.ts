import {ReactVideoProps} from 'react-native-video';

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  fullName: string;
  email: string;
  password: string;
}

export interface EmailInput {
  email: string;
}

export interface ResetPasswordInput {
  newPassword: string;
  cnfNewPassword: string;
}

interface Media {
  url: string;
  publicId: string;
}
interface User {
  __v: number;
  _id: string;
  avatar: Media;
  bio: string;
  coverImage: Media;
  createdAt: string;
  email: string;
  fullName: string;
  updatedAt: string;
  userName: string;
}

export interface AuthInitialState {
  status: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
    user: User;
  } | null;
}

export interface PostData {
  id: number;
  avatar: string;
  image: string;
  name: string;
  post: string;
  timestamp: string;
}

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

export interface SuggestionData {
  id: string;
  img: string;
  name: string;
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
  status: boolean;
  unread?: number;
}

export interface ChatData {
  id: string;
  timestamp: string;
  sender: boolean;
  status?: number; // temporary, in use for msg sent-1, received-2, delivered-3
  message: string;
}
