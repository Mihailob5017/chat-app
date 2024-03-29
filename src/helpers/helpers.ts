import { SignUpParams, ResponseParams, CredentialsInterface } from './types';
export const upperCaseName = (name: string): string => {
  if (name === '') return name;
  return name.charAt(0).toUpperCase() + name.slice(1);
};
export const SIGNUP_URL: string = 'http://localhost:4001/auth/signup';
export const LOGIN_URL: string = 'http://localhost:4001/auth/login';

export const fetchCredentials = async (): Promise<CredentialsInterface> => {
  const response = await fetch(LOGIN_URL, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response || !response.ok || response.status >= 400)
        return { user: null, userLoggedIn: false };
      return response.json();
    })
    .then((data) => data)
    .catch((err) => {
      return { user: null, userLoggedIn: false };
    });

  return response;
};

export const setCredentials = async (
  url: string,
  body: SignUpParams
): Promise<ResponseParams> => {
  const responseObject = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (!response || !response.ok || response.status >= 400)
        return {
          user: null,
          success: false,
          error: {
            message: 'Failed to fetch data from the server',
            displayMessage: 'Something went wrong',
          },
        };

      return response.json();
    })
    .then((data) => {
      if (!data && data.length === 0) {
        return {
          user: null,
          success: false,
          error: {
            message: 'Failed to fetch data from the server',
            displayMessage: 'Something went wrong',
          },
        };
      }
      return data;
    })
    .catch((err) => {
      return {
        user: null,
        success: false,
        error: {
          message: err.messages[0],
          displayMessage: 'Something went wrong',
        },
      };
    });

  return responseObject;
};

export const formatCredentials = (
  credentials: CredentialsInterface | ResponseParams
): CredentialsInterface => {
  if (credentials === null || credentials.user === null)
    return { user: { username: null }, userLoggedIn: false };

  if (Object.keys(credentials).includes('success')) {
    return {
      user: { username: credentials.user.username },
      userLoggedIn: true,
    };
  } else {
    return {
      user: { username: credentials.user.username },
      userLoggedIn: true,
    };
  }
};
