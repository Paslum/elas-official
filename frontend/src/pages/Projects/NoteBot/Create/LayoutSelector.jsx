import Grid from "@mui/material/Unstable_Grid2"; 
import { LayoutItem } from "./LayoutItem"; 

// Component for selecting layout
export function LayoutSelector({ onLayoutSelect }) {
  return (
    // Grid container for layout selector
    <Grid
      direction="row"
      sx={{
        backgroundColor: '#f0f0f0', 
        borderRadius: 3, 
        marginTop:'20px', 
        padding: 1 
      }}
    >
      {/* Header */}
      <Grid
        item
        margin={2}
        display={"flex"}
        justifyContent={"center"}
        alignContent={"center"}
      >
        Choose a Layout
      </Grid>
      {/* Grid items for layout options */}
      {/* Row 1 */}
      <Grid
        item
        container
        direction="row"
        justifyContent="center"
        alignContent={"center"}
      >
        <Grid item><LayoutItem columns={[12]} handle={onLayoutSelect}></LayoutItem></Grid> {/* Full width layout */}
        <Grid item><LayoutItem columns={[6, 6]} handle={onLayoutSelect}></LayoutItem></Grid> {/* Two columns layout */}
        <Grid item><LayoutItem columns={[8, 4]} handle={onLayoutSelect}></LayoutItem></Grid> {/* Two columns layout with different widths */}
        <Grid item><LayoutItem columns={[4, 8]} handle={onLayoutSelect}></LayoutItem></Grid> {/* Two columns layout with different widths */}
      </Grid>
      {/* Row 2 */}
      <Grid
        item
        container
        direction="row"
        justifyContent="center"
        alignContent={"center"}
      >
        <Grid item><LayoutItem columns={[4, 4, 4]} handle={onLayoutSelect}></LayoutItem></Grid> {/* Three columns layout with equal widths */}
        <Grid item><LayoutItem columns={[3, 6, 3]} handle={onLayoutSelect}></LayoutItem></Grid> {/* Three columns layout with different widths */}
        <Grid item><LayoutItem columns={[6, 3, 3]} handle={onLayoutSelect}></LayoutItem></Grid> {/* Three columns layout with different widths */}
        <Grid item><LayoutItem columns={[3, 3, 6]} handle={onLayoutSelect}></LayoutItem></Grid> {/* Three columns layout with different widths */}
      </Grid>
    </Grid>
  );
}
