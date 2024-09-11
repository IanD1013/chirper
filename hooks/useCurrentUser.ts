import useSWR from 'swr';
import fetcher from '@/libs/fetcher';
import { useSession } from 'next-auth/react';

const useCurrentUser = () => {
  const { status } = useSession(); // Get session and authentication status from NextAuth

  const shouldFetch = status === 'authenticated'; // Only fetch if the user is authenticated

  const { data, error, isLoading, mutate } = useSWR(
    shouldFetch ? '/api/current' : null, // Only fetch when authenticated
    fetcher
  );

  return { data, error, isLoading: status === 'loading' || isLoading, mutate };
};

export default useCurrentUser;
