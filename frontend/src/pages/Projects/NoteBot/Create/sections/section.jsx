import React, {useEffect, useState} from "react";
import {Grid, Typography} from "@mui/material";
import {LayoutSelector} from "../LayoutSelector.jsx";
import Widgets from "./widgets/app.jsx";

export default function Section ({index, addLayout, addWidget, setWidgetContent, initialSection = {layout: [], widget: []}}) {
    const [isLayoutSelectorVisible, setLayoutSelectorVisible] = React.useState(initialSection.layout.length === 0);

    const [selectedLayout, setSelectedLayout] = React.useState(initialSection.layout);
    const handleLayoutSelect = (columns) => {
        setLayoutSelectorVisible(false);
        setSelectedLayout(columns);
        addLayout(index, columns);
    };

    const handleAddWidget = (indexWidget, type, data) => {
        addWidget(indexWidget, type, index, data)
    };

    const handleSetWidgetContent = (indexWidget, data) => {
        setWidgetContent(indexWidget, data, index)
    };

    return (<div>
        {isLayoutSelectorVisible === false ? (
            <React.Fragment>
                {selectedLayout.length > 0 ? (
                    <Grid container alignItems="flex-start" sx={{
                        border: 1,
                        borderRadius: 2,
                        borderColor: '#ED7D31',
                        padding: 2,
                        marginTop: 2,
                    }}>
                        {selectedLayout.map((column, index) => (
                            <Widgets column={column} index={index} addWidget={handleAddWidget} setWidgetContent={handleSetWidgetContent} initialWidget={initialSection.widget[index]}/>
                        ))}
                    </Grid>
                ) : (
                    <LayoutSelector onLayoutSelect={handleLayoutSelect} />
                )}
            </React.Fragment>
        ) : (
            <LayoutSelector onLayoutSelect={handleLayoutSelect} />
        )}
    </div>)
};