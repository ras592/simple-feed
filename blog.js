$(document).ready(function() {
	$('#blogForm').submit(function(event) {
		event.preventDefault();
		var title = $.trim($('#postTitle').val());
		var body = $.trim($('#postBody').val());
		var errors = [];
		if(!title.length) {
			// title wasn't given
			if(!$('#postTitleError').length) {
				$('.postTitle').append($(document.createElement('div'))
					.addClass('alert alert-danger').attr('id', 'postTitleError')
					.text("Title wasn't given."));
			}
			errors.push('No title');
		}
		if(!body.length) {
			// body wasn't given
			if(!$('#postBodyError').length) {
				$('.postBody').append($(document.createElement('div'))
					.addClass('alert alert-danger').attr('id', 'postBodyError')
					.text("Body wasn't given."));
			}
			errors.push('No body');
		}
		if(errors.length == 0) {
			addToFeed(title, body);
			console.log("Title:\n" + title);
			console.log("Body:\n" + body);
		} else {
			errors.forEach(function(e) {
				console.log(e);
			});
		}
	});

	// on focus removal of no title error
	$('input#postTitle').focus(function(event) {
		$('#postTitleError').remove();
	});

	// on focus removal of no body error
	$('textarea#postBody').focus(function(event) {
		$('#postBodyError').remove();
	});

	// on click removal of posts
	$('#feed').on("click", "span", function() {
		console.log(this);
		this.parentElement.parentElement.parentElement.remove();
	});

});

function addToFeed(title, body) {
	var postEl = $(document.createElement('div'))
	.addClass("post panel panel-default col-xs-12 col-sm-12 col-md-10 col-md-offset-1");

	var headingEl = $(document.createElement('div'))
	.addClass("panel-heading");

	var titleEl = $(document.createElement('div'))
	.addClass("panel-title post-title").text(title)
	.append("<span class=\"removeIcon glyphicon glyphicon-remove pull-right\"></span>");

	var bodyEl = $(document.createElement('div'))
	.addClass("panel-body post-body").text(body);

	headingEl.append(titleEl);
	postEl.append(headingEl);
	postEl.append(bodyEl);

	$('#feed').prepend(postEl);
}
