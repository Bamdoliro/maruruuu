'use client';

import { ROUTES, TOKEN } from '@/constants/common/constants';
import { AppLayout } from '@/layouts';
import { color, font } from '@maru/design-system';
import { IconArrowRight } from '@maru/icon';
import { Button, Column, Input, PreviewInput, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import Link from 'next/link';
import styled from 'styled-components';
import { useCTAButton, useInput, useKeyDown, useLoginAction } from './login.hook';
import { useEffect } from 'react';
import { Storage } from '@/apis/storage/storage';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useOverlay } from '@toss/use-overlay';
import { AlertStyleModal } from '@/components/common';

const Login = () => {
  const router = useRouter();
  const overlay = useOverlay();

  useEffect(() => {
    const token = Storage.getItem(TOKEN.ACCESS) || undefined;

    const isTokenValid = (token?: string) => {
      if (!token) return false;

      try {
        const decoded: { exp: number } = jwtDecode(token);
        const now = Date.now() / 1000;
        return decoded.exp > now;
      } catch (e) {
        return false;
      }
    };

    if (isTokenValid(token)) {
      overlay.open(({ close, isOpen }) => (
        <AlertStyleModal
          isOpen={isOpen}
          onClose={() => {
            router.replace(ROUTES.MAIN);
            close();
          }}
          title="이미 로그인되어 있습니다."
          content={
            <Text fontType="p2" whiteSpace="pre-line">
              로그인이 되어 있지 않은 경우에 로그인이 가능합니다.
              <br />
              로그아웃 후 접속해주세요.
            </Text>
          }
          height={350}
        />
      ));
    }
  }, [overlay, router]);

  const { handleMoveMainPage } = useCTAButton();
  const { login, handleLoginChange } = useInput();
  const { handleLogin } = useLoginAction(login);

  useKeyDown(handleLogin);

  return (
    <AppLayout backgroundColor={color.gray100}>
      <StyledLogin>
        <LoginBox>
          <Column
            gap={56}
            alignItems="center"
            justifyContent="center"
            width={446}
            height="100%"
          >
            <img
              loading="lazy"
              src="/svg/maruLogo.svg"
              onClick={handleMoveMainPage}
              style={{ cursor: 'pointer' }}
              width={232}
              height={70}
              alt="logo"
            />
            <Column gap={36} width="100%">
              <Column gap={24}>
                <Input
                  label="전화번호"
                  placeholder="전화번호를 입력해주세요."
                  width="100%"
                  name="phoneNumber"
                  onChange={handleLoginChange}
                />
                <PreviewInput
                  label="비밀번호"
                  placeholder="비밀번호를 입력해주세요."
                  width="100%"
                  name="password"
                  onChange={handleLoginChange}
                />
              </Column>
              <Column gap={16} alignItems="center">
                <Button width="100%" onClick={handleLogin}>
                  로그인
                </Button>
                <ChangePasswordLink href={ROUTES.PASSWORD}>
                  비밀번호 변경
                  <IconArrowRight color={color.gray500} width={16} height={16} />
                </ChangePasswordLink>
              </Column>
            </Column>
            <SignupLinkBox>
              회원이 아니신가요?
              <SingupLink href={ROUTES.SIGNUP}>회원가입</SingupLink>
            </SignupLinkBox>
          </Column>
        </LoginBox>
      </StyledLogin>
    </AppLayout>
  );
};

export default Login;

const StyledLogin = styled.div`
  ${flex({ justifyContent: 'center', alignItems: 'center' })}
  width: 100%;
  height: 100vh;
`;

const LoginBox = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' })}
  width: 818px;
  height: 100%;
  background-color: ${color.white};
`;

const ChangePasswordLink = styled(Link)`
  ${flex({ alignItems: 'center' })}
  color: ${color.gray500};
  ${font.p2}

  &:hover {
    text-decoration-line: underline;
    text-decoration-color: ${color.gray500};
  }
`;

const SignupLinkBox = styled.div`
  ${flex({ alignItems: 'center' })}
  ${font.p2}
  color: ${color.gray500};
  gap: 8px;
`;

const SingupLink = styled(Link)`
  ${font.p2}
  color: ${color.gray600};

  &:hover {
    text-decoration-line: underline;
    text-decoration-color: ${color.gray600};
  }
`;
