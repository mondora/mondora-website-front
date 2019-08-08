import React from "react";

import styled from "styled-components";

import { Link } from "gatsby";

import Layout from "../../../components/layout";
import Employee from "../../../components/employee";
import SquareButton from "../../../components/square-button";
import Section from "../../../components/section";

import Logo from "../../../../static/images/regions/Sondrio-graphic.png";
import ProfilePicture from "../../../../static/images/employees/User-profile.png";

const LeftParagraph = styled.div`
    text-align: left;
    align-items: left;
    margin: 24px 0 40px 80px;
    @media (max-width: 992px) {
        text-align: center;
    }
`;
const LeftTitle = styled.h1`
    margin: 24px 0;
    font-size: 24pt;
`;
const RightParagraph = styled.div`
    text-align: center;
    margin: 0 16px;
`;
const RegionImage = styled.img`
    width: 60%;
    margin: 0 20%;
`;
const ContainerEmployees = styled.div`
    height: fit-content;
    padding: 64px 240px;
    text-align: center;
    background: var(--variant-lightgray);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    @media (max-width: 992px) {
        grid-template-columns: 1fr 1fr;
    }
`;

const Employees = [
    {
        image: ProfilePicture,
        name: "User",
        role: "DEVELOPER",
        description: "Lorem ipsun dolor sit amet consestetour siartu es"
    },
    {
        image: ProfilePicture,
        name: "User",
        role: "DEVELOPER",
        description: "Lorem ipsun dolor sit amet consestetour siartu es"
    },
    {
        image: ProfilePicture,
        name: "User",
        role: "DEVELOPER",
        description: "Lorem ipsun dolor sit amet consestetour siartu es"
    },
    {
        image: ProfilePicture,
        name: "User",
        role: "DEVELOPER",
        description: "Lorem ipsun dolor sit amet consestetour siartu es"
    },
    {
        image: ProfilePicture,
        name: "User",
        role: "DEVELOPER",
        description: "Lorem ipsun dolor sit amet consestetour siartu es"
    },
    {
        image: ProfilePicture,
        name: "User",
        role: "DEVELOPER",
        description: "Lorem ipsun dolor sit amet consestetour siartu es"
    },
    {
        image: ProfilePicture,
        name: "User",
        role: "DEVELOPER",
        description: "Lorem ipsun dolor sit amet consestetour siartu es"
    }
];

const Region = () => (
    <Layout>
        <Section style="margin-bottom: 0;" position={"below"} offset={"32px"} margin={"40px 24px 0 24px"}>
            <LeftParagraph>
                <Link to={"meet-the-team"}>
                    <SquareButton>{"‹ BACK TO LIST"}</SquareButton>
                </Link>
                <LeftTitle>{"Italy/Sondrio"}</LeftTitle>
            </LeftParagraph>
            <RightParagraph>
                <RegionImage src={Logo} />
            </RightParagraph>
        </Section>
        <ContainerEmployees>
            {Employees.map(employee => (
                <Employee
                    image={employee.image}
                    name={employee.name}
                    role={employee.role}
                    description={employee.description}
                ></Employee>
            ))}
        </ContainerEmployees>
    </Layout>
);

export default Region;
