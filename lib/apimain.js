;$(function() {
	$('a.menuitem').click(function() {
		// alert($(this).data('id'));
		$('iframe').attr('src', 'apiindex.html?id=' + $(this).data('id'));
	});
});