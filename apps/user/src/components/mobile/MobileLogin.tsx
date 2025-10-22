import { color } from '@maru/design-system';
import { Button, Column, Input, PreviewInput, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';
import { useMobile } from './Mobile.hook';

const MobileLogin = () => {
  const { handleLogin, handleLoginChange } = useMobile('MAIN');

  return (
    <StyledMobileLogin>
      <Column gap={36} alignItems="center">
        <img src="/svg/maruLogo.svg" width={152} height={46} alt="logo" loading="lazy" />
        <Column gap={28} alignItems="center">
          <Column gap={14}>
            <Input
              placeholder="전화번호를 입력해주세요."
              label="전화번호"
              width="calc(100vw - 40px)"
              name="phoneNumber"
              onChange={handleLoginChange}
            />
            <PreviewInput
              placeholder="비밀번호를 입력해주세요."
              label="비밀번호"
              width="calc(100vw - 40px)"
              name="password"
              onChange={handleLoginChange}
            />
          </Column>
          <Button size="SMALL" width={74} onClick={handleLogin}>
            로그인
          </Button>
        </Column>
      </Column>
      <Text fontType="p3" color={color.gray500} textAlign="center">
        이 사이트는 결과 확인만 가능합니다.
        <br />
        회원가입 및 다른 기능은 PC 웹사이트에서 가능합니다.
      </Text>
    </StyledMobileLogin>
  );
};

export default MobileLogin;

const StyledMobileLogin = styled.div`
  ${flex({
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  })}
  width: 100%;
  height: 100%;
  padding: 44.1% 20px 27% 20px;
  background: ${color.white};
`;
