function addColumns(table,show=[],disabled=[]){
  var currentUrl = location.href.split('/');
  var mainurl = currentUrl.length-1;
  //var pageFor = currentUrl[4].toLowerCase();
  var pageFor = currentUrl[mainurl].toLowerCase();
  var showColumns = JSON.parse(window.localStorage.getItem('show'+pageFor+'Columns'));
  var searchStr = window.localStorage.getItem('searchStr'+pageFor);
  // Apply Show columns
  if(showColumns === undefined || showColumns === null){
    window.localStorage.setItem('show'+pageFor+'Columns',JSON.stringify(show));
  }else{
    show = JSON.parse(window.localStorage.getItem('show'+pageFor+'Columns'));
  }
  // Apply search string
  if(searchStr !== undefined && searchStr !== null){
    table.search(searchStr).draw();
  }

  table.on('search.dt', function() {
      var value = $('.dataTables_filter input').val();
      window.localStorage.setItem('searchStr'+pageFor,value);
  });


  var headers = table.columns().header();
  var str = "";
  var columnName;
  var isDisabled;
  var checked;
  headers.each(function(elem,index){
      columnName = $(elem).html().trim();
      if(columnName != ''){
        isDisabled = (disabled.indexOf(columnName.toLowerCase())!=-1)?" disabled='true' ":"";
        checked = (show.length==0 || show.indexOf(columnName.toLowerCase())!=-1)? "checked='true'":'';
        str +=`<div class="form-check">
              <label class="form-check-label">
              <input `+isDisabled+` class="form-check-input" id="idAssetCode" type="checkbox" value="" `+checked+` data-num="`+index+`"><span class="form-check-sign"></span><i>`+columnName+`</i>
              </label>
          </div>`;
      }
      if(checked==''){
        table.column(index).visible(false);
      }
  });
  $(".show-columns").html(str);
  $('.show-columns input').on("change",function() {
      var num = $(this).data('num');
      var obj = JSON.parse(window.localStorage.getItem('show'+pageFor+'Columns'));
      var columnName = $(headers[num]).text().toLowerCase();
      if(this.checked) {
          table.column(num).visible(true);
          obj.push(columnName);
      } else {
          table.column(num).visible(false);
          var index = obj.indexOf(columnName);
          obj.splice(index, 1);
      }
      window.localStorage.setItem('show'+pageFor+'Columns',JSON.stringify(obj));
  });
  $('#show_columns,.show-columns').hover(function(){
      $(".show-columns").toggleClass('d-none');
  });
}