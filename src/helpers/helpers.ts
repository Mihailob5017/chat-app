import { SignUpParams, ResponseParams } from './types';
export const upperCaseName = (name: string): string => {
  if (name === '') return name;
  return name.charAt(0).toUpperCase() + name.slice(1);
};
export const SIGNUP_URL: string = 'http://localhost:4001/auth/signup';
export const LOGIN_URL: string = 'http://localhost:4001/auth/login';

//TODO: There must be a better way to do this,find a better way
export const fetchCredentials = async (
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
          data: null,
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
          data: null,
          success: false,
          error: {
            message: 'Failed to fetch data from the server',
            displayMessage: 'Something went wrong',
          },
        };
      }
      return {
        data: {
          user: data,
        },
        success: true,
        error: null,
      };
    })
    .catch((err) => {
      return {
        data: null,
        success: false,
        error: {
          message: err.messages[0],
          displayMessage: 'Something went wrong',
        },
      };
    });

  return responseObject;
};
