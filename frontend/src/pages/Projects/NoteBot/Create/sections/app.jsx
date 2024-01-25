import React, {useEffect, useState} from "react";
import {Divider, Grid, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import TextFieldsIcon from "@mui/icons-material/TextFields.js";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf.js";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary.js";
import {LayoutSelector} from "../LayoutSelector.jsx";
import Section from "./section.jsx";

export default function Sections ({counter, addSection}) {
    const [isLayoutSelectorVisible, setLayoutSelectorVisible] = React.useState(true);

    const [selectedLayout, setSelectedLayout] = React.useState(null);
    const handleLayoutSelect = (columns) => {
        setSelectedLayout(columns);
    };

    const [textFieldContent, setTextFieldContent] = React.useState(""); // Hinzugefügt

    const handleTextIconClick = () => {
        // Fügen Sie hier die Aktion für das Text-Icon hinzu
        console.log("Text Icon clicked");
        setTextFieldContent("");
    };

    const handleShowLayoutSelector = () => {
        addSection();
    };

    return (<div>
        {Array(counter).fill().map((_, index) => (
            <Section key={index} />
        ))}
        <Button onClick={handleShowLayoutSelector}>Create New Layout</Button>
    </div>)
};