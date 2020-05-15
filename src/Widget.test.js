import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import Widget from './components/Widget'
import {shallow} from 'enzyme'
import {configure} from 'enzyme'

configure({adapter:new Adapter()})

describe('TESTS TO CHECK USER INTERACTION',()=>{
    it('Click BNB Button',()=>{
        const wrapper=shallow(<Widget/>)
        const mockedEvent = { target: {} }
        wrapper.find('#bnb-button').simulate('click',mockedEvent)
        expect(wrapper.state('count')).toEqual(1);
    }),
    it('Click BTC Button',()=>{
        const wrapper=shallow(<Widget/>)
        const mockedEvent = { target: {} }
        wrapper.find('#btc-button').simulate('click',mockedEvent)
        expect(wrapper.state('count')).toEqual(1);
    }),
    it('Click USD Button',()=>{
        const wrapper=shallow(<Widget/>)
        const mockedEvent = { target: {} }
        wrapper.find('#usd-button').simulate('click',mockedEvent)
        expect(wrapper.state('count')).toEqual(1);
    }) 

})

