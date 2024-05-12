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
            el('div')
            .class('mb-20 text-center')
            .child(
                el('div')
                .class('inline-block w-[540px]')
                .child(
                    el('h1').class('text-2xl mb-3 text-center')
                    .text('Selamat datang di toko kami')
                )
                .child(
                    el('p').class('text-md text-center')
                    .text('Buat website anda dengan lebih mudah bersama kami, cukup pilih template dan publish ke website/hosting anda.')
                )
                .child(
                    el('p').class('text-md mb-3 text-center')
                    .text('Atau buat website anda sendiri cukup drag and drop')
                )
                .child(
                    el('button')
                    .class('text-md px-[10px] shadow-md py-[5px] rounded-md bg-blue-600 text-white hover:bg-blue-800 text-center')
                    .text('klik untuk memulai')
                )
            )
        )
        .child(
            el('div').class('mb-3')
            .child(
                el('h1').class('text-xl font-bold').text('Produk Kami')
            )
        )
        .child(
            Grid({
                data: dataGrid
            })
        )
        .child(
            el('div').class('mb-3')
            .child(
                el('h1').class('text-xl font-bold').text('Produk Populer')
            )
        )
        .child(
            Grid({
                data: dataGrid2
            })
        )
        ;
        
        resolve(page)
   })
   .catch((e)=>{
    console.log(e);
   })
};