const kafka = require('./kafka');
const { sendCommand } = require('./command');
const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'mobile_media_controller_cons'+ Date.now()});
const cmdTopic = 'popout_controller_cmd';
const logTopic = 'popout_controller_logs';

const sendLogData = async (msgs = []) => {
  let messages = [];
  let producerConnection = producer.connect();
  
  for(let i = 0; i < msgs.length; ++i) {
    messages.push({
      key: '',
      value: JSON.stringify({
        message: msgs[i]
      })
    });
  }

  await producerConnection;

  return await producer.send({
      topic: logTopic,
      messages: [...messages]
    });
}

const processCommand = async (command) => {
  if(['up', 'down', 'stop'].includes(command)) {
    if(process.argv[3] !== '-no_op') {
      await sendCommand(command);
    } else {
      console.log('No operation sent to command driver.')
    }

    sendLogData([`MobileMedia: ${new Date()} - Executing command: ${command}`]);
  } else {
    sendLogData([`MobileMedia: ${new Date()} - Unknown command: ${command}`]);
  }
}

const consumeInstructions = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic: cmdTopic })
  await consumer.run({
    eachMessage: async ({ message }) => {
      const payload = JSON.parse(message.value);

      if(payload && payload.mobileMedia) {
        await processCommand(payload.mobileMedia);
      }
    },
  })
}

if(process.argv[2] === '-consumer') {
  (async () => {
    await consumeInstructions().catch(e => console.error(`[consumer] ${e.message}`, e))
  })();
} else if(process.argv[2] === '-test') {
  (async () => {
    const messages = [
      'Test: This is a test message from the Mobile Media',
      'Test: Andddd another one',
    ];

    const sendResults = await sendLogData(messages);

    console.log(sendResults);

    process.exit(0);
  })();
}
