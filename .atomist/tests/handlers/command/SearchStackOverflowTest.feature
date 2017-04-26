Feature: SearchStackOverflow handler response to the StackOverflow command
  The SearchStackOverflow command handler should
  respond with the result from StackOverflow.

  Scenario: Performing a query against StackOverflow
    Given nothing
    When the SearchStackOverflow command handler is invoked
    Then a plan to request the StackOverflow API should be returned
