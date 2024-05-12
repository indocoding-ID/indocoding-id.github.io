export const htmlTemplate = async function(body, id){
    let h = `<html>`
    h += `\n<head>`
    h += `\n<meta name="viewport" content="width=device-width, initial-scale=1" />`
    h += `\n<title>Landing Page</title>`
    h += `\n<link rel="stylesheet" href="./css/style-${id}.css" />`
    h += `\n<script src="./js/tw.js"></script>`
    h += `\n<script src="./js/script-${id}.js"></script>`
    h += `\n</head>`
    h += `\n<body>`
    h += body
    h += `\n</body>`
    h += `\n</html>`
    return h
}

function exportFileZip(blob, fileName) {
    // Create a File object from the Blob with type "application/zip"
    var file = new File([blob], fileName, { type: 'application/zip' });
    return file;
}

export const htmlParser = function(html){
    let dataImage = [];
    let htm = el('div').html(html).get()
    let fm = 'file-'+Date.now();
    let s = 1;
    for (let img of htm.querySelectorAll('img')){
        let [typefile, file] = img.src.split(';base64,')
        let type = (typefile?typefile:'').split(':').pop();
        let ext = type.split('/').pop()
        let alt = img.alt;  
        let name = alt ? alt+'.'+ext : fm+s+'.'+ext; 
        img.src = './assets/image/'+name;
        
        dataImage.push({
            name: name,
            type:type,
            alt:alt,
            data:file,
        });

        s++;
    }   
    return {
        dataImage: dataImage,
        html : htm.innerHTML
    };
}

export const SimpanAction = {
    editor : null,
    content : null,
    push : async function(){
        let { modalAction } = await import('./admin/component/modal.js?v=' + Version)
        let id = 'id-' + Date.now();
        let tw = await fetch('/external/tailwind.js');
        let twtext = await tw.text()
        let editor = this.editor;
        let imageObject = htmlParser(editor.getHtml());
        
        let projectdata = JSON.stringify(editor.getProjectData());

        let html = await htmlTemplate(imageObject.html, id);
        let js = editor.getJs();
        let css = editor.getCss();
        let data = {
            html: html,
            css: css,
            js: js
        }
        let zip = new JSZip();

        zip.file('index.html', html)
        zip.file('editor.json', projectdata)
        let cssfolder = zip.folder('css')
        let jsfolder = zip.folder('js')
        let assets = zip.folder('assets')
        let images = assets.folder('image')
        for(let img of imageObject.dataImage){
            images.file(img.name, img.data, {base64:true})
        }
        cssfolder.file('style-'+id+'.css', css != ''? css: ' ')
        jsfolder.file('script-' + id +'.js', js != ''? js: ' ')
        jsfolder.file('tw.js', twtext);
        zip.generateAsync({ type: "blob" })
        .then(function (content) {
            // see FileSaver.js
            SimpanAction.content = content;
            modalAction.show();
            // save to File Object
            // let myfile = exportFileZip(content, 'file.zip');
            // console.log(myfile);
        });
    } 
}

