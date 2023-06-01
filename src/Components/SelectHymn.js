import * as React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { useLocation } from "@reach/router";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Box,
  Button,
  ButtonGroup,
  MenuItem,
  MenuList,
  DialogTitle,
  Dialog,
  DialogContent
} from "@mui/material";


const SimpleDialog = ({ onClose, open, hymnNumber }) => {
  const data = useStaticQuery(graphql`
    query {
  allMdx(sort: {frontmatter: {order: ASC}}) {
    nodes {
      frontmatter {
        title
        slug
        order
      }
      id
    }
  }}`);
  
  return (
    <Dialog onClick={() => onClose()} open={open} fullWidth>
      <DialogTitle id="responsive-dialog-title" sx={{ px: 1 }}>{"Selecciona un himno:"}</DialogTitle>
      <DialogContent sx={{ p: 1, }}  >
        <MenuList
          id="split-button-menu"
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "5px", 
          }}
        >
          {
            data.allMdx.nodes.map((node) => {
            const index = '/himno/' + node.frontmatter.slug; 
            
              if (index === "/himno/0") {
              return (
                <MenuItem
                  key={node.id}
                  disableGutters
                  sx={{
                    textAlign: "center",
                    justifyContent: "center",
                    border: "1px solid gray",
                    borderRadius: "5px",
                  }}
                  // component={Link}
                  // to={"/"}
                >
                  <SearchIcon color="disabled" />
                </MenuItem>
              );
            } else {
              return (
                <MenuItem
                  key={node.id}
                  disableGutters
                  sx={{
                    textAlign: "center",
                    justifyContent: "center",
                    border: "1px solid gray",
                    borderRadius: "5px",
                  }}
                  component={Link}
                  to={`/himno/${node.frontmatter.slug}`}
                  activeStyle={{ backgroundColor: "#CC3945"}}
                >
                  {node.frontmatter.slug}
                </MenuItem>
              );
            }})
          }
        </MenuList>
      </DialogContent>
    </Dialog>
  )
}

function SelectHymn() {
  const location = useLocation();
  const pathURL = location.pathname.split("/");
  const hymnNumber = pathURL.filter(item => item !== "himno" && item !== "").join();


  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClosed = () => {
    setOpen(false);
  };

  return (
    <Box>
      <ButtonGroup color="neutral" variant="outlined" size="small">
        <Button
          size="small"
          sx={{
            width: "280px",
            justifyContent: "space-between",
          }}
          onClick={handleToggle}
        >
          {pathURL.includes("himno") ? "Himno "+  hymnNumber : "Buscar himno" }
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <SimpleDialog
        open={open}
        onClose={handleClosed}
      />
    </Box>
  );
}

export default SelectHymn;