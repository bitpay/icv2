'use strict';
var spawn = require('child_process').spawn;

var processes = [
  {
    command: 'npm',
    args: ['run', 'serve-app']
  },
  {
    command: 'npm',
    args: ['run', 'serve-starter']
  },
  {
    command: 'npm',
    args: ['run', 'serve-simserver']
  }
];

processes.forEach(function(proc){
  var single = spawn(proc.command, proc.args, {cwd: proc.cwd});
  single.stdout.on('data', function(data){
    process.stdout.write(data.toString('utf8'));
  });
  single.stderr.on('data', function(data){
    process.stdout.write(data.toString('utf8'));
  });
  single.stderr.on('close', function(code){
    console.log('Process "' + proc.command + '" exited with code: ' + code);
  });
});
