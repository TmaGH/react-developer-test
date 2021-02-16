import React from 'react';
import DiffsTableFooter from './DiffsTableFooter'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

/*
* Using the same style as in the App.js example.
* The point of this component is to implement the following requirements for any data (users or projects):
*   - Loading state
*   - Error state
*   - Responsive to screen size
*   - Default reverse chronological sorting
*   - Sorting functionality on date column
*   - Resorting on update
* 
*
* Props should have fetch function that returns array with objects in form:
  {
    id: 'e28d290a-a2f2-48c2-9001-ff43884e271b',
    timestamp: new Date('2020/2/14').getTime(),
    diff: [
      { field: 'name', oldValue: 'John', newValue: 'Bruce' },
    ],
  }
* 
*/
export class DiffsTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      diffsArray: [],
      columns: ["Date", "User ID", "Old value", "New value"],
      rows: [],
      state: 'default'
    }
  }

  async componentDidMount() {
    await this.fetchUpdate()
  }

  async fetchUpdate() {
    this.setComponentState('loading')
    let response = await this.props.fetch()

    if (response.code == 200) {
      this.setState({ rows: this.createRows(response.data) })
      this.setComponentState('default')
    } else {
      if (response.data.code == 500) {
        this.setComponentState('error')
      }
    }
  }

  setComponentState(stateStr) {
    this.setState({state: stateStr})
  }

  createRows(data) {
    // Nothing needs to be done here for now
    return data
  }

  /* Rendering columns and rows with as little hardcoding as possible */
  render() {
    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>

              {this.state.columns.map((column, i) => (

                <TableCell key={i}>{column}</TableCell>

              ))}

            </TableRow>
          </TableHead>
          <TableBody>

            {this.state.rows.map((row, i1) => {

              // This isn't necessary with the test data, but since the diff is an array, I would assume it's desired:
              return row.diff.map((diff, i2) => (
                <TableRow key={i1.toString() + i2}>

                  <TableCell>{row.timestamp}</TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{diff.oldValue}</TableCell>
                  <TableCell>{diff.newValue}</TableCell>

                </TableRow>
              ))

            })}

          </TableBody>
          <DiffsTableFooter state={this.state.state} retry={this.fetchUpdate} loadmore={this.fetchUpdate}></DiffsTableFooter>
        </Table>
      </TableContainer>
    );
  }
};

export default DiffsTable;