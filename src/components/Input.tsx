import PropTypes from 'prop-types';
import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { upperCaseName } from '../helpers/helpers';
type Props = {
  type: string;
  placeholder: string;
  name: string;
  formik: any;
  label: string;
};

const InputComponent = ({
  label,
  type = 'text',
  placeholder = '',
  name,
  formik,
}: Props) => {
  return (
    <FormControl
      isInvalid={formik.touched && formik.errors[name] ? true : false}
    >
      <FormLabel fontSize="lg">
        {label !== '' ? label : upperCaseName(name)}
      </FormLabel>
      <Input
        type={type}
        size="lg"
        placeholder={placeholder}
        autoComplete="off"
        {...formik.getFieldProps(name)}
      />
      <FormErrorMessage>{formik.errors[name]}</FormErrorMessage>
    </FormControl>
  );
};

InputComponent.propTypes = {
  formik: PropTypes.shape({
    errors: PropTypes.any,
    getFieldProps: PropTypes.func,
    touched: PropTypes.any,
  }),
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};
InputComponent.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
};

export default InputComponent;
