Service = require('node-windows').Service;

# Create a new service object
svc = new Service {
  name:'OeePulling',
  description: 'NodeJs Web Pulling to update OEE data',
  script: 'C:\\apps\\oee-monitor\\js\\puller.js'
}

# Listen for the "install" event, which indicates the
# process is available as a service.
svc.on 'install', ()->
  svc.start();

svc.on 'unistall', ()->
	console.log 'Uninstall complete'

svc.install();
# svc.uninstall();