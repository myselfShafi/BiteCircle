interface EmptyStateType {
  chatsHeader: string;
  chatsTitle: string;
  chatsBtn: string;
}

interface placeholderType {
  fullName: string;
  email: string;
  password: string;
  newPassword: string;
  cnfNewPassword: string;
}

interface textConfigType {
  app_Title: string;
  tagline: string;
  loginTitle: string;
  signupTitle: string;
  forgotPwdTitle: string;
  forgotPwdSubTitle: string;
  resetPwdTitle: string;
  resetPwdSubTitle: string;
  setPwdTitle: string;
  setPwdSubTitle: string;
  goLogin: string;
  forgotPwd: string;
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
  login: string;
  signup: string;
  googleSignup: string;
  logout: string;
  submit: string;
  verifyOtp: string;
  emptyState: EmptyStateType;
  placeholders: placeholderType;
}

export const textConfig: textConfigType = {
  app_Title: 'BiteCircle',
  loginTitle: 'Log In To Your Account',
  signupTitle: 'Create New Account',
  forgotPwdTitle: 'Forgot Password?',
  forgotPwdSubTitle:
    "No worries, we'll send you reset instructions. Please enter the email associated with your account.",
  resetPwdTitle: 'Reset Password',
  resetPwdSubTitle: 'We sent a 4-digit code to',
  setPwdTitle: 'Set New Password',
  setPwdSubTitle: 'Must be atleast 8-character long',
  goLogin: 'Already have an account? Log In',
  forgotPwd: 'Forgot Password?',
  tagline:
    'Share Your Culinary Adventures and Explore New Flavors from a Community that Celebrates the Love of Food!',
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
  login: 'Log In',
  signup: 'Sign Up',
  googleSignup: 'Sign Up With Google',
  logout: 'Log Out',
  submit: 'Submit',
  verifyOtp: 'Verify OTP',
  emptyState: {
    chatsHeader: 'No Conversations Yet!',
    chatsTitle: 'Looking a little lonely here. Reach out and talk to someone!',
    chatsBtn: 'Start a Chat',
  },
  placeholders: {
    fullName: 'Full Name',
    email: 'Email',
    password: 'Password',
    newPassword: 'New Password',
    cnfNewPassword: 'Confirm New Password',
  },
};

textConfig.backupInfo = `Back up to your Google Account's storage. You can restore them on a new phone afer you download ${textConfig.app_Title} on it`;
