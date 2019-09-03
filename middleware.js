import MQTT from 'mqtt';

let mqttclient;

const middleware = ({ dispatch, getState }) => next => action => {
  let topic;

  switch (action.type) {

    case 'MQTT:CONNECT':
      // Configure the object
      mqttclient = MQTT.connect(action.payload.url);
      // Attach the callbacks
      mqttclient.on('connect', () => {
        dispatch({ type: 'MQTT:CONNECTED', payload: { client: mqttclient, url: action.payload.url } });
      });
      mqttclient.on('close', () => dispatch({ type: 'MQTT:CLOSE' }));
      mqttclient.on('message', (topic, message) => {
        dispatch({ type: 'MQTT:MESSAGE', payload: message });
      });
      break;

    case 'MQTT:SUBSCRIBE':
      topic = action.payload.topic;
      mqttclient.subscribe(topic, () => {
          dispatch({ type: 'MQTT:SUBSCRIBED', payload: { topic } });
      });
      break;

    case 'MQTT:PUBLISH':
      // mqtt.publish('@demo', message);
      topic = getState().mqtt.topic;
      if (!topic) {
        dispatch({ type: 'MQTT:NOTOPIC' });
      } else {
        mqttclient.publish(topic, JSON.stringify(action.payload));
      }
      break;

    case 'MQTT:DISCONNECT':
      mqttclient.close();
      break;
  };
  return next(action);
};

export default middleware;
