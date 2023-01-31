export interface LoginProps {}

export interface VstackType {
  as: any | undefined;
  w: object;
  m: string;
  justify: string;
  h: string;
  spacing: string;
}

export const VStackProps: VstackType = {
  as: 'form',
  w: { base: '90%', md: '500px' },
  m: 'auto',
  justify: 'center',
  h: '100vh',
  spacing: '1rem',
};

export interface FormikConfigType {
  username: string;
  password: string;
}
