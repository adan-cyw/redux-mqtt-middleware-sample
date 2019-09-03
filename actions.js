const connect = (url = 'wss://test.mosquitto.org:8081') => ({
  type: 'MQTT:CONNECT',
  payload: { url }
});

const publish = (body) => ({
  type: 'MQTT:PUBLISH',
  payload: body
});

const subscribe = (topic) => ({
  type: 'MQTT:SUBSCRIBE',
  payload: { topic }
});

const ActionCreators = Object.assign({
  connect,
  publish,
  subscribe
});

export default ActionCreators;
