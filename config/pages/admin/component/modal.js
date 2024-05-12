export const modalAction  = {
    element : null,
    hide: function () {
        if (this.element && this.element instanceof HTMLElement) {
            this.element.style.display = 'none';
        }
    }
    , show: function () {
        if (this.element && this.element instanceof HTMLElement) {
            this.element.style.display = 'flex';
        }
    }
}

export const modalSimpan = function(){
    return el('div').class('fixed hidden items-center justify-center top-0 left-0 h-[100vh] w-[100vw]')
    .css('background', 'rgba(0,0,0,0.4)')
    .css('z-index', '9999')
    .load(function(e){
        modalAction.element = e.el;
    })
    .child(
        el('div')
        .class('w-[400px] h-[420px] bg-white rounded shadow-md')
        .css({
            display: 'grid'
            ,gridTemplateRows: 'auto 50px'
        })
        .child(
            el('div')
            .child(
                el('div')
                .class('p-5')
                .child(
                    el('h1').class("mb-2").text('Nama Projek')
                )
                .child(
                    el('input').class('p-2 bg-gray-100 w-full rounded-md mb-5')
                    .css('border', '1px solid #ddd')
                    .css('box-shadow', 'inset 0 0 5px #777')
                )
                .child(
                    el('h1').class("mb-2").text('Jenis Projek')
                )
                .child(
                    el('input').class('p-2 bg-gray-100 w-full rounded-md mb-5')
                    .css('border', '1px solid #ddd')
                    .css('box-shadow', 'inset 0 0 5px #777')
                )
                .child(
                    el('h1').class("mb-2").text('Deskripsi')
                )
                .child(
                    el('textarea').class('p-2 bg-gray-100 w-full h-[100px] rounded-md ')
                    .css('border', '1px solid #ddd')
                    .css('box-shadow', 'inset 0 0 5px #777')
                )
            )
        )
        .child(
            el('div').css('border-top', '1px solid #ddd')
            .child(
                el('div').class('p-[5px]')
                .child(
                    el('button').border('1px solid #ddd').class('mx-1 p-1 bg-blue-600 text-white rounded-md').text('Simpan')
                )
                .child(
                    el('button').border('1px solid #ddd').class('mx-1 p-1 bg-gray-100 rounded-md').text('Tutup')
                    .click(function(){
                        modalAction.hide()
                    })

                )
            )
        )
    )
    ;
}