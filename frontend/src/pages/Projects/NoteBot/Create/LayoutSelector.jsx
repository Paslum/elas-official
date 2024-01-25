import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { LayoutItem } from "./LayoutItem";

export function LayoutSelector({ onLayoutSelect }) {
  return (
    <Grid direction="row"
      sx={{
        backgroundColor: '#f0f0f0', borderRadius: 3, marginTop:'20px', padding: 1
      }}
    >
      <Grid item
        margin={2}
        display={"flex"}
        justifyContent={"center"}
        alignContent={"center"}
      >
        Choose a Layout
      </Grid>
      <Grid item container direction="row" justifyContent="center" alignContent={"center"}>
        <Grid item><LayoutItem columns={[12]} handle={onLayoutSelect}></LayoutItem></Grid>
        <Grid item><LayoutItem columns={[6, 6]} handle={onLayoutSelect}></LayoutItem></Grid>
        <Grid item><LayoutItem columns={[8, 4]} handle={onLayoutSelect}></LayoutItem></Grid>
        <Grid item><LayoutItem columns={[4, 8]} handle={onLayoutSelect}></LayoutItem></Grid>
      </Grid>
      <Grid item container direction="row" justifyContent="center" alignContent={"center"}>
        <Grid item><LayoutItem columns={[4, 4, 4]} handle={onLayoutSelect}></LayoutItem></Grid>
        <Grid item><LayoutItem columns={[3, 6, 3]} handle={onLayoutSelect}></LayoutItem></Grid>
        <Grid item><LayoutItem columns={[6, 3, 3]} handle={onLayoutSelect}></LayoutItem></Grid>
        <Grid item><LayoutItem columns={[3, 3, 6]} handle={onLayoutSelect}></LayoutItem></Grid>
      </Grid>
    </Grid>
  );
}
