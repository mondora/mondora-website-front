import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";
import { Box, Flex } from "reflexbox";

import ParagraphTitle from "../paragraph-title";
import Drawer from "../drawer";
import Button from "../button";
import FeatherIcon from "../feather-icon";

import ClearButton from "../algolia-widgets/clear-button";
import CustomRefinementList from "../algolia-widgets/refinement-list";

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

const Divider = styled.div`
    height: 0;
    width: 100%;
    margin: 8px 0 16px 0;
    border: 1px solid var(--black);
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
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
                <div key={i} style={{ overflow: "hidden" }}>
                    <ParagraphTitle>{field.label}</ParagraphTitle>
                    <Divider />
                    <CustomRefinementList
                        limit={20}
                        type={field.type}
                        attribute={field.field}
                        appearance={"mobile"}
                    />
                </div>
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
