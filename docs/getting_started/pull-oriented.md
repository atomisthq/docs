## Pull Oriented Delivery


### Using Flux

```bash
export GITHUB_USER=vonwig
export GITHUB_TOKEN=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
flux bootstrap github \
   --owner=$GITHUB_USER \
   --repository=fleet-infra \
   --branch=main \
   --path=./clusters/my-cluster \
   --personal
```
