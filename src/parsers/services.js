
export const parseService = ({
  name,
  host,
  port,
  path,
  protocol,
  id,
  created_at,
  orderlist
}) => {
  return {
      name,
      attributes: {
        host,
        port,
        path,
        protocol
      },
      _info: {
          id,
          created_at,
          orderlist
      }
  };
};

export const parseServices = (services) => {
  return services.map(service => {
      const { name, ...rest } = parseService(service);

      return { name, targets: parseServiceRoutes(service.route), ...rest };
  });
};

export const parseRoute = ({
  target,
  hosts,
  paths,
  methods,
  protocols,
  id,
  service_id,
  created_at
}) => {
  return {
      target,
      attributes: {
          hosts,
          methods,
          protocols,
          paths
      },
      _info: {
          id,
          service_id,
          created_at
      }
  }
};

function parseServiceRoutes(routes) {
  if (!Array.isArray(routes)) {
      return [];
  }

  return routes.map(parseRoute);
}
