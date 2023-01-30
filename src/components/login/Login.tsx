import {
  ButtonGroup,
  VStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Heading,
} from '@chakra-ui/react';
import { useFormik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { LoginProps, FormikConfigType, VStackProps } from '../../types';

const Login = (props: LoginProps) => {
  const formikConfig = {
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string(),
      password: Yup.string(),
    }),
    onSubmit: (result: any): void => {
      console.log(result);
    },
  };
  const formik = useFormik<FormikConfigType>(formikConfig);

  return (
    <VStack {...VStackProps}>
      <Heading>Log In</Heading>
      <FormControl>
        <FormLabel fontSize="lg">Username</FormLabel>
        <Input
          name="username"
          size="lg"
          placeholder="Enter username"
          autoComplete="off"
        />
        <FormErrorMessage>Invalid Username</FormErrorMessage>
      </FormControl>

      <FormControl>
        <FormLabel fontSize="lg">Password</FormLabel>
        <Input
          name="password"
          type="password"
          size="lg"
          placeholder="Enter password"
          autoComplete="off"
        />
        <FormErrorMessage>Password</FormErrorMessage>
      </FormControl>

      <ButtonGroup pt="1rem">
        <Button colorScheme="teal" type="submit">
          Log In
        </Button>
        <Button>Create Account</Button>
      </ButtonGroup>
    </VStack>
  );
};

export default Login;
