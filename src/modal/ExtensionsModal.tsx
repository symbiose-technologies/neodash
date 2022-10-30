import ExtensionIcon from '@material-ui/icons/Extension';

import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Badge from '@material-ui/core/Badge';
import { Checkbox, Chip, FormControlLabel, ListItem, ListItemIcon, ListItemText, Tooltip } from '@material-ui/core';
import { EXTENSIONS } from '../config/ExtensionConfig';


export const NeoExtensionsModal = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <ListItem button onClick={handleClickOpen}>
                <ListItemIcon>
                    <ExtensionIcon />
                </ListItemIcon>
                <ListItemText primary="Extensions" />
            </ListItem>

            {open ? <Dialog maxWidth={"md"} open={open == true} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    <ExtensionIcon style={{
                        height: "30px",
                        paddingTop: "4px",
                        marginBottom: "-8px",
                        marginRight: "5px",
                        paddingBottom: "5px"
                    }} />
                    Extensions
                    <IconButton onClick={handleClose} style={{ padding: "3px", float: "right" }}>
                        <Badge badgeContent={""} >
                            <CloseIcon />
                        </Badge>
                    </IconButton>
                </DialogTitle>
                <div>
                    <DialogContent >
                        <b>Extensions</b> are a way of extending the core functionality of NeoDash with custom logic.
                        <br />
                        This can be a new visualization, extra styling options for an existing visualization, or even a completely new logic for the dashboarding engine.
                        <br /> <br />
                        <hr></hr>

                        {Object.values(EXTENSIONS).map(e => {
                            return <div style={{ opacity: e.enabled ? 1.0 : 0.6 }}>

                                <table>
                                    <tr>
                                        <td>
                                            <h3>
                                                {e.label}
                                                &nbsp; &nbsp;
                                                {e.enabled ? "" : <Chip
                                                    label="Pro Feature"
                                                    color="primary"
                                                    size="small"
                                                    variant="outlined"
                                                />}
                                            </h3>
                                        </td>
                                        <td style={{ width: 50 }}>

                                        </td>
                                        <td style={{ float: 'right' }}>
                                            <Tooltip title="Enable the extension" aria-label="">
                                                <FormControlLabel
                                                    control={<Checkbox style={{ fontSize: "small" }}
                                                        checked={false} onChange={e => alert(e)} name="enable" />}
                                                    label={<span color="red">Enable</span>}
                                                />
                                            </Tooltip>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td valign='top'>
                                            <p>{e.description}</p>
                                            <p>Author: <a href={e.link}>{e.author}</a></p>
                                        </td>
                                        <td>

                                        </td>
                                        <td>
                                            <br />
                                            <img src={e.image} style={{ width: 400 }}></img>
                                        </td>
                                    </tr>
                                </table>
                                <hr></hr>
                            </div>
                        })}
                    </DialogContent>
                </div>
            </Dialog> : <></>}
        </div>
    );
}

export default (NeoExtensionsModal);

