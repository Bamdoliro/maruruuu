import type { FairType } from '@/types/fair/client';

export interface FairFormInput {
  start: string;
  place: string;
  capacity: number;
  type: FairType;
  date: string;
  time: string;
  applicationStartDate: string | null;
  applicationEndDate: string | null;
}

export interface FairApiRequestBody {
  start: string | null;
  capacity: number;
  place: string;
  type: FairType;
  applicationStartDate: string | null;
  applicationEndDate: string | null;
}

export const formatFairRequestBody = ({
  type,
  place,
  capacity,
  date,
  time,
  applicationStartDate,
  applicationEndDate,
}: FairFormInput): FairApiRequestBody => {
  const convertToApiDateFormat = (dateStr: string | null): string | null => {
    if (!dateStr || !/^\d{8}$/.test(dateStr)) return null;
    const date = new Date(
      `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`
    );
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };

  const formatDateTime = (dateStr: string, timeStr: string): string | null => {
    const datePart = convertToApiDateFormat(dateStr);
    if (!datePart || timeStr.length < 4) return null;

    const hh = timeStr.slice(0, 2);
    const mm = timeStr.slice(2, 4);
    return `${datePart}T${hh}:${mm}:00`;
  };

  const start = formatDateTime(date, time) || '';

  return {
    start,
    capacity: Number(capacity),
    place,
    type,
    applicationStartDate: convertToApiDateFormat(applicationStartDate) || '',
    applicationEndDate: convertToApiDateFormat(applicationEndDate) || '',
  };
};
