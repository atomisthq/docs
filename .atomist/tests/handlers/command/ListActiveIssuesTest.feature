Feature: ListActiveIssues handler will list your the most recently active issues
  The ListActiveIssues command handler should
  respond with a list of recent issues.

  Scenario: Get me the latest active issues
    Given nothing
    When the ListActiveIssues is invoked
    Then you get a plan which will retrieve the list of open and active issues
