const {Persister} = require('../../src/data-persistence/persister');

describe("Persister", () => {
    describe('#constructor', () => {
        test("creates the persister object", () => {
            const persister = new Persister();
            expect(persister.keyv).not.toBeUndefined();
        });
    });

    describe("#set", () => {
        test("saves the value for the key", () => {
            const persister = new Persister();
            const persisterKeyvSetSpy = jest.spyOn(persister.keyv, 'set').mockImplementation();
            const key = 'test-key';
            const value = 'test-value';
            persister.set(key, value);
            expect(persisterKeyvSetSpy).toHaveBeenCalledTimes(1);
            expect(persisterKeyvSetSpy).toHaveBeenCalledWith(key, value);
        });
    });

    describe("#get", () => {
        test("returns the value for the key", () => {
            const persister = new Persister();
            const persisterKeyvGetSpy = jest.spyOn(persister.keyv, 'get').mockImplementation();
            const key = 'test-key';
            persister.get(key);
            expect(persisterKeyvGetSpy).toHaveBeenCalledTimes(1);
            expect(persisterKeyvGetSpy).toHaveBeenCalledWith(key);
        });
    });

    describe("#delete", () => {
        test("deletes the key, value pair", () => {
            const persister = new Persister();
            const persisterKeyvDeleteSpy = jest.spyOn(persister.keyv, 'delete').mockImplementation();
            const key = 'test-key';
            persister.delete(key);
            expect(persisterKeyvDeleteSpy).toHaveBeenCalledTimes(1);
            expect(persisterKeyvDeleteSpy).toHaveBeenCalledWith(key);
        });
    });
});