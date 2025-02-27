import { SCHEDULE } from '@/constants/form/constants';
import { IconCancelCircle, IconCheckCircle, IconGrayCircle, IconGrayIngCircle } from '@maru/icon';
import dayjs from 'dayjs';

interface StatusIconProps {
  status?: string;
}

const StatusIcon = ({ status }: StatusIconProps) => {
  const now = dayjs();

  const iconMap = {
    RECEIVED: <IconCheckCircle width={120} height={120} />,
    FIRST_FAILED: now.isAfter(SCHEDULE.일차_합격_발표) ? (
      <IconCancelCircle width={120} height={120} />
    ) : (
      <IconGrayIngCircle width={120} height={120} />
    ),
    FAILED: now.isAfter(SCHEDULE.최종_합격_발표) ? (
      <IconCancelCircle width={120} height={120} />
    ) : (
      <IconGrayIngCircle width={120} height={120} />
    ),
    FINAL_SUBMITTED: <IconCheckCircle width={120} height={120} />,
    SUBMITTED: <IconCheckCircle width={120} height={120} />,
    APPROVED: <IconCheckCircle width={120} height={120} />,
    NO_SHOW: now.isAfter(SCHEDULE.최종_합격_발표) ? (
      <IconCancelCircle width={120} height={120} />
    ) : (
      <IconGrayIngCircle width={120} height={120} />
    ),
    FIRST_PASSED: now.isAfter(SCHEDULE.일차_합격_발표) ? (
      <IconCheckCircle width={120} height={120} />
    ) : (
      <IconGrayIngCircle width={120} height={120} />
    ),
    PASSED: now.isAfter(SCHEDULE.최종_합격_발표) ? (
      <IconCheckCircle width={120} height={120} />
    ) : (
      <IconGrayIngCircle width={120} height={120} />
    ),
    REJECTED: <IconCancelCircle width={120} height={120} />,
    ENTERED: <IconCheckCircle width={120} height={120} />,
    DEFAULT: <IconGrayCircle width={120} height={120} />,
  };

  return iconMap[status as keyof typeof iconMap] || iconMap.DEFAULT;
};

export default StatusIcon;
