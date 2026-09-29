import type { Metadata } from 'next';
import { UtilityPage } from '@/components/utility-page';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description: 'How affiliate links work at Nest Nabber, in plain language.',
};

export default function AffiliateDisclosurePage() {
  return (
    <UtilityPage
      title="Affiliate Disclosure"
      eyebrow="The Honest Version"
      intro="Some links on Nest Nabber are affiliate links. Here is exactly what that means, and exactly what it does not."
      blocks={[
        {
          h: 'What it means',
          p: 'When you buy through a link on this site, the retailer (or its affiliate network) may pay Nest Nabber a small commission. This is how an independent publication like this one stays funded — it pays for the writing, the research, and the photography.',
        },
        {
          h: 'What it does not mean',
          list: [
            'Commissions never change what we recommend, the order of recommendations, or the labels we use (Best Overall, Best Budget, etc.).',
            "It never changes the price you pay — you pay the retailer's listed price, exactly as if you had found the product yourself.",
            'We do not disclose a product to appear: retailers cannot pay for placement in editorial coverage.',
          ],
        },
        {
          h: 'Prices and availability',
          p: 'Prices are checked at the time of publishing and can change at any time. When we mark a product as unavailable, the purchase button is disabled rather than pointing you at a page that cannot deliver.',
        },
        {
          h: 'Where to see it',
          p: 'Shopping articles carry a short disclosure near the top of the page. If you are ever unsure whether a link is an affiliate link, assume it may be — and know that the editorial decision was made before the link was ever considered.',
        },
      ]}
    />
  );
}
