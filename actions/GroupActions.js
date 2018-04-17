/**
 * Created by Fred on 17/04/2018.
 */

export const ADD_GROUP = 'ADD_GROUP';
export const REMOVE_GROUP = 'REMOVE_GROUP';

export const APPEND_DEVICE_TO_GROUP = 'APPEND_DEVICE_TO_GROUP';
export const INSERT_DEVICE_TO_GROUP_AT = 'INSERT_DEVICE_TO_GROUP_AT';

export const MOVE_DEVICE_IN_GROUP_TO = 'MOVE_DEVICE_IN_GROUP_TO';

export const REMOVE_DEVICE_FROM_GROUP = 'REMOVE_DEVICE_FROM_GROUP';


export function addGroup(group) {
    return {
        type: ADD_GROUP,
        group
    };
}

export function removeGroup(group) {
    return {
        type: REMOVE_GROUP,
        group
    };
}

export function appendDeviceToGroup(device, group) {
    return {
        type: APPEND_DEVICE_TO_GROUP,
        device,
        group
    };
}

export function insertDeviceToGroupAt(device, group, at) {
    return {
        type: INSERT_DEVICE_TO_GROUP_AT,
        device,
        group,
        at
    };
}

export function moveDeviceInGroupTo(device, group, to) {
    return {
        type: MOVE_DEVICE_IN_GROUP_TO,
        device,
        group,
        to
    };
}


export function removeDeviceFromGroup(device, group) {
    return {
        type: REMOVE_DEVICE_FROM_GROUP,
        device,
        group
    };
}

