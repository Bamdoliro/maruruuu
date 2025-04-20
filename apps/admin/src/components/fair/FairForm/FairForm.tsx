import { color } from '@maru/design-system';
import { Text, RadioGroup } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';
import { IconClock, IconCalendar } from '@maru/icon';
import FormInput from '@maru/ui/src/Input/FormInput';
import type { FairType } from '@/types/fair/client';
import { useFairForm } from '@/components/fair/FairForm/fair.hooks';
import { useFairFormStore } from '@/store/fair/fairType';

const FairForm = () => {
  const [form] = useFairFormStore();

  const {
    handleChange,
    handleInputChange,
    handleDateChange,
    handleTimeChange,
    handleSubmit,
  } = useFairForm();

  return (
    <StyledFairForm>
      <CreateFormSort>
        <Text fontType="context">대상선택</Text>
        <RadioGroup
          name="type"
          value={form.type}
          onChange={(e) => handleChange('type', e.target.value as FairType)}
          items={[
            { label: '학생/학부모', value: 'STUDENT_AND_PARENT' },
            { label: '교사', value: 'TEACHER' },
          ]}
        />
      </CreateFormSort>
      <CreateFormSort>
        <Text fontType="context">장소</Text>
        <FormInput
          placeholder="장소를 입력해주세요."
          name="place"
          value={form.place}
          onChange={handleInputChange}
        />
      </CreateFormSort>
      <CreateFormSort>
        <Text fontType="context">입학 설명회 날짜 (8자리)</Text>
        <InputWrapper>
          <FormInput
            placeholder="날짜를 입력해주세요."
            name="start-date"
            value={form.start.slice(0, 8)}
            onChange={(e) => handleDateChange(e.target.value)}
          />
          <InputIconWrapper>
            <IconCalendar width={24} height={24} />
          </InputIconWrapper>
        </InputWrapper>
      </CreateFormSort>
      <CreateFormSort>
        <Text fontType="context">시간 (4자리)</Text>
        <InputWrapper>
          <FormInput
            placeholder="시간을 입력해주세요."
            name="start-time"
            value={form.start.slice(8)}
            onChange={(e) => handleTimeChange(e.target.value)}
          />
          <InputIconWrapper>
            <IconClock width={24} height={24} />
          </InputIconWrapper>
        </InputWrapper>
      </CreateFormSort>
      <CreateFormSort>
        <Text fontType="context">신청 기한 (8자리)</Text>
        <CreateInputSort>
          <FormInput
            placeholder="시작일"
            name="applicationStartDate"
            value={form.applicationStartDate ?? ''}
            onChange={handleInputChange}
          />
          <FormInput
            placeholder="종료일"
            name="applicationEndDate"
            value={form.applicationEndDate ?? ''}
            onChange={handleInputChange}
          />
        </CreateInputSort>
      </CreateFormSort>
      <CreateFairButton onClick={handleSubmit}>
        <Text fontType="btn1">새로운 입학전형 설명회 생성하기</Text>
      </CreateFairButton>
    </StyledFairForm>
  );
};

export default FairForm;

const StyledFairForm = styled.div`
  width: 500px;
  height: 703px;
  background-color: ${color.gray50};
  border-radius: 12px;
  border: 1px solid ${color.gray250};
  padding: 56px 70px;
  ${flex({ flexDirection: 'column', alignItems: 'center' })};
`;

const CreateFormSort = styled.div`
  ${flex({ flexDirection: 'column' })};
  gap: 8px;
  width: 100%;
  margin-bottom: 24px;
`;

const CreateInputSort = styled.div`
  ${flex({ alignItems: 'center', justifyContent: 'space-between' })};
  gap: 10px;

  & > * {
    flex: 1;
    max-width: 100%;
  }
`;

const CreateFairButton = styled.button`
  background-color: ${color.maruDefault};
  color: ${color.white};
  border-radius: 6px;
  margin-top: 24px;
  padding: 22px;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const InputIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  pointer-events: none;
`;
