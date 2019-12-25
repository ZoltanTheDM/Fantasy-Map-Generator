(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Waterbodies = factory());
}(this, (function () {'use strict';
    const specify = function () {
        const lakes = pack.features.filter((f, i) => i && !f.land && f.group != "ocean");

        //generate names for lakes
        lakes.forEach((lake) => {
            lake.name = generateNameForLake(lake);
        });

        const oceans = pack.features.filter((f, i) => i && !f.land && f.group == "ocean");

        //oceans don't get names yet
        oceans.forEach((ocean)=>{
            ocean.name = "Ocean";
        });
    }

    function generateNameForLake(lake){
        //get cells that make up the lake
        const lake_cells = pack.cells.i.filter((c)=>{
            return pack.cells.f[c] == lake.i;
        });

        //get cells that are neighbors
        const neighbor_cells = [];
        lake_cells.forEach((c)=>{
            pack.cells.c[c].forEach((n)=>{
                if (!neighbor_cells.includes(n) && !lake_cells.includes(n)){
                    neighbor_cells.push(n);
                }
            });
        });

        const neighbor_burgs = {};
        const neighbor_cultures = {};
        const possible = {};
        let burgs_sum = 0;
        let culture_sum = 0;

        //get a list of sources for random names for lake
        neighbor_cells.forEach((c)=>{
            //get a possible name from burgs
            const b = pack.cells.burg[c];
            if (b != 0){
                //possiblity of being named after a berg is based on
                //its population (and other factors?)
                let value = pack.burgs[b].population;
                neighbor_burgs[b] = value;
                burgs_sum += value;
            }

            //get a possible cultre source name based on nearby cultures
            const cult = pack.cells.culture[c];
            if (cult != 0){
                //likelyhood of being named after a culture is based on
                //local population of cultures surrounding the lake
                if (!(cult in neighbor_cultures)){
                    neighbor_cultures[cult] = pack.cells.pop[c];
                }
                else{
                    neighbor_cultures[cult] += pack.cells.pop[c];
                }

                culture_sum += pack.cells.pop[c];
            }
        });

        if (burgs_sum == 0 && culture_sum == 0){
            //current edge case. No culture or city to name this
            //lake with.
            //TODO what should be the default behavior
            return "Unnamed Lake";
        }

        //decide if named after culture or city.
        const name_type = rw2({"culture":culture_sum, "burgs":burgs_sum});

        if(name_type == "burgs"){
            return burgLakeName(rw2(neighbor_burgs));
        }
        else if (name_type == "culture"){
            return cultureLakeName(rw2(neighbor_cultures));
        }

        console.error("This should be unreachable");
        return "";
    }

    function burgLakeName(burg_id){
        return pack.burgs[burg_id].name + " Lake";
    }

    function cultureLakeName(cult_id){
        return "Lake " + Names.getCultureShort(pack.cultures[cult_id].i);
    }

    function emptyObject(obj){
        return Object.entries(obj).length === 0 && obj.constructor === Object != 0;
    }

    return {specify, generateNameForLake};
})));


