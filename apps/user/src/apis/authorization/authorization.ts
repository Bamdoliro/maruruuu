import { TOKEN } from '@/constants/common/constants';
import { Storage } from '../storage/storage';

const authorization = () => {
  return {
    headers: {
      Authorization: `Bearer ${Storage.getItem(TOKEN.ACCESS)}`,
    },
  };
};

authorization.ForData = () => {
  return {
    headers: {
      Authorization: `Bearer ${Storage.getItem(TOKEN.ACCESS)}`,
      'Content-Type': 'multipart/form-data',
    },
  };
};

export default authorization;
