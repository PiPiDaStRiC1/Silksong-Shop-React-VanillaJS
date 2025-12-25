import user1 from '@/assets/images/previews/user1.png';
import user2 from '@/assets/images/previews/user2.png';
import user3 from '@/assets/images/previews/user3.png';

export const FEATURED_REVIEWS = [
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
]