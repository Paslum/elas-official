import React, {useEffect, useState} from "react";
import {Grid, Typography} from "@mui/material";
import {LayoutSelector} from "../LayoutSelector.jsx";
import Widgets from "./widgets/app.jsx";

export default function Section ({index, addLayout, addWidget, setWidgetContent}) {
    const [isLayoutSelectorVisible, setLayoutSelectorVisible] = React.useState(true);

    const [selectedLayout, setSelectedLayout] = React.useState(null);
    const handleLayoutSelect = (columns) => {
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
        {isLayoutSelectorVisible ? (
            <React.Fragment>
                {selectedLayout ? (
                    <Grid container alignItems="flex-start" sx={{
                        border: 1,
                        borderRadius: 2,
                        borderColor: '#ED7D31',
                        padding: 2,
                        marginTop: 2,
                    }}>
                        {selectedLayout.map((column, index) => (
                            <Widgets column={column} index={index} addWidget={handleAddWidget} setWidgetContent={handleSetWidgetContent}/>
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