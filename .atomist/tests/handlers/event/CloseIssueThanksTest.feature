Feature: Thank people publicly for closing issues
  It is very helpful when people close issues
  they have completed.  We should publicly than
  them in Slack.

  Scenario: Thank the assignee of an issue when it is closed
    Given the CloseIssueThanks handler is registered
    When a closed issue event arrives
    Then a message should be sent thanking the assignee

  Scenario: Do not thank the assignee of an open issue
    Given the CloseIssueThanks handler is registered
    When an open issue event arrives
    Then no message should be sent
