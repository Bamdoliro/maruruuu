import { useFormStatusQuery } from '@/services/form/queries';
import StatusBox from '../StatusBox/StatusBox';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { SCHEDULE } from '@/constants/form/constants';
import { Column, Row } from '@maru/ui';
import SchoolNumberBox from '../SchoolNumberBox/SchoolNumberBox';
import CheckingBox from '../CheckingBox/CheckingBox';
import { useBoxClick } from './ManagementContent.hook';

dayjs.extend(isBetween);

const ManagementContent = () => {
  const { data: statusData } = useFormStatusQuery();
  const now = dayjs();
  const {
    handleWriteFormContinue,
    handleDownloadForm,
    handleDownloadReceipt,
    handleDownloadAdmissionTicket,
  } = useBoxClick(statusData?.status);

  if (now.isBetween(SCHEDULE.원서_접수, SCHEDULE.일차_합격_발표)) {
    return (
      <Row gap={47}>
        <Column gap={26} width={492}>
          <StatusBox height="260px" status={statusData?.status} />
          <SchoolNumberBox size="small" />
        </Column>
        <Column gap={26} width={492}>
          <CheckingBox
            title="원서 작성 이어서 하기"
            subTitle="클릭해서 원서 작성 페이지로 이동하세요."
            onClick={handleWriteFormContinue}
          />
          <CheckingBox
            title="내 원서 확인하기"
            subTitle="클릭해서 원서를 다운로드 받으세요."
            onClick={handleDownloadForm}
            isIcon
          />
          <CheckingBox
            title="내 접수증 확인하기"
            subTitle="클릭해서 접수증을 다운로드 받으세요."
            onClick={handleDownloadReceipt}
            isIcon
          />
        </Column>
      </Row>
    );
  }

  if (now.isBetween(SCHEDULE.일차_합격_발표, SCHEDULE.이차_면접)) {
    return (
      <Row gap={47}>
        <Column gap={26} width={492}>
          <StatusBox height="260px" status={statusData?.status} />
          <CheckingBox
            title="내 수험표 확인하기"
            subTitle="클릭해서 수험표를 다운로드 받으세요."
            onClick={handleDownloadAdmissionTicket}
            isIcon
          />
        </Column>
        <Column width={492}>
          <SchoolNumberBox size="big" />
        </Column>
      </Row>
    );
  }

  if (now.isBetween(SCHEDULE.이차_면접, SCHEDULE.입학_등록_마감)) {
    return (
      <Row alignItems="top" gap={30}>
        <StatusBox height="415px" status={statusData?.status} />
        <SchoolNumberBox size="big" />
      </Row>
    );
  }

  return (
    <Row alignItems="top" gap={30}>
      <StatusBox height="415px" status={statusData?.status} />
      <SchoolNumberBox size="big" />
    </Row>
  );
};

export default ManagementContent;
