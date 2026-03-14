'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Mail, MessageCircle, HelpCircle, AlertCircle, Heart } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to an API
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

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
          <div className='text-center mb-12'>
            <div className='w-16 h-16 rounded-2xl gradient-terracotta flex items-center justify-center mx-auto mb-6'>
              <Mail className='w-8 h-8 text-white' />
            </div>
            <h1 className='text-3xl md:text-4xl font-bold mb-4'>Get in Touch</h1>
            <p className='text-muted-foreground text-lg max-w-md mx-auto'>
              Have a question, feedback, or need help? We&apos;re here for you.
            </p>
          </div>

          {submitted ? (
            <Card className='p-8 text-center card-premium'>
              <div className='w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6'>
                <Heart className='w-8 h-8 text-green-600 dark:text-green-400' fill='currentColor' />
              </div>
              <h2 className='text-2xl font-bold mb-2'>Message Sent!</h2>
              <p className='text-muted-foreground mb-6'>
                We&apos;ve received your message and will get back to you within 24-48 hours.
              </p>
              <Button onClick={() => setSubmitted(false)} variant='outline'>
                Send Another Message
              </Button>
            </Card>
          ) : (
            <div className='grid md:grid-cols-3 gap-6 mb-8'>
              {/* Quick Links */}
              <Card className='p-6 card-premium card-hover group cursor-pointer'>
                <div className='w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors'>
                  <HelpCircle className='w-5 h-5 text-primary' />
                </div>
                <h3 className='font-semibold mb-2'>Help Center</h3>
                <p className='text-sm text-muted-foreground'>
                  Browse FAQs and guides for quick answers.
                </p>
              </Card>

              <Card className='p-6 card-premium card-hover group cursor-pointer'>
                <div className='w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors'>
                  <AlertCircle className='w-5 h-5 text-primary' />
                </div>
                <h3 className='font-semibold mb-2'>Report an Issue</h3>
                <p className='text-sm text-muted-foreground'>
                  Safety concern? Let our team know immediately.
                </p>
              </Card>

              <Card className='p-6 card-premium card-hover group cursor-pointer'>
                <div className='w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors'>
                  <MessageCircle className='w-5 h-5 text-primary' />
                </div>
                <h3 className='font-semibold mb-2'>General Inquiry</h3>
                <p className='text-sm text-muted-foreground'>
                  Questions about the app? Ask away.
                </p>
              </Card>
            </div>
          )}

          {!submitted && (
            <Card className='p-8 card-premium'>
              <h2 className='text-xl font-semibold mb-6'>Send Us a Message</h2>
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid sm:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium mb-2'>Name</label>
                    <input
                      type='text'
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className='w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50'
                      placeholder='Your name'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-2'>Email</label>
                    <input
                      type='email'
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className='w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50'
                      placeholder='your@email.com'
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium mb-2'>Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className='w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50'
                  >
                    <option value='general'>General Inquiry</option>
                    <option value='feedback'>Feedback</option>
                    <option value='bug'>Bug Report</option>
                    <option value='safety'>Safety Concern</option>
                    <option value='billing'>Billing Question</option>
                    <option value='partnership'>Partnership</option>
                    <option value='press'>Press Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium mb-2'>Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className='w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none'
                    placeholder="Tell us what's on your mind..."
                  />
                </div>

                <Button type='submit' size='lg' className='w-full btn-primary text-white'>
                  Send Message
                </Button>
              </form>
            </Card>
          )}

          {/* Additional Contact Info */}
          <div className='mt-8 text-center text-muted-foreground'>
            <p className='text-sm'>
              You can also reach us directly at{' '}
              <a href='mailto:hello@konect.app' className='text-primary hover:underline'>
                hello@konect.app
              </a>
            </p>
            <p className='text-sm mt-2'>
              For press inquiries:{' '}
              <a href='mailto:press@konect.app' className='text-primary hover:underline'>
                press@konect.app
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
