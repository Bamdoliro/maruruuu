import { color, font } from '@maru/design-system';
import type { ChangeEvent } from 'react';
import styled from 'styled-components';
import type { MessageForm } from '@/types/message/client';

interface ContentTextareaProps {
  name: keyof MessageForm;
  value: string;
  onChange: (e: { target: { name: keyof MessageForm; value: string } }) => void;
}

const ContentTextarea = ({ name, value, onChange }: ContentTextareaProps) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange({
      target: {
        name,
        value: e.target.value,
      },
    });
  };

  return (
    <StyledContainer>
      <StyledTextarea
        name={name}
        value={value}
        onChange={handleChange}
        placeholder="내용을 입력해주세요"
      />
    </StyledContainer>
  );
};

export default ContentTextarea;

const StyledContainer = styled.div`
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
