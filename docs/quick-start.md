The easiest way to get started with Atomist is to start on your
laptop in [local mode][local], working with local commits. Get your own software delivery machine,
 and then customize it. This Quick Start begins with an SDM for
 delivering and maintaining Java Spring Boot web services.

You'll need [Git][git],
[Node.js][node], and the [Java JDK][jdk] installed.

[git]: https://git-scm.com/downloads  (Install Git)
[node]: https://nodejs.org/ (Node.js)
[jdk]: http://jdk.java.net/ (Java JDK)
[local]: developer/local.md (SDM Local Mode)

## Quick start

1.  Install the Atomist command-line utility.

        npm install -g @atomist/cli

2.  Create a local software delivery machine (SDM). This is going to create a new project
in the Atomist projects directory (which defaults to `$HOME/atomist/`). Projects are grouped by user.

        atomist create sdm

    Select the default machine, `spring`.  When prompted for the name
    of the target repository, enter `quick-sdm`.  When prompted for a
    target owner, enter your user name (on GitHub or anywhere).

3.  Change into the newly created SDM project.

        cd ~/atomist/<your user name>/quick-sdm

4.  Start your local SDM.

        atomist start --local

    The above command will install the project dependencies using NPM,
    compile the TypeScript, and start your SDM.  Depending on your
    network connection, this may take a minute or more.

    Leave this terminal window open. Logs will print to this screen.


6.  In another terminal, check what your SDM can do. This will print a list of commands supported by your running quick-sdm.

        atomist show skills

5.  Start up the SDM feed so you can see what the
    SDM is doing.

        atomist feed

    Leave this terminal window open. Messages will print here.

6.  In another terminal, create a [Spring Boot][spring-boot] project.

        atomist create spring

    This command will connect to your locally running SDM and use its
    capabilities to create a new Spring Boot project for you.  When
    prompted for the target repository, enter `quick-spring`.  When
    prompted for group identifier and root package, enter `com.me` and
    `com.me.spring`, respectively.  When prompted for the target
    owner, enter your user name again.

    If you look in the terminal with the Atomist feed, you will see
    the SDM cloning the seed repository, cloning it locally, building
    it, and deploying it locally.  The first time you run this, it may
    take a few minutes as it downloads all the Maven and project
    dependencies.

    ![Atomist Feed for Create Spring Project](img/atomist-feed-create-spring.png)

    You can go to the URL provided for the local deployment and verify
    that your new Spring Boot application is running.

    ![Locally Deployed Spring Boot Application](img/spring-boot-service.png)

7.  Change into your newly created Spring Boot project.

        cd ~/atomist/<your user name>/quick-spring

8.  Change the message in your Spring Boot application.  Edit
    `src/main/java/com/me/spring/QuickSpringController.java`, changing
    "world" to your location.  Then commit your change.

        git add src/main/java/com/me/spring/QuickSpringController.java
        git commit -m 'Update location'

9.  Go back to the Atomist feed to observe your locally running SDM
    noticing your commit and respond by building and deploying your
    latest version.

    ![Atomist Feed for Commit](img/atomist-feed-commit.png)

    Go to the URL again and verify the message contains your location.

    ![Updated Locally Deployed Spring Boot Application](img/spring-boot-service-location.png)

[spring-boot]: https://spring.io/projects/spring-boot (Spring Boot)

## Next steps

Learn more about what you can do with an SDM in the
[Developer Guide][developer-guide].

When you're ready to put your SDM to work for your whole team,
continue with [setup][].

[developer-guide]: developer/index.md (Atomist Developer Guide)
[setup]: user/index.md (Atomist Setup)
