import React from "react";

import styled from "styled-components";

import { Link } from "gatsby";

import Layout from "../../../components/layout";
import Employee from "../../../components/employee";

import Logo from "../../../../static/images/regions/Sondrio-graphic.png";
import ProfilePicture from "../../../../static/images/employees/User-profile.png"

const Container = styled.div`
    padding: 0 64px;
    margin-left: auto;
    display: grid;
    text-align: center;
    grid-template-columns: 1fr 32px 1fr;
    grid-column-gap: 16px;
    @media (max-width: 992px) {
        grid-template-columns: 1fr;
    }
`;
const Divider = styled.div`
    height: 100%;
    width: 100%;
    position: relative;
    top: 16px;
`;
const Line = styled.div`
    border: 1px solid black;
    @media (min-width: 992px) {
        margin: 0 auto;
        width: 0;
        height: 100%;
    }
    @media (max-width: 992px) {
        margin: 24px 10%;
        height: 0;
        width: 80%;
    }
`;
const Circle = styled.div`
    border: 2px solid black;
    width: 28px;
    border-radius: 100%;
    height: 28px;
    @media (max-width: 992px) {
        display: none;
    }
`;
const LeftParagraph = styled.div`
    text-align: left;
    align-items: left;
    margin-top: 24px;
    margin-bottom: 40px;
    @media (max-width: 992px) {
        text-align: center;
    }
`;
const Button = styled(Link)`
    color: var(--black);
    display: block;
    width: fit-content;
    background-color: var(--primary);
    padding: 2%;
    margin: 16px;
    text-decoration: none;
    text-align: center;
`;
const LeftTitle = styled.h1`
    margin: 24px 16px;
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
        <Container>
            <LeftParagraph>
                <Button to={"meet-the-team"}>{"‹ BACK TO LIST"}</Button>
                <LeftTitle>{"Italy/Sondrio"}</LeftTitle>
            </LeftParagraph>
            <Divider>
                <Line></Line>
                <Circle></Circle>
            </Divider>
            <RightParagraph>
                <RegionImage src={Logo} />
            </RightParagraph>
        </Container>
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
