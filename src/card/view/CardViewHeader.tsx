import React, { useEffect } from "react";
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExit from '@material-ui/icons/FullscreenExit';
import { TextField } from "@material-ui/core";
import debounce from 'lodash/debounce';
import { useCallback } from 'react';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import DragHandleIcon from '@material-ui/icons/DragHandle';
const NeoCardViewHeader = ({ title, editable, onTitleUpdate, fullscreenEnabled, onToggleCardSettings, onToggleCardExpand, expanded }) => {
    const [text, setText] = React.useState(title);

    // Ensure that we only trigger a text update event after the user has stopped typing.
    const debouncedTitleUpdate = useCallback(
        debounce(onTitleUpdate, 250),
        [],
    );

    useEffect(() => {
        // Reset text to the dashboard state when the page gets reorganized.
        if (text !== title) {
            setText(title);
        }
    }, [title])

    const cardTitle = <>
        <table>
            <tbody>
                <tr>
                    {editable ? <td>
                        <DragIndicatorIcon className="drag-handle" style={{ color: "grey", cursor: "pointer", marginLeft: "-10px", marginRight: "10px" }}></DragIndicatorIcon>
                    </td> : <></>}
                    <td style={{ width: "100%" }}>
                        <TextField
                            id="standard-outlined"
                            className={"no-underline large"}
                            label=""
                            disabled={!editable}
                            placeholder="Report name..."
                            fullWidth
                            maxRows={4}
                            value={text}
                            onChange={(event) => {
                                setText(event.target.value);
                                debouncedTitleUpdate(event.target.value);
                            }}
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    </>

    const settingsButton = <IconButton aria-label="settings"
        onClick={onToggleCardSettings}>
        <MoreVertIcon />
    </IconButton>

    const maximizeButton = <IconButton aria-label="maximize"
        onClick={onToggleCardExpand}>
        <FullscreenIcon />
    </IconButton>

    const unMaximizeButton = <IconButton aria-label="un-maximize"
        onClick={onToggleCardExpand}>
        <FullscreenExit />
    </IconButton>

    return <CardHeader style={{ height: "72px" }}
        action={<>
            {fullscreenEnabled}
            {fullscreenEnabled ? (expanded ? unMaximizeButton : maximizeButton) : <></>}
            {settingsButton}
        </>}
        title={cardTitle} />
}

export default NeoCardViewHeader;

