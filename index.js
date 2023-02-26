const child_process = require('child_process');

let list = [
	"dnsbl-1.uceprotect.net",
	"dnsbl-2.uceprotect.net",
	"dnsbl-3.uceprotect.net",
	"dnsbl.dronebl.org",
	"dnsbl.sorbs.net",
	"zen.spamhaus.org",
	"bl.spamcop.net",
	"list.dsbl.org"
];


function lookup(ip){
    let done = 0;
    for (var i = 0; i < list.length; i++){
        var child = child_process.fork('./child');
        child.send({
            url: list[i],
            ip: ip
        });
        child.on('message', function(message) {
            if(message.status !== false){
                //Do what you want to do...
            }
            
            done++;
            if (done === list.length) {
                console.log('[parent] dnsbl checks finished.');
            }
        });
    }
}
