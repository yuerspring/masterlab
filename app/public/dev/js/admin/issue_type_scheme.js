
var IssueTypeScheme = (function() {

    var _options = {};

    // constructor
    function IssueTypeScheme(  options  ) {
        _options = options;

        $("#btn-issue_type_scheme_add").click(function(){
            IssueTypeScheme.prototype.add();
        });

        $("#btn-issue_type_scheme_update").click(function(){
            IssueTypeScheme.prototype.update();
        });

    };

    IssueTypeScheme.prototype.getOptions = function() {
        return _options;
    };

    IssueTypeScheme.prototype.setOptions = function( options ) {
        for( i in  options )  {
           // if( typeof( _options[options[i]] )=='undefined' ){
                _options[i] = options[i];
           // }
        }
    };

    IssueTypeScheme.prototype.fetchIssueTypeSchemes = function(  ) {

        // url,  list_tpl_id, list_render_id
        var params = {  format:'json' };
        $.ajax({
            type: "GET",
            dataType: "json",
            async: true,
            url: _options.filter_url,
            data: $('#'+_options.filter_form_id).serialize() ,
            success: function (resp) {

                var source = $('#'+_options.list_tpl_id).html();
                var template = Handlebars.compile(source);
                var result = template(resp.data);
                $('#' + _options.list_render_id).html(result);


                var add_issue_types_select = document.getElementById('id_issue_types');
                for(var i = 0; i < resp.data.issue_types.length; i++){
                    add_issue_types_select.options.add(new Option( resp.data.issue_types[i].name, resp.data.issue_types[i].id ));
                }

                var edit_issue_types_select = document.getElementById('edit_issue_types');
                for(var i = 0; i < resp.data.issue_types.length; i++){
                    edit_issue_types_select.options.add(new Option( resp.data.issue_types[i].name, resp.data.issue_types[i].id ));
                }
                $('.selectpicker').selectpicker('refresh');

                $(".list_for_edit").click(function(){
                    IssueTypeScheme.prototype.edit( $(this).attr("data-value") );
                });

                $(".list_for_delete").click(function(){
                    IssueTypeScheme.prototype._delete( $(this).attr("data-value") );
                });

            },
            error: function (res) {
                notify_error("请求数据错误" + res);
            }
        });
    }

    IssueTypeScheme.prototype.edit = function(id ) {

        var method = 'get';
        $.ajax({
            type: method,
            dataType: "json",
            async: true,
            url: _options.get_url+"?id="+id,
            data: { id:id} ,
            success: function (resp) {

                $("#modal-issue_type_scheme_edit").modal();
                $("#edit_id").val(resp.data.id);
                $("#edit_name").val(resp.data.name);
                $('#edit_issue_types').val( resp.data.for_issue_types);
                $('#edit_issue_types').selectpicker('refresh');
                $("#edit_description").val(resp.data.description);
            },
            error: function (res) {
                notify_error("请求数据错误" + res);
            }
        });
    }

    IssueTypeScheme.prototype.add = function(  ) {

        var method = 'post';
        var params = $('#form_add').serialize();
        $.ajax({
            type: method,
            dataType: "json",
            async: true,
            url: _options.add_url,
            data: params ,
            success: function (resp) {
                notify_success( resp.msg );
                if( resp.ret == 200 ){
                    window.location.reload();
                }
            },
            error: function (res) {
                notify_error("请求数据错误" + res);
            }
        });
    }

    IssueTypeScheme.prototype.update = function(  ) {

        var method = 'post';
        var params = $('#form_edit').serialize();
        $.ajax({
            type: method,
            dataType: "json",
            async: true,
            url: _options.update_url,
            data: params ,
            success: function (resp) {
                notify_success( resp.msg );
                if( resp.ret == 200 ){
                    window.location.reload();
                }
            },
            error: function (res) {
                notify_error("请求数据错误" + res);
            }
        });
    }

    IssueTypeScheme.prototype._delete = function(id ) {

        if  (!window.confirm('Are you sure delete this item?')) {
            return false;
        }

        var method = 'GET';
        $.ajax({
            type: method,
            dataType: "json",
            data:{id:id },
            url: _options.delete_url,
            success: function (resp) {
                notify_success( resp.msg );
                if( resp.ret == 200 ){
                    window.location.reload();
                }
            },
            error: function (res) {
                notify_error("请求数据错误" + res);
            }
        });
    }

    return IssueTypeScheme;
})();


