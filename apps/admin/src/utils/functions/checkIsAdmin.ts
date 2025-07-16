import { getAdmin } from '@/services/admin/api';

const checkIsAdmin = async () => {
  const res = await getAdmin();
  return res.data?.authority === 'ADMIN';
};

export default checkIsAdmin;
