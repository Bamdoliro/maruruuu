import { styled } from 'styled-components';
import FormController from '../../FormController/FormController';
import { ButtonInput, Column, Input, RadioGroup, Row } from '@maru/ui';
import { useFormValueStore } from '@/stores';
import { useCTAButton, useInput } from './EducationContent.hook';
import { useOverlay } from '@toss/use-overlay';
import FindSchoolModal from '../../FindSchoolModal/FindSchoolModal';
import { flex } from '@maru/utils';

const EducationContent = () => {
  const overlay = useOverlay();
  const form = useFormValueStore();
  const { handleNextStep, handlePreviousStep } = useCTAButton();
  const { handleEducationChange } = useInput();

  const openFindSchoolModal = () => {
    overlay.open(({ isOpen, close }) => (
      <FindSchoolModal isOpen={isOpen} onClose={close} />
    ));
  };

  return (
    <StyledEducationContent>
      <Column width="100%" gap={30}>
        <RadioGroup
          label="졸업 구분"
          name="graduationType"
          items={[
            { value: 'EXPECTED', label: '졸업 예정' },
            { value: 'GRADUATED', label: '졸업' },
            { value: 'QUALIFICATION_EXAMINATION', label: '고입 검정' },
          ]}
          value={form.education.graduationType}
          onChange={handleEducationChange}
        />
        <Row gap={48} alignItems="center">
          {form.education.graduationType !== 'QUALIFICATION_EXAMINATION' && (
            <ButtonInput
              name="schoolName"
              label="출신학교"
              value={form.education.schoolName ?? ''}
              buttonText="검색"
              onClick={openFindSchoolModal}
              placeholder="검색 버튼을 눌러 학교를 검색하세요."
              readOnly
              enabled={true}
            />
          )}
          {form.education.graduationType !== 'QUALIFICATION_EXAMINATION' && (
            <Input
              name="schoolAddress"
              label="도로명주소"
              placeholder="학교를 선택하면 자동완성됩니다."
              width="100%"
              readOnly
              value={form.education.schoolAddress ?? ''}
              onChange={handleEducationChange}
            />
          )}
        </Row>
        <Row gap={48} alignItems="center">
          <Input
            name="graduationYear"
            label={
              form.education.graduationType === 'QUALIFICATION_EXAMINATION'
                ? '합격연도'
                : '졸업(예정)연도'
            }
            placeholder="예) 2024"
            width={
              form.education.graduationType === 'QUALIFICATION_EXAMINATION'
                ? '50%'
                : '100%'
            }
            onChange={handleEducationChange}
          />
          {form.education.graduationType !== 'QUALIFICATION_EXAMINATION' && (
            <Input
              name="schoolLocation"
              label="지역"
              placeholder="학교를 선택하면 자동완성됩니다."
              readOnly
              width="100%"
              value={form.education.schoolLocation ?? ''}
              onChange={handleEducationChange}
            />
          )}
        </Row>
        <Row gap={48} alignItems="center">
          {form.education.graduationType !== 'QUALIFICATION_EXAMINATION' && (
            <Input
              name="schoolCode"
              label="표준 학교 코드"
              placeholder="학교를 선택하면 자동완성됩니다."
              readOnly
              width="100%"
              value={form.education.schoolCode ?? ''}
              onChange={handleEducationChange}
            />
          )}
          {form.education.graduationType !== 'QUALIFICATION_EXAMINATION' && (
            <Input
              name="teacherPhoneNumber"
              label="학교 대표 연락처"
              placeholder="학교의 교무실 연락처를 입력해주세요."
              width="100%"
              value={form.education.teacherPhoneNumber ?? ''}
              onChange={handleEducationChange}
            />
          )}
        </Row>
        <Row gap={48} alignItems="center">
          {form.education.graduationType !== 'QUALIFICATION_EXAMINATION' && (
            <Input
              name="teacherName"
              label="작성 교사 이름"
              placeholder="예) 홍길동"
              width="100%"
              value={form.education.teacherName ?? ''}
              onChange={handleEducationChange}
            />
          )}
          {form.education.graduationType !== 'QUALIFICATION_EXAMINATION' && (
            <Input
              name="teacherMobilePhoneNumber"
              label="작성 교사 연락처(휴대전화)"
              placeholder="- 없이 입력해 주세요"
              width="100%"
              value={form.education.teacherMobilePhoneNumber ?? ''}
              onChange={handleEducationChange}
            />
          )}
        </Row>
      </Column>
      <FormController
        onPrevious={handlePreviousStep}
        onNext={handleNextStep}
        step="출신학교및학력"
      />
    </StyledEducationContent>
  );
};

export default EducationContent;

const StyledEducationContent = styled.div`
  ${flex({ flexDirection: 'column', justifyContent: 'space-between' })}
  width: 100%;
  height: 100%;
`;
