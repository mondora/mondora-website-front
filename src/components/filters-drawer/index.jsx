import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";
import { Box, Flex } from "reflexbox";

import Drawer from "../drawer";
import Button from "../button";
import FeatherIcon from "../feather-icon";
import HiddenFilter from "../hidden-filter";

import ClearButton from "../algolia-widgets/clear-button";

const Header = styled(Flex)`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: var(--background-light-gray);
    padding: 16px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Footer = styled(Flex)`
    position: absolute;
    bottom: 0;
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    background-color: var(--background-light-gray);
    padding: 16px;
    box-shadow: -2px -2px -4px rgba(0, 0, 0, 0.3);
`;

const FiltersDrawer = ({ visible, closeDrawer, fields }) => (
    <Drawer width={"100%"} visible={visible}>
        <Header>
            <Box onClick={closeDrawer}>
                <FeatherIcon size={32} name="chevron-left" />
            </Box>
            <ClearButton label={fields.clear} />
        </Header>
        <Flex p={4} flexDirection="column">
            {fields.contentfulfields.map((field, i) => (
                <HiddenFilter key={i} field={field} />
            ))}
        </Flex>

        <Footer>
            <Button onClick={closeDrawer}>{"Show results"}</Button>
        </Footer>
    </Drawer>
);

FiltersDrawer.propTypes = {
    visible: PropTypes.bool,
    closeDrawer: PropTypes.func,
    fields: PropTypes.object
};

export default FiltersDrawer;
