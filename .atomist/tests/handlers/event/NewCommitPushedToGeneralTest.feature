Feature: NewCommitPushedToGeneral handler is called on new commits
  The NewCommitPushedToGeneral event handler should
  respond with a message to the general channel.

  Scenario: Pushing a new commit
    Given the NewCommitPushedToGeneral event handler is registered
    When a new Commit is pushed
    Then the event handler should respond with a message
    Then that message should target the general channel
