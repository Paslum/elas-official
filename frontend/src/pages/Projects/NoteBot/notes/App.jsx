import * as React from "react";
import Note from "./note";
import Stack from "@mui/material/Stack";
import {useEffect, useState} from "react";


export default function app() {
    return (
        <div>
            <Stack direction="row" spacing={2}>
                {(function notes() {
                    let noteAmount = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
                    let notes = [];
                    for (let i = 0; i < noteAmount; i++) {
                        notes.push(<Note />);
                    }
                    return notes;
                })()}
            </Stack>
        </div>
    );
}