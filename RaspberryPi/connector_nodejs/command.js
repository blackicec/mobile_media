const { exec } = require('child_process');
const base_command = '/home/pi/mobile_media/command_driver.exe';

// Example: command_driver.exe [up | down | stop]
module.exports.sendCommand = (command) => {
	return new Promise(resolve => {
		exec(`${base_command} ${command}`, (error, stdout, stderr) => {
			resolve(stdout);
		});
	});
}
