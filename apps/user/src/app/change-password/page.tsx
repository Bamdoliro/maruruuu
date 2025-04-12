'use client';

import { AppLayout } from '@/layouts';
import styled from 'styled-components';
import { flex } from '@maru/utils';
import { color } from '@maru/design-system';
import {
  Button,
  ButtonInput,
  Column,
  Input,
  PreviewInput,
  Text,
} from '@maru/ui';
import { Validate } from '@/components/signup';

const ChangePassword = () => {
  return (
    <AppLayout backgroundColor={color.gray100}>
      <StyledChangePassword>
        <ChangePasswordBox>
          <Column gap="24px" width="446px">
            <Text fontType="H2" color={color.gray900}>
              비밀번호 변경
            </Text>
            <Column gap="128px">
              <Column gap="32px">
                <Input label="이름" placeholder="예) 홍길동" width="100%" />
                <ButtonInput
                  label="전화번호 인증"
                  placeholder="- 없이 입력해주세요."
                  width="100%"
                  buttonText="인증번호 전송"
                  onClick={() => {}}
                  type="phoneNumber"
                />
                <ButtonInput
                  width="100%"
                  label="인증번호 입력"
                  placeholder="인증번호를 입력해주세요."
                  buttonText="인증번호 확인"
                  onClick={() => {}}
                />
                <Column gap="6px">
                  <PreviewInput
                    width="100%"
                    label="새 비밀번호"
                    placeholder="새 비밀번호를 입력해주세요."
                    onClick={() => {}}
                  />
                  {Validate('비밀번호')}
                </Column>
                <PreviewInput
                  width="100%"
                  label="비밀번호 재입력"
                  placeholder="비밀번호를 다시 입력해주세요."
                  onClick={() => {}}
                />
              </Column>
              <Button width="100%">비밀번호 변경</Button>
            </Column>
          </Column>
        </ChangePasswordBox>
      </StyledChangePassword>
    </AppLayout>
  );
};

const StyledChangePassword = styled.div`
  ${flex({ justifyContent: 'center', alignItems: 'center' })}
  width: 100%;
  height: 100vh;
`;

const ChangePasswordBox = styled.div`
  ${flex({ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' })}
  width: 708px;
  height: 100%;
  background-color: ${color.white};
`;

export default ChangePassword;
