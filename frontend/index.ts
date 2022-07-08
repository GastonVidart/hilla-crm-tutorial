import { Router } from '@vaadin/router';
import { routes, ViewRoute } from './routes';

export const router = new Router(document.querySelector('#outlet'));

router.setRoutes(routes);

window.addEventListener('vaadin-router-location-changed', (e) => {
  const activeRouter = router.location.route as ViewRoute;
  document.title = activeRouter.title ?? 'HillaCRM';
});
