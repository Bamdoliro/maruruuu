import type { ReactNode } from 'react';
import FormStatusManager from './FormStatusManager/FormStatusManager';
import SaveFormManager from './SaveFormManager/SaveFormManager';

interface FormWrapperProps {
  children: ReactNode;
}

const FormWrapper = ({ children }: FormWrapperProps) => {
  return (
    <>
      <FormStatusManager />
      <SaveFormManager />
      {children}
    </>
  );
};

export default FormWrapper;
