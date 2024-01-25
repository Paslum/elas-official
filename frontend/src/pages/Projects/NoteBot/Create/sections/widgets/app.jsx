import React from "react";
import TextField from "@mui/material/TextField";
import {Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import TextFieldsIcon from "@mui/icons-material/TextFields.js";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf.js";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary.js";

export default function Widgets ({column, index}) {
    const [textFieldContent, setTextFieldContent] = React.useState(""); // Hinzugefügt

    const [widgetType, setWidgetType] = React.useState("");

    const handleSetWidgetType = (type) => {
        setWidgetType(type);
    };

    return (
        <Grid item container xs={column} key={index} justifyContent="space-between" alignItems="center">
            {widgetType === "text" ? (
                <TextField
                    multiline
                    fullWidth
                    value={textFieldContent}
                    onChange={(e) => setTextFieldContent(e.target.value)}
                />
            ) : (
                <Grid item container alignItems="center" direction="column" xs sx={{
                    border: "dashed 2px",
                    borderRadius: 2,
                    borderColor: '#A5A5A5',
                }}>
                    <Grid item>
                        <Typography variant="h6">Choose a Widget</Typography>
                    </Grid>
                    <Grid item>
                        <Button onClick={() => handleSetWidgetType("text")}>
                            <TextFieldsIcon style={{ color: "Blue" }}/>
                        </Button>
                        <Button disabled="true">
                            <PictureAsPdfIcon/>
                        </Button>
                        <Button disabled="true">
                            <VideoLibraryIcon/>
                        </Button>
                    </Grid>
                </Grid>
            )}
        </Grid>
    )
};