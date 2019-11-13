"use strict";
function overviewWaterbodies(){
  if (customization) return;

  const body = document.getElementById("WaterbodyOverview");
  const animate = d3.transition().duration(2000).ease(d3.easeSinIn);

  if (modules.waterbodies) return;
  modules.waterbodies = true;

  waterbodiesOverviewAddLines();
  $("#WaterbodyOverview").dialog({
    title: "Water Bodies", resizable: false, width: fitContent(),
    position: {my: "right top", at: "right-10 top+10", of: "svg", collision: "fit"}
  });

  function waterbodiesOverviewAddLines(){
    let lines = "", totalArea = 0, totalPopulation = 0;;
    const unit = areaUnit.value === "square" ? " " + distanceUnitInput.value + "²" : " " + areaUnit.value;
    //get a collection of water features, therefore exclude land and first bogus index 
    const waterbodies = pack.features.filter((f, i) => !f.land && i);

    for (const water of waterbodies){
      console.log(water);
      lines += `<div class="states water" data-id=${water.i} data-name="${water.name}" data-type="${water.type}" data-length="${water.area}" >
        <span data-tip="Click to focus on waterbody" class="icon-dot-circled pointer"></span>
        <input data-tip="Water body proper name. Click to change. Ctrl + click to regenerate" class="riverName" value="${water.name}" autocorrect="off" spellcheck="false">
        <input data-tip="Water body type name. Click to change" class="riverType" value="${water.type}">
        <input data-tip="Water body group name. Click to change" class="riverType" value="${water.group}">
        <input data-tip="Water body number of cells." class="riverType" value="${water.cells}">
        <input data-tip="Water body area." class="riverType" value="${si(water.area) + unit}">
      </div>`
    }

    body.innerHTML = lines;
    // applySorting(WaterbodyHeader);
    // $("#WaterbodyOverview").dialog({width: fitContent()});
  }

}