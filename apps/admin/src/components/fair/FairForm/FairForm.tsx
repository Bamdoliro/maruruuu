import { color } from '@maru/design-system';
import { Text, RadioGroup } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';
import { IconClock, IconCalendar } from '@maru/icon';
import FormInput from '@maru/ui/src/Input/FormInput';
import { useState } from 'react';
import { formatFairRequestBody } from '@/utils/functions/getRequestBody';
import type { FairFormInput } from '@/utils/functions/getRequestBody';
import type { FairType } from '@/types/fair/client';
import { useCreateFairMutation } from '@/services/form/mutations';

const FairForm = () => {
  const createFairMutation = useCreateFairMutation();

  const [form, setForm] = useState<FairFormInput>({
    start: '',
    place: '',
    capacity: 120,
    applicationStartDate: null,
    applicationEndDate: null,
    type: 'STUDENT_AND_PARENT',
  });

  const handleChange = (key: keyof FairFormInput, value: any) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange(name as keyof FairFormInput, value);
  };

  const handleSubmit = () => {
    const body = formatFairRequestBody(form);
    createFairMutation.mutate(body);
  };

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
        <Text fontType="context">입학 설명회 날짜 및 시간 (YYYYMMDDHHmm)</Text>
        <InputWrapper>
          <FormInput
            placeholder="202504161300"
            name="start"
            value={form.start}
            onChange={handleInputChange}
          />
          <InputIconWrapper>
            <IconCalendar width={24} height={24} />
            <IconClock width={24} height={24} />
          </InputIconWrapper>
        </InputWrapper>
      </CreateFormSort>

      <CreateFormSort>
        <Text fontType="context">신청 기한 (8자리)</Text>
        <CreateInputSort>
          <FormInput
            placeholder="시작일 (YYYYMMDD)"
            name="applicationStartDate"
            value={form.applicationStartDate ?? ''}
            onChange={handleInputChange}
          />
          <FormInput
            placeholder="종료일 (YYYYMMDD)"
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
  display: flex;
  ${flex({ flexDirection: 'column' })};
  gap: 8px;
  width: 100%;
  margin-bottom: 24px;
`;

const CreateFairButton = styled.button`
  background-color: ${color.maruDefault};
  color: ${color.white};
  border-radius: 6px;
  margin-top: 24px;
  padding: 22px;
`;

const CreateInputSort = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
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
  gap: 4px;
  align-items: center;
`;
