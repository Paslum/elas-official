import * as React from "react";
import Note from "./note";
import Stack from "@mui/material/Stack";
import {useEffect, useState} from "react";
import {getUserInfo} from "../utils/api.js";


export default function app( {notes}) {
    return (
        <div>
            <Stack direction="row" spacing={2}>

                {(function noteLoader() {
                    let notesArr = [];
                    for (let i = 0; i < notes.length; i++) {
                        notesArr.push(<Note noteId={notes[i]}/>);
                    }
                    return notesArr;
                })()}
            </Stack>
        </div>
    );
}