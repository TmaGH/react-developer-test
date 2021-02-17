import React from 'react';
import DiffsTableFooter from './DiffsTableFooter'
import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@material-ui/core';

/*
* Using the same style as in the App.js example.
* The point of this component is to implement the following requirements for any data (users or projects):
*   - Loading state
*   - Error state
*   - Responsive to screen size
*   - Default reverse chronological sorting
*   - Sorting functionality on date column
*   - Maintaining sort direction on update 
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
      columns: [{text: "Date", sort: true}, {text: "User ID"}, {text: "Old value"}, {text: "New value"}],
      rows: [],
      data: [],
      state: 'default',
      sortDesc: true
    }
  }

  async componentDidMount() {
    await this.fetchUpdate()
  }

  async fetchUpdate() {
    this.setComponentState('loading')

    try {
      let response = await this.props.fetch()
      if (response.code == 200) {
        this.setState({ data: response.data, rows: this.sortRows(response.data, this.state.sortDesc) })
        this.setComponentState('default')
      }

    } catch (error) {
      // There's only one type of error here so this simple error handling is enough
      this.setComponentState('error')
    }
  }

  setComponentState(stateStr) {
    this.setState({ state: stateStr })
  }

  createRows(data) {
    // Transform time to date string
    let rows = data.map(diff => {
      return {
        id: diff.id,
        timestamp: new Date(diff.timestamp).toLocaleDateString("fi"),
        diff: diff.diff
      }
    })

    return rows
  }

  sortRows(data, sortDesc) {
    data.sort((a,b) => {

      if(sortDesc == true) {
        return b.timestamp - a.timestamp
      }

      if(sortDesc == false) {
        return a.timestamp - b.timestamp
      }

    })

    return this.createRows(data)
  }

  handleSort(event, property) {
    let sortDesc = !this.state.sortDesc
    this.setState({rows: this.sortRows(this.state.data, sortDesc), sortDesc: sortDesc})
  }

  /* Rendering columns and rows with as little hardcoding as possible */
  render() {
    return (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>

                {this.state.columns.map((column, i) => {
                  let columnCell = <TableCell key={i}>{column.text}</TableCell>

                  if(column.sort == true) {
                    columnCell = (
                      <TableCell key={i}>
                        <TableSortLabel onClick={this.handleSort.bind(this)}>
                        {column.text}
                        </TableSortLabel>
                      </TableCell>
                    )

                  }

                  return columnCell
                  })}

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
          </Table>
          <DiffsTableFooter state={this.state.state} retry={this.fetchUpdate.bind(this)} loadmore={this.fetchUpdate.bind(this)}></DiffsTableFooter>
        </TableContainer>
    );
  }
};

export default DiffsTable;