import type { FairType } from '@/types/fair/client';

export interface FairFormInput {
  start: string;
  place: string;
  capacity: number;
  type: FairType;
  applicationStartDate: string | null;
  applicationEndDate: string | null;
}

export const formatFairRequestBody = ({
  start,
  type,
  place,
  capacity,
  applicationStartDate,
  applicationEndDate,
}: FairFormInput) => {
  const convertToApiDateFormat = (dateStr: string | null): string => {
    if (!dateStr) return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
    if (/^\d{8}$/.test(dateStr)) {
      const y = dateStr.slice(0, 4);
      const m = dateStr.slice(4, 6);
      const d = dateStr.slice(6, 8);
      return `${y}-${m}-${d}`;
    }
    return '';
  };

  const convertToApiDateTimeFormat = (dateTimeStr: string): string => {
    if (!/^\d{12}$/.test(dateTimeStr)) return '';
    const y = dateTimeStr.slice(0, 4);
    const m = dateTimeStr.slice(4, 6);
    const d = dateTimeStr.slice(6, 8);
    const h = dateTimeStr.slice(8, 10);
    const min = dateTimeStr.slice(10, 12);
    return `${y}-${m}-${d}T${h}:${min}:00`;
  };

  return {
    start: convertToApiDateTimeFormat(start),
    capacity: Number(capacity),
    place,
    type,
    applicationStartDate: convertToApiDateFormat(applicationStartDate),
    applicationEndDate: convertToApiDateFormat(applicationEndDate),
  };
};
export type FairApiRequestBody = ReturnType<typeof formatFairRequestBody>;
