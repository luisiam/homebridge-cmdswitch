# homebridge-cmdswitch
CMD Plugin for [HomeBridge](https://github.com/nfarina/homebridge)

# Installation
1. Install homebridge using `npm install -g homebridge`.
2. Install this plugin using `npm install -g git+https://github.com/luisiam/homebridge-cmdswitch.git`.
3. Update your configuration file. See sample-config.json snippet below.

# Configuration
Configuration sample:
 ```
"accessories": [
		{
			"accessory": "cmdSwitch",
			"name" : "Device Name",
			"on_cmd": "Command to turn on",
			"off_cmd": "Command to turn off",
			"state_cmd": "Command to check state",
			"keyword": "Keyword to detect ON state",
			
			"manufacturer": "Device Manufacturer",
			"model": "Device Model",
			"serial": "Device Serial"
		}
	],

```

| Fields       | Description                                                                   | Required |
|--------------|-------------------------------------------------------------------------------|----------|
| accessory    | Must always be `cmdSwitch`.                                                   | Yes      |
| name         | The name of your device.                                                      | Yes      |
| on_cmd       | The command to turn on your device.                                           | No*      |
| off_cmd      | The command to turn on your device.                                           | No*      |
| state_cmd    | The command the check the current state of your device.                       | No**     |
| keyword      | The keyword from output of `state_cmd` to detect if your device is turned on. | No**     |
| manufacturer | The manufacturer of your device.                                              | No       |
| model        | The model of your device.                                                     | No       |
| serial       | The serial number of your device.                                             | No       |
*Nothing will be executed if `on_cmd`, `off_cmd` or `state_cmd` is not defined.

**`state_cmd` and `keyword` must be defined together for state query to work.
