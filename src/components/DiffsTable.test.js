import React from 'react';
import { shallow } from 'enzyme';
import DiffsTable from './DiffsTable';
import { TableCell, TableRow } from '@material-ui/core';
import api from '../lib/api';

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
            timestamp: "20202-10-20",
            diff: [
              { field: 'name', oldValue: 'Constantine Prescott Nathaniel Sr.', newValue: 'Constantine P. N. Sr.' },
            ]
          }
        ]}
      };

      const wrapper = await shallow(<DiffsTable fetch={fetchData} />);

      // Props are set
      expect(wrapper.instance().props.fetch).toEqual(fetchData)

      // State is set
      expect(wrapper.state().rows).toHaveLength(1)
      expect(wrapper.state().columns).toHaveLength(4)

      // Rows are rendered
      expect(wrapper.find(TableRow)).toHaveLength(2)
      expect(wrapper.find(TableCell)).toHaveLength(8)
    });
  
    it('succesfully renders users diff from mockAPI', async () => {
      const wrapper = await shallow(<DiffsTable fetch={api.getUsersDiff} />)

    })

    it('succesfully renders projects diff from mockAPI', async () => {
      const wrapper = await shallow(<DiffsTable fetch={api.getProjectsDiff} />)

    })

  });
});

