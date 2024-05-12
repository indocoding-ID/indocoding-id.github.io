import { writeConf, readConf } from "./db.js";
import { uuid } from "./uuid.js";

export const secret = function (conf, nameA) {
    let n = el('div').class('mb-[10px]');
    n.child(
        el('label')
            .class('font-bold text-gray-600')
            .size('14px')
            .attr('for', conf.name ? conf.name : '')
            .html(conf.title ? conf.title : '')
    );
    n.child(
        el('div').css({
            display:'grid',
            gridGap:'5px',
            gridTemplateColumns: 'auto 120px'
        })
        .child(
            el('input')
                .id(conf.name ? conf.name : '')
                .name(conf.name ? conf.name : '')
                .padding('0 10px')
                .attr('disabled',true)
                .css({
                    border:'1px solid white'
                })
                .addModule('nameA', nameA)
                .class(`block w-full bg-gray-700 text-white rounded-md h-[35px]`)
                .type(conf.type ? conf.type : 'text')
                .hold(conf.placeholder ? conf.placeholder : '')
                .load(function (e) {
                    let a = e.el;
                    let nameA = a.nameA;
                    let name = a.name;
                    readConf(nameA, name, a);
                })
        )
        .child(
            el('button')
            .type('button')
            .class(`px-[5px] bg-white shadow-md py-[3px] rounded-md h-[35px]`)
            .text('Geneate')    
            .addModule('nameA', nameA)
            .addModule('name', conf.name ? conf.name : '')
            .click(function(){
                let nameA = this.nameA;
                let name = this.name;
                let [input] = this.parentNode.children;
                let newId = uuid();
                input.value = newId;
                writeConf(nameA, name, newId);
            })
        )
    );
    return n;
}