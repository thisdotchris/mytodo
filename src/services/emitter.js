import { EventEmitter } from "events";

const Emitter = new EventEmitter();

export function subscribe(listener) {
  Emitter.addListener("message", listener);
}

export function unsubscribe(listener) {
  Emitter.removeAllListeners(listener);
}

export function send(mssg) {
  Emitter.emit("message", mssg);
}
