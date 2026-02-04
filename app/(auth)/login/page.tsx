'use client';

import { LoginForm } from '@/components/auth/login-form';
import { AuthCard } from '@/components/auth/auth-card';

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