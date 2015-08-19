var kafka = require('kafka-node'),
    zkQuorum = process.env['ZK_QUORUM'],
    HighLevelProducer = kafka.HighLevelProducer,
    HighLevelConsumer = kafka.HighLevelConsumer,
    client = new kafka.Client(zkQuorum, 'kafka-client'),
    producer = new HighLevelProducer(client),
    consumer = new HighLevelConsumer(client, [{ topic:'test' }], { groupId:'my-group' });

consumer.on('message', function(message) {
  console.log(message);
});

consumer.on('error', function(error) {
  console.log(error);
});

producer.on('ready', function() {
  var count = 0;
  setInterval(function() {
    producer.send([{
      topic: 'test',
      messages: 'count is ' + count
    }], function(err, data) {
      if (err) console.log(err);
    });
    count += 1;
  }, 3000);
});
