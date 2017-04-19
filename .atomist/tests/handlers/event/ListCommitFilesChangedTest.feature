Feature: ListCommitFilesChanged handler fetches and lists modified files
  The ListCommitFilesChanged event handler should return a nicely
  formatted messsage of all modified files in a commit.

  Scenario: Listing modified files in a commit
    Given the ListCommitFilesChanged is registered
    When a new Commit is pushed
    Then the event handler should respond with a message
    Then the event handler should also plan on listing files
