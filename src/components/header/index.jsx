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
                    {leftButton && (
                        <a href={leftButton.link}>
                            <SquareButton margin="24px 0">
                                {leftButton.text}
                            </SquareButton>
                        </a>
                    )}
                    {left && <AstText data={left} />}
                    {leftImage && (
                        <FullWidthImage
                            fluid={leftImage.fluid}
                            alt={rightImage.title}
                        />
                    )}
                </Section.LeftContainer>
                <Section.DividerContainer>
                    <Divider />
                </Section.DividerContainer>
                <Section.RightContainer>
                    {rightButton && (
                        <a href={rightButton.link}>
                            <SquareButton margin="24px 0">
                                {rightButton.text}
                            </SquareButton>
                        </a>
                    )}
                    {right && <AstText data={right} />}
                    {rightImage && (
                        <FullWidthImage
                            fluid={rightImage.fluid}
                            alt={rightImage.title}
                        />
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
