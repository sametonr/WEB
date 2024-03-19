const net = require('net');

const HOST = '31.172.87.6';
const PORT = 2525;

const client = net.createConnection({ host: HOST, port: PORT }, () => {
  console.log('Sunucuya bağlandı.');
});

process.stdin.pipe(client);
client.pipe(process.stdout);

client.on('end', () => {
  console.log('Bağlantı kesildi.');
});

