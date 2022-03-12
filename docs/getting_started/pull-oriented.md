## Pull Oriented Delivery


### Using Flux

Requires environment variables `GITHUB_USER` and `GITHUB_TOKEN`.

```bash
flux bootstrap github \
   --owner=$GITHUB_USER \
   --repository=fleet-infra \
   --branch=main \
   --path=./clusters/my-cluster \
   --personal
```
