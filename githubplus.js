$(function() {
  var add_extra_issue_list_controls = function() {
    var issueCheck;
    if($('#issues_list .issues-list-options').length > 0) {
      issueCheck = window.setInterval(
        function() {
          if( $('.dynamically-inserted').length === 0){
            $('.issues-list-options').append(button_template);
            chrome.storage.sync.get('githubplus.issuesShow', function(items) {
              $('.issues-list-options').find('.dynamically-inserted [data-show="'+items['githubplus.issuesShow']+'"]').click()
            });
          }
        },
        500
      );
    }
    else {
      window.clearInterval(issueCheck);
    }
  }

  // Remove whitespace from GitDiffs automatically
  //$('[data-container-id="files_bucket"]').attr('href', function(i,href) { return href + '?w=0'; });

  // Make the auto inserted buttons work
  $(document).on(
    'click',
    '.dynamically-inserted a',
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
        chrome.storage.sync.set({'githubplus.issuesShow': 'issues'});
      }
      else if($show === 'prs') {
        $issues.hide();
        $prs.show();
        chrome.storage.sync.set({'githubplus.issuesShow': 'prs'});
      }
      else {
        $issues.show();
        $prs.show();
        chrome.storage.sync.set({'githubplus.issuesShow': 'all'});
      }
    }
  );

  var button_template = '<div class="button-group dynamically-inserted"><a href="#" class="minibutton selected" data-show="all">All</a><a href="#" class="minibutton" data-show="issues"><span class="type-icon octicon octicon-issue-opened"></span></a><a href="#" class="minibutton" data-show="prs"><span class="type-icon octicon octicon-git-pull-request"></span></a></div>';
  add_extra_issue_list_controls();
});