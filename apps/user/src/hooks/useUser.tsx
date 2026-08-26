import { useUserQuery } from '@/services/user/queries';
import { userAtom } from '@/stores';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

const useUser = () => {
  const [user, setUser] = useAtom(userAtom);
  const { data: userData } = useUserQuery();

  useEffect(() => {
    if (userData) setUser(userData);
  }, [setUser, userData]);

  return { userData: user, isLogIn: !!userData };
};

export default useUser;
