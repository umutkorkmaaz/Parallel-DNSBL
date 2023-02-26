import {lookup} from "node:dns"

const timer = function(){
  const start = new Date();
  return {
    stop: function(){
      return (new Date()).getTime() - start.getTime();
    }
  }
}

process.on('message', function (message) {
  const begin = timer();
  lookup(`${message.ip}.${message.url}`, (err, addr) => {
    process.send({
      url: message.url,
      ip: message.ip,
      status: addr === undefined ? false : addr,
      duration: begin.stop()
    });
    process.disconnect();
  });
});
