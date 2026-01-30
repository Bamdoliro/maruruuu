import { Header } from '@/components/common';
import { ProgressStage } from '@/components/form';
import { color } from '@maru/design-system';
import { Text } from '@maru/ui';
import type { ReactNode } from 'react';
import styled from '@emotion/styled';

interface FormLayoutProps {
  children: ReactNode;
  title: string;
}

const FormLayout = ({ children, title }: FormLayoutProps) => {
  return (
    <>
      <Header />
      <StyledFormLayout>
        <ProgressStage />
        <FormBox>
          <Text fontType="H3" color={color.gray900}>
            {title}
          </Text>
          <FormContentBox>{children}</FormContentBox>
        </FormBox>
      </StyledFormLayout>
    </>
  );
};

export default FormLayout;

const StyledFormLayout = styled.div`
  width: 100%;
  margin-bottom: 140px;
  background-color: ${color.white};
`;

const FormBox = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0px 312px 61px;
`;

const FormContentBox = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 40px;
`;
