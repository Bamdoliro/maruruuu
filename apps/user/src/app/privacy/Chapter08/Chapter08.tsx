import { ManagerTable, PolicyRoule } from '@/components/policy';
import { color, font } from '@maru/design-system';
import { Column } from '@maru/ui';
import { styled } from 'styled-components';

type Font = keyof typeof font;

const Chpater08 = () => {
  return (
    <PolicyRoule title="제8조 (개인정보 보호책임자)">
      <Column gap={8}>
        <StyledText fontType="p3" color={color.gray900}>
          우리학교는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한
          정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를
          지정하고 있습니다.
        </StyledText>
        <ManagerTable />
      </Column>
    </PolicyRoule>
  );
};

export default Chpater08;

const StyledText = styled.div<{ fontType: Font; color: string }>`
  ${({ fontType }) => font[fontType]};
  color: ${(props) => props.color};
`;
