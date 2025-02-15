'use client';

import { color } from '@maru/design-system';
import { Button, Column, Input } from '@maru/ui';
import { flex } from '@maru/utils';
import Image from 'next/image';
import { styled } from 'styled-components';

const LoginPage = () => {
  return (
    <StyledLogin>
      <LoginBox>
        <Column gap={56} alignItems="center">
          <Image src="/svg/maruLogo.svg" width={232} height={70} alt="logo" />
          <Column gap={36}>
            <Column gap={24}>
              <Input label="전화번호" width="100%" name="phoneNumber" />
              <Input label="비밀번호" width="100%" name="password" />
            </Column>
            <Column gap={16}>
              <Button width="100%">로그인</Button>
            </Column>
          </Column>
        </Column>
      </LoginBox>
    </StyledLogin>
  );
};

export default LoginPage;

const StyledLogin = styled.div`
  ${flex({ justifyContent: 'center' })}
  width: 100%;
  height: 100vh;
`;

const LoginBox = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'center' })}
  justify-content: center;
  width: calc(100% - 311px);
  height: 100%;
  background-color: ${color.white};
`;
