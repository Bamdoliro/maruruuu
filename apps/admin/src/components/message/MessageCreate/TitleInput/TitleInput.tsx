import { color, font } from '@maru/design-system';
import type { ChangeEvent } from 'react';
import styled from 'styled-components';
import type { MessageForm } from '../MessageCreate.hooks';

interface TitleInputProps {
  name: keyof MessageForm;
  value: string;
  handleChange: (e: { target: { name: keyof MessageForm; value: string } }) => void;
}

const TitleInput = ({ name, value, handleChange }: TitleInputProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange({
      target: {
        name,
        value: e.target.value,
      },
    });
  };

  return (
    <StyledInput
      type="text"
      name={name}
      value={value}
      onChange={handleInputChange}
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
