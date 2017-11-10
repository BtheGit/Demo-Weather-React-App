import React from 'react';
import { mount } from 'enzyme';
import { Home } from './Home';

describe("Home Component", () => {
  let wrapper;

  describe('when passed 0 arguments', () => {
      beforeEach(()=>{
          wrapper = mount(<Home />)
      });
    
      it('should still render without crashing', () => {
          expect(wrapper.find('.home__outer').exists()).toBe(true);
      });
  })

  describe('when passed settings', () => {

    it('should render [bike, metro] when passed results object [bike, metro]', () => {
      const results = {
        today: 'BIKE',
        tomorrow: 'METRO'
      }
      wrapper = mount(<Home results={results} />)
      expect(wrapper.find('.day--BIKE.day__outer').length).toBe(1);
      expect(wrapper.find('.day--METRO.day__outer').length).toBe(1);
    })
  })

})