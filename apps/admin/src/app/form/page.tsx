'use client';

import { FunctionDropdown } from '@/components/common';
import AppLayout from '@/layouts/AppLayout';
import {
  IconAdmission,
  IconCheckDocument,
  IconEditAllDocument,
  IconEditDocument,
  IconPrint,
  IconUpload,
} from '@maru/icon';
import { Dropdown, Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';

const FormPage = () => {
  return (
    <AppLayout>
      <StyledFormPage>
        <Text fontType="H1">원서 관리</Text>
        <Row justifyContent="space-between">
          <Row gap={12}>
            <Dropdown
              data={[
                { value: 'RESET', label: '정렬 초기화' },
                { value: 'APPROVED', label: '접수' },
                { value: 'FIRST_FAILED', label: '1차 불합격' },
                { value: 'FAILED', label: '불합격' },
                { value: 'FINAL_SUBMITTED', label: '최종 제출' },
                { value: 'SUBMITTED', label: '제출' },
                { value: 'RECEIVED', label: '승인' },
                { value: 'NO_SHOW', label: '불참' },
                { value: 'FIRST_PASSED', label: '1차 합격' },
                { value: 'PASSED', label: '최종 합격' },
                { value: 'REJECTED', label: '반려' },
              ]}
              size="SMALL"
              width={160}
              placeholder="상태 별"
              onChange={() => {}}
              name="statusSort"
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
              onChange={() => {}}
              name="typeSort"
              doubled={5}
            />
            <Dropdown
              data={[
                { value: 'RESET', label: '정렬 초기화' },
                { value: 'SCORE_DESC', label: '높은 순' },
                { value: 'SCORE_ASC', label: '낮은 순' },
                { value: 'FORM_ID', label: '접수순' },
              ]}
              size="SMALL"
              width={160}
              placeholder="최종 점수"
              onChange={() => {}}
              name="formSort"
            />
          </Row>
          <FunctionDropdown
            data={[
              {
                icon: <IconCheckDocument width={24} height={24} />,
                label: '검토해야하는 원서 모아보기',
                value: 'review_applications',
                onClick: () => {},
              },
              {
                icon: <IconEditDocument width={24} height={24} />,
                label: '2차 전형 점수 입력하기',
                value: 'input_second_round_scores',
                onClick: () => {},
              },
              {
                icon: <IconEditDocument width={24} height={24} />,
                label: '2차 합격 여부 변경하기',
                value: 'update_second_round_result',
                onClick: () => {},
              },
              {
                icon: <IconEditAllDocument width={24} height={24} />,
                label: '2차 합격자 자동 선발',
                value: 'auto_select_second_round',
                onClick: () => {},
              },
              {
                icon: <IconUpload width={24} height={24} />,
                label: '명단 엑셀로 내보내기',
                value: 'export_excel',
                onClick: () => {},
              },
              {
                icon: <IconPrint width={24} height={24} />,
                label: '원서 출력하기',
                value: 'print_applications',
                onClick: () => {},
              },
              {
                icon: <IconAdmission width={24} height={24} />,
                label: '수험표 전체 발급하기',
                value: 'generate_all_exam_tickets',
                onClick: () => {},
              },
            ]}
          />
        </Row>
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
