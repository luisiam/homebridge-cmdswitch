# homebridge-cmdswitch [![npm version](https://badge.fury.io/js/homebridge-cmdswitch.svg)](https://badge.fury.io/js/homebridge-cmdswitch)
CMD Plugin for [HomeBridge](https://github.com/nfarina/homebridge)

# Installation
1. Install homebridge using `npm install -g homebridge`.
2. Install this plugin using `npm install -g homebridge-cmdswitch`.
3. Update your configuration file. See sample-config.json snippet below.

# Configuration
Configuration sample:
 ```
"accessories": [{
    "accessory": "cmdSwitch",
    "name" : "PlayStation 4",
    "on_cmd": "ps4-waker",
    "off_cmd": "ps4-waker standby",
    "state_cmd": "ps4-waker search | grep -i '200Ok'",

    "manufacturer": "Sony Corporation",
    "model": "CUH-1001A",
    "serial": "XXXXXXXXXXX"
}]

```


| Fields       | Description                                                                   | Required |
|--------------|-------------------------------------------------------------------------------|----------|
| accessory    | Must always be `cmdSwitch`.                                                   | Yes      |
| name         | The name of your device.                                                      | Yes      |
| on_cmd       | The command to turn on your device.                                           | No*      |
| off_cmd      | The command to turn on your device.                                           | No*      |
| state_cmd    | The command the check the current state of your device.                       | No*      |
| manufacturer | The manufacturer of your device.                                              | No       |
| model        | The model of your device.                                                     | No       |
| serial       | The serial number of your device.                                             | No       |

*Nothing will be executed (dummy switch) if `on_cmd`, `off_cmd` or `state_cmd` is not defined.
