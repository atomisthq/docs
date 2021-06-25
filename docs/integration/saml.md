Contact [Atomist support](mailto:support@atomist.com) to enable a SAML authentication provider on your workspace.

## Updating Public Key

For many saml providers, the public key is available from a public url. In cases where the public key is configured on the provider, it will need to be updated periodically.  This update can be done by an Atomist workspace administrator.  The administrator will need:

1.  an Atomist api-key with the `Administrator` permission
2.  an environment with both `curl` and `jq` installed.
3.  the unique `id` for the auth provider of their workspace

The first step is to create a local json document that can be updated with the new public key.  The `curl` command below will need two substitutions (`<admin-api-key>` and `<auth-provider-id>`). Some top-level fields have been removed because they can not be present in the next `PUT` operation.

```bash
curl \
    -H 'Authorization: Bearer <admin-api-key>' \
    https://api.atomist.com/v2/auth/providers/<auth-provider-id> | \
    jq  'del(.global, .login_url, .team_id, .id)' | \
    cat > auth.json
```

The resulting `auth.json` file will look something like the one below.  You should leave all entries untouched except for the `public_key` entry.  The value of the field must be set to the base64-encoded of your public key.

```json
{
  "saml-authn-binding" : "post",
  "public_key" : "....",
  "saml-digest-algorithm" : "sha256",
  "enabled" : true,
  "sign-requests" : true,
  "saml-attrs" : {
    "surname" : "lastname",
    "given-name" : "firstname",
    "email" : "email"
  },
  "validate_response_signatures" : true,
  "type" : "adfs",
  "created_at" : 1599821897093,
  "client_id" : "https://api.atomist.com/v2/auth/saml"
}
```

After editing `auth.json`, run the following command to update the workspace auth provider configuration.

```bash
curl -X PUT \ 
     -H 'Content-Type: application/json' \ 
     -H'Authorization: Bearer <admin-api-key>' \
     https://api.atomist.com/v2/auth/providers/89185b75-1351-4680-a0fc-08c4d18a284f \
     --data-binary @auth.json
```

