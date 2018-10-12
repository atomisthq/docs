{!tbd.md!}

<!--
## Example usage

Install the dependency in your SDM project.

```
$ npm install @atomist-seeds/sdm-pack
```

Then use its exported method to add the functionality to your SDM in
your machine definition.

```typescript
import {
    SoftwareDeliveryMachine,
    SoftwareDeliveryMachineConfiguration,
} from "@atomist/sdm";
import {
    createSoftwareDeliveryMachine,
} from "@atomist/sdm-core";
import { SeedSupport } from "@atomist-seeds/sdm-pack";

export function machine(configuration: SoftwareDeliveryMachineConfiguration): SoftwareDeliveryMachine {
    const sdm = createSoftwareDeliveryMachine({
        name: "My Software Delivery Machine",
        configuration,
    });
    sdm.addExtensionPacks(SeedSupport);
    return sdm;
};
```
-->
