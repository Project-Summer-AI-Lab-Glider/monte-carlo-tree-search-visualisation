import { Grid, makeStyles } from '@material-ui/core';
import React, { ReactNode, useState } from 'react';

interface ToolbarProps {
    children: ReactNode[];
}

const styles = makeStyles(() => ({
    spacer: {
    }, 
    container: {
        display: "flex"
    },
    item: {
        
    }
}))

export function Spacer(){
    const classes = styles()
    return <div className={classes.spacer}>
    </div>
}

export function Toolbar({children}: ToolbarProps) {
    const classes = styles()
    return <div className={classes.container}>
        <Grid container spacing={2} direction="row">
            {children.map(el => <Grid item>{el}</Grid>)}
        </Grid>
    </div>
}