import { fork } from 'node:child_process';

let list = [
  "ipbl.zeustracker.abuse.ch",
  "0spam-killlist.fusionzero.com",
  "rbl.abuse.ro",
  "spam.dnsbl.anonmails.de",
  "dnsbl.anticaptcha.net",
  "orvedb.aupads.org",
  "rsbl.aupads.org",
  "block.ascams.com",
  "superblock.ascams.com",
  "aspews.ext.sorbs.net",
  "ips.backscatterer.org",
  "b.barracudacentral.org",
  "list.bbfh.org",
  "blackholes.tepucom.nl",
  "netscan.rbl.blockedservers.com",
  "rbl.blockedservers.com",
  "spam.rbl.blockedservers.com",
  "list.blogspambl.com",
  "blacklist.sci.kun.nl",
  "cbl.anti-spam.org.cn",
  "cblplus.anti-spam.org.cn",
  "cblless.anti-spam.org.cn",
  "cdl.anti-spam.org.cn",
  "bogons.cymru.com",
  "v4.fullbogons.cymru.com",
  "rbl.dns-servicios.com",
  "dnsblchile.org",
  "bl.drmx.org",
  "dnsbl.dronebl.org",
  "rbl.fasthosts.co.uk",
  "fnrbl.fast.net",
  "forbidden.icm.edu.pl",
  "black.junkemailfilter.com",
  "dnsbl.cobion.com",
  "spamrbl.imp.ch",
  "wormrbl.imp.ch",
  "rbl.interserver.net",
  "mail-abuse.blacklist.jippg.org",
  "dnsbl.justspam.org",
  "dnsbl.kempt.net",
  "spamlist.or.kr",
  "bl.mailspike.net",
  "z.mailspike.net",
  "bl.mav.com.br",
  "cidr.bl.mcafee.com",
  "images.rbl.msrbl.net",
  "phishing.rbl.msrbl.net",
  "spam.rbl.msrbl.net",
  "relays.nether.net",
  "unsure.nether.net",
  "spam.pedantic.org",
  "psbl.surriel.com",
  "rbl.schulte.org",
  "rbl.realtimeblacklist.com",
  "bl.scientificspam.net",
  "bl.score.senderscore.com",
  "dnsbl.sorbs.net",
  "proxies.dnsbl.sorbs.net",
  "relays.dnsbl.sorbs.net",
  "dul.dnsbl.sorbs.net",
  "zombie.dnsbl.sorbs.net",
  "block.dnsbl.sorbs.net",
  "escalations.dnsbl.sorbs.net",
  "smtp.dnsbl.sorbs.net",
  "socks.dnsbl.sorbs.net",
  "spam.dnsbl.sorbs.net",
  "recent.spam.dnsbl.sorbs.net",
  "new.spam.dnsbl.sorbs.net",
  "backscatter.spameatingmonkey.net",
  "badnets.spameatingmonkey.net",
  "bl.spameatingmonkey.net",
  "netbl.spameatingmonkey.net",
  "bl.spamcop.net",
  "sbl.spamdown.org",
  "spamsources.fabel.dk",
  "bl.suomispam.net",
  "gl.suomispam.net",
  "multi.surbl.org",
  "dnsrbl.swinog.ch",
  "rbl2.triumf.ca",
  "truncate.gbudb.net",
  "dnsbl-0.uceprotect.net",
  "dnsbl-1.uceprotect.net",
  "dnsbl-2.uceprotect.net",
  "dnsbl-3.uceprotect.net",
  "blacklist.woody.ch",
  "db.wpbl.info",
  "bl.blocklist.de"
];

function isValid(ip){
  const regex = /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/gm;
  return regex.test(ip);
}

export function lookup(ip) {
  let done = 0;
  for (var i = 0; i < list.length; i++) {
    var child = fork('node_modules/parallel-dnscheck/child.js');
    child.send({
      url: list[i],
      ip: ip,
    });
    child.on('message', function (message) {
      if (message.status !== false) {
      }
      console.log(message);

      done++;
      if (done === list.length) {
        console.log('[parent] dnsbl checks finished.');
      }
    });
  }
}
