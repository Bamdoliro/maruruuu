'use client';

import styled from 'styled-components';
import { color } from '@maru/design-system';
import { flex } from '@maru/utils';

import { AppLayout } from '@/layouts';
import {
  Button,
  ButtonInput,
  Column,
  Input,
  PreviewInput,
  Text,
  TimeLimitInput,
} from '@maru/ui';
import { Validate } from '@/components/signup';

import {
  useInput,
  useVerificationCodeAction,
  useChangePasswordAction,
} from './changePassword.hook';
import { useState } from 'react';

const ChangePassword = () => {
  const { changePassword, handleChangePasswordChange } = useInput();
  const [timerTime, setTimerTime] = useState(0);
  const { handleChangePassword } = useChangePasswordAction(changePassword);

  const resetTimerTime = () => {
    setTimerTime(300);
  };

  const {
    isVerificationCodeDisabled,
    isVerificationCodeSent,
    isVerificationCodeConfirmed,
    handleRequestVerificationCode,
    handleVerificationConfirm,
  } = useVerificationCodeAction(changePassword);

  return (
    <AppLayout backgroundColor={color.gray100}>
      <StyledChangePassword>
        <ChangePasswordBox>
          <ScrollArea>
            <Column gap="24px">
              <Text fontType="H2" color={color.gray900}>
                비밀번호 변경
              </Text>
              <Column gap="128px">
                <Column gap="32px">
                  <Input
                    label="이름"
                    placeholder="예) 홍길동"
                    width="100%"
                    name="name"
                    onChange={handleChangePasswordChange}
                  />
                  <ButtonInput
                    label="전화번호 인증"
                    placeholder="- 없이 입력해주세요."
                    width="100%"
                    buttonText={isVerificationCodeSent ? '재전송' : '인증번호 전송'}
                    onClick={() => {
                      handleRequestVerificationCode();
                      resetTimerTime();
                    }}
                    type="phoneNumber"
                    name="phoneNumber"
                    onChange={handleChangePasswordChange}
                    value={changePassword.phoneNumber}
                    enabled={!isVerificationCodeDisabled}
                  />

                  {isVerificationCodeSent && (
                    <TimeLimitInput
                      width="100%"
                      label="인증번호 입력"
                      maxLength={6}
                      placeholder="인증번호를 입력해주세요."
                      buttonText="인증번호 확인"
                      onClick={handleVerificationConfirm}
                      name="code"
                      enabled={isVerificationCodeConfirmed}
                      timerTime={timerTime}
                      setTimerTime={setTimerTime}
                      isError={!(changePassword.code.length == 6)}
                      onChange={handleChangePasswordChange}
                    />
                  )}
                  <Column gap="6px">
                    <PreviewInput
                      width="100%"
                      label="새 비밀번호"
                      placeholder="새 비밀번호를 입력해주세요."
                      name="password"
                      onChange={handleChangePasswordChange}
                    />
                    {Validate(changePassword.password)}
                  </Column>
                  <PreviewInput
                    width="100%"
                    label="비밀번호 재입력"
                    placeholder="비밀번호를 다시 입력해주세요."
                    name="password_confirm"
                    onChange={handleChangePasswordChange}
                    isError={changePassword.password != changePassword.password_confirm}
                    errorMessage="비밀번호가 일치하지 않습니다"
                  />
                </Column>
                <Button
                  width="100%"
                  disabled={!isVerificationCodeConfirmed}
                  onClick={handleChangePassword}
                >
                  비밀번호 변경
                </Button>
              </Column>
            </Column>
          </ScrollArea>
        </ChangePasswordBox>
      </StyledChangePassword>
    </AppLayout>
  );
};

export default ChangePassword;

const StyledChangePassword = styled.div`
  ${flex({ justifyContent: 'center', alignItems: 'center' })}
  width: 100%;
  height: 100vh;
`;

const ChangePasswordBox = styled.div`
  display: flex;
  width: 708px;
  height: 100%;
  background-color: ${color.white};
  overflow: auto;
`;

const ScrollArea = styled.div`
  ${flex({ flexDirection: 'column' })}
  margin: 100px auto;
  max-width: 446px;
  width: 90%;
  height: fit-content;
`;
