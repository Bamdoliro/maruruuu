import { styled } from 'styled-components';
import { color } from '@maru/design-system';
import Row from '@maru/ui/src/Flex/Row';
import Text from '@maru/ui/src/Text/Text';
import Button from '@maru/ui/src/Button/Button';
import React from 'react';
import { IconClose } from '@maru/icon';
import { flex } from '@maru/utils';

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VolunteerModal = ({ isOpen, onClose }: VolunteerModalProps) => {
  return (
    <BlurBackground $isOpen={isOpen}>
      <StyledVolunteerModal>
        <Row justifyContent="space-between" alignItems="center">
          <Text fontType="H2" color={color.gray900}>
            봉사활동 실적 확인 안내사항입니다.
          </Text>
          <IconClose
            onClick={onClose}
            color={color.gray600}
            width={36}
            height={36}
            cursor="pointer"
          />
        </Row>
        <ScrollContent>
          <Text fontType="p2">
            [안내] 1365자원봉사포털 서비스 중단에 따른 봉사활동 실적 확인 안내
            <br />
            안녕하세요. 부산소프트웨어마이스터고등학교입니다.
            <br />
            최근 국가정보자원관리원 화재로 인해 1365자원봉사포털서비스가 일시
            중단되었습니다.
            <br />
            이에 따라 학생들의 봉사활동 실적 확인 및 확인서 제출에 불편이 예상되어, 아래와
            같이 한시적인 예외 조치를 안내드립니다.
            <br />
            <br />
            <br />
            대체 확인서 인정 안내
            <br />
            1365자원봉사포털 이용이 어려운 경우, 아래의 방법으로 발급된 봉사활동 실적
            확인서도 인정됩니다.
            <br />
            <br />
            - 사회복지자원봉사인증관리(VMS) 시스템 발급 확인서
            <br />
            - 청소년활동정보서비스(DOVOL) 시스템 발급 확인서
            <br />
            - 자원봉사센터 또는 봉사활동기관에서 수기로 발급한 확인서
            <br />
            ※ 위의 확인서는 1365포털 서비스가 복구될 때까지 임시로 인정됩니다.
            <br />
            <br />
            9/30일 이전에 수행한 봉사활동에 한에서 대체 확인서를 인정합니다.
            <br />
            이에 해당하는 학생 및 학교는 입학담당관번호(051-970-1791, 051-970-1792)로 전화
            부탁드립니다.
          </Text>
        </ScrollContent>
        <Row justifyContent="flex-end">
          <Button size="SMALL" styleType="PRIMARY" width={88} onClick={onClose}>
            확인
          </Button>
        </Row>
      </StyledVolunteerModal>
    </BlurBackground>
  );
};

export default VolunteerModal;

const BlurBackground = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
`;

const StyledVolunteerModal = styled.div`
  ${flex({ flexDirection: 'column', justifyContent: 'space-between' })}
  gap: 29px;
  width: 850px;
  height: 480px;
  padding: 40px;
  background-color: ${color.white};
  border-radius: 16px;
`;

const ScrollContent = styled.div`
  height: 280px;
  overflow-y: scroll;
  margin-right: -8px;
  scrollbar-width: thin;
  scrollbar-color: ${color.gray400} ${color.gray100};
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${color.gray100};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${color.gray400};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${color.gray500};
  }
`;
