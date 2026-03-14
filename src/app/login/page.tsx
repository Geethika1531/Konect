'use client';

import { useState, useCallback, memo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store';
import { useAuth } from '@/contexts/AuthContext';
import {
  Phone,
  Mail,
  ArrowLeft,
  Loader2,
  Lock,
  Heart,
  Eye,
  EyeOff,
} from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/auth/theme-toggle';

function LoginPage() {
  const router = useRouter();
  const { setUser, setAuthenticated } = useAppStore();
  const { signInWithEmail, signInWithGoogle } = useAuth();
  const [method, setMethod] = useState<'phone' | 'email'>('email');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    if (!identifier || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }
    
    try {
      if (method === 'email') {
        await signInWithEmail(identifier, password);
        setAuthenticated(true);
        router.push('/discover');
      } else {
        setError('Phone login is currently not supported. Please use email or Google.');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  }, [identifier, password, method, router, setAuthenticated, signInWithEmail]);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      await signInWithGoogle();
      setAuthenticated(true);
      router.push('/discover');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
    } finally {
      setIsLoading(false);
    }
  };

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
          <div className="text-center mb-5">
            <h1 className="text-2xl font-bold mb-1">Welcome Back</h1>
            <p className="text-muted-foreground text-sm">
              Sign in to continue your journey
            </p>
          </div>

          <Card className="p-5 bg-white dark:bg-card border-border/30">
            <form onSubmit={handleLogin} className="space-y-3">
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
                    autoComplete={method === 'email' ? 'email' : 'tel'}
                  />
                  {method === 'phone' ? (
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </div>

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
                    autoComplete="current-password"
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
              </div>

              {error && (
                <p className="text-sm text-destructive bg-destructive/10 p-2.5 rounded-lg">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                className="w-full btn-primary text-white h-11 touch-target"
                disabled={!identifier || !password || isLoading}
              >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                Sign In
              </Button>
            </form>

            <div className="mt-3 text-center">
              <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
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
              onClick={handleGoogleLogin}
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
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-primary font-medium hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(LoginPage);
