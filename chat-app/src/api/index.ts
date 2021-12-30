import Constants from 'expo-constants';

const HTTP_GET: any = {
  method: 'GET',
}
const HTTP_POST: any = {
  method: 'POST',
}

export const getFile = (uri: string) => `${Constants.manifest?.extra?.API_URL}/${uri}`;

export const get = async (uri: string, token?: string | null) => {
  const headers = new Headers({
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    'Content-type': 'application/json',
  });

  const response = await fetch(`${Constants.manifest?.extra?.API_URL}/${uri}`, {
    ...HTTP_GET,
    headers,
  });

  return await response.json();
}

export const post = async (uri: string, body?: object, token?: string | null) => {
  try {
    const headers = new Headers({
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      'Content-type': 'application/json',
    });

    const response = await fetch(`${Constants.manifest?.extra?.API_URL}/${uri}`, {
      ...HTTP_POST,
      headers,
      ...(body ? { body: JSON.stringify(body) } : {}),
    });

    return await response.json();
  } catch (error) {
    console.log('post error', error);
    return null;
  }
}

export const postAttachment = async (uri: string, body?: object, token?: string | null) => {
  const headers = new Headers({
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    'Content-type': 'multipart/form-data',
  });

  const response = await fetch(`${Constants.manifest?.extra?.API_URL}/${uri}`, {
    ...HTTP_POST,
    headers,
    body,
  });

  return await response.json();
}
