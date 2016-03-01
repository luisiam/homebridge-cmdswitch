var Service, Characteristic;
var exec = require("child_process").exec;

module.exports = function(homebridge){
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory("homebridge-cmdswitch", "cmdSwitch", cmdSwitchAccessory);
}

function cmdSwitchAccessory(log, config){

	// Retrieve existing config
	this.log = log;
	this.name = config.name;
	this.on_cmd = config.on_cmd || "";
	this.off_cmd = config.off_cmd || "";
	this.state_cmd = config.state_cmd && config.keyword ? config.state_cmd + " | grep '" + config.keyword + "'" : "";
	this.manufacturer = config.manufacturer;
	this.model = config.model;
	this.serial = config.serial;
	if (config.default == "on")	this.state = true;
	else				this.state = false;
}

cmdSwitchAccessory.prototype = {

	// Method to determine current state
	getPowerState: function(callback) {

		// Execute command to detect state
		if (this.state_cmd) {
			this.log("Getting " + this.name + " power state...");
			exec(this.state_cmd, function(error, stdout, stderr) {
				this.state = stdout ? true : false;
				this.log(this.name + " is turned " + (this.state ? "on." : "off."));
				callback(null, this.state);
			}.bind(this));
		} else {
			this.log(this.name + " is turned " + (this.state ? "on" : "off") + " (cached).");
			callback(null, this.state);
		}
	},

	// Method to set state
	setPowerState: function(on, callback) {

		var cmd = on ? this.on_cmd : this.off_cmd;
		var tout = null;

		// Execute command to set state
		if (cmd) {
			this.log("Turning " + (on ? "on " : "off ") + this.name + "..." );
			exec(cmd, function(error, stdout, stderr) {

				// Print out log for debug if any
				if (stdout) this.log(stdout);
				if (stderr) this.log(stderr);

				// Error detection
				if (error) {
					this.log("Failed to turn " + (on ? "on " : "off ") + this.name + "!");
					this.state = !on;
				} else {
					this.log(this.name + " is turned " + (on ? "on." : "off."));
					this.state = on;
				}

				// Work-around: always return success
				// Rely on getPowerState to check final state
				if (tout) {
					clearTimeout(tout);
					callback();
				}
			}.bind(this));

			// Allow 2s to set state but otherwise assumes success
			tout = setTimeout(function() {
				tout = null;
				this.log("Turning " + (on ? "on " : "off ") + this.name + " took too long, assuming success." );
				callback();
			}.bind(this), 2000);
		} else {
			this.log(this.name + " (dummy switch) is turned " + (on ? "on." : "off."));
			this.state = on;
			callback();
		}
	},

	// Method to respond identify request
	identify: function(callback) {
		this.log(this.name + " identify requested!");
		callback();
	},

	// Method to return existing services
	getServices: function() {

		// Create Accessory Informaton Service
		var informationService = new Service.AccessoryInformation();

		if (this.manufacturer) informationService.setCharacteristic(Characteristic.Manufacturer, this.manufacturer);
		if (this.model) informationService.setCharacteristic(Characteristic.Model, this.model);
		if (this.serial) informationService.setCharacteristic(Characteristic.SerialNumber, this.serial);

		// Create a Switch
		var switchService = new Service.Switch(this.name);

		switchService
			.getCharacteristic(Characteristic.On)
			.on('get', this.getPowerState.bind(this))
			.on('set', this.setPowerState.bind(this));

		return [informationService, switchService];
	}
};
