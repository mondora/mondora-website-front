import React from "react";

import PropTypes from "prop-types";

import rehypeReact from "rehype-react";
import styled from "styled-components";

import Subtitle from "../subtitle";
import Title from "../title";
import JumboTitle from "../jumbo-title";

const Detail = styled.li`
    margin: 8px;
`;
const marginSubtitle = styled(Subtitle)`
    margin: 32px 0 32px 0;
`;
const CenterTitle = styled(Title)`
    text-align: center;
`;
const centerSubtitle = styled(marginSubtitle)`
    text-align: center;
`;

const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: {
        li: Detail,
        h1: JumboTitle,
        h2: Title,
        h3: CenterTitle,
        p: marginSubtitle,
        em: centerSubtitle
    }
}).Compiler;

const AstText = ({ data }) => <>{renderAst(data)}</>;

AstText.propTypes = {
    data: PropTypes.object
};

export default AstText;
