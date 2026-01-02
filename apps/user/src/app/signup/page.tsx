'use client';

import { SignUpContent } from '@/components/signup';
import { AppLayout } from '@/layouts';
import { color } from '@maru/design-system';
import { flex } from '@maru/utils';
import styled from 'styled-components';

const SignUp = () => {
  return (
    <AppLayout backgroundColor={color.gray100}>
      <StyledSignUp>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/svg/maruLogo.svg"
          style={{ margin: '0 auto' }}
          width={480}
          height={139}
          alt="logo"
          loading="lazy"
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
