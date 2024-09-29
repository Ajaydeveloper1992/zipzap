'use client'
// hooks/useActiveLink.js
import { useRouter } from 'next/router';

const useActiveLink = (path) => {
  const { pathname } = useRouter();
  return pathname === path;
};

export default useActiveLink;
