// JSON format don`t work well for images, so we import them directly

import user1 from '@/assets/images/previews/user1.png';
import user2 from '@/assets/images/previews/user2.png';
import user3 from '@/assets/images/previews/user3.png';
import user4 from '@/assets/images/previews/user4.png';
import user5 from '@/assets/images/previews/user5.png';
import user6 from '@/assets/images/previews/user6.png';

export const reviewsData = [
  {
    id: 1, 
    name: "Alice", 
    review: "Great products and fast shipping! The quality of the Hollow Knight merch exceeded my expectations. Every detail is carefully crafted.", 
    src: user1,
    starCount: 5,
    date: "2 days ago",
    verified: true,
    helpfulCount: 12,
  },
  {
    id: 2, 
    name: "Bob", 
    review: "Excellent quality and customer service. The charms are beautifully made and arrived perfectly packaged. Will definitely order again!", 
    src: user2,
    starCount: 5,
    date: "1 week ago",
    verified: true,
    helpfulCount: 15,
  },
  {
    id: 3, 
    name: "Charlie", 
    review: "Wide selection of items, found exactly what I was looking for. The fan-made artifacts are authentic and capture the game's atmosphere perfectly.", 
    src: user3,
    starCount: 5,
    date: "2 weeks ago",
    verified: true,
    helpfulCount: 10,
  },
  {
    id: 4, 
    name: "Jason", 
    review: "Amazing capes and incredibly detailed work! The packaging is premium and the attention to detail shows the creators really care about the community.", 
    src: user4,
    starCount: 5,
    date: "1 day ago",
    verified: false,
    helpfulCount: 7,
  },
  {
    id: 5, 
    name: "Peter", 
    review: "Good variety and fair pricing. Would have given 5 stars but one item had a minor flaw. Customer service fixed it quickly though!", 
    src: user5,
    starCount: 3,
    date: "3 weeks ago",
    verified: false,
    helpfulCount: 6,
  },
  {
    id: 6, 
    name: "Maik", 
    review: "Incredible fan-made collection! Every purchase feels like supporting true Hollow Knight lovers. Highly recommended to all fans.", 
    src: user6,
    starCount: 5,
    date: "2 weeks ago",
    verified: false,
    helpfulCount: 9,
  }
];