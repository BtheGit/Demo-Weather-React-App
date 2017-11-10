import React from 'react';
import { mount } from 'enzyme';
import Day from './Day';

describe("Day Component", () => {
  let wrapper;

  describe('when passed 0 arguments', () => {
      beforeEach(()=>{
          wrapper = mount(<Day />)
      });
    
      it('should still render without crashing', () => {
          expect(wrapper.find('.day__outer').exists()).toBe(true);
      });

      it('should display error text', () => {
        expect(wrapper.prop('date')).toEqual('ERROR');        
      })

  })

})