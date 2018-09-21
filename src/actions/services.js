import assign from 'object-assign';

export function createService(name, params) {
    return {
        type: 'create-service',
        endpoint: { name: 'services' },
        method: 'POST',
        body: assign({}, params, {name})
    };
}

export function removeService(name) {
    return {
        type: 'remove-service',
        endpoint: { name: 'service', params: {name} },
        method: 'DELETE'
    };
}

export function updateService(name, params) {
    return {
        type: 'update-service',
        endpoint: { name: 'service', params: {name} },
        method: 'PATCH',
        body: params,
    }
}

// ROUTES
export function addUpstreamRoute(upstreamId, routeName, params) {
  return {
      type: 'add-upstream-target',
      endpoint: { name: 'service-routes', params: {upstreamId, routeName} },
      method: 'POST',
      body: assign({}, params, {target: targetName})
  };
}

export function removeUpstreamRoute(upstreamId, routeName) {
  return {
      type: 'remove-service-route',
      endpoint: { name: 'service-routes', params: {upstreamId, routeName} },
      method: 'POST',
      body: { target: routeName, weight: 0 }
  };
}