export const loadLayer = function(){
    return el('div').css({zIndex: '999'}).class('fixed flex justify-center items-center h-[100vh] w-[100vw] top-0 left-0 bg-gray-100').html(`
        <div class="text-center">
            <div class="w-full">
                <span class="loading loading-ring loading-lg"></span>
            </div>
            <div class="w-full">
                <h1 class="text-xl">Selamat datang</h1>
                <p>Tunggu sebentar halaman akan di muat</p>
            </div>
        <div>
    `).load((e) => {
        let container = e.el;
        setTimeout(()=>{
            container.style.display = 'none';
        },1000);
    });
}