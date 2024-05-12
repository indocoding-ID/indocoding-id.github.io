export const Pages = {
    Container : null,
    call : function(node){
        if (node instanceof HTMLElement){
            if(window){
                document.getElementById('app').scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth' // Opsional, memberikan efek animasi gulir
                });
            }
            this.Container.innerHTML = '';
            this.Container.appendChild(node);
        }else{
            console.log('data not html object');
        }
    }
}

export const routes = {};

export const navigateTo = (path) => {
    window.history.pushState({}, path, window.location.origin + path);
    handleRoute();
};

export const handleRoute = (...args) => {
    const path = window.location.pathname;

    let matchedRoute = null;
    let params = {};

    Object.keys(routes).forEach(route => {
        const routePattern = new RegExp(`^${route.replace(/{\w+}/g, '([\\w-]+)').replace(/\//g, '\\/')}$`);
        const match = path.match(routePattern);
        if (match) {
            matchedRoute = route;
            const paramNames = route.match(/{\w+}/g) || [];
            paramNames.forEach((paramName, index) => {
                params[paramName.replace(/[{}]/g, '')] = match[index + 1];
            });
        }
    });

    if (matchedRoute) {
        routes[matchedRoute](params, ...args); // Mengirimkan parameter ke fungsi routes[matchedRoute]
    } else {
        console.log('Route not found');
        // Add code to handle 404 or default route
    }
};