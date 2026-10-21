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
import { Button, Column, Dropdown, Row, SearchInput, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from '@emotion/styled';
import {
  useEditSecondRoundResultActions,
  useExportAllAddmissionTicketAction,
  useExportScoreExcelAction,
  useFormPageState,
  usePrintFormURLActions,
} from './form.hooks';
import { color, font } from '@maru/design-system';
import { useOverlay } from '@toss/use-overlay';
import SecondScoreUploadModal from '@/components/form/SecondScoreUploadModal/SecondScoreUploadModal';
import { useAutoSecondRoundResultMutation } from '@/services/form/mutations';
import ExportExcelModal from '@/components/form/ExportExcelModal/ExportExcelModal';
import DetailFilterPanel from '@/components/form/DetailFilterPanel/DetailFilterPanel';
import { useBooleanState } from '@maru/hooks';
import { css } from '@emotion/react';

const FormPage = () => {
  const {
    formListType,
    schoolSearch,
    handleCriteriaChange,
    handleFormListTypeReview,
    handleFormListTypeAll,
    handleSchoolSearchChange,
    getCriteriaDropdownValue,
    detailFilterCount,
  } = useFormPageState();
  const {
    value: isDetailFilterOpen,
    setFalse: closeDetailFilter,
    toggle: toggleDetailFilter,
  } = useBooleanState();

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
    handleMergeFormPdfButtonClick,
    isMergeFormPdfPending,
  } = usePrintFormURLActions();

  const { handleExportAllAdmissionTicketButtonClick } =
    useExportAllAddmissionTicketAction();
  const { handleExportExcelButtonClick } = useExportScoreExcelAction();
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
  const isReviewList = formListType === '검토해야 하는 원서 모아보기';

  return (
    <AppLayout>
      <StyledFormPage>
        <Text fontType="H1">원서 관리</Text>
        <Column gap={36}>
          <Column gap={16}>
            <Row justifyContent="space-between" alignItems="center" gap={12}>
              <Row gap={8} alignItems="center">
                <SearchInput
                  width={180}
                  placeholder="학교 이름 검색"
                  value={schoolSearch}
                  onChange={(e) => handleSchoolSearchChange(e.target.value)}
                />
                {isReviewList ? (
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
                ) : (
                  <>
                    <Dropdown
                      data={[
                        { value: 'RESET', label: '정렬 초기화' },
                        { value: 'RECEIVED', label: '접수' },
                        { value: 'FIRST_FAILED', label: '1차 불합격' },
                        { value: 'FAILED', label: '불합격' },
                        { value: 'FINAL_SUBMITTED', label: '최종 제출' },
                        { value: 'SUBMITTED', label: '초안 제출' },
                        { value: 'APPROVED', label: '승인' },
                        { value: 'NO_SHOW', label: '불참' },
                        { value: 'FIRST_PASSED', label: '1차 합격' },
                        { value: 'PASSED', label: '최종 합격' },
                        { value: 'REJECTED', label: '반려' },
                        { value: 'ENTERED', label: '입학' },
                      ]}
                      size="SMALL"
                      width={130}
                      placeholder="상태"
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
                      width={130}
                      placeholder="전형"
                      onChange={handleCriteriaChange}
                      value={getCriteriaDropdownValue('type', FORM_TYPE_CATEGORY)}
                      name="type"
                      doubled={5}
                    />
                    <Dropdown
                      data={[
                        { value: 'RESET', label: '정렬 초기화' },
                        { value: 'first-round-score-desc', label: '높은 순' },
                        { value: 'first-round-score-asc', label: '낮은 순' },
                        { value: 'form-id', label: '접수순' },
                      ]}
                      size="SMALL"
                      width={150}
                      placeholder="정렬"
                      onChange={handleCriteriaChange}
                      value={getCriteriaDropdownValue('sort', FORM_SORTING_CATEGORY)}
                      name="sort"
                    />
                  </>
                )}
              </Row>
              <Row gap={8} alignItems="center">
                {!isReviewList && (
                  <DetailFilterButton
                    $isActive={isDetailFilterOpen || detailFilterCount > 0}
                    onClick={toggleDetailFilter}
                  >
                    <IconFilter width={20} height={20} />
                    상세 필터
                    {detailFilterCount > 0 && (
                      <CountBadge>{detailFilterCount}</CountBadge>
                    )}
                  </DetailFilterButton>
                )}
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
                    <Button
                      size="SMALL"
                      onClick={handleMergeFormPdfButtonClick}
                      disabled={isMergeFormPdfPending}
                    >
                      PDF 병합하기
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
                        onClick: autoSecondRoundResult,
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
                      {
                        icon: <IconUpload width={24} height={24} />,
                        label: '과목별 성적 상세 발급하기',
                        value: 'export_all_score_details',
                        onClick: handleExportExcelButtonClick,
                      },
                    ]}
                  />
                )}
              </Row>
            </Row>
            {!isReviewList && isDetailFilterOpen && (
              <DetailFilterPanel onClose={closeDetailFilter} />
            )}
          </Column>
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

const DetailFilterButton = styled.button<{ $isActive: boolean }>`
  ${flex({ alignItems: 'center' })}
  ${font.p2}
  gap: 6px;
  height: 40px;
  padding: 0 14px 0 12px;
  border-radius: 6px;
  cursor: pointer;

  & path {
    fill: currentColor;
  }

  ${(props) =>
    props.$isActive
      ? css`
          color: ${color.maruDefault};
          background-color: ${color.maruLightBlue};
          border: 1px solid ${color.maruDefault};
        `
      : css`
          color: ${color.gray600};
          background-color: ${color.white};
          border: 1px solid ${color.gray400};
        `}
`;

const CountBadge = styled.span`
  ${flex({ alignItems: 'center', justifyContent: 'center' })}
  ${font.caption}
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  color: ${color.white};
  background-color: ${color.maruDefault};
`;

const ReviewFilterBox = styled.div`
  ${flex({ alignItems: 'center' })};
  gap: 12px;
  height: 40px;
  padding: 0 10px 0 8px;
  border-radius: 6px;
  background: ${color.maruLightBlue};
`;
