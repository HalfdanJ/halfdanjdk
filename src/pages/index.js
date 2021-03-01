import * as React from "react";
import { graphql } from "gatsby";
import Layout, { Section } from "../components/layout";
import styled from "styled-components";
import HoverVideoPlayer from "react-hover-video-player";

// styles
const Row = styled.a`
  display: flex;
  color: black;
  text-decoration: none;
  margin-bottom: 16px;

  /* > div {
    margin-right: 16px;
  } */

  &:hover {
    background: #fbfbfb;
  }
`;

const Preview = styled.div`
  overflow: hidden;
  /* border-radius: 4px; */
  height: 180px;
  width: 180px;
  flex-shrink: 0;

  @media (max-width: 580px) {
    height: 100px;
    width: 100px;
  }
`;

const ProjectDate = styled.div`
  margin-left: 32px;
  margin-right: 16px;
  /* color: #464646; */
  flex-shrink: 0;
  font-weight: 300;
  font-size: 0.8em;

  @media (max-width: 580px) {
    margin-left: 0px;
  }
`;

const ProjectTitle = styled.span`
  display: block;
`;
const ProjectClient = styled.span`
  display: block;
  font-weight: 300;
  font-size: 0.8em;
`;

const ProjectCategory = styled.h3`
  margin-top: 64px;
  font-weight: 400;
`;

const IntroSection = styled.div`
  a {
    color: black;
    text-decoration: none;
  }
  a:hover {
    color: #4e4e4e;
  }
`;

const ProjectDetails = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: 580px) {
    align-items: flex-start;
    flex-direction: column;
    margin-left: 16px;
    justify-content: center;
  }
`;

const getPreviewImage = (post, files) => {
  return files.find(
    (file) =>
      file.node.name === post && file.node.internal.mediaType.includes("image/")
  );
};

const getPreviewVideo = (post, files) => {
  return files.find(
    (file) =>
      file.node.name === post && file.node.internal.mediaType.includes("video/")
  );
};

// markup
const IndexPage = ({ data }) => {
  const rowRefs = React.useMemo(() => {
    // Array.from({ length: data.allMdx.edges.length }).map(() =>
    //   React.createRef()
    // ),
    const refs = {};
    for (const edge of data.allMdx.edges) {
      refs[edge.node.slug] = React.createRef();
    }
    return refs;
  }, [data.allMdx.edges]);

  const renderProjects = (projects) => {
    return projects.map((edge, i) => (
      <Row
        key={edge.node.slug}
        ref={rowRefs[edge.node.slug]}
        href={`${edge.node.slug}`}
      >
        <Preview>
          {getPreviewVideo(edge.node.fields.name, data.allFile.edges)?.node
            .publicURL ? (
            <HoverVideoPlayer
              style={{ width: "100%", height: "100%" }}
              restartOnPaused
              hoverTargetRef={rowRefs[edge.node.slug]}
              pausedOverlay={
                <img
                  style={{ width: "100%", height: "100%" }}
                  srcSet={
                    getPreviewImage(edge.node.fields.name, data.allFile.edges)
                      ?.node.childImageSharp.fixed.srcSet
                  }
                  alt=""
                />
              }
              videoSrc={
                getPreviewVideo(edge.node.fields.name, data.allFile.edges)?.node
                  .publicURL
              }
            />
          ) : (
            <img
              style={{ width: "100%", height: "100%" }}
              srcSet={
                getPreviewImage(edge.node.fields.name, data.allFile.edges)?.node
                  .childImageSharp.fixed.srcSet
              }
              alt=""
            />
          )}
        </Preview>

        <ProjectDetails>
          <ProjectDate>{edge.node.exports.metadata.date}</ProjectDate>

          <div>
            <ProjectTitle>{edge.node.exports.metadata.title}</ProjectTitle>

            <ProjectClient>{edge.node.exports.metadata.client}</ProjectClient>
          </div>
        </ProjectDetails>
      </Row>
    ));
  };

  return (
    <Layout>
      <Section>
        <IntroSection>
          <title>JONAS JONGEJAN</title>
          <h1>JONAS JONGEJAN</h1>
          <p>
            Hi, I'm a Creative Technologist currently working at the Google
            Creative Lab in New York.{" "}
            <a href="#web">
              I've worked on a wide range of projects there, often touching on
              making science and technology more accessible to everyone, or
              adding a little bit of delight to topics such as machine learning
              and ar.
            </a>
          </p>
          <p>
            <a href="#theatre">
              I previously worked on interactive video set designs for theatre
              and dance pieces, and created installations using video tracking,
              robots and lights.
            </a>{" "}
            <a href="#broadcast">
              Lastly, I worked for a few years for the Danish Broadcasting
              Corporation innovating on new ways of making graphics for the tv.
            </a>
          </p>
          <p>
            Want to reach me? <a href="https://twitter.com/halfdanj">twitter</a>{" "}
            | <a href="mailto:jonas@halfdanj.dk">email</a> |{" "}
            <a href="www.linkedin.com/in/halfdanj">linkedin</a>
          </p>
        </IntroSection>
      </Section>

      <Section>
        <ProjectCategory id="web">Web & Apps</ProjectCategory>
        {renderProjects(
          data.allMdx.edges.filter(
            (project) => project.node.exports.metadata.category === "web"
          )
        )}
        <ProjectCategory id="broadcast">TV & Broadcast</ProjectCategory>
        {renderProjects(
          data.allMdx.edges.filter(
            (project) => project.node.exports.metadata.category === "broadcast"
          )
        )}
        <ProjectCategory id="theatre">Theatre & Installations</ProjectCategory>
        {renderProjects(
          data.allMdx.edges.filter(
            (project) =>
              project.node.exports.metadata.category === "theatre" ||
              project.node.exports.metadata.category === "installation"
          )
        )}
      </Section>
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query MetadataQuery {
    allMdx(sort: { fields: [exports___metadata___date], order: DESC }) {
      edges {
        node {
          fields {
            name
          }
          exports {
            metadata {
              title
              client
              date(formatString: "MMM YYYY")
              category
            }
          }
          slug
        }
      }
    }
    allFile(filter: { sourceInstanceName: { eq: "previews" } }) {
      edges {
        node {
          publicURL
          childImageSharp {
            fixed(width: 180, height: 180) {
              ...GatsbyImageSharpFixed
            }
          }
          name
          internal {
            mediaType
          }
          sourceInstanceName
        }
      }
    }
  }
`;
