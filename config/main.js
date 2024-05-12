export let config = {
    body: {
        css: {
            margin: '0'
        }
    },
    container: {
        css: {
            display: 'grid',
            gridTemplateColumns: 'calc(100vw /3) calc(100vw /3) calc(100vw /3)',
            width: '100vw',
            height: '100vh',
            background: 'blue'
        }
    },
    tools: {
        css: {
            background: '#ddd'
            , overflow: 'hidden'
            , borderRight: '1px solid #ddd'
        }
    },
    pages: {
        css: {
            background: 'white'
            , overflowY: 'scroll'
            , overflowX: 'hidden'
        }
    },
    box: {
        center: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
        , centerItems: {
            display: 'flex',
            alignItems: 'center',
        }
    },
}