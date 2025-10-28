import { Injectable } from "@angular/core";
import {
  Action,
  createSelector,
  Selector,
  State,
  StateContext,
} from "@ngxs/store";
import {
  DynamicFormMessage,
  DynamicFormOnChangeMessage,
} from "./dynamic-form-message.model";
import { MessageActions } from "./message.action";

export interface MessageStateModel {
  entities: DynamicFormMessage[];
  changes: DynamicFormOnChangeMessage[];
}

@State<MessageStateModel>({
  name: "messages",
  defaults: {
    entities: [],
    changes: [],
  },
})
@Injectable()
export class MessageState {
  constructor() {}

  /** selector to return all messages */
  @Selector()
  static messages(state: MessageStateModel) {
    return state.entities;
  }

  /** selector to return all messages */
  @Selector()
  static changes(state: MessageStateModel) {
    return state.changes;
  }

  /** return message by field name */
  static messageByFieldName(fieldName: string) {
    return createSelector([MessageState], (state: MessageStateModel) => {
      return state.entities.find((message) => message.fieldName === fieldName);
    });
  }

  /** return on change message by field name */
  static onChangeMessageByFieldName(fieldName: string) {
    return createSelector([MessageState], (state: MessageStateModel) => {
      return state.changes.find((message) => message.fieldName === fieldName);
    });
  }

  /** Publish message */
  @Action(MessageActions.PublishMessage)
  publishMessage(
    ctx: StateContext<MessageStateModel>,
    action: MessageActions.PublishMessage
  ) {
    const payload = action.payload;
    const state = ctx.getState();
    const stateIndex = state.entities.findIndex(
      (item) => item.fieldName === payload?.fieldName
    );
    if (stateIndex !== -1) {
      const updatedMessage = [...state.entities];
      updatedMessage[stateIndex] = payload;
      ctx.patchState({
        ...state,
        entities: updatedMessage,
      });
    } else {
      const updatedMessage = [payload, ...state.entities];
      ctx.patchState({
        ...state,
        entities: updatedMessage,
      });
    }
  }

  /** Publish on change message */
  @Action(MessageActions.PublishOnChangeMessage)
  publishOnChangeMessage(
    ctx: StateContext<MessageStateModel>,
    action: MessageActions.PublishOnChangeMessage
  ) {
    const payload = action.payload;
    const state = ctx.getState();
    const stateIndex = state.changes.findIndex(
      (item) => item.fieldName === payload?.fieldName
    );
    if (stateIndex !== -1) {
      const updatedOnChangeMessage = [...state.changes];
      updatedOnChangeMessage[stateIndex] = payload;
      ctx.patchState({
        ...state,
        changes: updatedOnChangeMessage,
      });
    } else {
      const updatedOnChangeMessage = [payload, ...state.changes];
      ctx.patchState({
        ...state,
        changes: updatedOnChangeMessage,
      });
    }
  }

  /** Clear all messages */
  @Action(MessageActions.ClearMessages)
  clearMessages(ctx: StateContext<MessageStateModel>) {
    const state = ctx.getState();
    ctx.setState({ ...state, entities: [], changes: [] });
  }
}
