interface Window {
    universalLinks: Deeplink;
}


/**
* The StatusBar object provides some functions to customize the iOS and Android StatusBar.
*/
interface Deeplink {

    dpLink: Object;

    host: String;

    eventName:  String;

    regex: RegExp | String;
    /**
    */
   initialize: () => void;

    /**
    */
   bindEvents: () => void;

    /**
    */
   onDeviceReady: () => void;

    /**
    */
   didLaunchAppFromLink: (eventName: string) => void;

    /**
    */
   validateDeeplink: () => void;

    /**

    */
   checkDeepLink: (milliseconds: Number) => Promise<any>;

    /**

    */
   subscribe: (eventName: String, callback: any) => void;

    /**
    */
   unsubscribe: (eventName: String) => void;
}

declare var universalLinks: Deeplink;