import type { Metadata } from 'next';
import { UtilityPage } from '@/components/utility-page';

export const metadata: Metadata = {
  title: 'Terms',
  description: 'Terms of use for the Nest Nabber website.',
};

export default function TermsPage() {
  return (
    <UtilityPage
      title="Terms of Use"
      eyebrow="The Fine Print, Plainly"
      intro="By using nestnabber.com you agree to the following. It is short on purpose."
      blocks={[
        {
          h: 'Use of the site',
          p: 'The content on Nest Nabber — articles, photography, and design — is for personal, non-commercial use. You may share links to articles freely; republishing content without permission is not allowed.',
        },
        {
          h: 'Product information',
          p: 'Product names, specifications, and prices are provided by manufacturers and retailers and change without notice. Nest Nabber does not sell products directly through the site and is not responsible for transactions between you and a retailer, including delivery, returns, or product performance.',
        },
        {
          h: 'Affiliate links',
          p: 'Some outbound links are affiliate links as described on our Affiliate Disclosure page. Use of those links is at your option; your price is unaffected.',
        },
        {
          h: 'Liability',
          p: 'The site is provided as-is. To the extent permitted by law, Nest Nabber is not liable for decisions made based on the content of the site, including purchasing decisions and room renovations.',
        },
      ]}
    />
  );
}
