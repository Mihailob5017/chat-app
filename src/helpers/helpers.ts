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
  params: SignUpParams
): Promise<ResponseParams> => {
  const responseObject = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
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
      return { ...data };
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
