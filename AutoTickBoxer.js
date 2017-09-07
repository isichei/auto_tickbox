// Autotickbox constructor
function AutoTickBoxer(excludeColumns, divId, data){
	this.excludeColumns = excludeColumns;
	this.divId = divId;
	this.data = data;
	this.toFilter = Object.keys(this.data[0]).filter(function(d){return this.excludeColumns.indexOf(d) == -1;});
	
	this.generateTickboxes = function(){
		var col;
		for (i = 0; i<this.toFilter.length; i++){
			col = this.toFilter[i];
			unique_vars = d3.keys(d3.nest().key(function (d) { return d[col];}).map(this.data));
			checkboxes = d3.select(this.divId).append("div").attr("id",col+"_tickbox_div").classed("control", true).selectAll("label").data(unique_vars).enter().append("label").property("value", function(d){return d;});
			checkboxes.append("input").property("type","checkbox").property("checked", true);
			checkboxes.append("text").text(function(d){return d;});
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
