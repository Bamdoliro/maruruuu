import { Box, PolicyRoule } from '@/components/policy';
import { color, font } from '@maru/design-system';
import { styled } from 'styled-components';

type Font = keyof typeof font;

const Chpater03 = () => {
  return (
    <PolicyRoule title="제3조 (개인정보 처리 위탁)">
      <Box color={color.white}>
        <StyledText fontType="p2" color={color.gray900}>
          <span style={{ color: color.maruDefault }}>(위탁사항이 없는 경우)</span>{' '}
          개인정보 처리를 위탁하는 경우 위탁하는 업무의 내용과 위탁받아 처리하는 자에 대한
          사항을 정보주체가 확인할 수 있도록 개인정보처리방침을 통해 안내하겠습니다.
        </StyledText>
      </Box>
    </PolicyRoule>
  );
};

export default Chpater03;

const StyledText = styled.div<{ fontType: Font; color: string }>`
  ${({ fontType }) => font[fontType]};
  color: ${(props) => props.color};
`;
