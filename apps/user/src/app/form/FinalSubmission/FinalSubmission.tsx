import {
  FinalFormConfirm,
  FinalFormTable,
  FinalFormUploader,
  FormDownload,
  PdfDownloadLoader,
  SideBar,
} from '@/components/form';
import { useOpenFileUploader } from '@/hooks';
import { AppLayout } from '@/layouts';
import { useBooleanState } from '@maru/hooks';
import { Column, Row } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';
import { useCTAButton, useInput } from './FinalSubmission.hook';
import { useOverlay } from '@toss/use-overlay';

const FinalSubmission = () => {
  const overlay = useOverlay();
  const {
    value: isOpenPdfLoader,
    setTrue: openPdfLoader,
    setFalse: closePdfLoader,
  } = useBooleanState();
  const { openFileUploader: openPdfFileUploader, ref: pdfFileUploaderRef } =
    useOpenFileUploader();

  const { handleSubmitFinalForm, handleExportForm } = useCTAButton(
    openPdfLoader,
    closePdfLoader
  );
  const { handleFormDocumentChange, final } = useInput();

  const openFinalFormConfirm = () => {
    overlay.open(({ isOpen, close }) => (
      <FinalFormConfirm
        isOpen={isOpen}
        onClose={close}
        onConfirm={() => {
          handleSubmitFinalForm();
          close();
        }}
      />
    ));
  };

  return (
    <AppLayout header footer>
      <PdfDownloadLoader isOpen={isOpenPdfLoader} />
      <StyledFinalSubmission>
        <Row alignItems="start" justifyContent="space-between">
          <Column>
            <FormDownload onClick={handleExportForm} />
            <FinalFormUploader
              onClick={openPdfFileUploader}
              fileName={final.fileName ?? ''}
            />
            <FinalFormTable />
          </Column>
          <SideBar
            onClick={openFinalFormConfirm}
            styleType={!final.fileName ? 'DISABLED' : 'PRIMARY'}
          />
        </Row>
      </StyledFinalSubmission>
      <input
        ref={pdfFileUploaderRef}
        onChange={handleFormDocumentChange}
        type="file"
        accept=".pdf"
        hidden
      />
    </AppLayout>
  );
};

export default FinalSubmission;

const StyledFinalSubmission = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  height: 100%;
  padding: 102px 96px 132px;
`;
