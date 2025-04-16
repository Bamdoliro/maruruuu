import type { FairType } from '@/types/fair/client';

export interface FairFormInput {
  start: string;
  place: string;
  capacity: number;
  type: FairType;
  applicationStartDate: string | null;
  applicationEndDate: string | null;
}

export interface FairApiRequestBody {
  start: string;
  capacity: number;
  place: string;
  type: FairType;
  applicationStartDate: string;
  applicationEndDate: string;
}

export const formatFairRequestBody = ({
  start,
  type,
  place,
  capacity,
  applicationStartDate,
  applicationEndDate,
}: FairFormInput): FairApiRequestBody => {
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

  return {
    start,
    capacity: Number(capacity),
    place,
    type,
    applicationStartDate: convertToApiDateFormat(applicationStartDate),
    applicationEndDate: convertToApiDateFormat(applicationEndDate),
  };
};
