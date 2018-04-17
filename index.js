/**
 * Created by Fred on 17/04/2018.
 */
let state = {
    "devices": {
        "byId": {
            1: {},
            2: {},
            3: {},
            4: {},
            5: {}
        }
    },

    "apps": {
        "byId": {
            "timer": {},
            "luciol": {}
        }
    },

    "ambiences": {
        "byId": {
            1: {},
            2: {},
            3: {},
            4: {}
        }
    },

    "groups": {
        "byId": {
            1: {
                "id": 1,
                "label": "...",
                "devices": [1, 2, 4]
            },
            2: {}
        }
    },

    "scenes": {
        "byId": {
            1: {
                "id": 1,
                    "label": "Equalizer+Luciol",
                    "items": [{
                        "type": "device",
                        "deviceId": 5,
                        "appId": "equalizer",
                        "ambienceId": 7,
                        "appParams": {}
                    }, {
                        "type": "group",
                        "groupId": 1,
                        "appId": "luciol",
                        "ambienceId": 12
                    }]
                },
                2: {}
            }
    },

    "state": {
        "devices": {
            1: {
                "online": true,
                    "ambienceId": 4,
                    "appId": "timer",
                    "appParams": {
                    "duration": 30
                },
                "partOf": {
                    "type": "group",
                        "id": 1
                }
            },

            5: {
                "online": true,
                    "ambienceId": 7,
                    "appId": "equalizer",
                    "partOf": {
                    "type": "scene",
                        "id": 1
                }
            }
        },

        "groups": {
            "running": [{
                "id": 1,
                "ambienceId": 4,
                "appId": "luciol"
            }]
        },

        "scenes": {
            "running": [{
                "id": 1
            }]
        }
    }
};