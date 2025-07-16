'use client';

import { EnrollmentLoader, ExplainBox, FileUploader } from '@/components/enrollment';
import { AppLayout } from '@/layouts';
import { color } from '@maru/design-system';
import { Button, Column, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';
import {
  useChangeStatusButton,
  useFileUpload,
  useFormStatusCheck,
} from './enrollment.hook';
import { useEntrollmentDocumentValueStore } from '@/stores';
import { useBooleanState } from '@maru/hooks';
import { useOpenFileUploader } from '@/hooks';

const Enrollment = () => {
  const { setTrue: openPdfGeneratedLoader, setFalse: closePdfGeneratedLoader } =
    useBooleanState();
  const { openFileUploader: openPdfFileUploader, ref: pdfFileUploaderRef } =
    useOpenFileUploader();

  const entrollmentDocument = useEntrollmentDocumentValueStore();
  const { handleChangeStatusButtonClick } = useChangeStatusButton();
  const { isUploadSuccessful, handleDocumentChange, isPending } = useFileUpload(
    openPdfGeneratedLoader,
    closePdfGeneratedLoader
  );
  const { isFormPassed } = useFormStatusCheck();

  const onCheckPassFileUploader = () => {
    if (!isFormPassed) {
      alert('최종 합격자만 업로드 가능합니다');
    } else {
      openPdfFileUploader();
    }
  };

  return (
    <AppLayout header footer>
      <EnrollmentLoader isOpen={isPending} />
      <StyledEnrollment>
        <Text fontType="H1" color={color.gray900}>
          입학 등록원 제출
        </Text>
        <ExplainBox />
        <Column gap={100}>
          <FileUploader
            onClick={onCheckPassFileUploader}
            onChange={handleDocumentChange}
            document={entrollmentDocument.fileName}
            ref={pdfFileUploaderRef}
          />
          <Button
            size="LARGE"
            styleType={
              !entrollmentDocument.fileName || !isUploadSuccessful
                ? 'DISABLED'
                : 'PRIMARY'
            }
            width={111}
            onClick={handleChangeStatusButtonClick}
          >
            서류 제출
          </Button>
        </Column>
      </StyledEnrollment>
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
