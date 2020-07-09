const {Command} = require('../../src/command/command');

describe("Command", () => {
    describe('#constructor', () => {
        test("creates the command object", () => {
            const command = new Command();
            expect(command.command).not.toBeUndefined();
            expect(command.command.options.length).toEqual(4);
        });
    });

    describe("#parse", () => {

        test("parses valid options", () => {
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
            const command = new Command();
            command.parse(['-g', 'test-key']);
            expect(consoleErrorSpy).toHaveBeenCalledTimes(0);
        });

        test("exits with error on non existent option", () => {
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
            const processExitSpy = jest.spyOn(process, 'exit').mockImplementation();

            const command = new Command();
            command.parse([
                    'app',
                    'kvp',
                    '-b'
                ]
            );
            expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
            expect(consoleErrorSpy).toHaveBeenCalledWith("error: unknown option '-b'");
            expect(processExitSpy).toHaveBeenCalledTimes(1);
            expect(processExitSpy).toHaveBeenCalledWith(1);
        });

        test("exits with error on non existent option argument", () => {
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
            const processExitSpy = jest.spyOn(process, 'exit').mockImplementation();

            const command = new Command();
            command.parse([
                    'app',
                    'kvp',
                    '-g'
                ]
            );
            expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
            expect(consoleErrorSpy).toHaveBeenCalledWith("error: option '-g, --get <key>' argument missing");
            expect(processExitSpy).toHaveBeenCalledTimes(1);
            expect(processExitSpy).toHaveBeenCalledWith(1);
        });
    });

    describe('#isGetCommand', () => {
        test("checks if is get command", () => {
            const command = new Command();
            command.parse([
                    'app',
                    'kvp',
                    '-g',
                    'test-key'
                ]
            );
            expect(command.isGetCommand()).toEqual(true);
        });
        test("checks if is not get command", () => {
            const command = new Command();
            command.parse([
                    'app',
                    'kvp',
                    '-s',
                    'test-key',
                    'test-value'
                ]
            );
            expect(command.isGetCommand()).toEqual(false);
        });
    });

    describe('#isSetCommand', () => {
        test("checks if is set command", () => {
            const command = new Command();
            command.parse([
                    'app',
                    'kvp',
                    '-s',
                    'test-key',
                    'test-value'
                ]
            );
            expect(command.isSetCommand()).toEqual(true);
        });
        test("checks if is not set command", () => {
            const command = new Command();
            command.parse([
                    'app',
                    'kvp',
                    '-g',
                    'test-key',
                ]
            );
            expect(command.isSetCommand()).toEqual(false);
        });
    });

    describe('#isDeleteCommand', () => {
        test("checks if is delete command", () => {
            const command = new Command();
            command.parse([
                    'app',
                    'kvp',
                    '-d',
                    'test-key',
                ]
            );
            expect(command.isDeleteCommand()).toEqual(true);
        });
        test("checks if is not delete command", () => {
            const command = new Command();
            command.parse([
                    'app',
                    'kvp',
                    '-g',
                    'test-key',
                ]
            );
            expect(command.isDeleteCommand()).toEqual(false);
        });
    });

    describe("#isCommand", () => {
        test("checks if is command", () => {
            const command = new Command();
            command.parse([
                    'app',
                    'kvp',
                    '-d',
                    'test-key',
                ]
            );
            expect(command.isCommand()).toEqual(true);
        });
    });

    describe("#getKey", () => {
        test("returns provided key", () => {
            const command = new Command();
            const key = 'test-key';
            command.parse([
                    'app',
                    'kvp',
                    '-g',
                    key,
                ]
            );
            expect(command.getKey()).toEqual(key);
        });

        test("throws exception when the key is not defined", () => {
            const command = new Command();
            expect(() => { command.getKey() }).toThrowError('The key is not defined');
        });
    });

    describe("#getValue", () => {
        test("returns the provided value", () => {
            const command = new Command();
            const key = 'test-key';
            const value = 'test-value';
            command.parse([
                    'app',
                    'kvp',
                    '-s',
                    key,
                    value
                ]
            );
            expect(command.getValue()).toEqual(value);
        });

        test("given no value returns empty string", () => {
            const command = new Command();
            const key = 'test-key';
            command.parse([
                    'app',
                    'kvp',
                    '-s',
                    key
                ]
            );
            expect(command.getValue()).toEqual("");
        });
    });
});