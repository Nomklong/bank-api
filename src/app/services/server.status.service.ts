import app from "../../app";

export const getRoutes = (): Array<string> => {
  if (process.env.NODE_ENV === "production") {
    return [];
  }

  let route: any;
  const routes: Array<any> = [];

  app._router.stack.forEach((middleware: any) => {
    if (middleware.route) {
      // routes registered directly on the app
      routes.push(middleware.route);
    } else if (middleware.name === "router") {
      // router middleware
      middleware.handle.stack.forEach((handler: any) => {
        route = handler.route;
        route && routes.push(route);
      });
    }
  });

  return routes;
};
