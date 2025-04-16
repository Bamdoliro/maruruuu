import { color } from '@maru/design-system';
import { Text, RadioGroup } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';
import { IconClock, IconCalendar } from '@maru/icon';
import { postFairReq } from '@/services/fair/api';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import FormInput from '@maru/ui/src/Input/FormInput';
import { formatFairRequestBody } from '@/utils/functions/getRequestBody';
import formatDate from '@/utils/functions/formatDate';
import type { FairFormInput } from '@/utils/functions/getRequestBody';
import type { FairType } from '@/types/fair/client';
import {createFairMutation} from '@/services/form/mutations';

const FairForm = () => {
  const [form, setForm] = useState<FairFormInput>({
    start: '',
    place: '',
    capacity: 120,
    applicationStartDate: null,
    applicationEndDate: null,
    type: 'STUDENT_AND_PARENT',
  });
  const [type, setType] = useState<FairType>('STUDENT_AND_PARENT');

  const handleChange = (key: keyof FairFormInput, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCreateFair = () => {
    const requestBody = formatFairRequestBody({
      ...form,
      type,
    });

    createFairMutation.mutate(requestBody);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    if (!date) {
      return;
    }

    const time = form.start.split('T')[1]?.slice(0, 5) || '00:00';
    const formatted = `${formatDate.toDashedDate(date)}T${time}:00`;
    const isValidDate = !isNaN(new Date(formatted).getTime());
    if (isValidDate) {
      setForm((prev) => ({ ...prev, start: formatted }));
    } else {
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (!raw) {
      return;
    }

    const hh = raw.slice(0, 2);
    const mm = raw.slice(2, 4);
    const date = form.start.split('T')[0] || '0000-00-00';
    const formatted = `${date}T${hh}:${mm}:00`;

    const isValidDate = !isNaN(new Date(formatted).getTime());
    if (isValidDate) {
      setForm((prev) => ({ ...prev, start: formatted }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof FairFormInput;
    const value = e.target.value;
    handleChange(name, value);
  };

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as FairType;
    setType(value);
  };

  const mutation = useMutation({
    mutationFn: postFairReq,
  });

  const handleSubmit = () => {
    const body = formatFairRequestBody({
      ...form,
      type,
    });

    mutation.mutate(body);
  };

  return (
    <StyledFairForm>
      <CreateFormSort>
        <Text fontType="context">대상선택</Text>
        <RadioGroup
          name="target"
          value={type}
          onChange={handleTargetChange}
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
          <FormInput placeholder="날짜를 입력해주세요." onChange={handleDateChange} />
          <InputIconWrapper>
            <IconCalendar width={24} height={24} />
          </InputIconWrapper>
        </InputWrapper>
      </CreateFormSort>

      <CreateFormSort>
        <Text fontType="context">시간 (4자리)</Text>
        <InputWrapper>
          <FormInput placeholder="시간을 입력해주세요." onChange={handleTimeChange} />
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
  align-items: center;
`;
