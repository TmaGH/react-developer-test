import React from 'react';
import { shallow } from 'enzyme';
import DiffsTable from './DiffsTable';
import { TableCell, TableRow } from '@material-ui/core';

describe('<DiffsTable />', () => {
  describe('render()', () => {

    // Use complete fake fetch function
    it('succcesfully renders returned data', async () => {

      // Test fetch function
      const fetchData = async () => {
        return {
          code: 200,
          data: [
            {
              id: "123456",
              timestamp: new Date('2020/2/19').getTime(),
              diff: [
                { field: 'name', oldValue: 'Constantine Prescott Nathaniel Sr.', newValue: 'Constantine P. N. Sr.' },
              ]
            },
            {
              id: "123456",
              timestamp: new Date('2020/2/22').getTime(),
              diff: [
                { field: 'name', oldValue: 'Constantine Prescott Nathaniel Sr.', newValue: 'Constantine P. N. Sr.' },
              ]
            }
          ]
        }
      };

      let wrapper = await shallow(<DiffsTable fetch={fetchData} />);

      // Props are set
      expect(wrapper.instance().props.fetch).toEqual(fetchData)

      // State is set
      expect(wrapper.state().rows).toHaveLength(2)
      expect(wrapper.state().columns).toHaveLength(4)

      // Rows are rendered
      expect(wrapper.find(TableRow)).toHaveLength(3)
      expect(wrapper.find(TableCell)).toHaveLength(4 * 3)

      // Test default sorting
      expect(wrapper.find(TableRow).at(1).find(TableCell).first().text()).toEqual("22.2.2020")
    });

  });
});

