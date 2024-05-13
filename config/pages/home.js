export const Home = async function () {
   return new Promise(async (resolve, reject)=>{
       let [{ navigateTo }, { Grid }, { Card }, { Carousel }, { NavBarAction }] = await call([
            import('../router.js?v='+Version)
            ,import('../component/grid.js?v='+Version)
            ,import('../component/card.js?v='+Version)
            ,import('../component/carousel.js?v='+Version)
            ,import('../component/navbar.js?v='+Version)
        ]);

        NavBarAction.show();

        let dataGrid = [];
        let dataGrid2 = [];

        for (let z = 0; z < 3; z++) {
            dataGrid.push(Card({
                image: '/assets/contoh.jpeg'
                ,link : '/produk/kursi-pahatan-kayu-jati'
                , module: {
                    go: navigateTo
                }
            }).get())
            dataGrid2.push(Card({
                image: '/assets/contoh.jpeg'
                ,link : '/produk/kursi-pahatan-kayu-jati'
                , module: {
                    go: navigateTo
                }
            }).get())
        }

        let page = el('div').class('p-10')
        .child(
            Grid({
                data: dataGrid
            })
        )
        ;
        
        resolve(page)
   })
   .catch((e)=>{
    console.log(e);
   })
};