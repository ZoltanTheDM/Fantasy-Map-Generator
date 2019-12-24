(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Waterbodies = factory());
}(this, (function () {'use strict';
    const specify = function () {
        const lakes = pack.features.filter((f, i) => i && !f.land && f.group != "ocean");
        console.log(pack);
        console.log(pack.cells);

        lakes.forEach((lake) => {
            //get cells that make up the lake
            // console.log(lake);
            const lake_cells = pack.cells.i.filter((c)=>{
                return pack.cells.f[c] == lake.i;
            });
            // console.log(lake_cells);
            var neighbor_cells = [];

            //get cells that are neighbors
            lake_cells.forEach((c)=>{
                pack.cells.c[c].forEach((n)=>{
                    if (!neighbor_cells.includes(n) && !lake_cells.includes(n)){
                        neighbor_cells.push(n);
                    }
                });
            });
            // console.log(neighbor_cells);

            //get a list of possible random names
            var neighbor_burgs = [];
            var neighbor_cultures = [];
            neighbor_cells.forEach((c)=>{
                const b = pack.cells.burg[c];
                if (b != 0){// && !neighbor_burgs.includes(b)){
                    neighbor_burgs.push(b);
                }

                const cult = pack.cells.culture[c];
                if (cult != 0){// && !neighbor_cultures.includes(cult)){
                    neighbor_cultures.push(cult);
                }
            });

            console.log(ra(neighbor_burgs));
            console.log(ra(neighbor_cultures));
            var possible = {};
            // possible["Lake "+] = 1;
            console.log(possible);
        });
    }

    return {specify};
})));


