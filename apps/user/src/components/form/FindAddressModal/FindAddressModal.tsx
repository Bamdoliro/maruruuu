import { useOutsideClick } from '@maru/hooks';
import { styled } from 'styled-components';
import DaumPostcode from 'react-daum-postcode';
import { useEffect } from 'react';
import { useOnComplete } from './FindAddressModal.hook';

interface FindAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FindAddressModal = ({ isOpen, onClose }: FindAddressModalProps) => {
  const findAddressModal = useOutsideClick(onClose);
  const { handleCompleteFindAddress } = useOnComplete(onClose);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <BlurBackground $isOpen={isOpen}>
      <StyledFindAddressModal ref={findAddressModal}>
        <DaumPostcode
          onComplete={handleCompleteFindAddress}
          style={{ width: '100%', height: '100%' }}
        />
      </StyledFindAddressModal>
    </BlurBackground>
  );
};

export default FindAddressModal;

const BlurBackground = styled.div<{ $isOpen: boolean }>`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
  display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
`;

const StyledFindAddressModal = styled.div`
  width: 500px;
  height: 500px;
`;
