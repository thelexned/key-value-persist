const {Command} = require('../../src/command/command');
const {CommandRunner} = require('../../src/command/command-runner');
const {Persister} = require('../../src/data-persistence/persister');

describe("CommandRunner", () => {
    describe('#constructor', () => {
        test("creates the command object", () => {
            const command = new Command();
            const persister = new Persister();
            const commandRunner = new CommandRunner(command, persister);

            expect(commandRunner.command).toEqual(command);
            expect(commandRunner.persister).toEqual(persister);
        });
    });

    describe("#run", () => {
        test("shows help given no option selected", () => {
            const command = new Command();
            const persister = new Persister();
            const commandRunner = new CommandRunner(command, persister);
            const processStdoutWriteSpy = jest.spyOn(process.stdout, 'write').mockImplementation();
            const processExitSpy = jest.spyOn(process, 'exit').mockImplementation();

            commandRunner.run([
                'app',
                'kvp'
            ]);

            expect(processStdoutWriteSpy).toHaveBeenCalledTimes(1);
            expect(processExitSpy).toHaveBeenCalledTimes(1);
            expect(processExitSpy).toHaveBeenCalledWith(0);
        });

        test("returns value for key given get command", (done) => {
            const key = 'test-key';
            const value = 'test-value';
            const command = new Command();
            const persister = new Persister();
            const persisterGetSpy = jest.spyOn(persister, 'get').mockReturnValue(Promise.resolve(value));
            const commandRunner = new CommandRunner(command, persister);
            const processStdoutWriteSpy = jest.spyOn(process.stdout, 'write').mockImplementation();

            commandRunner.run([
                'app',
                'kvp',
                '-g',
                key
            ]);

            expect(persisterGetSpy).toHaveBeenCalledTimes(1);
            expect(persisterGetSpy).toHaveBeenCalledWith(key);
            persister.get(key).then(() => {
                expect(processStdoutWriteSpy).toHaveBeenCalledTimes(1);
                expect(processStdoutWriteSpy).toHaveBeenCalledWith(`${value}\n`);
                done();
            });
        });

        test("sets value for key given set command", () => {
            const key = 'test-key';
            const value = 'test-value';
            const command = new Command();
            const persister = new Persister();
            const persisterSetSpy = jest.spyOn(persister, 'set').mockReturnValue(Promise.resolve(value));
            const commandRunner = new CommandRunner(command, persister);

            commandRunner.run([
                'app',
                'kvp',
                '-s',
                key,
                value
            ]);

            expect(persisterSetSpy).toHaveBeenCalledTimes(1);
            expect(persisterSetSpy).toHaveBeenCalledWith(key, value);
        });

        test("deletes value for key given delete command", () => {
            const key = 'test-key';
            const value = 'test-value';
            const command = new Command();
            const persister = new Persister();
            const persisterDeleteSpy = jest.spyOn(persister, 'delete').mockReturnValue(Promise.resolve(value));
            const commandRunner = new CommandRunner(command, persister);

            commandRunner.run([
                'app',
                'kvp',
                '-d',
                key
            ]);

            expect(persisterDeleteSpy).toHaveBeenCalledTimes(1);
            expect(persisterDeleteSpy).toHaveBeenCalledWith(key);
        });
    });
});