$(function() {
  if ( $('.issues-list-options').length > 0 ) {
    add_extra_issue_list_controls();
  }

  $('.dynamically-inserted a').on(
    'click',
    function(e) {
      e.preventDefault();
      var $button_list  = $('.dynamically-inserted');
      var $this         = $(this);
      var $show         = $this.data('show');
      var $issues       = $('.issues-list .octicon-issue-opened').closest('li');
      var $prs          = $('.issues-list .octicon-git-pull-request').closest('li');

      $button_list.find('a').removeClass('selected');
      $this.addClass('selected');

      if($show === 'issues') {
        $issues.show();
        $prs.hide();
      }
      else if($show === 'prs') {
        $issues.hide();
        $prs.show();
      }
      else {
        $issues.show();
        $prs.show();
      }
    }
  );
});

var add_extra_issue_list_controls = function() {
  $('.issues-list-options').append(button_template);
}

var button_template = '<div class="button-group dynamically-inserted"><a href="#" class="minibutton selected" data-show="all">All</a><a href="#" class="minibutton" data-show="issues"><span class="type-icon octicon octicon-issue-opened"></span></a><a href="#" class="minibutton" data-show="prs"><span class="type-icon octicon octicon-git-pull-request"></span></a></div>';