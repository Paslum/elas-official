import React, {useEffect, useState} from "react";
import {Grid, Typography} from "@mui/material";
import {LayoutSelector} from "../LayoutSelector.jsx";
import Widgets from "./widgets/app.jsx";

// Section component responsible for rendering a section with a specific layout
export default function Section({index, addLayout, addWidget, setWidgetContent, initialSection = {layout: [], widget: []}}) {
    // State to manage visibility of layout selector
    const [isLayoutSelectorVisible, setLayoutSelectorVisible] = React.useState(initialSection.layout.length === 0);

    // State to manage selected layout
    const [selectedLayout, setSelectedLayout] = React.useState(initialSection.layout);

    // Function to handle layout selection
    const handleLayoutSelect = (columns) => {
        setLayoutSelectorVisible(false);
        setSelectedLayout(columns);
        addLayout(index, columns);
    };

    // Function to handle adding a widget
    const handleAddWidget = (indexWidget, type, data) => {
        addWidget(indexWidget, type, index, data)
    };

    // Function to handle setting widget content
    const handleSetWidgetContent = (indexWidget, data) => {
        setWidgetContent(indexWidget, data, index)
    };

    return (
        <div>
            <React.Fragment>
                {/* Render layout selector if layout is not selected */}
                {isLayoutSelectorVisible || selectedLayout.length === 0 ? (
                    <LayoutSelector onLayoutSelect={handleLayoutSelect} />
                ) : (
                    // Render widgets based on selected layout
                    <Grid container alignItems="flex-start" sx={{
                        border: 1,
                        borderRadius: 2,
                        borderColor: '#ED7D31',
                        padding: 2,
                        marginTop: 2,
                    }}>
                        {selectedLayout.map((column, index) => (
                            <Widgets key={index} column={column} index={index} addWidget={handleAddWidget} setWidgetContent={handleSetWidgetContent} initialWidget={initialSection.widget[index]}/>
                        ))}
                    </Grid>
                )}
            </React.Fragment>
        </div>
    )
};
