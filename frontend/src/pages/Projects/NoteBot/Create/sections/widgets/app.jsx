import React from "react";
import TextField from "@mui/material/TextField";
import {Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import TextFieldsIcon from "@mui/icons-material/TextFields.js";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf.js";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary.js";

// Widgets component responsible for rendering widgets in a specific column
export default function Widgets({column, index, addWidget, setWidgetContent, initialWidget={data: "", type: ""}}) {
    const [textFieldContent, setTextFieldContent] = React.useState(initialWidget.data); // State for text field content
    const [widgetType, setWidgetType] = React.useState(initialWidget.type); // State for widget type

    // Function to set widget type and add widget
    const handleSetWidgetType = (type) => {
        setWidgetType(type);
        addWidget(index, type, textFieldContent);
    };

    // Function to set text field content and set widget content
    const handleSetTextFieldContent = (text) => {
        setTextFieldContent(text);
        setWidgetContent(index, text);
    };

    return (
        <Grid item container xs={column} key={index} justifyContent="space-between" alignItems="center">
            {widgetType === "text" ? (
                // Render text field if widget type is text
                <TextField
                    multiline
                    fullWidth
                    value={textFieldContent}
                    onChange={(e) => handleSetTextFieldContent(e.target.value)}
                />
            ) : (
                // Render widget options if widget type is not text
                <Grid item container alignItems="center" direction="column" xs sx={{
                    border: "dashed 2px",
                    borderRadius: 2,
                    borderColor: '#A5A5A5',
                }}>
                    <Grid item>
                        <Typography variant="h6">Choose a Widget</Typography>
                    </Grid>
                    <Grid item>
                        {/* Button to select text widget */}
                        <Button onClick={() => handleSetWidgetType("text")}>
                            <TextFieldsIcon style={{ color: "Blue" }}/>
                        </Button>
                        {/* Disabled buttons for other widget options */}
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
    );
}
