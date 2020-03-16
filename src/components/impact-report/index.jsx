import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";
import { Flex } from "reflexbox";

import ParagraphTitle from "../paragraph-title";
import SquareButton from "../square-button";

import ReportHeart from "./assets/heart.svg";

const ReportDescription = styled.div`
    margin: 32px 8px 16px 0;
`;

const Report = styled(Flex)`
    position: relative;
    box-shadow: 0 4px 14px 0 var(--border-gray);
    border-radius: 2px;
    background-color: var(--white);
`;

const ReportIcon = styled.img`
    width: 120px;
    padding: 16px;
`;

const ReportYear = styled.div`
    position: absolute;
    top: 50px;
    left: 58px;
    transform: rotate(-4deg);
    font-weight: bold;
    font-size: 24px;
    color: var(--primary);
    width: 120px;
    margin: 16px auto;
`;

export const ImpactReport = ({ report }) => (
    <Report margin={3}>
        <Flex margin={2}>
            <ReportIcon src={ReportHeart} />
            <ReportYear>{report.year}</ReportYear>

            <ReportDescription>
                <ParagraphTitle>{report.title}</ParagraphTitle>
                <a href={report.to}>
                    <SquareButton theme={"light"}>{report.button}</SquareButton>
                </a>
            </ReportDescription>
        </Flex>
    </Report>
);

ImpactReport.propTypes = {
    report: PropTypes.object,
    width: PropTypes.array
};

export default ImpactReport;
