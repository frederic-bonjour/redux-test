/**
 * Created by Fred on 17/04/2018.
 */

import reducer from '../../reducers/GroupReducer.js';
import * as actions from '../../actions/GroupActions.js';
import * as deviceActions from '../../actions/DeviceActions.js';


const initalState = {byId: {}};


function addDevicesInGroup(state, group, deviceIds) {
    deviceIds.forEach(id => {
        state = reducer(state, {
            type: actions.APPEND_DEVICE_TO_GROUP,
            group,
            device: {
                id
            }
        });
    });
    return state;
}


describe('Groups reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initalState);
    });


    it('should handle ADD_GROUP action', () => {
        expect(
            reducer(initalState, {
                type: actions.ADD_GROUP,
                group: {
                    label: "Living room"
                }
            })
        ).toEqual({
            byId: {
                1: {
                    id: 1,
                    label: "Living room"
                }
            }
        });
    });


    it('should give a correct ID to new Groups', () => {
        let state = reducer(initalState, {
            type: actions.ADD_GROUP,
            group: {
                label: "Living Room"
            }
        });

        state = reducer(state, {
            type: actions.ADD_GROUP,
            group: {
                label: "Fred's Room"
            }
        });

        expect(state.byId).toHaveProperty("1.id", 1);
        expect(state.byId).toHaveProperty("2.id", 2);
    });


    it('should handle REMOVE_GROUP action', () => {
        let state = reducer(initalState, {
            type: actions.ADD_GROUP,
            group: {
                label: "Unwanted group"
            }
        });

        state = reducer(state, {
            type: actions.REMOVE_GROUP,
            group: {
                id: 1
            }
        });

        expect(state.byId).toEqual({});
    });


    it('should insert Devices in Groups correctly', () => {
        // Let's create a Group.
        let state = reducer(initalState, {
            type: actions.ADD_GROUP,
            group: {
                label: "An empty group"
            }
        });

        state = reducer(state, {
            type: actions.INSERT_DEVICE_TO_GROUP_AT,
            group: {
                id: 1
            },
            device: {
                id: 47
            },
            at: 2
        });

        expect(state.byId[1].devices).toEqual([47]);

        state = reducer(state, {
            type: actions.INSERT_DEVICE_TO_GROUP_AT,
            group: {
                id: 1
            },
            device: {
                id: 33
            },
            at: 0
        });

        state = reducer(state, {
            type: actions.INSERT_DEVICE_TO_GROUP_AT,
            group: {
                id: 1
            },
            device: {
                id: 55
            },
            at: 1
        });

        state = reducer(state, {
            type: actions.INSERT_DEVICE_TO_GROUP_AT,
            group: {
                id: 1
            },
            device: {
                id: 4
            },
            at: 10
        });
        expect(state.byId[1].devices).toEqual([33, 55, 47, 4]);

        state = reducer(state, {
            type: actions.INSERT_DEVICE_TO_GROUP_AT,
            group: {
                id: 2
            },
            device: {
                id: 20
            },
            at: 7
        });
        expect(state.byId[1].devices).toEqual([33, 55, 47, 4]);
        expect(state).toHaveProperty('error.code', 'UNKNOWN_GROUP');
    });



    it('should append Devices in Groups correctly', () => {
        // Let's create a Group.
        let state = reducer(initalState, {
            type: actions.ADD_GROUP,
            group: {
                label: "An empty group"
            }
        });

        state = addDevicesInGroup(state, {id: 1}, [33, 55, 47, 4]);
        expect(state.byId[1].devices).toEqual([33, 55, 47, 4]);
    });


    it('should move Devices in Groups correctly', () => {
        // Let's create a Group.
        let state = reducer(initalState, {
            type: actions.ADD_GROUP,
            group: {
                label: "An empty group"
            }
        });

        state = addDevicesInGroup(state, {id: 1}, [33, 55, 47, 4]);

        state = reducer(state, {
            type: actions.MOVE_DEVICE_IN_GROUP_TO,
            group: {
                id: 1
            },
            device: {
                id: 55
            },
            to: 0
        });
        expect(state.byId[1].devices).toEqual([55, 33, 47, 4]);

        state = reducer(state, {
            type: actions.MOVE_DEVICE_IN_GROUP_TO,
            group: {
                id: 1
            },
            device: {
                id: 33
            },
            to: 10
        });
        expect(state.byId[1].devices).toEqual([55, 47, 4, 33]);

        // Check for a Device that is not in the Group.
        state = reducer(state, {
            type: actions.MOVE_DEVICE_IN_GROUP_TO,
            group: {
                id: 1
            },
            device: {
                id: 88
            },
            to: 2
        });
        expect(state.byId[1].devices).toEqual([55, 47, 4, 33]);
        expect(state).toHaveProperty('error.code', 'DEVICE_NOT_IN_GROUP');
    });


    it('should remove Devices from Groups correctly', () => {
        // Let's create a Group.
        let state = reducer(initalState, {
            type: actions.ADD_GROUP,
            group: {
                label: "An empty group"
            }
        });

        state = addDevicesInGroup(state, {id: 1}, [33, 55, 47, 4]);

        state = reducer(state, {
            type: actions.REMOVE_DEVICE_FROM_GROUP,
            group: {
                id: 1
            },
            device: {
                id: 55
            }
        });
        expect(state.byId[1].devices).toEqual([33, 47, 4]);

        state = reducer(state, {
            type: actions.REMOVE_DEVICE_FROM_GROUP,
            group: {
                id: 1
            },
            device: {
                id: 4
            }
        });
        expect(state.byId[1].devices).toEqual([33, 47]);

        // Check for a Device that is not in the Group.
        state = reducer(state, {
            type: actions.REMOVE_DEVICE_FROM_GROUP,
            group: {
                id: 1
            },
            device: {
                id: 88
            }
        });
        expect(state.byId[1].devices).toEqual([33, 47]);
        expect(state).toHaveProperty('error.code', 'DEVICE_NOT_IN_GROUP');


        state = reducer(state, {
            type: actions.REMOVE_DEVICE_FROM_GROUP,
            group: {
                id: 2
            },
            device: {
                id: 47
            }
        });
        expect(state.byId[1].devices).toEqual([33, 47]);
        expect(state).toHaveProperty('error.code', 'UNKNOWN_GROUP');
    });


    it('should remove Devices from Groups correctly when a Device is removed', () => {
        // Let's create a Group.
        let state = reducer(initalState, {
            type: actions.ADD_GROUP,
            group: {
                label: "An empty group"
            }
        });

        state = addDevicesInGroup(state, {id: 1}, [33, 55, 47, 4]);

        state = reducer(state, {
            type: deviceActions.REMOVE_DEVICE,
            device: {
                id: 55
            }
        });
        expect(state.byId[1].devices).toEqual([33, 47, 4]);
    });


});