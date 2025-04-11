'use client';

import { color, font } from '@maru/design-system';
import { Text } from '@maru/ui';
import { styled } from 'styled-components';
import IconCalender from "@maru/icon/src/IconCalender";
import IconClock from "@maru/icon/src/IconClock";

const FairForm = () => {
        return (
        <CreateFairForm>
            <CreateFormSort>
                <Text fontType="H6">대상선택</Text>
                <RadioGroup>
                    <RadioOption>
                        <RadioInput type="radio" name="target" id="all" value="all"/>
                        <RadioLabel htmlFor="all">전체</RadioLabel>
                    </RadioOption>
                    <RadioOption>
                        <RadioInput type="radio"  name="target" id="student" value="student"/>
                        <RadioLabel htmlFor="student">학생만</RadioLabel>
                    </RadioOption>
                </RadioGroup>
            </CreateFormSort>
            <CreateFormSort>
                <Text fontType="H6">장소</Text>
                <FormInput placeholder="장소를 입력해주세요." />
            </CreateFormSort>
            <CreateFormSort>
                <Text fontType="H6">입학 설명회 날짜 (8자리)</Text>
                <InputWrapper>
                    <FormInput placeholder="날짜를 입력해주세요." />
                    <InputIconWrapper>
                        <IconCalender width={24} height={24} />
                    </InputIconWrapper>
                </InputWrapper>
            </CreateFormSort>
            <CreateFormSort>
                <Text fontType="H6">시간 (4자리)</Text>
                <InputWrapper>
                    <FormInput placeholder="시간 입력해주세요." />
                    <InputIconWrapper>
                        <IconClock width={24} height={24} />
                    </InputIconWrapper>
                </InputWrapper>
            </CreateFormSort>
            <CreateFormSort>
                <Text fontType="H6">신청 기한 (8자리)</Text>
                <CreateInputSort>
                    <FormInput placeholder="시작일" />
                    <FormInput placeholder="종료일" />
                </CreateInputSort>
            </CreateFormSort>
            <CreateFairButton>
                <Text fontType="btn1">새로운 입학전형 설명회 생성하기</Text>
            </CreateFairButton>
        </CreateFairForm>
    );
};

export default FairForm;

const CreateFairForm = styled.div`
    width: 500px;
    height: 703px;
    background-color: ${color.gray50};
    border-radius: 12px;
    border: 1px solid ${color.gray250};
    padding: 56px 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const CreateFormSort = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    margin-bottom: 24px;
`;

const CreateFairButton = styled.button`
    background-color: ${color.maruDefault};
    color: ${color.white};
    border-radius: 6px;
    margin-top: 24px;
    padding:22px 0px;
`;

const RadioGroup = styled.div`
    display: flex;
    gap: 16px;
`;

const RadioOption = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const RadioInput = styled.input`
    width: 24px;
    height: 24px;
`;

const RadioLabel = styled.label`
    font: ${font.p3};
    color: ${color.gray700};
`;

const FormInput = styled.input`
    width: 100%;
    padding: 12px 40px 12px 16px;
    font: ${font.p2};
    border: 1px solid ${color.gray400};
    border-radius: 6px;
    background-color: ${color.white};
    color: ${color.gray900};
    outline: none;

    &::placeholder {
        color: ${color.gray400};
    }

    &:focus {
        border-color: ${color.maruDefault};
    }
`;

const CreateInputSort = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
`;

const InputWrapper = styled.div`
    position: relative;
    width: 100%;
`;

const InputIconWrapper = styled.div`
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
`;