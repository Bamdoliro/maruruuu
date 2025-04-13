import { color, font } from '@maru/design-system';
import { ChangeEvent } from 'react';
import styled from 'styled-components';

interface TitleInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TitleInput = ({ value, onChange }: TitleInputProps) => {
  return (
    <StyledInput
      type="text"
      value={value}
      onChange={onChange}
      placeholder="제목을 입력해주세요"
    />
  );
};

export default TitleInput;

const StyledInput = styled.input`
  ${font.H2}
  width: 100%;
  border: none;
  color: ${color.gray900};

  &::placeholder {
    color: ${color.gray400};
  }

  &:focus {
    outline: none;
  }
`;
