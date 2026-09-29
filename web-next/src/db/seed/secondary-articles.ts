import { photo as p, px } from './media';
import type { ArticleSeed } from './seed-types';

const idea = (
  number: number,
  title: string,
  src: string,
  alt: string,
  text: string[],
) =>
  ({
    type: 'idea',
    number,
    title,
    src,
    alt,
    text,
  }) as const;

export const secondaryArticles: ArticleSeed[] = [
  /* ============================================================ BEDROOM IDEAS */
  {
    slug: '15-small-bedroom-ideas-that-maximize-space',
    format: 'inspiration',
    title: '15 Small Bedroom Ideas That Maximize Space',
    subtitle:
      'Small bedrooms reward the same move over and over: make vertical, hide horizontal, and keep sightlines clear.',
    category: 'Bedroom',
    room: 'bedroom',
    keywords:
      'small bedroom ideas, maximize space, studio bedroom, tiny bedroom design',
    image: px(p.smallA),
    imageAlt: 'Compact modern bedroom with a slim profile and mirrored wall',
    description:
      'Fifteen space-smart ideas for small bedrooms, from slim furniture profiles and vertical storage to mirrors, light palettes, and multi-job pieces.',
    author: 'Maya Ellison',
    publishedAt: '2026-02-01',
    tags: [
      'bedroom',
      'small-spaces',
      'small-space-organization',
      'storage-ideas',
      'design-ideas',
    ],
    body: [
      {
        type: 'prose',
        text: 'A small bedroom is a design problem with a fair answer: use the walls, hide the floor clutter, and let light do the enlarging. These fifteen ideas are ordered roughly by impact-per-dollar, so you can stop whenever the budget runs out.',
      },
      idea(
        1,
        'Choose a bed with a slim or upholstered headboard',
        px(p.smallF, 1000, 640),
        'Slim bed frame in a small minimalist bedroom',
        [
          'A low or upholstered headboard removes the visual wall that makes small rooms feel boxed in. The room gains headroom the moment it goes.',
        ],
      ),
      idea(
        2,
        'Hang the mirror on the window wall',
        px(p.smallA, 1000, 640),
        'Large mirror in a compact bright bedroom',
        [
          'A mirror opposite or beside the window doubles the light source. It is the single cheapest way to make a room feel a foot wider.',
        ],
      ),
      idea(
        3,
        'Go vertical with one tall piece',
        px(p.smallG, 1000, 640),
        'Small bedroom with built-in vertical shelving',
        [
          'One tall, narrow cabinet or shelf unit pulls the eye up and replaces three pieces of furniture. Tall beats wide in every small room.',
        ],
      ),
      idea(
        4,
        'Let the rug run under the bed',
        px(p.rugE, 1000, 640),
        'Soft rug extending beyond a small bed',
        [
          'A rug that runs partially under the bed unifies the floor into one surface. The room reads as one space instead of bed-plus-fragments.',
        ],
      ),
      idea(
        5,
        'Paint the ceiling the same warm white as the walls',
        px(p.smallC, 1000, 640),
        'Small bedroom with light bedding and sheer light',
        [
          "Removing the ceiling line by one tone erases the 'box' feeling. Warm white keeps it calm; pure white can make small rooms feel clinical.",
        ],
      ),
      idea(
        6,
        'Swap the dresser for a narrow, deep console',
        px(p.smallB, 1000, 640),
        'Small bedroom with slim wooden storage',
        [
          'A low, narrow console stores the same items as a dresser at a third of the wall width. You lose depth, gain floor, and the room breathes.',
        ],
      ),
      idea(
        7,
        'Use a bed frame with drawers',
        px(p.neutralD, 1000, 640),
        'Low storage bed in a compact warm bedroom',
        [
          'Under-bed drawers are small-bedroom infrastructure. Every drawer is a nightstand or dresser you do not have to buy.',
        ],
      ),
      {
        type: 'tip',
        title: 'Design Tip',
        text: 'The one-inch rule for small rooms: keep at least 10 inches of clear floor on the walkway side of the bed. Less than that and the room stops feeling walkable — which is how it starts feeling small.',
      },
      idea(
        8,
        'Float the nightstand',
        px(p.smallE, 1000, 640),
        'Small bedroom with slim floating storage and a gray bed',
        [
          'A floating shelf at nightstand height gives you the surface and the legroom. Your feet fit under it, and the floor line stays clean.',
        ],
      ),
      idea(
        9,
        'Choose curtains that go ceiling to floor',
        px(p.drapeB, 1000, 640),
        'Small bedroom with tall windows and light drapery',
        [
          'The same trick as in bigger rooms, with bigger payoff here: tall drapes make the ceiling feel higher, which is the dimension small rooms lose.',
        ],
      ),
      idea(
        10,
        'Keep one wall completely bare',
        px(p.smallD, 1000, 640),
        'Calm small bedroom with an uncluttered wall',
        [
          'A room of four busy surfaces feels twice as small. One bare wall gives the eye a rest — and makes the other three read as intentional.',
        ],
      ),
      idea(
        11,
        'Tuck the reading chair into the corner',
        px(p.chairC, 1000, 640),
        'Compact armchair in a bedroom corner',
        [
          "A corner is dead space in a small room until it is a reading spot. One chair, one small lamp, and the corner becomes the room's best seat.",
        ],
      ),
      idea(
        12,
        'Hide the hamper inside a piece of furniture',
        px(p.smallH, 1000, 640),
        'Small bedroom with concealed storage and soft lighting',
        [
          'A bench with storage or a cabinet with a hidden bin removes the laundry bag from the visual equation. Out of sight is genuinely out of small.',
        ],
      ),
      idea(
        13,
        'Use a smaller, round side table',
        px(p.minimalD, 1000, 640),
        'Small round side table beside a neutral bed',
        [
          'A 16-inch round table fits beside a narrow bed where a square would not, and its silhouette is smaller than its usefulness.',
        ],
      ),
      idea(
        14,
        'Let one statement object take the space of three',
        px(p.vaseC, 1000, 640),
        'Single sculptural vase arrangement',
        [
          'Three small knickknacks occupy more visual space than one confident object. In a small room, edit the surfaces the way you edit the wardrobe.',
        ],
      ),
      idea(
        15,
        'End with warm, layered lighting',
        px(p.lampH, 1000, 640),
        'Warm softly lit small bedroom at dusk',
        [
          'Small rooms live and die by their evening light. Two low warm lamps beat one overhead every time — dim it down and the room feels larger at 9 p.m. than it did at 9 a.m.',
        ],
      ),
      {
        type: 'prose',
        text: 'You do not need all fifteen. The mirror, the vertical piece, the storage bed, and the warm lighting are the four that move the needle most — and they are also the four that pay for themselves every day you are in the room.',
      },
    ],
  },
  {
    slug: '12-warm-neutral-bedroom-ideas',
    format: 'inspiration',
    title: '12 Warm Neutral Bedroom Ideas',
    subtitle:
      'Warm neutrals are the palette that makes a bedroom feel like a place to exhale. Here is how to build one that stays calm and never goes beige-bland.',
    category: 'Bedroom',
    room: 'bedroom',
    keywords:
      'warm neutral bedroom, beige bedroom palette, taupe bedroom, warm color scheme bedroom',
    image: px(p.neutralA),
    imageAlt: 'Warm inviting bedroom with natural materials and soft light',
    description:
      'Twelve ways to build a warm neutral bedroom: the right shades of sand and clay, material layering, and the accents that keep a tonal room from going flat.',
    author: 'Maya Ellison',
    publishedAt: '2026-01-25',
    tags: [
      'bedroom',
      'color-paint',
      'design-styles',
      'warm-neutral',
      'design-ideas',
    ],
    featured: true,
    body: [
      {
        type: 'prose',
        text: 'A warm neutral bedroom works when it is really a family of colors, not one. Choose your base in the sand-to-taupe range, add wood for warmth, and bring in two or three accent tones from nature — clay, olive, walnut — and the room stays calm without flattening out.',
      },
      idea(
        1,
        'Pick your base paint in the sand-to-taupe range',
        px(p.neutralA, 1000, 640),
        'Warm taupe walls in a soft bedroom',
        [
          "Warm whites with a sandy cast read as 'walls' and let the bedding do the styling. Test at 4 p.m. — that is when warm neutrals show their true, sometimes pink, self.",
        ],
      ),
      idea(
        2,
        'Let the wood tone set the temperature',
        px(p.neutralD, 1000, 640),
        'Oak furniture anchoring a warm neutral bedroom',
        [
          'If your floors are red oak, lean into honey-toned woods. If they are gray ash, keep the furniture a half-step warmer so the room does not drift cool.',
        ],
      ),
      idea(
        3,
        'Build the bed in three close shades',
        px(p.neutralC, 1000, 640),
        'Bedding layered in three close neutral tones',
        [
          "Base in the lightest tone, middle in the room's exact wall tone, top in the darkest. The gradient is what makes a tonal bed look layered instead of plain.",
        ],
      ),
      idea(
        4,
        'Introduce clay in small, solid doses',
        px(p.vaseF, 1000, 640),
        'Terracotta-toned ceramics on a warm surface',
        [
          "A clay-colored vase or two, a rust throw pillow, a terracotta tray. Solid clay tones are the fastest way to stop a warm neutral room reading as 'unfinished.'",
        ],
      ),
      idea(
        5,
        'Use olive or moss as the green',
        px(p.beddingE, 1000, 640),
        'Muted green linen bedding in a calm room',
        [
          'Olive reads as natural and grounding inside a warm palette. A green linen duvet or one moss throw pillow is enough — green is a support player here.',
        ],
      ),
      idea(
        6,
        'Keep metal hardware in brushed brass',
        px(p.lampF, 1000, 640),
        'Brass-toned details beside a made bed',
        [
          'Brushed brass warms up every other material in the room. If your room is all chrome and glass, that is the problem — swap one or two fixtures first.',
        ],
      ),
      idea(
        7,
        'Layer natural fibers over smooth surfaces',
        px(p.beddingG, 1000, 640),
        'Textured throw over crisp bedding',
        [
          'Linen, bouclé, jute, wool — at least three fiber families across the bed and rug. Warm neutrals without texture look like a waiting room.',
        ],
      ),
      {
        type: 'tip',
        title: 'Design Tip',
        text: 'The 60/30/10 split keeps warm rooms from going flat: 60% your base sand tone, 30% the wood and secondary neutrals, 10% the accent (clay, olive, or walnut). If the room looks beige-bland, the 10% is missing.',
      },
      idea(
        8,
        'Hang one piece of art with warm, muted color',
        px(p.neutralF, 1000, 640),
        'Muted floral artwork over a neutral bed',
        [
          'A single painting in ochres, clays, and soft greens does the job of a gallery wall. It gives the wall a temperature the paint alone could not.',
        ],
      ),
      idea(
        9,
        'Choose a natural-fiber rug a half-step darker than the floor',
        px(p.rugA, 1000, 640),
        'Jute rug on warm wood flooring',
        [
          'Jute, sisal, or a natural wool in a tone slightly deeper than the floor grounds the bed and adds warmth underfoot without introducing a new color.',
        ],
      ),
      idea(
        10,
        'Keep glass and mirrors clear, not mirrored-antique',
        px(p.mirrorE, 1000, 640),
        'Clear round mirror with a woven frame',
        [
          'Antique-gold glass adds a yellow cast that fights the palette. Clear glass and thin warm frames keep the light honest.',
        ],
      ),
      idea(
        11,
        'Style the nightstand with ceramics, not plastic',
        px(p.vaseA, 1000, 640),
        'Neutral ceramic vases as nightstand styling',
        [
          'Stoneware in the same sand family as the walls makes the small objects feel like part of the room instead of purchased separately.',
        ],
      ),
      idea(
        12,
        'Finish with candlelight-toned bulbs',
        px(p.lampA, 1000, 640),
        'Warm glowing bedside lamp',
        [
          '2700K, on a dimmer. Warm neutral bedrooms are built for the evening, and the evening is won or lost by the bulb temperature.',
        ],
      ),
      {
        type: 'prose',
        text: "The finish line for a warm neutral bedroom is simple: stand in the doorway at 8 p.m., and the room should feel like the temperature dropped two degrees without the heat being touched. If it reads as 'beige and undecided,' add the 10% — the clay, the olive, the brass — until it reads as 'warm and intentional.'",
      },
    ],
  },
  {
    slug: '8-minimalist-bedroom-ideas-that-still-feel-warm',
    format: 'inspiration',
    title: '8 Minimalist Bedroom Ideas That Still Feel Warm',
    subtitle:
      'Minimalism fails in bedrooms when it mistakes empty for calm. These eight ideas keep the editing but keep the warmth.',
    category: 'Bedroom',
    room: 'bedroom',
    keywords:
      'minimalist bedroom, warm minimal bedroom, japandi bedroom, calm bedroom design',
    image: px(p.minimalC),
    imageAlt: 'Minimalist bedroom in neutral tones with soft lighting',
    description:
      'Eight moves that keep a minimalist bedroom calm and edited — while staying warm enough to actually sleep in: fiber, wood, one accent, and layered low light.',
    author: 'Maya Ellison',
    publishedAt: '2026-01-15',
    tags: [
      'bedroom',
      'minimalist',
      'scandinavian',
      'design-ideas',
      'design-styles',
    ],
    body: [
      {
        type: 'prose',
        text: 'A warm minimalist bedroom is an editing exercise with a temperature setting. You keep fewer things, but the things you keep have texture, wood, and light in them. Here are the eight moves that keep the calm without the cold.',
      },
      idea(
        1,
        'Choose one wood tone and repeat it',
        px(p.minimalF, 1000, 640),
        'Consistent oak tones across a minimalist bedroom',
        [
          'Bed, nightstand, and one shelf in the same wood family. Repetition is what makes minimal feel finished rather than temporary.',
        ],
      ),
      idea(
        2,
        'Let the bedding be the color story',
        px(p.minimalC, 1000, 640),
        "Soft neutral bedding as the room's color",
        [
          'Walls quiet, wood quiet, and the bed carries a tone two steps deeper than the room. One warm statement, contained to where you look first.',
        ],
      ),
      idea(
        3,
        'Keep two lamps, both at the same height',
        px(p.lampB, 1000, 640),
        'Matching paper lamps beside a bed',
        [
          'Symmetry is a minimalist tool. Two identical lamps read as one calm decision; two different heights read as an accident.',
        ],
      ),
      idea(
        4,
        'Use one open shelf instead of a cabinet row',
        px(p.minimalB, 1000, 640),
        'Minimal bedroom with a single open display',
        [
          'One open shelf with five objects beats a wall of closed cabinets for warmth. Open surfaces invite the eye; closed ones shut it out.',
        ],
      ),
      idea(
        5,
        'Add a single living element',
        px(p.mirrorD, 1000, 640),
        'Plant in a calm minimal corner',
        [
          'One pot, one branch, one vine. A minimal room without any organic shape starts to feel like architecture — one plant fixes the whole register.',
        ],
      ),
      idea(
        6,
        'Pick a rug with texture, not pattern',
        px(p.rugE, 1000, 640),
        'Textured neutral rug in a minimal bedroom',
        [
          'A shag or a tight natural weave adds warmth the eye registers before the brain does. Pattern is a budget; texture is the move.',
        ],
      ),
      {
        type: 'tip',
        title: 'Design Tip',
        text: "Minimal rooms need a 'soft spot' — one place in the room where your eye lands on something with give: a bouclé chair, a wool throw, a linen curtain. Pick one and make it generous.",
      },
      idea(
        7,
        'Dress the window with linen, not blinds',
        px(p.drapeE, 1000, 640),
        'Linen drapes softening a minimal window',
        [
          'Blinds make a minimal room efficient; linen makes it liveable. The same minimal line, one degree warmer.',
        ],
      ),
      idea(
        8,
        'Finish with a warm, single-cord lighting scene',
        px(p.minimalH, 1000, 640),
        'Warm floor lamps in a light minimal bedroom',
        [
          'Two bedside lamps plus one low floor lamp, all on 2700K, and the ceiling off. The evening scene is where minimal rooms prove they are not cold ones.',
        ],
      ),
      {
        type: 'prose',
        text: 'Minimal and warm are not opposites — minimal and *unlayered* are. Edit the objects, keep the fibers, repeat the wood, and the room will be quieter and cozier than the room before.',
      },
    ],
  },
  {
    slug: '10-bedroom-headboard-ideas',
    format: 'inspiration',
    title: '10 Bedroom Headboard Ideas',
    subtitle:
      "The headboard is the largest 'decor' object in the room. Ten ways to make it work — built, upholstered, or borrowed from elsewhere entirely.",
    category: 'Bedroom',
    room: 'bedroom',
    keywords:
      'headboard ideas, upholstered headboard, headboard wall, bed frame design',
    image: px(p.luxuryC),
    imageAlt: 'Bed with a plush upholstered headboard in a modern room',
    description:
      'Ten headboard approaches — from a full upholstered wall to a floating plank and a repurposed door — with notes on which suits which room.',
    author: 'Maya Ellison',
    publishedAt: '2025-12-20',
    tags: ['bedroom', 'design-ideas', 'furniture', 'traditional'],
    body: [
      {
        type: 'prose',
        text: 'The headboard is where the bed meets the wall, which makes it the largest single styling decision in a bedroom after the paint. Here are ten approaches, from the simplest to the most committed.',
      },
      idea(
        1,
        'The upholstered wall panel',
        px(p.luxuryC, 1000, 640),
        'Full upholstered headboard wall in a plush bedroom',
        [
          "A padded panel from wall to wall (or headboard width) reads as the most 'designed' option. Best in rooms where the headboard wall is the one you see from the door.",
        ],
      ),
      idea(
        2,
        'The wood slat backdrop',
        px(p.neutralD, 1000, 640),
        'Wooden slat headboard against a warm wall',
        [
          'Vertical slats behind a simple frame add rhythm and height without softness. The right answer for a room that is already upholstered elsewhere.',
        ],
      ),
      idea(
        3,
        'The floating plank',
        px(p.smallG, 1000, 640),
        'Simple floating wood plank as a headboard',
        [
          "A single solid plank, floated on brackets. It is the minimalist's headboard: one material, one line, done.",
        ],
      ),
      idea(
        4,
        'The painted accent panel',
        px(p.luxuryB, 1000, 640),
        'Bed against a subtly different toned wall panel',
        [
          'No furniture at all — just a section of wall painted a tone deeper, or wrapped in paintable wainscot. The cheapest option that still reads as intentional.',
        ],
      ),
      idea(
        5,
        'The repurposed door or screen',
        px(p.drapeC, 1000, 640),
        'Vintage screen hung behind a bed',
        [
          'An old door, a folding screen, a panel from a dismantled wardrobe — hung behind the bed. It is the headboard that tells a story and costs the least.',
        ],
      ),
      idea(
        6,
        'The cane or rattan frame',
        px(p.mirrorE, 1000, 640),
        'Rattan-framed headboard echoing woven decor',
        [
          'A woven frame softens a modern room the way fabric would, but with structure. It also visually lightens the wall, which small rooms like.',
        ],
      ),
      idea(
        7,
        'The upholstered, unattached board',
        px(p.luxuryE, 1000, 640),
        'Upholstered board headboard on a platform bed',
        [
          "A freestanding padded board that leans against the wall. Renters' favorite: substantial look, zero mounting, moves with the bed.",
        ],
      ),
      idea(
        8,
        "The bench-height 'half' headboard",
        px(p.luxuryG, 1000, 640),
        'Low upholstered headboard in a spacious bedroom',
        [
          'A short upholstered section that sits under the lamp line. It keeps the wall visible above — good when the wall carries art or a window.',
        ],
      ),
      idea(
        9,
        'The art-instead-of-headboard',
        px(p.neutralF, 1000, 640),
        'Large artwork hung where a headboard would be',
        [
          'A low bed, no headboard, and one large piece of art on the wall. Bold, and it works best when the art is wide rather than tall.',
        ],
      ),
      idea(
        10,
        'The built-in with integrated lighting',
        px(p.luxuryD, 1000, 640),
        'Built-in headboard with ambient lighting',
        [
          'A built-in panel with a concealed light strip behind the top edge. The most permanent option — and the one that makes a bedroom feel like a boutique hotel.',
        ],
      ),
      {
        type: 'prose',
        text: 'If you are choosing one: upholstered for warmth, wood slat for rhythm, floating plank for quiet, painted panel for budget. And if the headboard wall is the first thing you see from the door, spend there — every other wall can wait.',
      },
    ],
  },
  {
    slug: '8-bedroom-lighting-ideas-that-set-the-mood',
    format: 'inspiration',
    title: '8 Bedroom Lighting Ideas That Set the Mood',
    subtitle:
      'Mood in a bedroom is 80% lighting. Eight setups, from the two-lamp classic to the headboard glow, with the bulb notes for each.',
    category: 'Bedroom',
    room: 'bedroom',
    keywords:
      'bedroom lighting ideas, bedside lamp placement, ambient bedroom light, moody bedroom',
    image: px(p.lampD),
    imageAlt: 'Bedside lamp glowing in a dim, cozy bedroom',
    description:
      "Eight bedroom lighting setups that change the whole room's mood — layered bedside light, headboard sconces, paper shades, and the dimmer rules that tie them together.",
    author: 'Maya Ellison',
    publishedAt: '2026-01-08',
    tags: ['bedroom', 'lighting', 'design-ideas'],
    body: [
      {
        type: 'prose',
        text: "The same bedroom feels like a hotel, a nursery, and a clinic depending on which lights are on. These eight setups are the ones that reliably produce the 'calm' feeling — and the bulb notes for each, because the fixture is only half the decision.",
      },
      idea(
        1,
        'The two-lamp classic',
        px(p.lampA, 1000, 640),
        'Matching bedside lamps glowing on both sides',
        [
          'Two identical warm lamps, one each side, ceiling off. The default for a reason: symmetric, flattering, and it frames the bed. Bulb note: 2700K, 600–800 lumens each.',
        ],
      ),
      idea(
        2,
        'The headboard sconce wash',
        px(p.sconce, 1000, 640),
        'Sconces washing the wall above a headboard',
        [
          "A pair of sconces above the headboard pushes light up the wall — the 'glow' that makes a room look expensive. Keep the bedside lamps small or skip them.",
        ],
      ),
      idea(
        3,
        'The paper-shade lantern',
        px(p.lampB, 1000, 640),
        'Washi paper lamp with a soft glow',
        [
          'A paper shade diffuses into a lantern-like glow that reads softer than any fabric at the same wattage. The best single-lamp option for a one-side setup.',
        ],
      ),
      idea(
        4,
        'The floor-lamp corner',
        px(p.minimalH, 1000, 640),
        'Slim floor lamp in a bright bedroom corner',
        [
          'A slim floor lamp in the reading corner takes the light off the nightstand entirely. Good for small tables and for rooms where the corner feels bare.',
        ],
      ),
      idea(
        5,
        'The single pendant over a side table',
        px(p.luxuryA, 1000, 640),
        'Pendant lamps low over bedside tables',
        [
          'A low pendant or semi-flush fixture over a bedside console. Modern, clean, and it frees the table surface completely. Bulb note: exposed bulb, 2700K, dimmable.',
        ],
      ),
      idea(
        6,
        'The hidden-strip built-in',
        px(p.luxuryD, 1000, 640),
        'Concealed warm strip behind a headboard',
        [
          'An LED strip concealed behind a floating headboard or shelf gives the room a halo. The most hotel-like option; needs a dimmer or it glows too evenly.',
        ],
      ),
      idea(
        7,
        'The candle-height table lamp',
        px(p.lampF, 1000, 640),
        'Low table lamp with a small glow',
        [
          'A lamp under 12 inches tall puts the light at candle level. Not for reading; for the 11 p.m. light that lets you see without waking your brain.',
        ],
      ),
      {
        type: 'tip',
        title: 'Design Tip',
        text: 'One dimmer per room is the floor, not the ceiling. If you can only put a dimmer on one circuit, make it the bedside pair — that is the light you actually use at night.',
      },
      idea(
        8,
        'The layered evening scene',
        px(p.lampH, 1000, 640),
        'Multiple low warm lights in an evening bedroom',
        [
          "Two bedside lamps at 40%, one floor lamp off, sconces at 30%, ceiling off. The scene — not any single fixture — is what 'mood' actually is.",
        ],
      ),
      {
        type: 'prose',
        text: 'Start with setup one or two, get the bulbs right, and add layers as the room asks for them. The rule that never breaks: the lower the light, the calmer the room — so when in doubt, buy shorter and dimmer.',
      },
    ],
  },
  {
    slug: '7-bedroom-rug-ideas-that-ground-the-room',
    format: 'inspiration',
    title: '7 Bedroom Rug Ideas That Ground the Room',
    subtitle:
      'The rug is the layer the whole room rests on. Seven size, texture, and placement moves that make a bedroom feel finished.',
    category: 'Bedroom',
    room: 'bedroom',
    keywords:
      'bedroom rug, area rug size bed, rug placement bedroom, jute rug bedroom',
    image: px(p.rugB),
    imageAlt: 'Flatweave rug extending beyond a bed with an armchair',
    description:
      'Seven rug decisions for bedrooms — correct sizing, natural fibers, under-bed anchoring, and the placements that make small rooms feel larger.',
    author: 'Maya Ellison',
    publishedAt: '2025-12-10',
    tags: ['bedroom', 'design-ideas', 'furniture', 'scandinavian'],
    body: [
      {
        type: 'prose',
        text: 'A bedroom without a rug reads as furniture-on-floor; with the right one, it reads as a room. Here are the seven decisions that matter, in roughly the order you should make them.',
      },
      idea(
        1,
        'Size it for the walkway, not the bed',
        px(p.rugB, 1000, 640),
        'Rug running 24 inches beyond both sides of the bed',
        [
          "The number: at least 24 inches of rug beyond each side of the bed in a standard room. A rug that stops at the bed's edge visually shrinks the room.",
        ],
      ),
      idea(
        2,
        'Anchor it under the bed in small rooms',
        px(p.rugE, 1000, 640),
        'Rug partially under a small bed',
        [
          "In a bedroom under 10×12, run the rug under the bed and only out the front. It unifies the floor into one surface and hides the 'island' effect.",
        ],
      ),
      idea(
        3,
        'Choose natural fiber for wood floors',
        px(p.rugA, 1000, 640),
        'Jute rug on a warm wooden floor',
        [
          'Jute, sisal, or natural wool over wood keeps the palette in one family. Pattern is fine over carpet; texture is the better move over hard floors.',
        ],
      ),
      idea(
        4,
        'Go low pile for platform beds',
        px(p.smallF, 1000, 640),
        'Low profile rug with a platform bed',
        [
          'Low or flatweave piles sit clean under platform and storage beds. Thick shag under a low frame looks like an accident and catches the drawers.',
        ],
      ),
      idea(
        5,
        'Use the rug to set the color temperature',
        px(p.rugC, 1000, 640),
        'Warm textured rug softening a minimal room',
        [
          'A room of cool whites and a warm rug is the fastest temperature fix in interiors. If the room feels gray, the rug is usually the lever.',
        ],
      ),
      idea(
        6,
        'Layer a small flatweave over a large natural',
        px(p.rugD, 1000, 640),
        'Layered rugs at the foot of the bed',
        [
          'A smaller kilim or flatweve layered at the foot of the bed over a larger jute adds depth for the price of one small rug. Keep the layers in the same family.',
        ],
      ),
      idea(
        7,
        'Keep the rug away from the door swing',
        px(p.smallA, 1000, 640),
        'Rug placement in a compact bedroom',
        [
          "Measure the door's arc before buying. A rug that sits under the door's path gets ridden daily and looks tired within a season.",
        ],
      ),
      {
        type: 'prose',
        text: 'If you remember two things: size for the walkway (24 inches out), and texture over pattern on hard floors. Everything else — color, layering, pile — follows the room once those two are right.',
      },
    ],
  },
  {
    slug: '9-bedroom-wall-decor-ideas',
    format: 'inspiration',
    title: '9 Bedroom Wall Decor Ideas',
    subtitle:
      'Walls are where a bedroom gets its second layer. Nine approaches — from one large painting to a shadow box — that keep the room calm.',
    category: 'Bedroom',
    room: 'bedroom',
    keywords:
      'bedroom wall decor, artwork over bed, bedroom gallery, wall styling',
    image: px(p.neutralF),
    imageAlt: 'Muted artwork on a bedroom wall above a soft bed',
    description:
      'Nine ways to decorate bedroom walls without cluttering them: single large art, tonal groupings, mirrors, panels, and the spacing rules that make it read as calm.',
    author: 'Maya Ellison',
    publishedAt: '2025-11-28',
    tags: ['bedroom', 'design-ideas', 'traditional', 'design-styles'],
    body: [
      {
        type: 'prose',
        text: 'A bedroom wall should do one of two jobs: rest the eye, or give it one good thing to look at. These nine approaches are the ones that do either without turning the room into a gallery.',
      },
      idea(
        1,
        'One large piece over the bed',
        px(p.neutralF, 1000, 640),
        'Large muted painting over a neutral bed',
        [
          'A single wide piece at roughly two-thirds the width of the headboard. The most reliable option — it scales with the bed and never competes.',
        ],
      ),
      idea(
        2,
        'The tonal pair',
        px(p.luxuryB, 1000, 640),
        'Two matching-tone artworks side by side',
        [
          'Two pieces in the same palette, hung 2–3 inches apart. More rhythm than one piece, half the commitment of a gallery wall.',
        ],
      ),
      idea(
        3,
        'The mirror as decor',
        px(p.mirrorA, 1000, 640),
        'Large round mirror on a neutral wall',
        [
          'A large clear mirror counts as wall decor when it catches a window. Place it where it reflects light, not where it reflects the closet.',
        ],
      ),
      idea(
        4,
        'The shadow box',
        px(p.vaseC, 1000, 640),
        'Small objects displayed in a shadow box frame',
        [
          'A deep frame with three or four small objects — a stone, a ticket, a sprig. It is the personal option that stays visually quiet.',
        ],
      ),
      idea(
        5,
        'The painted panel',
        px(p.luxuryB, 1000, 640),
        'A section of wall painted a deeper tone',
        [
          'No object at all: a painted rectangle or arch behind the bed. The wall itself becomes the decor, and the room gets a built-in focal point.',
        ],
      ),
      idea(
        6,
        'The textile on the wall',
        px(p.drapeE, 1000, 640),
        'Textile layering softening a bedroom wall',
        [
          'A hung textile — a woven throw, a small tapestry — adds warmth a frame cannot. Best in rooms that are already full of hard surfaces.',
        ],
      ),
      idea(
        7,
        'The shelf as a frame',
        px(p.minimalB, 1000, 640),
        'A single shelf with five edited objects',
        [
          'One floating shelf, five objects, done. It is wall decor and storage at once — the efficient option for rooms that need both.',
        ],
      ),
      idea(
        8,
        'The window-wall treatment',
        px(p.drapeB, 1000, 640),
        'Window wall with tall drapes as the feature',
        [
          'In a room where the window is the wall, the drapery is the decor. Go tall, go full, and keep everything else on that wall clear.',
        ],
      ),
      idea(
        9,
        'Leave one wall bare',
        px(p.smallD, 1000, 640),
        'A deliberately bare wall in a calm bedroom',
        [
          'The most underrated wall-decor idea is the absence of it. One bare wall makes the other three read as composed.',
        ],
      ),
      {
        type: 'prose',
        text: 'The spacing rule for all of it: whatever is above the bed sits 8–12 inches above the headboard, and nothing hangs higher than eye level when standing at the foot of the bed. Follow those two and almost any of the nine works.',
      },
    ],
  },
  {
    slug: 'how-to-make-your-bedroom-feel-like-a-hotel',
    format: 'howto',
    title: 'How to Make Your Bedroom Feel Like a Hotel',
    subtitle:
      'Hotels do five specific things to a bedroom that most homes skip. Do them, in this order, and the room changes register.',
    category: 'Advice',
    room: 'bedroom',
    keywords:
      'hotel style bedroom, make bedroom feel like hotel, hotel bedding',
    image: px(p.luxuryB),
    imageAlt: 'Hotel-style bedroom with crisp bedding and artwork',
    description:
      'The five moves hotels make — the bedding size-up, the hidden placket, the layered light, the tray, and the quiet palette — applied to a home bedroom.',
    author: 'Maya Ellison',
    publishedAt: '2025-12-27',
    tags: ['bedroom', 'design-ideas', 'advice', 'luxury'],
    body: [
      {
        type: 'prose',
        text: 'Stand in a good hotel bedroom and the room reads as one decision. Five moves do most of that work, and all five translate to a home bedroom with ordinary purchases.',
      },
      { type: 'heading', text: '1. Size the bedding up' },
      {
        type: 'prose',
        text: "Hotels run the duvet a size up so it pools at the sides and drapes the foot. That drape is the single most 'hotel' thing on a bed. A home bed in a set that fits exactly will always read as a bed; a bed in a set that drapes reads as a bedroom.",
      },
      { type: 'heading', text: '2. Keep the bed made to one standard' },
      {
        type: 'prose',
        text: 'One crisp line at the top third, the throw folded flat, the pillows stacked in two layers. The standard matters more than the linen — a rumpled-but-intentional bed reads as styled, and a made-but-inconsistent one reads as rushed.',
      },
      { type: 'heading', text: '3. Light it in layers, and dim it' },
      {
        type: 'prose',
        text: "The ceiling is the guest light, not the room light. Hotels run bedside lamps and low accents at 2700K and keep the overhead off or at 40%. The evening scene is what 'hotel' actually is — the bed is just what it happens around.",
      },
      { type: 'heading', text: '4. Put a tray on the nightstand' },
      {
        type: 'prose',
        text: 'One tray per side, holding the phone, the water, the one book. The tray is the detail guests photograph and never name — it is what turns a surface that is used into a surface that is styled.',
      },
      { type: 'heading', text: '5. Hold the palette to one warm family' },
      {
        type: 'prose',
        text: 'Walls, wood, and bedding in one warm family, with a single accent shade in small doses. Hotels avoid color variety on purpose — the calm you feel in the room is the palette doing its job.',
      },
      {
        type: 'tip',
        title: 'The Order Matters',
        text: 'Do the bedding size-up and the lighting first — those two moves produce 80% of the effect. The tray and the palette are the refinements that make it hold up close.',
      },
      {
        type: 'prose',
        text: "Five moves, one standard, and a room that reads as a decision. That is the entire hotel formula — and it survives a busy week in a way that 'decor projects' usually do not.",
      },
    ],
  },
  /* ============================================================ BEDROOM ADVICE / ORG */
  {
    slug: '15-small-bedroom-storage-ideas',
    format: 'howto',
    title: '15 Small Bedroom Storage Ideas',
    subtitle:
      'Fifteen ways to add real storage to a small bedroom — under the bed, over the door, inside the furniture, and along the walls you are not using.',
    category: 'Home Organization',
    room: 'bedroom',
    keywords:
      'small bedroom storage, bedroom organization, under bed storage, closet organization',
    image: px(p.smallG),
    imageAlt: 'Small bedroom with built-in shelves and tidy storage',
    description:
      'Fifteen storage solutions sized for small bedrooms: under-bed systems, over-door organizers, vertical cabinets, and furniture that stores while it decorates.',
    author: 'Priya Shah',
    publishedAt: '2026-02-07',
    tags: [
      'bedroom',
      'bedroom-organization',
      'storage-ideas',
      'small-space-organization',
      'decluttering',
    ],
    popular: true,
    body: [
      {
        type: 'prose',
        text: 'Small bedroom storage follows one law: the space you have is vertical, under the bed, and inside the door. These fifteen ideas work that space hard, ordered from the moves that add the most capacity first.',
      },
      idea(
        1,
        'Under-bed drawers or bags',
        px(p.smallA, 1000, 640),
        'Under-bed storage in a compact bedroom',
        [
          'The single biggest storage gain available. Three zippered bags or a drawer frame reclaims 40+ cubic feet that currently holds dust. Rule: sleepwear and off-season items only — anything you need daily belongs on reachable surfaces.',
        ],
      ),
      idea(
        2,
        'A tall, narrow cabinet',
        px(p.smallG, 1000, 640),
        'Tall narrow storage cabinet in a small room',
        [
          'One 18-inch-wide, 72-inch-tall cabinet out-stores a full dresser. It is the small-bedroom workhorse, and it pulls the eye up, which is a bonus.',
        ],
      ),
      idea(
        3,
        'The over-door organizer',
        px(p.basketD, 1000, 640),
        'Hanging storage on a door',
        [
          'Sixteen pockets on the back of a door is a drawer unit for accessories, jewelry, and the drawer of small things. Zero floor space used.',
        ],
      ),
      idea(
        4,
        'A bed frame with built-in drawers',
        px(p.neutralD, 1000, 640),
        'Storage bed with drawers',
        [
          'If the bed is being replaced anyway, buy the storage frame. Three full-width drawers replace an entire dresser for most people.',
        ],
      ),
      idea(
        5,
        'Floating shelves over the door',
        px(p.smallE, 1000, 640),
        "Floating shelves above a small room's entry",
        [
          'The space above a bedroom door is dead air in most rooms. Two floating shelves make it a library or a linens shelf.',
        ],
      ),
      idea(
        6,
        'The storage ottoman at the foot of the bed',
        px(p.chairA, 1000, 640),
        "Ottoman with hidden storage at the bed's foot",
        [
          "A bench that opens. It takes the blanket pile, the bag you keep by the door, and the books you will 'read someday' — out of sight.",
        ],
      ),
      idea(
        7,
        'The vertical closet divider',
        px(p.basketE, 1000, 640),
        'Hanging divider organizing a closet rod',
        [
          'Hangs from the existing rod and doubles one wall of hanging space. In a closet with one door, this is often the difference between organized and not.',
        ],
      ),
      {
        type: 'tip',
        title: 'Organization Tip',
        text: "Every item should have a home that is in the same room it is used. The 'bedroom hamper' that holds mail is not a hamper — it is a filing cabinet with wrong instructions.",
      },
      idea(
        8,
        'A nightstand with a real drawer',
        px(p.minimalD, 1000, 640),
        'Nightstand with a single drawer',
        [
          'Skip the two-drawer fantasy; one drawer that actually fits a phone, a watch, and a small kit is what 90% of nightstands need.',
        ],
      ),
      idea(
        9,
        'The bench that stores shoes',
        px(p.luxuryG, 1000, 640),
        'Upholstered bench at the foot of a bed',
        [
          'In a bedroom near the front of the house, a storage bench by the door keeps shoes from migrating to the hallway floor.',
        ],
      ),
      idea(
        10,
        'Linen storage bags in the closet',
        px(p.basketC, 1000, 640),
        'Linen bags holding bedding in a closet',
        [
          "Lined bags sized for comforter sets keep spare bedding compressed and clean on a closet shelf. They double as the 'where does the spare duvet go' answer.",
        ],
      ),
      idea(
        11,
        'The door-mounted mirror shelf',
        px(p.mirrorE, 1000, 640),
        'Small shelf with a mirror in a tight space',
        [
          "A small wall unit — shelf plus mirror — on the closet door's side panel. Uses a surface most rooms never think about.",
        ],
      ),
      idea(
        12,
        'A slim console instead of a dresser',
        px(p.smallB, 1000, 640),
        'Low narrow console against a small wall',
        [
          'Holds the daily items (keys, the one plant, the tray) and keeps the big storage in the vertical cabinet where it belongs.',
        ],
      ),
      idea(
        13,
        'The hamper with a lid',
        px(p.basketG, 1000, 640),
        'Lidded laundry hamper tucked into a corner',
        [
          "A lidded hamper disappears into a corner or closet. The open laundry bag is the most common 'visual clutter' in small bedrooms — a lid is the fix.",
        ],
      ),
      idea(
        14,
        'Walls as a library',
        px(p.minimalB, 1000, 640),
        'Books displayed on a slim shelf',
        [
          'If the room is short on floor, the books go up: a slim shelf line holds a real library without a bookcase. One section, five to eight books, and stop.',
        ],
      ),
      idea(
        15,
        "The 'one in, one out' shelf audit",
        px(p.pantryD, 1000, 640),
        'Edited shelves with matched storage',
        [
          'The final storage idea is not furniture: a monthly five-minute pass that removes one item for every one that is added. Storage fails from volume, not capacity.',
        ],
      ),
      {
        type: 'prose',
        text: 'Pick the three that fit your room — most small bedrooms gain the most from under-bed, one vertical piece, and the over-door organizer. Together they add more usable space than a second nightstand ever would.',
      },
    ],
  },
  {
    slug: 'how-to-make-a-small-bedroom-look-bigger',
    format: 'howto',
    title: 'How to Make a Small Bedroom Look Bigger',
    subtitle:
      'A small bedroom looks small for five specific, fixable reasons. This is the method, in the order to apply it.',
    category: 'Advice',
    room: 'bedroom',
    keywords: 'make small bedroom look bigger, visual space, small room tricks',
    image: px(p.smallC),
    imageAlt: 'Bright small bedroom with light bedding and natural light',
    description:
      'The five-step method for visual space in a small bedroom: clear the floor line, go vertical, manage the light, keep one palette, and edit the surfaces.',
    author: 'Priya Shah',
    publishedAt: '2026-01-18',
    tags: [
      'bedroom',
      'small-spaces',
      'small-space-organization',
      'design-ideas',
    ],
    body: [
      {
        type: 'prose',
        text: 'Small bedrooms look small when the floor is busy, the ceiling is low-contrast, the light is overhead, and every surface is full. The fix is a sequence, not a shopping list — and it costs less than most people expect.',
      },
      { type: 'heading', text: 'Step 1: Clear the floor line' },
      {
        type: 'prose',
        text: "The floor is where a room's space is won or lost. Remove everything that sits on the floor except the bed, one rug, and at most two other pieces. Everything else goes under the bed, up the walls, or into the closet. A room with three objects on the floor looks twice as large as the same room with eight — the floor line is the horizon.",
      },
      { type: 'heading', text: 'Step 2: Go vertical, not horizontal' },
      {
        type: 'prose',
        text: "Swap wide, low furniture for narrow, tall pieces where you can: a tall cabinet instead of a dresser, tall drapes instead of half-curtains, a vertical mirror instead of a wide low one. Vertical elements train the eye to measure the room's height, which is the dimension small rooms usually lose.",
      },
      { type: 'heading', text: 'Step 3: Manage the light in layers' },
      {
        type: 'prose',
        text: 'Overhead light flattens a small room. Move the main light sources down to bedside height and keep the ceiling at low or off. Add a mirror opposite the window so the light source is doubled. A small, well-lit room reads as larger than a big, dark one.',
      },
      { type: 'heading', text: 'Step 4: Hold one palette' },
      {
        type: 'prose',
        text: 'Every color change is a visual edge, and edges make rooms feel segmented. Keep walls, bedding, and curtains in one warm family and put all the contrast into one accent — a throw, a pillow, a piece of art. The room reads as one continuous space instead of a stack of things.',
      },
      { type: 'heading', text: 'Step 5: Edit every surface to three objects' },
      {
        type: 'prose',
        text: 'Three objects, at different heights, with space between them — that is the full budget for any nightstand, dresser top, or shelf. Editing surfaces is the step people skip and the one that matters most: a room with full surfaces looks small even when the floor is clear.',
      },
      {
        type: 'tip',
        title: 'Quick Win',
        text: "Do Step 1 and Step 5 in one afternoon. No purchases required — just moving things — and it is the difference between 'small' and 'small but calm,' which is a different room entirely.",
      },
      {
        type: 'prose',
        text: 'Apply the steps in order and stop when the room feels right; most small bedrooms turn around after steps one through three. The goal is not a showroom — it is a room where the eye can travel from floor to ceiling without catching on anything.',
      },
    ],
  },
  {
    slug: 'how-to-style-a-nightstand-like-a-designer',
    format: 'howto',
    title: 'How to Style a Nightstand Like a Designer',
    subtitle:
      'The nightstand is the most-watched surface in the bedroom. The three-object rule, the height triangle, and the edits that make it read as styled.',
    category: 'Advice',
    room: 'bedroom',
    keywords: 'nightstand styling, bedside table decor, styling a nightstand',
    image: px(p.neutralB),
    imageAlt: 'Nightstand styled with a lamp, vase, and small objects',
    description:
      'A simple system for nightstands: the lamp as anchor, the three-object rule, height variation, and the clutter traps that undo the whole thing.',
    author: 'Maya Ellison',
    publishedAt: '2025-12-02',
    tags: ['bedroom', 'design-ideas', 'advice'],
    body: [
      {
        type: 'prose',
        text: 'A styled nightstand follows a pattern you can learn in ten minutes: one anchor, one personal object, one small finish, arranged in a loose triangle. Here is the system and the edits that keep it working.',
      },
      { type: 'heading', text: 'The anchor: the lamp' },
      {
        type: 'prose',
        text: "The lamp goes in the back corner, closest to the wall — never centered, which makes it look like a prop. Its height sets the room's evening light, and its base should be no more than about 60% of the nightstand's width. Everything else is styled around it.",
      },
      { type: 'heading', text: 'The three-object rule' },
      {
        type: 'prose',
        text: 'Lamp, plus one personal object (a book, a photograph, a small plant), plus one small finish (a tray, a candle, a compact vase). Three objects, done. The nightstand is not a shelf; it is a small stage, and stages work with few performers.',
      },
      { type: 'heading', text: 'The height triangle' },
      {
        type: 'prose',
        text: 'Arrange the three so their heights step: tall (the lamp), mid (the book stack or a 6-inch vase), low (the tray or candle). The eye travels the triangle and the arrangement reads as composed. Three objects at the same height read as clutter, no matter how pretty they are.',
      },
      { type: 'heading', text: 'The daily clutter traps' },
      {
        type: 'prose',
        text: "The phone charger snaking across the surface, the second water glass, the medication box, the jewelry that 'will be worn tomorrow.' The fix is structural, not disciplinary: a small tray that holds the daily-carry items, a drawer that is actually used, and a rule that the counter-top holds the staged three plus the tray. Everything else has a drawer or a home in another room.",
      },
      {
        type: 'tip',
        title: 'Styling Tip',
        text: "Match the two nightstands if you can — same lamp model, same-height objects. Symmetry is the difference between 'styled both sides' and 'did the left side and forgot the right.'",
      },
      {
        type: 'prose',
        text: 'Do the staging once and the room holds it: the tray catches the daily stuff, the drawer takes the rest, and the three objects keep their triangle. A nightstand styled this way survives a busy week — that is the test.',
      },
    ],
  },
  {
    slug: '10-bedroom-closet-organization-ideas',
    format: 'howto',
    title: '10 Bedroom Closet Organization Ideas',
    subtitle:
      'A bedroom closet fails when everything hangs at the same height and everything else lives in the drawer. Ten ideas that fix the system.',
    category: 'Home Organization',
    room: 'bedroom',
    keywords:
      'closet organization, wardrobe organization, bedroom closet ideas',
    image: px(p.neutralH),
    imageAlt: 'Bedroom with an organized closet and mirror',
    description:
      'Ten closet systems for the bedroom: the height-sorted hang, the drawer audit, over-door space, shelf bins, and the rules that keep it organized after the first week.',
    author: 'Priya Shah',
    publishedAt: '2026-01-10',
    tags: ['bedroom', 'closet-organization', 'storage-ideas', 'decluttering'],
    body: [
      {
        type: 'prose',
        text: 'Most bedroom closets are organized by where things were put, not by how they are used. These ten ideas rebuild the closet around actual use — what is worn daily, what is seasonal, and what should not be in the closet at all.',
      },
      { type: 'heading', text: '1–3: Sort the hang by height and use' },
      {
        type: 'prose',
        text: 'Long items (dresses, coats) on one side, short items on the other, and the daily-worn middle zone at arm height. The top rod becomes seasonal; the floor line under the rod becomes a bag-and-shoe shelf. Three rules, and the hanging section is already half-solved.',
      },
      { type: 'heading', text: '4–6: Give the drawer a system' },
      {
        type: 'prose',
        text: "The drawer is where closets die. Add two or three bins that match the drawer's interior, and assign each a category: sleep, daily, spare. Fold vertically so everything is visible at a glance. A drawer with bins holds twice what it 'should' and stays that way because the bins, not your willpower, are doing the sorting.",
      },
      { type: 'heading', text: '7–8: Use the vertical and the door' },
      {
        type: 'prose',
        text: "The space above the rod is a shelf for bins and spare bedding; the back of the door is a pocket organizer for accessories. Both are free real estate that most closets never use, and both solve the two most common closet problems — 'where does the spare duvet go' and 'where do the small things go.'",
      },
      { type: 'heading', text: '9: Set a place for the transitional zone' },
      {
        type: 'prose',
        text: "The 'worn once, not dirty' pile is the closet's hidden failure. One hook or a small shelf inside the door gives the transitional clothes a home that is not the floor and is not the clean stack.",
      },
      { type: 'heading', text: '10: The monthly fifteen-minute pass' },
      {
        type: 'prose',
        text: 'Fifteen minutes a month: anything that has not been touched moves to a donate box by the door, and the box leaves the house at 30 days. Closets fail from accumulation, not from bad bins — the pass is the maintenance that keeps the system honest.',
      },
      {
        type: 'tip',
        title: 'Organization Tip',
        text: 'Label the bins you can see. Unlabeled bins get used as generic storage within a month; labeled ones hold their category indefinitely.',
      },
      {
        type: 'prose',
        text: 'Start with the hang and the drawer — those two sections are 80% of what a bedroom closet is actually for. The rest is refinements that make the system stick.',
      },
    ],
  },
  {
    slug: 'a-gentle-weekend-declutter-method',
    format: 'howto',
    title: 'A Gentle Weekend Declutter Method for Busy Homes',
    subtitle:
      'Decluttering fails when it is all-or-nothing. This method works in 45-minute passes, one surface at a time, with a decision system instead of a pile system.',
    category: 'Home Organization',
    room: 'whole-home',
    keywords: 'declutter method, weekend declutter, gentle decluttering',
    image: px(p.pantryD),
    imageAlt: 'Edited shelves with matched ceramic storage',
    description:
      'A low-pressure declutter system: 45-minute sessions, one surface at a time, the three-box decision, and the rules that prevent the clutter from coming back.',
    author: 'Priya Shah',
    publishedAt: '2025-11-20',
    tags: ['decluttering', 'storage-ideas', 'advice'],
    body: [
      {
        type: 'prose',
        text: 'The all-weekend declutter produces one heroic Saturday and three weeks of relapse. This method is built for real calendars: short sessions, one surface, and a decision system that makes the sorting fast enough to finish before motivation does.',
      },
      { type: 'heading', text: 'The 45-minute pass' },
      {
        type: 'prose',
        text: "Set a timer for 45 minutes and choose one surface or one container — a dresser, a shelf, the junk drawer. Not a room; a surface. When the timer ends, stop, even mid-sort. The session's job is to be repeatable, not to finish anything in particular.",
      },
      { type: 'heading', text: 'The three-box decision' },
      {
        type: 'prose',
        text: "Keep, rehome, let go. For each item: keep only if it has a specific home in this surface; rehome if it belongs in another room (mark it, do not move it mid-session); let go if the answer to 'would I buy this again?' is no. Three decisions, no fourth option — the fourth option is 'maybe,' and maybe is how piles survive.",
      },
      { type: 'heading', text: 'The one-surface rule' },
      {
        type: 'prose',
        text: 'A session touches one surface. Items rehomed go into a marked box that leaves the room; the surface ends the session either empty-and-restyled or full-and-decided. Half-finished surfaces are the enemy — a half-sorted shelf looks worse than a full one.',
      },
      { type: 'heading', text: 'Keeping it from coming back' },
      {
        type: 'prose',
        text: 'Two rules after the weekend: the one-in-one-out swap for the surfaces that stayed full, and a 30-day rule for the let-go box — if nothing has been missed by day 30, the box leaves. Clutter returns through the front door, not through the decluttering; these rules are the filter.',
      },
      {
        type: 'tip',
        title: 'Organization Tip',
        text: 'Start with the surfaces you see most, not the hardest. The junk drawer and the entry table produce the fastest visible wins — and visible wins are what keep the second weekend from getting cancelled.',
      },
      {
        type: 'prose',
        text: 'One weekend, three to five surfaces, and the system installed. That is a declutter that survives — because it was never a project, it was a habit with a timer.',
      },
    ],
  },
  /* ============================================================ BEDROOM SHOPPING */
  {
    slug: '5-best-duvet-covers-for-a-calm-bedroom',
    format: 'best-products',
    title: '5 Best Duvet Covers for a Calm Bedroom',
    subtitle:
      "The duvet cover is the single largest 'soft' decision in a bedroom. Five sets across price and feel, with the trade-offs named.",
    category: 'Best Products',
    room: 'bedroom',
    keywords:
      'best duvet cover, best duvet set, linen duvet, calm bedroom bedding',
    image: px(p.beddingA),
    imageAlt: 'Stonewashed white duvet with soft rumpled texture',
    description:
      'Five duvet covers compared — stonewashed cotton, washed linen, percale, micro-percale, and waffle weave — with the right pick for hot sleepers, cool sleepers, and in-between.',
    author: 'Jonah Reyes',
    publishedAt: '2026-01-22',
    tags: ['bedroom', 'best-products', 'storage-ideas'],
    body: [
      {
        type: 'prose',
        text: 'A duvet cover is the most-touched item in the room and the largest single block of color on the bed, which makes it worth choosing deliberately. These five span the feels: soft-and-broken-in, crisp-and-cool, and textured-in-between.',
      },
      {
        type: 'quickPicks',
        title: 'Quick Picks',
        picks: [
          {
            productId: 'Stonewashed Cotton Duvet Set',
            reason: 'The premium feel without the break-in period.',
          },
          {
            productId: 'Organic Cotton Percale Set',
            reason: 'For anyone who runs hot at night.',
          },
          {
            productId: 'Waffle-Weave Cotton Set',
            reason: 'Best texture-per-dollar in the group.',
          },
        ],
      },
      {
        type: 'product',
        productId: 'Stonewashed Cotton Duvet Set',
        label: 'Best Overall',
        text: [
          'Pre-softened stonewashed cotton that has the look of a broken-in linen set with the easy care of cotton. The most forgiving premium-feel option here.',
        ],
        pros: [
          'Soft on day one',
          'Holds shape better than true linen',
          'Strong colorfastness',
        ],
        cons: ['Heavier than percale — less for very hot sleepers'],
        bestFor: 'Most sleepers who want a calm, premium bed',
        details: '300 TC stonewashed cotton · queen and king',
      },
      {
        type: 'product',
        productId: 'Washed Linen Duvet Set',
        label: 'Best for Texture',
        text: [
          'True washed linen: cool in summer, warm in winter, better with age. It wrinkles — that is the design, not a defect.',
        ],
        pros: [
          'The best temperature regulation',
          'Improves with every wash',
          "The most 'designed' look of the five",
        ],
        cons: ['Wrinkles require acceptance', 'Heavier and slower to dry'],
        bestFor: 'People who want the linen look and accept the linen habits',
        details: '100% washed linen · multiple tones',
      },
      {
        type: 'product',
        productId: 'Organic Cotton Percale Set',
        label: 'Best for Hot Sleepers',
        text: [
          "Crisp, cool, and hotel-sharp. Percale is the right answer when the room gets warm and 'soft rumpled' is not the goal.",
        ],
        pros: [
          'Coolest feel of the five',
          'Crisp, sharp bed lines',
          'Certified organic cotton',
        ],
        cons: [
          'Crispness creases; needs pressing for the full effect',
          'Not the softest out of the bag',
        ],
        bestFor: 'Hot sleepers and hotel-style bedding',
        details: '300 TC organic percale',
      },
      {
        type: 'product',
        productId: 'Brushed Micro-Percale Set',
        label: 'Best Value',
        text: [
          'Micro-percale brushed for a softer hand than standard percale. The mid-budget pick that photographs like a set twice the price.',
        ],
        pros: [
          'Soft hand at a mid price',
          'Breathable for warmer months',
          'Good size range',
        ],
        cons: ['Fabric is thinner — less drape over time'],
        bestFor:
          "Value-focused buyers who want percale without percale's stiffness",
        details: 'Micro-percale, brushed',
      },
      {
        type: 'product',
        productId: 'Waffle-Weave Cotton Set',
        label: 'Best for Texture on a Budget',
        text: [
          "An open waffle weave that breathes well and reads as texture from across the room. The best 'more than flat' option under a hundred.",
        ],
        pros: ['Great airflow for warm months', 'Visible texture', 'Easy care'],
        cons: ['Catches lint more than smooth weaves', 'Less formal look'],
        bestFor: 'Layered, casual bedrooms',
        details: 'Cotton waffle weave',
      },
      {
        type: 'prose',
        text: 'The short version: stonewashed cotton for the calm premium bed, percale for the cool crisp one, linen if you want the texture and the habits that come with it, and waffle for the casual layered look. Match the weave to how you sleep, and the size one step up from the mattress — the extra drape is what makes the set look finished.',
      },
    ],
  },
  {
    slug: '5-best-area-rugs-for-bedrooms',
    format: 'best-products',
    title: '5 Best Area Rugs for Bedrooms',
    subtitle:
      'Five rugs that anchor a bed, soften a floor, and survive a real bedroom — with sizing notes for each.',
    category: 'Best Products',
    room: 'bedroom',
    keywords:
      'best area rug bedroom, jute rug, wool rug bedroom, rug size queen bed',
    image: px(p.rugA),
    imageAlt: 'Natural jute rug on a wooden bedroom floor',
    description:
      'Five bedroom rugs compared: jute, flatweave wool, berber-style, kilim, and shag — with the right size for each and the trade-offs named.',
    author: 'Jonah Reyes',
    publishedAt: '2026-01-14',
    tags: ['bedroom', 'best-products', 'furniture'],
    body: [
      {
        type: 'prose',
        text: 'The right bedroom rug is the one that is sized correctly and built for daily foot traffic — everything else follows. These five cover the main textures, and the sizing notes are the part most rug recommendations skip.',
      },
      {
        type: 'quickPicks',
        title: 'Quick Picks',
        picks: [
          {
            productId: 'Handwoven Jute Rug',
            reason: 'The default-correct pick for wood floors.',
          },
          {
            productId: 'Flatweave Wool Rug',
            reason: 'The best underfoot feel in the group.',
          },
          {
            productId: 'Kilim Accent Rug',
            reason: 'The pattern option that stays quiet.',
          },
        ],
      },
      {
        type: 'product',
        productId: 'Handwoven Jute Rug',
        label: 'Best Overall',
        text: [
          'Tightly woven natural jute with a low profile that fits under most bed frames. The most forgiving natural rug for real bedrooms — casual enough to forgive, dense enough to last.',
        ],
        pros: [
          'Natural warmth over hard floors',
          'Low profile works with low beds',
          'Ages gracefully',
        ],
        cons: ['Not the softest underfoot', 'Stains want prompt attention'],
        bestFor: 'Wood floors, warm neutral rooms',
        details: 'Natural jute · 5×7 to 9×12',
      },
      {
        type: 'product',
        productId: 'Flatweave Wool Rug',
        label: 'Best Underfoot',
        text: [
          'Flat-woven wool with a subtle tonal pattern — plush but firm underfoot, the kind of rug you can live on, not just look at.',
        ],
        pros: [
          'The best underfoot comfort in the group',
          'Tonal pattern reads as texture',
          'Durable wool construction',
        ],
        cons: ['The priciest of the five', 'Wool wants professional cleaning'],
        bestFor: 'Rooms where the floor gets lived on',
        details: 'Wool flatweave · multiple sizes',
      },
      {
        type: 'product',
        productId: 'Berber-Style Wool Rug',
        label: 'Best for Texture',
        text: [
          'The classic Moroccan cut-and-pile pattern, softened. Adds visual texture to a room of all-smooth surfaces without committing to a bold print.',
        ],
        pros: [
          'Strong texture at a mid price',
          'Works in warm or cool palettes',
          'Good size range',
        ],
        cons: ['Pile collects hair — brush weekly', 'Edges want a pad'],
        bestFor: 'Smooth-surface rooms that need depth',
        details: 'Wool, cut-and-pile',
      },
      {
        type: 'product',
        productId: 'Kilim Accent Rug',
        label: 'Best Pattern',
        text: [
          'A flat kilim with a geometric repeat that reads as pattern from the bed and texture from the doorway. The pattern option that does not shout.',
        ],
        pros: [
          'Flat profile fits low beds',
          'Pattern without boldness',
          "Affordable entry to 'patterned'",
        ],
        cons: ['Flat weaves show wear lines over time', 'Less cushioning'],
        bestFor: 'Guest rooms and casual bedrooms',
        details: 'Flat kilim · 5×8 and 6×9',
      },
      {
        type: 'product',
        productId: 'Soft Shag Wool Rug',
        label: 'Best for Cozy',
        text: [
          'A medium-pile shag for rooms where bare wood gets underfoot in the morning. The comfort option — with the cleaning expectations that come with it.',
        ],
        pros: [
          'The softest underfoot of the five',
          'Looks expensive in a tonal room',
          'Good light diffusion',
        ],
        cons: [
          'Pile traps debris; vacuum regularly',
          'Too thick under some storage beds',
        ],
        bestFor: 'Cozy palettes, cold-floor houses',
        details: 'Wool shag, medium pile',
      },
      {
        type: 'comparison',
        title: 'How the five compare',
        columns: ['Best for', 'Profile', 'Care level', 'Price range'],
        rows: [
          {
            productId: 'Handwoven Jute Rug',
            cells: ['Wood floors, warm rooms', 'Low', 'Medium', '$175–$189'],
          },
          {
            productId: 'Flatweave Wool Rug',
            cells: ['Underfoot comfort', 'Low-medium', 'Higher', '$249'],
          },
          {
            productId: 'Berber-Style Wool Rug',
            cells: ['Texture', 'Medium', 'Medium', '$159'],
          },
          {
            productId: 'Kilim Accent Rug',
            cells: ['Quiet pattern', 'Flat', 'Low', '$129'],
          },
          {
            productId: 'Soft Shag Wool Rug',
            cells: ['Cozy factor', 'Medium-high', 'Higher', '$229'],
          },
        ],
      },
      {
        type: 'prose',
        text: 'Size first, texture second: a queen bed in a standard room wants an 8×10 with 24 inches running out on the sides; a small room wants a 6×9 run under the bed. Once the size is right, the texture choice is personal — and any of these five will hold up to a real bedroom.',
      },
    ],
  },
  {
    slug: '5-best-bed-frames-with-storage',
    format: 'best-products',
    title: '5 Best Bed Frames with Storage',
    subtitle:
      'A storage bed is a furniture purchase and a storage solution at once. Five frames across price and profile, with what the storage actually holds.',
    category: 'Best Products',
    room: 'bedroom',
    keywords:
      'bed frame with storage, storage bed, platform bed drawers, lift bed',
    image: px(p.neutralD),
    imageAlt: 'Low wooden platform bed in a warm modern bedroom',
    description:
      "Five storage bed frames compared — drawers, trundle, lift-top, and slim profiles for small rooms — with honest notes on what each one's storage actually fits.",
    author: 'Jonah Reyes',
    publishedAt: '2026-01-05',
    tags: ['bedroom', 'best-products', 'furniture', 'small-spaces'],
    body: [
      {
        type: 'prose',
        text: 'Storage beds are sold as space-saving magic, which is fair — until you check what the storage holds. These five are the frames where the storage is real: deep enough for comforter sets, reachable enough for daily life.',
      },
      {
        type: 'quickPicks',
        title: 'Quick Picks',
        picks: [
          {
            productId: 'Olive Platform Bed with Drawers',
            reason: 'The best all-round storage frame.',
          },
          {
            productId: 'Narrow Storage Bed for Small Rooms',
            reason: 'For bedrooms under 10 feet wide.',
          },
          {
            productId: 'Upholstered Storage Bed',
            reason: 'The softest look with the biggest volume.',
          },
        ],
      },
      {
        type: 'product',
        productId: 'Olive Platform Bed with Drawers',
        label: 'Best Overall',
        text: [
          'A low oak platform with three full-width drawers. The profile disappears under a duvet, and the drawers are deep enough for real loads — two comforter sets and a shoe box each.',
        ],
        pros: [
          'Deep, full-width drawers',
          'Low profile suits modern rooms',
          'Stable oak construction',
        ],
        cons: [
          'Drawer fronts add 8 inches of floor presence',
          'Queen and king only',
        ],
        bestFor: 'Most bedrooms that want hidden, accessible storage',
        details: 'Oak platform · 3 drawers · queen/king',
      },
      {
        type: 'product',
        productId: 'Ash Storage Bed with Trundle',
        label: 'Best for Guests',
        text: [
          'A slim ash frame with a rolling trundle — the cleanest answer for a bedroom that doubles as a guest room. The trundle is a real bed, not a fold-out compromise.',
        ],
        pros: [
          'The trundle sleeps an adult properly',
          'Slim frame fits small rooms',
          'Quick guest setup',
        ],
        cons: [
          'Trundle needs floor clearance to roll',
          'Only the trundle stores; the frame itself does not',
        ],
        bestFor: 'Dual-use bedrooms',
        details: 'Ash frame · full trundle',
      },
      {
        type: 'product',
        productId: 'Upholstered Storage Bed',
        label: 'Best for Volume',
        text: [
          'A buttoned-up upholstered frame with a lift-top compartment that swallows two comforter sets and the off-season box. The softest visual and the biggest single volume in this group.',
        ],
        pros: [
          'The largest single storage volume',
          'Upholstered look softens a hard-finished room',
          'Lift is smooth and one-handed',
        ],
        cons: [
          'The priciest per cubic foot',
          'Lift access is slower than drawers',
        ],
        bestFor: 'Bedrooms that store a lot and look calm doing it',
        details: 'Upholstered · lift-top · queen/king',
      },
      {
        type: 'product',
        productId: 'Oak Platform Bed with Lift',
        label: 'Best Build',
        text: [
          'A solid oak platform with a gas-lift compartment. Heavier construction than the upholstered option, with a lift mechanism that stays smooth year after year.',
        ],
        pros: [
          'The sturdiest build in the group',
          'Gas lift is effortless',
          'Solid oak, not veneer',
        ],
        cons: [
          'The highest price',
          'Oak is a strong presence — match the room or fight it',
        ],
        bestFor: 'Buyers who want a frame that outlives the bedroom',
        details: 'Solid oak · gas-lift storage',
      },
      {
        type: 'product',
        productId: 'Narrow Storage Bed for Small Rooms',
        label: 'Best for Small Spaces',
        text: [
          'A 24-inch-deep frame with side drawers that clear the walkway. Proof that storage and slim can coexist — the drawers sit on the sides, not the foot.',
        ],
        pros: [
          'Fits studios and narrow rooms',
          'Side drawers keep the walkway clear',
          'The lowest price here',
        ],
        cons: [
          'Queen only',
          'Side access is a different motion than foot drawers',
        ],
        bestFor: 'Small bedrooms and studio layouts',
        details: '24 in deep · side drawers · queen',
      },
      {
        type: 'prose',
        text: 'The decision is really about access style: drawers for daily items (shoe boxes, extra pillowcases), a lift for bulky seasonal loads, and a trundle when the room needs a second bed. Match the mechanism to what you actually store, and the frame does double duty without looking like it.',
      },
    ],
  },
  {
    slug: '8-best-bedroom-storage-finds',
    format: 'finds',
    title: '8 Best Bedroom Storage Finds',
    subtitle:
      'Eight storage pieces that turn a cluttered bedroom into a system — from under-bed bags to the over-door organizer, all under $40.',
    category: 'Shopping Finds',
    room: 'bedroom',
    keywords:
      'bedroom storage, storage finds, under bed bags, closet organizer',
    image: px(p.basketA),
    imageAlt: 'Two woven baskets inside a wooden cabinet',
    description:
      'Eight affordable bedroom storage finds — under-bed bags, seagrass baskets, a closet divider, and the over-door organizer — with notes on what each one should hold.',
    author: 'Priya Shah',
    publishedAt: '2026-02-11',
    tags: [
      'bedroom',
      'bedroom-organization',
      'storage-ideas',
      'small-space-organization',
    ],
    body: [
      {
        type: 'quickBrowse',
        title: 'Quick Browse',
        items: [
          {
            productId: 'Under-Bed Storage Bags (3-Pack)',
            name: 'Under-Bed Storage Bags',
            note: 'biggest gain',
          },
          {
            productId: 'Seagrass Storage Basket Set',
            name: 'Seagrass Basket Set',
            note: 'shelves',
          },
          {
            productId: 'Wicker Closet Divider',
            name: 'Wicker Closet Divider',
            note: 'closet',
          },
          {
            productId: 'Woven Bedside Basket',
            name: 'Woven Bedside Basket',
            note: 'nightstand',
          },
          {
            productId: 'Over-Door Hanging Organizer',
            name: 'Over-Door Organizer',
            note: 'door',
          },
          {
            productId: 'Linen Bedding Storage Bags',
            name: 'Linen Bedding Bags',
            note: 'spare sets',
          },
        ],
      },
      {
        type: 'prose',
        text: 'Storage finds are where bedroom organization lives or dies: cheap enough to buy in families, big enough to matter. These eight cover the whole room — floor, shelves, closet, nightstand, and the door — each with the one job it does best.',
      },
      {
        type: 'product',
        productId: 'Under-Bed Storage Bags (3-Pack)',
        text: [
          'The biggest capacity gain per dollar in bedroom storage. Zippered, clear-front, and sized for duvet covers and the suitcase. Keep daily items out — this is the seasonal and overflow zone.',
        ],
      },
      {
        type: 'product',
        productId: 'Seagrass Storage Basket Set',
        text: [
          'Open-weave seagrass for shelves and the floor. Breathable, so it does not trap the musty-storage smell that plastic bins do. Buy the family of three and use them as a system.',
        ],
      },
      {
        type: 'product',
        productId: 'Wicker Closet Divider',
        text: [
          'Hangs from the existing rod and doubles one wall of hanging space. The single best closet upgrade under $30 — no hardware, no drilling, reversible in a minute.',
        ],
      },
      {
        type: 'product',
        productId: 'Woven Bedside Basket',
        text: [
          "A shallow catch-all for the nightstand: books, chargers, the second glass. It turns the 'clutter' into a styled arrangement, which is the whole trick of bedside storage.",
        ],
      },
      {
        type: 'product',
        productId: 'Over-Door Hanging Organizer',
        text: [
          "Sixteen pockets on the back of a door is a drawer unit for the small things — jewelry, accessories, cables. It is the find that solves the 'drawer of things with no home' problem.",
        ],
      },
      {
        type: 'product',
        productId: 'Linen Bedding Storage Bags',
        text: [
          'Lined linen bags sized for comforter sets: spare duvet covers stay compressed, dry, and scented between rotations. They also double as a good-looking bin when the closet is full.',
        ],
      },
      {
        type: 'tip',
        title: 'Editorial Tip',
        text: 'Storage finds should be bought as families — the same material in two or three sizes. Mixed random baskets read as clutter; a matched family reads as a system, and systems are what stay organized.',
      },
      {
        type: 'prose',
        text: 'Start with the under-bed bags and the closet divider — those two solve the two biggest volume problems in a bedroom — then add the family of baskets to the shelves. The nightstand basket and the over-door organizer are the finishing touches that make the system look intentional.',
      },
    ],
  },
  {
    slug: '5-best-throw-blankets-for-the-bed',
    format: 'finds',
    title: '5 Best Throw Blankets for the Bed',
    subtitle:
      'The throw is the layer that makes a bed look styled. Five picks across wool, cotton, bouclé, linen, and fleece — each with the job it does best.',
    category: 'Shopping Finds',
    room: 'bedroom',
    keywords: 'best throw blanket, wool throw, bedroom throw, layering bedding',
    image: px(p.beddingG),
    imageAlt: 'Folded bouclé throw and stacked pillows on a bed',
    description:
      'Five throw blankets that layer a bed properly — merino, waffle cotton, bouclé, linen blend, and brushed fleece — with the right pick for each season and style.',
    author: 'Jonah Reyes',
    publishedAt: '2026-01-29',
    tags: ['bedroom', 'storage-ideas'],
    body: [
      {
        type: 'quickBrowse',
        title: 'Quick Browse',
        items: [
          {
            productId: 'Merino Wool Throw',
            name: 'Merino Wool Throw',
            note: 'year-round weight',
          },
          {
            productId: 'Waffle Knit Cotton Throw',
            name: 'Waffle Knit Cotton',
            note: 'warm months',
          },
          {
            productId: 'Chunky Bouclé Throw',
            name: 'Chunky Bouclé',
            note: 'the styled layer',
          },
          {
            productId: 'Linen-Blend Layer Throw',
            name: 'Linen-Blend Layer',
            note: 'the rumple',
          },
          {
            productId: 'Cashmere-Soft Fleece Throw',
            name: 'Cashmere-Soft Fleece',
            note: 'cold mornings',
          },
        ],
      },
      {
        type: 'prose',
        text: 'A bed without a throw looks made; a bed with the right one looks styled. These five cover the season range and the style range — pick by how you actually use it: for sleep, for the foot of the bed, or for the armchair.',
      },
      {
        type: 'product',
        productId: 'Merino Wool Throw',
        text: [
          'The weight and hand-feel of a proper wool throw at a mid-range price. Warm without overheating, and it drapes like a hotel bed finish. The one to buy for the foot of the bed.',
        ],
      },
      {
        type: 'product',
        productId: 'Waffle Knit Cotton Throw',
        text: [
          'Open waffle weave that stays cool in summer and layers well in winter. The best year-round throw for mixed-season climates — and the easiest to wash.',
        ],
      },
      {
        type: 'product',
        productId: 'Chunky Bouclé Throw',
        text: [
          'Thick, looped, and unapologetically plush. This is the throw you drape over a chair to style the room — not the one you sleep under, but the one photographs notice.',
        ],
      },
      {
        type: 'product',
        productId: 'Linen-Blend Layer Throw',
        text: [
          'A crinkled linen-cotton blend that gets better looking with every rumple. It sits over a duvet like a well-worn layer, never like a blanket. The choice for tonal, calm beds.',
        ],
      },
      {
        type: 'product',
        productId: 'Cashmere-Soft Fleece Throw',
        text: [
          'Brushed fleece with a cashmere-like hand for a fraction of the price. The cold-morning favorite, and the one to keep within reach rather than folded away.',
        ],
      },
      {
        type: 'tip',
        title: 'Editorial Tip',
        text: "Size the throw one step bigger than the bed's side — it should pool, not tuck. A throw that fits exactly looks like a spare; one that pools looks like a decision.",
      },
      {
        type: 'prose',
        text: 'The simple formula: one for the bed (wool or linen), one for the warm months (waffle cotton), and one for the chair (bouclé or fleece). Three throws, three jobs, and the room covers every season.',
      },
    ],
  },
  {
    slug: 'how-to-choose-a-duvet-set',
    format: 'buying-guide',
    title: 'How to Choose a Duvet Set',
    subtitle:
      'Thread count, weave, fill power, and size — the four decisions behind a duvet set, explained before the shopping.',
    category: 'Buying Guide',
    room: 'bedroom',
    keywords: 'duvet set guide, duvet size, thread count, fill power',
    image: px(p.beddingB),
    imageAlt: 'Crisp bedding in a bright bedroom',
    description:
      'The framework for choosing a duvet set: match the weave to how you sleep, size it one step up, and read the fill numbers that actually matter.',
    author: 'Jonah Reyes',
    publishedAt: '2026-01-02',
    tags: ['bedroom', 'buying-guide'],
    body: [
      {
        type: 'prose',
        text: 'Duvet sets are marketed on thread count, which is the least of the four decisions that matter. Here is the actual framework: weave, size, fill, and finish — in that order of importance for most people.',
      },
      { type: 'heading', text: 'Match the weave to how you sleep' },
      {
        type: 'prose',
        text: 'Percale is crisp and cool — the hot-sleeper pick. Sateen is smooth and warm, with a slight sheen. Linen breathes in both directions and wrinkles into its aesthetic. Waffle and gauze are the open-weave options for warm rooms and casual beds. Choose the weave for your sleep temperature first; everything else is preference.',
      },
      { type: 'heading', text: 'Size it one step up' },
      {
        type: 'prose',
        text: "Buy the set one size above the mattress: a queen mattress takes a king set. The extra drape over the sides is what makes a bed look finished — a set that fits exactly looks like a fitted sheet with ambitions. Check the set includes the duvet insert, or budget for it separately; 'duvet cover set' usually means cover and pillowcases only.",
      },
      { type: 'heading', text: 'Read the fill numbers' },
      {
        type: 'prose',
        text: "For the insert: fill power (600+ is good loft; 800 is feather-light luxury) and fill weight (heavier for winter, lighter for summer, or buy two). A 600-fill queen at 50–55 oz is the year-round default. The cover's thread count matters less than 400 — above that, it is marketing until you are pressing the sheets.",
      },
      { type: 'heading', text: 'Check the finish details' },
      {
        type: 'prose',
        text: 'A hidden placket (not buttons) keeps the bed line clean. Corner ties inside the cover keep the insert from migrating. And a pre-washed or stonewashed cover skips the break-in period. These three details are the difference between a set that photographs well and one that just looks like bedding.',
      },
      {
        type: 'product',
        productId: 'Stonewashed Cotton Duvet Set',
        text: [
          'A reference point for what the framework produces: stonewashed cotton, the year-round feel, and the hidden details done right. If you want the calm premium bed without the linen habits, this is the shape of the answer.',
        ],
      },
      {
        type: 'cta',
        eyebrow: 'See them compared',
        title: 'Five duvet sets, side by side',
        text: 'The full product-by-product breakdown across stonewashed cotton, washed linen, percale, micro-percale, and waffle weave.',
        href: '/story/5-best-duvet-covers-for-a-calm-bedroom',
        ctaLabel: 'See the 5 Best Duvet Covers',
      },
      {
        type: 'checklist',
        title: 'Duvet set checklist',
        items: [
          'Weave matched to sleep temperature (percale cool, sateen warm, linen both)?',
          'Sized one step up from the mattress?',
          'Fill power 600+ for the insert?',
          'Fill weight right for your climate (or two inserts)?',
          'Hidden placket, not buttons?',
          'Cover and pillowcases included?',
        ],
      },
    ],
  },
  {
    slug: 'shop-this-warm-neutral-bedroom',
    format: 'shop-the-look',
    title: 'Shop This Warm Neutral Bedroom',
    subtitle:
      'A sand-toned bedroom in linen, oak, and clay — built from five pieces that stay in one warm family.',
    category: 'Shop the Look',
    room: 'bedroom',
    keywords:
      'warm neutral bedroom shopping, beige bedroom shop, tan bedroom look',
    image: px(p.neutralA),
    imageAlt: 'Warm neutral bedroom with natural elements and soft light',
    description:
      'Five pieces for the warm neutral bedroom: the linen-blend bedding, the bouclé layer, the dome lamp, the olive tree, and the pleated drapes.',
    author: 'Jonah Reyes',
    publishedAt: '2026-02-08',
    tags: ['bedroom', 'shop-the-look', 'warm-neutral'],
    body: [
      {
        type: 'prose',
        text: 'This room is one warm family: sand walls, oak furniture, and bedding two steps deeper than the walls. The five pieces below build the look — each in a tone close enough to the rest that the room reads as one decision.',
      },
      {
        type: 'quickShop',
        title: 'Quick Shop',
        items: [
          { productId: 'Linen-Blend Duvet Cover Set', note: 'the bedding' },
          { productId: 'Bouclé Throw Blanket', note: 'the layer' },
          { productId: 'Halo Dome Table Lamp', note: 'the glow' },
          { productId: 'Faux Olive Tree, 4 ft', note: 'the green' },
          { productId: 'Pleated Linen Drape Set', note: 'the window' },
        ],
      },
      {
        type: 'product',
        productId: 'Linen-Blend Duvet Cover Set',
        status: 'exact',
        text: [
          'The bedding as photographed: a linen blend in a warm sand tone that sits between the wall and the wood. The blend is what holds the shape — pure linen at this price would collapse.',
        ],
      },
      {
        type: 'product',
        productId: 'Bouclé Throw Blanket',
        status: 'exact',
        text: [
          "The looped-weave layer at the foot of the bed, in the room's exact tone. One throw, pooled, is the difference between made and styled.",
        ],
      },
      {
        type: 'product',
        productId: 'Halo Dome Table Lamp',
        status: 'similar',
        text: [
          "The photograph's lamp is a touch lower; this is the closest warm-glow dome. It pushes light up the wall behind the headboard, which is where the room's evening softness comes from.",
        ],
      },
      {
        type: 'product',
        productId: 'Faux Olive Tree, 4 ft',
        status: 'exact',
        text: [
          'The corner plant — the only green in the room, and the only leafy thing. It earns its place because nothing else in the palette is organic.',
        ],
      },
      {
        type: 'product',
        productId: 'Pleated Linen Drape Set',
        status: 'exact',
        text: [
          'Floor-to-ceiling pleated linen in a warm white. The drapes are what make the window read as part of the palette instead of a hole in it.',
        ],
      },
    ],
  },
  {
    slug: 'shop-this-scandi-bedroom',
    format: 'shop-the-look',
    title: 'Shop This Scandi Bedroom',
    subtitle:
      'Pale wood, paper light, and one texture — the Scandi formula in four pieces.',
    category: 'Shop the Look',
    room: 'bedroom',
    keywords: 'scandi bedroom, scandinavian bedroom shop, white bedroom look',
    image: px(p.minimalC),
    imageAlt: 'Pale Scandi bedroom with soft light and a side table',
    description:
      'Four pieces for a Scandi bedroom: the paper lamp, the waffle throw, the flatweave rug, and the narrow storage frame.',
    author: 'Jonah Reyes',
    publishedAt: '2026-01-31',
    tags: ['bedroom', 'shop-the-look', 'scandinavian', 'minimalist'],
    body: [
      {
        type: 'prose',
        text: 'The Scandi bedroom formula is subtraction with a temperature: pale wood, white bedding, paper light, and one woven texture to keep it from going clinical. Four pieces, and the room has the formula.',
      },
      {
        type: 'quickShop',
        title: 'Quick Shop',
        items: [
          { productId: 'Fen Paper Table Lamp', note: 'the paper light' },
          { productId: 'Waffle Knit Cotton Throw', note: 'the texture' },
          { productId: 'Flatweave Wool Rug', note: 'the floor' },
          {
            productId: 'Narrow Storage Bed for Small Rooms',
            note: 'the frame',
          },
        ],
      },
      {
        type: 'product',
        productId: 'Fen Paper Table Lamp',
        status: 'exact',
        text: [
          "The washi paper shade is the Scandi move — lantern light at bedside height. Two of them, either side, and the room's evening is handled.",
        ],
      },
      {
        type: 'product',
        productId: 'Waffle Knit Cotton Throw',
        status: 'exact',
        text: [
          'The one woven texture on the bed. Scandi rooms live on a single textile accent; the waffle is the right weight for it.',
        ],
      },
      {
        type: 'product',
        productId: 'Flatweave Wool Rug',
        status: 'similar',
        text: [
          "The photograph's rug is a touch lighter; this flatweave is the closest build. Low profile, tonal pattern, and it keeps the pale palette grounded.",
        ],
      },
      {
        type: 'product',
        productId: 'Narrow Storage Bed for Small Rooms',
        status: 'exact',
        text: [
          'The slim frame the look depends on — Scandi bedrooms read calm because the furniture does not argue with the walls. The side drawers keep the storage honest.',
        ],
      },
    ],
  },
  {
    slug: 'shop-this-cozy-small-bedroom',
    format: 'shop-the-look',
    title: 'Shop This Cozy Small Bedroom',
    subtitle:
      'A ten-by-ten bedroom that feels double its size — five pieces that keep the floor clear and the light warm.',
    category: 'Shop the Look',
    room: 'bedroom',
    keywords:
      'small bedroom shopping, cozy bedroom look, compact bedroom style',
    image: px(p.smallD),
    imageAlt: 'Cozy compact bedroom with soft light',
    description:
      'Five pieces for a small bedroom that feels larger: the narrow frame, the under-bed bags, the jute rug, the linen lamp, and the diffuser.',
    author: 'Jonah Reyes',
    publishedAt: '2026-02-03',
    tags: ['bedroom', 'shop-the-look', 'small-spaces'],
    body: [
      {
        type: 'prose',
        text: 'Small bedrooms feel large when the floor is clear, the light is low and warm, and every piece earns its place. These five do exactly that — and the two storage pieces are what make the rest possible.',
      },
      {
        type: 'quickShop',
        title: 'Quick Shop',
        items: [
          {
            productId: 'Narrow Storage Bed for Small Rooms',
            note: 'the frame',
          },
          {
            productId: 'Under-Bed Storage Bags (3-Pack)',
            note: 'the hidden volume',
          },
          { productId: 'Woven Jute Area Rug 5×7', note: 'the floor' },
          { productId: 'Aria Linen Table Lamp', note: 'the bedside' },
          { productId: 'Reed Diffuser Set', note: 'the finish' },
        ],
      },
      {
        type: 'product',
        productId: 'Narrow Storage Bed for Small Rooms',
        status: 'exact',
        text: [
          "The 24-inch-deep frame is the room's spine: a real bed footprint with side storage, and a walkway that actually stays walkable.",
        ],
      },
      {
        type: 'product',
        productId: 'Under-Bed Storage Bags (3-Pack)',
        status: 'exact',
        text: [
          "The hidden volume that keeps the floor clear. Everything seasonal and overflow lives under the mattress, where it stops counting against the room's size.",
        ],
      },
      {
        type: 'product',
        productId: 'Woven Jute Area Rug 5×7',
        status: 'exact',
        text: [
          'A 5×7 under a small bed runs far enough out to unify the floor — the move that makes a small room read as one space.',
        ],
      },
      {
        type: 'product',
        productId: 'Aria Linen Table Lamp',
        status: 'similar',
        text: [
          "The photograph's lamp is a half-inch shorter; this is the closest slim linen drum. Small footprint, right reading height, warm light.",
        ],
      },
      {
        type: 'product',
        productId: 'Reed Diffuser Set',
        status: 'exact',
        text: [
          'The eucalyptus-cedar set on the nightstand — the small thing that makes a compact room feel like a place rather than a function.',
        ],
      },
    ],
  },
  {
    slug: 'shop-this-minimalist-bedroom',
    format: 'shop-the-look',
    title: 'Shop This Minimalist Bedroom',
    subtitle:
      'Four pieces for a quiet room: crisp percale, one warm lamp, a soft rug, and a frame that stays out of the way.',
    category: 'Shop the Look',
    room: 'bedroom',
    keywords:
      'minimalist bedroom shopping, calm bedroom look, simple bedroom style',
    image: px(p.minimalF),
    imageAlt: 'Minimalist bedroom with a beige nightstand and warm lamp',
    description:
      'Four pieces for the minimalist bedroom: the percale set, the arc mini lamp, the flatweave rug, and the narrow frame.',
    author: 'Jonah Reyes',
    publishedAt: '2026-01-12',
    tags: ['bedroom', 'shop-the-look', 'minimalist'],
    body: [
      {
        type: 'prose',
        text: 'A minimalist bedroom is four good pieces and a lot of nothing. The formula: crisp bedding, one warm light, a textured rug, and a frame that disappears. Here is the list.',
      },
      {
        type: 'quickShop',
        title: 'Quick Shop',
        items: [
          { productId: 'Organic Cotton Percale Set', note: 'the crisp' },
          { productId: 'Arc Mini Floor Lamp', note: 'the light' },
          { productId: 'Flatweave Wool Rug', note: 'the texture' },
          {
            productId: 'Narrow Storage Bed for Small Rooms',
            note: 'the frame',
          },
        ],
      },
      {
        type: 'product',
        productId: 'Organic Cotton Percale Set',
        status: 'exact',
        text: [
          "Crisp percale is the minimalist's bedding: sharp lines, cool touch, and a bed that looks made at 8 a.m. and at 8 p.m.",
        ],
      },
      {
        type: 'product',
        productId: 'Arc Mini Floor Lamp',
        status: 'exact',
        text: [
          'The light lives on the floor, so the nightstand stays a surface of one. The arc reaches over the bed without eating the walkway — the small-room version of bedside light.',
        ],
      },
      {
        type: 'product',
        productId: 'Flatweave Wool Rug',
        status: 'exact',
        text: [
          'One woven texture under the bed keeps the white room from going clinical. Low profile, tonal, and invisible from the doorway — exactly the job.',
        ],
      },
      {
        type: 'product',
        productId: 'Narrow Storage Bed for Small Rooms',
        status: 'exact',
        text: [
          "The frame does the quiet work: a slim profile, side storage, and no visual weight. In a minimalist room, the furniture's job is to be unnoticeable.",
        ],
      },
    ],
  },
  {
    slug: 'shop-this-soft-traditional-bedroom',
    format: 'shop-the-look',
    title: 'Shop This Soft Traditional Bedroom',
    subtitle:
      'A guest-room classic in percale, brass, and a carved-feel headboard — four pieces that read as heritage without the formality.',
    category: 'Shop the Look',
    room: 'bedroom',
    keywords:
      'traditional bedroom shopping, classic bedroom look, guest bedroom style',
    image: px(p.luxuryG),
    imageAlt: 'Spacious classic bedroom with plush pillows and a chandelier',
    description:
      'Four pieces for the soft traditional bedroom: the micro-percale set, the classic linen lamp, the berber-style rug, and the ceramic trio.',
    author: 'Jonah Reyes',
    publishedAt: '2026-01-06',
    tags: ['bedroom', 'shop-the-look', 'traditional'],
    body: [
      {
        type: 'prose',
        text: 'The soft traditional bedroom is the guest-room classic: crisp sheets, a proper headboard, and details in brass and ceramic. These four pieces build it without the formality — it reads as heritage, not as a showroom.',
      },
      {
        type: 'quickShop',
        title: 'Quick Shop',
        items: [
          { productId: 'Brushed Micro-Percale Set', note: 'the crisp sheets' },
          { productId: 'Aria Linen Table Lamp', note: 'the classic bedside' },
          { productId: 'Berber-Style Wool Rug', note: 'the pattern' },
          { productId: 'Ceramic Vase Trio', note: 'the finish' },
        ],
      },
      {
        type: 'product',
        productId: 'Brushed Micro-Percale Set',
        status: 'exact',
        text: [
          "Crisp without stiffness — the traditional bed's foundation. The brushed hand keeps it from looking like a hotel that has never had a guest.",
        ],
      },
      {
        type: 'product',
        productId: 'Aria Linen Table Lamp',
        status: 'similar',
        text: [
          "The photograph's lamp has a brass stem; this is the closest classic silhouette. Two of them, either side, is the traditional bed's whole lighting story.",
        ],
      },
      {
        type: 'product',
        productId: 'Berber-Style Wool Rug',
        status: 'exact',
        text: [
          'The quiet pattern under the bed — the traditional move of letting the floor carry the texture while the walls stay calm.',
        ],
      },
      {
        type: 'product',
        productId: 'Ceramic Vase Trio',
        status: 'exact',
        text: [
          'The nightstand finish: three stoneware heights with dry stems. Traditional rooms are finished in small groups, and this is the group.',
        ],
      },
    ],
  },
  /* ============================================================ LIVING ROOM */
  {
    slug: 'living-room-layout-ideas-that-feel-effortless',
    format: 'inspiration',
    title: '10 Living Room Layout Ideas That Feel Effortless',
    subtitle:
      'Effortless layout is a system: the conversation zone, the sightline, the traffic path, and the one anchor each room needs.',
    category: 'Living Room',
    room: 'living-room',
    keywords:
      'living room layout, sofa placement, living room furniture arrangement',
    image: px(p.livingA),
    imageAlt: 'Bright spacious living room with a centered sofa and chandelier',
    description:
      'Ten living room layout moves — conversation zones, anchor pieces, traffic paths, and the arrangements that make a room feel like it was always this way.',
    author: 'Maya Ellison',
    publishedAt: '2026-02-05',
    tags: ['design-ideas', 'living-room', 'furniture', 'small-spaces'],
    body: [
      {
        type: 'prose',
        text: 'A layout feels effortless when three things line up: the conversation zone, the sightline from the door, and the traffic path. These ten moves keep those three honest in rooms of every size.',
      },
      idea(
        1,
        'Pull the sofa off the wall',
        px(p.livingA, 1000, 640),
        'Sofa pulled away from the wall in a bright room',
        [
          'Twelve inches of breathing room behind the sofa changes how the whole room reads — it stops being furniture against a wall and starts being a zone.',
        ],
      ),
      idea(
        2,
        'Build the conversation in a partial circle',
        px(p.livingB, 1000, 640),
        'Sofa and chairs arranged in a conversation group',
        [
          "Sofa, one or two chairs at angles, all facing each other within arm's-reach of the coffee table. The circle is the room; everything else is supporting cast.",
        ],
      ),
      idea(
        3,
        'Anchor the coffee table to the seating, not the rug',
        px(p.livingD, 1000, 640),
        'Coffee table centered on a seating group',
        [
          "The table sits 14–18 inches from the sofa's edge and is centered on the seating group. The rug then sizes itself to the table, not the other way around.",
        ],
      ),
      idea(
        4,
        'Give the TV a neutral wall',
        px(p.livingC, 1000, 640),
        'TV on a calm neutral wall with a chandelier',
        [
          'The screen is furniture now: one neutral wall, one centered screen, and the rest of the room gets to be about the room.',
        ],
      ),
      idea(
        5,
        'Use a console to define the edge',
        px(p.livingG, 1000, 640),
        "Console table defining a living room's edge",
        [
          "A low console along the room's back edge gives the space a boundary and a surface for the lamp, the tray, and the one object.",
        ],
      ),
      idea(
        6,
        'Tuck the reading chair into a corner with a lamp',
        px(p.chairD, 1000, 640),
        'Armchair and lamp in a warm corner',
        [
          "The corner is the room's second living room: one good chair, one lamp at reading height, one stack of books. Corners stop feeling like leftovers.",
        ],
      ),
      idea(
        7,
        'Run the traffic path in one clean arc',
        px(p.livingF, 1000, 640),
        'Open-plan living room with clear circulation',
        [
          'Door to window, one arc, thirty-six inches wide, no furniture in it. The path should be obvious before anyone walks it.',
        ],
      ),
      idea(
        8,
        'Split the room with a low bookcase',
        px(p.livingH, 1000, 640),
        'Room divided by low furniture in an open plan',
        [
          'A low bookcase or sideboard becomes the border between living and dining — a wall you can see through, which open plans need more of.',
        ],
      ),
      idea(
        9,
        'Center the art on the furniture, not the wall',
        px(p.livingE, 1000, 640),
        'Artwork sized to a seating group',
        [
          "Art hangs 8–12 inches above the furniture below it and spans two-thirds of that furniture's width. The room composes itself around the group, not the wall.",
        ],
      ),
      idea(
        10,
        'End with two low lamps and the overhead off',
        px(p.livingC, 1000, 640),
        'Layered low lighting in a styled living room',
        [
          'Two floor or table lamps at different heights, both warm, and the ceiling light off. The evening layout is what a living room is actually for.',
        ],
      ),
      {
        type: 'prose',
        text: 'Start with the conversation circle and the traffic arc — get those two right and eight of the other ten become obvious. Effortless is not a style; it is a layout that has stopped arguing with the room.',
      },
    ],
  },
  {
    slug: 'how-to-choose-a-sofa-youll-love-for-years',
    format: 'buying-guide',
    title: "How to Choose a Sofa You'll Love for Years",
    subtitle:
      "The sofa is the room's furniture decision. This guide covers depth, firmness, frame, and the test that actually predicts how it will feel at year three.",
    category: 'Buying Guide',
    room: 'living-room',
    keywords: 'sofa buying guide, sofa depth, couch firmness, sofa frame',
    image: px(p.livingG),
    imageAlt: 'Modern living room with a substantial sofa',
    description:
      "The framework for buying a sofa: measure the depth you actually sit in, test the firmness honestly, check the frame, and size it to the room's arc.",
    author: 'Maya Ellison',
    publishedAt: '2026-01-17',
    tags: ['buying-guide', 'living-room', 'furniture', 'design-styles'],
    body: [
      {
        type: 'prose',
        text: 'Sofas are bought in twenty minutes and lived with for a decade, which makes the twenty minutes worth doing properly. These are the four decisions, and the one test that predicts year-three happiness better than any showroom sit.',
      },
      { type: 'heading', text: 'Measure the depth you actually sit in' },
      {
        type: 'prose',
        text: "Sit-depth is the number the spec sheet buries: measure from the back cushion to the seat's front edge. Under 20 inches is a proper sitting seat; 22+ is a lounge seat for reading and phones. Decide which you are buying before you sit — a deep sofa feels amazing in the showroom and exhausting on a video call.",
      },
      { type: 'heading', text: 'Test the firmness for your actual use' },
      {
        type: 'prose',
        text: "Sit where you will actually sit — the end for phone-and-snack, the middle for the book — and stay for two minutes. The rule: you should be able to sit up straight without the cushion collapsing, and sink in enough that your heels clear the seat's front edge. Showroom sits are ninety seconds; real sits are two hours.",
      },
      { type: 'heading', text: 'Check the frame before the fabric' },
      {
        type: 'prose',
        text: 'Kiln-dried hardwood frames (maple, oak, ash) with corner-blocked joints are the standard worth paying for; particleboard is the standard to walk away from. Ask directly — a retailer that cannot answer is answering. The fabric is replaceable on many sofas; the frame is not.',
      },
      { type: 'heading', text: "Size it to the room's arc, not the wall" },
      {
        type: 'prose',
        text: 'The sofa should leave the traffic arc clear and the conversation zone intact. A common failure: the sofa that fits the wall perfectly and blocks the path to the window. Measure the arc first, then let the sofa length itself — 84–96 inches covers most rooms.',
      },
      {
        type: 'tip',
        title: 'Before you buy',
        text: 'Buy the fabric a half-tone darker than the wall, not the same. A sofa the exact color of the wall disappears; a sofa a half-tone deeper reads as a piece of furniture, which is the job.',
      },
      {
        type: 'cta',
        eyebrow: 'For the rest of the room',
        title: 'Ten layout ideas that make the sofa work',
        text: 'The conversation zone, the sightline, and the traffic path — the layout system that decides where the sofa goes before you buy it.',
        href: '/story/living-room-layout-ideas-that-feel-effortless',
        ctaLabel: 'See the Layout Ideas',
      },
      {
        type: 'checklist',
        title: 'Sofa checklist',
        items: [
          'Sit-depth matched to how you actually sit (under 20 in for upright, 22+ for lounge)?',
          'Two-minute sit test passed in the seat you will use?',
          'Kiln-dried hardwood frame, corner-blocked?',
          'Fabric a half-tone darker than the wall?',
          'Traffic arc still clear with the sofa placed?',
          'Cushions removable for cleaning?',
        ],
      },
    ],
  },
  {
    slug: '5-living-room-decor-finds-under-75',
    format: 'finds',
    title: '5 Living Room Decor Finds Under $75',
    subtitle:
      'Five small pieces that finish a living room — the mirror, the ottoman, the stoneware lamp, the tray, and the clock.',
    category: 'Shopping Finds',
    room: 'living-room',
    keywords: 'living room decor, decor finds under 75, console decor',
    image: px(p.livingE),
    imageAlt: 'Bright modern living room with layered decor',
    description:
      'Five living room finds under $75 that make a room feel finished: a sunburst mirror, a bouclé ottoman, a stoneware lamp, a display tray set, and a quiet clock.',
    author: 'Jonah Reyes',
    publishedAt: '2026-02-09',
    tags: ['finds', 'living-room'],
    body: [
      {
        type: 'quickBrowse',
        title: 'Quick Browse',
        items: [
          {
            productId: 'Sunburst Mirror',
            name: 'Sunburst Mirror',
            note: 'the wall',
          },
          {
            productId: 'Velvet Storage Ottoman',
            name: 'Bouclé Ottoman',
            note: 'the extra seat',
          },
          {
            productId: 'Stoneware Table Lamp',
            name: 'Stoneware Table Lamp',
            note: 'the corner light',
          },
          {
            productId: 'Book & Display Tray Set',
            name: 'Book & Display Tray Set',
            note: 'the console',
          },
          {
            productId: 'Round Wall Clock',
            name: 'Round Wall Clock',
            note: 'the last inch',
          },
        ],
      },
      {
        type: 'prose',
        text: 'A living room is finished by the last ten percent — the mirror that pulls a wall together, the ottoman that adds a seat and a footrest, the tray that makes a console intentional. These five are that ten percent, all under $75.',
      },
      {
        type: 'product',
        productId: 'Sunburst Mirror',
        text: [
          "The radiating frame that pulls an empty wall together. It works single over a console or doubled in a hallway — the wall's fastest focal point under $75.",
        ],
      },
      {
        type: 'product',
        productId: 'Velvet Storage Ottoman',
        text: [
          "Seat, footrest, and hidden bin in one. The ottoman at the end of the sofa solves the 'where do the legs go' problem and the blanket-pile problem at once.",
        ],
      },
      {
        type: 'product',
        productId: 'Stoneware Table Lamp',
        text: [
          'The low stoneware lamp for the coffee table or the corner — the second light source that takes the room out of overhead-only mode.',
        ],
      },
      {
        type: 'product',
        productId: 'Book & Display Tray Set',
        text: [
          'A walnut tray plus a stacked pair of hardcovers: the fastest way to make a console or sideboard look styled. Five minutes, one surface, done.',
        ],
      },
      {
        type: 'product',
        productId: 'Round Wall Clock',
        text: [
          'The quiet round clock for the spot above the console or in the hallway — the small object that fills the last inch of an otherwise-finished room.',
        ],
      },
      {
        type: 'tip',
        title: 'Editorial Tip',
        text: 'Finish one surface at a time. A living room looks unfinished when every surface is 80% done — look finished when three surfaces are 100% and the rest are empty.',
      },
      {
        type: 'prose',
        text: 'The order to buy them in: the mirror (wall), the ottoman (seating), the lamp (light), the tray set (console), the clock (the last). By the time the clock is up, the room has stopped being a project and started being a room.',
      },
    ],
  },
  /* ============================================================ KITCHEN */
  {
    slug: 'kitchen-counter-organization-9-ideas',
    format: 'howto',
    title: '9 Kitchen Countertop Organization Ideas',
    subtitle:
      "The countertop is the kitchen's most-watched surface. Nine moves that clear it without hiding anything you use daily.",
    category: 'Home Organization',
    room: 'kitchen',
    keywords:
      'kitchen countertop organization, declutter kitchen counter, kitchen storage',
    image: px(p.kitchenC),
    imageAlt: 'Minimalist kitchen countertop with a few intentional objects',
    description:
      'Nine countertop systems: the three-daily-objects rule, the tray zones, the drawer migration, and the small appliances that need to live somewhere else.',
    author: 'Priya Shah',
    publishedAt: '2026-02-02',
    tags: ['kitchen-organization', 'storage-ideas', 'decluttering'],
    body: [
      {
        type: 'prose',
        text: 'A cluttered countertop is usually not a storage problem — it is a home problem. Most of what sits on a counter has no assigned place, so the counter becomes the default. These nine moves give the daily items homes and the rest of it a job.',
      },
      { type: 'heading', text: '1. The three-daily-objects rule' },
      {
        type: 'prose',
        text: 'Pick the three things you genuinely use every day — the kettle, the fruit bowl, the coffee maker — and let them stay. Everything else is a guest, and guests get a home elsewhere. The counter goes from default surface to intentional surface the moment it has a budget of three.',
      },
      { type: 'heading', text: '2. Zone the counter with a tray' },
      {
        type: 'prose',
        text: "A single tray holds the 'in-use zone': the mail, the keys, the pen, the charging cable. What looks like counter clutter inside a tray reads as a staging area — and it has edges, so it cannot spread.",
      },
      { type: 'heading', text: '3. Move the small appliances to the shelf' },
      {
        type: 'prose',
        text: 'The blender, the toaster, the coffee grinder: one open shelf or a small cart takes them off the counter permanently. The rule that makes it stick — the appliance lives where it is used weekly, not where it was bought.',
      },
      { type: 'heading', text: '4. Give the drawer a job' },
      {
        type: 'prose',
        text: 'The drawer under the counter becomes the utensil-and-opens-it drawer: the can opener, the tape, the scissors, the batteries. Small items migrate to the drawer the moment the drawer is organized for them — a utensil crock plus one small bin is enough.',
      },
      { type: 'heading', text: '5. The cabinet-under-cabinet rule' },
      {
        type: 'prose',
        text: "Anything used more than once a week lives within arm's reach: the baking sheet under the cabinet above the oven, the glasses above the sink. The counter clears because the daily items have better homes than it.",
      },
      { type: 'heading', text: '6. One basket for the overflow' },
      {
        type: 'prose',
        text: "A single basket on the counter holds the 'sort later' pile: the opened jar, the new gadget, the thing from the package. The basket is the counter's only permitted mess — and it is the first thing cleared each week.",
      },
      { type: 'heading', text: '7. Hang the towels, not the rail' },
      {
        type: 'prose',
        text: 'Towels on a bar in front of the oven where they are used, one per zone. The rail full of five towels is a storage problem wearing a decor costume; one towel in its working spot is just a towel.',
      },
      { type: 'heading', text: '8. The weekly ten-minute reset' },
      {
        type: 'prose',
        text: 'Ten minutes, one basket, one drawer: the overflow basket gets sorted, the tray gets wiped, and the counter is back to its three objects. The reset is what keeps the system alive — the organization without the weekly pass is a photograph.',
      },
      { type: 'heading', text: '9. Let one object be decor' },
      {
        type: 'prose',
        text: "One bowl, one plant, one small sculpture — the counter's single decorative object. A clear counter with one beautiful thing reads as styled; a clear counter with nothing reads as a waiting room.",
      },
      {
        type: 'tip',
        title: 'Organization Tip',
        text: "The counter test: step back and count the objects. If you can name each one's job in under a minute, the counter is organized. If any object's job is 'it lives here,' the system has a hole.",
      },
      {
        type: 'prose',
        text: 'Start with the three-daily rule and the appliance shelf — those two moves clear 80% of most counters. The rest is maintenance, and the weekly ten-minute pass is the whole maintenance plan.',
      },
    ],
  },
  {
    slug: 'how-to-organize-your-kitchen-cabinets',
    format: 'howto',
    title: 'How to Organize Your Kitchen Cabinets',
    subtitle:
      'Cabinets fail when everything is stored by category instead of by use. The fix is zones, not labels.',
    category: 'Home Organization',
    room: 'kitchen',
    keywords:
      'kitchen cabinet organization, pantry organization, kitchen storage system',
    image: px(p.pantryA),
    imageAlt: 'Coordinated canisters filling an organized kitchen cabinet',
    description:
      'A zone-based system for kitchen cabinets: cooking zone, baking zone, dish zone, and the shelf layout that keeps each one closed and clean.',
    author: 'Priya Shah',
    publishedAt: '2026-01-20',
    tags: ['kitchen-organization', 'storage-ideas'],
    body: [
      {
        type: 'prose',
        text: 'Most cabinet organization is sorted by what things are — plates with plates, pans with pans — which is why everything you need is in three different cabinets. The fix is sorting by what things do: zones around the tasks they belong to.',
      },
      { type: 'heading', text: 'The cooking zone' },
      {
        type: 'prose',
        text: "The cabinet next to the stove holds the cooking day: the daily pans, the oil, the seasoners, the spatula set, the oven mitt. One cabinet, one task, everything within an arm's reach while the pan is hot. The rule: if you use it while cooking, it lives within two steps of the stove.",
      },
      { type: 'heading', text: 'The dish zone' },
      {
        type: 'prose',
        text: 'The cabinet above the sink holds the dishes you use every day — not all the dishes, the daily set. The full collection lives on the upper shelves or in the cabinet that stays closed; the daily set lives where the dishes go after the sink. Load, rinse, dry, stack, close: the loop that keeps the cabinet earning its spot.',
      },
      { type: 'heading', text: 'The baking and prep zone' },
      {
        type: 'prose',
        text: "One cabinet or a shelf section for baking: the pans, the measuring cups, the mixing bowls nested, the rolling pin. Prep tools — the peeler, the knife, the cutting board — live in the drawer nearest the prep surface, not in a 'utensil drawer' across the room.",
      },
      { type: 'heading', text: 'The shelf layout that keeps zones closed' },
      {
        type: 'prose',
        text: 'Heavy items low, daily items at eye level, seasonal items on the top shelf. Front of the shelf for the daily, back for the spare. A cabinet where the daily items are in front stays closed, because nothing needs to be reached past anything else.',
      },
      {
        type: 'tip',
        title: 'Organization Tip',
        text: 'One category per cabinet, and when a cabinet has two categories, one of them is in the wrong cabinet. The two-category cabinet is where systems go to die.',
      },
      {
        type: 'prose',
        text: 'Organize the three zones in one afternoon: cooking, dish, and prep. The cabinets do not need to be perfectly sorted to work — they need to be zoned, and a zoned cabinet stays organized without supervision.',
      },
    ],
  },
  {
    slug: '5-best-kitchen-storage-containers',
    format: 'finds',
    title: '5 Best Kitchen Storage Containers',
    subtitle:
      'Five container sets that make a kitchen read as organized — glass jars, canisters, stoneware bowls, stretch lids, and the labels that finish it.',
    category: 'Shopping Finds',
    room: 'kitchen',
    keywords:
      'kitchen storage containers, pantry containers, airtight canisters',
    image: px(p.pantryB),
    imageAlt: 'Clear glass jars filled with pantry goods on a shelf',
    description:
      'Five storage container picks for the kitchen: the 12-pack of glass jars, the matched canister set, stoneware lidded bowls, silicone stretch lids, and the label set that finishes the shelf.',
    author: 'Jonah Reyes',
    publishedAt: '2026-01-26',
    tags: ['kitchen-organization', 'finds', 'storage-ideas'],
    body: [
      {
        type: 'quickBrowse',
        title: 'Quick Browse',
        items: [
          {
            productId: 'Glass Food Storage Jars (12-Pack)',
            name: 'Glass Food Jars (12-Pack)',
            note: 'the pantry',
          },
          {
            productId: 'Airtight Canister Set',
            name: 'Airtight Canister Set',
            note: 'the counter',
          },
          {
            productId: 'Stoneware Lidded Bowls',
            name: 'Stoneware Lidded Bowls',
            note: 'the open shelf',
          },
          {
            productId: 'Silicone Stretch Lids (Set of 8)',
            name: 'Silicone Stretch Lids',
            note: 'the swap',
          },
          {
            productId: 'Pantry Label Set',
            name: 'Pantry Label Set',
            note: 'the finish',
          },
        ],
      },
      {
        type: 'prose',
        text: 'A kitchen reads as organized when the dry goods are in matched, airtight containers — the effect does not depend on what is inside, only on what it is in. These five cover the pantry, the counter, and the swap that cuts the wrap.',
      },
      {
        type: 'product',
        productId: 'Glass Food Storage Jars (12-Pack)',
        text: [
          'Uniform airtight jars that make a pantry read as organized the moment they go on the shelf. The lids are genuinely airtight, and the size spread covers oats to spices.',
        ],
      },
      {
        type: 'product',
        productId: 'Airtight Canister Set',
        text: [
          'A matched set of four canisters in four sizes: coffee, tea, pasta, and the snack drawer all get a home. The matched set is the point — four different containers is four different decisions.',
        ],
      },
      {
        type: 'product',
        productId: 'Stoneware Lidded Bowls',
        text: [
          'Hand-glazed stoneware that stacks and seals. Prettier than plastic on an open shelf, sturdier than most pottery — the bowl for the counter you can see.',
        ],
      },
      {
        type: 'product',
        productId: 'Silicone Stretch Lids (Set of 8)',
        text: [
          'Stretch-on lids for jars, bowls, and the cut avocado. The small swap that cuts a surprising amount of single-use wrap, and the one guests always ask about.',
        ],
      },
      {
        type: 'product',
        productId: 'Pantry Label Set',
        text: [
          'Fifty-four chalk-style labels that finish the transformation. Write once, benefit every time the shelf is opened — and the labels are what keep the jars from swapping contents.',
        ],
      },
      {
        type: 'tip',
        title: 'Editorial Tip',
        text: 'Buy one size family, not one size per item. A shelf of three jar sizes reads as a system; a shelf of nine reads as a clearance bin.',
      },
      {
        type: 'prose',
        text: 'The order to buy: the jars for the pantry, the canisters for the counter, then the stretch lids and the labels. By the time the labels go on, the kitchen has stopped looking stored and started looking organized — which is the whole difference.',
      },
    ],
  },
  /* ============================================================ BATHROOM */
  {
    slug: '7-small-bathroom-organization-ideas',
    format: 'howto',
    title: '7 Small Bathroom Organization Ideas',
    subtitle:
      'A small bathroom is a vertical problem. Seven moves that use the wall, the door, and the under-sink space without adding a single cabinet.',
    category: 'Home Organization',
    room: 'bathroom',
    keywords:
      'small bathroom organization, bathroom storage ideas, under sink storage',
    image: px(p.bathG),
    imageAlt: 'Modern minimalist bathroom with double sink and mirror',
    description:
      'Seven small-bathroom systems: the under-sink reset, the towel rotation, the medicine cabinet audit, and the door and wall moves that add storage for free.',
    author: 'Priya Shah',
    publishedAt: '2026-01-31',
    tags: [
      'bathroom-organization',
      'small-space-organization',
      'storage-ideas',
    ],
    body: [
      {
        type: 'prose',
        text: 'Small bathrooms fail on three surfaces: the counter, the under-sink cabinet, and the towel rack. Fix those three and the wall and door moves are bonuses. Here are the seven, in the order they pay off.',
      },
      { type: 'heading', text: '1. The under-sink reset' },
      {
        type: 'prose',
        text: 'The under-sink cabinet holds the plunger, the cleaner, the hairdryer, three bottles of shampoo, and the thing you bought last year. Clear it, add two stackable bins — one for the daily (cleaner, the one shampoo), one for the rest — and the cabinet goes from cave to system in an hour.',
      },
      { type: 'heading', text: '2. The counter budget: three objects' },
      {
        type: 'prose',
        text: "The daily-five (toothbrush, the one soap, the one lotion, the cup, the paper towel roll) plus one decorative object is the counter's whole budget. Everything else — the spare towels, the guest kit, the product you are testing — goes in the cabinet or the shelf.",
      },
      { type: 'heading', text: '3. The towel rotation' },
      {
        type: 'prose',
        text: 'Two hand towels in rotation, two bath towels in rotation, on the rack; the rest in a bin or the linen closet. The rack holding six towels is a storage problem wearing a bathrobe; two in rotation is a towel rack.',
      },
      { type: 'heading', text: '4. The medicine cabinet audit' },
      {
        type: 'prose',
        text: "Expire what is expired, donate what is duplicated, and give the cabinet one layout: daily products front, the first-aid section back, one small bin for the 'bathroom stuff' pile. The cabinet is the small bathroom's most underused square foot.",
      },
      { type: 'heading', text: '5. The door and the wall' },
      {
        type: 'prose',
        text: "The back of the door takes a hook rack or a small shelf for the hair tools; the wall takes one floating shelf for the daily-five backup. Both are free real estate — the small bathroom's version of the vertical cabinet.",
      },
      { type: 'heading', text: '6. The shower caddy, honestly' },
      {
        type: 'prose',
        text: 'One caddy, one shelf, and the rule that anything used less than weekly leaves the shower. The shower is not a storage unit; it is a wet room. The caddy holds the daily; the rest lives in the medicine cabinet.',
      },
      { type: 'heading', text: '7. The weekly two-minute pass' },
      {
        type: 'prose',
        text: "Two minutes with the shower: wipe the counter, reset the towels, return the guests' items to the cabinet. The small bathroom's system is small — the pass has to be smaller.",
      },
      {
        type: 'tip',
        title: 'Organization Tip',
        text: 'The small bathroom rule: everything you use daily is visible, everything you use weekly is in the cabinet, everything else is not in the bathroom. Three tiers, no exceptions.',
      },
      {
        type: 'prose',
        text: 'Do the under-sink reset and the counter budget first — those two moves clear most of a small bathroom. The rest is refinement, and the weekly two-minute pass is what keeps it that way.',
      },
    ],
  },
  {
    slug: '4-best-bathroom-storage-finds',
    format: 'finds',
    title: '4 Best Bathroom Storage Finds for Small Rooms',
    subtitle:
      'Four storage pieces that fit a small bathroom — the floating shelf, the towel basket, the linen set, and the over-door organizer.',
    category: 'Shopping Finds',
    room: 'bathroom',
    keywords: 'bathroom storage, small bathroom finds, floating shelf bathroom',
    image: px(p.bathH),
    imageAlt: 'Warm wood and neutral tile in a small modern bathroom',
    description:
      'Four bathroom storage finds for small rooms: the floating bamboo shelf, the rattan towel basket, the cotton-linen towel set, and the over-door organizer.',
    author: 'Jonah Reyes',
    publishedAt: '2026-01-09',
    tags: ['bathroom-organization', 'finds', 'small-space-organization'],
    body: [
      {
        type: 'quickBrowse',
        title: 'Quick Browse',
        items: [
          {
            productId: 'Floating Bamboo Shelf',
            name: 'Floating Bamboo Shelf',
            note: 'the wall',
          },
          {
            productId: 'Rattan Towel Basket',
            name: 'Rattan Towel Basket',
            note: 'the floor',
          },
          {
            productId: 'Linen Bath Towel Set (4-Piece)',
            name: 'Linen Bath Towel Set',
            note: 'the rotation',
          },
          {
            productId: 'Over-Door Hanging Organizer',
            name: 'Over-Door Organizer',
            note: 'the door',
          },
        ],
      },
      {
        type: 'prose',
        text: "Small bathroom storage is about four surfaces: the wall, the floor corner, the towel rack's overflow, and the door. These four finds cover all four, and none of them require a remodel.",
      },
      {
        type: 'product',
        productId: 'Floating Bamboo Shelf',
        text: [
          'The 24-inch floating shelf that replaces the counter with the wall. It holds the daily-five backup — the guest soap, the spare lotion, the hair tool — off the counter and at eye level.',
        ],
      },
      {
        type: 'product',
        productId: 'Rattan Towel Basket',
        text: [
          'The woven basket for dry towels, keeping them off the floor and out of the cabinet. The rattan texture keeps it reading as decor rather than a laundry hamper, which is the whole job.',
        ],
      },
      {
        type: 'product',
        productId: 'Linen Bath Towel Set (4-Piece)',
        text: [
          'A four-piece cotton-linen set that dries fast and softens fast — the rotation set that makes the two-towel system actually work. Heavier than drugstore, lighter than waffle, and it looks like it.',
        ],
      },
      {
        type: 'product',
        productId: 'Over-Door Hanging Organizer',
        text: [
          "The sixteen-pocket organizer for the back of the bathroom door: the hair accessories, the cotton pads, the product samples, the 'bathroom stuff' pile. The door was going to be empty anyway.",
        ],
      },
      {
        type: 'tip',
        title: 'Editorial Tip',
        text: "Small bathroom storage should be bought in the room's material — bamboo and rattan for a warm room, steel and glass for a cool one. The storage is decor the moment it matches the room it lives in.",
      },
      {
        type: 'prose',
        text: 'The order: the shelf (wall), the basket (floor), the towels (rotation), the organizer (door). By the time the door is done, the bathroom has four storage surfaces and not one of them is a cabinet.',
      },
    ],
  },
  /* ============================================================ OTHER SHOP-THE-LOOK */
  {
    slug: 'shop-this-organic-modern-living-room',
    format: 'shop-the-look',
    title: 'Shop This Organic Modern Living Room',
    subtitle:
      'Curved lines, bouclé, and warm wood — the organic modern formula in five pieces.',
    category: 'Shop the Look',
    room: 'living-room',
    keywords:
      'organic modern living room, curved furniture living room, warm modern living room',
    image: px(p.livingD),
    imageAlt: 'Minimalist living room with a curved beige sofa',
    description:
      'Five pieces for the organic modern living room: the bouclé chair, the flatweave rug, the dome lamp, the vase trio, and the storage ottoman.',
    author: 'Jonah Reyes',
    publishedAt: '2026-02-12',
    tags: ['shop-the-look', 'living-room', 'organic-modern'],
    body: [
      {
        type: 'prose',
        text: 'Organic modern is curves, warm wood, and one plush texture — a room that feels modern by line and warm by material. These five pieces build the formula without the full-furnishment budget.',
      },
      {
        type: 'quickShop',
        title: 'Quick Shop',
        items: [
          { productId: 'Bouclé Accent Chair', note: 'the curve' },
          { productId: 'Flatweave Wool Rug', note: 'the floor' },
          { productId: 'Halo Dome Table Lamp', note: 'the glow' },
          { productId: 'Ceramic Vase Trio', note: 'the console' },
          { productId: 'Velvet Storage Ottoman', note: 'the foot' },
        ],
      },
      {
        type: 'product',
        productId: 'Bouclé Accent Chair',
        status: 'similar',
        text: [
          "The photograph's chair is a touch larger; this is the closest compact curve. It is the room's single loudest move — the bouclé is what makes 'modern' read as 'organic' instead of 'clinical.'",
        ],
      },
      {
        type: 'product',
        productId: 'Flatweave Wool Rug',
        status: 'exact',
        text: [
          'The tonal flatweave under the seating group — the texture that keeps the warm palette grounded. Low profile, quiet pattern, and it anchors the curve of the chair.',
        ],
      },
      {
        type: 'product',
        productId: 'Halo Dome Table Lamp',
        status: 'exact',
        text: [
          'The dome lamp on the console, pushing warm light up the wall. Organic modern rooms live by their evening glow, and the dome is the shape that produces it.',
        ],
      },
      {
        type: 'product',
        productId: 'Ceramic Vase Trio',
        status: 'exact',
        text: [
          "The console finish: three stoneware heights with dry stems. The trio is the organic-modern version of 'styled surface' — natural material, odd numbers, no clutter.",
        ],
      },
      {
        type: 'product',
        productId: 'Velvet Storage Ottoman',
        status: 'similar',
        text: [
          "The ottoman at the end of the seating — footrest, extra seat, and hidden bin. The photograph's version is a touch plumper; this is the closest shape that also stores.",
        ],
      },
    ],
  },
  {
    slug: 'shop-this-japandi-kitchen',
    format: 'shop-the-look',
    title: 'Shop This Japandi Kitchen',
    subtitle:
      'Pale wood, stoneware, and quiet greenery — the Japandi kitchen formula in four pieces.',
    category: 'Shop the Look',
    room: 'kitchen',
    keywords:
      'japandi kitchen, japanese scandinavian kitchen, warm minimal kitchen',
    image: px(p.kitchenB),
    imageAlt: 'Contemporary kitchen with warm wood furniture',
    description:
      'Four pieces for the Japandi kitchen: the seagrass baskets, the walnut tray, the olive tree, and the stoneware bowls.',
    author: 'Jonah Reyes',
    publishedAt: '2026-01-24',
    tags: ['shop-the-look', 'kitchen', 'scandinavian'],
    body: [
      {
        type: 'prose',
        text: 'The Japandi kitchen is the quiet end of modern: pale wood, stoneware, natural fiber, and one living element. Four pieces, and the kitchen has the formula — no repaint, no remodel, just the objects.',
      },
      {
        type: 'quickShop',
        title: 'Quick Shop',
        items: [
          {
            productId: 'Stackable Seagrass Baskets (Set of 3)',
            note: 'the fiber',
          },
          { productId: 'Walnut Bedside Tray', note: 'the counter' },
          { productId: 'Faux Olive Tree, 4 ft', note: 'the green' },
          { productId: 'Stoneware Lidded Bowls', note: 'the shelf' },
        ],
      },
      {
        type: 'product',
        productId: 'Stackable Seagrass Baskets (Set of 3)',
        status: 'exact',
        text: [
          "The fiber layer: seagrass baskets on the open shelf for the dry goods and the fruit. Natural fiber is the material that makes 'minimal' read as 'Japandi' instead of 'empty.'",
        ],
      },
      {
        type: 'product',
        productId: 'Walnut Bedside Tray',
        status: 'similar',
        text: [
          "The photograph's tray is a half-inch wider; this is the closest walnut. On the counter it holds the daily-carry — the keys, the card, the pen — and reads as decor while doing it.",
        ],
      },
      {
        type: 'product',
        productId: 'Faux Olive Tree, 4 ft',
        status: 'exact',
        text: [
          'The one living element, low and dense, in the corner the kitchen always leaves bare. The greenery is the Japandi move that keeps the pale palette from going quiet.',
        ],
      },
      {
        type: 'product',
        productId: 'Stoneware Lidded Bowls',
        status: 'exact',
        text: [
          "The shelf's stoneware: hand-glazed, stacked, sealed. The bowl set is the kitchen's version of the vase trio — natural material, matched set, zero clutter.",
        ],
      },
    ],
  },
  {
    slug: 'shop-this-fresh-white-bathroom',
    format: 'shop-the-look',
    title: 'Shop This Fresh White Bathroom',
    subtitle:
      'A bright white bathroom with warm light and linen — five pieces that keep it fresh instead of clinical.',
    category: 'Shop the Look',
    room: 'bathroom',
    keywords:
      'white bathroom shopping, bright bathroom look, spa bathroom style',
    image: px(p.bathA),
    imageAlt: 'Bright white bathroom with a tub and glass shower',
    description:
      'Five pieces for the fresh white bathroom: the linen towel set, the warm bulbs, the diffuser, the rattan basket, and the vase duo.',
    author: 'Jonah Reyes',
    publishedAt: '2026-01-16',
    tags: ['shop-the-look', 'bathroom'],
    body: [
      {
        type: 'prose',
        text: 'White bathrooms fail when the light is cold and the textures are all hard. The fix is five warm things: linen towels, warm bulbs, a soft basket, a scent, and one ceramic. Here is the list.',
      },
      {
        type: 'quickShop',
        title: 'Quick Shop',
        items: [
          { productId: 'Linen Bath Towel Set (4-Piece)', note: 'the linen' },
          { productId: 'Warm White LED Bulbs (4-Pack)', note: 'the warmth' },
          { productId: 'Rattan Towel Basket', note: 'the fiber' },
          { productId: 'Reed Diffuser Set', note: 'the scent' },
          { productId: 'Ceramic Vase Trio', note: 'the ceramic' },
        ],
      },
      {
        type: 'product',
        productId: 'Linen Bath Towel Set (4-Piece)',
        status: 'exact',
        text: [
          'The cotton-linen set in a warm white — the texture that keeps a white bathroom from reading as a clinic. Two in rotation on the rack, two in the basket.',
        ],
      },
      {
        type: 'product',
        productId: 'Warm White LED Bulbs (4-Pack)',
        status: 'exact',
        text: [
          'The 2700K swap: the single highest-impact change in a white bathroom. Cold light makes white read as sterile; warm light makes it read as fresh.',
        ],
      },
      {
        type: 'product',
        productId: 'Rattan Towel Basket',
        status: 'exact',
        text: [
          "The woven basket for the spare towels — the fiber layer that softens the all-ceramic room. It also solves the 'where do the spare towels go' question.",
        ],
      },
      {
        type: 'product',
        productId: 'Reed Diffuser Set',
        status: 'exact',
        text: [
          'The eucalyptus-cedar set on the counter — the scent layer that makes a white bathroom feel like a spa instead of a showroom.',
        ],
      },
      {
        type: 'product',
        productId: 'Ceramic Vase Trio',
        status: 'similar',
        text: [
          'The photograph shows a duo; this is the closest stoneware family. One or two of the trio on the counter, with dry stems — the ceramic that keeps the palette warm.',
        ],
      },
    ],
  },
];
