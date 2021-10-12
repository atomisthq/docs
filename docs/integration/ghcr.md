# GitHub Container Registry

!!! Steps
    1. Install the Atomist GitHub application
    2. To enable "on push" scanning of private images, set a personal access token to use for container image pulls

### Step 1:  Install the Atomist GitHub application

Install the application into the GitHub Organization that contains your container registry.

![install][img/ghcr/install.png]

!!! Note
    GitHub will send events whenever images are pushed, but only when the image is linked to a repository that 
    the GitHub app installation can access.  If your container repository is link to `org/repo1`, then the app must be
    installed in Org `org`, and the app installation must be able to access `repo1`.

### Step 2:  Enable the GHCR Integration  

The GHCR Integration must be enabled before Atomist will start scanning any new Images.  The only parameter is a GitHub 
personal access token.

![config][img/ghcr/config.png]

You can click "Save configuration" without entering a token.  With this configuration, Atomist will only scan public images.
Add a personal access token to enable scanning of private Images.  The GitHub app installation is not sufficient.
Create a personal access token that has `read:packages` scope.

![pat][img/ghcr/pat.png]

