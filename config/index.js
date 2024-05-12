export const conf = (async function(){
    try{
        let data = await call([
            import('./main.js?v=' + Version)
            , import('./tools.js?v=' + Version)
        ]);
        return data
    }catch(e){
        console.log(e);
    }
})();