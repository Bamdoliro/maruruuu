import { CellInput, Td } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from '@emotion/styled';
import { useInput } from './GEDCalculatorItem.hook';

interface Props {
  id: number;
  subject: string;
  score: number | null;
}

const GEDCalculatorItem = ({ id, subject, score }: Props) => {
  const { handleGEDSubjectChange } = useInput(id);

  return (
    <StyledGEDCalculatorItem>
      <Td styleType="SECONDARY" width="15.1%" height={64}>
        {subject}
      </Td>
      <Td width="69.8%" height={64}>
        <CellInput value={score ?? 0} name="score" onChange={handleGEDSubjectChange} />
      </Td>
      <Td width="15.1%" height={64}>
        {null}
      </Td>
    </StyledGEDCalculatorItem>
  );
};

export default GEDCalculatorItem;

const StyledGEDCalculatorItem = styled.div`
  ${flex({ alignItems: 'center' })}
  width: 100%;
  height: 100%;
`;
