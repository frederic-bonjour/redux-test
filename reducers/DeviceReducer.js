/**
 * Created by Fred on 17/04/2018.
 */
import {ADD_DEVICE, REMOVE_DEVICE} from '../actions/DeviceActions.js';

const initialState = {
    byId: {}
};

export default function DeviceReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    let byId;

    switch (action.type) {

        case ADD_DEVICE:
            let id = Object.keys(state.byId).length + 1;
            action.device.id = id;
            byId = Object.assign({}, state.byId);
            byId[id] = action.device;
            return {...state, byId: byId};

        case REMOVE_DEVICE:
            byId = Object.assign({}, state.byId);
            delete byId[action.device.id];
            return {...state, byId: byId};
    }

    return state;
}