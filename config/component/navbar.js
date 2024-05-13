export const NavBarAction = {
    element: null,
    hide: function(){
        if (this.element && this.element instanceof HTMLElement){
            this.element.style.display = 'none';
        }
    }
    ,show: function(){
        if (this.element && this.element instanceof HTMLElement){
            this.element.style.display = 'flex';
        }
    }
}

export const NavBar = function(config){
    return el('div').class('navbar shadow-md bg-base-100').html(`
        <div class="flex-1">
            <a id="home" class="btn btn-ghost text-xl">${config && config.title? config.title: '' }</a>
        </div>
        <div class="flex-none gap-2">
            <div class="form-control relative">
                <input id="search" type="text" placeholder="Search" class="input input-bordered w-[250px] md:w-[250px]" />
                <i class="absolute right-[15px] text-gray-600 cursor-pointer top-[15px] fa fa-times"></i>
            </div>
            <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                <div class="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src="${config && config.img ? config.img : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXHG7WpAh1i0UIPMZp4UWjUjbAAGLducRhvTBb0wjKTA&s`}" />
                </div>
            </div>
            <ul tabindex="0" class="mt-3 z-[1] p-2 shadow bg-white shadow-md menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li>
                <a id="profile" class="justify-between">
                    Profile
                    <span class="badge">New</span>
                </a>
                </li>
                <li><a>Settings</a></li>
                <li><a>Logout</a></li>
            </ul>
            </div>
        </div>
    `)
    .addModule('config', config ? config: {})
    .load(function(e){
        let nav = e.el;
        NavBarAction.element = nav;
        let home = nav.querySelector('#home')
        let profile = nav.querySelector('#profile')
        let config = e.el.config;
        let module = config.module;
        home.addEventListener('click', function(e){
            e.preventDefault();
            if(module && module.go && typeof module.go == 'function'){
                module.go('/');
            }
        }, false);
        profile.addEventListener('click', function(e){
            e.preventDefault();
            if(module && module.go && typeof module.go == 'function'){
                module.go('/admin');
            }
        }, false);
    })
}