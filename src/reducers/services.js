import { parseService, parseRoute } from '../parsers/services';

const routes = (state, log) => {
    const { params: { type, endpoint: { params, body } }, content } = log;

    switch(type) {
        case 'add-service-route': return [
            // target with the same name overrides the previous target
            ...state.filter(route => target.target !== params.targetName),
            parseTarget(content)
        ];
        case 'update-upstream-target': return state.map(state => {
            if (state._info.id !== content.id) {
                return state;
            }

            return parseTarget(content);
        });
        case 'remove-upstream-target': return state.filter(target => target.target !== params.targetName);
        default: return state;
    }
};

const service = (state, log) => {
    const { params: { type, endpoint: { params, body } }, content } = log;

    switch (type) {
        case 'create-service': return {
            ...parseService(content),
            routes: []
        };
        case 'update-service':
            if (state._info.id !== content.id) {
                return state
            }

            return {
                ...state,
                ...parseService(content)
            };

        case 'add-service-route':
        case 'update-service-route':
        case 'remove-service-route':
            if (state._info.id !== params.serviceId) {
                return state;
            }

            return {
                ...state,
                targets: routes(state.routes, log)
            };

        default: return state;
    }
};

export default (state = [], log) => {
    if (log.type !== 'response') {
        return state;
    }

    const { params: { type, endpoint: { params } }, content } = log;

    switch (type) {
        case 'create-service': return [...state, service(undefined, log)];
        case 'remove-service': return state.filter(service => service.name !== params.name);

        case 'add-service-route':
        case 'update-service-route':
        case 'remove-service-route':
        case 'update-service': return state.map(state => service(state, log));

        default: return state;
    }
};
