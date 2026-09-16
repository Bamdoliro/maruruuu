const MOBILE_USER_AGENT =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

interface NavigatorUAData {
  mobile: boolean;
}

const isMobileDevice = () => {
  const { userAgentData } = navigator as Navigator & {
    userAgentData?: NavigatorUAData;
  };

  if (typeof userAgentData?.mobile === 'boolean') return userAgentData.mobile;

  return MOBILE_USER_AGENT.test(navigator.userAgent);
};

export default isMobileDevice;
