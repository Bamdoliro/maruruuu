import { useNoticeDetailQuery } from '@/services/notice/queries';
import { color, font } from '@maru/design-system';
import { Column, Text } from '@maru/ui';
import { convertLink, flex, formatCreatedAt } from '@maru/utils';
import styled from '@emotion/styled';
import { useNoticeFile } from './NoticeDetailContent.hook';
import DownloadButton from './DownloadButton/DownloadButton';

interface NoticeDetailContentProps {
  id: number;
}

const NoticeDetailContent = ({ id }: NoticeDetailContentProps) => {
  const { data: noticeDetailDta } = useNoticeDetailQuery(id);
  const { handleFileDownload, handleOpenFileWindow } = useNoticeFile();

  return (
    <StyledNoticeDetailContent>
      <NoticeDetailHeader>
        <Text fontType="H3" color={color.gray900}>
          {noticeDetailDta?.title}
        </Text>
        <Text fontType="p2" color={color.gray750}>
          {formatCreatedAt(noticeDetailDta?.updatedAt ?? '')}
        </Text>
      </NoticeDetailHeader>
      <Column gap={36}>
        <Content
          dangerouslySetInnerHTML={{
            __html: convertLink(noticeDetailDta?.content ?? ''),
          }}
        />
        {noticeDetailDta?.fileList?.map((file, index) => {
          const isImage = /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(file.fileName);

          return (
            <div key={index}>
              {isImage ? (
                <ImageWrapper>
                  <Image src={file.downloadUrl} alt={file.fileName} />
                </ImageWrapper>
              ) : (
                <DownloadButton
                  fileName={file.fileName}
                  buttonClick={() => handleFileDownload(file.downloadUrl, file.fileName)}
                  textClick={() => handleOpenFileWindow(file.downloadUrl)}
                />
              )}
            </div>
          );
        })}
      </Column>
    </StyledNoticeDetailContent>
  );
};

export default NoticeDetailContent;

const StyledNoticeDetailContent = styled.div`
  ${flex({ flexDirection: 'column' })}
  gap: 24px;
`;

const NoticeDetailHeader = styled.div`
  ${flex({ flexDirection: 'column' })}
  gap: 16px;
  border-bottom: 1px solid ${color.gray300};
  padding-bottom: 8px;
`;

const Content = styled.div`
  ${font.p2}
  color: ${color.gray900};
`;

const ImageWrapper = styled.div`
  ${flex({ alignItems: 'flex-start' })}
  gap: 12px;
`;

const Image = styled.img`
  width: 50%;
  height: auto;
  object-fit: contain;
  display: block;
`;
