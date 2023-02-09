import { ButtonGroup, VStack, Button, Heading } from '@chakra-ui/react';
import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import { LoginProps, FormikConfigType, VStackProps } from '../helpers/types';
import { messages } from '../helpers/messages';
import YupPassword from 'yup-password';
import InputComponent from './Input';
import { useNavigate } from 'react-router-dom';
import {
  setCredentials,
  LOGIN_URL,
  formatCredentials,
} from '../helpers/helpers';
import { useDispatch } from 'react-redux';
import { actions as reduxActions } from '../redux/slices';
import { calcLength } from 'framer-motion';
YupPassword(Yup);

const Login = (props: LoginProps) => {
  const dispatch = useDispatch();
  const formikConfig = {
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .required(messages.username_required)
        .min(6, messages.username_min_length)
        .max(32, messages.username_max_length),
      password: Yup.string()
        .required(messages.password_required)
        .min(6, messages.password_min_length)
        .minUppercase(1, messages.password_min_uppercase)
        .minNumbers(1, messages.password_min_number),
    }),
    onSubmit: async (
      values: FormikConfigType,
      actions: FormikHelpers<FormikConfigType>
    ): Promise<void> => {
      const data = await setCredentials(LOGIN_URL, {
        username: values.username,
        password: values.password,
      });
      if (data.user !== null) {
        // actions.resetForm();
        const formatedData = formatCredentials(data);
        dispatch(reduxActions.setCredentials(formatedData));
        navigate('/home');
      }
    },
  };
  const formik = useFormik<FormikConfigType>(formikConfig);
  const navigate = useNavigate();
  const goToSignUp = (): void => {
    navigate('/register');
  };
  return (
    <VStack {...VStackProps} onSubmit={(e) => formik.handleSubmit(e)}>
      <Heading>Log In</Heading>
      <InputComponent
        name="username"
        formik={formik}
        placeholder={messages.username_placeholder}
      />
      <InputComponent
        name="password"
        formik={formik}
        type="password"
        placeholder={messages.password_placeholder}
      />
      <ButtonGroup pt="1rem">
        <Button colorScheme="teal" type="submit">
          Log In
        </Button>
        <Button onClick={goToSignUp}>Create Account</Button>
      </ButtonGroup>
    </VStack>
  );
};

export default Login;
