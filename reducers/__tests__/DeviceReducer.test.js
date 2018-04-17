/**
 * Created by Fred on 17/04/2018.
 */

import reducer from '../../reducers/DeviceReducer.js';
import * as actions from '../../actions/DeviceActions.js';


const initalState = {byId: {}};


describe('Devices reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initalState);
    });

    it('should handle ADD_DEVICE action', () => {
        expect(
            reducer(initalState, {
                type: actions.ADD_DEVICE,
                device: {
                    type: 'luciol',
                    label: "Luciol"
                }
            })
        ).toEqual({
            byId: {
                1: {
                    id: 1,
                    type: 'luciol',
                    label: "Luciol"
                }
            }
        });
    });

    it('should give a correct ID to new Devices', () => {
        let state = reducer(initalState, {
            type: actions.ADD_DEVICE,
            device: {
                type: 'luciol',
                label: "Luciol"
            }
        });

        state = reducer(state, {
            type: actions.ADD_DEVICE,
            device: {
                type: 'tebble',
                label: "Tebble"
            }
        });

        expect(state.byId).toHaveProperty("1.id", 1);
        expect(state.byId).toHaveProperty("2.id", 2);
    });

    it('should handle REMOVE_DEVICE action', () => {
        let state = reducer(initalState, {
            type: actions.ADD_DEVICE,
            device: {
                type: 'luciol',
                label: "Luciol"
            }
        });

        state = reducer(state, {
            type: actions.REMOVE_DEVICE,
            device: {
                id: 1
            }
        });

        expect(state.byId).toEqual({});
    });

});