import { color } from '@maru/design-system';
import { Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';

type LengthType = 'SHORT' | 'LONG';

interface DataBoxProps {
  label: string;
  data: string | number;
  lengthType?: LengthType;
}

const DataBox = ({ label, data, lengthType = 'SHORT' }: DataBoxProps) => {
  return (
    <StyledDataBox lengthType={lengthType}>
      <Text fontType="H4" color={color.gray900}>
        {label}
      </Text>
      <DataUnderlineBox lengthType={lengthType}>
        <Text fontType="p2" color={color.gray900}>
          {data}
        </Text>
      </DataUnderlineBox>
    </StyledDataBox>
  );
};
export default DataBox;

const StyledDataBox = styled.div<{ lengthType: LengthType }>`
  ${flex({ flexDirection: 'column', alignItems: 'flex-start' })}
  width: ${(props) => (props.lengthType === 'SHORT' ? 'fit-content' : '100%')};
  min-width: 400px;
  padding: 24px;
  gap: 16px;

  border-radius: 12px;
  border: 1px solid ${color.gray200};
  background: ${color.white};
`;

const DataUnderlineBox = styled.div<{ lengthType: LengthType }>`
  ${flex({ alignItems: 'flex-start' })}
  width: ${(props) => (props.lengthType === 'SHORT' ? '60%' : '100%')};
  padding-bottom: 4px;
  border-bottom: 1px solid ${color.gray200};
`;
