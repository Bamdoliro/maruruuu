import { color } from '@maru/design-system';
import { Column, Loader, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';

interface EnrollmentLoaderProps {
  isOpen: boolean;
}

const EnrollmentLoader = ({ isOpen }: EnrollmentLoaderProps) => {
  return (
    <BlurBackground $isOpen={isOpen}>
      <StyledEnrollmentLoader>
        <Column gap={8} alignItems="center">
          <Text fontType="H2" color={color.gray900}>
            pdf를 업로드하는 중입니다.
          </Text>
          <Text fontType="p3" color={color.gray600}>
            여러분의 입학 등록원을 올리는 중입니다. 조금만 기다려주세요!
          </Text>
        </Column>
        <Loader top="65%" />
      </StyledEnrollmentLoader>
    </BlurBackground>
  );
};

export default EnrollmentLoader;

const BlurBackground = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
`;

const StyledEnrollmentLoader = styled.div`
  position: relative;
  ${flex({ flexDirection: 'column', alignItems: 'center' })};
  gap: 48px;
  padding: 36px;
  height: 280px;
  background-color: ${color.white};
  border-radius: 16px;
`;