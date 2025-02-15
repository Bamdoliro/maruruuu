'use client';

import { color } from '@maru/design-system';
import { Button, Column, Input, Loader, PreviewInput } from '@maru/ui';
import { flex } from '@maru/utils';
import Image from 'next/image';
import { styled } from 'styled-components';
import { useInput, useLoginAction } from './Login.hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { Cookie } from '@/apis/cookie/cookie';
import { ROUTES } from '@/constants/common/constant';

const LoginContent = () => {
  const { loginAdminData, handleLoginAdminDataChange } = useInput();
  const { handleLogin } = useLoginAction(loginAdminData);
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get('message');

  const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  useEffect(() => {
    if (message) {
      alert(message);
      localStorage.clear();
      Cookie.removeItem('refresh-token');
      router.replace(ROUTES.MAIN);
    }
  }, [message, router]);

  return (
    <StyledLogin>
      <LoginBox>
        <Column gap={56} alignItems="center" width={446}>
          <Image src="/svg/maruLogo.svg" width={232} height={70} alt="logo" />
          <Column gap={36} width="100%">
            <Column gap={24}>
              <Input
                label="전화번호"
                width="100%"
                name="phoneNumber"
                onChange={handleLoginAdminDataChange}
              />
              <PreviewInput
                label="비밀번호"
                width="100%"
                name="password"
                onChange={handleLoginAdminDataChange}
                onKeyDown={handleEnterKeyPress}
              />
            </Column>
            <Column gap={16}>
              <Button width="100%" onClick={handleLogin}>
                로그인
              </Button>
            </Column>
          </Column>
        </Column>
      </LoginBox>
    </StyledLogin>
  );
};

const LoginPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <LoginContent />
    </Suspense>
  );
};

export default LoginPage;

const StyledLogin = styled.div`
  ${flex({ justifyContent: 'center' })}
  width: 100%;
  height: 100vh;
  background-color: ${color.gray100};
`;

const LoginBox = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' })}
  width: 818px;
  height: 100%;
  background-color: ${color.white};
`;
