'use client';

import Link from 'next/link';
import { useEffect, useState, useCallback, memo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  ArrowLeft,
  Mail,
  Loader2,
  Heart,
  CheckCircle2,
} from 'lucide-react';
import { ThemeToggle } from '@/components/auth/theme-toggle';
import { useAuth } from '@/contexts/AuthContext';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      await resetPassword(email);
      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send password reset email.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-premium-light dark:bg-premium-dark flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/30">
        <Link href="/login">
          <Button variant="ghost" size="icon" className="touch-target">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl gradient-terracotta flex items-center justify-center">
            <Heart className="w-4 h-4 text-white" fill="white" />
          </div>
          <span className="text-lg font-bold text-gradient-theme">Konect</span>
        </Link>
        <ThemeToggle variant="compact" />
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="p-6 bg-white dark:bg-card border-border/30">
            {isSuccess ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-7 h-7 text-primary" />
                </div>
                <h1 className="text-xl font-bold mb-2">Check Your Email</h1>
                <p className="text-muted-foreground text-sm mb-4">
                  If an account exists with <span className="font-medium text-foreground">{email}</span>, 
                  you&apos;ll receive a reset link shortly.
                </p>
                <Link href="/login">
                  <Button variant="outline" className="w-full touch-target">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-xl gradient-terracotta flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-xl font-bold mb-1">Reset Your Password</h1>
                  <p className="text-muted-foreground text-sm">
                    We&apos;ll send you a link to reset it.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="mb-1.5 block text-sm">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-11"
                        required
                        autoComplete="email"
                      />
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>

                  {error && (
                    <p className="text-sm text-destructive bg-destructive/10 p-2.5 rounded-lg">
                      {error}
                    </p>
                  )}

                  <Button
                    type="submit"
                    className="w-full btn-primary text-white h-11 touch-target"
                    disabled={!email || isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <Mail className="w-4 h-4 mr-2" />
                    )}
                    Send Reset Link
                  </Button>
                </form>

                <div className="mt-4 text-center">
                  <Link href="/login" className="text-sm text-primary hover:underline">
                    Back to Sign In
                  </Link>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default memo(ForgotPasswordPage);
