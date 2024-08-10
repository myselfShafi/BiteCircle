interface textConfigType {
  app_Title: string;
  search_placeholder: string;
  suggestion: string;
  allSuggestion: string;
  trending: string;
  chat: string;
  online: string;
  lastActive: string;
  chatSettings: string;
  activity: string;
  chatNotification: string;
  backup: string;
  backupInfo: string;
  posts: string;
  followers: string;
  following: string;
  album: string;
  preference: string;
  preferenceSub: string;
  darkMode: string;
  lock: string;
  help: string;
  helpSub: string;
  report: string;
  contact: string;
  logout: string;
}

export const textConfig: textConfigType = {
  app_Title: 'BiteCircle',
  search_placeholder: 'Looking for the best cooking ideas?',
  suggestion: 'Suggestions',
  allSuggestion: 'See All',
  trending: 'Trending',
  chat: 'Chats',
  online: 'online',
  lastActive: 'last active today',
  chatSettings: 'Chat Settings',
  activity: 'Activity Status',
  chatNotification: 'Chat Notifications',
  backup: 'Backup Chats!',
  backupInfo: '',
  posts: 'Posts',
  followers: 'Followers',
  following: 'Following',
  album: 'Gallery',
  preference: 'Preferences',
  preferenceSub: 'Customize Your Experience',
  darkMode: 'Dark Mode',
  lock: 'Fingerprint Lock/Unlock',
  help: 'Help & Support',
  helpSub: 'Get Assistance and Find Answers to Your Questions',
  report: 'Report Bug',
  contact: 'Contact Us',
  logout: 'LOG OUT',
};

textConfig.backupInfo = `Back up to your Google Account's storage. You can restore them on a new phone afer you download ${textConfig.app_Title} on it`;
