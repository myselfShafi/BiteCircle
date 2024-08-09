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
};

textConfig.backupInfo = `Back up to your Google Account's storage. You can restore them on a new phone afer you download ${textConfig.app_Title} on it`;
