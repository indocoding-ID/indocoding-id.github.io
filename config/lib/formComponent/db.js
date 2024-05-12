const xdb = function (dbname, listdbname = [], v = 0, func) {

    if (localStorage.getItem('dbv') != undefined) {
        if (localStorage.getItem('dbv') != v) {
            indexedDB.deleteDatabase("toDoList");
        }
    }

    var dbs = null;

    var request = window.indexedDB.open(dbname, 4);

    request.onsuccess = function (event) {
        dbs = request.result;
        func({
            add: function (table, obj) {
                // cek data
                var id = obj.id;
                this.read(table, id, function (aw) {
                    if (aw == null) {
                        var rq = dbs.transaction([table], "readwrite")
                            .objectStore(table)
                            .add(obj);
                    } else {
                        var request = dbs.transaction([table], "readwrite")
                            .objectStore(table)
                            .delete(id)
                        var rq = dbs.transaction([table], "readwrite")
                            .objectStore(table)
                            .add(obj);
                    }
                })

                return this;
            },
            read: function (table, id, func) {
                var transaction = dbs.transaction([table]);
                var objectStore = transaction.objectStore(table);
                var request = objectStore.get(id);
                request.onerror = function (event) {
                    console.log("Unable to retrieve daa from database!");
                };
                request.onsuccess = function (event) {
                    // Do something with the request.result!
                    if (request.result) {
                        func(request.result)
                    } else {
                        func(null);
                    }
                };
                return this;
            }
        })
    };
    request.onupgradeneeded = function (event) {
        dbs = event.target.result;
        dbs.onerror = function (event) {
            note.innerHTML += "<li>Error loading database.</li>";
        };
        // Create an objectStore for this database
        for (var i = 0; i < listdbname.length; i++) {
            dbs.createObjectStore(listdbname[i], { keyPath: "id" });
        }
    };
    localStorage.setItem('dbv', v);
}

export const dbread = function (params, func) {
    xdb('ebuild', ['ebuild-db'], 8, function (s) {
        s.read('ebuild-db', params, function (s) {
            if (s != undefined) {
                func(s.data);
            } else {
                func(null);
            }
        })
    })
}

export const dbwrite = function (params, data) {
    xdb('ebuild', ['ebuild-db'], 8, function (s) {
        s.add('ebuild-db', { id: params, data: data })
    });
}

export const writeConf = function(componen, name, value){
    dbread('form', function(f){
        let fa = f ? f : {};
        if(!fa[componen]){
            fa[componen] = {};
        } 
        if(!fa[componen][name]){
            fa[componen][name] = {};
        } 
        fa[componen][name] = value;
        dbwrite('form', fa);
    });
}

export const readConf = function(componen, name, w){
    dbread('form', function(f){
        let fa = f ? f : {};
        if(fa[componen]){
            if(fa[componen][name]){
                w.value = fa[componen][name];
            }
        } 
    });
}