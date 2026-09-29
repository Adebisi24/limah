import type { Metadata } from 'next';
import { UtilityPage } from '@/components/utility-page';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Who publishes Nest Nabber and how the editorial and shopping sections work.',
};

export default function AboutPage() {
  return (
    <UtilityPage
      title="About Nest Nabber"
      eyebrow="The Publication"
      intro="Nest Nabber is an independent home and interiors publication. We write for the person actually living in the room — the one balancing a real budget, a real floor plan, and a real evening."
      blocks={[
        {
          h: 'What we publish',
          p: 'Four kinds of work, all in service of a better home: room-by-room design inspiration, practical organization advice, honest shopping coverage (finds, best-product comparisons, buying guides, and shop-the-look rooms), and the editorial that connects them.',
        },
        {
          h: 'How we work',
          list: [
            'Editorial and commerce are separate decisions: a product is included because it belongs in a real room, and it is linked because readers can find it.',
            'Prices are checked at the time of publishing and we say when they may have moved — we do not pretend to live prices.',
            'We mark trade-offs. A product page that only lists strengths is a sales page; ours lists what each pick gives up.',
            'Shop the Look rooms are honest about sourcing: exact product where we can buy it, similar look where we cannot.',
          ],
        },
        {
          h: 'The newsletter',
          p: 'The Nest Nabber Letter is the place where the best of the site lands in your inbox. Delivery is launching soon; sign-ups are already being collected and will be the first to receive issues. See the newsletter note on any page for details.',
        },
      ]}
    />
  );
}
