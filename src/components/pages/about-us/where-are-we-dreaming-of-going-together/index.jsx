import React from "react";
import { Section } from "../section";
import { useStaticQuery, graphql } from "gatsby";

const voices = [
    {
        key: "our-methodologies",
        title: "Our Methodologies",
        description:
            "We have been working with Agile Methodologies and Scrum since 2002 and many of us have Scrum Master and Product Owner certifications as well as being expert Scrum Developers - which means we are able to navigate complex projects and reach amazing results by collaborating with you!"
    },
    {
        key: "innovative-technologies",
        title: "Innovative technologies",
        description:
            "As a team, we have been developing cloud applications since 2007 and have gained valuable experience in these past years of work. We are strongly focused on innovation and emerging technologies and are always eager to test new things… and celebrate with a party when we fail ;)"
    },
    {
        key: "structure",
        title: "Structure",
        description:
            "Keeping in mind that we are a self-managed, flat structured B corporation (that’s a lot of stuff) we cannot develop solutions that don’t make an impact, so benefit by design is a must-have in all our applications… as well as opting for open source as often as we can."
    }
];

const miniTitle = "WHO WE ARE";
const title = "Mondora, a really diverse group";
const subtitle =
    "We are a passionate and dedicated team of over 60 full-stack software developers, UX designers, system administrators… and a few farmers!";


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
