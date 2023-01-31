interface Message {
  username_required: string;
  password_required: string;
  username_invalid: string;
  password_invalid: string;
  username_taken: string;
  username_min_length: string;
  username_max_length: string;
  password_min_length: string;
  password_min_number: string;
  password_min_uppercase: string;
  username_placeholder: string;
  password_placeholder: string;
}

export const messages: Message = {
  username_required: 'Username required',
  password_required: 'Password required',
  username_invalid: '',
  password_invalid: '',
  username_taken: '',
  username_min_length: 'Username must be at least 6 characters long',
  username_max_length: 'Username must be at most 32 characters long',
  password_min_length: 'Password must be at least 6 characters long',
  password_min_number: 'Password must have at least one number',
  password_min_uppercase: 'Password must  have at least one uppercase letter',
  username_placeholder: 'Enter username',
  password_placeholder: 'Enter password',
};
