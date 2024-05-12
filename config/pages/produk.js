export const Produk = async function () {
    return new Promise(async (resolve, reject) => {
        let [{ Grid }, { Card }] = await call([
            import('../component/grid.js')
            , import('../component/card.js')
        ]);

        let page = el('div')
        .class('p-10 grid grid-cols-2')
        .child(
            el('div')
            .css({
                display: 'grid',
                gridTemplateColumns: '40% 60%'
            })
            .child(
                el('div').class('h-[100%]')
                .child(
                    el('div').class('p-[10px] h-[50%]')
                    .child(
                        el('div').class('h-[100%]').child(
                            el('div').class(`rounded-md h-[100%] bg-cover bg-[url('/assets/contoh.jpeg')]`)
                        )
                    )
                )
                .child(
                    el('div').class('p-[10px] h-[50%]')
                    .child(
                        el('div').class('h-[100%]').child(
                            el('div').class(`rounded-md h-[100%] bg-cover bg-[url('/assets/contoh.jpeg')]`)
                        )
                    )
                )
            )
            .child(
                el('div')
                .child(
                    el('div')
                    .class(`p-[10px]`)
                    .child(
                        el('div')
                            .class(`rounded-md bg-cover bg-[url('/assets/contoh.jpeg')]`)
                            .css({
                                height: '320px'
                            })
                    )
                )
            )
        )
        .child(
            el('div')
            .class('p-[10px]')
            .child(
                el('h1').class('text-xl').html("Judul produk")
            )
            .child(
                el('h1').class('text-xl font-bold').html("20.000.000")
            )
            .child(
                el('p').class('my-[10px] text-sm').html("Produk ini merukan produk premium di kelasnya dengan ukiran yang sangat rapi dan corak yang menarik. Dibuat dengan bagan yang berkualitas premium dan sudah di lapisi dengan anti rayap.")
            )
            .child(
                el('div').class('mb-[5px]').text('Bahan pembuatan :')
            )
            .child(
                el('div')
                    .class('text-[14px]')
                    .child(
                        el('div').cursor('pointer').class("inline-block mr-[5px] mb-[5px] rounded-md px-[10px] py-[4px] border-2").text('Kayu Jati Premium')
                    )
                    .child(
                        el('div').cursor('pointer').class("inline-block mr-[5px] mb-[5px] rounded-md px-[10px] py-[4px] border-2").text('Kain katun kualitas premium')
                    )
            )
        );

        resolve(page)
    }).catch((e) => {
        console.log(e);
    })
};