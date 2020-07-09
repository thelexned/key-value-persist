const commander = require('commander');
const commandPackage = require('../../package.json');

function Command() {
    const command = new commander.Command()
    command
        .version(commandPackage.version)
        .description(commandPackage.description)
        .usage('[options]')
        .arguments('<key> <value>')
        .option('-s, --set <key> <value>', 'set value for key')
        .option('-g, --get <key>', 'get value for key')
        .option('-d, --delete <key>', 'delete key value pair')
    ;

    this.command = command;
}

Command.prototype.parse = function (args) {
    this.command.parse(args);
}

Command.prototype.isCommand = function () {
    return this.isGetCommand() ||
        this.isSetCommand() ||
        this.isDeleteCommand();
}

Command.prototype.showHelp = function () {
    this.command.help();
}

Command.prototype.isGetCommand = function () {
    return !!this.command.get;
}

Command.prototype.isSetCommand = function () {
    return !!this.command.set;
}

Command.prototype.isDeleteCommand = function () {
    return !!this.command.delete;
}

Command.prototype.getKey = function () {
    if (this.isGetCommand()) {
        return this.command.get;
    }

    if (this.isSetCommand()) {
        return this.command.set;
    }

    if (this.isDeleteCommand()) {
        return this.command.delete;
    }

    throw new Error('The key is not defined');
}

Command.prototype.getValue = function () {
    return this.command.args.length !== 0 ? this.command.args[0] : "";
}

module.exports = {
    Command
}