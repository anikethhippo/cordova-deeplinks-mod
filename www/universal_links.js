var exec = require('cordova/exec'),
  channel = require('cordova/channel'),

  // Reference name for the plugin
  PLUGIN_NAME = 'UniversalLinks',

  // Default event name that is used by the plugin
  DEFAULT_EVENT_NAME = 'didLaunchAppFromLink';

// Plugin methods on the native side that can be called from JavaScript
pluginNativeMethod = {
  SUBSCRIBE: 'jsSubscribeForEvent',
  UNSUBSCRIBE: 'jsUnsubscribeFromEvent'
};

var universalLinks = {
  isDeepLink: null,

  initialize: function(eventName = 'eventName') {
    this.bindEvents(eventName);
  },
  // Bind Event Listeners
  bindEvents: function(eventName) {
    const self = this;
    document.addEventListener('deviceready', () => {
      self.onDeviceReady(eventName);
    }, false);
  },
  // deviceready Event Handler
  onDeviceReady: function(eventName) {
    const self = this;
    this.subscribe(eventName, (event) => {
      self.didLaunchAppFromLink(event);
    });
  },
  // store deeplink event
  didLaunchAppFromLink: function(eventData) {
    this.isDeepLink = eventData;
    console.log('Did launch application from the link: ' ,eventData)
  },
  // promise to check if app opened by DeepLink or not
  checkDeepLink: function (milliseconds = 2000) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (_this.event)
                resolve(_this.event);
            else
                reject();
        }, milliseconds);
    });
}
};

  /**
   * Subscribe to event.
   * If plugin already captured that event - callback will be called immidietly.
   *
   * @param {String} eventName - name of the event you are subscribing on; if null - default plugin event is used
   * @param {Function} callback - callback that is called when event is captured
   */
  subscribe: function(eventName, callback) {
    if (!callback) {
      console.warn('Universal Links: can\'t subscribe to event without a callback');
      return;
    }

    if (!eventName) {
      eventName = DEFAULT_EVENT_NAME;
    }

    var innerCallback = function(msg) {
      callback(msg.data);
    };

    exec(innerCallback, null, PLUGIN_NAME, pluginNativeMethod.SUBSCRIBE, [eventName]);
  },

  /**
   * Unsubscribe from the event.
   *
   * @param {String} eventName - from what event we are unsubscribing
   */
  unsubscribe: function(eventName) {
    if (!eventName) {
      eventName = DEFAULT_EVENT_NAME;
    }

    exec(null, null, PLUGIN_NAME, pluginNativeMethod.UNSUBSCRIBE, [eventName]);
  }
};

module.exports = universalLinks;
