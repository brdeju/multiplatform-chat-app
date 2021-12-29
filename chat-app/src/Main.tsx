import React from 'react';
import { Loading } from './components/Loading';
import { useAuth } from './hooks/Auth';

import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function Main() {
  const colorScheme = useColorScheme();
  const { loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <Navigation colorScheme={colorScheme} />
  );
}
