import { ROUTES } from '@/constants/common/constant';
import { useNoticeDetailQuery } from '@/services/notice/queries';
import { color, font } from '@maru/design-system';
import { IconClip } from '@maru/icon';
import { Button, Column, Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { useRouter } from 'next/navigation';
import { styled } from 'styled-components';
import { useNoticeDeleteAction, handleFileDownload } from './noticeDetail.hooks';
import { formatDate } from '@/utils';

interface NoticeDetailProps {
  id: number;
}

const NoticeDetail = ({ id }: NoticeDetailProps) => {
  const router = useRouter();
  const { data: noticeDetailData } = useNoticeDetailQuery(id);
  const { handleDeleteNoticeButtonClick } = useNoticeDeleteAction(id);

  const handleMoveNoticeEditPage = () => {
    router.push(`${ROUTES.NOTICE_EDIT}/${id}`);
  };

  return noticeDetailData ? (
    <StyledNoticeDetail>
      <NoticeDetailHeader>
        <Column gap={20}>
          <Text fontType="H1" color={color.gray900}>
            {noticeDetailData.title}
          </Text>
          <Text fontType="p2" color={color.gray600}>
            {formatDate.toFullDateTime(
              noticeDetailData.updatedAt ?? noticeDetailData.createdAt
            )}
          </Text>
        </Column>
        <Row gap={16} alignItems="flex-end">
          <Button
            styleType="SECONDARY"
            size="SMALL"
            width={60}
            onClick={handleMoveNoticeEditPage}
          >
            수정
          </Button>
          <Button
            styleType="DELETE"
            size="SMALL"
            width={60}
            onClick={handleDeleteNoticeButtonClick}
          >
            삭제
          </Button>
        </Row>
      </NoticeDetailHeader>
      <Content>{noticeDetailData.content}</Content>
      {noticeDetailData.fileList && (
        <Column gap={12}>
          {noticeDetailData.fileList.map((file, index) => (
            <Row alignItems="center" gap={12} key={index}>
              <StyledNoticeFile
                key={index}
                onClick={() => handleFileDownload(file.downloadUrl, file.fileName)}
              >
                <Row alignItems="center" gap={10}>
                  <IconClip width={19} height={12} />
                  {file.fileName}
                </Row>
              </StyledNoticeFile>
            </Row>
          ))}
        </Column>
      )}
    </StyledNoticeDetail>
  ) : null;
};

export default NoticeDetail;

const StyledNoticeDetail = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  gap: 36px;
`;

const NoticeDetailHeader = styled.div`
  ${flex({ justifyContent: 'space-between' })}
  width: 100%;
  gap: 16px;
  border-bottom: 1px solid ${color.gray300};
  padding-bottom: 16px;
`;

const Content = styled.div`
  ${font.p2};
  color: ${color.gray900};
`;

const StyledNoticeFile = styled.div`
  ${flex({ justifyContent: 'space-between', alignItems: 'center' })};
  gap: 12px;
  height: 36px;
  padding: 0 15px 0 15px;
  border-radius: 999px;
  background: ${color.gray200};
  width: auto;
  min-width: fit-content;
  max-width: fit-content;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;

  &:hover {
    background-color: ${color.gray300};
  }
`;
