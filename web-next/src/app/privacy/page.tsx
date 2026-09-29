import type { Metadata } from 'next';
import { UtilityPage } from '@/components/utility-page';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'What Nest Nabber collects and how it is used.',
};

export default function PrivacyPage() {
  return (
    <UtilityPage
      title="Privacy Policy"
      eyebrow="Your Data"
      intro="The short version: Nest Nabber collects as little as possible, and the things you choose to store locally never leave your device."
      blocks={[
        {
          h: 'Saved articles and likes',
          p: 'Saves and likes are stored in your browser on your device only. We do not operate reader accounts in this version of the site, which means there is no account data to leak, sync, or sell — and it also means saved articles live on that device and are not carried to a new browser.',
        },
        {
          h: 'Newsletter sign-ups',
          p: 'Newsletter integration is pending. Signup is disabled and this site does not currently collect or store email addresses for a newsletter.',
        },
        {
          h: 'Affiliate links',
          p: "Links to retailers may include affiliate identifiers. This does not track you personally on our site; it attributes a purchase to our referral if you complete a purchase at the retailer, subject to the retailer's own tracking and cookie policies.",
        },
        {
          h: 'Contact',
          p: 'If you contact us, we keep your email to reply and to follow up if you ask us to. We do not add contact emails to the newsletter list without your explicit sign-up.',
        },
      ]}
    />
  );
}
