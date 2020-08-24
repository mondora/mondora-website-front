import React, { useState } from "react";

import PropTypes from "prop-types";

import styled, { css } from "styled-components";
import { Flex } from "reflexbox";

import FeatherIcon from "../../../feather-icon";
import ParagraphTitle from "../../../paragraph-title";
import Subtitle from "../../../subtitle";

const Description = styled.div`
    transition: all ease 0.5s;
    overflow: hidden;
    @media (max-width: 640px) {
        max-height: ${props => (props.open ? "100vh" : 0)};
    }
`;
const VoiceWrapper = styled(Flex)`
    @media (max-width: 640px) {
        border-bottom-style: solid;
        border-bottom-width: 2px;
        border-bottom-color: ${props =>
            props.dark ? css`var(--white)` : css`var(--text-dark-gray)`};
    }
`;
const Bob = styled.div`
    @media (min-width: 640px) {
        display: none;
    }
`;

const Voice = ({ title, description, dark }) => {
    const [open, setOpen] = useState(false);
    return (
        <VoiceWrapper
            width={[1, 1 / 3]}
            flexDirection="column"
            dark={dark}
            padding={2}
        >
            <Flex
                justifyContent="space-between"
                open={open}
                onClick={() => setOpen(!open)}
            >
                <ParagraphTitle center={[false, false]} light={dark}>
                    {title}
                </ParagraphTitle>
                <Bob>
                    <FeatherIcon
                        color={dark ? "var(--white)" : ""}
                        size={32}
                        name={open ? "chevron-up" : "chevron-down"}
                    />
                </Bob>
            </Flex>
            <Description open={open}>
                <Subtitle light={dark}>{description}</Subtitle>
            </Description>
        </VoiceWrapper>
    );
};

Voice.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    dark: PropTypes.bool
};

export default Voice;
