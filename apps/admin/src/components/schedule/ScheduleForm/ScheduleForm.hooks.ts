import { useEffect, useState } from 'react';
import { useToast } from '@maru/hooks';
import { SCHEDULE_FIELDS, SCHEDULE_ORDER_RULES } from '@/constants/schedule/constant';
import { usePutScheduleMutation } from '@/services/schedule/mutations';
import { useScheduleQuery } from '@/services/schedule/queries';
import type { ScheduleDateTimes, ScheduleKey } from '@/types/schedule/client';

export interface ScheduleDateTimeInput {
  date: string;
  time: string;
  second: string;
}

type ScheduleInput = Record<ScheduleKey, ScheduleDateTimeInput>;
type ScheduleError = Partial<Record<ScheduleKey, string>>;

const EMPTY_DATE_TIME_INPUT: ScheduleDateTimeInput = { date: '', time: '', second: '00' };

const EMPTY_SCHEDULE_INPUT = SCHEDULE_FIELDS.reduce(
  (acc, { key }) => ({ ...acc, [key]: EMPTY_DATE_TIME_INPUT }),
  {} as ScheduleInput,
);

const extractDigits = (value: string) => value.replace(/\D/g, '');

export const formatDateInput = (value: string) => {
  const digits = extractDigits(value).slice(0, 8);

  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 4)}/${digits.slice(4)}`;

  return `${digits.slice(0, 4)}/${digits.slice(4, 6)}/${digits.slice(6, 8)}`;
};

export const formatTimeInput = (value: string) => {
  const digits = extractDigits(value).slice(0, 4);

  if (digits.length <= 2) return digits;

  return `${digits.slice(0, 2)}:${digits.slice(2, 4)}`;
};

const toInputValue = (value: string | null): ScheduleDateTimeInput => {
  if (!value) return EMPTY_DATE_TIME_INPUT;

  return {
    date: formatDateInput(value.slice(0, 10)),
    time: formatTimeInput(value.slice(11, 16)),
    second: value.slice(17, 19) || '00',
  };
};

const isEmptyInput = ({ date, time }: ScheduleDateTimeInput) => !date && !time;

const isValidDateTime = ({ date, time }: ScheduleDateTimeInput) => {
  const dateDigits = extractDigits(date);
  const timeDigits = extractDigits(time);
  if (dateDigits.length !== 8 || timeDigits.length !== 4) return false;

  const year = Number(dateDigits.slice(0, 4));
  const month = Number(dateDigits.slice(4, 6));
  const day = Number(dateDigits.slice(6, 8));
  const hour = Number(timeDigits.slice(0, 2));
  const minute = Number(timeDigits.slice(2, 4));
  const parsed = new Date(year, month - 1, day);

  return (
    parsed.getFullYear() === year &&
    parsed.getMonth() === month - 1 &&
    parsed.getDate() === day &&
    hour < 24 &&
    minute < 60
  );
};

const toRequestValue = ({ date, time, second }: ScheduleDateTimeInput) => {
  const dateDigits = extractDigits(date);
  const timeDigits = extractDigits(time);

  return `${dateDigits.slice(0, 4)}-${dateDigits.slice(4, 6)}-${dateDigits.slice(6, 8)}T${timeDigits.slice(0, 2)}:${timeDigits.slice(2, 4)}:${second}`;
};

const getLabel = (key: ScheduleKey) =>
  SCHEDULE_FIELDS.find((field) => field.key === key)?.label ?? key;

const validateSchedule = (form: ScheduleInput) => {
  const errors: ScheduleError = {};

  SCHEDULE_FIELDS.forEach(({ key, optional }) => {
    if (isEmptyInput(form[key])) {
      if (!optional) errors[key] = '필수 입력 항목입니다.';
      return;
    }

    if (!isValidDateTime(form[key])) {
      errors[key] = '올바른 날짜(yyyy/mm/dd)와 시간(HH:mm)을 입력해주세요.';
    }
  });

  const isMaintenanceStartEmpty = isEmptyInput(form.maintenanceStart);
  const isMaintenanceEndEmpty = isEmptyInput(form.maintenanceEnd);
  if (isMaintenanceStartEmpty !== isMaintenanceEndEmpty) {
    const emptyKey = isMaintenanceStartEmpty ? 'maintenanceStart' : 'maintenanceEnd';
    errors[emptyKey] = '점검 시작과 종료를 함께 입력해주세요.';
  }

  SCHEDULE_ORDER_RULES.forEach(({ before, after, allowEqual }) => {
    if (errors[before] || errors[after]) return;
    if (isEmptyInput(form[before]) || isEmptyInput(form[after])) return;

    const beforeValue = toRequestValue(form[before]);
    const afterValue = toRequestValue(form[after]);
    const isInvalidOrder = allowEqual
      ? beforeValue > afterValue
      : beforeValue >= afterValue;

    if (isInvalidOrder) {
      errors[after] =
        `${getLabel(before)} ${allowEqual ? '이후(같은 시각 가능)' : '이후'}여야 합니다.`;
    }
  });

  return errors;
};

export const useScheduleForm = () => {
  const { data: schedule, isLoading } = useScheduleQuery();
  const { putScheduleMutate, isPending } = usePutScheduleMutation();
  const { toast } = useToast();
  const [form, setForm] = useState<ScheduleInput>(EMPTY_SCHEDULE_INPUT);
  const [errors, setErrors] = useState<ScheduleError>({});

  useEffect(() => {
    if (!schedule) return;

    setForm(
      SCHEDULE_FIELDS.reduce(
        (acc, { key }) => ({ ...acc, [key]: toInputValue(schedule[key]) }),
        {} as ScheduleInput,
      ),
    );
  }, [schedule]);

  const handleChange = (key: ScheduleKey, type: 'date' | 'time', value: string) => {
    const formattedValue =
      type === 'date' ? formatDateInput(value) : formatTimeInput(value);

    setForm((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [type]: formattedValue,
        second: type === 'time' ? '00' : prev[key].second,
      },
    }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = () => {
    if (!schedule) return;

    const validationErrors = validateSchedule(form);
    setErrors(validationErrors);

    if (Object.values(validationErrors).some(Boolean)) {
      toast('입력한 일정을 다시 확인해주세요.', 'ERROR');
      return;
    }

    const dateTimes = SCHEDULE_FIELDS.reduce(
      (acc, { key }) => ({
        ...acc,
        [key]: isEmptyInput(form[key]) ? null : toRequestValue(form[key]),
      }),
      {} as ScheduleDateTimes,
    );

    putScheduleMutate({
      admissionYear: schedule.admissionYear,
      version: schedule.version,
      ...dateTimes,
    });
  };

  return { form, errors, isLoading, isPending, handleChange, handleSubmit };
};
