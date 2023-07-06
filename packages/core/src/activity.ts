import { z } from 'zod';
import crypto from 'crypto';

import { createEventBuilder } from 'sst/node/event-bus';

const event = createEventBuilder({
  bus: 'bus',
});

export const Events = {
  Created: event('activity.created', {
    id: z.string(),
    originalTimestamp: z.string().datetime(),
    payload: z.any(),
  }),
};

export async function create(payload: Record<string, unknown>) {
  const id = crypto.randomUUID();

  await Events.Created.publish({
    id,
    originalTimestamp: new Date().toISOString(),
    payload
  });
}
