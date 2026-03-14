'use client';

import { useState, useCallback, memo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Phone,
  Mail,
  ArrowLeft,
  Shield,
  Loader2,
  Lock,
  User,
  Heart,
  Check,
  Eye,
  EyeOff,
} from 'lucide-react';
import { ThemeToggle } from '@/components/auth/theme-toggle';
import { useAuth } from '@/contexts/AuthContext';

function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState<'phone' | 'email'>('email');
  const [identifier, setIdentifier] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resentCode, setResentCode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signUpWithEmail, signInWithGoogle } = useAuth();

  const handleSendCode = useCallback(async () => {
    setIsLoading(true);
    setError('');
    
    if (method === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(identifier)) {
        setError('Please enter a valid email address');
        setIsLoading(false);
        return;
      }
      setStep(3);
      setIsLoading(false);
    } else {
      setError('Phone signup is currently not supported. Please use email or Google.');
      setIsLoading(false);
    }
  }, [identifier, method]);

  const handleVerifyCode = useCallback(async () => {
    setIsLoading(true);
    setError('');
    
    const code = verificationCode.join('');
    
    if (code.length !== 6) {
      setError('Please enter the complete 6-digit code');
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, code, method }),
      });
      
      if (response.ok) {
        setStep(3);
      } else {
        const data = await response.json();
        setError(data.error || 'Invalid verification code');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [identifier, verificationCode, method]);

  const handleCreateAccount = useCallback(async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      if (method === 'email') {
        await signUpWithEmail(identifier, password);
        router.push('/discover');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  }, [identifier, password, confirmPassword, method, name, router, signUpWithEmail]);

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    setError('');
    try {
      await signInWithGoogle();
      router.push('/discover');
    } catch (err: any) {
      setError(err.message || 'Failed to sign up with Google');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = useCallback(async () => {
    setIsLoading(true);
    try {
      await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, method }),
      });
      setResentCode(true);
      setTimeout(() => setResentCode(false), 3000);
    } catch {
      setError('Failed to resend code');
    } finally {
      setIsLoading(false);
    }
  }, [identifier, method]);

  const handleCodeChange = useCallback((index: number, value: string) => {
    const chars = value.replace(/\D/g, '').slice(0, 6 - index);
    const newCode = [...verificationCode];
    chars.split('').forEach((char, i) => {
      if (index + i < 6) newCode[index + i] = char;
    });
    setVerificationCode(newCode);
  }, [verificationCode]);

  return (
    <div className="min-h-screen bg-premium-light dark:bg-premium-dark flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/30">
        <Link href="/">
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
          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-1.5 mb-6">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-colors ${
                  s === step ? 'w-8 bg-primary' : s < step ? 'w-8 bg-primary/40' : 'w-4 bg-border'
                }`}
              />
            ))}
          </div>

          <div className="text-center mb-5">
            <h1 className="text-xl font-bold mb-1">
              {step === 1 && 'Create Your Account'}
              {step === 2 && 'Verify Your Account'}
              {step === 3 && 'Set Your Password'}
            </h1>
            <p className="text-muted-foreground text-sm">
              {step === 1 && 'Join thousands finding real friends'}
              {step === 2 && `Enter the code sent to your ${method}`}
              {step === 3 && 'Create a secure password'}
            </p>
          </div>

          <Card className="p-5 bg-white dark:bg-card border-border/30">
            {step === 1 && (
              <div className="space-y-3">
                <div className="flex gap-2 mb-3">
                  <Button
                    type="button"
                    variant={method === 'email' ? 'default' : 'outline'}
                    className={`flex-1 h-10 touch-target ${method === 'email' ? 'btn-primary text-white' : ''}`}
                    onClick={() => setMethod('email')}
                  >
                    <Mail className="w-4 h-4 mr-1.5" />
                    Email
                  </Button>
                  <Button
                    type="button"
                    variant={method === 'phone' ? 'default' : 'outline'}
                    className={`flex-1 h-10 touch-target ${method === 'phone' ? 'btn-primary text-white' : ''}`}
                    onClick={() => setMethod('phone')}
                  >
                    <Phone className="w-4 h-4 mr-1.5" />
                    Phone
                  </Button>
                </div>

                <div>
                  <Label htmlFor="identifier" className="mb-1.5 block text-sm">
                    {method === 'phone' ? 'Phone Number' : 'Email Address'}
                  </Label>
                  <div className="relative">
                    <Input
                      id="identifier"
                      type={method === 'email' ? 'email' : 'tel'}
                      placeholder={method === 'phone' ? '+1 (555) 123-4567' : 'you@example.com'}
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      className="pl-9 h-11"
                    />
                    {method === 'phone' ? (
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="name" className="mb-1.5 block text-sm">
                    Full Name <span className="text-muted-foreground">(optional)</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-9 h-11"
                    />
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-destructive bg-destructive/10 p-2.5 rounded-lg">
                    {error}
                  </p>
                )}

                <Button
                  className="w-full btn-primary text-white h-11 touch-target"
                  onClick={handleSendCode}
                  disabled={!identifier || isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Shield className="w-4 h-4 mr-2" />
                  )}
                  Send Code
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-3">
                <div className="text-center mb-3">
                  <div className="w-12 h-12 rounded-xl gradient-terracotta flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Code sent to <span className="font-medium text-foreground">{identifier}</span>
                  </p>
                </div>

                <div className="flex gap-2 justify-center">
                  {verificationCode.map((digit, index) => (
                    <Input
                      key={index}
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      className="w-10 h-12 text-center text-lg font-bold"
                      autoFocus={index === 0}
                    />
                  ))}
                </div>

                {error && (
                  <p className="text-sm text-destructive bg-destructive/10 p-2.5 rounded-lg text-center">
                    {error}
                  </p>
                )}

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 h-10 touch-target"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    className="flex-1 btn-primary text-white h-10 touch-target"
                    onClick={handleVerifyCode}
                    disabled={verificationCode.some(d => !d) || isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <Check className="w-4 h-4 mr-2" />
                    )}
                    Verify
                  </Button>
                </div>

                <div className="text-center">
                  <button
                    onClick={handleResendCode}
                    disabled={isLoading || resentCode}
                    className="text-sm text-primary hover:underline disabled:opacity-50"
                  >
                    {resentCode ? 'Code sent!' : "Didn't receive a code? Resend"}
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="password" className="mb-1.5 block text-sm">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-9 pr-9 h-11"
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Minimum 8 characters
                  </p>
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="mb-1.5 block text-sm">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-9 h-11"
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                  {confirmPassword && password !== confirmPassword && (
                    <p className="text-xs text-destructive mt-1">Passwords do not match</p>
                  )}
                </div>

                {error && (
                  <p className="text-sm text-destructive bg-destructive/10 p-2.5 rounded-lg">
                    {error}
                  </p>
                )}

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 h-10 touch-target"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    className="flex-1 btn-primary text-white h-10 touch-target"
                    onClick={handleCreateAccount}
                    disabled={!password || !confirmPassword || password !== confirmPassword || isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <User className="w-4 h-4 mr-2" />
                    )}
                    Create Account
                  </Button>
                </div>
              </div>
            )}
          </Card>

          <div className="mt-6">
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/30" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-premium-light dark:bg-premium-dark px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            
            <Button
              type="button"
              variant="outline"
              className="w-full bg-white dark:bg-card border-border/30 h-11 touch-target mb-4"
              onClick={handleGoogleSignup}
              disabled={isLoading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </Button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-muted-foreground text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-primary font-medium hover:underline">
                Sign In
              </Link>
            </p>
          </div>

          <p className="text-xs text-center text-muted-foreground mt-3">
            By continuing, you agree to our{' '}
            <Link href="/terms" className="text-primary hover:underline">Terms</Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default memo(SignupPage);
