import { color, font } from '@maru/design-system';
import type { ChangeEvent } from 'react';
import styled from 'styled-components';

interface ContentTextareaProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const ContentTextarea = ({ value, onChange }: ContentTextareaProps) => {
  return (
    <Container>
      <StyledTextarea
        value={value}
        onChange={onChange}
        placeholder="내용을 입력해주세요"
      />
    </Container>
  );
};

export default ContentTextarea;

const Container = styled.div`
  width: 100%;
  height: 480px;
  padding: 0;
  border: none;
  color: ${color.gray900};
  resize: none;
`;

const StyledTextarea = styled.textarea`
  ${font.p2}
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  color: ${color.gray900};
  resize: none;

  &::placeholder {
    color: ${color.gray400};
  }

  &:focus {
    outline: none;
  }
`; 