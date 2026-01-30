import { color } from '@maru/design-system';
import { IconPhone } from '@maru/icon';
import { Column, Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from '@emotion/styled';

interface SchoolNumberBoxProps {
  size: 'big' | 'small';
}

const SchoolNumberBox = ({ size }: SchoolNumberBoxProps) => {
  return (
    <StyledSchoolNumberBox size={size}>
      <Row gap={12} alignItems="center">
        <IconPhone width={36} height={36} fill={color.maruDefault} />
        <Text fontType={size === 'big' ? 'H2' : 'H3'} color={color.gray900}>
          입학 문의 전화
        </Text>
        {size === 'small' && (
          <Text fontType="H4" color={color.gray600}>
            입학담당관
          </Text>
        )}
      </Row>
      <Column alignItems="flex-start" gap={4}>
        {size === 'big' && (
          <Text fontType="H4" color={color.gray600}>
            입학담당관
          </Text>
        )}
        <Text fontType={size === 'big' ? 'H1' : 'H4'} color={color.gray900}>
          051-970-1792
        </Text>
      </Column>
    </StyledSchoolNumberBox>
  );
};

export default SchoolNumberBox;

const StyledSchoolNumberBox = styled.div<{ size: 'big' | 'small' }>`
  ${flex({
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  })}
  width: 100%;
  height: ${({ size }) => (size === 'big' ? '415px' : '141px')};
  padding: ${({ size }) => (size === 'big' ? '48px 36px' : '24px 32px')};
  border-radius: 12px;
  border: 1px solid ${color.gray200};
  background-color: ${color.white};
`;
