import { TOKEN } from '@/constants/common/constants';
import { Cookie } from '../cookie/cookie';

const authorization = () => {
  return {
    headers: {
      Authorization: `Bearer ${Cookie.getItem(TOKEN.ACCESS)}`,
    },
  };
};

authorization.ForData = () => {
  return {
    headers: {
      Authorization: `Bearer ${Cookie.getItem(TOKEN.ACCESS)}`,
      'Content-Type': 'multipart/form-data',
    },
  };
};

export default authorization;
