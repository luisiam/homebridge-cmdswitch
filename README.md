# homebridge-cmdswitch (Deprecated) [![npm version](https://badge.fury.io/js/homebridge-cmdswitch.svg)](https://badge.fury.io/js/homebridge-cmdswitch)
CMD Plugin for [HomeBridge](https://github.com/nfarina/homebridge) (API 1.0)

Newer verion using API 2.0: [homebridge-cmdswitch2](https://github.com/luisiam/homebridge-cmdswitch2)

It is strongly advised that you switch to the newer version. No new development will be done on this version.

# Installation
1. Install homebridge using `npm install -g homebridge`.
2. Install this plugin using `npm install -g homebridge-cmdswitch`.
3. Update your configuration file. See configuration sample below.

# Configuration
Edit your `config.json` accordingly. Configuration sample:
 ```
"accessories": [{
    "accessory": "cmdSwitch",
    "name" : "HTPC",
    "on_cmd": "wol XX:XX:XX:XX:XX:XX",
    "off_cmd": "net rpc shutdown -I XXX.XXX.XXX.XXX -U user%password",
    "state_cmd": "ping -c 2 -W 1 XXX.XXX.XXX.XXX | grep -i '2 received'",
}, {
    "accessory": "cmdSwitch",
    "name" : "Playstation 4",
    "on_cmd": "ps4-waker",
    "off_cmd": "ps4-waker standby",
    "state_cmd": "ps4-waker search | grep -i '200Ok'",
    "manufacturer": "Sony Corporation",
    "model": "CUH-1001A",
    "serial": "XXXXXXXXXXX"
}]

```


| Fields       | Description                                       | Required |
|--------------|---------------------------------------------------|----------|
| accessory    | Must always be `cmdSwitch`.                       | Yes      |
| name         | The name of your device.                          | Yes      |
| on_cmd       | The command to turn on your device.               | No       |
| off_cmd      | The command to turn off your device.              | No       |
| state_cmd    | The command to detect an ON state of your device. | No       |
| manufacturer | The manufacturer of your device.                  | No       |
| model        | The model of your device.                         | No       |
| serial       | The serial number of your device.                 | No       |
