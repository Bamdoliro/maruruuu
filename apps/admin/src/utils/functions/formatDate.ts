const formatDate = {
  normalizeDate: (dateString: string): string => {
    let normalizedDate = dateString;

    if (dateString.includes('T')) {
      normalizedDate = new Date(dateString).toISOString();
    }

    if (dateString.includes('-') && !dateString.includes('T')) {
      normalizedDate = new Date(dateString + 'T00:00:00').toISOString();
    }

    if (dateString.includes('.') && !dateString.includes('T')) {
      const reformatted = dateString.replace(/\./g, '-');
      normalizedDate = new Date(reformatted + 'T00:00:00').toISOString();
    }

    return normalizedDate;
  },

  toFullDateTime: (dateString: string) => {
    const date = new Date(formatDate.normalizeDate(dateString));
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
  },

  toDayAndDateTime: (dateString: string) => {
    const date = new Date(formatDate.normalizeDate(dateString));
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = dayNames[date.getDay()];

    return `${month}월 ${day}일 (${dayOfWeek}) ${hours}:${minutes}`;
  },

  toDashedDate: (dateString: string) => {
    const date = new Date(formatDate.normalizeDate(dateString));
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}.${month}.${day}`;
  },

  toDotDate: (dateString: string) => {
    const date = new Date(formatDate.normalizeDate(dateString));
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}.${month}.${day}`;
  },
};

export default formatDate;
