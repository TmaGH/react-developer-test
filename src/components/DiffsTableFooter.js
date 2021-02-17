import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { justifyContent, flex } from '@material-ui/system';


/*
* The point of this component is to send paging events and react to loading or error states.
*/
export class DiffsTableFooter extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        let state = this.props.state
        let boxToRender

        if (state == 'error') {
            boxToRender = (
                <Box height="80px" display="flex" justifyContent="center" alignItems="center" m={2}>
                    <Box>
                        <Typography color="error">We had problems fetching your data. Please try again.</Typography>
                        <Box m={1} display="flex" justifyContent="center">
                            <Button variant="contained" color="primary" onClick={this.props.retry}>Retry</Button>
                        </Box>
                    </Box>
                </Box>
            )
        } else if (state == 'loading') {
            boxToRender = (
                <Box height="80px" display="flex" justifyContent="center" alignItems="center" m={2}>
                    <CircularProgress />
                </Box>
            )
        } else if (state == 'default') {
            boxToRender = (
                <Box height="80px" display="flex" justifyContent="center" alignItems="center" m={2}>
                    <Button variant="contained" color="primary" onClick={this.props.loadmore}>Load more</Button>
                </Box>
            )
        }

        return (
            <Container fixed>
                {boxToRender}
            </Container>
        )
    }
};

export default DiffsTableFooter;