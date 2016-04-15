# homebridge-cmdswitch (Deprecated) [![npm version](https://badge.fury.io/js/homebridge-cmdswitch.svg)](https://badge.fury.io/js/homebridge-cmdswitch)
CMD Plugin for [HomeBridge](https://github.com/nfarina/homebridge) (API 1.0)

Newer verion using API 2.0: [homebridge-cmdswitch2](https://github.com/luisiam/homebridge-cmdswitch2)

It is strongly advised that you switch to the newer version. No new development will be done on this version.

### What this plugin does
This plugin allows you to run Command Line Interface (CLI) commands via HomeKit. This means you can run a simple commands such as `ping`, `shutdown`, or `wakeonlan` just by telling Siri to do so. An example usage for this plugin would be to turn on your PS4 or HTPC, check if it’s on, and even shut it down when finished.

### How this plugin works
1. `on_cmd`: This is the command issued when the switch is turned ON.
2. `off_cmd`: This is the command issued when the switch is turned OFF.
3. `state_cmd`: This is the command issued when HomeBridge checks the state of the switch.
  1. If there is no error, HomeBridge is notified that the switch is ON.
  2. If there is an error, HomeBridge is notified that the switch is OFF.

### Things to know about this plugin
This plugin can only run CLI commands the same as you typing them yourself. In order to test if your `on_cmd`, `off_cmd`, or `state_cmd` are valid commands you need to run them from your CLI. Please keep in mind you will want to run these commands from the same user that runs (or owns) the HomeBridge service if different than your root user.

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
