import type { GradeDistributionType } from '@/types/analysis/client';
import { font } from '@maru/design-system';
import { Column, Row, Td } from '@maru/ui';
import styled from 'styled-components';
import useMaxMinByType from './DetailContent.hooks';
import DetailHeader from '../DetailHeader/DetailHeader';
import { EMPTY_VALUE } from '@/constants/common/constant';

type DetailTableProps = { formList: GradeDistributionType[] | undefined };

const DetailContent = ({ formList }: DetailTableProps) => {
  const {
    regularApplicant,
    meisterTalentApplicant,
    nationalBasicLivingApplicant,
    nearPovertyApplicant,
    nationalVeteransApplicant,
    oneParentApplicant,
    fromNorthKoreaApplicant,
    multiculturalApplicant,
    teenHouseholderApplicant,
    multiChildrenApplicant,
    farmingAndFishingApplicant,
    specialAdmissionApplicant,
    nationalVeteransEducationApplicant,
  } = useMaxMinByType(formList);
  return (
    <StyledDetailTable>
      <Column>
        <DetailHeader />
        <Row>
          <Td width={140} height={44} styleType="ANALYSIS">
            일반 전형
          </Td>
          <Td width={160} height={44} styleType="ANALYSIS">
            일반 전형
          </Td>
          <Td width={160} height={44} styleType="ANALYSIS">
            {EMPTY_VALUE}
          </Td>
          <Td width={80} height={44} styleType="ANALYSIS">
            {regularApplicant.max}
          </Td>
          <Td width={80} height={44} styleType="ANALYSIS">
            {regularApplicant.min}
          </Td>
        </Row>
        <Row>
          <Td width={140} height={440} styleType="ANALYSIS">
            특별 전형
          </Td>
          <Column>
            <Row>
              <Td width={160} height={44} styleType="ANALYSIS">
                마이스터 인재전형
              </Td>
              <Td width={160} height={44} styleType="ANALYSIS">
                {EMPTY_VALUE}
              </Td>
              <Td width={80} height={44} styleType="ANALYSIS">
                {meisterTalentApplicant.max}
              </Td>
              <Td width={80} height={44} styleType="ANALYSIS">
                {meisterTalentApplicant.min}
              </Td>
            </Row>
            <Row>
              <Td width={160} height={220} styleType="ANALYSIS">
                기회균등 전형
              </Td>
              <Column>
                <Row>
                  <Td width={160} height={44} styleType="ANALYSIS">
                    국민기초생활수급자
                  </Td>
                  <Td width={80} height={44} styleType="ANALYSIS">
                    {nationalBasicLivingApplicant.max}
                  </Td>
                  <Td width={80} height={44} styleType="ANALYSIS">
                    {nationalBasicLivingApplicant.min}
                  </Td>
                </Row>
                <Row>
                  <Td width={160} height={44} styleType="ANALYSIS">
                    차상위계층
                  </Td>
                  <Td width={80} height={44} styleType="ANALYSIS">
                    {nearPovertyApplicant.max}
                  </Td>
                  <Td width={80} height={44} styleType="ANALYSIS">
                    {nearPovertyApplicant.min}
                  </Td>
                </Row>
                <Row>
                  <Td width={160} height={44} styleType="ANALYSIS">
                    국가보훈대상자
                    <br />
                    (국가유공자)
                  </Td>
                  <Td width={80} height={44} styleType="ANALYSIS">
                    {nationalVeteransApplicant.max}
                  </Td>
                  <Td width={80} height={44} styleType="ANALYSIS">
                    {nationalVeteransApplicant.min}
                  </Td>
                </Row>
                <Row>
                  <Td width={160} height={44} styleType="ANALYSIS">
                    한부모가정보호대상자
                  </Td>
                  <Td width={80} height={44} styleType="ANALYSIS">
                    {oneParentApplicant.max}
                  </Td>
                  <Td width={80} height={44} styleType="ANALYSIS">
                    {oneParentApplicant.min}
                  </Td>
                </Row>
                <Row>
                  <Td width={160} height={44} styleType="ANALYSIS">
                    북한이탈주민
                    <br />
                    또는 그 자녀
                  </Td>
                  <Td width={80} height={44} styleType="ANALYSIS">
                    {fromNorthKoreaApplicant.max}
                  </Td>
                  <Td width={80} height={44} styleType="ANALYSIS">
                    {fromNorthKoreaApplicant.min}
                  </Td>
                </Row>
              </Column>
            </Row>
            <Row>
              <Td width={160} height={176} styleType="ANALYSIS">
                사회다양성 전형
              </Td>
              <Column>
                <Row>
                  <Td width={160} height={44} styleType="ANALYSIS">
                    다문화가정 자녀
                  </Td>
                  <Td width={80} height={44} styleType="ANALYSIS">
                    {multiculturalApplicant.max}
                  </Td>
                  <Td width={80} height={44} styleType="ANALYSIS">
                    {multiculturalApplicant.min}
                  </Td>
                </Row>
                <Row>
                  <Td width={160} height={44} styleType="ANALYSIS">
                    소년 · 소녀가장
                  </Td>
                  <Td width={80} height={44} styleType="ANALYSIS">
                    {teenHouseholderApplicant.max}
                  </Td>
                  <Td width={80} height={44} styleType="ANALYSIS">
                    {teenHouseholderApplicant.min}
                  </Td>
                </Row>
                <Row>
                  <Td width={160} height={44} styleType="ANALYSIS">
                    다자녀 가정 자녀
                  </Td>
                  <Td width={80} height={44} styleType="ANALYSIS">
                    {multiChildrenApplicant.max}
                  </Td>
                  <Td width={80} height={44} styleType="ANALYSIS">
                    {multiChildrenApplicant.min}
                  </Td>
                </Row>
                <Row>
                  <Td width={160} height={44} styleType="ANALYSIS">
                    농어촌지역출신자
                  </Td>
                  <Td width={80} height={44} styleType="ANALYSIS">
                    {farmingAndFishingApplicant.max}
                  </Td>
                  <Td width={80} height={44} styleType="ANALYSIS">
                    {farmingAndFishingApplicant.min}
                  </Td>
                </Row>
              </Column>
            </Row>
          </Column>
        </Row>
      </Column>
      <Row>
        <Td width={140} height={88} borderBottomLeftRadius={12} styleType="ANALYSIS">
          정원 외 전형
        </Td>
        <Column>
          <Row>
            <Td width={160} height={44} styleType="ANALYSIS">
              국가보훈대상자 중
              <br />
              교육지원대상자
            </Td>
            <Td width={160} height={44} styleType="ANALYSIS">
              {EMPTY_VALUE}
            </Td>
            <Td width={80} height={44} styleType="ANALYSIS">
              {nationalVeteransEducationApplicant.max}
            </Td>
            <Td width={80} height={44} styleType="ANALYSIS">
              {nationalVeteransEducationApplicant.min}
            </Td>
          </Row>
          <Row>
            <Td width={160} height={44} styleType="ANALYSIS">
              특례입학 대상자
            </Td>
            <Td width={160} height={44} styleType="ANALYSIS">
              {EMPTY_VALUE}
            </Td>
            <Td width={80} height={44} styleType="ANALYSIS">
              {specialAdmissionApplicant.max}
            </Td>
            <Td width={80} height={44} borderBottomRightRadius={12} styleType="ANALYSIS">
              {specialAdmissionApplicant.min}
            </Td>
          </Row>
        </Column>
      </Row>
    </StyledDetailTable>
  );
};

export default DetailContent;

const StyledDetailTable = styled.div`
  ${font.H2}
  text-align: center;
`;
