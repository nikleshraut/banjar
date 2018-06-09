# banjar
Show/hide column's from Datatable using jQuery.

## Create datatable and plugin 

Next, you’ll add to configurution

1. Specify which column you don't want to add in show/hide so that It would be always visible.
2. You can also make persistent search text.

---

## Example Code 

In HTML
```
<div class="col-md-12 text-right">
    <div class="btn-group">
      <button id="show_columns" type="button" class="btn btn-primary btn-outline">
          Show Col
          <i class="fa fa-caret-down"></i>
      </button>
      <div class="show-columns d-none">All columns will come here</div>
    </div>
</div>
<div class="data-table">
	<table id="dataTable">
	..............
	..............
	..............
	</table>
</div>
```
In Javascript
```
var table;
$("#data-tables").css('opacity',0);
$(document).ready(function() {
  if($('#assetuserData').html() !== undefined){
    table = $('#assetuserData').DataTable();
    var show = ["name","department", "email", "phone"];
    var disabled = ["name"];
    addColumns(table,show,disabled);
    $("#data-tables").css('opacity',1);
  }
});
```
## Check live example in JsFiddle

https://jsfiddle.net/nikleshraut/ryat69nc/