var fs = require('fs');
var path = require('path');
var _ = require('underscore');

var config = {

    port: 10054

};

var configPath;
process.argv.forEach(function (val, idx) {

    if (/^config\=(.*)$/.test(val)) {

        configPath = val.replace('config=', '');

    }

});

if (!configPath) {

    configPath = path.join(process.cwd(), './react-hydra.json');

}

try {

    config = _.extend(
        config,
        JSON.parse(
            fs.readFileSync(configPath) + ''));

} catch (ex) {

    console.warn(
        'problem occurred loading configuration file, using default configuration instead:\n\t{0}\n'
            .replace('{0}', ex.message)
            .replace('{1}', ex.stack));

}

module.exports = config;
