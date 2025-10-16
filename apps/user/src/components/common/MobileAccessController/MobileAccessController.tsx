'use client';

import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { Button, Column, Text } from '@maru/ui';
import styled from 'styled-components';
import { color } from '@maru/design-system';

interface Props {
  children: ReactNode;
}

const MobileAccessController = ({ children }: Props) => {

  const router = useRouter();

  const handleButtonClick = () => {
    router.back();
  };

  return (
		<>
      <StyledMobileBlocker>
        <Column gap={36} alignItems="center" height={420}>
          <img src="/svg/maruLogo.svg" width={160} alt="logo" loading="lazy" />
          <Column gap={27} alignItems="center">
            <Column gap={12} alignItems="center">
              <Text fontType="H3" color={color.gray900}>
                모바일 접속 불가
              </Text>
              <Text fontType="p2" color={color.gray900}>
                PC 환경에서 접속해주세요
              </Text>
            </Column>
            <Text fontType="p3" color={color.gray600} textAlign="center">
              마루는 PC 환경에서 Chrome 브라우저로
              <br />
              접속하시는 것을 권장드립니다
            </Text>
          </Column>
          <Button styleType="PRIMARY" width={106} onClick={handleButtonClick}>
            <Text fontType="btn2">페이지 닫기</Text>
          </Button>
        </Column>
      </StyledMobileBlocker>
			<StyledDesktopContent>{children}</StyledDesktopContent>
		</>
  );
};

const StyledMobileBlocker = styled.div`
    display: none;

    @media (max-width: 700px) {
        display: flex;
        width: 100%;
        min-height: 100vh;
        background: white;
        align-items: center;
        justify-content: center;
		    z-index: 9999;
    }
`;

const StyledDesktopContent = styled.div`
  display: block;
  
  @media (max-width: 700px) {
    display: none;
  }
`;


export default MobileAccessController;
