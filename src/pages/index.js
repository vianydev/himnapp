import * as React from "react";
import { Link, 
  // useStaticQuery, 
  graphql } from 'gatsby';

import Layout from "../components/layout";
import Seo from '../components/seo';

import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemButton,
  Checkbox,
  Typography
} from '@mui/material';

const IndexPage = ({ data }) => {
  // const data = useStaticQuery(graphql`
  //   query {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `);

  const [ checked, setChecked ] = React.useState([ 5 ]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [ ...checked ];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  return (
    <Layout pageTitle={"Home Page"} >
      <Container
        sx={{
          padding: "150px 0",
          margin: '0 auto',
          maxWidth: 560,
          bgcolor: 'background.paper'
        }}>
        <Box>
          <Typography variant='h1' mb={2}>Índice</Typography>
          <List
            sx={{
              bgcolor: 'background.paper',
              overflow: 'auto',
            }}>
            {data.allMdx.nodes.map((node) => {
              const labelId = `checkbox-list-secondary-label-${node.id}`;
              return (
                <ListItem
                  key={node.id}
                  secondaryAction={
                    <Checkbox
                      edge="end"
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                      onChange={handleToggle(node)}
                      checked={checked.indexOf(node) !== -1}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  }
                  disablePadding
                  divider
                >
                  <ListItemButton color='inherit'>
                    <Link
                      id={labelId}
                      to='/himno'
                      style={{
                        color: 'inherit',
                        textDecoration: 'none'
                      }} >
                      {`${node.frontmatter.title}`}
                    </Link>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query {
  allMdx(sort: {fields: frontmatter___slug, order: ASC}) {
    nodes {
      frontmatter {
        slug
        title
      }
      id
      excerpt
    }
  }
}
`
export const Head = () => <Seo title="Himnario" />
export default IndexPage;