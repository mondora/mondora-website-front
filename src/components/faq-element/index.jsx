import React, { useState } from "react";
import PropTypes from "prop-types";

import styled, { css } from "styled-components";

import Subtitle from "../subtitle";

import FeatherIcon from "../feather-icon";

const QuestionWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 40px;
    align-items: center;
    justify-content: space-between;

    padding: 16px;
    margin-bottom: 16px;
    font-size: 24px;

    cursor: pointer;
    background-color: ${props =>
        props.open ? css`var(--primary)` : css`var(--background-light-gray)`};
    color: ${props => (props.open ? css`var(--white)` : css`var(--black)`)};
    transition: all ease 0.5s;
`;

const Question = styled.div`
    font-size: 16px;
    padding-right: 8px;
    color: var(--text-dark-black);
`;
const Answer = styled.div`
    margin-bottom: ${props => (props.open ? "64px" : "16px")};
    max-height: ${props => (props.open ? "100vh" : 0)};
    transition: all ease 0.5s;
    overflow: hidden;
`;
const Detail = styled.li`
    margin: 8px;
`;

const FaqElement = ({ question, answer, details }) => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <QuestionWrapper open={open} onClick={() => setOpen(!open)}>
                <Question>{question}</Question>
                <FeatherIcon
                    size={24}
                    name={open ? "chevron-up" : "chevron-down"}
                />
            </QuestionWrapper>
            <Answer open={open}>
                <Subtitle>
                    {answer}
                    <ul>
                        {details &&
                            details.map((detail, i) => (
                                <Detail key={i}>
                                    <b>{detail.title}</b>
                                    {detail.description}
                                </Detail>
                            ))}
                    </ul>
                </Subtitle>
            </Answer>
        </div>
    );
};

FaqElement.propTypes = {
    question: PropTypes.string,
    answer: PropTypes.string,
    details: PropTypes.array
};

export default FaqElement;
