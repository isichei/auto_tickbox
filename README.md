# auto_tickbox
JavaScript function that generates tick boxes or dropdown menus for each column in a tabular dataset.

## Introduction
The Autotickbox constructor function takes a 
Function expects tabular data that is represented in an array of objects. For example:

| cat1 | cat2 | cat3 |
|------|------|------|
| a    | x    | 1    |
| b    | y    | 12   |
| c    | z    | 42   |

Would be :
```
tabular_data = [{"cat1" : "a", "cat2" : 1, "cat3" : "x"},
{"cat1" : "b", "cat2" : 12, "cat3" : "x"},
{"cat1" : "c", "cat2" : 42, "cat3" : "y"}]
```

The function AutoTickbox takes user specified columns and generates tickboxes for each unique value for the specified columns.

## Basic use
AutoTickBoxer has 5 inputs:
- **tickboxColumns:** An array of strings specifing the column names you want to turn into tickboxes/dropdowns. *(required)*
- **divId:** String defining the id of the div the tickboxes/dropdowns will get generated into. *(required)*
- **data:** Data (see introduction for structure) used to define tickboxes/dropdowns and filter based on tickbox selection. *(required)*
- **options:** Object defining options for each tickbox/dropdown column. *(optional, default: null)*
- **eventListener:** Function to call when any of the tickboxes/dropdowns are changed. *(optional, default: null)*

First lets define some simple data
```javascript
exampleData = 
[
  { "cat1" : "2011", "cat2" : "what", "cat3" : 20 },
  { "cat1" : "2012", "cat2" : "something", "cat3" : 50 },
  { "cat1" : "2013", "cat2" : "robot", "cat3" : 55 },
  { "cat1" : "2014", "cat2" : "alien", "cat3" : 50 },
  { "cat1" : "2011", "cat2" : "fish", "cat3" : 45 },
  { "cat1" : "2012", "cat2" : "chips", "cat3" : 50 },
  { "cat1" : "2013", "cat2" : "Chappelle", "cat3" : 50 },
  { "cat1" : "2014", "cat2" : "Chimamanda", "cat3" : 55 }
]
```

To define a new autoTickBoxer object for that data we can create a new autoTickboxObject:
```javascript
atb = new AutoTickBoxer(tickboxColumns = ["cat1", "cat2", "cat3"],  divId = "#tickboxOptions", data = exampleData);
```

Now that the autoTickBoxer object has be created you can autogenerate the tickboxes for the specified columns using the object method:
```javascript
atb.generateTickboxes();
```
The result is:
[generatedTickboxes]

To return the data filtered by whatever options selected on the tickbox/dropdown options:
```javascript
filteredData = atb.filterData();
```

### Adding additional options
The options for AutoTickboxer can be applied to each column tickbox. To define options for a particular column you have to specify them by using the columns name e.g.:
```javascript
atbOptions = {"cat1" : {}}
``` 

The valid options are as follows:
- **valueNames:** An object that contains key/value bindings to change the display name of the column values in your tickbox. 
- **selectAll:** If true tickboxes will have a select all option at the top (only available for type: tickbox). Note: If the eventListener function added to the autoTickBoxer object then pressing a select all button will turn all linked tickboxes on/off and then call the eventListener function.
- **name:** A string that adds a title above the tickbox options for that particular column.
- **type:** A string that if equal to "dropdown" will generate a dropdown instead of tickboxes. Note dropdown will only let the user select one value from list of options.

```javascript
// Example of autotickboxer options
atbOptions = {
  "cat1" : {
    "valueNames" : {
      "2011" : "01/01/2011",
      "2012" : "01/01/2012",
      "2013" : "01/01/2013",
      "2014" : "01/01/2014"
    },
    "selectAll" : true,
    "name": "Date"
  },
  "cat2" : {
    "name" : "Select Category Two",
    "type" : "dropdown"
  }
}
```

The following produces:
[image 2]

### Adding eventListener to tickboxes
You can add a function to the tickboxes/dropdown to be called when there is a change to the options. Usually this would be in the following layout:
```javascript
atbEventListener = function(){
	filteredData = atb.filterData();
	redrawVisualisation(filteredData);
}
```

This repository has two examples:
- **simple_example.html:** A basic example on how autotickboxer works.
- **sankey_diagram_example.html:** A sankey visualisation integrated with AutoTickBoxer.
