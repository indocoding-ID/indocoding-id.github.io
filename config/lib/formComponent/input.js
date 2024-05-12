import { writeConf, readConf } from "./db.js";

export const input = function (conf, nameA) {
    let n = el('div').class('mb-[10px]');
    n.child(
        el('label')
            .class('font-bold text-gray-600')
            .size('14px')
            .attr('for', conf.name ? conf.name : '')
            .html(conf.title ? conf.title : '')
    );
    n.child(
        el('input')
            .id(conf.name ? conf.name : '')
            .name(conf.name ? conf.name : '')
            .padding('0 10px')
            .css({
                boxShadow: 'inset 0 0 8px #999',
                border: '1px solid #777'
            })
            .class(`block w-full rounded-md h-[35px]`)
            .type(conf.type ? conf.type : 'text')
            .hold(conf.placeholder ? conf.placeholder : '')
            .addModule('nameA', nameA)
            .keyup(function(){
                let nameA = this.nameA;
                let name = this.name;
                let value = this.value;
                writeConf(nameA, name, value);
            })
            .load(function(e){
                let a = e.el;
                let nameA = a.nameA;
                let name = a.name;
                readConf(nameA,name,a);
            })
    );
    return n;
}