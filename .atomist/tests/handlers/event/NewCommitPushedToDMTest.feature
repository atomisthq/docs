Feature: NewCommitPushedToDM handler is called on new commits
  The NewCommitPushedToDM event handler should
  respond with a direct message.

  Scenario: Pushing a new commit
    Given the NewCommitPushedToDM event handler is registered
    When a new Commit is pushed
    Then the event handler should respond with a message
    Then that message should be a DM
