import { ROUTES } from '@/constants/common/constant';
import { color, font } from '@maru/design-system';
import { Button, Column, Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { useRouter } from 'next/navigation';
import { styled } from 'styled-components';
import { useFaqDetailQuery } from '@/services/faq/queries';
import { FAQ_CATEGORY } from '@/constants/faq/constant';
import { useFaqDeleteAction } from './faqDetail.hooks';
import { formatDate } from '@/utils';

interface FaqDetailProps {
  id: number;
}

const FaqDetail = ({ id }: FaqDetailProps) => {
  const router = useRouter();
  const { data: faqDetailData } = useFaqDetailQuery(id);
  const { handleDeleteFaqButtonClick } = useFaqDeleteAction(id);

  const handleMoveFaqEditPage = () => {
    router.push(`${ROUTES.FAQ_EDIT}/${id}`);
  };

  return faqDetailData ? (
    <StyledFaqDetail>
      <FaqDetailHeader>
        <Column gap={20}>
          <Text fontType="H1" color={color.gray900} whiteSpace='break-spaces'>
            {faqDetailData.title}
          </Text>
          <Row gap={16} alignItems="center">
            <Text fontType="context" color={color.maruDefault}>
              {FAQ_CATEGORY[faqDetailData.category]}
            </Text>
            <Text fontType="p2" color={color.gray600}>
              {formatDate.toFullDateTime(faqDetailData.createdAt)}
            </Text>
          </Row>
        </Column>
        <Row gap={16} alignItems="flex-end">
          <Button
            styleType="SECONDARY"
            size="SMALL"
            width={60}
            onClick={handleMoveFaqEditPage}
          >
            수정
          </Button>
          <Button
            styleType="DELETE"
            size="SMALL"
            width={60}
            onClick={handleDeleteFaqButtonClick}
          >
            삭제
          </Button>
        </Row>
      </FaqDetailHeader>
      <Text fontType='p2' color={color.gray900} whiteSpace='break-spaces'>{faqDetailData.content}</Text>
    </StyledFaqDetail>
  ) : null;
};

export default FaqDetail;

const StyledFaqDetail = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  gap: 36px;
`;

const FaqDetailHeader = styled.div`
  ${flex({ justifyContent: 'space-between' })}
  width: 100%;
  gap: 16px;
  border-bottom: 1px solid ${color.gray300};
  padding-bottom: 16px;
`;
