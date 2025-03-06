import { useFormValueStore } from '@/stores';
import { Column, Input, RadioGroup, Row } from '@maru/ui';
import ProfileUploader from '../../ProfileUploader/ProfileUploader';
import FormController from '../../FormController/FormController';
import { useCTAButton, useInput } from './ApplicantInformationContent.hook';

const ApplicantInformationContent = () => {
  const { handleNextStep } = useCTAButton();
  const { handleApplicantInformationChange } = useInput();
  const form = useFormValueStore();

  return (
    <>
      <Row width="100%" justifyContent="space-between">
        <Column gap={40} alignItems="center">
          <ProfileUploader />
        </Column>
        <Column gap={30} width={492}>
          <Input
            label="성명"
            value={form.applicant.name}
            onChange={handleApplicantInformationChange}
            name="name"
            placeholder="예) 홍길동"
            width="100%"
          />
          <Input
            label="생년월일"
            name="birthday"
            value={form.applicant.birthday}
            onChange={handleApplicantInformationChange}
            placeholder="예) 20061103"
            width="100%"
          />
          <Row gap={40} alignItems="flex-end">
            <RadioGroup
              label="성별"
              value={form.applicant.gender}
              onChange={handleApplicantInformationChange}
              name="gender"
              items={[
                { label: '남자', value: 'MALE' },
                { label: '여자', value: 'FEMALE' },
              ]}
            />
          </Row>
          <Input
            label="전화번호"
            value={form.applicant.phoneNumber}
            onChange={handleApplicantInformationChange}
            name="phoneNumber"
            placeholder="- 없이 입력해주세요."
            width="100%"
          />
        </Column>
      </Row>
      <FormController onNext={handleNextStep} step="지원자정보" />
    </>
  );
};

export default ApplicantInformationContent;
