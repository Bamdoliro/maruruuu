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
import styled from '@emotion/styled';
import Terms from '../Terms/Terms';
import Validate from '../Validate/Validate';
import {
  useInput,
  useSignUpAction,
  useVerificationCodeAction,
} from './SignUpContent.hook';
import { useState } from 'react';

const SignUpContent = () => {
  const [termsAgree, setTermsAgree] = useState(false);
  const [timerTime, setTimerTime] = useState(0);

  const { signUp, handleSignUpChange } = useInput();
  const {
    handleRequestVerificationCode,
    handleVerificationCodeConfirm,
    isVerificationCodeDisabled,
    isVerificationCodeConfirmed,
    isVerificationCodeSent,
  } = useVerificationCodeAction(signUp);
  const { handleSignUp } = useSignUpAction(signUp, termsAgree);

  const startTimer = () => {
    setTimerTime(300);
  };

  return (
    <StyleSignupContent>
      <SignUpBox>
        <Column gap={4}>
          <Text fontType="H2" color={color.gray900}>
            회원가입
          </Text>
          <Text fontType="form" color={color.gray700}>
            입학하는 학생의 정보를 입력해주세요.
          </Text>
        </Column>
        <Column gap={12}>
          <Input
            width="100%"
            name="name"
            label="이름"
            maxLength={50}
            placeholder="예) 홍길동"
            onChange={handleSignUpChange}
            value={signUp.name}
          />
          <ButtonInput
            width="100%"
            name="phoneNumber"
            label="전화번호 인증"
            buttonText={isVerificationCodeSent ? '재전송' : '인증번호 전송'}
            onClick={() => {
              handleRequestVerificationCode();
              startTimer();
            }}
            maxLength={11}
            type="phoneNumber"
            placeholder="- 없이 입력해주세요."
            onChange={handleSignUpChange}
            value={signUp.phoneNumber}
            enabled={!isVerificationCodeDisabled}
          />
          {isVerificationCodeSent && (
            <TimeLimitInput
              label="인증코드"
              width="100%"
              maxLength={6}
              name="code"
              onChange={handleSignUpChange}
              onClick={handleVerificationCodeConfirm}
              timerTime={isVerificationCodeConfirmed ? 0 : timerTime}
              setTimerTime={setTimerTime}
              isError={!(signUp.code.length === 6)}
              buttonText="인증번호 확인"
              enabled={isVerificationCodeConfirmed}
              placeholder="인증번호를 입력해주세요."
            />
          )}
          <Column gap={6}>
            <PreviewInput
              width="100%"
              name="password"
              maxLength={20}
              label="비밀번호"
              placeholder="비밀번호를 입력해주세요."
              onChange={handleSignUpChange}
            />
            {Validate(signUp.password)}
          </Column>
          <PreviewInput
            width="100%"
            name="password_confirm"
            label="비밀번호 재확인"
            maxLength={20}
            placeholder="비밀번호를 다시 입력해주세요."
            onChange={handleSignUpChange}
            isError={signUp.password !== signUp.password_confirm}
            errorMessage="비밀번호가 일치하지 않습니다."
          />
        </Column>
        <Terms setTermsAgree={setTermsAgree} />
        <Button width="100%" onClick={handleSignUp}>
          회원가입
        </Button>
      </SignUpBox>
    </StyleSignupContent>
  );
};

export default SignUpContent;

const StyleSignupContent = styled.div`
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
