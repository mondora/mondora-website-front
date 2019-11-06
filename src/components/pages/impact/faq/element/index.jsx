import React, { useState } from "react";
import PropTypes from "prop-types";

import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Grid from "../../../../grid";
import { QuestionGrid, Icon, Answer } from "./styled";

const Element = ({ question, answer }) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <Grid container onClick={handleClick} xs={12} jusitfy="center">
            <QuestionGrid
                item
                container
                justify="space-between"
                align="center"
                xs={12}
                open={open}
            >
                <Grid item xs={11}>
                    {question}
                </Grid>
                <Grid item xs={1} justify="flex-end">
                    <Icon icon={faAngleDown} open={open} />
                </Grid>
            </QuestionGrid>
            <Answer item open={open} xs={12}>
                {answer}
            </Answer>
        </Grid>
    );
};

Element.propTypes = {
    question: PropTypes.string,
    answer: PropTypes.string
};

export default Element;
