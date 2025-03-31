import { ButtonInput, Column, Input, Row } from '@maru/ui';
import FormController from '../../FormController/FormController';
import { useCTAButton, useInput } from './GuardianInformationContent.hook';
import { useFormValueStore } from '@/stores';
import { useOverlay } from '@toss/use-overlay';
import FindAddressModal from '../../FindAddressModal/FindAddressModal';

const GuardianInformationContent = () => {
  const overlay = useOverlay();
  const form = useFormValueStore();
  const { handleNextStep, handlePreviousStep } = useCTAButton();
  const { handleGuardianInformationChange } = useInput();

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
            onChange={handleGuardianInformationChange}
          />
          <Input
            name="phoneNumber"
            label="전화번호"
            placeholder="- 없이 입력해주세요."
            width="100%"
            value={form.parent.phoneNumber}
            onChange={handleGuardianInformationChange}
          />
        </Row>
        <Input
          label="학생과의 관계"
          name="relation"
          placeholder="예) 부, 모"
          width="calc(50% - 24px)"
          value={form.parent.relation}
          onChange={handleGuardianInformationChange}
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
        />
        <Row gap={48}>
          <Input
            name="detailAddress"
            label="상세 주소"
            placeholder="상세 주소를 입력해주세요."
            width="100%"
            value={form.parent.detailAddress}
            onChange={handleGuardianInformationChange}
          />
          <Input
            name="zoneCode"
            label="우편번호"
            placeholder="주소를 선택하면 자동으로 입력됩니다."
            width="100%"
            readOnly
            value={form.parent.zoneCode}
            onChange={handleGuardianInformationChange}
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
