/**
 * Created by Fred on 17/04/2018.
 */
import {
    ADD_GROUP,
    REMOVE_GROUP,
    APPEND_DEVICE_TO_GROUP,
    INSERT_DEVICE_TO_GROUP_AT,
    MOVE_DEVICE_IN_GROUP_TO,
    REMOVE_DEVICE_FROM_GROUP
} from '../actions/GroupActions.js';

import {REMOVE_DEVICE} from '../actions/DeviceActions.js';


const initialState = {
    byId: {}
};


function devicePositionInGroup(device, group) {
    return Array.isArray(group.devices) ? group.devices.indexOf(device.id) : -1;
}


function isDeviceInGroup(device, group) {
    return Array.isArray(group.devices) && group.devices.indexOf(device.id) !== -1;
}


export default function GroupReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    let byId;
    let group;
    let p;

    switch (action.type) {

        case REMOVE_DEVICE:
            byId = Object.assign({}, state.byId);
            Object.keys(byId).forEach(id => {
                let p = devicePositionInGroup(action.device, byId[id]);
                if (p !== -1) {
                    byId[id].devices.splice(p, 1);
                }
            });
            return {...state, byId: byId};

        case ADD_GROUP:
            let id = Object.keys(state.byId).length + 1;
            action.group.id = id;
            byId = Object.assign({}, state.byId);
            byId[id] = action.group;
            return {...state, byId: byId};


        case REMOVE_GROUP:
            byId = Object.assign({}, state.byId);
            delete byId[action.group.id];
            return {...state, byId: byId};


        case APPEND_DEVICE_TO_GROUP:
            byId = Object.assign({}, state.byId);
            group = byId[action.group.id];
            if (!isDeviceInGroup(action.device, group)) {
                group.devices = group.devices || [];
                group.devices.push(action.device.id);
            }
            return {...state, byId: byId};


        case INSERT_DEVICE_TO_GROUP_AT:
            byId = Object.assign({}, state.byId);
            group = byId[action.group.id];
            if (!group) {
                return {...state, error: {
                    code: 'UNKNOWN_GROUP',
                    message: `Group with ID "${action.group.id}" does not exist.`
                }};
            }
            if (!isDeviceInGroup(action.device, group)) {
                group.devices = group.devices || [];
                let at = Math.min(action.at, group.devices.length);
                group.devices.splice(at, 0, action.device.id);
            }
            return {...state, byId: byId, error: undefined};


        case MOVE_DEVICE_IN_GROUP_TO:
            byId = Object.assign({}, state.byId);
            group = byId[action.group.id];
            if (!group) {
                return {...state, error: {
                    code: 'UNKNOWN_GROUP',
                    message: `Group "${action.group.id}" does not exist.`
                }};
            }
            group.devices = group.devices || [];
            p = devicePositionInGroup(action.device, group);
            if (p === -1) {
                return {...state, error: {
                    code: 'DEVICE_NOT_IN_GROUP',
                    message: `Device "${action.device.id}" is not in Group "${action.group.id}".`
                }};
            }
            let to = Math.min(action.to, group.devices.length);
            group.devices.splice(to, 0, group.devices.splice(p, 1)[0]);
            return {...state, byId: byId, error: undefined};


        case REMOVE_DEVICE_FROM_GROUP:
            byId = Object.assign({}, state.byId);
            group = byId[action.group.id];
            if (!group) {
                return {...state, error: {
                    code: 'UNKNOWN_GROUP',
                    message: `Group "${action.group.id}" does not exist.`
                }};
            }
            group.devices = group.devices || [];
            p = devicePositionInGroup(action.device, group);
            if (p === -1) {
                return {...state, error: {
                    code: 'DEVICE_NOT_IN_GROUP',
                    message: `Device "${action.device.id}" is not in Group "${action.group.id}".`
                }};
            }
            group.devices.splice(p, 1);
            return {...state, byId: byId, error: undefined};
    }

    return state;
}