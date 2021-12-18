$(function() {
   if($('textarea#ta').length) {
       CKEDITOR.replace('ta');
   } 

   $('button.confirm-deletion').on('click', function() {
        if(!confirm('Are you sure you want to Delete this page?')) {
            return false;
        }
   });

   $('a.clear').on('click', function() {
        if(!confirm('Are you sure you want to clear cart?')) {
            return false;
        }
    });
});