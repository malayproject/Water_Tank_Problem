
var inputEl, waterWallTabEl, waterTabEl, outputEl

var solve = arr => {
  var lenA = arr.length;
  var res = [];
  let [leftMax, rightMax] = getMaxArraysOnBothSides(arr, lenA);
  for(let i = 0; i < lenA; i++) {
    if ((i == 0 || i == lenA - 1)) {
        res.push(arr[i]);
        continue
    }
    res.push(Math.max(arr[i], Math.min(leftMax[i], rightMax[i])));
  }
  let units = 0;
  let water= []
  for(let j = 0; j < lenA; j++) {
      water.push(res[j]-arr[j]);
    units += res[j] - arr[j];
  }
  console.log("water array is ", water)
  return [units, res, water];
}

var getMaxArraysOnBothSides = (arr, lenA) => {
  var leftMax = [];
  var rightMax = [];
  for (let i = 0; i < lenA; i++) {
    if (i == 0) {
      leftMax.push(0);
      continue;
    }
    leftMax.push(Math.max(arr[i - 1], leftMax[i - 1]));
  }
  for (let i = lenA - 1; i > -1; i--) {
    if (i == lenA-1) {
      rightMax.push(0);
      continue;
    }
    rightMax.push(Math.max(arr[i + 1], rightMax[lenA - i - 2]));
  }
  return [leftMax, rightMax.reverse()];
}
var getMaxWH = arr => {
  let lenA = arr.length
  let tableWidth = lenA+2
  let tableHeight = 0
  for(let i = 0; i < lenA; i++) {
    if(arr[i] > tableHeight)  tableHeight = arr[i]
  }
  tableHeight += 1
  return [tableWidth, tableHeight]
}

var getElements = () => {
  inputEl = document.getElementById('inputArr')
  waterWallTabEl = document.getElementById('waterWallTab')
  waterTabEl = document.getElementById('waterTab')
  outputEl = document.getElementById('output')
}

var getWaterWallTab = (waterWall, parts) => {
  //debugger
  let [tableWidth, tableHeight] = getMaxWH(waterWall)
  let inner = '<tbody>'
  for(let i = tableHeight; i > 0; i--)  {
    inner +='<tr>'
    for(let j = 0; j < tableWidth; j++) {
      if(j == 0 || j == tableWidth-1)  {
        inner += '<td></td>'
      }else{
        if(i > waterWall[j-1])  {
          inner += '<td></td>'
        }else if(i > parts[j-1])  {
          inner += '<td class="water"></td>'
        }else{
          inner += '<td class="wall"></td>'
        }
      }
    }
    inner += '</tr>'
  }
  inner += '</tbody>'
  return inner                        
}

var getWaterTab = (water, waterWall) => {
  let [tableWidth, tableHeight] = getMaxWH(waterWall)
  let inner = '<tbody>'
  for(let i = tableHeight; i > 0; i--)  {
    inner +='<tr>'
    for(let j = 0; j < tableWidth; j++) {
      if(j == 0 || j == tableWidth-1)  {
        inner += '<td></td>'
      }else{
        if(i > water[j-1])  {
          inner += '<td></td>'
        }else{
          inner += '<td class="water"></td>'
        }
      }
    }
    inner += '</tr>'
  }
  inner += '</tbody>'
  return inner
}

var showResults = e => {
  if(e.keyCode === 13)  {

    let str = inputEl.value
    str=str.trim()
    let lenStr = str.length
    let temp = []
    let s = 1
    str = str.substring(1, str.length-1)
    
    let parts = str.split(",")
    parts.map(s=>temp.push(Number(s)))
    let [units, waterWall, water] = solve(temp)
    outputEl.innerHTML = units
    waterWallTabEl.innerHTML = getWaterWallTab(waterWall, parts)
    waterTabEl.innerHTML = getWaterTab(water, waterWall)
  }
}

var setEventListeners = () => {
  inputEl.addEventListener('keyup', showResults)
}

var init = () => {
  getElements()
  setEventListeners()
  //let [units, res] = solve(getInputArr(inputEl.value))
}
init()

//console.log( "ans is ", solve([4,0,0,10,0,0,6]));
