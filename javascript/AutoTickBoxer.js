// Autotickbox constructor
function AutoTickBoxer(excludeColumns, divId, data, options){
	this.excludeColumns = excludeColumns;
	this.divId = divId;
	this.data = data;
	this.options = options;
	this.toFilter = Object.keys(this.data[0]).filter(function(d){return this.excludeColumns.indexOf(d) == -1;});
	this.allCheckboxClass = ".autotickboxCheckbox";

	this.isUndefined = function(obj, key, returnValueIfUndefined){
		if(returnValueIfUndefined == null) {
			return (typeof(obj[key]) === 'undefined')
		} else {
			return (typeof(obj[key]) === 'undefined' ? returnValueIfUndefined : obj[key])
		}
	}

	this.generateTickboxes = function(){

		var col;
		var isUndefined = this.isUndefined;
		// if returnValue is true function returns obj[key] (if key in obj is defined, otherwise will return null)
		// if returnValue is false then returns true or false (for is key in object)
		// default for return value is false

		// Add column option types
		for (i = 0; i < this.toFilter.length; i++){
			col = this.toFilter[i];
			colOptions = isUndefined(this.options, col, {}); 
      columnRenameDictionary = isUndefined(colOptions, 'valueNames', {});
			unique_vars = d3.keys(d3.nest().key(function (d) { return d[col];}).map(this.data));

			checkboxDiv = d3.select(this.divId)
										.append("div")
										.attr("id", col+"_tickbox_div")
										.classed("control", true);

			// If there is a descriptor for the column
			if (!isUndefined(colOptions, "name", null)) {
			   checkboxDiv.append("label").append("text")
			   						.classed("description_autotickboxer", true)
			   						// .style("font-style", "italic")
										.style("font-weight", "bold")
										.text(colOptions["name"])
			}
			// Then add the checkboxes or dropdown box
			if (isUndefined(colOptions, "type", 'checkbox') == 'checkbox') {
				if (!isUndefined(colOptions, "selectAll", null)) {
		      selectAllLabel = checkboxDiv.append("label")
		      									.classed("select_all_autotickboxer", true)
					      						.property("value", col+"_select_all")

	        selectAllLabel.append("input")
												.classed("autotickboxCheckbox",true)
												.attr("id", col + "_select_all_AutoTickBoxer")
												.property("type","checkbox")
												.property("checked", true)
												.on("click", function(){
													column_name = d3.select(this).attr('id').split('_select_all')[0]
													
												  // select all tick boxes and turn them off
												  d3.selectAll("." + column_name + "_checkbox_autotickboxer").property("checked", this.checked);
												});
											
					selectAllLabel.append("text")
												.style("font-style", "italic")
												.style("font-weight", "bold")
												.text("Select all");
				}
				checkboxes = checkboxDiv.selectAll("label:not(.select_all_autotickboxer)")
											.data(unique_vars).enter()
											.append("label")
											.property("value", function(d){return d;});

				checkboxes.append("input")
									.classed("autotickboxCheckbox", true)
									.classed(col+"_checkbox_autotickboxer", true)
									.property("type","checkbox")
									.property("checked", true);

				checkboxes.append("text").text(function(d){return isUndefined(columnRenameDictionary, d, d);});
			} else {
				// Create dropbox
				var select = checkboxDiv.append('select')
  					.attr('class','select')

				var options = select
				  .selectAll('option')
					.data(unique_vars).enter()
					.append('option')
						.text(function (d) { return d; });
			}
			
		}
	}

	// d3.selectAll(".select_all_autotickboxer").selectAll("input").on("change", function(){

	// });

	this.filterData = function(){
		// Initialise
		var filteredData = this.data;
		var isUndefined = this.isUndefined;
		var tmpArray, checkbox, dropdownSelection; 

		// Filter for each set of checkboxesx
		for(i = 0; i < this.toFilter.length; i++){
			col = this.toFilter[i];
			tmpArray = [];

			checkbox = true;

			if (!isUndefined(this.options, col, null)) {
				if (isUndefined(this.options[col], "type", "checkbox") == "dropdown") {
					checkbox = false
				}
			}
			if (checkbox) {
				// Get the list of tickboxes that are checked
				d3.select("#"+ col +"_tickbox_div")
				.selectAll("label:not(.select_all_autotickboxer)")
				.selectAll("input")
				.each(function(d){if(this.checked){tmpArray.push(d)}})

			} else {
				tmpArray.push(d3.select("#"+ col +"_tickbox_div").select('select').property('value'))
				// dropdownSelection = d3.select("#"+ col +"_tickbox_div").select('select').property('value')
				// console.log(typeof(dropdownSelection))
				// d3.select("#"+ col +"_tickbox_div")
				// .select("select")
				// .selectAll("option")
				// .each(function(d){if(this.innerHTML == dropdownSelection){tmpArray.push(d)}})
			}

			// filter data
			filteredData = filteredData.filter(function(d){
	    	return tmpArray.indexOf(""+d[col]) >= 0;
	    });
		}

		return filteredData;
	}
}
