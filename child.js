const dns = require("dns");
process.on('message', function(message) {
    dns.lookup(`${message.ip}.${message.url}`,(err, addr) => {
        process.send({
            url: message.url,
            ip: message.ip,
            status: addr === undefined ? false : addr,
        })
        process.disconnect();
    })
});