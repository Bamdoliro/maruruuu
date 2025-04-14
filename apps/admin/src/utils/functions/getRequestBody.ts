export type FairFormInput = {
  type: string;
  date: string;
  time: string;
  capacity: string;
  place: string;
  startDate: string;
  endDate: string;
};

export const formatFairRequestBody = ({
  type,
  date,
  time,
  capacity,
  place,
  startDate,
  endDate,
}: FairFormInput) => {
  const formatDate = (date: string, time: string) => {
    const yyyy = date.slice(0, 4);
    const mm = date.slice(4, 6);
    const dd = date.slice(6, 8);
    const hh = time.slice(0, 2);
    const min = time.slice(2, 4);
    return `${yyyy}-${mm}-${dd}T${hh}:${min}:00`;
  };

  return {
    type,
    capacity: Number(capacity),
    start: formatDate(date, time),
    place,
    applicationStartDate: `${startDate.slice(0, 4)}-${startDate.slice(
      4,
      6
    )}-${startDate.slice(6, 8)}`,
    applicationEndDate: `${endDate.slice(0, 4)}-${endDate.slice(4, 6)}-${endDate.slice(
      6,
      8
    )}`,
  };
};
