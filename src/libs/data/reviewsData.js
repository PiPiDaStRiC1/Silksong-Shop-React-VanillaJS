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
      lastname: "Smith",
      location: "Hollownest, EU",
      rating: 4.8,
      stats: {
          reviews: 20,
          likes: 128,
          helpful: 28,
      },
      avatar: user1,
      bio: "Crafts cosplay props and hunts artisan merch; cares about premium finishes and safe packing.",
      verified: true,
      joined: "April 2020",
      reviews: [
          { id: 1, productId: 3, starCount: 5, helpfulCount: 12, content: "Finish is flawless, no paint bleed, and the box had foam corners. Exactly the collector-grade feel I wanted.", date: "2 weeks ago" },
          { id: 2, productId: 4, starCount: 5, helpfulCount: 9, content: "Metal parts are weighty, etching is crisp. Arrived with tamper seal and intact sleeve.", date: "1 month ago" },
          { id: 3, productId: 2, starCount: 5, helpfulCount: 7, content: "Colors match the photos, joints are tight, and the waxed wrap kept everything pristine.", date: "2 months ago" },
      ]
  },
  {
      id: 2, 
      name: "Bob", 
      lastname: "Johnson",
      location: "Hollownest, EU",
      rating: 4.9,
      stats: {
          reviews: 25,
          likes: 122,
          helpful: 39,
      },
      avatar: user2,
      bio: "Speedrunner who collects limited enamel pins; values fast dispatch and transparent tracking.",
      verified: true,
      joined: "March 2019",
      reviews: [
          { id: 1, productId: 4, starCount: 5, helpfulCount: 17, content: "Shipped next day, pin backs are sturdy and the black nickel finish looks premium on camera.", date: "2 weeks ago" },
          { id: 2, productId: 9, starCount: 4, helpfulCount: 10, content: "Packaging was clean, art print is sharp; slight corner ding but frame hides it.", date: "1 month ago" },
          { id: 3, productId: 5, starCount: 5, helpfulCount: 12, content: "Got tracking instantly, colors match the promo shots and the clasp doesn’t spin.", date: "2 months ago" },
      ]
  },
  {
      id: 3, 
      name: "Charlie", 
      lastname: "Davis",
      location: "Hollownest, EU",
      rating: 4.7,
      stats: {
          reviews: 19,
          likes: 123,
          helpful: 45,
      },
      avatar: user3,
      bio: "Curates display shelves with hand-painted figures; prefers matte metals and clean welds.",
      verified: true,
      joined: "July 2021",
      reviews: [
          { id: 1, productId: 3, starCount: 5, helpfulCount: 9, content: "Paint lines are neat, no gloss pools. Fits perfectly into my LED shelf without glare.", date: "2 weeks ago" },
          { id: 2, productId: 6, starCount: 4, helpfulCount: 17, content: "Chain is solid, welds are smooth; minor swirl on the backplate but invisible when worn.", date: "1 month ago" },
          { id: 3, productId: 11, starCount: 5, helpfulCount: 19, content: "Matte coating looks premium, magnet is strong, and foam insert was cut to size.", date: "2 months ago" },
      ]
  },
  {
    id: 4, 
    name: "Jason", 
    lastname: "Miller",
    location: "Hollownest, EU",
    rating: 4.6,
    stats: {
        reviews: 15,
        likes: 99,
        helpful: 24,
    },
    avatar: user4,
    bio: "Streamer who gifts merch to community; needs dependable packaging and stock alerts.",
    verified: false,
    joined: "June 2023",
    reviews: [
      { id: 1, productId: 12, starCount: 5, helpfulCount: 9, content: "Arrived before stream, zero dents. Audience loved the emboss and the included stand.", date: "2 weeks ago" },
      { id: 2, productId: 9, starCount: 4, helpfulCount: 7, content: "Poster colors pop on camera; tube had end caps, just a slight roll memory.", date: "1 month ago" },
      { id: 3, productId: 7, starCount: 5, helpfulCount: 8, content: "Charm backing card is thick, foil stamp looks luxe, perfect for giveaways.", date: "2 months ago" },
    ]
  },
  {
    id: 5, 
    name: "Peter", 
    lastname: "Wilson",
    location: "Hollownest, EU",
    rating: 4.7,
    stats: {
        reviews: 12,
        likes: 116,
        helpful: 25,
    },
    avatar: user5,
    bio: "Minimalist collector into monochrome pieces; loves precise engraving and tight tolerances.",
    verified: false,
    joined: "Feb 2020",
    reviews: [
      { id: 1, productId: 3, starCount: 5, helpfulCount: 10, content: "Line art is razor sharp, black-on-silver contrast is clean. Fits minimalist shelf perfectly.", date: "2 weeks ago" },
      { id: 2, productId: 7, starCount: 4, helpfulCount: 9, content: "Polish is even, no micro-scratches. One corner slightly soft, still display-worthy.", date: "1 month ago" },
      { id: 3, productId: 5, starCount: 5, helpfulCount: 6, content: "Engraving depth is consistent, clasp is snug, and the matte backplate feels premium.", date: "2 months ago" },
    ]
  },
  {
    id: 6, 
    name: "Maik", 
    lastname: "Anderson",
    location: "Hollownest, EU",
    rating: 4.5,
    stats: {
        reviews: 18,
        likes: 126,
        helpful: 39,
    },
    avatar: user6,
    bio: "New to the fandom; experiments with builds and wants honest quality and fair pricing.",
    verified: false,
    joined: "Jan 2024",
    reviews: [
      { id: 1, productId: 1, starCount: 5, helpfulCount: 15, content: "Good starter piece: sturdy, balanced weight, and the strap doesn’t peel after use.", date: "2 weeks ago" },
      { id: 2, productId: 6, starCount: 5, helpfulCount: 14, content: "Chain feels secure, plating hasn’t tarnished. Shipping box was double-walled.", date: "1 month ago" },
      { id: 3, productId: 2, starCount: 3, helpfulCount: 10, content: "Looks nice but clasp was tight out of box; loosened after a day. Still decent value.", date: "2 months ago" },
    ]
  },
  {
    id: 7,
    name: "Nova",
    lastname: "Reed",
    location: "Hollownest, EU",
    rating: 4.9,
    stats: {
      reviews: 22,
      likes: 140,
      helpful: 33,
    },
    avatar: user1,
    bio: "Focuses on limited drops and loves foil details; tracks every parcel until delivered.",
    verified: true,
    joined: "May 2019",
    reviews: [
      { id: 1, productId: 8, starCount: 5, helpfulCount: 11, content: "Foil layer shimmers without creases. Arrived flat with corner protectors intact.", date: "3 weeks ago" },
      { id: 2, productId: 10, starCount: 5, helpfulCount: 8, content: "Pin posts are straight, clutch holds firm, and the enamel fill is bubble-free.", date: "1 month ago" },
      { id: 3, productId: 6, starCount: 4, helpfulCount: 6, content: "Great chain weight, tiny swirl on the backplate but invisible when worn.", date: "2 months ago" },
    ],
  },
  {
    id: 8,
    name: "Sylas",
    lastname: "Thorn",
    location: "Hollownest, EU",
    rating: 4.6,
    stats: {
      reviews: 14,
      likes: 88,
      helpful: 21,
    },
    avatar: user2,
    bio: "Likes rugged builds and brushed metals; keeps merch on a travel rig for events.",
    verified: false,
    joined: "Nov 2022",
    reviews: [
      { id: 1, productId: 5, starCount: 5, helpfulCount: 7, content: "Brushed finish hides fingerprints, hinge is tight, and the latch clicks cleanly.", date: "1 week ago" },
      { id: 2, productId: 11, starCount: 4, helpfulCount: 5, content: "Good magnet strength, slight scuff on inner tray but nothing visible when closed.", date: "1 month ago" },
      { id: 3, productId: 4, starCount: 5, helpfulCount: 6, content: "Edge bevels are smooth, laser etch is deep. Survived a con trip in my pack.", date: "2 months ago" },
    ],
  },
  {
    id: 9,
    name: "Elena",
    lastname: "Frost",
    location: "Hollownest, EU",
    rating: 4.8,
    stats: {
      reviews: 17,
      likes: 132,
      helpful: 29,
    },
    avatar: user3,
    bio: "Photographs merch for socials; needs color-true prints and clean edges.",
    verified: true,
    joined: "Aug 2020",
    reviews: [
      { id: 1, productId: 9, starCount: 4, helpfulCount: 9, content: "Print is color-accurate, blacks are deep, and paper is thick enough for flat lays.", date: "2 weeks ago" },
      { id: 2, productId: 2, starCount: 4, helpfulCount: 7, content: "Shine is subtle; minor micro-scratch on back, not visible in shots.", date: "1 month ago" },
      { id: 3, productId: 12, starCount: 5, helpfulCount: 10, content: "Came with a rigid mailer; emboss catches light beautifully on camera.", date: "2 months ago" },
    ],
  },
  {
    id: 10,
    name: "Quinn",
    lastname: "Harper",
    location: "Hollownest, EU",
    rating: 4.4,
    stats: {
      reviews: 10,
      likes: 75,
      helpful: 18,
    },
    avatar: user4,
    bio: "Tests durability and wear; prefers pieces that survive daily carry.",
    verified: false,
    joined: "Oct 2023",
    reviews: [
      { id: 1, productId: 1, starCount: 2, helpfulCount: 6, content: "Held up in my bag all week. Minor edge shine developing, which I like.", date: "5 days ago" },
      { id: 2, productId: 7, starCount: 5, helpfulCount: 5, content: "Latch is solid, artwork hasn’t faded after pocket carry. Great everyday charm.", date: "3 weeks ago" },
      { id: 3, productId: 3, starCount: 4, helpfulCount: 4, content: "Good build, wish the clasp turned a bit smoother. Still worth the price.", date: "1 month ago" },
    ],
  },
  {
    id: 11,
    name: "Mara",
    lastname: "Keene",
    location: "Hollownest, EU",
    rating: 4.9,
    stats: {
      reviews: 21,
      likes: 150,
      helpful: 36,
    },
    avatar: user5,
    bio: "Curates gift boxes; values neat presentation and reliable stock.",
    verified: true,
    joined: "Dec 2018",
    reviews: [
      { id: 1, productId: 6, starCount: 5, helpfulCount: 10, content: "Came ribbon-wrapped, zero rattling in transit. Perfect for gifting without reboxing.", date: "2 weeks ago" },
      { id: 2, productId: 5, starCount: 4, helpfulCount: 9, content: "Engraving aligns perfectly, and the insert looks premium in a gift set.", date: "1 month ago" },
      { id: 3, productId: 11, starCount: 3, helpfulCount: 7, content: "Magnetic closure feels luxe; no dust inside, even after shipping.", date: "2 months ago" },
    ],
  },
  {
    id: 12,
    name: "Dorian",
    lastname: "Pike",
    location: "Hollownest, EU",
    rating: 4.3,
    stats: {
      reviews: 13,
      likes: 82,
      helpful: 19,
    },
    avatar: user6,
    bio: "Builds dioramas; seeks pieces with texture and consistent scale.",
    verified: false,
    joined: "Jan 2022",
    reviews: [
      { id: 1, productId: 8, starCount: 4, helpfulCount: 5, content: "Texture is nice and matte, scale matches the rest of my set. Slight seam on the base.", date: "3 weeks ago" },
      { id: 2, productId: 10, starCount: 2, helpfulCount: 6, content: "Pin size fits the diorama board, enamel colors read well under soft light.", date: "4 months ago" },
      { id: 3, productId: 2, starCount: 4, helpfulCount: 4, content: "Surface grain is subtle; would love a non-gloss option. Still solid for the price.", date: "10 months ago" },
    ],
  },
  {
    id: 13,
    name: "Lena",
    lastname: "Crow",
    location: "Hollownest, EU",
    rating: 4.7,
    stats: {
      reviews: 16,
      likes: 118,
      helpful: 27,
    },
    avatar: user1,
    bio: "Focuses on comfort and lightweight wear; tracks how pieces feel after hours.",
    verified: true,
    joined: "Sep 2021",
    reviews: [
      { id: 1, productId: 7, starCount: 2, helpfulCount: 8, content: "Featherlight, sits flush on a lanyard, and the clasp doesn’t pinch skin.", date: "1 week ago" },
      { id: 2, productId: 9, starCount: 3, helpfulCount: 5, content: "Print is light enough to carry daily; slight curl at arrival but flattened overnight.", date: "1 month ago" },
      { id: 3, productId: 1, starCount: 5, helpfulCount: 6, content: "Strap is soft, no rubbing after a full day. Stitching looks reinforced.", date: "2 months ago" },
    ],
  },
];

// Assign unique random 4-digit ids to each review item to avoid collisions
(() => {
  const used = new Set();
  const gen = () => {
    let n;
    do {
      n = Math.floor(1000 + Math.random() * 9000);
    } while (used.has(n));
    used.add(n);
    return n;
  };

  reviewsData.forEach(user => {
    if (Array.isArray(user.reviews)) {
      user.reviews.forEach(r => {
        r.id = gen();
      });
    }
  });
})();