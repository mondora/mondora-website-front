import React from "react";
import { Section } from "../section";
import { useStaticQuery, graphql } from "gatsby";

const voices = [
    {
        key: "failure-party",
        title: "Failure party",
        description:
            "We are a team of explorers who are allowed to have Failure Parties when we try to learn something new and mess up."
    },
    {
        key: "passions",
        title: "Passions",
        description:
            "This mix of qualities and passions allows us to push boundaries and keep learning and innovating. So if you have a challenging project for us… bring it on!"
    },
    {
        key: "experimenting",
        title: "Experimenting",
        description:
            "Right now we are experimenting with, and would like to work more on: Machine Learning, Artificial Intelligence, Augmented Reality, Blockchain Technology...and more"
    }
];

const miniTitle = "Where are we dreaming of going together";
const title = "We love innovation, new technologies and new challenges";
const subtitle =
    "We are  a team of open-minded and kind people who always offer each other help to overcome obstacles and create cutting edge solutions to problems. ";
const WhereAreWeDreamingOfGoingTogether = () => {
    const { workingImage } = useStaticQuery(graphql`
        query {
            workingImage: file(relativePath: { eq: "working.png" }) {
                childImageSharp {
                    fluid {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    `);

    return (
        <Section
            image={workingImage.childImageSharp.fluid}
            miniTitle={miniTitle}
            title={title}
            subtitle={subtitle}
            voices={voices}
        />
    );
};

export default WhereAreWeDreamingOfGoingTogether;
