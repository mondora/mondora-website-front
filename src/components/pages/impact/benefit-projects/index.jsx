import React from "react";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import Grid from "../../../grid";
import Title from "../../../title";
import { CustomSlider, Arrow } from "./styled";
import { useStaticQuery, graphql } from "gatsby";
import Slide from "./slide";

const BenefitProjects = () => {
    const {
        hireBittoImage,
        cycle2WorkImage,
        farmingImage
    } = useStaticQuery(graphql`
        query {
            hireBittoImage: file(relativePath: { eq: "hirebitto.png" }) {
                childImageSharp {
                    fluid {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
            cycle2WorkImage: file(relativePath: { eq: "cycle-2-work.png" }) {
                childImageSharp {
                    fluid {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
            farmingImage: file(relativePath: { eq: "farming.png" }) {
                childImageSharp {
                    fluid {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    `);

    const projects = [
        {
            title: "HireBitto",
            miniTitle: "EACH ONE OF US IS RESPONSIBLE",
            description:
                "HireBitto is a project which benefits local farmers and cheesemakers who choose to work with traditional methods, without the use of chemicals or industrial machinery. For every new employee, the company buys a wheel of Storico Ribelle cheese. Once matured, the cheese is auctioned and the earnings are reinvested in the community. The cheese is paid for by mondora, but it belongs to the community. The employee is responsible for this benefit creation process.",
            image: hireBittoImage.childImageSharp.fluid,
            link: "http://www.hirebitto.com/"
        },
        {
            title: "Cycle2Work",
            miniTitle: "FOR A HEALTHIER, HAPPIER WORLD",
            description:
                "Cycle2Work.io is an app that rewards employees for commuting to work, whilst safeguarding the environment. It’s connected to the app Strava, where people can join their company team and earn € 0.20/km for cycling rather than driving to the office, as well as saving an average of 4.32 kg of CO2 each day! If you would like your company to take part in the programme, get in touch! ",
            image: cycle2WorkImage.childImageSharp.fluid,
            link: "https://cycle2work.io/"
        },
        {
            title: "Farming",
            miniTitle: "UNDERSTAND LOREM IPUSM",
            description: "Lorem ipsum dolor sit amet",
            image: farmingImage.childImageSharp.fluid,
            link: "https://www.officinadellaterra.it/"
        }
    ];

    return (
        <Grid
            container
            direction="column"
            align="center"
            spacingRatio={8}
            xs={12}
        >
            <Grid item>
                <Title big>Benefit projects</Title>
            </Grid>
            <Grid item>
                <CustomSlider
                    swipeToSlide
                    speed={500}
                    nextArrow={<Arrow icon={faAngleRight} />}
                    prevArrow={<Arrow icon={faAngleLeft} />}
                >
                    {projects.map(
                        ({ image, title, miniTitle, description, link }, i) => (
                            <Slide
                                key={i}
                                image={image}
                                title={title}
                                miniTitle={miniTitle}
                                link={link}
                                description={description}
                            />
                        )
                    )}
                </CustomSlider>
            </Grid>
        </Grid>
    );
};

export default BenefitProjects;
