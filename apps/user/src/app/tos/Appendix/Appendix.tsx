import { PolicyRoule } from '@/components/policy';
import { color, font } from '@maru/design-system';
import { Column } from '@maru/ui';
import styled from '@emotion/styled';

type Font = keyof typeof font;

const Appendix = () => {
  return (
    <Column gap={32}>
      <Column gap={4}>
        <StyledText fontType="H3" color={color.gray900}>
          부칙
        </StyledText>
        <PolicyRoule title="(240711) 이 약관은 공시한 날부터 시행합니다.">
          <StyledText fontType="p3" color={color.maruDefault}>
            공고 일자 : [240711]
            <br />
            시행 일자 : [240711]
          </StyledText>
        </PolicyRoule>
      </Column>
    </Column>
  );
};

export default Appendix;

const StyledText = styled.div<{ fontType: Font; color: string }>`
  ${({ fontType }) => font[fontType]};
  color: ${(props) => props.color};
`;
