const formatApplicationDate = (applicationDate: string) =>
  new Date(applicationDate).toISOString().split('T')[0].replace(/-/g, '.');

export default formatApplicationDate;
