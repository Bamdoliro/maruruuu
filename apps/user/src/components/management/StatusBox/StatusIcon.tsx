import { SCHEDULE } from '@/constants/common/constants';
import {
  IconCancelCircle,
  IconCheckCircle,
  IconGrayCircle,
  IconGrayIngCircle,
} from '@maru/icon';
import dayjs from 'dayjs';

interface StatusIconProps {
  status?: string;
}

const StatusIcon = ({ status }: StatusIconProps) => {
  const now = dayjs();

  const firstResult = now.isAfter(SCHEDULE.일차_합격_발표);
  const finalResult = now.isAfter(SCHEDULE.최종_합격_발표);

  const iconMap = {
    RECEIVED: <IconCheckCircle width={120} height={120} />,
    FIRST_FAILED: firstResult ? (
      <IconCancelCircle width={120} height={120} />
    ) : (
      <IconGrayIngCircle width={120} height={120} />
    ),
    FAILED: finalResult ? (
      <IconCancelCircle width={120} height={120} />
    ) : (
      <IconGrayIngCircle width={120} height={120} />
    ),
    FINAL_SUBMITTED: <IconCheckCircle width={120} height={120} />,
    SUBMITTED: <IconCheckCircle width={120} height={120} />,
    APPROVED: <IconCheckCircle width={120} height={120} />,
    NO_SHOW: finalResult ? (
      <IconCancelCircle width={120} height={120} />
    ) : (
      <IconGrayIngCircle width={120} height={120} />
    ),
    FIRST_PASSED: firstResult ? (
      <IconCheckCircle width={120} height={120} />
    ) : (
      <IconGrayIngCircle width={120} height={120} />
    ),
    PASSED: finalResult ? (
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
