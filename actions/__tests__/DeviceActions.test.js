/**
 * Created by Fred on 17/04/2018.
 */
import * as actions from '../../actions/DeviceActions.js'

describe('actions', () => {
    it('should create an action to add a Device', () => {
        const device = {
            type: "luciol",
            label: "Luciol"
        };
        const expectedAction = {
            type: actions.ADD_DEVICE,
            device
        };
        expect(actions.addDevice(device)).toEqual(expectedAction);
    });
});