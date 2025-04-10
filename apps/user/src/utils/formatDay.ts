const formatDay = (remainDays: number) => {
  remainDays = Math.round(remainDays);

  if (remainDays > 0) {
    return `D-${remainDays}`;
  } else if (remainDays <= -1) {
    return `D+${-remainDays - 1}`;
  }

  return 'D-Day';
};

export default formatDay;
