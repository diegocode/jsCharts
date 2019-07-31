
/*
    TODO:
    
  * height 
  * popup for append data
  * default colors ("auto")
  * palettes?
  
*/

function DataSet(value, colour, name) {
    this.value = value;
    this.colour = colour;
    this.name = name;
}

var colourPalette = ["#99D746", 
              "#507997",
              "#4699D7",
              "#D74699",
              "#975079"
              ];

var indColourPalette = 0;

var dataSeries = [];

/*
dataSeries.push(new DataSet(5, "#99D746", "uno"));
dataSeries.push(new DataSet(15, "#507997", "dos"));
dataSeries.push(new DataSet(20, "#4699D7", "tres"));
dataSeries.push(new DataSet(12, "#D74699", "cuatro"));
dataSeries.push(new DataSet(7, "#975079", "cinco"));
*/

function maxVal(a, prop) {
    var max = -Infinity;
    var p = a.length - 1;
    while(p >= 0) {
        if (a[p][prop] > max) {
            max = a[p][prop];
        }
        p--;
    }
    return max;
}

function drawBars() {
    c = document.getElementById("cnv");
    cct = c.getContext("2d");
    w = c.width / dataSeries.length;
    max = c.height - 30;
    ran = maxVal(dataSeries, "value");
        
    cct.font = "16px Arial";
    var n = 0; 

    for (let dp of dataSeries) { 
        cct.fillStyle = dp.colour;
    
        var h =  dp.value / ran * (max - 20);
        cct.fillRect(
            n * w,
            5 + max - h,
            w - 1,
            h);   
            //console.log( n * w + w);
            
        cct.fillStyle = "#000033";
        let perc = (dp.value / ran * 100).toFixed(1) + "%";
        cw = (w - cct.measureText(perc).width) / 2;

        cct.fillText(perc, n * w + cw, max - h);
        
        cw = (w - cct.measureText(dp.name).width) / 2;
        
        cct.fillText(dp.name, n * w + cw, max + 25);
        n++;
    }
    cct.strokeStyle = "#000033";
    cct.moveTo(0, max + 5);
    cct.lineTo(c.width, max + 5);
    cct.stroke();
}

window.onload = function() {
    //drawBars();
}

function addData(){
    var inName = document.getElementById("name");
    var inValue = document.getElementById("value");
    var inColor = document.getElementById("color");
	var inAutoColor = document.getElementById("autocolor");

	var barColour;
	
	if (inAutoColor.value == "on") {
		barColour = colourPalette[indColourPalette];
		if (indColourPalette < colourPalette.length) 
			indColourPalette++;
	} else {
		barColour = inColor;
	}

    var list = document.getElementById("list");
    list.innerHTML += `<br>${inName.value} - ${inValue.value} `;
    
    dataSeries.push(new DataSet(+inValue.value, barColour, inName.value));
    
    inName.value = "";
    inValue.value = 0;
}

function closeAddDialog(){
    var x = document.getElementById("newdata");
    x.style.display = "none";
    
    var x = document.getElementById("backdrop");
    x.style.display = "none";
    
    drawBars();
}

function checkUncheck(){
	var inAutoColor = document.getElementById("autocolor");
	
	if (inAutoColor.value == "on")
		inAutoColor.value = "off";
	else 
		inAutoColor.value = "on";

}
