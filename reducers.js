import { combineReducers } from 'redux';

const initialState = {
  'client': null,
  'url': null,
  'topic': null,
  'messages': [],
  'error': false,
  'errorCode': null,
  'errorMessage': ''
}

const utf8TextDecoder = new TextDecoder("utf-8");

const mqttreducer = (state = initialState, action) => {
  switch (action.type) {

    case 'MQTT:SUBSCRIBED':
      state.topic = action.payload.topic;
      state.error = false;
      state.errorMessage = '';
      return Object.assign({}, state);

    case 'MQTT:CONNECTED':
      state.client = action.payload.client;
      state.url = action.payload.url;
      return Object.assign({}, state);

    case 'MQTT:NOTOPIC':
      state.error = true;
      state.errorMessage = 'MQTT:NOTOPIC';
      return Object.assign({}, state);

    case 'MQTT:MESSAGE':
      const payloadstring = utf8TextDecoder.decode(action.payload);
      let data;
      try {
        // must be json;
        data = JSON.parse(payloadstring);
      } catch (e) {
      }
      if (data) {
        state.messages.unshift(data);
        return Object.assign({}, state);
      }
      return state;

    default:
      return state;
  }
}

const allReducers = combineReducers({
  mqtt: mqttreducer,
});

export default allReducers;
