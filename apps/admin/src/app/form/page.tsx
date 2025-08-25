'use client';

import { FunctionDropdown } from '@/components/common';
import FormTable from '@/components/form/FormTable/FormTable';
import {
  FORM_SORTING_CATEGORY,
  FORM_STATUS_CATEGORY,
  FORM_TYPE_CATEGORY,
} from '@/constants/form/constant';
import AppLayout from '@/layouts/AppLayout';
import {
  IconAdmission,
  IconCheckDocument,
  IconClose,
  IconEditAllDocument,
  IconEditDocument,
  IconFilter,
  IconPrint,
  IconUpload,
} from '@maru/icon';
import { Button, Column, Dropdown, Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';
import {
  useEditSecondRoundResultActions,
  useExportAllAddmissionTicketAction,
  useFormPageState,
  usePrintFormURLActions,
} from './form.hooks';
import { color } from '@maru/design-system';
import { useOverlay } from '@toss/use-overlay';
import SecondScoreUploadModal from '@/components/form/SecondScoreUploadModal/SecondScoreUploadModal';
import { useAutoSecondRoundResultMutation } from '@/services/form/mutations';
import ExportExcelModal from '@/components/form/ExportExcelModal/ExportExcelModal';

const FormPage = () => {
  const {
    formListType,
    handleCriteriaChange,
    handleFormListTypeReview,
    handleFormListTypeAll,
    getCriteriaDropdownValue,
  } = useFormPageState();

  const {
    isSecondRoundResultEditing,
    setIsSecondRoundResultEditingTrue,
    setIsSecondRoundResultEditingFalse,
    handleSecondRoundResultEditCompleteButtonClick,
  } = useEditSecondRoundResultActions();

  const {
    isFormToPrintSelecting,
    setIsFormToPrintSelectingTrue,
    setIsFormToPrintSelectingFalse,
    handlePrintFormUrlButtonClick,
  } = usePrintFormURLActions();

  const { handleExportAllAdmissionTicketButtonClick } =
    useExportAllAddmissionTicketAction();

  const overlay = useOverlay();

  const openSecondScoreUplaodModal = () => {
    overlay.open(({ isOpen, close }) => (
      <SecondScoreUploadModal isOpen={isOpen} onClose={close} />
    ));
  };

  const openExportExcelModal = () => {
    overlay.open(({ isOpen, close }) => (
      <ExportExcelModal isOpen={isOpen} onClose={close} />
    ));
  };

  const { autoSecondRoundResult } = useAutoSecondRoundResultMutation();

  const handleAutoSecondRoundResult = () => {
    autoSecondRoundResult();
  };

  return (
    <AppLayout>
      <StyledFormPage>
        <Text fontType="H1">원서 관리</Text>
        <Column gap={36}>
          <Row justifyContent="space-between">
            {formListType !== '검토해야 하는 원서 모아보기' ? (
              <Row gap={12}>
                <Dropdown
                  data={[
                    { value: 'RESET', label: '정렬 초기화' },
                    { value: 'RECEIVED', label: '접수' },
                    { value: 'FIRST_FAILED', label: '1차 불합격' },
                    { value: 'FAILED', label: '불합격' },
                    { value: 'FINAL_SUBMITTED', label: '최종 제출' },
                    { value: 'SUBMITTED', label: '제출' },
                    { value: 'APPROVED', label: '승인' },
                    { value: 'NO_SHOW', label: '불참' },
                    { value: 'FIRST_PASSED', label: '1차 합격' },
                    { value: 'PASSED', label: '최종 합격' },
                    { value: 'REJECTED', label: '반려' },
                    { value: 'ENTERED', label: '입학' },
                  ]}
                  size="SMALL"
                  width={160}
                  placeholder="상태 별"
                  onChange={handleCriteriaChange}
                  value={getCriteriaDropdownValue('status', FORM_STATUS_CATEGORY)}
                  name="status"
                  doubled={5}
                />
                <Dropdown
                  data={[
                    { value: 'RESET', label: '정렬 초기화' },
                    { value: 'REGULAR', label: '일반전형' },
                    { value: 'MEISTER_TALENT', label: '마이스터인재전형' },
                    { value: 'NATIONAL_BASIC_LIVING', label: '국가기초생활수급권자' },
                    {
                      value: 'NATIONAL_VETERANS_EDUCATION',
                      label: '국가보훈대상자 중 교육지원대상자녀',
                    },
                    { value: 'NEAR_POVERTY', label: '차상위계층' },
                    { value: 'NATIONAL_VETERANS', label: '국가보훈자녀' },
                    { value: 'ONE_PARENT', label: '한부모가정' },
                    { value: 'FROM_NORTH_KOREA', label: '북한이탈주민' },
                    { value: 'MULTICULTURAL', label: '다문화가정' },
                    { value: 'TEEN_HOUSEHOLDER', label: '소년소녀가장' },
                    { value: 'MULTI_CHILDREN', label: '다자녀가정자녀' },
                    { value: 'FARMING_AND_FISHING', label: '농어촌지역출신자' },
                    { value: 'SPECIAL_ADMISSION', label: '특례입학대상자' },
                  ]}
                  size="SMALL"
                  width={160}
                  placeholder="전형 별"
                  onChange={handleCriteriaChange}
                  value={getCriteriaDropdownValue('type', FORM_TYPE_CATEGORY)}
                  name="type"
                  doubled={5}
                />
                <Dropdown
                  data={[
                    { value: 'RESET', label: '정렬 초기화' },
                    { value: 'total-score-desc', label: '높은 순' },
                    { value: 'total-score-asc', label: '낮은 순' },
                    { value: 'form-id', label: '접수순' },
                  ]}
                  size="SMALL"
                  width={160}
                  placeholder="최종 점수"
                  onChange={handleCriteriaChange}
                  value={getCriteriaDropdownValue('sort', FORM_SORTING_CATEGORY)}
                  name="sort"
                />
              </Row>
            ) : (
              <div />
            )}
            <Row gap={16}>
              {formListType === '검토해야 하는 원서 모아보기' ? (
                <ReviewFilterBox>
                  <Row alignItems="center" gap={4}>
                    <IconFilter width={24} height={24} />
                    <Text fontType="context" color={color.maruDefault}>
                      검토해야 하는 원서
                    </Text>
                  </Row>
                  <IconClose
                    width={18}
                    height={18}
                    color={color.maruDefault}
                    cursor="pointer"
                    onClick={handleFormListTypeAll}
                  />
                </ReviewFilterBox>
              ) : null}
              {isSecondRoundResultEditing ? (
                <Row gap={16}>
                  <Button
                    styleType="SECONDARY"
                    size="SMALL"
                    onClick={setIsSecondRoundResultEditingFalse}
                  >
                    취소
                  </Button>
                  <Button
                    size="SMALL"
                    onClick={handleSecondRoundResultEditCompleteButtonClick}
                  >
                    완료
                  </Button>
                </Row>
              ) : isFormToPrintSelecting ? (
                <Row gap={16}>
                  <Button
                    styleType="SECONDARY"
                    size="SMALL"
                    onClick={setIsFormToPrintSelectingFalse}
                  >
                    취소
                  </Button>
                  <Button size="SMALL" onClick={handlePrintFormUrlButtonClick}>
                    출력하기
                  </Button>
                </Row>
              ) : (
                <FunctionDropdown
                  data={[
                    {
                      icon: <IconCheckDocument width={24} height={24} />,
                      label: '검토해야하는 원서 모아보기',
                      value: 'review_applications',
                      onClick: handleFormListTypeReview,
                    },
                    {
                      icon: <IconEditDocument width={24} height={24} />,
                      label: '2차 전형 점수 입력하기',
                      value: 'input_second_round_scores',
                      onClick: openSecondScoreUplaodModal,
                    },
                    {
                      icon: <IconEditDocument width={24} height={24} />,
                      label: '2차 합격 여부 변경하기',
                      value: 'update_second_round_result',
                      onClick: setIsSecondRoundResultEditingTrue,
                    },
                    {
                      icon: <IconEditAllDocument width={24} height={24} />,
                      label: '2차 합격자 자동 선발',
                      value: 'auto_select_second_round',
                      onClick: handleAutoSecondRoundResult,
                    },
                    {
                      icon: <IconUpload width={24} height={24} />,
                      label: '명단 엑셀로 내보내기',
                      value: 'export_excel',
                      onClick: openExportExcelModal,
                    },
                    {
                      icon: <IconPrint width={24} height={24} />,
                      label: '원서 출력하기',
                      value: 'print_applications',
                      onClick: setIsFormToPrintSelectingTrue,
                    },
                    {
                      icon: <IconAdmission width={24} height={24} />,
                      label: '수험표 전체 발급하기',
                      value: 'export_all_exam_tickets',
                      onClick: handleExportAllAdmissionTicketButtonClick,
                    },
                  ]}
                />
              )}
            </Row>
          </Row>
          <FormTable />
        </Column>
      </StyledFormPage>
    </AppLayout>
  );
};
export default FormPage;

const StyledFormPage = styled.div`
  ${flex({ flexDirection: 'column' })}
  gap: 40px;
  width: 100%;
  min-height: 100vh;
  padding: 64px 60px;
`;

const ReviewFilterBox = styled.div`
  ${flex({ alignItems: 'center' })};
  gap: 12px;
  height: 40px;
  padding: 0 10px 0 8px;
  border-radius: 6px;
  background: ${color.maruLightBlue};
`;
