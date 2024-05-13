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
            this.Container.innerHTML = '';
            this.Container.appendChild(el('div')
                .child(
                    el('div').class('flex justify-center items-center h-[60vh]')
                        .child(
                            el('div')
                                .class('text-center')
                                .child(
                                    el('div').class('text-xl').html('Sorry!')
                                )
                                .child(
                                    el('div').html('Page your request not found')
                                )
                        )
                )
                .get());
        }
    }
}

export const routes = {};

export const navigateTo = (path) => {
    path = routePath + path;
    window.location.hash = path; // Update to use location.hash
    handleRoute();
};

export const handleRoute = (...args) => {
    const path = window.location.hash.slice(1); // Extract path from location.hash

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
        routes[matchedRoute](params, ...args);
    } else {
        Pages.call(''); // Handle 404 or default route
    }
};

// Listen for hashchange events
window.addEventListener('hashchange', handleRoute);