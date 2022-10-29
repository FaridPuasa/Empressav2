var $table = $('#table')
  var $remove = $('#remove')
  var selections = []

  function getIdSelections() {
    return $.map($table.bootstrapTable('getSelections'), function (row) {
      return row.id
    })
  }

  function responseHandler(res) {
    $.each(res.rows, function (i, row) {
      row.state = $.inArray(row.id, selections) !== -1
    })
    return res
  }

  function detailFormatter(index, row) {
    var html = []
    $.each(row, function (key, value) {
      html.push('<p><b>' + key + ':</b> ' + value + '</p>')
    })
    return html.join('')
  }

  function operateFormatter(value, row, index) {
    return [
        `<button class="btn btn-link dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fa fa-ellipsis-h"></i>
        </button>`
        ,
        `<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">Action</a><a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
        </div>`
    ].join('')
  }

  window.operateEvents = {
    'click .like': function (e, value, row, index) {
      alert('You click like action, row: ' + JSON.stringify(row))
    },
    'click .remove': function (e, value, row, index) {
      $table.bootstrapTable('remove', {
        field: 'id',
        values: [row.id]
      })
    }
  }

  // function totalTextFormatter(data) {
  //   return 'Total'
  // }

  // function totalNameFormatter(data) {
  //   return data.length
  // }

  // function totalPriceFormatter(data) {
  //   var field = this.field
  //   return '$' + data.map(function (row) {
  //     return +row[field].substring(1)
  //   }).reduce(function (sum, i) {
  //     return sum + i
  //   }, 0)
  // }

 var $table = $('#table')

  $(function() {
        let listing = '<%- JSON.stringify(list) %>'
        //console.log(listing)
        var data = JSON.parse(listing) //testing required
        //console.log(data)
        for(i=0; i<data.length; i++){ //change the value to date
                let start = data[i].value
                let end = 100
                let age = start - end
                console.log(age)
                data[i].age = age
        }
        $table.bootstrapTable({data: data})
        $table.bootstrapTable('updateFormatText', 'formatShowingRows', 'Showing')
  })

// Events
$('.dropdown-container')
	.on('click', '.dropdown-button', function() {
        $(this).siblings('.dropdown-list').toggle();
	})
	.on('input', '.dropdown-search', function() {
    	var target = $(this);
        var dropdownList = target.closest('.dropdown-list');
    	var search = target.val().toLowerCase();
    
    	if (!search) {
            dropdownList.find('li').show();
            return false;
        }
    
    	dropdownList.find('li').each(function() {
        	var text = $(this).text().toLowerCase();
            var match = text.indexOf(search) > -1;
            $(this).toggle(match);
        });
	})
	.on('change', '[type="checkbox"]', function() {
        var container = $(this).closest('.dropdown-container');
        var numChecked = container. find('[type="checkbox"]:checked').length;
    	container.find('.quantity').text(numChecked || 'Any');
	});



$(document).ready(function () {

      var seachHtml = "";

      var checkBoxIdNoPart = 0;
      $("table.table-bordered thead tr th div.th-inner").each(function () {
        checkBoxIdNoPart++;
        seachHtml +=
          '<input class="checkBoxClass"  value=' + checkBoxIdNoPart + ' type="checkbox">' 
          
      });

      $('.dropdown-list').append(seachHtml);

      $("#search_input").keyup(function () {
        var searchText = $(this).val().toLowerCase();
        // Show only matching TR, hide rest of them
        $.each(checkBoxValArray, function (index, value) {
          $.each($('#table tbody td:nth-child(' + value + ')'), function () {
            if ($(this).text().toLowerCase().indexOf(searchText) != -1)
              $(this).parent().show();
            else
              $(this).parent().hide();
          });
        });
      });

      var checkBoxValArray = [];
      $('.checkBoxClass').click(function () {
        checkBoxValArray.push($(this).val());
      });
    });

// https://examples.bootstrap-table.com/index.html#methods/get-visible-hidden-columns.html#view-source
