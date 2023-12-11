import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import FavoriteIcon from "@mui/icons-material/FavoriteBorderOutlined";

export default function note() {
    return (
        <Card
            sx={{
                width: 333,
                height: 220,
                backgroundColor: "rgba(217, 217, 217, 0.3)",
            }}
        >
            <React.Fragment>
                <IconButton aria-label="Note Settings" sx={{ float: "right" }}>
                    <SettingsIcon />
                </IconButton>
                <CardContent sx={{ height: "333 - 2em" }}>
                    <Typography
                        variant="subtitle1"
                        component="h2"
                        sx={{
                            fontWeight: "bold",
                            color: "#4472C4",
                            padding: "60px",
                            textAlign: "center",
                        }}
                    >
                        My Note #{Math.floor(Math.random() * (99 - 1 + 1)) + 1}
                    </Typography>
                </CardContent>
                <IconButton aria-label="Favor Note" style={{ float: "left" }}>
                    <FavoriteIcon sx={{ color: "red" }} />
                </IconButton>
                <IconButton aria-label="Delete Note" style={{ float: "right" }}>
                    <DeleteIcon />
                </IconButton>
            </React.Fragment>
        </Card>
    );
}
