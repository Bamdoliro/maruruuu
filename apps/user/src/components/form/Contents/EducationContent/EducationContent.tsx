import { ButtonInput, Column, Input, Row } from '@maru/ui';
import FormController from '../../FormController/FormController';
import { useFormValueStore } from '@/stores';
import { useOverlay } from '@toss/use-overlay';
import FindAddressModal from '../../FindAddressModal/FindAddressModal';
import { useGuardianForm } from '../GuardianInformationContent/GuardianInformationContent.hook';

const GuardianInformationContent = () => {
  const overlay = useOverlay();
  const form = useFormValueStore();
  const { onFieldChange, handleNextStep, handlePreviousStep, errors } = useGuardianForm();

  const openFindAddressModal = () => {
    overlay.open(({ isOpen, close }) => (
      <FindAddressModal isOpen={isOpen} onClose={close} />
    ));
  };

  return (
    <>
      <Column gap={30}>
        <Row gap={48}>
          <Input
            name="name"
            label="성명"
            placeholder="예) 홍길동"
            width="100%"
            value={form.parent.name}
            onChange={onFieldChange}
            isError={!!errors.name?.length}
            errorMessage={errors.name ? errors.name[0] : ''}
          />
          <Input
            name="phoneNumber"
            label="전화번호"
            placeholder="- 없이 입력해주세요."
            width="100%"
            value={form.parent.phoneNumber}
            onChange={onFieldChange}
            isError={!!errors.phoneNumber?.length}
            errorMessage={errors.phoneNumber ? errors.phoneNumber[0] : ''}
          />
        </Row>
        <Input
          label="학생과의 관계"
          name="relation"
          placeholder="예) 부, 모"
          width="calc(50% - 24px)"
          value={form.parent.relation}
          onChange={onFieldChange}
          isError={!!errors.relation?.length}
          errorMessage={errors.relation ? errors.relation[0] : ''}
        />
        <ButtonInput
          label="주소"
          buttonText="검색"
          width="100%"
          value={form.parent.address}
          placeholder="예) 부산광역시 강서구 가락대로 1393 봉림동 15"
          enabled={true}
          readOnly
          onClick={openFindAddressModal}
          isError={!!errors.address?.length}
          errorMessage={errors.address ? errors.address[0] : ''}
        />
        <Row gap={48}>
          <Input
            name="detailAddress"
            label="상세 주소"
            placeholder="상세 주소를 입력해주세요."
            width="100%"
            value={form.parent.detailAddress}
            onChange={onFieldChange}
            isError={!!errors.detailAddress?.length}
            errorMessage={errors.detailAddress ? errors.detailAddress[0] : ''}
          />
          <Input
            name="zoneCode"
            label="우편번호"
            placeholder="주소를 선택하면 자동으로 입력됩니다."
            width="100%"
            readOnly
            value={form.parent.zoneCode}
            onChange={onFieldChange}
          />
        </Row>
      </Column>
      <FormController
        onPrevious={handlePreviousStep}
        onNext={handleNextStep}
        step="보호자정보"
      />
    </>
  );
};

export default GuardianInformationContent;
