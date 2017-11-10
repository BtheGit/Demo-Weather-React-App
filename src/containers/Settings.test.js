import React from 'react';
import { shallow } from 'enzyme';
import { Settings } from './Settings';

describe("Settings Component", () => {
  let wrapper;

  describe('when passed 0 arguments', () => {
      beforeEach(()=>{
          wrapper = shallow(<Settings />)
      });
    
      it('should still render without crashing', () => {
          expect(wrapper.find('.settings__outer').exists()).toBe(true);
      });

      it('should display three inputs', () => {
        expect(wrapper.find('.settings-input__container').length).toBe(3);
      })

  })

})