'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SiGoogle } from '@icons-pack/react-simple-icons';
import { Button } from '@/components/ui/button';
import { signInWithGoogle } from '@/services/auth-services';

interface AuthCardProps {
  readonly children: React.ReactNode;
  readonly title: string;
  readonly description: string;
  readonly oauthLabel?: string;
  readonly bottomText: string;
  readonly bottomLink: {
    readonly label: string;
    readonly href: string;
  };
}

export function AuthCard({
  children,
  title,
  description,
  oauthLabel = 'Or continue with',
  bottomText,
  bottomLink,
}: AuthCardProps) {
  const [oauthLoading, setOauthLoading] = useState(false);
  const [oauthError, setOauthError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setOauthLoading(true);
    setOauthError(null);

    try {
      const result = await signInWithGoogle();
      if (!result.success) {
        setOauthError(result.error || 'Failed to sign in with Google');
      }
      // If successful, Supabase will redirect to the callback URL
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setOauthError(errorMessage);
    } finally {
      setOauthLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-100 p-8 shadow-sm">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      {children}

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-2 text-gray-500">{oauthLabel}</span>
        </div>
      </div>

      {oauthError && (
        <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
          {oauthError}
        </div>
      )}

      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
        onClick={handleGoogleSignIn}
        disabled={oauthLoading}
      >
        <SiGoogle size={20} />
        {oauthLoading ? 'Signing in...' : 'Sign in with Google'}
      </Button>

      <p className="mt-6 text-center text-sm text-gray-600">
        {bottomText}{' '}
        <Link href={bottomLink.href} className="font-medium text-black underline">
          {bottomLink.label}
        </Link>
      </p>
    </div>
  );
}
