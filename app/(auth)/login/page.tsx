'use client';

import { LoginForm, AuthCard } from '@/components/auth';

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome back"
      description="Login to your ABCinplex account"
      bottomText="Don't have an account?"
      bottomLink={{ label: 'Sign up', href: '/register' }}
    >
      <LoginForm />
    </AuthCard>
  );
}