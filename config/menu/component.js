export const Component = [
    {
        icon : 'fas fa-cog',
        name : 'home',
        title : 'Project',
        desciption : 'Config project app'
    }
    ,{
        icon : 'fas fa-cog',
        name : 'home',
        title : 'Home',
        desciption : 'Config setting app'
    }
    ,{
        icon : 'fas fa-cog',
        name : 'menus',
        title : 'Menus',
        desciption : 'Config setting menu app'
    }
    ,{
        icon : 'fas fa-cog',
        name : 'crud',
        title : 'CRUD',
        desciption : 'Config crud'
    }
    ,{
        icon : 'fas fa-cog',
        name : 'report',
        title : 'Report',
        desciption : 'Config setting report app'
    }
    ,{
        icon : 'fas fa-cog',
        name : 'env',
        title : 'Config .env',
        desciption : 'Config setting env app',
        config : {
            form: [
                {
                    title : 'SECRET_KEY',
                    name: 'SECRET_KEY',
                    type : 'secret',
                    placeholder : ''
                }
                ,{
                    title : 'SESSION',
                    name : 'SESSION',
                    type : 'secret',
                    placeholder : ''
                }
                ,{
                    title : 'APPNAME',
                    name : 'APPNAME',
                    type : 'text',
                    placeholder : ''
                }
                ,{
                    title : 'PATH',
                    name : 'PATH',
                    type : 'text',
                    placeholder : ''
                }
                ,{
                    title : 'ASSET',
                    name : 'ASSET',
                    type : 'text',
                    placeholder : ''
                }
                ,{
                    title : 'HOST',
                    name : 'HOST',
                    type : 'text',
                    placeholder : ''
                }
                ,{
                    title : 'USERNAME',
                    name : 'USERNAME',
                    type : 'text',
                    placeholder : ''
                }
                ,{
                    title : 'PASSWORD',
                    name : 'PASSWORD',
                    type : 'password',
                    placeholder : ''
                }
                ,{
                    title : 'DATABASE',
                    name : 'DATABASE',
                    type : 'text',
                    placeholder : ''
                }
            ]
        }
    }
    , {
        icon: 'fas fa-cog',
        name: 'report',
        title: 'Publish',
        desciption: 'Publish App'
    }
];