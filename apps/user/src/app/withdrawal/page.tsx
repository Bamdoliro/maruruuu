'use client';

import AppLayout from '@/layouts/AppLayout';
import { color, font } from '@maru/design-system';
import { flex } from '@maru/utils';
import styled from 'styled-components';
import { Button, Column, PreviewInput, Text } from '@maru/ui';
import { ROUTES } from '@/constants/common/constants';
import { IconArrowRight } from '@maru/icon';
import Link from 'next/link';
import { useOverlay } from '@toss/use-overlay';
import { useCTAButton, useInput, useWithdrawalAction } from './withdrawal.hook';
import { WithdrawalModal } from '@/components/withdrawal';
import { useLoginGuard } from '@/hooks';

const Withdrawal = () => {
  useLoginGuard();

  const overlay = useOverlay();
  const { handleMoveMain } = useCTAButton();
  const { withdrawal, handleLoginChange } = useInput();
  const { handleWithrawal } = useWithdrawalAction(withdrawal.password);

  const openWithdrawalModal = () => {
    overlay.open(({ isOpen, close }) => (
      <WithdrawalModal
        isOpen={isOpen}
        onClose={close}
        onConfirm={() => {
          handleWithrawal();
          close();
        }}
      />
    ));
  };

  return (
    <AppLayout backgroundColor={color.gray100}>
      <StyledWithdrawal>
        <WithdrawalBox>
          <Column gap={80} alignItems="center" width={446}>
            <img
              loading="lazy"
              src="/svg/maruLogo.svg"
              onClick={handleMoveMain}
              style={{ cursor: 'pointer' }}
              width={232}
              height={70}
              alt="logo"
            />
            <Column gap={36} width="100%">
              <PreviewInput
                label="비밀번호"
                placeholder="비밀번호를 입력해주세요."
                width="100%"
                name="password"
                onChange={handleLoginChange}
              />
              <Column gap={16} alignItems="center">
                <Button
                  width="100%"
                  onClick={openWithdrawalModal}
                  size="MEDIUM"
                  styleType={withdrawal.password === '' ? 'DISABLED' : 'WARNING'}
                >
                  <Text fontType="btn2" color={color.white}>
                    회원 탈퇴
                  </Text>
                </Button>
                <ChangePasswordLink href={ROUTES.PASSWORD}>
                  비밀번호 변경
                  <IconArrowRight color={color.gray500} width={16} height={16} />
                </ChangePasswordLink>
              </Column>
            </Column>
          </Column>
        </WithdrawalBox>
      </StyledWithdrawal>
    </AppLayout>
  );
};

export default Withdrawal;

const StyledWithdrawal = styled.div`
  ${flex({ alignItems: 'center', justifyContent: 'center' })}
  width: 100%;
  height: 100vh;
`;

const WithdrawalBox = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' })}
  padding: 0 185px;
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
