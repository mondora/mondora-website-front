import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

const Container = styled.div`
    margin: 0 0 8px;
    color: var(--text-dark-black);
    font-weight: ${props => props.checked && "600"};
`;

const Checkbox = ({ checked, disabled, label, onChange, value }) => (
    <Container checked={checked}>
        <input
            checked={checked}
            disabled={disabled}
            name={label}
            onChange={onChange}
            type="checkbox"
            value={value}
        />
        <label htmlFor={label}>{label}</label>
    </Container>
);

Checkbox.propTypes = {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string
};

export default Checkbox;
