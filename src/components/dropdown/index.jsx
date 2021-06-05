import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import styled, { css } from "styled-components";

import FeatherIcon from "../feather-icon";

const Container = styled.div`
    margin: 12px 0;
    width: ${props => props.width || "160px"};
    position: relative;
`;
const Header = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 8px 8px;
    height: 40px;
    border: 1px solid var(--text-dark-black);
    background-color: var(--white);
`;

const Label = styled.div`
    font-size: 14px;
`;

const List = styled.div`
    position: absolute;
    top: 38px;
    transition: all ease 0.5s;
    overflow: hidden;
    width: calc(100% - 2px);
    ${props =>
        props.open
            ? css`
                  display: flex;
                  flex-direction: column;
                  align-items: flex-start;
                  max-height: 200px;
                  border: 1px solid var(--border-gray);
                  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
              `
            : css`
                  max-height: 0;
                  display: none;
              `}
`;

const Item = styled.span`
    height: 24px;
    width: 100%;
    padding: 8px;
    background-color: var(--white);
    &:hover {
        background-color: var(--text-light-gray);
    }
    &:focus {
        background-color: var(--text-light-gray);
    }
`;

const DropDown = ({ onSelect, items, width, label }) => {
    const [open, setOpen] = useState(false);
    const header = useRef();

    useEffect(() => {
        open
            ? document.addEventListener("mousedown", handleClickOutside)
            : document.removeEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    const handleClickOutside = e => {
        if (!header.current.contains(e.target)) setOpen(0);
    };
    const handleSelect = item => {
        setOpen(0);
        onSelect(item);
    };
    return (
        <Container role="listbox" width={width} ref={header}>
            <Header aria-haspopup="listbox" onClick={() => setOpen(!open)}>
                <Label>
                    {label || items.find(item => item.isRefined).label}
                </Label>
                <FeatherIcon
                    size={24}
                    name={open ? "chevron-up" : "chevron-down"}
                />
            </Header>
            <List tabindex="-1" open={open}>
                {items.map(item => (
                    <Item
                        role="option"
                        key={item.label}
                        onClick={() => handleSelect(item)}
                    >
                        <Label>{item.label}</Label>
                    </Item>
                ))}
            </List>
        </Container>
    );
};

DropDown.propTypes = {
    onSelect: PropTypes.func,
    width: PropTypes.string,
    label: PropTypes.string,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string,
            label: PropTypes.string
        })
    )
};

export default DropDown;
