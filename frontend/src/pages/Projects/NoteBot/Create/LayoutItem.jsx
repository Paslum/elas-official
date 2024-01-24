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

const Item = styled(Paper)({
  backgroundColor: "#A5A5A5", // Platzhalterfarbe für den Dunkelmodus
  padding: "8px", // Platzhalterabstand
  textAlign: "center",
  borderRadius: 0,
  boxShadow: 0,
  height: 60,
  color: "#333", // Platzhaltertextfarbe
});

export const LayoutItem = ({ columns, handle }) => {
  return (
    <Grid
      container
      xs={12}
      spacing={1}
      sx={{
        margin: 1,
        width: 140,
        p: 1,
        ":hover": {
          boxShadow: 1,
          backgroundColor: "#fff", // Platzhalterfarbe für den Hintergrund im Hover-Zustand
          color: "#666", // Platzhaltertextfarbe im Hover-Zustand
          borderRadius: 1,
        },
      }}
      onClick={() => handle(columns)}
    >
      {columns.map((column, index) => {
        return (
          <Grid item xs={column} key={index}>
            <Item />
          </Grid>
        );
      })}
    </Grid>
  );
};
