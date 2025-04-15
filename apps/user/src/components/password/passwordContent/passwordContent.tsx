import {
  Button,
  ButtonInput,
  Column,
  Input,
  PreviewInput,
  TimeLimitInput,
} from '@maru/ui';
import { Validate } from '@/components/signup';

import {
  useChangePasswordAction,
  useInput,
  useVerificationCodeAction,
} from '@/components/password/passwordContent/passwordContent.hook';
import { useState } from 'react';

const PasswordContent = () => {
  const { changePassword, handleChangePasswordChange } = useInput();
  const [timerTime, setTimerTime] = useState(0);
  const { handleChangePassword } = useChangePasswordAction(changePassword);

  const {
    isVerificationCodeDisabled,
    isVerificationCodeSent,
    isVerificationCodeConfirmed,
    handleRequestVerificationCode,
    handleVerificationConfirm,
  } = useVerificationCodeAction(changePassword);

  return (
    <Column gap={128}>
      <Column gap={32}>
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
            setTimerTime(300);
            handleRequestVerificationCode();
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
        <Column gap={6}>
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
  );
};

export default PasswordContent;
