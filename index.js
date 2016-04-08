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
  this.state_cmd = config.state_cmd || "";
  this.manufacturer = config.manufacturer;
  this.model = config.model;
  this.serial = config.serial;
  this.state = false;
}

cmdSwitchAccessory.prototype = {

  // Method to determine current state
  getPowerState: function(callback) {
    var that = this;

    // Execute command to detect state
    if (this.state_cmd) {
      exec(this.state_cmd, function(error, stdout, stderr) {
        that.state = stdout ? true : false;
        that.log("Current state: " + (that.state ? "On." : "Off."));
        callback(null, that.state);
      });
    } else {
      this.log("Current state: " + (this.state ? "On." : "Off."));
      callback(null, this.state);
    }
  },

  // Method to set state
  setPowerState: function(on, callback) {
    var that = this;
    var cmd = on ? this.on_cmd : this.off_cmd;
    var tout = null;

    // Execute command to set state
    if (cmd) {
      exec(cmd, function(error, stdout, stderr) {

        // Error detection
        if (error) {
          that.log(stderr);
          that.log("Failed to turn " + (on ? "on!" : "off!"));
          that.state = !on;
        } else {
          that.log("Turned " + (on ? "on." : "off."));
          that.state = on;
        }

        // Work-around: always return success
        // Rely on getPowerState to check final state
        if (tout) {
          clearTimeout(tout);
          callback();
        }
      });

      // Allow 2s to set state but otherwise assumes success
      tout = setTimeout(function() {
        tout = null;
        that.log("Turning " + (on ? "on " : "off ") + " took too long, assuming success." );
        callback();
      }, 2000);
    } else {
      this.log("Turned " + (on ? "on" : "off"));
      this.state = on;
      callback();
    }
  },

  // Method to respond identify request
  identify: function(callback) {
    this.log("Identify requested!");
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
    var switchService = new Service.Switch(this.name)
    switchService.getCharacteristic(Characteristic.On)
      .on('get', this.getPowerState.bind(this))
      .on('set', this.setPowerState.bind(this));

    return [informationService, switchService];
  }
};
