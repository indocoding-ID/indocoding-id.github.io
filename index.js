Promise.all([
    import('./config.js?v=' + Version)
    , import('./config/router.js?v=' + Version)
    , import('./config/component/loaderLayer.js?v=' + Version)
    , import('./config/index.js?v=' + Version)
    , import('./config/component/navbar.js?v=' + Version)
    , import('./config/component/footer.js?v=' + Version)
    , import('./config/menu/component.js?v=' + Version)
    , import('./config/pages/home.js?v=' + Version)
    , import('./config/pages/produk.js?v=' + Version)
    , import('./config/pages/admin.js?v=' + Version)
]).then(async function ([
    { configs }
    , {Pages, routes, navigateTo, handleRoute }
    , {loadLayer}
    , conf
    , {NavBar}
    , {Footer}
    , ls
    , {Home}
    , {Produk}
    , {Admin}
]) {
    let [{config}, {toolsConfig}] = await conf.conf
    
    const App = document.getElementById('app');
    
    let Container = el('div');

    Container.child(NavBar({
        title: configs.name,
        module : {
            go : navigateTo
        }
    }));

    Container.child(
        el('div')
        .load(function(e){
            
            Pages.Container = e.el;

            routes['/admin/builder'] = function(params){
                Admin().then(function(page){
                    Pages.call(page.get());
                })
            }
            
            routes['/produk/{id}'] = function(params){
                Produk().then(function(page){
                    Pages.call(page.get());
                })
            }
            
            routes['/'] = function(){
                Home().then(function(page){
                    Pages.call(page.get());
                })
            }

            if(location.hash == ''){
                location.hash = '/';
            }
            
            handleRoute();

        })
    );

    Container.child(Footer());

    Container.child(loadLayer());

    App.appendChild(Container.get())

})
.catch(function(e){
    console.log(e)
})
