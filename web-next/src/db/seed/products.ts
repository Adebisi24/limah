import { photo as p, prod } from './media';

export interface ProductOfferSeed {
  retailer: string;
  price: number | null;
  url: string;
  availability?: 'in-stock' | 'unavailable';
}

export interface ProductSeed {
  name: string;
  brand: string;
  img: string;
  alt: string;
  desc: string;
  specs?: Record<string, string>;
  offers: ProductOfferSeed[];
}

const s = (q: string) =>
  q
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
const rz = (r: string, q: string) => {
  switch (r) {
    case 'Amazon':
      return `https://www.amazon.com/s?k=${encodeURIComponent(s(q))}`;
    case 'Wayfair':
      return `https://www.wayfair.com/keyword.php?keyword=${encodeURIComponent(s(q))}`;
    case 'Walmart':
      return `https://www.walmart.com/search?q=${encodeURIComponent(s(q))}`;
    case 'Crate & Barrel':
      return `https://www.crateandbarrel.com/search?q=${encodeURIComponent(s(q))}`;
    case 'West Elm':
      return `https://www.westelm.com/search?q=${encodeURIComponent(s(q))}`;
    case 'CB2':
      return `https://www.cb2.com/search?q=${encodeURIComponent(s(q))}`;
    default:
      return `https://www.article.com/search?q=${encodeURIComponent(s(q))}`;
  }
};

const o = (
  retailer: string,
  price: number | null,
  query: string,
  availability?: 'in-stock' | 'unavailable',
): ProductOfferSeed => ({
  retailer,
  price,
  url: rz(retailer, query),
  availability,
});

