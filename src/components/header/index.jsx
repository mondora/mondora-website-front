import React from "react";

import PropTypes from "prop-types";

import Divider from "../divider";
import Section from "../section";
import MaxWidthContainer from "../max-width-container";
import BackgroundStripe from "../background-stripe";
import FullWidthImage from "../full-width-image";
import AstText from "../ast-text";
import SquareButton from "../square-button";

const Header = ({
    left,
    right,
    rightImage,
    leftImage,
    leftButton,
    rightButton
}) => (
    <BackgroundStripe>
        <MaxWidthContainer>
            <Section header={true}>
                <Section.LeftContainer>
                    {left && <AstText data={left} />}
                    {leftImage && (
                        <FullWidthImage
                            fluid={leftImage.fluid}
                            alt={rightImage.title}
                        />
                    )}
                    {leftButton && (
                        <a href={leftButton.link}>
                            <SquareButton>{leftButton.text}</SquareButton>
                        </a>
                    )}
                </Section.LeftContainer>
                <Section.DividerContainer>
                    <Divider />
                </Section.DividerContainer>
                <Section.RightContainer>
                    {right && <AstText data={right} />}
                    {rightImage && (
                        <FullWidthImage
                            fluid={rightImage.fluid}
                            alt={rightImage.title}
                        />
                    )}
                    {rightButton && (
                        <a href={rightButton.link}>
                            <SquareButton>{rightButton.text}</SquareButton>
                        </a>
                    )}
                </Section.RightContainer>
            </Section>
        </MaxWidthContainer>
    </BackgroundStripe>
);

Header.propTypes = {
    left: PropTypes.object,
    right: PropTypes.object,
    rightImage: PropTypes.object,
    leftImage: PropTypes.object,
    leftButton: PropTypes.object,
    rightButton: PropTypes.object
};

export default Header;
