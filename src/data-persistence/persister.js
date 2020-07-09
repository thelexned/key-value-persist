const Keyv = require('keyv');

function Persister() {
    this.keyv = new Keyv(`sqlite://${__dirname}/../../data/data.sqlite`);
}

Persister.prototype.set = function(key, value) {
    return this.keyv.set(key, value);
}

Persister.prototype.get = function (key) {
    return this.keyv.get(key);
}

Persister.prototype.delete = function(key) {
    return this.keyv.delete(key);
}

module.exports = {
    Persister
}