import {
  DynamicFormMessage,
  DynamicFormOnChangeMessage,
} from "./dynamic-form-message.model";

export namespace MessageActions {
  export class PublishMessage {
    static readonly type = "[Message] Messages";
    constructor(public payload: DynamicFormMessage) {}
  }
  export class PublishOnChangeMessage {
    static readonly type = "[Message] Change Messages";
    constructor(public payload: DynamicFormOnChangeMessage) {}
  }
  export class ClearMessages {
    static readonly type = "[Message] Clear Messages";
    constructor() {}
  }
}
