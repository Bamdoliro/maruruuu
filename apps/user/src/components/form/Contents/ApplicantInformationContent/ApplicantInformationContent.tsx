import { useFormValueStore } from '@/stores';
import { Column, Input, RadioGroup, Row } from '@maru/ui';
import ProfileUploader from '../../ProfileUploader/ProfileUploader';
import FormController from '../../FormController/FormController';
import { Storage } from '@/apis/storage/storage';
import { useApplicantForm } from './ApplicantInformationContent.hook';

const ApplicantInformationContent = () => {
  const { onFieldChange, handleNextStep, errors } = useApplicantForm();
  const form = useFormValueStore();

  const handlePhotoUpload = (success: boolean, url?: string) => {
    if (success && url) {
      Storage.setItem('isUploadPicture', 'true');
      Storage.setItem('downloadUrl', url);
    }
  };

  return (
    <>
      <Row width="100%" justifyContent="space-between">
        <Column gap={40} alignItems="center">
          <ProfileUploader onPhotoUpload={handlePhotoUpload} />
        </Column>
        <Column gap={30} width={492}>
          <Input
            label="성명"
            value={form.applicant.name}
            onChange={onFieldChange}
            name="name"
            placeholder="예) 홍길동"
            width="100%"
            isError={!!errors.name?.length}
            errorMessage={errors.name ? errors.name[0] : ''}
          />
          <Input
            label="생년월일"
            name="birthday"
            value={form.applicant.birthday}
            onChange={onFieldChange}
            placeholder="예) 20061103"
            width="100%"
            isError={!!errors.birthday?.length}
            errorMessage={errors.birthday ? errors.birthday[0] : ''}
          />
          <Row gap={40} alignItems="flex-end">
            <RadioGroup
              label="성별"
              value={form.applicant.gender}
              onChange={onFieldChange}
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
            onChange={onFieldChange}
            name="phoneNumber"
            placeholder="- 없이 입력해주세요."
            width="100%"
            isError={!!errors.phoneNumber?.length}
            errorMessage={errors.phoneNumber ? errors.phoneNumber[0] : ''}
          />
        </Column>
      </Row>
      <FormController onNext={handleNextStep} step="지원자정보" />
    </>
  );
};

export default ApplicantInformationContent;
