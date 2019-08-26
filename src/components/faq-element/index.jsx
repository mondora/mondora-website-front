import React, { useState } from "react";
import PropTypes from "prop-types";

import styled, { css } from "styled-components";

import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const QuestionWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 40px;
    align-items: center;
    text-align: left;
    margin: 16px;
    cursor: pointer;
    background-color: ${props =>
        props.open ? css`var(--primary)` : css`var(--gray)`};
    transition: background-color 0.8s ease;
`;

const Question = styled.div`
    font-weight: bold;
    line-height: 1.5;
    margin: 10px;
`;
const FaqIcon = styled.div`
    font-size: 20px;
    color: ${props => props.open ? css`var(--white)` : css`var(--black)`};
`;
const Answer = styled.div`
    box-sizing: border-box;
    color: var(--variant-black);
    font-size: 11pt;
    text-align: left;
    margin: ${props => (props.open ? "8px 48px" : "0 48px")};
    opacity: ${props => (props.open ? 1 : 0)};
    max-height: ${props => (props.open ? "20vh" : "0")};
    transition: opacity ease 0.8s, max-height ease 0.8s;
    overflow: hidden;
`;

const FaqElement = ({ question, answer }) => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <QuestionWrapper open={open} onClick={() => setOpen(!open)}>
                <Question>{question}</Question>
                <FaqIcon open={open}>
                    <FontAwesomeIcon icon={open ? faAngleUp : faAngleDown} />
                </FaqIcon>
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
