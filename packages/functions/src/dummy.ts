import { EventHandler } from 'sst/node/event-bus';
import { Events } from '@sst-api/core/activity';

export const handler = EventHandler(Events.Created, async (evt) => {
  console.log('dummy handler: Activity created ====>', evt);
});