export const productSeeds: ProductSeed[] = [
  /* ---------------- Bedside lamps (Best Products article) ---------------- */
  {
    name: 'Terra Ribbed Ceramic Table Lamp',
    brand: 'Corteza Studio',
    img: prod(p.lampA),
    alt: 'Ribbed ceramic table lamp glowing on a wooden nightstand',
    desc: 'A warm-glazed ceramic base with soft vertical ribbing and a natural fabric shade. Reads as handmade without looking decorative.',
    specs: {
      Height: '15 in',
      'Shade diameter': '10 in',
      Material: 'Glazed ceramic, cotton shade',
    },
    offers: [
      o('Amazon', 139, 'ribbed ceramic table lamp'),
      o('West Elm', 148, 'ribbed ceramic lamp'),
    ],
  },
  {
    name: 'Halo Dome Table Lamp',
    brand: 'Meridian Home',
    img: prod(p.lampC),
    alt: 'Dome-shaped table lamp casting warm light in a bedroom at night',
    desc: 'A wide, low dome shade that pools light gently across the wall behind a bed — the kind of fixture that makes a room feel lit from inside.',
    specs: {
      Height: '13 in',
      'Shade width': '14 in',
      Material: 'Powder-coated steel, linen',
    },
    offers: [o('Crate & Barrel', 179, 'dome table lamp bedroom')],
  },
  {
    name: 'Fen Paper Table Lamp',
    brand: 'Nordlys',
    img: prod(p.lampB),
    alt: 'Paper-shade table lamp beside a bed with dark bedding',
    desc: 'A lightweight washi paper shade over a slim oak base. Diffuses light beautifully and keeps a small nightstand from feeling crowded.',
    specs: { Height: '16 in', Shade: 'Washi paper', Material: 'Oak' },
    offers: [
      o('Wayfair', 149, 'paper table lamp oak'),
      o('Amazon', 159, 'washi paper table lamp'),
    ],
  },
  {
    name: 'Aria Linen Table Lamp',
    brand: 'Corteza Studio',
    img: prod(p.lampE),
    alt: 'Simple linen-shade table lamp on a rustic bedside table',
    desc: 'The quiet workhorse of the group: a slim base, a natural linen drum, and a light that is soft enough for reading and wind-down alike.',
    specs: { Height: '14 in', Shade: 'Natural linen drum' },
    offers: [o('Amazon', 95, 'linen drum table lamp')],
  },
  {
    name: 'Haven Basic Ceramic Lamp',
    brand: 'Haven & Pine',
    img: prod(p.lampF),
    alt: 'Small ceramic table lamp with folded linens on a bedside table',
    desc: 'A no-frills glazed ceramic lamp at a genuine budget price. It is not sculptural, but the finish and proportion are honest for the cost.',
    specs: { Height: '13 in', Finish: 'Matte glaze' },
    offers: [
      o('Amazon', 34, 'ceramic table lamp'),
      o('Walmart', 36, 'small ceramic table lamp'),
    ],
  },
  {
    name: 'Sculpt Raw Clay Table Lamp',
    brand: 'Atelier Noma',
    img: prod(p.lampG),
    alt: 'Sculptural raw clay lamp in a warmly lit bedroom',
    desc: 'An unglazed, hand-shaped clay base that doubles as decor. It is the statement option — and it is priced like one.',
    specs: { Height: '17 in', Material: 'Raw clay, hand-formed' },
    offers: [o('CB2', 219, 'sculptural clay table lamp')],
  },
  {
    name: 'Arc Mini Floor Lamp',
    brand: 'Nordlys',
    img: prod(p.lampI),
    alt: 'Slim floor lamp with a small shade beside a bed',
    desc: 'For rooms where the nightstand is too small (or already full). The low-profile arc reaches over the edge of the bed without eating floor space.',
    specs: { Height: '38 in', Reach: '12 in over base' },
    offers: [
      o('Wayfair', 89, 'mini arc floor lamp'),
      o('Walmart', 95, 'small floor lamp bedside'),
    ],
  },

  /* ---------------- Amazon Bedroom Finds ---------------- */
  {
    name: 'Velvet Storage Ottoman',
    brand: 'Home Basics',
    img: prod(p.chairA),
    alt: 'Plush bouclé ottoman at the foot of a bed',
    desc: 'A bench, a footstool, and a bin for overflow blankets — hidden inside. The top-stitched velvet hides a lot of everyday life.',
    offers: [o('Amazon', 59, 'velvet storage ottoman bench')],
  },
  {
    name: 'Linen-Blend Duvet Cover Set',
    brand: 'Calm & Co',
    img: prod(p.beddingA),
    alt: 'Crisp white duvet with crumpled texture on a bed',
    desc: "The 'just-woke-up-in-a-nice-hotel' look for under fifty dollars. Stiffer than true linen, but it holds its shape and washes well.",
    offers: [o('Amazon', 49, 'linen blend duvet cover set')],
  },
  {
    name: 'Rattan Wall Mirror',
    brand: 'Home Basics',
    img: prod(p.mirrorE),
    alt: 'Round rattan mirror above a wooden dresser with baskets',
    desc: 'A round woven mirror that bounces light back into a room. Works over a console, a dresser, or a bare wall that needs a focal point.',
    offers: [o('Amazon', 42, 'round rattan wall mirror')],
  },
  {
    name: 'Woven Jute Area Rug 5×7',
    brand: 'Fiber & Frame',
    img: prod(p.rugA),
    alt: 'Natural jute rug on a wooden bedroom floor',
    desc: 'An affordable natural-fiber rug that grounds a bed and adds texture underfoot. Dense enough for daily use, casual enough to forgive.',
    offers: [o('Amazon', 89, 'jute area rug 5x7')],
  },
  {
    name: 'Stackable Seagrass Baskets (Set of 3)',
    brand: 'Fiber & Frame',
    img: prod(p.basketB),
    alt: 'Three woven seagrass baskets on a white shelf',
    desc: 'The workhorse of bedroom organization: laundry, linens, the drawer of things that have no home yet. They stack when you need the shelf back.',
    offers: [o('Amazon', 29, 'stackable seagrass baskets set of 3')],
  },
  {
    name: 'Bouclé Throw Blanket',
    brand: 'Calm & Co',
    img: prod(p.beddingG),
    alt: 'Folded bouclé throw and stacked pillows on a bed',
    desc: 'A plush, looped-weave throw that instantly makes a bed look styled. Machine-washable and soft on day one.',
    offers: [o('Amazon', 34, 'boucle throw blanket')],
  },
  {
    name: 'Warm White LED Bulbs (4-Pack)',
    brand: 'Lumina',
    img: prod(p.lampD),
    alt: 'Bedside table lamp glowing warm at night',
    desc: 'The cheapest lighting upgrade there is. 2700K warm-white bulbs make an entire room feel softer than the fluorescent-white defaults.',
    specs: { Temperature: '2700K', Wattage: '6W (60W equivalent)' },
    offers: [o('Amazon', 16, '2700k warm white led bulbs')],
  },
  {
    name: 'Ceramic Vase Trio',
    brand: 'Terra Form',
    img: prod(p.vaseA),
    alt: 'Three neutral ceramic vases arranged together',
    desc: 'Three different heights of hand-thrown stoneware. A set like this turns a plain nightstand into a styled vignette in one move.',
    offers: [o('Amazon', 27, 'ceramic vase set of 3 neutral')],
  },
  {
    name: 'Waxed Canvas Laundry Hamper',
    brand: 'Haven & Pine',
    img: prod(p.basketG),
    alt: 'Canvas-lined wicker hamper in a warm interior',
    desc: 'A structured hamper that looks like furniture rather than a laundry bag. The waxed canvas shrugs off the occasional damp shirt.',
    offers: [o('Amazon', 45, 'waxed canvas laundry hamper')],
  },
  {
    name: 'Walnut Bedside Tray',
    brand: 'Grain Goods',
    img: prod(p.kitchenF),
    alt: 'Wooden tray with bowls and a small vase on a counter',
    desc: 'A shallow walnut tray keeps the phone, water glass, and one book from scattering across the nightstand. Corneilles-proof by design.',
    offers: [o('Amazon', 18, 'walnut bedside tray')],
  },
  {
    name: 'Linen Pillowcases (2-Pack)',
    brand: 'Calm & Co',
    img: prod(p.beddingH),
    alt: 'Soft linen sheets and pillows from above',
    desc: 'Breathable stonewashed linen at a price that makes it easy to keep spare sets on hand. Softens more with every wash.',
    offers: [o('Amazon', 24, 'stonewashed linen pillowcases 2 pack')],
  },
  {
    name: 'Faux Olive Tree, 4 ft',
    brand: 'Fern & Frond',
    img: prod(p.mirrorD),
    alt: 'Olive tree in a pot beside a reading corner',
    desc: 'The no-water version of the most photographed plant in interiors. Dense, low, and happy in a bedroom corner that gets little light.',
    offers: [o('Amazon', 52, 'faux olive tree 4 foot')],
  },
  {
    name: 'Pleated Linen Drape Set',
    brand: 'Calm & Co',
    img: prod(p.drapeE),
    alt: 'Sunlight through textured linen curtains',
    desc: 'Deep-pleat linen drapes that hang cleanly without ironing. Blackout lining on request — worth it for early risers.',
    offers: [o('Amazon', 68, 'pleated linen curtains set')],
  },
  {
    name: 'Reed Diffuser Set',
    brand: 'Maison Verre',
    img: prod(p.vaseD),
    alt: 'Minimal reed diffuser in a neutral interior',
    desc: "A quiet scent layer for the room. This set's eucalyptus-cedar blend is close enough to a real room scent to be believable.",
    offers: [o('Amazon', 19, 'reed diffuser eucalyptus cedar')],
  },
  {
    name: 'Bouclé Accent Chair',
    brand: 'Forma',
    img: prod(p.chairE),
    alt: 'Bright armchair with a folded blanket in a reading corner',
    desc: 'A compact reading chair that fits beside a bed or in the corner of a bigger bedroom. The bouclé fabric is the whole point, and it holds up.',
    offers: [o('Amazon', 129, 'boucle accent chair')],
  },

  /* ---------------- Bedroom storage finds ---------------- */
  {
    name: 'Under-Bed Storage Bags (3-Pack)',
    brand: 'Tidy',
    img: prod(p.smallA),
    alt: 'Compact modern bedroom with a slim profile',
    desc: 'Zippered, clear-front bags that reclaim the deepest dead space in the room. Duvet covers, off-season pillows, and the suitcase all fit.',
    offers: [o('Amazon', 25, 'under bed storage bags 3 pack')],
  },
  {
    name: 'Seagrass Storage Basket Set',
    brand: 'Fiber & Frame',
    img: prod(p.basketA),
    alt: 'Two woven baskets inside a wooden cabinet',
    desc: 'Open-weave seagrass baskets for shelves and the floor. Breathable, so they never trap that musty-storage smell.',
    offers: [o('Amazon', 32, 'seagrass storage baskets')],
  },
  {
    name: 'Wicker Closet Divider',
    brand: 'Tidy',
    img: prod(p.basketE),
    alt: 'Hanging wicker baskets in a closet',
    desc: 'Hangs from a standard closet rod and splits one cavernous wall into two manageable columns. No drilling, no hardware.',
    offers: [o('Amazon', 28, 'wicker closet divider hanging')],
  },
  {
    name: 'Woven Bedside Basket',
    brand: 'Fiber & Frame',
    img: prod(p.basketF),
    alt: 'Woven baskets in a warm-toned room',
    desc: 'A shallow basket that catches the nightstand clutter — books, chargers, the second water glass — without looking like a mess.',
    offers: [o('Amazon', 22, 'woven bedside catch-all basket')],
  },
  {
    name: 'Over-Door Hanging Organizer',
    brand: 'Tidy',
    img: prod(p.basketD),
    alt: 'Handwoven baskets catching sunlight',
    desc: 'Sixteen pockets that turn the back of a bedroom door into a drawer unit. Jewelry, accessories, cables, and the mail pile.',
    offers: [o('Amazon', 19, 'over door hanging organizer 16 pocket')],
  },
  {
    name: 'Linen Bedding Storage Bags',
    brand: 'Calm & Co',
    img: prod(p.basketC),
    alt: 'Soft textiles in a linen storage bag with a plant',
    desc: 'Lined linen bags sized for comforter sets. Keep spare duvet covers dry and scented between rotations — they double as hamper-style decor.',
    offers: [o('Amazon', 38, 'linen bedding storage bags')],
  },

  /* ---------------- Throw blankets ---------------- */
  {
    name: 'Merino Wool Throw',
    brand: 'North Weave',
    img: prod(p.beddingG),
    alt: 'Merino wool throw folded on a bed with pillows',
    desc: 'The weight and hand-feel of a proper wool throw at a mid-range price. Warm without overheating, and it drapes like a hotel bed finish.',
    specs: { Material: '100% merino wool', Size: '50×70 in' },
    offers: [
      o('West Elm', 129, 'merino wool throw blanket'),
      o('Amazon', 118, 'merino wool throw 50x70'),
    ],
  },
  {
    name: 'Waffle Knit Cotton Throw',
    brand: 'Calm & Co',
    img: prod(p.beddingH),
    alt: 'Waffle-textured cotton bedding in soft light',
    desc: 'Open waffle weave that stays cool in summer and layers well in winter. The best year-round throw for mixed-season climates.',
    offers: [o('Amazon', 49, 'waffle knit cotton throw')],
  },
  {
    name: 'Chunky Bouclé Throw',
    brand: 'Forma',
    img: prod(p.chairE),
    alt: 'Chunky bouclé throw draped over an armchair',
    desc: 'Thick, looped, and unapologetically plush. This is the throw you drape over a chair to style the room, not the one you sleep with.',
    offers: [o('Crate & Barrel', 59, 'chunky boucle throw')],
  },
  {
    name: 'Linen-Blend Layer Throw',
    brand: 'Calm & Co',
    img: prod(p.beddingE),
    alt: 'Crumpled green linen bedding close-up',
    desc: 'A crinkled linen-cotton blend that gets better looking with every rumple. Sits over a duvet like a well-worn layer, never a blanket.',
    offers: [o('CB2', 85, 'linen blend throw blanket')],
  },
  {
    name: 'Cashmere-Soft Fleece Throw',
    brand: 'North Weave',
    img: prod(p.chairD),
    alt: 'Cozy corner with armchair, warm lamp light, and a soft throw',
    desc: 'Brushed fleece with a cashmere-like hand for a fraction of the price. The cold-morning favorite for a reason.',
    offers: [o('Wayfair', 65, 'brushed fleece throw blanket')],
  },

  /* ---------------- Area rugs ---------------- */
  {
    name: 'Handwoven Jute Rug',
    brand: 'Fiber & Frame',
    img: prod(p.rugA),
    alt: 'Natural jute rug anchoring a wooden bedroom',
    desc: 'A tightly woven natural jute with a low profile that fits under most bed frames. The most forgiving natural rug for real bedrooms.',
    specs: { Material: 'Natural jute', Profile: 'Low pile' },
    offers: [
      o('Wayfair', 189, 'handwoven jute rug bedroom'),
      o('Amazon', 175, 'jute rug 8x10'),
    ],
  },
  {
    name: 'Flatweave Wool Rug',
    brand: 'North Weave',
    img: prod(p.rugB),
    alt: 'Flatweave rug in a bedroom with an armchair and wall art',
    desc: 'A flat-woven wool with a subtle tonal pattern. Underfoot, it is plush but firm — the kind of rug you can live on, not just look at.',
    offers: [o('Crate & Barrel', 249, 'flatweave wool rug')],
  },
  {
    name: 'Berber-Style Wool Rug',
    brand: 'North Weave',
    img: prod(p.rugC),
    alt: 'Textured wool rug beside a carved wooden bed',
    desc: 'The classic Moroccan cut-and-pile pattern, softened. Adds visual texture to a room of all-smooth surfaces without a bold print.',
    offers: [o('Amazon', 159, 'berber style wool rug')],
  },
  {
    name: 'Kilim Accent Rug',
    brand: 'Fiber & Frame',
    img: prod(p.rugD),
    alt: 'Patterned flat kilim rug on a wooden floor',
    desc: 'A flat kilim with a geometric repeat that reads as pattern from the bed and texture from the doorway. Great in a guest room.',
    offers: [o('West Elm', 129, 'kilim rug geometric')],
  },
  {
    name: 'Soft Shag Wool Rug',
    brand: 'North Weave',
    img: prod(p.rugE),
    alt: 'Soft shag rug in a bright bedroom',
    desc: 'A medium-pile shag for rooms where bare wood gets underfoot. Pricier to clean, but the comfort-to-cost ratio is hard to beat.',
    offers: [o('CB2', 229, 'shag wool rug')],
  },

  /* ---------------- Bed frames with storage ---------------- */
  {
    name: 'Olive Platform Bed with Drawers',
    brand: 'Forma',
    img: prod(p.neutralD),
    alt: 'Low wooden platform bed in a warm modern bedroom',
    desc: 'A low oak platform with three full-width drawers. The profile disappears under a duvet; the storage does the heavy lifting.',
    specs: { Sizes: 'Queen / King', Storage: '3 full-width drawers' },
    offers: [o('Wayfair', 549, 'oak platform bed with drawers')],
  },
  {
    name: 'Ash Storage Bed with Trundle',
    brand: 'Forma',
    img: prod(p.smallF),
    alt: 'Minimalist ash bed frame in a small bedroom',
    desc: 'A slim ash frame with a rolling trundle for guests. The cleanest answer for a bedroom that doubles as a guest room.',
    offers: [o('Amazon', 499, 'ash storage bed with trundle')],
  },
  {
    name: 'Upholstered Storage Bed',
    brand: 'Meridian Home',
    img: prod(p.neutralE),
    alt: 'Upholstered bed with soft lighting in a minimal bedroom',
    desc: 'A buttoned-up upholstered frame with a lift-top compartment that swallows two comforter sets. The softest visual, the biggest volume.',
    offers: [o('Crate & Barrel', 699, 'upholstered storage bed lift top')],
  },
  {
    name: 'Oak Platform Bed with Lift',
    brand: 'Grain Goods',
    img: prod(p.minimalF),
    alt: 'Oak bed frame beside a beige nightstand and lamp',
    desc: 'A solid oak platform with a gas-lift storage compartment. Heavier build than the upholstered options; the lift mechanism is smooth.',
    offers: [o('West Elm', 849, 'oak bed frame with storage lift')],
  },
  {
    name: 'Narrow Storage Bed for Small Rooms',
    brand: 'Tidy',
    img: prod(p.smallD),
    alt: 'Compact bedroom with a slim bed and built-in shelving',
    desc: 'A 24-inch-deep frame sized for studio and small bedrooms, with side drawers that clear the walkway. Proof that storage and slim can coexist.',
    offers: [o('Walmart', 399, 'narrow bed frame with storage')],
  },

  /* ---------------- Duvet sets ---------------- */
  {
    name: 'Stonewashed Cotton Duvet Set',
    brand: 'Calm & Co',
    img: prod(p.beddingA),
    alt: 'Stonewashed white cotton duvet with rumpled texture',
    desc: 'Pre-softened stonewashed cotton that skips the breaking-in period. The most forgiving premium-feel duvet set in the group.',
    specs: { Material: 'Stonewashed cotton', 'Thread count': '300' },
    offers: [o('Amazon', 189, 'stonewashed cotton duvet cover set')],
  },
  {
    name: 'Washed Linen Duvet Set',
    brand: 'Calm & Co',
    img: prod(p.beddingE),
    alt: 'Washed linen duvet in a muted green tone',
    desc: 'True washed linen: cool in summer, warm in winter, and it improves with age. Wrinkles are the aesthetic — embrace them.',
    offers: [o('CB2', 219, 'washed linen duvet cover set')],
  },
  {
    name: 'Organic Cotton Percale Set',
    brand: 'Calm & Co',
    img: prod(p.beddingB),
    alt: 'Crisp percale bedding in a bright bedroom',
    desc: 'Crisp, cool, and hotel-sharp. Percale is the pick for anyone who runs hot at night and wants that just-made-bed snap.',
    offers: [o('West Elm', 149, 'organic cotton percale duvet set')],
  },
  {
    name: 'Brushed Micro-Percale Set',
    brand: 'Calm & Co',
    img: prod(p.beddingC),
    alt: 'Geometric pillows on a made bed',
    desc: 'Micro-percale brushed for a softer hand than standard percale. A strong mid-budget pick that photographs as much better than it costs.',
    offers: [o('Amazon', 99, 'micro percale duvet set')],
  },
  {
    name: 'Waffle-Weave Cotton Set',
    brand: 'Calm & Co',
    img: prod(p.beddingF),
    alt: 'Waffle-weave cotton linens on a wooden bed',
    desc: 'An open waffle weave that breathes on hot nights and layers under a comforter on cold ones. The texture reads from across the room.',
    offers: [o('Walmart', 85, 'waffle weave cotton duvet set')],
  },

  /* ---------------- Kitchen storage containers ---------------- */
  {
    name: 'Glass Food Storage Jars (12-Pack)',
    brand: 'Grain Goods',
    img: prod(p.pantryB),
    alt: 'Clear glass jars filled with pantry goods on a shelf',
    desc: 'Uniform airtight jars that make a pantry read as organized the moment they go on the shelf. The lids are genuinely airtight.',
    offers: [o('Amazon', 28, 'glass food storage jars 12 pack')],
  },
  {
    name: 'Airtight Canister Set',
    brand: 'Grain Goods',
    img: prod(p.pantryA),
    alt: 'Coordinated canisters filling a kitchen cabinet',
    desc: 'A matched set of four canisters in four sizes. Coffee, tea, pasta, and the snack drawer all get a home.',
    offers: [o('Amazon', 42, 'airtight canister set kitchen')],
  },
  {
    name: 'Stoneware Lidded Bowls',
    brand: 'Terra Form',
    img: prod(p.pantryD),
    alt: 'Stacked stoneware bowls on rustic shelves',
    desc: 'Hand-glazed stoneware bowls that stack and seal. Prettier than plastic on an open shelf, sturdier than most pottery.',
    offers: [o('Wayfair', 36, 'stoneware lidded storage bowls')],
  },
  {
    name: 'Silicone Stretch Lids (Set of 8)',
    brand: 'Tidy',
    img: prod(p.pantryF),
    alt: 'Labeled jars on a shelf with a small plant',
    desc: 'Stretch-on lids for jars, bowls, and the cut avocado. The small swap that cuts a surprising amount of single-use wrap.',
    offers: [o('Amazon', 18, 'silicone stretch lids set')],
  },
  {
    name: 'Pantry Label Set',
    brand: 'Tidy',
    img: prod(p.pantryE),
    alt: 'Labeled glass jars on wooden shelves',
    desc: 'Fifty-four chalk-style labels that finish the pantry transformation. Write once, benefit every time the shelf is opened.',
    offers: [o('Amazon', 14, 'pantry labels set chalk style')],
  },

  /* ---------------- Bathroom storage ---------------- */
  {
    name: 'Floating Bamboo Shelf',
    brand: 'Grain Goods',
    img: prod(p.bathH),
    alt: 'Warm wood and neutral tile in a modern bathroom',
    desc: 'A 24-inch floating bamboo shelf that replaces the counter with the wall. Holds the daily-five without looking like a shelf.',
    offers: [o('Amazon', 39, 'floating bamboo shelf bathroom')],
  },
  {
    name: 'Rattan Towel Basket',
    brand: 'Fiber & Frame',
    img: prod(p.basketF),
    alt: 'Woven rattan basket ready for towels',
    desc: 'A woven basket for dry towels that keeps them off the floor and out of the cabinet. The rattan texture keeps it from feeling like a laundry hamper.',
    offers: [o('Amazon', 24, 'rattan towel basket')],
  },
  {
    name: 'Linen Bath Towel Set (4-Piece)',
    brand: 'Calm & Co',
    img: prod(p.basketG),
    alt: 'Soft linen towels folded in a warm setting',
    desc: 'A four-piece cotton-linen set that dries fast and softens fast. Heavier than a drugstore towel, lighter than a waffle.',
    offers: [o('Amazon', 58, 'cotton linen bath towel set')],
  },

  /* ---------------- Living room decor ---------------- */
  {
    name: 'Sunburst Mirror',
    brand: 'Forma',
    img: prod(p.mirrorC),
    alt: 'Sunburst mirrors arranged on a white wall',
    desc: 'A radiating sunburst frame that pulls an empty wall together. Works single or doubled over a console.',
    offers: [o('Amazon', 62, 'sunburst wall mirror')],
  },
  {
    name: 'Stoneware Table Lamp',
    brand: 'Terra Form',
    img: prod(p.vaseG),
    alt: 'Small stoneware lamp beside ceramic vases',
    desc: 'A low stoneware lamp with a paper shade — sized for a coffee table, entry table, or the corner of a dresser.',
    offers: [o('Wayfair', 48, 'stoneware table lamp small')],
  },
  {
    name: 'Book & Display Tray Set',
    brand: 'Grain Goods',
    img: prod(p.vaseF),
    alt: 'Styled still life with ceramic objects and a tray',
    desc: 'A walnut display tray plus two stacked hardcovers — the fastest way to make any surface look intentional.',
    offers: [o('Amazon', 34, 'walnut display tray book stack')],
  },
  {
    name: 'Round Wall Clock',
    brand: 'Meridian Home',
    img: prod(p.mirrorF),
    alt: 'Round minimal wall clock on a warm beige wall',
    desc: 'A quiet round clock with a slim frame. The kind of small object that fills the gap above a console or in a hallway.',
    offers: [o('Amazon', 29, 'minimal round wall clock')],
  },

  /* ---------------- Buying-guide supporting products ---------------- */
  {
    name: 'Halo Wall Sconce (Pair)',
    brand: 'Meridian Home',
    img: prod(p.sconce),
    alt: 'Pair of warm wall sconces in an elegant bedroom',
    desc: 'A simple up/down sconce pair for either side of a headboard. Adds ambient height without occupying nightstand real estate.',
    specs: { Mount: 'Hardwired, pair', Temperature: 'Use 2700K bulbs' },
    offers: [o('Amazon', 79, 'wall sconce pair bedroom headboard')],
  },
];
