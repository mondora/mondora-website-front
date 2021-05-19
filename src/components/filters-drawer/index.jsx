import React from "react";
import PropTypes from "prop-types";

import Drawer from "../drawer";
import Button from "../button";

const FiltersDrawer = ({ visible, closeDrawer }) => (
    <Drawer width={"100%"} visible={visible}>
        <Button onClick={closeDrawer}>{"Close drawer"}</Button>
        {"Drawer content"}
    </Drawer>
);

FiltersDrawer.propTypes = {
    visible: PropTypes.bool,
    closeDrawer: PropTypes.func
};

export default FiltersDrawer;
