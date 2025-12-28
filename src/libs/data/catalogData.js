// JSON format don`t work well for images, so we import them directly

import hero1 from '@/assets/images/FeaturedProducts/hero1.png';
import hero2 from '@/assets/images/FeaturedProducts/hero2.png';
import hero3 from '@/assets/images/FeaturedProducts/hero3.png';
import hero4 from '@/assets/images/FeaturedProducts/hero4.png';
import arcaneEgg from '@/assets/images/FeaturedCharms/arcaneEgg.png';
import choralCommandmenta from '@/assets/images/FeaturedCharms/choralCommandment.png';
import flintgem from '@/assets/images/FeaturedCharms/flintgem.png';
import hornetStatuette from '@/assets/images/FeaturedCharms/hornetStatuette.png';
import hunterHeart from '@/assets/images/FeaturedCharms/hunterHeart.png';
import maidenSoul from '@/assets/images/FeaturedCharms/maidenSoul.png';
import pollipHeart from '@/assets/images/FeaturedCharms/pollipHeart.png';
import ragpelt from '@/assets/images/FeaturedCharms/ragpelt.png';
import silverBell from '@/assets/images/FeaturedCharms/silverBell.png';
import vintageNectar from '@/assets/images/FeaturedCharms/vintageNectar.png'

export const catalogData = [
  { 
    id: 1, 
    name: "Black King's Cape", 
    price: 1000, 
    stock: 10,
    sale: 50,
    imgSrc: hero1, 
    category: 'dress',
    description: "A flowing black cape adorned with the royal insignia of Hallownest. Crafted from shadow-silk, this elegant garment was once worn by the Pale King's guards. Perfect for those who seek to embody the majesty and mystery of the ancient kingdom."
  },
  { 
    id: 2, 
    name: "Red Queen's Cape", 
    price: 1000, 
    stock: 5, 
    sale: 50,
    imgSrc: hero2,
    category: 'dress',
    description: "A striking crimson cape that echoes the passion and strength of Hallownest's nobility. Made from premium materials with intricate embroidery, this cape represents both elegance and power. An essential piece for collectors and fans alike."
  },
  { 
    id: 3, 
    name: "Black King's Armor Suite", 
    price: 1500, 
    stock: 0,
    sale: 50,
    imgSrc: hero3, 
    category: 'dress',
    description: "Complete armor set inspired by the Pale King's personal guard. Features detailed craftsmanship with reinforced plating and authentic design elements. This premium collectibles includes chest piece, pauldrons, and ceremonial accessories. Limited edition."
  },
  { 
    id: 4, 
    name: "Red Queen's Armor Suite", 
    price: 1500, 
    sale: 50,
    stock: 16,
    imgSrc: hero4, 
    category: 'dress',
    description: "Exquisite full armor set bearing the Queen's colors. Masterfully crafted with attention to every detail, from the ornate helmet to the flowing cape attachment. A statement piece that captures the regal essence of Hallownest's forgotten royalty."
  },
  { 
    id: 5, 
    name: 'Arcane Egg', 
    price: 120, 
    sale: false,
    stock: 0,
    imgSrc: arcaneEgg, 
    category: 'charms',
    description: "A mysterious egg containing unknown arcane power. This charms pulses with faint energy and is said to protect its bearer from dark magic. Found deep within the Crystal Peak, each egg is unique and hand-painted with mystical symbols."
  },
  { 
    id: 6,
    name: 'Choral Commandment', 
    price: 95, 
    stock: 4,
    sale: false,
    imgSrc: choralCommandmenta, 
    category: 'collectibles',
    description: "An ancient tablet inscribed with the forgotten hymns of Hallownest. When worn, this charms is believed to resonate with the voices of the past. Perfect for those who seek harmony with the kingdom's lost songs and memories."
  },
  { 
    id: 7, 
    name: 'Flintgem', 
    price: 80, 
    stock: 0,
    sale: 25,
    imgSrc: flintgem, 
    category: 'charms',
    description: "A rare crystalline charms forged from the minerals of Deepnest. Known for its durability and natural glow, the Flintgem is treasured by explorers. Each gem is naturally formed and polished to perfection, making no two pieces identical."
  },
  { 
    id: 9, 
    name: 'Hornet Statuette', 
    price: 220, 
    stock: 12,
    sale: 25,
    imgSrc: hornetStatuette, 
    category: 'collectibles',
    description: "Meticulously crafted figurine depicting the enigmatic protector of Hallownest. Hand-sculpted with incredible attention to detail, capturing Hornet's dynamic pose and signature needle. A must-have for serious collectors and fans of the silent guardian."
  },
  { 
    id: 10, 
    name: "Hunter's Heart", 
    price: 320, 
    stock: 10,
    sale: false,
    imgSrc: hunterHeart, 
    category: 'charms',
    description: "A powerful charms containing the essence of a true hunter. Said to sharpen instincts and increase awareness, this relic was passed down through generations of Hallownest's greatest trackers. Encased in protective amber with intricate metalwork."
  },
  { 
    id: 11, 
    name: "Maiden's Soul", 
    price: 320, 
    stock: 4,
    sale: 20,
    imgSrc: maidenSoul, 
    category: 'charms',
    description: "A delicate charms imbued with the gentle spirit of a forgotten maiden. Emanates a soft, calming aura and is crafted from ethereal materials found only in the Queen's Gardens. Comes with a certificate of authenticity and protective case."
  },
  { 
    id: 12, 
    name: 'Pollip Heart', 
    price: 320, 
    stock: 0,
    sale: 25,
    imgSrc: pollipHeart, 
    category: 'charms',
    description: "Rare charms formed from the crystallized essence of Hallownest's peculiar flying creatures. The Pollip Heart is known for its lightweight design and mesmerizing color shifts. Each piece is carefully extracted and preserved using ancient techniques."
  },
  { 
    id: 13, 
    name: 'Ragpelt', 
    price: 320, 
    stock: 25,
    sale: 50,
    imgSrc: ragpelt, 
    category: 'collectibles',
    description: "A rustic charms fashioned from the pelts of creatures dwelling in the kingdom's forgotten corners. Despite its humble appearance, the Ragpelt is highly valued for its connection to the wilds. Each piece tells a story of survival and resilience."
  },
  { 
    id: 14, 
    name: 'Silver Bell', 
    price: 320, 
    stock: 16,
    sale: 30,
    imgSrc: silverBell, 
    category: 'charms',
    description: "An ornate bell crafted from pure silver, once used in royal ceremonies. Its clear, haunting chime is said to echo across dimensions. Each bell is individually tuned and comes with a silk cord for wearing. A piece of Hallownest's ceremonial history."
  },
  { 
    id: 15, 
    name: 'Vintage Nectar', 
    price: 320, 
    stock: 0,
    sale: false,
    imgSrc: vintageNectar, 
    category: 'collectibles',
    description: "A sealed vial containing the legendary nectar of Hallownest's golden age. Though purely decorative, this charms captures the essence of prosperity and natural abundance. The bottle features intricate glasswork and a wax seal bearing the royal crest."
  },
];