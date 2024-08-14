import {
  ChatData,
  ChatListData,
  CommentData,
  PostData,
  ReelsData,
  SuggestionData,
  TrendsData,
} from './configs/types';

export const sampleChats: ChatListData[] = [
  {
    id: 1,
    username: 'John Doe',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar1.png',
    lastMessage: 'Hey, how are you?',
    timestamp: '9:15 PM',
    status: true,
    unread: 3,
  },
  {
    id: 2,
    username: 'Jane Smith',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar2.png',
    lastMessage: 'See you tomorrow!',
    timestamp: '8:45 PM',
    status: true,
    unread: 1,
  },
  {
    id: 3,
    username: 'Alice Johnson',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar3.png',
    lastMessage:
      "See you tomorrow! Don't forget to bring the documents we talked about earlier. It's important for the meeting.",
    timestamp: '8:30 PM',
    status: false,
  },
  {
    id: 4,
    username: 'Michael Brown',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar4.png',
    lastMessage: 'Thank you!',
    timestamp: '8:00 PM',
    status: false,
  },
  {
    id: 5,
    username: 'Emily Davis',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar5.png',
    lastMessage:
      "I'll call you later. We need to discuss the new project and allocate the tasks accordingly.",
    timestamp: '7:45 PM',
    status: false,
  },
  {
    id: 6,
    username: 'David Wilson',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar6.png',
    lastMessage: 'Where are you?',
    timestamp: '7:30 PM',
    status: true,
  },
  {
    id: 7,
    username: 'Sophia Martinez',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar7.png',
    lastMessage: 'Good night!',
    timestamp: '7:00 PM',
    status: false,
  },
  {
    id: 8,
    username: 'Chris Lee',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar2.png',
    lastMessage: "Let's meet at 5 PM.  😊",
    timestamp: '6:45 PM',
    status: true,
  },
  {
    id: 9,
    username: 'Olivia Gonzalez',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar5.png',
    lastMessage:
      "What's up? I haven't heard from you in a while. Just checking in to see how things are going.",
    timestamp: 'Thu',
    status: false,
    unread: 4,
  },
  {
    id: 10,
    username: 'Matthew Anderson',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar1.png',
    lastMessage: 'See you soon.',
    timestamp: 'Thu',
    status: false,
  },
  {
    id: 11,
    username: 'Ava Thomas',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar4.png',
    lastMessage: 'Got it, thanks.',
    timestamp: 'Sat',
    status: false,
  },
  {
    id: 12,
    username: 'James Taylor',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar6.png',
    lastMessage: "I'll be there soon.",
    timestamp: 'Sat',
    status: false,
  },
];

export const sampleChat: ChatData[] = [
  {
    id: '1',
    timestamp: '2024-08-04T10:15:30Z',
    sender: true,
    message:
      'Hey, have you tried the new Italian restaurant downtown? The pasta there is amazing!',
  },
  {
    id: '2',
    timestamp: '2024-08-05T10:16:05Z',
    sender: false,
    status: 3, // temporary, in use for msg sent-1, received-2, delivered-3
    message: "No, I haven't been there yet. What did you order?",
  },
  {
    id: '3',
    timestamp: '2024-08-06T10:17:15Z',
    sender: true,
    message:
      "I had the spaghetti carbonara, and it was probably the best I've ever had. They use fresh ingredients, and you can really taste the difference.",
  },
  {
    id: '4',
    timestamp: '2024-08-06T10:18:45Z',
    sender: false,
    status: 3, // temporary, in use for msg sent-1, received-2, delivered-3
    message:
      'That sounds delicious! I love carbonara. Did you try any of their appetizers or desserts?',
  },
  {
    id: '5',
    timestamp: '2024-08-07T10:20:00Z',
    sender: true,
    message:
      'Yes, we had the bruschetta for an appetizer, which was very fresh and flavorful. For dessert, we tried their tiramisu, and it was out of this world! The perfect end to a great meal.',
  },
  {
    id: '6',
    timestamp: '2024-08-08T10:21:30Z',
    sender: false,
    status: 3, // temporary, in use for msg sent-1, received-2, delivered-3
    message:
      "Wow, I'm definitely going to check it out. Thanks for the recommendation! Do they have any good vegetarian options?",
  },
  {
    id: '7',
    timestamp: '2024-08-08T10:22:45Z',
    sender: true,
    message:
      "Yes, they have a great selection of vegetarian dishes as well. My friend had the eggplant parmesan, and it was very tasty. You won't be disappointed!",
  },
  {
    id: '8',
    timestamp: '2024-08-08T10:24:10Z',
    sender: false,
    status: 2, // temporary, in use for msg sent-1, received-2, delivered-3
    message:
      "That's perfect. I'm always on the lookout for good vegetarian options. I'll make a reservation for this weekend. Thanks again!",
  },
];

