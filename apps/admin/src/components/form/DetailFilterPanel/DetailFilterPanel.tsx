import { formListSortingTypeAtom, formListTypeAtom } from '@/store';
import type { FormListScoreRangeKey, MentoringProgramFilter } from '@/types/form/client';
import { color, font } from '@maru/design-system';
import { Button, Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useAtom, useSetAtom } from 'jotai';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { useState } from 'react';

interface DetailFilterDraft extends Record<FormListScoreRangeKey, string> {
  mentoringProgram: MentoringProgramFilter | null;
}

const MENTORING_PROGRAM_OPTIONS: {
  value: MentoringProgramFilter | null;
  label: string;
}[] = [
  { value: null, label: '전체' },
  { value: 'true', label: '신청' },
  { value: 'false', label: '미신청' },
];

const SCORE_RANGE_FIELDS: {
  label: string;
  minName: FormListScoreRangeKey;
  maxName: FormListScoreRangeKey;
}[] = [
  { label: '1차 점수', minName: 'firstRoundScoreMin', maxName: 'firstRoundScoreMax' },
  { label: '최종 점수', minName: 'totalScoreMin', maxName: 'totalScoreMax' },
];

const EMPTY_DRAFT: DetailFilterDraft = {
  mentoringProgram: null,
  firstRoundScoreMin: '',
  firstRoundScoreMax: '',
  totalScoreMin: '',
  totalScoreMax: '',
};

const toScore = (value: string) => (value.trim() === '' ? null : Number(value));

interface DetailFilterPanelProps {
  onClose: () => void;
}

const DetailFilterPanel = ({ onClose }: DetailFilterPanelProps) => {
  const setFormListType = useSetAtom(formListTypeAtom);
  const [formListSortingType, setFormListSortingType] = useAtom(formListSortingTypeAtom);
  const [draft, setDraft] = useState<DetailFilterDraft>(() => ({
    mentoringProgram: formListSortingType.mentoringProgram,
    firstRoundScoreMin: String(formListSortingType.firstRoundScoreMin ?? ''),
    firstRoundScoreMax: String(formListSortingType.firstRoundScoreMax ?? ''),
    totalScoreMin: String(formListSortingType.totalScoreMin ?? ''),
    totalScoreMax: String(formListSortingType.totalScoreMax ?? ''),
  }));

  const handleScoreChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  };

  const applyDraft = (nextDraft: DetailFilterDraft) => {
    const { mentoringProgram, ...scoreDraft } = nextDraft;
    const scores = Object.fromEntries(
      Object.entries(scoreDraft).map(([key, value]) => [key, toScore(value)]),
    ) as Record<FormListScoreRangeKey, number | null>;
    if (Object.values(scores).some((score) => Number.isNaN(score))) return;

    setFormListType('정렬');
    setFormListSortingType((prev) => ({ ...prev, mentoringProgram, ...scores }));
    onClose();
  };

  const handleResetButtonClick = () => {
    setDraft(EMPTY_DRAFT);
    applyDraft(EMPTY_DRAFT);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') applyDraft(draft);
  };

  return (
    <StyledDetailFilterPanel>
      <FilterRow>
        <FilterLabel>멘토멘티</FilterLabel>
        <Row gap={8}>
          {MENTORING_PROGRAM_OPTIONS.map(({ value, label }) => (
            <OptionButton
              key={label}
              $isSelected={draft.mentoringProgram === value}
              onClick={() => setDraft((prev) => ({ ...prev, mentoringProgram: value }))}
            >
              {label}
            </OptionButton>
          ))}
        </Row>
      </FilterRow>
      <Row gap={48}>
        {SCORE_RANGE_FIELDS.map(({ label, minName, maxName }) => (
          <FilterRow key={label}>
            <FilterLabel>{label}</FilterLabel>
            <Row gap={8} alignItems="center">
              <ScoreInput
                type="number"
                min={0}
                step="any"
                name={minName}
                placeholder="최소"
                value={draft[minName]}
                onChange={handleScoreChange}
                onKeyDown={handleInputKeyDown}
              />
              <Text fontType="p2" color={color.gray400}>
                ~
              </Text>
              <ScoreInput
                type="number"
                min={0}
                step="any"
                name={maxName}
                placeholder="최대"
                value={draft[maxName]}
                onChange={handleScoreChange}
                onKeyDown={handleInputKeyDown}
              />
            </Row>
          </FilterRow>
        ))}
      </Row>
      <Row gap={8} justifyContent="flex-end">
        <Button styleType="SECONDARY" size="SMALL" onClick={handleResetButtonClick}>
          초기화
        </Button>
        <Button size="SMALL" onClick={() => applyDraft(draft)}>
          적용
        </Button>
      </Row>
    </StyledDetailFilterPanel>
  );
};

export default DetailFilterPanel;

const StyledDetailFilterPanel = styled.div`
  ${flex({ flexDirection: 'column' })}
  gap: 20px;
  padding: 24px;
  background-color: ${color.gray100};
  border: 1px solid ${color.gray200};
  border-radius: 12px;
`;

const FilterRow = styled.div`
  ${flex({ alignItems: 'center' })}
  gap: 16px;
`;

const FilterLabel = styled.p`
  ${font.context}
  width: 64px;
  color: ${color.gray700};
`;

const OptionButton = styled.button<{ $isSelected: boolean }>`
  ${font.context}
  height: 36px;
  padding: 0 16px;
  border-radius: 18px;
  cursor: pointer;

  ${(props) =>
    props.$isSelected
      ? css`
          color: ${color.maruDefault};
          background-color: ${color.maruLightBlue};
          border: 1px solid ${color.maruDefault};
        `
      : css`
          color: ${color.gray600};
          background-color: ${color.white};
          border: 1px solid ${color.gray300};
        `}
`;

const ScoreInput = styled.input`
  ${font.p2}
  width: 88px;
  height: 36px;
  padding: 0 12px;
  color: ${color.gray800};
  text-align: center;
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

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;
