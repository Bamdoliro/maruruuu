import { flex } from '@maru/utils';
import type { InputHTMLAttributes } from 'react';
import styled from '@emotion/styled';

type RadioProps = InputHTMLAttributes<HTMLInputElement>;

const Radio = ({ id, value, name, checked, onChange, disabled }: RadioProps) => {
  return (
    <StyledRadio>
      <RadioInput
        type="radio"
        id={id}
        value={value}
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
    </StyledRadio>
  );
};

const StyledRadio = styled.div`
  ${flex({ alignItems: 'center', justifyContent: 'center' })}
  width: 24px;
  height: 24px;
`;

const RadioInput = styled.input`
  width: 20px;
  height: 20px;
`;

export default Radio;
