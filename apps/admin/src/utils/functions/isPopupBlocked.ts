const isPopupBlocked = () => {
  const popup = window.open('', '_blank', 'width=1,height=1');

  if (!popup || popup.closed || typeof popup.closed === 'undefined') {
    return true;
  } else {
    popup.close();
    return false;
  }
};

export default isPopupBlocked;
