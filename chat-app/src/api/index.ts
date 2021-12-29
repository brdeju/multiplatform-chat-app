import Constants from 'expo-constants';

const HTTP_GET: any = {
  method: 'GET',
  mode: 'cors',
}
const HTTP_POST: any = {
  method: 'POST',
  mode: 'cors',
}

export const get = async (uri: string, token?: string | null) => {
  const headers = token ? new Headers({
    'Authorization': `Bearer ${token}`,
    'Content-type': 'application/json',
  }) : null;

  const response = await fetch(`${Constants.manifest?.extra?.API_URL}/${uri}`, {
    ...HTTP_GET,
    ...(headers ? { headers } : {}),
  });

  return await response.json();
}

export const post = async (uri: string, body?: object, token?: string | null) => {
  const headers = new Headers({
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    'Content-type': 'application/json',
  });

  const response = await fetch(`${Constants.manifest?.extra?.API_URL}/${uri}`, {
    ...HTTP_POST,
    ...(headers ? { headers } : {}),
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  return await response.json();
}
