let ClientFacadeProcess = require('../obj/src/container/ClientFacadeProcess').ClientFacadeProcess;

try {
    new ClientFacadeProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