export const sampleStory = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1618684833569-d9476d99c36e',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1594583388647-364ea6532257',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1706811833540-2a1054cddafb',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1490984792589-bc12fe270585',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1536724844213-31a3b25a807c',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1526096478311-ff9cf8d38693',
  },
];

export const Comments: CommentData[] = [
  {
    id: 1,
    image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
    name: 'Frank Odalthh',
    createdAt: 4,
    comment: 'Lorem ipsum dolor sit amet, commodo ligula eget dolor.',
  },
  {
    id: 2,
    image: 'https://bootdey.com/img/Content/avatar/avatar6.png',
    name: 'John DoeLink',
    createdAt: 2,
    comment:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
  },
  {
    id: 3,
    image: 'https://bootdey.com/img/Content/avatar/avatar7.png',
    name: 'March SoulLaComa',
    createdAt: 6,
    comment: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. ',
  },
  {
    id: 4,
    image: 'https://bootdey.com/img/Content/avatar/avatar2.png',
    name: 'Finn DoRemiFaso',
    createdAt: 10,
    comment:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
  },
  {
    id: 5,
    image: 'https://bootdey.com/img/Content/avatar/avatar3.png',
    name: 'Maria More More',
    createdAt: 8,
    comment:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
  },
  {
    id: 6,
    image: 'https://bootdey.com/img/Content/avatar/avatar4.png',
    name: 'Clark June Boom!',
    createdAt: 10,
    comment: 'Lorem ipsum dolor sit amet.',
  },
  {
    id: 7,
    image: 'https://bootdey.com/img/Content/avatar/avatar5.png',
    name: 'The googler',
    createdAt: 10,
    comment:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
  },
];

export const sampleTrending: TrendsData[] = [
  {
    id: 'image1',
    url: 'https://images.unsplash.com/photo-1722689417442-65b2a3012952',
    category: 'culinary',
  },
  {
    id: 'image2',
    url: 'https://images.unsplash.com/photo-1464454709131-ffd692591ee5',
    category: 'fruit',
  },
  {
    id: 'image3',
    url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    category: 'burger',
  },
  {
    id: 'image4',
    url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    category: 'cereal',
  },
  {
    id: 'image5',
    url: 'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9',
    category: 'fruit',
  },
  {
    id: 'image6',
    url: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f',
    category: 'ice cream',
  },
  {
    id: 'image7',
    url: 'https://images.unsplash.com/photo-1483918793747-5adbf82956c4',
    category: 'drinks',
  },
  {
    id: 'image8',
    url: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929',
    category: 'pancake',
  },
  {
    id: 'image9',
    url: 'https://images.unsplash.com/photo-1625938146369-adc83368bda7',
    category: 'asian food',
  },
  {
    id: 'image10',
    url: 'https://images.unsplash.com/photo-1700760934249-93efbb574d23',
    category: 'pizza',
  },
  {
    id: 'image11',
    url: 'https://images.unsplash.com/photo-1612095437389-d459aee25de4',
    category: 'coffee',
  },
  {
    id: 'image12',
    url: 'https://images.unsplash.com/photo-1504674900247-dac964293360',
    category: 'healthy',
  },
  {
    id: 'image13',
    url: 'https://images.unsplash.com/photo-1504674900247-dac964293360',
    category: 'healthy',
  },
  {
    id: 'image14',
    url: 'https://images.unsplash.com/photo-1504674900247-dac964293360',
    category: 'healthy',
  },
  {
    id: 'image15',
    url: 'https://images.unsplash.com/photo-1504674900247-dac964293360',
    category: 'healthy',
  },
];

