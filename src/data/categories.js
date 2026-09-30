import frontPack from '../assets/images/tapua-front-pack.png';
import almondsImg from '../assets/images/almonds-california.jpg';
import teaCtcImg from '../assets/images/tea-ctc-assam.jpg';
import giftHamperImg from '../assets/images/gift-hamper-royal.jpg';
import healthySnacksImg from '../assets/images/healthy-snacks-mix.jpg';
import pumpkinSeedsImg from '../assets/images/pumpkin-seeds-green.jpg';
import makhanaPeriPeriImg from '../assets/images/makhana-peri-peri.jpg';

export const CATEGORIES = [
  {
    id: 'makhana',
    name: 'Raw White Makhana',
    shortName: 'Makhana',
    slug: 'makhana',
    description: 'Pristine harvest lotus seeds naturally grown in the serene freshwater wetlands of Mithila.',
    image: frontPack,
    imageFit: 'contain',
    itemCount: 5,
    featured: true,
    tagline: 'Pure & Unroasted'
  },
  {
    id: 'flavoured-makhana',
    name: 'Flavoured Makhana (Upcoming)',
    shortName: 'Flavoured Makhana',
    slug: 'flavoured-makhana',
    description: 'Artisanal roasted makhana seasoned with Peri Peri, Himalayan salt, and herbs. Pre-launch preview!',
    image: makhanaPeriPeriImg,
    imageFit: 'contain',
    itemCount: 2,
    featured: true,
    tagline: 'Gourmet Snacking'
  },
  {
    id: 'tea',
    name: 'Tea & Chai Patti',
    shortName: 'Tea & Chai',
    slug: 'tea',
    description: 'Royal Assam CTC leaf blend and Shahi Elaichi & Spices chai patti in luxury airtight canisters.',
    image: teaCtcImg,
    itemCount: 2,
    featured: true,
    tagline: 'Estate Harvest'
  },
  {
    id: 'dry-fruits',
    name: 'Dry Fruits',
    shortName: 'Dry Fruits',
    slug: 'dry-fruits',
    description: 'Sun-drenched figs, royal Medjool dates, and golden raisins packed with wholesome energy.',
    image: '/src/assets/images/medjool-dates.jpg',
    itemCount: 4,
    featured: true,
    tagline: 'Sun-Dried Goodness'
  },
  {
    id: 'nuts',
    name: 'Nuts',
    shortName: 'Nuts',
    slug: 'nuts',
    description: 'King-sized California almonds, gourmet whole cashews, and crunch-packed pistachios.',
    image: '/src/assets/images/cashews-w240.jpg',
    itemCount: 5,
    featured: true,
    tagline: 'Hand-Sorted Premium'
  },
  {
    id: 'seeds',
    name: 'Seeds',
    shortName: 'Seeds',
    slug: 'seeds',
    description: 'Nutrient-dense raw pumpkin seeds, organic chia, flax, and vitality seed blends.',
    image: pumpkinSeedsImg,
    itemCount: 3,
    featured: true,
    tagline: 'Daily Superfoods'
  },
  {
    id: 'healthy-snacks',
    name: 'Healthy Snacks',
    shortName: 'Healthy Snacks',
    slug: 'healthy-snacks',
    description: 'Guilt-free crunchy roasted superfood mixes with zero artificial additives.',
    image: healthySnacksImg,
    itemCount: 3,
    featured: true,
    tagline: 'Mindful Munching'
  },
  {
    id: 'gift-hampers',
    name: 'Gift Hampers',
    shortName: 'Gift Hampers',
    slug: 'gift-hampers',
    description: 'Luxurious gift boxes with royal brass-embossed finishes for festivals and celebration.',
    image: giftHamperImg,
    itemCount: 2,
    featured: true,
    tagline: 'Festive Luxury'
  }
];

export const OUR_RANGE = [
  {
    id: 'range-makhana',
    title: 'Makhana',
    subtitle: '5 products',
    count: '5 products',
    status: 'available',
    statusLabel: 'Available Now',
    description: '100% natural, unroasted single-origin GI-tagged Mithila Makhana sourced directly from Mallah farming communities.',
    image: frontPack,
    imageFit: 'contain',
    link: '/shop?category=makhana'
  },
  {
    id: 'range-dryfruits',
    title: 'Dry Fruits & Nuts',
    subtitle: 'Launching Soon',
    count: 'Launching Soon',
    status: 'coming-soon',
    statusLabel: 'Launching Soon',
    description: 'Hand-sorted California almonds, W240 cashews, Afghani wild figs, and Medjool dates curated for purity.',
    image: almondsImg,
    link: '/shop?category=nuts'
  },
  {
    id: 'range-pulses',
    title: 'Pulses',
    subtitle: 'Launching Soon',
    count: 'Launching Soon',
    status: 'coming-soon',
    statusLabel: 'Launching Soon',
    description: 'Unpolished native heritage dal and lentils grown without chemical fertilizers in fertile riverine plains.',
    image: healthySnacksImg,
    link: '#pulses'
  },
  {
    id: 'range-grains',
    title: 'Heritage Grains',
    subtitle: 'Launching Soon',
    count: 'Launching Soon',
    status: 'coming-soon',
    statusLabel: 'Launching Soon',
    description: 'Indigenous ancient millets, Himalayan red rice, and climate-resilient grains from native biodiversity farms.',
    image: pumpkinSeedsImg,
    link: '#grains'
  },
  {
    id: 'range-tea',
    title: 'Tea & Coffee',
    subtitle: 'Launching Soon',
    count: 'Launching Soon',
    status: 'coming-soon',
    statusLabel: 'Launching Soon',
    description: 'Estate-harvested Royal Assam CTC blend and Shahi Elaichi Masala chai crafted with crushed whole spices.',
    image: teaCtcImg,
    link: '/shop?category=tea'
  },
  {
    id: 'range-gifts',
    title: 'Gift Sets',
    subtitle: 'Launching Soon',
    count: 'Launching Soon',
    status: 'coming-soon',
    statusLabel: 'Launching Soon',
    description: 'Artisanal Madhubani-embossed festive keepsake boxes filled with reusable gold-lidded glass jars.',
    image: giftHamperImg,
    link: '/shop?category=gift-hampers'
  }
];
