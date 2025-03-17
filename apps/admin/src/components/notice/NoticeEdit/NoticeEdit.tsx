import { useNoticeFileStore } from '@/store/notice/noticeFile';
import { color, font } from '@maru/design-system';
import { IconClip } from '@maru/icon';
import { Button, Column, Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { useOverlay } from '@toss/use-overlay';
import { styled } from 'styled-components';
import NoticeUploadModal from '../NoticeUploadModal/NoticeUploadModal';
import { useNoticeEditAction, useNoticeEditData } from './NoticeEdit.hooks';

interface NoticeEditProps {
  id: number;
}

const NoticeEdit = ({ id }: NoticeEditProps) => {
  const overlay = useOverlay();
  const [fileData, setFileData] = useNoticeFileStore();

  const { noticeData, setNoticeData, contentTextareaRef, handleNoticeDataChange } =
    useNoticeEditData(id);

  const { handleNoticeEditButtonClick } = useNoticeEditAction(id, noticeData);

  const handleNoticeFileModalButtonClick = () => {
    overlay.open(({ isOpen, close }) => (
      <NoticeUploadModal
        isOpen={isOpen}
        onClose={close}
        onFileAttach={(file) => {
          if (file) {
            setNoticeData((prevData) => ({
              ...prevData,
              fileNameList: [...(prevData.fileNameList ?? []), file.name],
            }));
          }
        }}
      />
    ));
  };

  const handleDeleteNoticeFile = (fileNameToDelete: string) => {
    setNoticeData((prevData) => ({
      ...prevData,
      fileNameList: (prevData.fileNameList ?? []).filter(
        (file) => file !== fileNameToDelete
      ),
    }));
    setFileData(fileData?.filter((file) => file.name !== fileNameToDelete) ?? []);
  };

  return (
    <StyledNoticeEdit>
      <NoticeEditHeader>
        <TitleInput
          name="title"
          value={noticeData.title}
          onChange={handleNoticeDataChange}
          placeholder="제목을 입력해주세요"
        ></TitleInput>
        <Row gap="10px">
          <Button
            size="SMALL"
            icon="CLIP_ICON"
            styleType={
              (noticeData.fileNameList ?? []).length >= 3 ? 'DISABLED' : 'SECONDARY'
            }
            width={124}
            onClick={handleNoticeFileModalButtonClick}
            disabled={(noticeData.fileNameList ?? []).length >= 3}
          >
            <Text fontType="btn2">파일 첨부</Text>
          </Button>
          <Button size="SMALL" onClick={handleNoticeEditButtonClick}>
            게시하기
          </Button>
        </Row>
      </NoticeEditHeader>
      <ContentTextarea
        ref={contentTextareaRef}
        name="content"
        value={noticeData.content}
        onChange={handleNoticeDataChange}
        placeholder="내용을 작성해주세요."
        rows={1}
      />
      {(noticeData.fileNameList ?? []).length > 0 && (
        <Column gap={12}>
          {(noticeData.fileNameList ?? []).map((file, index) => (
            <Row alignItems="center" gap={12} key={index}>
              <StyledNoticeFile>
                <Row alignItems="center" gap={10}>
                  <IconClip width={19} height={12} />
                  {file}
                </Row>
              </StyledNoticeFile>
              <DeleteButton onClick={() => handleDeleteNoticeFile(file)}>
                <Text fontType="caption" color={color.red}>
                  [삭제]
                </Text>
              </DeleteButton>
            </Row>
          ))}
        </Column>
      )}
    </StyledNoticeEdit>
  );
};

export default NoticeEdit;

const StyledNoticeEdit = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  gap: 36px;
`;

const NoticeEditHeader = styled.div`
  ${flex({ flexDirection: 'row', justifyContent: 'space-between' })}
  width: 100%;
  gap: 16px;
  border-bottom: 1px solid ${color.gray200};
  padding-bottom: 16px;
`;

const TitleInput = styled.input`
  ${font.H1}
  color: ${color.gray900};
  width: 100%;

  &::placeholder {
    color: ${color.gray400};
  }
`;

const ContentTextarea = styled.textarea`
  ${font.p2};
  color: ${color.gray900};

  &::placeholder {
    color: ${color.gray500};
  }
  resize: none;
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

const DeleteButton = styled.div`
  ${flex({ justifyContent: 'space-between', alignItems: 'center' })};
  cursor: pointer;
`;
