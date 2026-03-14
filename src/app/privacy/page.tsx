'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className='min-h-screen bg-premium-light dark:bg-premium-dark'>
      <div className='container mx-auto px-4 py-12'>
        <div className='max-w-3xl mx-auto'>
          {/* Back Link */}
          <Link href='/'>
            <Button variant='ghost' className='mb-8 -ml-4'>
              <ArrowLeft className='w-4 h-4 mr-2' />
              Back to Home
            </Button>
          </Link>

          {/* Header */}
          <div className='flex items-center gap-4 mb-8'>
            <div className='w-12 h-12 rounded-xl gradient-terracotta flex items-center justify-center'>
              <Shield className='w-6 h-6 text-white' />
            </div>
            <div>
              <h1 className='text-3xl font-bold'>Privacy Policy</h1>
              <p className='text-muted-foreground'>Last updated: January 2026</p>
            </div>
          </div>

          {/* Content */}
          <div className='prose prose-neutral dark:prose-invert max-w-none'>
            <section className='mb-8'>
              <h2 className='text-xl font-semibold mb-4'>1. Introduction</h2>
              <p className='text-muted-foreground leading-relaxed'>
                Welcome to Konect. We take your privacy seriously and are committed to protecting 
                your personal data. This privacy policy explains how we collect, use, and safeguard 
                your information when you use our friendship app.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-xl font-semibold mb-4'>2. Information We Collect</h2>
              <p className='text-muted-foreground leading-relaxed mb-4'>
                We collect the following types of information:
              </p>
              <ul className='list-disc list-inside text-muted-foreground space-y-2'>
                <li><strong>Account Information:</strong> Email address, phone number (for verification), date of birth</li>
                <li><strong>Profile Information:</strong> Name, bio, interests, photos, voice notes</li>
                <li><strong>Location Data:</strong> Approximate location (city-level only, not precise coordinates)</li>
                <li><strong>Usage Data:</strong> How you interact with the app, features used, connections made</li>
                <li><strong>Communication Data:</strong> Messages and voice notes exchanged through the app</li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-xl font-semibold mb-4'>3. How We Use Your Information</h2>
              <p className='text-muted-foreground leading-relaxed mb-4'>
                We use your information to:
              </p>
              <ul className='list-disc list-inside text-muted-foreground space-y-2'>
                <li>Create and maintain your account</li>
                <li>Match you with compatible people nearby</li>
                <li>Verify user identity and maintain safety</li>
                <li>Facilitate communication between users</li>
                <li>Improve our services and develop new features</li>
                <li>Send important notifications about your account</li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-xl font-semibold mb-4'>4. Location Privacy</h2>
              <p className='text-muted-foreground leading-relaxed'>
                Your privacy is paramount. We never store or display your exact coordinates. 
                Location is shown only as approximate distance (e.g., "0.5 miles away") or 
                place names you choose to share. You can enable Incognito Mode to hide your 
                presence entirely while still browsing.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-xl font-semibold mb-4'>5. Data Sharing</h2>
              <p className='text-muted-foreground leading-relaxed'>
                We do not sell your personal data. We may share information with:
              </p>
              <ul className='list-disc list-inside text-muted-foreground space-y-2'>
                <li>Service providers who assist in operating our platform</li>
                <li>Legal authorities when required by law</li>
                <li>Other users, only the information you choose to display on your profile</li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-xl font-semibold mb-4'>6. Your Rights (GDPR & CCPA)</h2>
              <p className='text-muted-foreground leading-relaxed mb-4'>
                You have the right to:
              </p>
              <ul className='list-disc list-inside text-muted-foreground space-y-2'>
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Delete your account and all associated data</li>
                <li>Export your data in a portable format</li>
                <li>Opt out of marketing communications</li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-xl font-semibold mb-4'>7. Data Retention</h2>
              <p className='text-muted-foreground leading-relaxed'>
                We retain your data only as long as necessary to provide our services. 
                When you delete your account, we remove your personal information within 
                30 days, except where retention is required by law.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-xl font-semibold mb-4'>8. Children&apos;s Privacy</h2>
              <p className='text-muted-foreground leading-relaxed'>
                Konect is for users 18 years and older. We do not knowingly collect data 
                from children. If we learn we have collected information from a child under 18, 
                we will delete it immediately.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-xl font-semibold mb-4'>9. Security</h2>
              <p className='text-muted-foreground leading-relaxed'>
                We implement industry-standard security measures including encryption, 
                secure servers, and regular security audits. However, no method of 
                transmission over the internet is 100% secure.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-xl font-semibold mb-4'>10. Contact Us</h2>
              <p className='text-muted-foreground leading-relaxed'>
                If you have questions about this Privacy Policy, please{' '}
                <Link href='/contact' className='text-primary hover:underline'>
                  contact us
                </Link>{' '}
                or email us at{' '}
                <a href='mailto:privacy@konect.app' className='text-primary hover:underline'>
                  privacy@konect.app
                </a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
