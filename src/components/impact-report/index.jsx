import React from "react";
import PropTypes from "prop-types";

import { Link } from "gatsby";

import styled from "styled-components";
import { Flex } from "reflexbox";

import ParagraphTitle from "../paragraph-title";
import SquareButton from "../square-button";

import ReportHeart from "../../../static/images/heart.svg";

const ReportDescription = styled.div`
    margin: 16px;
`;
const Report = styled(Flex)`
    position: relative;
    box-shadow: 0 0 10px gray;
    background-color: var(--white);
`;
const ReportIcon = styled.img`
    width: 120px;
    padding: 16px;
`;
const ReportYear = styled.div`
    position: absolute;
    top: 44px;
    left: 48px;
    transform: rotate(-4deg);
    font-weight: bold;
    font-size: 24px;
    color: var(--primary);
    width: 120px;
    margin: 16px auto;
`;

export const ImpactReport = ({ width, report }) => (
    <Flex marginY={16} maxWidth={400} width={width}>
        <Report marginX={2}>
            <div>
                <ReportIcon src={ReportHeart} />
                <ReportYear>{report.year}</ReportYear>
            </div>

            <ReportDescription>
                <ParagraphTitle>{report.title}</ParagraphTitle>
                <Link to={report.to}>
                    <SquareButton theme={"light"}>{report.button}</SquareButton>
                </Link>
            </ReportDescription>
        </Report>
    </Flex>
);

ImpactReport.propTypes = {
    report: PropTypes.object,
    width: PropTypes.array
};

export default ImpactReport;
