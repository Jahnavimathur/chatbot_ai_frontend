'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MessageSquare } from 'lucide-react';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { authService } from '../../../lib/services/auth.service';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.signup({ name, email, password });
      // Automatically log them in or redirect
      router.push('/login');
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md glass-panel p-8 rounded-3xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center mb-4">
            <MessageSquare className="w-6 h-6 text-violet-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-slate-400 text-sm">Join Chatbot AI today</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
          />
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            minLength={6}
          />

          {error && <div className="text-red-400 text-sm font-medium">{error}</div>}

          <Button type="submit" variant="primary" className="w-full mt-2 lg !bg-violet-600 hover:!bg-violet-500 shadow-violet-500/20" isLoading={loading}>
            Create Account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link href="/login" className="text-violet-400 hover:text-violet-300 font-medium font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
