import { color } from '@maru/design-system';
import { Button, Column, Text } from '@maru/ui';
import type { ButtonStyleType } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';

interface SideBarProps {
  onClick: () => void;
  styleType: ButtonStyleType;
}

const SideBar = ({ onClick, styleType }: SideBarProps) => {
  return (
    <StyledSideBar>
      <Column style={{ position: 'sticky', top: '0px' }} gap={10}>
        <FormFinalSubmitInfoBox>
          <Text fontType="H4" color={color.gray900}>
            제출 하기 전에 잠깐!
          </Text>
          <Column gap={12} alignItems="flex-start">
            <Text fontType="p2" color={color.gray900}>
              1. 제출해야 하는 서류 확인하기
            </Text>
            <Text fontType="p2" color={color.gray900}>
              2. 잘못 입력되어 있는지 확인하기
            </Text>
            <Text fontType="p2" color={color.gray900}>
              3. 첨부 안 한 서류 있는지 확인하기
            </Text>
          </Column>
        </FormFinalSubmitInfoBox>
        <Button onClick={onClick} styleType={styleType} width="100%" size="LARGE">
          원서 최종 제출
        </Button>
      </Column>
    </StyledSideBar>
  );
};

export default SideBar;

const StyledSideBar = styled.div`
  position: relative;
  width: 276px;
  height: 330px;
`;

const FormFinalSubmitInfoBox = styled.div`
  ${flex({ flexDirection: 'column' })};
  width: 100%;
  height: 260px;
  padding: 28px 24px;
  gap: 20px;
  border-radius: 12px;
  border: 1px solid ${color.gray300};
`;
