import Grid from "@mui/material/Grid"; 
import {
  Button,
  ButtonBase,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material"; 
import styled from "@emotion/styled"; 

// Styling the Paper component using Emotion's styled
const Item = styled(Paper)({
  backgroundColor: "#A5A5A5", 
  padding: "8px", 
  textAlign: "center", 
  borderRadius: 0, 
  boxShadow: 0, 
  height: 60, 
  color: "#333", 
});

// Component for each layout item
export const LayoutItem = ({ columns, handle }) => {
  return (
    // Grid container for layout item
    <Grid
      container
      xs={12} // Taking full width on extra-small screens
      sx={{
        margin: 1, 
        width: 140, 
        p: 1, 
        ":hover": { // Hover effect styles
          boxShadow: 1, 
          backgroundColor: "#fff", 
          color: "#666", 
          borderRadius: 1, 
        },
      }}
      onClick={() => handle(columns)} 
    >
      {/* Mapping over columns array to render grid items */}
      {columns.map((column, index) => {
        return (
          // Grid item for each column
          <Grid item xs={column} key={index} sx={{padding: 0.5}}> 
            <Item /> 
          </Grid>
        );
      })}
    </Grid>
  );
};
