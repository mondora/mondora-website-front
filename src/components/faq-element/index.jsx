import React, { useState } from "react";
import PropTypes from "prop-types";

import styled, { css } from "styled-components";

import plusIconPath from "../../../static/images/FAQ-plus.png";
import minusIconPath from "../../../static/images/FAQ-minus.png";

const QuestionWrapper = styled.div`
    display: flex;
    align-items: center;

    cursor: pointer;
    background-color: ${props => props.open && css`var(--gray)`};
    transition: background-color 0.8s ease;
`;

const FaqLogo = styled.img`
    color: var(--primary);
    width: 24px;
    height: 24px;
    margin: 8px;
`;

const Question = styled.div`
    font-weight: bold;
    line-height: 1.5;
    margin: 10px;
`;

const Answer = styled.div`
    box-sizing: border-box;
    margin: 8px 48px;

    opacity: ${props => (props.open ? 1 : 0)};
    max-height: ${props => (props.open ? "100vh" : "0")};
    transition: all ease 0.8s;
    overflow: hidden;
`;

const FaqElement = ({ question, answer }) => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <QuestionWrapper open={open} onClick={() => setOpen(!open)}>
                <FaqLogo src={open ? minusIconPath : plusIconPath} />
                <Question>{question}</Question>
            </QuestionWrapper>
            <Answer open={open}>{answer} </Answer>
        </div>
    );
};

FaqElement.propTypes = {
    question: PropTypes.string,
    answer: PropTypes.string
};

export default FaqElement;
