'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText } from 'lucide-react';

export default function TermsOfServicePage() {
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
              <FileText className='w-6 h-6 text-white' />
            </div>
            <div>
              <h1 className='text-3xl font-bold'>Terms of Service</h1>
              <p className='text-muted-foreground'>Last updated: January 2026</p>
            </div>
          </div>

          {/* Content */}
          <div className='prose prose-neutral dark:prose-invert max-w-none'>
            <section className='mb-8'>
              <h2 className='text-xl font-semibold mb-4'>1. Acceptance of Terms</h2>
              <p className='text-muted-foreground leading-relaxed'>
                By downloading, accessing, or using Konect (&quot;the App&quot;), you agree to be bound 
                by these Terms of Service. If you do not agree to these terms, please do not 
                use the App.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-xl font-semibold mb-4'>2. Description of Service</h2>
              <p className='text-muted-foreground leading-relaxed'>
                Konect is a friendship app designed to help people form genuine connections. 
                Our core features include:
              </p>
              <ul className='list-disc list-inside text-muted-foreground space-y-2 mt-4'>
                <li>AI-powered matching based on personality and interests</li>
                <li>Proximity-based discovery of nearby users</li>
                <li>Micro-events and group gatherings</li>
                <li>Circles (friend groups) functionality</li>
                <li>Voice-first messaging with text unlock</li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-xl font-semibold mb-4'>3. Free-For-5 Model</h2>
              <p className='text-muted-foreground leading-relaxed'>
                Konect operates on a unique model: your first 5 successful meetups are 
                completely free. After that, you may choose to support us through an 
                optional subscription. This model ensures we only succeed when you do.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-xl font-semibold mb-4'>4. User Eligibility</h2>
              <p className='text-muted-foreground leading-relaxed'>
                To use Konect, you must:
              </p>
              <ul className='list-disc list-inside text-muted-foreground space-y-2 mt-4'>
                <li>Be at least 18 years old</li>
                <li>Provide accurate information during registration</li>
                <li>Complete phone verification</li>
                <li>Not be prohibited from using the service under applicable law</li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-xl font-semibold mb-4'>5. User Conduct</h2>
              <p className='text-muted-foreground leading-relaxed mb-4'>
                You agree NOT to:
              </p>
              <ul className='list-disc list-inside text-muted-foreground space-y-2'>
                <li>Harass, bully, or intimidate other users</li>
                <li>Share false or misleading information</li>
                <li>Impersonate another person</li>
                <li>Use the app for commercial purposes without permission</li>
                <li>Share explicit, violent, or illegal content</li>
                <li>Discriminate based on race, gender, sexuality, religion, or disability</li>
                <li>Attempt to hack, reverse engineer, or compromise the app</li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-xl font-semibold mb-4'>6. LGBTQ+ Inclusion</h2>
              <p className='text-muted-foreground leading-relaxed'>
                Konect is committed to being a safe space for all users, including LGBTQ+ 
                individuals. Homophobic, transphobic, or discriminatory behavior will result 
                in immediate account termination. We celebrate diversity and require all users 
                to respect each other&apos;s identities.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-xl font-semibold mb-4'>7. Safety Features</h2>
              <p className='text-muted-foreground leading-relaxed'>
                Your safety is our priority. The App includes:
              </p>
              <ul className='list-disc list-inside text-muted-foreground space-y-2 mt-4'>
                <li>Phone verification for all users</li>
                <li>24/7 human moderation</li>
                <li>Safe venue suggestions for first meetups</li>
                <li>Emergency SOS feature</li>
                <li>Report and block functionality</li>
              </ul>
              <p className='text-muted-foreground leading-relaxed mt-4'>
                While we implement safety measures, users are responsible for their own 
                safety during in-person meetings.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-xl font-semibold mb-4'>8. Content & Intellectual Property</h2>
              <p className='text-muted-foreground leading-relaxed'>
                You retain ownership of content you post. By posting, you grant Konect a 
                license to display and distribute your content within the App. We may remove 
                any content that violates these Terms or our Community Guidelines.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-xl font-semibold mb-4'>9. Subscriptions & Payments</h2>
              <p className='text-muted-foreground leading-relaxed'>
                Optional subscriptions are available for users who wish to support Konect. 
                Subscriptions auto-renew unless cancelled. You may cancel at any time through 
                your account settings. Refunds are available within 14 days of purchase.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-xl font-semibold mb-4'>10. Termination</h2>
              <p className='text-muted-foreground leading-relaxed'>
                We may suspend or terminate your account for violations of these Terms. 
                You may delete your account at any time through the App settings.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-xl font-semibold mb-4'>11. Disclaimers</h2>
              <p className='text-muted-foreground leading-relaxed'>
                Konect is provided &quot;as is&quot; without warranties of any kind. We do not guarantee 
                that you will form friendships through the App. We are not responsible for 
                interactions that occur outside the App.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-xl font-semibold mb-4'>12. Limitation of Liability</h2>
              <p className='text-muted-foreground leading-relaxed'>
                To the maximum extent permitted by law, Konect shall not be liable for any 
                indirect, incidental, or consequential damages arising from your use of the App.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-xl font-semibold mb-4'>13. Changes to Terms</h2>
              <p className='text-muted-foreground leading-relaxed'>
                We may update these Terms from time to time. We will notify you of material 
                changes via email or in-app notification. Continued use after changes constitutes 
                acceptance.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-xl font-semibold mb-4'>14. Contact</h2>
              <p className='text-muted-foreground leading-relaxed'>
                For questions about these Terms, please{' '}
                <Link href='/contact' className='text-primary hover:underline'>
                  contact us
                </Link>{' '}
                or email{' '}
                <a href='mailto:legal@konect.app' className='text-primary hover:underline'>
                  legal@konect.app
                </a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