export const Admin = async function () {
    return new Promise(async (resolve, reject) => {

        let [
            { NavBarAction }
            , { FooterAction }
            , { Grid }
            , { Card }
            , { styleManager }
            , { Plugins }
            , { pluginsOpts }
        ] = await call([
            import('../component/navbar.js?v='+Version)
            , import('../component/footer.js?v='+Version)
            , import('../component/grid.js?v=' + Version)
            , import('../component/card.js?v=' + Version)
            , import('./admin/stylemanager.js?v=' + Version)
            , import('./admin/plugins.js?v=' + Version)
            , import('./admin/pluginsopt.js?v=' + Version)
        ]);
        let { modalSimpan } = await import('./admin/component/modal.js?v=' + Version)

        let dataGrid = [];

        for (let z = 0; z < 1; z++) {
            dataGrid.push(Card({
                image: '/assets/contoh.jpeg'
            }).get())
        }

        let page = null;
        
        /*
        if(!status){
            page = el('div').child(
                el('div').class('h-[60vh] flex justify-center items-center').child(
                    el('div')
                        .html('Anda Belum login')
                )
            );
        }
        */

        // if(status){
            NavBarAction.hide();
            FooterAction.hide();
            page = el('div')
            .child(
                el('div').html(`
                <div style="display: none">
                    <div class="gjs-logo-cont">
                        <a href="#"><img class="gjs-logo" src="img/grapesjs-logo-cl.png"></a>
                        <div class="gjs-logo-version"></div>
                    </div>
                </div>
                `)
            )
            .child(
                el('div')
                .class("flex items-center h-[60px] px-[10px] bg-gray-900")
                .child(
                    el('button').class('mx-[5px] px-[8px] py-[5px] text-[14px] bg-white rounded hover:bg-gray-100')
                    .child(
                        el('i').class('fas fa-save mr-[10px] text-indigo-600')
                    )
                    .child(
                        el('span').text('Simpan Template')
                    )
                    .click(()=>{
                        SimpanAction.push();
                    })
                )
                .child(modalSimpan())
            )
            .child(
                el('div')
                .id('gjs-'+Date.now())
                .height('calc(100vh - 60px)')
                .load(function(e){
                    let id = e.el.id;
    
                    // grapes script
    
                    let lp = './img/';
                    let plp = 'https://via.placeholder.com/350x250/';
                    let images = [
                        lp + 'team1.jpg',
                        lp + 'team2.jpg',
                        lp + 'team3.jpg',
                        plp + '78c5d6/fff',
                        plp + '459ba8/fff',
                        plp + '79c267/fff',
                        plp + 'c5d647/fff',
                        plp + 'f28c33/fff',
                        plp + 'e868a2/fff',
                        plp + 'cc4360/fff',
                        lp + 'work-desk.jpg',
                        lp + 'phone-app.png',
                        lp + 'bg-gr-v.png'
                    ];
    
                    let editor = grapesjs.init({
                        height: 'calc(100vh - 60x)',
                        container: '#'+id,
                        fromElement: true,
                        showOffsets: true,
                        assetManager: {
                            embedAsBase64: true,
                            assets: images
                        },
                        selectorManager: { componentFirst: true },
                        styleManager: styleManager,
                        plugins: Plugins,
                        pluginsOpts: pluginsOpts,
                    });

                    SimpanAction.editor = editor;
    
                    editor.I18n.addMessages({
                        en: {
                            styleManager: {
                                properties: {
                                    'background-repeat': 'Repeat',
                                    'background-position': 'Position',
                                    'background-attachment': 'Attachment',
                                    'background-size': 'Size',
                                }
                            },
                        }
                    });
    
                    let pn = editor.Panels;
                    let modal = editor.Modal;
                    let cmdm = editor.Commands;
    
                    // Update canvas-clear command
                    cmdm.add('canvas-clear', function () {
                        if (confirm('Are you sure to clean the canvas?')) {
                            editor.runCommand('core:canvas-clear')
                            setTimeout(function () { localStorage.clear() }, 0)
                        }
                    });
    
                    // Add info command
                    let mdlClass = 'gjs-mdl-dialog-sm';
                    let infoContainer = document.getElementById('info-panel');
    
                    cmdm.add('open-info', function () {
                        let mdlDialog = document.querySelector('.gjs-mdl-dialog');
                        mdlDialog.className += ' ' + mdlClass;
                        infoContainer.style.display = 'block';
                        modal.setTitle('About this demo');
                        modal.setContent(infoContainer);
                        modal.open();
                        modal.getModel().once('change:open', function () {
                            mdlDialog.className = mdlDialog.className.replace(mdlClass, '');
                        })
                    });
    
                    pn.addButton('options', {
                        id: 'open-info',
                        className: 'fa fa-question-circle',
                        command: function () { editor.runCommand('open-info') },
                        attributes: {
                            'title': 'About',
                            'data-tooltip-pos': 'bottom',
                        },
                    });
    
    
                    // Simple warn notifier
                    let origWarn = console.warn;
                    toastr.options = {
                        closeButton: true,
                        preventDuplicates: true,
                        showDuration: 250,
                        hideDuration: 150
                    };
                    console.warn = function (msg) {
                        if (msg.indexOf('[undefined]') == -1) {
                            toastr.warning(msg);
                        }
                        origWarn(msg);
                    };
    
                    // Add and beautify tooltips
                    [['sw-visibility', 'Show Borders'], ['preview', 'Preview'], ['fullscreen', 'Fullscreen'],
                    ['export-template', 'Export'], ['undo', 'Undo'], ['redo', 'Redo'],
                    ['gjs-open-import-webpage', 'Import'], ['canvas-clear', 'Clear canvas']]
                    .forEach(function (item) {
                        console.log(item);
                        pn.getButton('options', item[0])
                        .set('attributes'
                        , { title: item[1]
                            , 'data-tooltip-pos': 'bottom' 
                        });
                    });

                    [['open-sm', 'Style Manager'], ['open-layers', 'Layers'], ['open-blocks', 'Blocks']]
                    .forEach(function (item) {
                        pn.getButton('views'
                            , item[0]).set('attributes'
                            , { 
                                title: item[1]
                                , 'data-tooltip-pos': 'bottom' 
                            });
                    });

                    let titles = document.querySelectorAll('*[title]');
    
                    for (let i = 0; i < titles.length; i++) {
                        let el = titles[i];
                        let title = el.getAttribute('title');
                        title = title ? title.trim() : '';
                        if (!title)
                            break;
                        el.setAttribute('data-tooltip', title);
                        el.setAttribute('title', '');
                    }
    
                    // Store and load events
                    editor.on('storage:load', function (e) { console.log('Loaded ', e) });
                    editor.on('storage:store', function (e) { console.log('Stored ', e) });
    
                    // Do stuff on load
                    editor.on('load', function () {
                        let $ = grapesjs.$;
    
                        // Show borders by default
                        pn.getButton('options', 'sw-visibility').set({
                            command: 'core:component-outline',
                            'active': true,
                        });
    
                        // Show logo with the version
                        let logoCont = document.querySelector('.gjs-logo-cont');
                        document.querySelector('.gjs-logo-version').innerHTML = 'v' + grapesjs.version;
                        let logoPanel = document.querySelector('.gjs-pn-commands');
                        logoPanel.appendChild(logoCont);
    
    
                        // Load and show settings and style manager
                        let openTmBtn = pn.getButton('views', 'open-tm');
                        openTmBtn && openTmBtn.set('active', 1);
                        let openSm = pn.getButton('views', 'open-sm');
                        openSm && openSm.set('active', 1);
    
                        // Remove trait view
                        pn.removeButton('views', 'open-tm');
    
                        // Add Settings Sector
                        let traitsSector = $('<div class="gjs-sm-sector no-select">' +
                            '<div class="gjs-sm-sector-title"><span class="icon-settings fa fa-cog"></span> <span class="gjs-sm-sector-label">Settings</span></div>' +
                            '<div class="gjs-sm-properties" style="display: none;"></div></div>');
                        let traitsProps = traitsSector.find('.gjs-sm-properties');
                        traitsProps.append($('.gjs-traits-cs'));
                        $('.gjs-sm-sectors').before(traitsSector);
                        traitsSector.find('.gjs-sm-sector-title').on('click', function () {
                            let traitStyle = traitsProps.get(0).style;
                            let hidden = traitStyle.display == 'none';
                            if (hidden) {
                                traitStyle.display = 'block';
                            } else {
                                traitStyle.display = 'none';
                            }
                        });
    
                        // Open block manager
                        let openBlocksBtn = editor.Panels.getButton('views', 'open-blocks');
                        openBlocksBtn && openBlocksBtn.set('active', 1);
    
                        // Move Ad
                        // $('#gjs').append($('.ad-cont'));
                    });
    
                    // grapes end script
    
                }) 
            )
        // }
        
        if(page){
            resolve(page)
        }else{
            reject({status: 'Page error'})
        }
    }).catch((e) => {
        reject({error: e})
    })
};