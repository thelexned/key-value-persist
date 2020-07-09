function CommandRunner(command, persister) {
    this.command = command;
    this.persister = persister;
}

CommandRunner.prototype.run = function (args) {
    this.command.parse(args);

    if (!this.command.isCommand()) {
        this.command.showHelp();
    }

    if (this.command.isGetCommand()) {
        this.persister.get(this.command.getKey()).then((value) => {
            if (value) {
                process.stdout.write(value);
            }
        });
    }

    if (this.command.isSetCommand()) {
        this.persister.set(this.command.getKey(), this.command.getValue());
    }

    if (this.command.isDeleteCommand()) {
        this.persister.delete(this.command.getKey());
    }
}

module.exports = {
    CommandRunner
}