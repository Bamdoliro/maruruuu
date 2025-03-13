import { color } from '@maru/design-system';
import { Column, Loader, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';

interface Props {
  isOpen: boolean;
}

const PdfDownloadLoader = ({ isOpen }: Props) => {
  return (
    <BlurBackground $isOpen={isOpen}>
      <StyledPdfDownloadLoader>
        <Column gap={8} alignItems="center">
          <Text fontType="H2" color={color.gray900}>
            입학원서 pdf파일을 만드는 중입니다...
          </Text>
          <Text fontType="p3" color={color.gray600}>
            여러분의 멋진 원서를 만드는 중입니다. 조금만 기다려주세요!
          </Text>
        </Column>
        <Loader top="65%" />
      </StyledPdfDownloadLoader>
    </BlurBackground>
  );
};

export default PdfDownloadLoader;

const BlurBackground = styled.div<{ $isOpen: boolean }>`
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
`;

const StyledPdfDownloadLoader = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'center' })};
  height: 280px;
  gap: 48px;
  padding: 36px;
  position: relative;
  border-radius: 16px;
  background-color: ${color.white};
`;
