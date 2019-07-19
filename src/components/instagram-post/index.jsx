import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

const PostImage = styled.img`
    width: 100%;
    height: inherit;
    &>:hover{
        opacity: 0.4;
    }
`;

const InstagramPost = ({ node }) => {
    console.log(node);
    return (
        <a href={"https://www.instagram.com/p/" + node.id}>
            <PostImage src={node.original}/>
        </a>
    );
};

InstagramPost.propTypes = {
    node: PropTypes.object,
};

export default InstagramPost;
