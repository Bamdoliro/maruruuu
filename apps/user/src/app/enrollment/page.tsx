'use client';

import { ExplainBox, FileUploader } from '@/components/enrollment';
import { AppLayout } from '@/layouts';
import { color } from '@maru/design-system';
import { Button, Column, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';
import { useOpenFileUploader } from '@/hooks';
import { useFormStatusQuery } from '@/services/form/queries';
import { useEntrollmentDocumentStore } from '@/stores/entrollment/entrollmentDocument';
import { useUploadDocumentMutation } from '@/services/enrollment/mutations';

const Enrollment = () => {
  const { openFileUploader: openPdfFileUploader, ref: pdfFileUploaderRef } =
    useOpenFileUploader();

  const [entrollmentDocument, setEntrollmentDocument] = useEntrollmentDocumentStore();
  const { data: formStatusData } = useFormStatusQuery();
  const { uploadProfileMutate } = useUploadDocumentMutation(
    {
      fileName: entrollmentDocument.fileName ?? '',
      mediaType: entrollmentDocument.mediaType ?? '',
      fileSize: entrollmentDocument.fileSize ?? 0,
    },
    entrollmentDocument.file ?? null
  );

  const onCheckPassFileUploader = () => {
    if (formStatusData?.status !== 'PASSED') {
      alert('최종 합격자만 업로드 가능합니다');
    } else {
      openPdfFileUploader();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setEntrollmentDocument({
      file,
      fileName: file.name,
    });
  };

  const handleSubmitDocument = () => {
    uploadProfileMutate();
  };

  return (
    <AppLayout header footer>
      <StyledEnrollment>
        <Text fontType="H1" color={color.gray900}>
          입학 등록원 제출
        </Text>
        <ExplainBox />
        <Column gap={100}>
          <FileUploader
            onClick={onCheckPassFileUploader}
            onChange={handleFileChange}
            document={entrollmentDocument.fileName ?? ''}
            ref={pdfFileUploaderRef}
          />
          <Button
            size="LARGE"
            styleType={!entrollmentDocument.fileName ? 'DISABLED' : 'PRIMARY'}
            width={111}
            onClick={handleSubmitDocument}
          >
            서류 제출
          </Button>
        </Column>
      </StyledEnrollment>
      <input
        ref={pdfFileUploaderRef}
        onChange={handleFileChange}
        type="file"
        accept=".pdf"
        hidden
      />
    </AppLayout>
  );
};

export default Enrollment;

const StyledEnrollment = styled.div`
  ${flex({ flexDirection: 'column', justifyContent: 'space-between' })}
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 100px 312px 246px;
`;
