'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h1>
        
        <div className="mb-6">
          <p className="text-gray-700 mb-2">There was a problem signing you in:</p>
          <p className="bg-red-50 p-3 rounded text-red-800 text-sm break-all">
            {error || 'Unknown error occurred'}
          </p>
        </div>
        
        <div className="flex justify-center">
          <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 