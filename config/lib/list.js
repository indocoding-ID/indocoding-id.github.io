import {config} from '../index.js';
import { toolsConfig } from '../tools.js';
import { formBuilder } from './form.js';

export const list = function(e, data){
    let list = el('div');
    list.padding('10px')
    for(let item of data){
        list.child(
            el('div')
            .cursor('pointer')
            .css({
                display: 'grid',
                padding: '10px',
                marginBottom: '10px',
                background: 'white',
                borderRadius: '10px',
                gridTemplateColumns: '50px auto',
            })
            .child(
                el('div')
                .css(config.box.center)
                .radius('10px')
                .background('#ddd')
                .child(
                    el('i').class(item.icon).size('24px')
                )
            )
            .child(
                el('div')
                .padding('0 10px')
                .child(
                    el('h1').css('font-weight', 'bold').size('16px').html(item.title)
                )
                .child(
                    el('p').size('14px').html(item.desciption)
                )
            )
            .addModule('config', item && typeof item === 'object' ?item:{})
            .click(function(){
                let config = this.config;
                let [head,body,footer] = toolsConfig['Content'].get().children;
                if(body){
                    body.innerHTML = '';
                    formBuilder(config, body);
                }
            })
        )
    }
    e.appendChild(list.get())
}