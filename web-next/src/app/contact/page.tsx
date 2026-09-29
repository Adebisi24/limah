import type { Metadata } from 'next';
import { UtilityPage } from '@/components/utility-page';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact the Nest Nabber editorial team.',
};

export default function ContactPage() {
  return (
    <UtilityPage
      title="Contact"
      eyebrow="Get in Touch"
      intro="Corrections, product suggestions, retailer links that have gone stale, or a room you think we should cover — the inbox is open."
      blocks={[
        {
          h: 'Editorial',
          p: 'For corrections, sourcing questions, or story ideas, email the editorial desk at abdullahiabdulrafiu001@gmail.com. We read everything, and corrections get fixed on the page itself with an updated date.',
        },
        {
          h: 'Shopping notes',
          p: 'If a price or a retailer link has changed since we published it, a note helps. Include the article and the product, and we will re-check it against the retailer and update the piece.',
        },
        {
          h: 'Press & partnerships',
          p: 'For press requests and retailer partnerships, include your outlet and the scope of the request in your first email. We do not accept paid placement in editorial recommendations.',
        },
      ]}
    />
  );
}
