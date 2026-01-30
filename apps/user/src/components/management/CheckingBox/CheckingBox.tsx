import { color } from '@maru/design-system';
import { IconArrowOutward } from '@maru/icon';
import { Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from '@emotion/styled';

interface CheckingBoxProps {
  title: string;
  subTitle: string;
  onClick: () => void;
  isIcon?: boolean;
}

const CheckingBox = ({ title, subTitle, onClick, isIcon = false }: CheckingBoxProps) => {
  return (
    <StyledCheckingBox onClick={onClick}>
      <Row gap={8} alignItems="center">
        <Text fontType="H3" color={color.gray900}>
          {title}
        </Text>
        {isIcon && <IconArrowOutward width={36} height={36} color={color.maruDefault} />}
      </Row>
      <Text fontType="p2" color={color.gray600}>
        {subTitle}
      </Text>
    </StyledCheckingBox>
  );
};

export default CheckingBox;

const StyledCheckingBox = styled.div`
  ${flex({
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  })}
  width: 100%;
  height: 125px;
  border-radius: 12px;
  padding: 24px 32px;
  border: 1px solid ${color.gray200};
  background-color: ${color.white};

  cursor: pointer;
`;
