import { StackContext, Api, EventBus, Table } from 'sst/constructs';

export function API({ stack }: StackContext) {
  const bus = new EventBus(stack, 'bus', {
    defaults: {
      retries: 10,
    },
  });

  const table = new Table(stack, 'activity', {
    defaults: {
      function: {
        bind: [bus]
      }
    },
    fields: {
      pk: 'string',
      sk: 'string',
    },
    primaryIndex: { partitionKey: 'pk', sortKey: 'sk' },
    stream: true,
    consumers: {
      activityCreated: 'packages/functions/src/activity-created.handler',
    },
  });

  const api = new Api(stack, 'api', {
    defaults: {
      function: {
        bind: [table],
        environment: {
          TABLE_NAME: table.tableName
        }
      },
    },
    cors: {
      allowMethods: ['ANY'],
      allowHeaders: ['Authorization'],
    },
    accessLog:
      '$context.identity.sourceIp,$context.requestTime,$context.httpMethod,$context.routeKey,$context.protocol,$context.status,$context.responseLength,$context.requestId',
    routes: {
      'ANY /{proxy+}': {
        function: {
          handler: 'packages/functions/src/app.run',
        }
      },
    },
  });

  bus.subscribe('activity.created', {
    handler: 'packages/functions/src/dummy.handler',
  });

  stack.addOutputs({
    ApiEndpoint: api.url,    
  });
}
