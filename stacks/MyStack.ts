import { StackContext, Api } from "sst/constructs";

export function API({ stack }: StackContext) {
  const api = new Api(stack, "api", {
    cors: {
      allowMethods: ["ANY"],
      allowHeaders: ["Authorization"],
    },
    accessLog:
      "$context.identity.sourceIp,$context.requestTime,$context.httpMethod,$context.routeKey,$context.protocol,$context.status,$context.responseLength,$context.requestId",
    routes: {
      'ANY /{proxy+}': {
        function: {
          handler: "packages/functions/src/app.run",
        }
      },
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
