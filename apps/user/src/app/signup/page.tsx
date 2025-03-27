'use client';

import { SignUpContent, Terms, Validate } from '@/components/signup';
import { AppLayout } from '@/layouts';
import { color } from '@maru/design-system';
import {
  Button,
  ButtonInput,
  Column,
  Input,
  PreviewInput,
  Text,
  TimeLimitInput,
} from '@maru/ui';
import { flex } from '@maru/utils';
import Image from 'next/image';
import styled from 'styled-components';

const SignUp = () => {
  return (
    <AppLayout backgroundColor={color.gray100}>
      <StyledSignUp>
        <Image
          src="/svg/maruLogo.svg"
          style={{ margin: '0 auto' }}
          width={480}
          height={139}
          alt="logo"
        />
        <SignUpContent />
      </StyledSignUp>
    </AppLayout>
  );
};

export default SignUp;

const StyledSignUp = styled.div`
  ${flex({ alignItems: 'center' })}
  width: 100%;
  height: 100vh;
`;

const ContentBox = styled.div`
  display: flex;
  height: 100%;
  background-color: ${color.white};
  padding: 148px 131px 112px;
  overflow: auto;
`;

const SignUpBox = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 446px;
  height: fit-content;
  gap: 24px;
`;
