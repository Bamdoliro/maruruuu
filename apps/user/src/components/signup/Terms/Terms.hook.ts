import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';

export const useCheckTerms = (setTermsAgree: Dispatch<SetStateAction<boolean>>) => {
  const [checks, setChecks] = useState([false, false, false]);

  const handleCheck = (index?: number) => {
    if (index === undefined) {
      const allChecked = !checks.every(Boolean);
      setChecks(Array(3).fill(allChecked));
      setTermsAgree(allChecked);
    } else {
      const newChecks = checks.map((c, i) => (i === index ? !c : c));
      const allChecked = newChecks.every(Boolean);
      setChecks(newChecks);
      setTermsAgree(allChecked);
    }
  };

  return {
    checks,
    handleCheckAll: () => handleCheck(),
    handleCheckOne: () => handleCheck(0),
    handleCheckTwo: () => handleCheck(1),
    handleCheckThree: () => handleCheck(2),
  };
};
