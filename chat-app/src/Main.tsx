import React, { useEffect } from 'react';
import Constants from 'expo-constants';

import useColorScheme from './hooks/useColorScheme';
import { useAuth } from './auth/Auth';
import Navigation from './navigation';

const AUTH_HTTP_OPTIONS: any = {
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  mode: 'cors', // no-cors, *cors, same-origin
  // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
  headers: {
    'Content-Type': 'application/json'
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  // redirect: 'follow', // manual, *follow, error
  // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  // body: JSON.stringify(data) // body data type must match "Content-Type" header
}
const HTTP_GET: any = {
  method: 'GET',
  mode: 'cors',
}

export default function Main() {
  const colorScheme = useColorScheme();
  const { status, token, signIn, setUser, isLoggedIn } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await fetch(`${Constants.manifest?.extra?.API_URL}/login/1`, AUTH_HTTP_OPTIONS);
      const json = await response.json();
      signIn(json.token)
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${Constants.manifest?.extra?.API_URL}/user`, {
        ...HTTP_GET,
        headers: new Headers({
          'Authorization': `Bearer ${token}`,
          'Content-type': 'application/json',
        }),
      });
      const json = await response.json();
      if (!json?.success) {
        // TODO: set error
        return;
      }
      setUser(json.user)
    })();
  }, [token]);

  if (!isLoggedIn) {
      console.log('Main', status, token, isLoggedIn);
    // TODO: redirect to log in screen
  }

  return (
    <Navigation colorScheme={colorScheme} />
  );
}
