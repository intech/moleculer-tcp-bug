const { ServiceBroker } = require("moleculer");

const broker = new ServiceBroker({
  logLevel: "debug",
  transporter: {
    type: "TCP",
    options: {
      // Enable UDP discovery
      udpDiscovery: true,
      // Reusing UDP server socket
      udpReuseAddr: true,
      // UDP port
      udpPort: 4445,
      // UDP bind address (if null, bind on all interfaces)
      udpBindAddress: null,
      // UDP sending period (seconds)
      udpPeriod: 30,
      // Multicast address.
      udpMulticast: "239.0.0.0",
      // Multicast TTL setting
      udpMulticastTTL: 1,
      // Send broadcast (Boolean, String, Array<String>)
      udpBroadcast: true,
      // TCP server port. Null or 0 means random port
      port: null,
      // Use hostname as preffered connection address
      useHostname: true,
      // Gossip sending period in seconds
      gossipPeriod: 2,
      // Maximum enabled outgoing connections. If reach, close the old connections
      maxConnections: 32,
    },
  },
});

broker.createService({
  name: "bench",
  events: {
    ping(ctx) {
      console.log(`[${ctx.broker.nodeID}] PING ${ctx.nodeID} ${ctx.params.id}`);
    },
  },
});

broker.start().then(async () => {
  setInterval(async() => console.log(await broker.call("$node.list")), 10000);
  let id = Math.floor(Math.random() * 100000);
  setInterval(async() => await broker.broadcast("ping", { id: id++ }), 10000);
});
