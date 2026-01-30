import { color } from '@maru/design-system';
import { Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from '@emotion/styled';

interface DataBoxProps {
  label: string;
  data: string | number;
}

const DataBox = ({ label, data }: DataBoxProps) => {
  return (
    <StyledDataBox>
      <Text fontType="H4" color={color.gray900}>
        {label}
      </Text>
      <DataUnderlineBox>
        <Text fontType="p2" color={color.gray900} whiteSpace="pre-wrap" width="100%">
          {data}
        </Text>
      </DataUnderlineBox>
    </StyledDataBox>
  );
};
export default DataBox;

const StyledDataBox = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'flex-start' })}
  width: 100%;
  min-width: 450px;
  padding: 24px;
  gap: 16px;
  border-radius: 12px;
  border: 1px solid ${color.gray200};
  background: ${color.white};
`;

const DataUnderlineBox = styled.div`
  ${flex({ alignItems: 'flex-start' })}
  width: 100%;
  min-width: 0;
  overflow: hidden;
  padding-bottom: 4px;
  border-bottom: 1px solid ${color.gray200};
`;
