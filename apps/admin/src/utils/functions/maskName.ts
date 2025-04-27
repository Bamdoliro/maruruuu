const maskName = (name: string): string => {
  if (name.length === 1) return name;
  if (name.length === 2) {
    return name[0] + '*';
  }

  const masked = '*'.repeat(name.length - 2);
  return name[0] + masked + name[name.length - 1];
};

export default maskName;
