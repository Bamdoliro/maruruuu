import { formListSortingTypeAtom, formListTypeAtom } from '@/store';
import type { FormListScoreRangeKey } from '@/types/form/client';
import { color, font } from '@maru/design-system';
import { useDebounceInput } from '@maru/hooks';
import { Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from '@emotion/styled';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';

interface ScoreInputProps {
  name: FormListScoreRangeKey;
  placeholder: string;
}

const ScoreInput = ({ name, placeholder }: ScoreInputProps) => {
  const setFormListType = useSetAtom(formListTypeAtom);
  const [formListSortingType, setFormListSortingType] = useAtom(formListSortingTypeAtom);
  const { value, onChange, debouncedValue } = useDebounceInput({
    initialValue: String(formListSortingType[name] ?? ''),
    debounceTimeout: 400,
  });

  useEffect(() => {
    const score = debouncedValue.trim() === '' ? null : Number(debouncedValue);
    if (score !== null && Number.isNaN(score)) return;

    if (score !== null) setFormListType('정렬');
    setFormListSortingType((prev) =>
      prev[name] === score ? prev : { ...prev, [name]: score },
    );
  }, [debouncedValue, name, setFormListSortingType, setFormListType]);

  return (
    <Input
      type="number"
      min={0}
      step="any"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

interface ScoreRangeFilterProps {
  label: string;
  minName: FormListScoreRangeKey;
  maxName: FormListScoreRangeKey;
}

const ScoreRangeFilter = ({ label, minName, maxName }: ScoreRangeFilterProps) => {
  return (
    <StyledScoreRangeFilter>
      <Text fontType="context" color={color.gray600}>
        {label}
      </Text>
      <ScoreInput name={minName} placeholder="최소" />
      <Text fontType="context" color={color.gray600}>
        ~
      </Text>
      <ScoreInput name={maxName} placeholder="최대" />
    </StyledScoreRangeFilter>
  );
};

export default ScoreRangeFilter;

const StyledScoreRangeFilter = styled.div`
  ${flex({ alignItems: 'center' })}
  gap: 6px;
  height: 40px;
  padding: 0 12px;
  background-color: ${color.white};
  border: 1px solid ${color.gray400};
  border-radius: 6px;

  &:focus-within {
    border: 1px solid ${color.maruDefault};
    outline: 2px solid rgba(20, 112, 255, 0.25);
  }
`;

const Input = styled.input`
  ${font.context}
  width: 48px;
  color: ${color.gray800};
  text-align: center;

  &::placeholder {
    color: ${color.gray500};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;
