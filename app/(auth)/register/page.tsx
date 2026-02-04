'use client';

import { RegisterForm } from '@/components/auth/register-form';
import { AuthCard } from '@/components/auth/auth-card';

export default function RegisterPage() {
  return (
    <AuthCard
      title="Create an account"
      description="Enter your details to get started"
      bottomText="Already have an account?"
      bottomLink={{ label: 'Login', href: '/login' }}
    >
      <RegisterForm />
    </AuthCard>
  );
}