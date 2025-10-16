'use client';

import { useEffect, useState } from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { Button, Column, Text } from '@maru/ui';
import { color } from '@maru/design-system';

interface Props {
  children: ReactNode;
}

const MobileAccessController = ({ children }: Props) => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 700);
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	if (isMobile) {
		return (
		<StyledMobileBlocker>
			<Column gap={36} alignItems='center' height={420}>
				<img
					src="/svg/maruLogo.svg"
					width={160}
					alt="logo"
					loading="lazy"
				/>
				<Column gap={27} alignItems='center'>
					<Column gap={12} alignItems='center'>
						<Text fontType='H3' color={color.gray900}>모바일 접속 불가</Text>
						<Text fontType='p2' color={color.gray900}>PC 환경에서 접속해주세요</Text>
					</Column>
					<Text fontType='p3' color={color.gray600} textAlign='center'>
						마루는 PC 환경에서 Chrome 브라우저로<br/>
						접속하시는 것을 권장드립니다
					</Text>
				</Column>
				<Button styleType='PRIMARY' width={106}>
					<Text fontType='btn2'>페이지 닫기</Text>
				</Button>
			</Column>
		</StyledMobileBlocker>
		);
	}

	return children;
};

const StyledMobileBlocker = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default MobileAccessController;