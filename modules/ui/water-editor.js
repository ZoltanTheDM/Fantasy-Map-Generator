"use strict";
function overviewWaterbodies(){
  if (customization) return;

  if (modules.waterbodies) return;
  modules.waterbodies = true;

  const body = document.getElementById("waterbodyBody");
  const animate = d3.transition().duration(2000).ease(d3.easeSinIn);

  waterbodiesOverviewAddLines();
  $("#waterbodyOverview").dialog({
    title: "Water Bodies", resizable: false, width: fitContent(), close: closeWaterOverview,
    position: {my: "right top", at: "right-10 top+10", of: "svg", collision: "fit"}
  });
  body.focus();

  function waterbodiesOverviewAddLines(){
    let lines = "", totalArea = 0, totalCells = 0;
    const unit = areaUnit.value === "square" ? " " + distanceUnitInput.value + "²" : " " + areaUnit.value;
    //get a collection of water features, therefore exclude land and first bogus index 
    const waterbodies = pack.features.filter((f, i) => !f.land && i);

    for (const water of waterbodies){
      lines += `<div class="states water" data-id=${water.i} data-name="${water.name}" data-type="${water.type}" data-group="${water.group}" data-cells="${water.cells}" data-area="${water.area}" >
        <span data-tip="Click to focus on waterbody" class="icon-dot-circled pointer"></span>
        <input data-tip="Water body proper name. Click to change. Ctrl + click to regenerate" class="riverName" value="${water.name}" autocorrect="off" spellcheck="false">
        <input data-tip="Water body type name." class="riverType" value="${water.type}">
        <input data-tip="Water body group name." class="riverType" value="${water.group}">
        <input data-tip="Water body number of cells." class="riverType" value="${water.cells}">
        <input data-tip="Water body area." class="riverType" value="${si(water.area) + unit}">
      </div>`
      totalArea += water.area;
      totalCells += water.cells;
    }

    body.innerHTML = lines;

    body.querySelectorAll("div.water").forEach(el => {
      el.addEventListener("click", selectWaterOnLineClick);
      el.addEventListener("mouseenter", ev => waterHighlightOn(ev));
      el.addEventListener("mouseleave", ev => waterHighlightOff(ev));
    });

    WaterbodiesFooterNumber.innerHTML = waterbodies.length;
    WaterbodiesFooterCells.innerHTML = totalCells;
    WaterbodiesFooterArea.innerHTML = si(totalArea) + unit;
    applySorting(waterbodyHeader);
    $("#waterbodyOverview").dialog({width: fitContent()});
  }

  function closeWaterOverview() {
    debug.select("#waterbodyOverview").remove();
    modules.waterbodies = false;
  }

  function selectWaterOnLineClick(){
  }

  function waterHighlightOn(event){
    // const water = +event.target.dataset.id;
    // if (customization || !water) return;
    // const path = waterBody.select("#water"+water).attr("d");
    // debug.append("path").attr("class", "highlight").attr("d", path)
    //   .attr("fill", "none").attr("stroke", "red").attr("stroke-width", 1).attr("opacity", 1)
    //   .attr("filter", "url(#blur1)").call(transition);
  }

  function waterHighlightOff(){
    // debug.selectAll(".highlight").each(function(el) {
    //   d3.select(this).call(removePath);
    // });
  }


}