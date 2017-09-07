// Autotickbox constructor
function AutoTickBoxer(excludeColumns, divId, dataFilePath){
	this.excludeColumns = excludeColumns;
	this.divId = divId;
	this.dataFilePath = dataFilePath;

	this.initialise = function(excludeColumns, divId, dataFilePath){
		d3.csv(this.dataFilePath, function(error, data) {

		var colnames = Object.keys(data[0])
		var toFilter = colnames.filter(function(d){
	  		return this.excludeColumns.indexOf(d) == -1;
	  	})

		for (i = 0; i<toFilter.length; i++){
			unique_vars = d3.keys(d3.nest().key(function (d) { return d[toFilter[i]]; }).map(data))
			checkboxes = d3.select(this.divId).append("div").classed("control", true).classed(unique_vars[i] + "_controls", true).selectAll("label").data(unique_vars).enter().append("label").property("value", function(d){return d;});

			checkboxes.append("input").property("type","checkbox").property("checked", true);

			checkboxes.append("text").text(function(d){return d;});
		}
	  })
	}
}