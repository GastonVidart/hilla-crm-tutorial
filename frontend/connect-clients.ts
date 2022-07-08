import { MiddlewareContext, MiddlewareNext, ConnectClient } from '@hilla/frontend';
import { uiStore } from './stores/app-store';

const client = new ConnectClient({
  prefix: 'connect',
  middlewares: [
    async (context: MiddlewareContext, next: MiddlewareNext) => {
      const { endpoint, method, params } = context;
      console.log(
        `Sending request to endpoint: ${endpoint} ` + `method: ${method} ` + `parameters: ${JSON.stringify(params)} `
      );

      // Also, the context contains the `request`, which is a Fetch API `Request`
      // instance to be sent over the network.
      const request: Request = context.request;
      console.log(`${request.method} ${request.url}`);

      const response: Response = await next(context);
      // Log out if the authentication has expired
      if (response.status === 401) {
        uiStore.logout();
      }

      // The response is a Fetch API `Response` object.
      console.log(`Received response: ${response.status} ${response.statusText}`);
      console.log(await response?.text());

      // A middleware returns a response.
      return response;
    },
  ],
});

export default client;