export const SampleSuggestions: SuggestionData[] = [
  {
    id: '1',
    name: 'John Doe',
    img: 'https://images.unsplash.com/photo-1536766820879-059fec98ec0a',
  },
  {
    id: '2',
    name: 'Jane Smith',
    img: 'https://images.unsplash.com/photo-1594583388647-364ea6532257',
  },
  {
    id: '3',
    name: 'Alice Johnson',
    img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce',
  },
  {
    id: '4',
    name: 'Michael Brown',
    img: 'https://images.unsplash.com/photo-1492288991661-058aa541ff43',
  },
  {
    id: '5',
    name: 'Emily Davis',
    img: 'https://images.unsplash.com/photo-1508184964240-ee96bb9677a7',
  },
  {
    id: '6',
    name: 'David Wilson',
    img: 'https://images.unsplash.com/photo-1558487661-9d4f01e2ad64',
  },
];

export const sampleReels: ReelsData[] = [
  {
    id: '1',
    src: require('./assets/videos/Video-670.mp4'),
    img: 'https://images.unsplash.com/photo-1558487661-9d4f01e2ad64',
    name: 'John Doe',
    comment: 'Just tried this amazing new pasta recipe. Highly recommend!',
  },
  {
    id: '2',
    src: require('./assets/videos/Video-579.mp4'),
    img: 'https://images.unsplash.com/photo-1514626585111-9aa86183ac98',
    name: 'Jane Smith',
    comment: "Homemade pizza night! 🍕 What's your favorite topping?",
  },
  {
    id: '3',
    src: require('./assets/videos/1111421-hd_1920_1080_30fps.mp4'),
    img: 'https://images.unsplash.com/photo-1508184964240-ee96bb9677a7',
    name: 'Alice Johnson',
    comment: 'Freshly baked cookies straight out of the oven. Smells heavenly!',
  },
  {
    id: '4',
    src: require('./assets/videos/Video-291.mp4'),
    img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce',
    name: 'Alice Brown',
    comment:
      'Exploring new flavors with this exotic fruit salad. So refreshing!',
  },
];

export const SamplePosts: PostData[] = [
  {
    id: 1,
    avatar: 'https://images.unsplash.com/photo-1594583388647-364ea6532257',
    image: 'https://images.unsplash.com/photo-1659778059522-d280d965fde8',
    name: 'Emily Johnson',
    timestamp: '5 mins ago',
    post: 'Just tried out this amazing avocado toast recipe! Perfectly creamy with a hint of spice. A must-try for breakfast lovers. 🥑 #AvocadoToast #HealthyBreakfast #FoodBlogging',
  },
  {
    id: 2,
    avatar: 'https://images.unsplash.com/photo-1508184964240-ee96bb9677a7',
    image: 'https://images.unsplash.com/photo-1573821663912-6df460f9c684',
    name: 'Jane Smith',
    timestamp: '25 mins ago',
    post: 'Who can resist a classic Margherita pizza? 🍕 Here’s my take on this Italian favorite with a homemade tomato sauce and fresh basil leaves. Recipe on the blog! #PizzaLover #ItalianCuisine #Foodie',
  },
  {
    id: 3,
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce',
    image: 'https://images.unsplash.com/photo-1521354414378-fcffad1d3d6a',
    name: 'Sophia Martinez',
    timestamp: '4 hours ago',
    post: 'I’m in love with this colorful Buddha Bowl! 🌱 Packed with quinoa, roasted veggies, and a delicious tahini dressing. Healthy and delicious. #VeganRecipes #HealthyEating #PlantBased',
  },
  {
    id: 4,
    avatar: 'https://images.unsplash.com/photo-1558487661-9d4f01e2ad64',
    image: 'https://images.unsplash.com/photo-1464195244916-405fa0a82545',
    name: 'Michael Brown',
    timestamp: 'Yesterday',
    post: 'Fresh out of the oven! These chocolate chip cookies are soft, chewy, and loaded with chocolate. Perfect for satisfying that sweet tooth. 🍪 #BakingLove #DessertTime #CookieRecipes',
  },
];
