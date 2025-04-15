import { color, font } from '@maru/design-system';
import { flex } from '@maru/utils';
import type { ChangeEvent } from 'react';
import styled from 'styled-components';

interface TitleInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TitleInput = ({ value, onChange }: TitleInputProps) => {
  return (
    <Container>
      <Input
        value={value}
        onChange={onChange}
        placeholder="제목을 입력해주세요"
      />
    </Container>
  );
};

export default TitleInput;

const Container = styled.div`
  ${flex({ alignItems: 'center' })}
  width: 100%;
  height: 48px;
  padding: 0;
  border: none;
  color: ${color.gray900};
`;

const Input = styled.input`
  ${font.p2}
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  color: ${color.gray900};

  &::placeholder {
    color: ${color.gray400};
  }

  &:focus {
    outline: none;
  }
`; 