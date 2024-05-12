import { input } from "./formComponent/input.js";
import { secret } from "./formComponent/secret.js";

export const formBuilder = function(config, body){
    let {name} = config;
    let {form} = config.config? config.config : {};
    let forms = el('form').class(`p-2`);

    forms.load(function(e){
        e.el.addEventListener("submit", function (event) {
            event.preventDefault();
        });
    });
    
    if(Array.isArray(form)){
        for (let ItemForm of form){
            switch (ItemForm.type) {
                case "text":
                    forms.child(
                        input(ItemForm, name)
                    );
                    break;
                case "number":
                    forms.child(
                        input(ItemForm, name)
                    );
                    break;
                case "username":
                    forms.child(
                        input(ItemForm, name)
                    );
                    break;
                case "email":
                    forms.child(
                        input(ItemForm, name)
                    );
                    break;
                case "phone":
                    forms.child(
                        input(ItemForm, name)
                    );
                    break;
                case "password":
                    forms.child(
                        input(ItemForm, name)
                    );
                    break;
                case "secret":
                    forms.child(
                        secret(ItemForm, name)
                    );
                    break;
            }

        }
        form.length > 0 ?
        body.appendChild(forms.get()) : null;
    }
}