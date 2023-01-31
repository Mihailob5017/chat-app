import { ButtonGroup, VStack, Button, Heading } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LoginProps, FormikConfigType, VStackProps } from '../helpers/types';
import { messages } from '../helpers/messages';
import YupPassword from 'yup-password';
import InputComponent from './Input';
import { useNavigate } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';

YupPassword(Yup);

const Signup = (props: LoginProps) => {
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
      confirmPassword: Yup.string()
        .required(messages.password_required)
        .oneOf([Yup.ref('password'), null], messages.confirm_password_mismatch),
    }),
    onSubmit: (values: FormikConfigType, actions: object): void => {},
  };

  const navigate = useNavigate();
  const formik = useFormik<FormikConfigType>(formikConfig);
  const goToSignIn = (): void => {
    navigate('/');
  };

  return (
    <VStack {...VStackProps} onSubmit={(e) => formik.handleSubmit(e)}>
      <Heading>Sign up</Heading>
      <InputComponent
        name="username"
        formik={formik}
        placeholder={messages.username_placeholder}
      />
      <InputComponent name="password" formik={formik} type="password" />
      <InputComponent
        name="confirmPassword"
        label={messages.confirm_password_label}
        formik={formik}
        type="password"
      />
      <ButtonGroup pt="1rem">
        <Button colorScheme="teal" type="submit">
          Create Account
        </Button>
        <Button onClick={goToSignIn} leftIcon={<ArrowBackIcon />}>
          Back
        </Button>
      </ButtonGroup>
    </VStack>
  );
};

export default Signup;
