export const Carousel = function(){
    let randomId = 'whell-'+Date.now();
    return el('div').html(`
        <div id="${randomId}" class="carousel w-full">
            <div id="slide1" class="carousel-item relative w-full">
                <div class="h-[250px] bg-gray-300 w-full rounded-md overflow-hidden"></div>
                <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide4" class="btn btn-circle">❮</a> 
                <a href="#slide2" class="btn btn-circle">❯</a>
                </div>
            </div> 
            <div id="slide2" class="carousel-item relative w-full">
                <div class="h-[250px] bg-gray-300 w-full rounded-md overflow-hidden"></div>
                <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide1" class="btn btn-circle">❮</a> 
                <a href="#slide3" class="btn btn-circle">❯</a>
                </div>
            </div> 
            <div id="slide3" class="carousel-item relative w-full">
                <div class="h-[250px] bg-gray-300 w-full rounded-md overflow-hidden"></div>
                <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide2" class="btn btn-circle">❮</a> 
                <a href="#slide4" class="btn btn-circle">❯</a>
                </div>
            </div> 
            <div id="slide4" class="carousel-item relative w-full">
                <div class="h-[250px] bg-gray-300 w-full rounded-md overflow-hidden"></div>
                <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide3" class="btn btn-circle">❮</a> 
                <a href="#slide1" class="btn btn-circle">❯</a>
                </div>
            </div>
        </div>
    `)
    .load(function(e){
        let main = e.el;
        main.querySelectorAll('a').forEach(function(w){
            w.addEventListener('click', function(e){
                e.preventDefault();
                let [loc,id] = this.href.split('#');
                let target = main.querySelector('#'+id);
                target.scrollIntoView({ behavior: 'smooth' });
            }, false)
        });
    })
}