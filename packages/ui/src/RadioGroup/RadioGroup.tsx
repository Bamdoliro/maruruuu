import { color, font } from '@maru/design-system';
import type { ChangeEventHandler } from 'react';
import React from 'react';
import styled from 'styled-components';
import Row from '../Flex/Row';
import Radio from '../Radio/Radio';

interface Radio {
  value: string;
  label: string;
}

interface RadioGroupProps {
  label?: string | React.ReactNode;
  items: Radio[] | string[];
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const RadioGroup = ({ label, items, name, value, onChange }: RadioGroupProps) => {
  return (
    <StyledRadioGroup>
      <Label>{label}</Label>
      <Row gap={40}>
        {items.map((item, index) => {
          const isString = typeof item === 'string';
          const radioLabel = isString ? item : item.label;
          const radioValue = isString ? item : item.value;
          const isChecked = isString ? item === value : value === item.value;

          return (
            <Row key={`radio ${name} ${index}`} gap={8} alignItems="center">
              <Radio
                name={name}
                value={radioValue}
                checked={isChecked}
                onChange={onChange}
              />
              <RadioLabel>{radioLabel}</RadioLabel>
            </Row>
          );
        })}
      </Row>
    </StyledRadioGroup>
  );
};

export default RadioGroup;

const StyledRadioGroup = styled.div`
  height: 100%;
`;

const Label = styled.p`
  ${font.context}
  color: ${color.gray700};
  margin-bottom: 12px;
`;

const RadioLabel = styled.p`
  ${font.p2};
  color: ${color.gray900};
`;
