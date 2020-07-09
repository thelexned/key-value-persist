const {Persister} = require('./data-persistence/persister');
const {Command} = require('./command/command');
const {CommandRunner} = require('./command/command-runner');

const command = new Command();
const persister = new Persister();
const runner = new CommandRunner(command, persister);
runner.run(process.argv)