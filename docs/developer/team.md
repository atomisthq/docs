
In team mode, your SDM connects to the Atomist service.

## What team mode gives you

## What is necessary to enable team mode

## See your SDM registration

When your SDM registers with the Atomist service, you can see this registration in the Atomist dashboard. 

Go to [app.atomist.com](https://app.atomist.com), log in, and make sure your team is selected. Then click on the little "Settings" gear.

![Settings button in the dashboard](img/settings.png)]

Choose "Automation Clients" from the tab. (This includes SDMs.) This will show you a list of registered SDMs and built-in automations. Click the little down arrow to expand information.

![Client list in the dashboard](img/clients.png)]

The detailed information on the registered SDM includes commands, event subscriptions, and a metadata section. The metadata section has clues about where it's running, such as the `system.hostname`. It also shows the `atomist.policy`: durable or ephemeral.

### Durable subscriptions

An SDM that starts up as durable (usually because you ran it with ATOMIST_ENV=production) will get all the events it subscribes to,
even if it is not up all the time. The Atomist service saves events for it (up to a point).
 This registration will remain active even when the SDM is down. Every unique name/version combination will 
 remain active until you delete the registration in the dashboard.

 Click "delete" to remove a durable registration. You'll need to do this when you upgrade your SDM to a new version, after you shut down the old version.

![Delete registration button](img/delete.png)]

 In development mode, like when you're experimenting with an SDM on your laptop, you want `atomist.policy` to be `ephemeral`. Events are sent while the SDM is up, and ignored while it is down. The registration disappears when the SDM disconnects.

## More info

* See more about [deploying SDMs in production](sdm-deploy.md)
* Constrast with [local mode](local.md)