import React from 'react';
import { shallow } from 'enzyme';
import { Box, Button, CircularProgress, TableCell, TableRow, Typography } from '@material-ui/core';
import DiffsTableFooter from './DiffsTableFooter';

describe('<DiffsTable />', () => {
  describe('render()', () => {

    it('succesfully renders default state', async () => {
      const wrapper = await shallow(<DiffsTableFooter state='default' />)

      expect(wrapper.find(Box)).toHaveLength(1)
      expect(wrapper.find(Button)).toHaveLength(1)
      // This level of testing might not make sense as it will immediately break when the text is changed, but for now, it'll do
      expect(wrapper.find(Button).text()).toEqual('Load more')
    })

    it('succesfully renders error state', async () => {
      const wrapper = await shallow(<DiffsTableFooter state='error' />)

      expect(wrapper.find(Box)).toHaveLength(3)
      expect(wrapper.find(Button)).toHaveLength(1)
      expect(wrapper.find(Typography)).toHaveLength(1)
      expect(wrapper.find(Typography).text()).toEqual('We had problems fetching your data. Please try again.')
      expect(wrapper.find(Button).text()).toEqual('Retry')
    })

    it('succesfully renders loading state', async () => {

      const wrapper = await shallow(<DiffsTableFooter state='loading' />)

      expect(wrapper.find(Box)).toHaveLength(1)
      expect(wrapper.find(CircularProgress)).toHaveLength(1)
    })

  });
});