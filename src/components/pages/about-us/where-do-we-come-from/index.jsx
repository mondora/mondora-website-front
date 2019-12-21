import React from "react";

import { useStaticQuery, graphql } from "gatsby";

import { Section } from "../section";

const voices = [
    {
        key: "the-name",
        title: "The name",
        description:
            "Someone advised them to simply use their surname as the company name, and that is how mondora was born. The brothers grew up in a rural village in Valtellina, in the italian alps and close to Switzerland."
    },
    {
        key: "farming-and-passion",
        title: "Farming and passion",
        description:
            "They learned a lot about farming and to this day they continue to share their passion and devotion to this noble art, so much that they have included a statement about helping local farmers in mondora’s official mission statement."
    },
    {
        key: "rules",
        title: "Rules",
        description:
            "Michele and Francesco also share an aversion for company hierarchies and rules, believing from the start that people who join the company should be treated as adults and trusted to take on tasks and responsibilities without supervision."
    }
];

const miniTitle = "WHERE DO WE COME FROM";
const title = "From 2002 to now";
const subtitle =
    "In 2002 two brothers, Michele and Francesco Mondora, decided to found a small company together with their respective wives, Sara and Lucia.";
const additionalText =
    "That’s why, as the company grew over the years, no one ever had office hours or a fixed office to be in every day. What we do have is a lot of responsibility... and freedom to make business decisions and talk to our customers.";

const WhereDoWeComeFrom = () => {
    const { brothersImage } = useStaticQuery(graphql`
        query {
            brothersImage: file(relativePath: { eq: "brothers.png" }) {
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
            image={brothersImage.childImageSharp.fluid}
            miniTitle={miniTitle}
            title={title}
            subtitle={subtitle}
            voices={voices}
            rightImage={true}
            dark={true}
            additionalText={additionalText}
        />
    );
};

export default WhereDoWeComeFrom;
