'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

// This component will be wrapped in Suspense
function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Extract error information from URL if present
    const errorCode = searchParams.get('error_code');
    const errorDescription = searchParams.get('error_description');
    
    if (errorCode) {
      // Handle authentication errors
      console.error('Auth error:', errorCode, errorDescription);
      setError(errorDescription || 'Authentication error occurred');
      setLoading(false);
      
      // After a short delay, redirect to login or homepage
      setTimeout(() => {
        router.push('/');
      }, 3000);
      return;
    }

    // Process the authentication callback
    const processAuthCallback = async () => {
      try {
        // Get current user and session info
        const { data: userData, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          throw userError;
        }
        
        // Check if we have a logged-in user
        
        if (!userData?.user) {
          // If no session, the user might need to log in again
          setError('Your session has expired. Please log in again.');
          setLoading(false);
          setTimeout(() => {
            router.push('/');
          }, 3000);
          return;
        }

        // If we have a valid session, redirect to dashboard
        console.log('Authentication successful, redirecting to dashboard...');
        router.push('/dashboard');
      } catch (err) {
        console.error('Auth callback error:', err);
        setError('Error processing your verification. Please try signing in again.');
        setLoading(false);
        setTimeout(() => {
          router.push('/');
        }, 3000);
      }
    };

    processAuthCallback();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
        {loading ? (
          <>
            <Loader2 className="h-12 w-12 animate-spin text-gold mx-auto mb-4" />
            <h2 className="text-2xl font-cormorant font-semibold mb-2">Verifying your account...</h2>
            <p className="text-gray-600 dark:text-gray-300">Please wait while we complete your verification process.</p>
          </>
        ) : error ? (
          <>
            <div className="text-red-500 mb-4 text-xl">⚠️</div>
            <h2 className="text-2xl font-cormorant font-semibold mb-2">Verification Error</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Redirecting you to the homepage...</p>
          </>
        ) : (
          <>
            <div className="text-green-500 mb-4 text-xl">✓</div>
            <h2 className="text-2xl font-cormorant font-semibold mb-2">Verification Successful</h2>
            <p className="text-gray-600 dark:text-gray-300">Redirecting you to your dashboard...</p>
          </>
        )}
      </div>
    </div>
  );
}

// Main component with suspense boundary
export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-gold mx-auto mb-4" />
          <h2 className="text-2xl font-cormorant font-semibold mb-2">Loading...</h2>
          <p className="text-gray-600 dark:text-gray-300">Please wait while we prepare your verification.</p>
        </div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
