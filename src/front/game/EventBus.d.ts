export declare const EventBus: {
  emit: (event: string, payload?: any) => void;
  on: (event: string, callback: (payload?: any) => void) => void;
  off: (event: string, callback: (payload?: any) => void) => void;
};

export declare const USER_EVENT: string;
