import React, { useLayoutEffect } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { Box } from "reflexbox/styled-components";

const placements = {
    left: "left",
    right: "right"
};

const Container = styled(Box)`
    background-color: var(--white);
    min-height: 100vh;
    min-height: -webkit-fill-available;
    overflow-y: scroll;
    position: fixed;
    z-index: 100;
    top: 0;
    bottom: 0;
    left: ${({ placement }) => placement === placements.left && "0"};
    right: ${({ placement }) => placement === placements.right && "0"};

    transition: transform 0.3s ease-in-out;

    ${({ placement, visible }) => {
        if (!visible) {
            switch (placement) {
                case placements.left:
                    return `
                        transform: translateX(-100%)
                `;
                case placements.right:
                    return `
                        transform: translateX(100%)
                `;
                default:
                    return;
            }
        } else {
            return `
                transform: translateX(0)
        `;
        }
    }}
`;

const Overlay = styled.div`
    transition: all 0.3s ease;
    ${({ visible }) =>
        visible
            ? css`
                  opacity: 1;
                  position: fixed;
                  top: 0;
                  left: 0;
                  bottom: 0;
                  right: 0;
                  z-index: 90;
                  background: rgba(0, 0, 0, 0.2);
              `
            : css`
                  opacity: 0;
              `};
`;

const Drawer = ({ children, placement, visible, width }) => {
    useLayoutEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;

        if (visible) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = originalStyle;
        }

        return () => (document.body.style.overflow = originalStyle);
    }, [visible]);

    return (
        <>
            <Container
                visible={visible}
                width={width}
                placement={placement}
                aria-hidden={!visible}
            >
                {children}
            </Container>
            <Overlay visible={visible} aria-hidden={!visible} />
        </>
    );
};

Drawer.propTypes = {
    children: PropTypes.node,
    placement: PropTypes.oneOf([placements.left, placements.right]),
    visible: PropTypes.bool,
    width: PropTypes.any
};

Drawer.defaultProps = {
    placement: placements.left,
    visible: false,
    width: "50%"
};

export default Drawer;
