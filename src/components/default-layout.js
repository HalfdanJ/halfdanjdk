import React from "react";
import Layout, { Section } from "./layout";
import styled from "styled-components";

export default function Post(props) {
  const metadata = props.metadata;

  const BackBtn = styled.a`
    text-decoration: none;
    color: #313131;
    margin-top: 0;
    position: relative;
    top: -8px;

    &:hover {
      color: black;
    }
  `;

  const Byline = styled.div`
    position: relative;
    top: -12px;
    font-weight: 300;
    margin-bottom: 8px;
  `;

  return (
    <Layout>
      <Section>
        <h1>JONAS JONGEJAN</h1>
        <BackBtn href="/">
          <span role="img">👈</span> Back to all work
        </BackBtn>
      </Section>
      <Section style={{ marginTop: "32px" }}>
        <h2>{metadata.title}</h2>
        <Byline>{metadata.client}</Byline>
        {/* <MDXProvider components={shortcodes}> */}
        {/* <MDXRenderer>{post.body}</MDXRenderer> */}
        {props.children}
        {/* </MDXProvider> */}
      </Section>
    </Layout>
  );
}
