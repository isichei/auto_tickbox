// Autotickbox constructor
function AutoTickBoxer(excludeColumns, divId, data){
	this.excludeColumns = excludeColumns;
	this.divId = divId;
	this.data = data;
	this.toFilter = Object.keys(this.data[0]).filter(function(d){return this.excludeColumns.indexOf(d) == -1;});
	this.allCheckboxClass = ".autotickboxCheckbox";
	
	this.generateTickboxes = function(options){

		var col;

		var isUndefined = function(obj, key, returnValueIfUndefined){
			returnValueIfUndefined = (returnValueIfUndefined === 'undefined') ? true : returnValueIfUndefined
			return (typeof(obj[key]) === 'undefined' ? returnValueIfUndefined : obj[key])
		}

    // var getLabel = function (valueName, renameDictionary) {
    //     return (isUndefined(renameDictionary[valueName]) ? valueName : renameDictionary[valueName]);
    // }

		for (i = 0; i < this.toFilter.length; i++){
			col = this.toFilter[i];
			colOptions = isUndefined(options, col, {}); 
      columnRenameDictionary = isUndefined(colOptions, 'valueNames', {});
			console.log(columnRenameDictionary);
			unique_vars = d3.keys(d3.nest().key(function (d) { return d[col];}).map(this.data));

			checkboxes = d3.select(this.divId)
										.append("div")
										.attr("id", col+"_tickbox_div")
										.classed("control", true)
										.selectAll("label")
										.data(unique_vars).enter()
										.append("label")
										.property("value", function(d){return d;});

			checkboxes.append("input")
								.classed("autotickboxCheckbox",true)
								.property("type","checkbox")
								.property("checked", true);

			checkboxes.append("text").text(function(d){return isUndefined(columnRenameDictionary, d, d);});
		}
	}

	this.filterData = function(){
		// Initialise
		var filteredData = this.data;
		var tmpArray; 

		// Filter for each set of checkboxesx
		for(i = 0; i < this.toFilter.length; i++){
			col = this.toFilter[i];
			tmpArray = [];
			// Get the list of tickboxes that are checked
			d3.select("#"+ col +"_tickbox_div").selectAll("label").selectAll("input").each(function(d){if(this.checked){tmpArray.push(d)}})

			// filter data
			filteredData = filteredData.filter(function(d){
	    	return tmpArray.indexOf(d[col]) >= 0;
	    });
		}

		return filteredData;
	}
}
