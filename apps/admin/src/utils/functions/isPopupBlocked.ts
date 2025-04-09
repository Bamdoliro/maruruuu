const isPopupBlocked = (link: Window | null): boolean => {
  return !!link && !link.closed && typeof link.closed !== 'undefined';
};

export default isPopupBlocked;
