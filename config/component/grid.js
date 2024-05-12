export const Grid = function(config){
    return el('div').class("grid mb-10 grid-cols-1 min-h-[200px] md:grid-cols-2 lg:grid-cols-3 gap-4")
    .addModule('config', config?config:{})
    .load(function(e){
        let grid = e.el;
        grid.innerHTML = '';  
        console.log(grid);
        let config = grid.config;
        if( config.data && Array.isArray(config.data) ){
            for(let item of config.data){
                if (item instanceof HTMLElement){
                    grid.appendChild(item);
                }
            }
        }
    })
}