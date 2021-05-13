import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

import SwirlSeparator from "../swirl-separator";

const EmployeeContainer = styled.div`
    background-color: white;
    margin: 20px;
    height: fit-content;
`;
const EmployeeImage = styled.img`
    width: 60%;
    margin: 16px 20% 0 20%;
    border-radius: 50%;
`;
const EmployeeName = styled.div`
    margin: 8px auto;
    font-weight: bold;
    font-size: 19pt;
`;
const EmployeeRole = styled.div`
    margin: 8px auto;
    font-size: 16pt;
    color: var(--text-dark-gray);
`;
const EmployeeDescription = styled.div`
    margin: 0 auto 16px auto;
    max-width: 80%;
    color: var(--text-dark-gray);
`;

const Employee = ({ image, name, role, description }) => (
    <EmployeeContainer>
        <EmployeeImage src={image} />
        <EmployeeName>{name}</EmployeeName>
        <EmployeeRole>{role}</EmployeeRole>
        <SwirlSeparator width={"40%"} margin={"auto"} />
        <EmployeeDescription>{description}</EmployeeDescription>
    </EmployeeContainer>
);
Employee.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    description: PropTypes.string
};
export default Employee;
