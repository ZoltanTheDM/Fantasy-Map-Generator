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
        <input data-tip="Water body proper name. Click to change. Ctrl + click to regenerate" class="waterName" value="${water.name}" autocorrect="off" spellcheck="false">
        <input data-tip="Water body type name." class="waterType" value="${water.type}">
        <input data-tip="Water body group name." class="waterGroup" value="${water.group}">
        <input data-tip="Water body number of cells." class="waterCells" value="${water.cells}">
        <input data-tip="Water body area." class="waterArea" value="${si(water.area) + unit}">
      </div>`
      totalArea += water.area;
      totalCells += water.cells;
    }

    body.innerHTML = lines;

    body.querySelectorAll("div.water").forEach(el => {
      el.addEventListener("click", selectWaterOnLineClick);
    body.querySelectorAll("div > input.waterName").forEach(el => el.addEventListener("input", changeWaterName));
    body.querySelectorAll("div > input.waterName").forEach(el => el.addEventListener("click", regenerateWaterName));
      el.addEventListener("mouseenter", ev => waterHighlightOn(ev));
      el.addEventListener("mouseleave", ev => waterHighlightOff(ev));
    });
    body.querySelectorAll("div > span.icon-dot-circled").forEach(el => el.addEventListener("click", zoomToLake));

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

  function changeWaterName() {
    if (this.value == "") tip("Please provide a proper name", false, "error");
    const water = +this.parentNode.dataset.id;
    pack.features.find(w => w.i === water).name = this.value;
    this.parentNode.dataset.name = this.value;
  }

  function regenerateWaterName(event) {
    if (!event.ctrlKey) return;
    const water = +this.parentNode.dataset.id;
    const w = pack.features.find(w => w.i === water);
    w.name = this.value = this.parentNode.dataset.name = Waterbodies.generateNameForLake(w);
  }

  function selectWaterOnLineClick(){
  }

  function waterHighlightOn(event){
    const water = +event.target.dataset.id;
    if (customization || !water) return;

    var path_list;
    if (pack.features[water].type == "lake"){
      path_list = [lakes.select("#lake_"+water).attr("d")];
    }
    else if (pack.features[water].type == "ocean"){
      path_list = [];
      defs.select("#water").selectAll("path").each(function(d, i, a){
        //TODO is there a better way of getting this value.
        //this seems rather unsafe
        path_list.push(a[i].attributes["d"].nodeValue);
      });
    }

    path_list.forEach(path => {
      debug.append("path").attr("class", "highlight").attr("d", path)
        .attr("fill", "none").attr("stroke", "red").attr("stroke-width", 1).attr("opacity", 1)
        .attr("filter", "url(#blur1)");
    });
  }

  function removePath(path) {
    path.transition().duration(1000).attr("opacity", 0).remove();
  }

  function waterHighlightOff(){
    debug.selectAll(".highlight").each(function(el) {
      d3.select(this).call(removePath);
    });
  }

  function zoomToLake() {
    const w = +this.parentNode.dataset.id;
    const lake = lakes.select("#lake_"+w).node();
    highlightElement(lake);
  }


}