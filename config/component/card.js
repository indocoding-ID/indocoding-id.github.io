export const Card = function(config){
    return el('div').cursor('pointer')
    .data('link', config && config.link? config.link : `#`)
    .addModule('module', config && config.module? config.module : {})
    .load(function(e){
        e.el.addEventListener('click', function(){
            let link = this.dataset.link;
            let module = this.module;
            if(module.go && typeof module.go == 'function'){
                module.go(link);
            }
        },false);
    }).html(`
        <div class="card w-full bg-base-100 shadow-xl">
        <figure class="h-[250px] bg-cover bg-[url('${config && config.image ? config.image: `https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg`}')]">
            <img class="hidden" src="${config && config.image ? config.image: `https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg`}" alt="Shoes" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">
            ${config && config.title ? config.title : 'Shoes!'}
            <div class="badge badge-secondary">NEW</div>
            </h2>
            <p>${config && config.deskripsi? config.deskripsi : `Deskripsi ...`}</p>
            <div class="card-actions justify-end">
                <div class="text-xl py-[5px]">Rp ${config && config.harga ? config.harga : '24.000.000'}</div> 
            </div>
        </div>
        </div>
    `)
} 