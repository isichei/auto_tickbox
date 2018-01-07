# auto_tickbox
JavaScript function that generates tick boxes or dropdown menus for each column in a tabular dataset.

## Introduction
The Autotickbox constructor function takes a 
Function expects tabular data that is represented in an array of objects. For example:

| col1 | col2 | col3 |
|------|------|------|
| a    | 1    | x    |
| b    | 12   | x    |
| c    | 42   | y    |

Would be :
```
tabular_data = [{"col1" : "a", "col2" : 1, "col3" : "x"},
{"col1" : "b", "col2" : 12, "col3" : "x"},
{"col1" : "c", "col2" : 42, "col3" : "y"}]
```

The function AutoTickbox has