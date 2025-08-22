'use client';

import styled from 'styled-components';
import { color } from '@maru/design-system';
import { flex } from '@maru/utils';
import { AppLayout } from '@/layouts';
import { Column, Text } from '@maru/ui';
import PasswordContent from '@/components/password/passwordContent/passwordContent';
import { useLoginGuard } from '@/hooks';

const ChangePassword = () => {
  useLoginGuard();

  return (
    <AppLayout backgroundColor={color.gray100}>
      <StyledChangePassword>
        <ChangePasswordBox>
          <ScrollArea>
            <Column gap={24}>
              <Text fontType="H2" color={color.gray900}>
                비밀번호 변경
              </Text>
              <PasswordContent />
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
