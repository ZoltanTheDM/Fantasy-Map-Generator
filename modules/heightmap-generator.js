(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.HeightmapGenerator = factory());
}(this, (function () { 'use strict';

  let cells, p;

  const generate = function() {
    console.time('generateHeightmap');
    cells = grid.cells, p = grid.points;
    // cells.h = new Uint8Array(grid.points.length);

    const input = document.getElementById("templateInput");
    if (!locked("template")) {
      const templates = {
        "Volcano":      5,
        "High Island":  22,
        "Low Island":   10,
        "Continents":   20,
        "Archipelago":  30,
        "Mediterranean":3,
        "Peninsula":    3,
        "Pangea":       2,
        "Isthmus":      2,
        "Atoll":        1,
        "Shattered":    2};
      input.value = rw(templates);
    }

    switch (input.value) {
      case "Volcano": templateVolcano(); break;
      case "High Island": templateHighIsland(); break;
      case "Low Island": templateLowIsland(); break;
      case "Continents": templateContinents(); break;
      case "Archipelago": templateArchipelago(); break;
      case "Atoll": templateAtoll(); break;
      case "Mediterranean": templateMediterranean(); break;
      case "Peninsula": templatePeninsula(); break;
      case "Pangea": templatePangea(); break;
      case "Isthmus": templateIsthmus(); break;
      case "Shattered": templateShattered(); break;
    }

    console.timeEnd('generateHeightmap');
  }

  // parse template step
  function addStep(a1, a2, a3, a4, a5) {
    if (a1 === "Hill") addHill(a2, a3, a4, a5); else
    if (a1 === "Pit") addPit(a2, a3, a4, a5); else
    if (a1 === "Range") addRange(a2, a3, a4, a5); else
    if (a1 === "Trough") addTrough(a2, a3, a4, a5); else
    if (a1 === "Strait") addStrait(a2, a3); else
    if (a1 === "Add") modify(a3, a2, 1); else
    if (a1 === "Multiply") modify(a3, 0, a2); else
    if (a1 === "Smooth") smooth(a2);
  }

  // Heighmap Template: Volcano
  function templateVolcano() {
    addStep("Hill", "1", "90-100", "44-56", "40-60");
    addStep("Multiply", .8, "50-100");
    addStep("Range", "1.5", "30-55", "45-55", "40-60");
    addStep("Smooth", 2);
    addStep("Hill", "1.5", "25-35", "25-30", "20-75");
    addStep("Hill", "1", "25-35", "75-80", "25-75");
    addStep("Hill", "0.5", "20-25", "10-15", "20-25");
  }

  // Heighmap Template: High Island
  function templateHighIsland() {
    addStep("Hill", "1", "90-100", "65-75", "47-53");
    addStep("Add", 5, "all");
    addStep("Hill", "6", "20-23", "25-55", "45-55");
    addStep("Range", "1", "40-50", "45-55", "45-55");
    addStep("Smooth", 2);
    addStep("Trough", "2-3", "20-30", "20-30", "20-30");
    addStep("Trough", "2-3", "20-30", "60-80", "70-80");
    addStep("Hill", "1", "10-15", "60-60", "50-50");
    addStep("Hill", "1.5", "13-16", "15-20", "20-75");
    addStep("Multiply", .8, "20-100");
    addStep("Range", "1.5", "30-40", "15-85", "30-40");
    addStep("Range", "1.5", "30-40", "15-85", "60-70");
    addStep("Pit", "2-3", "10-15", "15-85", "20-80");
  }

  // Heighmap Template: Low Island
  function templateLowIsland() {
    addStep("Hill", "1", "90-99", "60-80", "45-55");
    addStep("Hill", "4-5", "25-35", "20-65", "40-60");
    addStep("Range", "1", "40-50", "45-55", "45-55");
    addStep("Smooth", 3);
    addStep("Trough", "1.5", "20-30", "15-85", "20-30");
    addStep("Trough", "1.5", "20-30", "15-85", "70-80");
    addStep("Hill", "1.5", "10-15", "5-15", "20-80");
    addStep("Hill", "1", "10-15", "85-95", "70-80");
    addStep("Pit", "3-5", "10-15", "15-85", "20-80");
    addStep("Multiply", .4, "20-100");
  }

  // Heighmap Template: Continents
  function templateContinents() {
    addStep("Hill", "1", "80-85", "75-80", "40-60");
    addStep("Hill", "1", "80-85", "20-25", "40-60");
    addStep("Multiply", .22, "20-100");
    addStep("Hill", "5-6", "15-20", "25-75", "20-82");
    addStep("Range", ".8", "30-60", "5-15", "20-45");
    addStep("Range", ".8", "30-60", "5-15", "55-80");
    addStep("Range", "0-3", "30-60", "80-90", "20-80");
    addStep("Trough", "3-4", "15-20", "15-85", "20-80");
    addStep("Strait", "2", "vertical");
    addStep("Smooth", 2);
    addStep("Trough", "1-2", "5-10", "45-55", "45-55");
    addStep("Pit", "3-4", "10-15", "15-85", "20-80");
    addStep("Hill", "1", "5-10", "40-60", "40-60");
  }

  // Heighmap Template: Archipelago
  function templateArchipelago() {
    addStep("Add", 11, "all");
    addStep("Range", "2-3", "40-60", "20-80", "20-80");
    addStep("Hill", "5", "15-20", "10-90", "30-70");
    addStep("Hill", "2", "10-15", "10-30", "20-80");
    addStep("Hill", "2", "10-15", "60-90", "20-80");
    addStep("Smooth", 3);
    addStep("Trough", "10", "20-30", "5-95", "5-95");
    addStep("Strait", "2", "vertical");
    addStep("Strait", "2", "horizontal");
  }

  // Heighmap Template: Atoll
  function templateAtoll() {
    addStep("Hill", "1", "75-80", "50-60", "45-55");
    addStep("Hill", "1.5", "30-50", "25-75", "30-70");
    addStep("Hill", ".5", "30-50", "25-35", "30-70");
    addStep("Smooth", 1);
    addStep("Multiply", .2, "25-100");
    addStep("Hill", ".5", "10-20", "50-55", "48-52");
  }

  // Heighmap Template: Mediterranean
  function templateMediterranean() {
    addStep("Range", "3-4", "30-50", "0-100", "0-10");
    addStep("Range", "3-4", "30-50", "0-100", "90-100");
    addStep("Hill", "5-6", "30-70", "0-100", "0-5");
    addStep("Hill", "5-6", "30-70", "0-100", "95-100");
    addStep("Smooth", 1);
    addStep("Hill", "2-3", "30-70", "0-5", "20-80");
    addStep("Hill", "2-3", "30-70", "95-100", "20-80");
    addStep("Multiply", .8, "land");
    addStep("Trough", "3-5", "40-50", "0-100", "0-10");
    addStep("Trough", "3-5", "40-50", "0-100", "90-100");
  }

  // Heighmap Template: Peninsula
  function templatePeninsula() {
    addStep("Range", "2-3", "20-35", "40-50", "0-15");
    addStep("Add", 5, "all");
    addStep("Hill", "1", "90-100", "10-90", "0-5");
    addStep("Add", 13, "all");
    addStep("Hill", "3-4", "3-5", "5-95", "80-100");
    addStep("Hill", "1-2", "3-5", "5-95", "40-60");
    addStep("Trough", "5-6", "10-25", "5-95", "5-95");
    addStep("Smooth", 3);
  }

  // Heighmap Template: Pangea
  function templatePangea() {
    addStep("Hill", "1-2", "25-40", "15-50", "0-10");
    addStep("Hill", "1-2", "5-40", "50-85", "0-10");
    addStep("Hill", "1-2", "25-40", "50-85", "90-100");
    addStep("Hill", "1-2", "5-40", "15-50", "90-100");
    addStep("Hill", "8-12", "20-40", "20-80", "48-52");
    addStep("Smooth", 2);
    addStep("Multiply", .7, "land");
    addStep("Trough", "3-4", "25-35", "5-95", "10-20");
    addStep("Trough", "3-4", "25-35", "5-95", "80-90");
    addStep("Range", "5-6", "30-40", "10-90", "35-65");
  }

  // Heighmap Template: Isthmus
  function templateIsthmus() {
    addStep("Hill", "5-10", "15-30", "0-30", "0-20");
    addStep("Hill", "5-10", "15-30", "10-50", "20-40");
    addStep("Hill", "5-10", "15-30", "30-70", "40-60");
    addStep("Hill", "5-10", "15-30", "50-90", "60-80");
    addStep("Hill", "5-10", "15-30", "70-100", "80-100");
    addStep("Smooth", 2);
    addStep("Trough", "4-8", "15-30", "0-30", "0-20");
    addStep("Trough", "4-8", "15-30", "10-50", "20-40");
    addStep("Trough", "4-8", "15-30", "30-70", "40-60");
    addStep("Trough", "4-8", "15-30", "50-90", "60-80");
    addStep("Trough", "4-8", "15-30", "70-100", "80-100");
  }

  // Heighmap Template: Shattered
  function templateShattered() {
    addStep("Hill", "8", "35-40", "15-85", "30-70");
    addStep("Trough", "10-20", "40-50", "5-95", "5-95");
    addStep("Range", "5-7", "30-40", "10-90", "20-80");
    addStep("Pit", "12-20", "30-40", "15-85", "20-80");
  }

  function getBlobPower() {
    switch (+densityInput.value) {
      case 1: return .98;
      case 2: return .985;
      case 3: return .987;
      case 4: return .9892;
      case 5: return .9911;
      case 6: return .9921;
      case 7: return .9934;
      case 8: return .9942;
      case 9: return .9946;
      case 10: return .995;
    }
  }

  function getLinePower() {
    switch (+densityInput.value) {
      case 1: return .81;
      case 2: return .82;
      case 3: return .83;
      case 4: return .84;
      case 5: return .855;
      case 6: return .87;
      case 7: return .885;
      case 8: return .91;
      case 9: return .92;
      case 10: return .93;
    }
  }

  function findCell (rangeX, rangeY, check, limit = 50){
    let cell;
    do {
      const x = getPointInRange(rangeX, graphWidth);
      const y = getPointInRange(rangeY, graphHeight);
      cell = cells[findGridCell(x, y)];
      limit++;
    } while (check(cell) && limit-- > 0)
    return cell
  }

  const addHill = function(count, height, rangeX, rangeY) {
    count = getNumberInRange(count);
    const power = getBlobPower();
    while (count >= 1 || Math.random() < count) {addOneHill(); count--;}

    function addOneHill() {
      let h = lim(getNumberInRange(height));

      const start = findCell(rangeX, rangeY, c => {c.height + h <= 90});

      start.change = h;
      //TODO actually make this into a queue class
      const queue = [start];
      while (queue.length) {
        const ele = queue.shift();

        //check all nearby cells
        for (const cell of ele.c) {
          //check if cell has already changed
          if (cell.change) continue;
          //make a random change
          cell.change = ele.change ** power * (Math.random() * .2 + .9);
          //if the change was large enough, change nearby cells
          if (cell.change > 1) queue.push(cell);
        }
      }

      //TODO limited this to only changed cells
      cells.forEach((cell) => {
        cell.height = lim(cell.height + cell.change);
        delete cell.change;
      });
    }

  }

  const addPit = function(count, height, rangeX, rangeY) {
    count = getNumberInRange(count);
    const power = getBlobPower();
    while (count >= 1 || Math.random() < count) {addOnePit(); count--;}

    //TODO addOnePit and addOneHill are very similar can be converted into
    //a reused function
    function addOnePit() {
      let h = lim(getNumberInRange(height));

      let start = findCell(rangeX, rangeY, c => {c.height >= ENUM.HEIGHT.SEA_LEVEL});

      const queue = [start];
      while (queue.length) {
        const ele = queue.shift();
        h = h ** power * (Math.random() * .2 + .9);
        //If delta would be insignificant they are done
        //TODO make it not a break
        if (h < 1) break;

        ele.c.forEach(function(c, i) {
          if (c.done) return;
          c.height = lim(c.height - h * (Math.random() * .2 + .9));
          c.done = true;
          queue.push(c);
        });
      }

      cells.forEach(c => {delete c.done;});
    }
  }

  const addRange = function(count, height, rangeX, rangeY) {
    count = getNumberInRange(count);
    const power = getLinePower();
    while (count >= 1 || Math.random() < count) {addOneRange(); count--;}

    function addOneRange() {
      let h = lim(getNumberInRange(height));

      // find start and end points
      const startX = getPointInRange(rangeX, graphWidth);
      const startY = getPointInRange(rangeY, graphHeight);

      //TODO there is no height protections here
      let dist = 0, limit = 0, endX, endY;
      do {
        endX = Math.random() * graphWidth * .8 + graphWidth * .1;
        endY = Math.random() * graphHeight * .7 + graphHeight * .15;
        dist = Math.abs(endY - startY) + Math.abs(endX - startX);
        limit++;
      } while ((dist < graphWidth / 8 || dist > graphWidth / 3) && limit < 50)

      let range = getRange(cells[findGridCell(startX, startY)], cells[findGridCell(endX, endY)]);

      // get main ridge
      function getRange(cur, end) {
        const range = [cur];
        cur.done = true;

        while (cur != end) {
          let min = Infinity;
          cur.c.forEach(function(e) {
            if (e.done) return;
            let diff = (p[end.id][0] - p[e.id][0]) ** 2 + (p[end.id][1] - p[e.id][1]) ** 2;
            if (Math.random() > .85) diff = diff / 2;
            if (diff < min) {min = diff; cur = e;}
          });
          if (min === Infinity) return range;
          range.push(cur);
          cur.done = true;
        }

        return range;
      }

      // add height to ridge and cells around
      let queue = range.slice(), i = 0;
      while (queue.length) {
        const frontier = queue.slice();
        queue = [], i++;
        frontier.forEach(cell => {
          cell.height = lim(cell.height + h * (Math.random() * .3 + .85));
        });
        h = h ** power - 1;
        if (h < 2) break;
        frontier.forEach(f => {
          f.c.forEach(i => {
            if (!i.done) {queue.push(i); i.done = true;}
          });
        });
      }

      cells.forEach(cell => {delete cell.done});

      // generate prominences
      range.forEach((cur, d) => {
        if (d%6 !== 0) return;
        for (const l of d3.range(i)) {
          const min = cur.c[d3.scan(cur.c, (a, b) => a.height - b.height)]; // downhill cell
          //debug.append("circle").attr("cx", p[min][0]).attr("cy", p[min][1]).attr("r", 1);
          min.height = (cur.height * 2 + min.height) / 3;
          cur = min;
        }
      });

    }
  }

  //TODO addTrough has many similarities to addRange, These should be
  //amended into a single function
  const addTrough = function(count, height, rangeX, rangeY) {
    count = getNumberInRange(count);
    const power = getLinePower();
    while (count >= 1 || Math.random() < count) {addOneTrough(); count--;}

    function addOneTrough() {
      // const used = new Uint8Array(cells.length);
      let h = lim(getNumberInRange(height));

      // find start and end points
      let limit = 0, startX, startY, start, dist = 0, endX, endY;
      do {
        startX = getPointInRange(rangeX, graphWidth);
        startY = getPointInRange(rangeY, graphHeight);
        start = cells[findGridCell(startX, startY)];
        limit++;
      } while (start.height < ENUM.HEIGHT.SEA_LEVEL && limit < 50)

      limit = 0;
      do {
        endX = Math.random() * graphWidth * .8 + graphWidth * .1;
        endY = Math.random() * graphHeight * .7 + graphHeight * .15;
        dist = Math.abs(endY - startY) + Math.abs(endX - startX);
        limit++;
      } while ((dist < graphWidth / 8 || dist > graphWidth / 2) && limit < 50)

      let range = getRange(start, cells[findGridCell(endX, endY)]);

      // get main ridge
      function getRange(cur, end) {
        const range = [cur];
        cur.done = true;

        while (cur != end) {
          let min = Infinity;
          cur.c.forEach(function(e) {
            if (e.done) return;
            let diff = (p[end.id][0] - p[e.id][0]) ** 2 + (p[end.id][1] - p[e.id][1]) ** 2;
            if (Math.random() > .8) diff = diff / 2;
            if (diff < min) {min = diff; cur = e;}
          });
          if (min === Infinity) return range;
          range.push(cur);
          cur.done = true;
        }

        return range;
      }

      // add height to ridge and cells around
      let queue = range.slice(), i = 0;
      while (queue.length) {
        const frontier = queue.slice();
        queue = [], i++;
        frontier.forEach(i => {
          i.height = lim(i.height - h * (Math.random() * .3 + .85));
        });
        h = h ** power - 1;
        if (h < 2) break;
        frontier.forEach(f => {
          f.c.forEach(i => {
            if (!i.done) {queue.push(i); i.done = true;}
          });
        });
      }

      cells.forEach(cell => {delete cell.done;});

      // generate prominences
      range.forEach((cur, d) => {
        if (d%6 !== 0) return;
        for (const l of d3.range(i)) {
          const min = cur.c[d3.scan(cur.c, (a, b) => a.height - b.height)]; // downhill cell
          //debug.append("circle").attr("cx", p[min][0]).attr("cy", p[min][1]).attr("r", 1);
          min.height = (cur.height * 2 + min.height) / 3;
          cur = min;
        }
      });

    }
  }

  const addStrait = function(width, direction = "vertical") {
    width = Math.min(getNumberInRange(width), grid.cellsX/3);
    if (width < 1 && Math.random() < width) return;
    // const used = new Uint8Array(cells.length);
    const vert = direction === "vertical";
    const startX = vert ? Math.floor(Math.random() * graphWidth * .4 + graphWidth * .3) : 5;
    const startY = vert ? 5 : Math.floor(Math.random() * graphHeight * .4 + graphHeight * .3);
    const endX = vert ? Math.floor((graphWidth - startX) - (graphWidth * .1) + (Math.random() * graphWidth * .2)) : graphWidth - 5;
    const endY = vert ? graphHeight - 5 : Math.floor((graphHeight - startY) - (graphHeight * .1) + (Math.random() * graphHeight * .2));

    const start = cells[findGridCell(startX, startY)], end = cells[findGridCell(endX, endY)];
    let range = getRange(start, end);
    const query = [];

    function getRange(cur, end) {
      const range = [];
      
      while (cur != end) {
        let min = Infinity;
        cur.c.forEach(function(e) {
          let diff = (p[end.id][0] - p[e.id][0]) ** 2 + (p[end.id][1] - p[e.id][1]) ** 2;
          if (Math.random() > 0.8) diff = diff / 2;
          if (diff < min) {min = diff; cur = e;}
        });
        range.push(cur);
      }

      return range;
    }
    
    const step = .1 / width;

    while (width > 0) {
      const exp = .9 - step * width;
      range.forEach(function(r) {
        r.c.forEach(function(e) {
          if (e.done) return;
          e.done = true;
          query.push(e);
          e.height **= exp;
          if (e.height > 100) e.height = 5;
        });

        range = query.slice();
      });
      width--;
    }

    cells.forEach(cell => {delete cell.done;});
  }

  const modify = function(range, add, mult, power) {
    const min = range === "land" ? ENUM.HEIGHT.SEA_LEVEL : range === "all" ? 0 : +range.split("-")[0];
    const max = range === "land" || range === "all" ? 100 : +range.split("-")[1];
    grid.cells.forEach(cell => {
      if(cell.height >= min && cell.height <= max){
        cell.height = mod(cell.height);
      }
    });

    function mod(v) {
      if (add) v = min === ENUM.HEIGHT.SEA_LEVEL ? Math.max(v + add, ENUM.HEIGHT.SEA_LEVEL) : v + add;
      if (mult !== 1) v = min === ENUM.HEIGHT.SEA_LEVEL ? (v-ENUM.HEIGHT.SEA_LEVEL) * mult + ENUM.HEIGHT.SEA_LEVEL : v * mult;
      if (power) v = min === ENUM.HEIGHT.SEA_LEVEL ? (v-ENUM.HEIGHT.SEA_LEVEL) ** power + ENUM.HEIGHT.SEA_LEVEL : v ** power;
      return lim(v);
    }
  }

  const smooth = function(fr = 2) {
    cells.forEach(cell => {
      cell.height = lim((cell.height * (fr-1) +
        d3.mean(cell.c.map(c => c.height).concat([cell.height]))) / fr);
    });
  }

  function getPointInRange(range, length) {
    if (typeof range !== "string") {console.error("Range should be a string"); return;}
    const min = range.split("-")[0]/100 || 0;
    const max = range.split("-")[1]/100 || 100;
    return rand(min * length, max * length);
  }
  
  return {generate, addHill, addRange, addTrough, addStrait, addPit, smooth, modify};

})));
