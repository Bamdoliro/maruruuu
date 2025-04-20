import { color, font } from '@maru/design-system';
import styled, { css } from 'styled-components';
import type { InputProps } from './Input.type';

const FormInput = ({
  width = 360,
  height,
  label,
  placeholder,
  type = 'text',
  name,
  value,
  onChange,
  textAlign,
}: InputProps) => {
  return (
    <div style={{ width, height }}>
      {label && <Label>{label}</Label>}
      <div style={{ position: 'relative' }}>
        <StyledInput
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          name={name}
          value={value}
          style={{ textAlign }}
        />
      </div>
    </div>
  );
};

export default FormInput;

const StyledInput = styled.input`
  ${font.p2}
  color: ${color.gray800};
  height: 48px;
  width: 100%;
  padding: 10px 16px;
  background-color: ${color.white};
  border: 1px solid ${color.gray400};
  border-radius: 6px;
  &::placeholder {
    color: ${color.gray500};
  }
  &:focus {
    border: 1px solid ${color.maruDefault};
    outline: 2px solid rgba(20, 112, 255, 0.25);
  }
`;

const Label = styled.p`
  ${font.context}
  color: ${color.gray700};
  margin-bottom: 8px;
`;
