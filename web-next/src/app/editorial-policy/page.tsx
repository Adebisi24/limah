import type { Metadata } from 'next';
import { UtilityPage } from '@/components/utility-page';

export const metadata: Metadata = {
  title: 'Editorial Policy',
  description: 'How Nest Nabber produces its editorial and shopping coverage.',
};

export default function EditorialPolicyPage() {
  return (
    <UtilityPage
      title="Editorial Policy"
      eyebrow="How We Work"
      intro="The rules Nest Nabber publishes by, in plain language. If a practice changes, this page changes with it."
      blocks={[
        {
          h: 'Independence',
          p: 'Nest Nabber is independently published. No retailer, manufacturer, or affiliate network decides what we recommend, in what order, or with what label. Retailers can provide products for review at their request, but participation never changes the verdict.',
        },
        {
          h: 'Recommendations',
          p: 'Product coverage (Shopping Finds, Best Products, Shop the Look) is editorial in every case. A product appears because it fits the room and the brief — price point, size, material, and the trade-offs we are willing to name. We do not sell placements, and we do not use fake urgency, countdowns, or invented scarcity anywhere on the site.',
        },
        {
          h: 'Accuracy',
          p: 'Specifications come from manufacturer listings, prices from retailer pages, and both are checked at the time of publishing. When a product or price changes materially, the article is updated and carries an updated date. We state our method in each guide rather than claiming testing we have not done.',
        },
        {
          h: 'Corrections',
          p: 'Errors are corrected promptly and, for material errors, noted on the page. Readers can report corrections through the contact page.',
        },
      ]}
    />
  );
}
