import { color } from '@maru/design-system';
import { Button, Input, Loader, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from '@emotion/styled';
import { SCHEDULE_FIELDS } from '@/constants/schedule/constant';
import { useScheduleForm } from './ScheduleForm.hooks';

const ScheduleForm = () => {
  const { form, errors, isLoading, isPending, handleChange, handleSubmit } =
    useScheduleForm();

  if (isLoading) return <Loader />;

  return (
    <StyledScheduleForm>
      <StyledFieldGrid>
        {SCHEDULE_FIELDS.map(({ key, label, optional }) => (
          <StyledField key={key}>
            <Text fontType="context" color={color.gray700}>
              {optional ? `${label} (선택)` : label}
              {!optional && <StyledRequiredMark> *</StyledRequiredMark>}
            </Text>
            <StyledInputRow>
              <Input
                width="100%"
                name={`${key}-date`}
                placeholder="yyyy/mm/dd"
                value={form[key].date}
                onChange={(e) => handleChange(key, 'date', e.target.value)}
                isError={Boolean(errors[key])}
              />
              <Input
                width={120}
                name={`${key}-time`}
                placeholder="HH:mm"
                value={form[key].time}
                onChange={(e) => handleChange(key, 'time', e.target.value)}
                isError={Boolean(errors[key])}
              />
            </StyledInputRow>
            {errors[key] && (
              <Text fontType="p3" color={color.red}>
                {errors[key]}
              </Text>
            )}
          </StyledField>
        ))}
      </StyledFieldGrid>
      <Text fontType="p3" color={color.gray600}>
        점검 일정은 비워두면 점검이 설정되지 않습니다.
      </Text>
      <Button size="LARGE" onClick={handleSubmit} disabled={isPending}>
        일정 수정하기
      </Button>
    </StyledScheduleForm>
  );
};

export default ScheduleForm;

const StyledScheduleForm = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'flex-end' })}
  gap: 24px;
  width: 100%;
  max-width: 800px;
  padding: 40px;
  background-color: ${color.gray50};
  border: 1px solid ${color.gray250};
  border-radius: 12px;
`;

const StyledFieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px 32px;
  width: 100%;
`;

const StyledField = styled.div`
  ${flex({ flexDirection: 'column' })}
  gap: 8px;
  min-width: 0;
`;

const StyledInputRow = styled.div`
  ${flex({ alignItems: 'center' })}
  gap: 8px;

  & > :last-of-type {
    flex-shrink: 0;
  }
`;

const StyledRequiredMark = styled.span`
  color: ${color.red};
`;
