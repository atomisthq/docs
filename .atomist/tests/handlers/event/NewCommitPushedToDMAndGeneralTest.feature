Feature: NewCommitPushedToDMAndGeneral handler is called on new commits
  The NewCommitPushedToDMAndGeneral event handler should
  respond with two messages, one to the general channel
  and another one as a DM.

  Scenario: Pushing a new commit
    Given the NewCommitPushedToDMAndGeneral event handler is registered
    When a new Commit is pushed
    Then the event handler should respond with two messages
    Then the first message should target the general channel
    Then the second message should be a DM
