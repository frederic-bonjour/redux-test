/**
 * Created by Fred on 17/04/2018.
 */

export const ADD_DEVICE = 'ADD_DEVICE';
export const REMOVE_DEVICE = 'REMOVE_DEVICE';


export function addDevice(device) {
    return {
        type: ADD_DEVICE,
        device
    };
}

export function removeDevice(device) {
    return {
        type: REMOVE_DEVICE,
        device
    };
}