import React, { useState } from "react";

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
        props.open === props.index ? css`var(--primary)` : css`var(--gray)`};
    transition: background-color 0.8s ease;
`;

const Question = styled.div`
    font-weight: bold;
    line-height: 24pt;
    margin: 10px;
`;

const FaqIcon = styled.div`
    font-size: 20px;
    color: ${props =>
        props.open === props.index ? css`var(--white)` : css`var(--black)`};
`;

const Answer = styled.div`
    box-sizing: border-box;
    color: var(--variant-black);
    font-size: 11pt;
    text-align: left;
    margin: 16px;
    padding-bottom: 40pt;
    transition: opacity ease 0.8s, max-height ease 0.8s;
`;

const FaqContainer = ({ faqs = [] }) => {
    const [open, setOpen] = useState(null);
    console.log("faqsssss", faqs);
    return (
        <div>
            {faqs.map((faq, i) => (
                <div>
                    <QuestionWrapper
                        open={open}
                        index={i}
                        onClick={() => setOpen(open !== i ? i : null)}
                    >
                        <Question>{faq.question}</Question>
                        <FaqIcon open={open} index={i}>
                            <FontAwesomeIcon
                                icon={open === i ? faAngleUp : faAngleDown}
                            />
                        </FaqIcon>
                    </QuestionWrapper>
                    {open === i && <Answer open={open}>{faq.answer} </Answer>}
                </div>
            ))}
        </div>
    );
};

export default FaqContainer;
