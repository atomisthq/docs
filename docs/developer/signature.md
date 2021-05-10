# Signing Goals and Custom Events

In order to establish stronger and verifiable trust between an SDM and other SDMs or the Atomist backend,
it is possible to cryptographically sign SDM goals and custom events. Signatures can then be verified when
goals and custom events come back into the SDM via event subscriptions. 

The following sections describe how to configure and use the goal and event signing functionality. 

## Creating a key pair

The SDM uses [JSON Web Signature](https://en.wikipedia.org/wiki/JSON_Web_Signature) to sign and verify goals 
and customer events: JSON Web Signature (JWS) is a way to ensure integrity of information in a highly serializable,
machine-readable format. That means that it is information, along with proof that the information hasn't changed
since being signed. It can be used for sending information from one web site to another, and is especially
aimed at communications on the web.

To generate a JWS keypair use the following command: 

```shell
$ openssl ecparam -genkey -name secp521r1 -noout -out es512-private.pem && \
    openssl ec -in es512-private.pem -pubout -out es512-public.pem
```
                                                    
## Configure goal signing

In order for the SDM to sign outgoing goals and verify incoming goals, add the following to your SDM
configuration: 

```json
{
  "sdm": {
	"goalSigning": {
	  "enabled": true,
	  "signingKey": {
		"name": "atomist.com/demo-sdm",
		"privateKey": "< private key >",
		"publicKey": "< public key >",
		"passphrase": "< optional passphrase >",
		"algorithm": "jwt-es512"
	  },
	  "verificationKeys": [
		{
		  "name": "atomist.com/demo-sdm",
		  "publicKey": " < public key >",
		  "algorithm": "jwt-es512"
		}
	  ]
	}
  }
}
```

The `verificationKeys` property is an array and take more than one public key to verify incoming goals. 
This is useful if you have several SDMs running that share goals and use different signing keys. 

## Configure custom event signing

The SDM can automatically sign and verify custom events. For this to work a `signature` field needs to
be added to the definition to the GraphQL custom type and the `signature` fields needs to be including 
in very subscription the SDM should verify.

Here's an example `WeatherEvent` that defines a `signature` field:

```graphql
type WeatherEvent @rootType {
    @compositeId
    date: Date
    temperatur: Int
    
    signature: String
}
```
    
To ingest and subscribe to `WeatherEvent` instances, you should use the following mutation and subscription,
including the `signature` field:

```graphql
mutation ingestWeatherEvent($value: CustomWeatherEventInput!) {
    ingestCustomWeatherEvent(value: $value)
}
```
```graphql
subscription onWeatherEvent {
    WeatherEvent {
        id
        date
        signature
    }
}
```

In order to sign and verify `WeatherEvent` instances, use the following SDM configuration:

````json
{
  "sdm":{
    "eventSigning":{
      "enabled":true,
      "events":[
        "^.*WeatherEvent.*$"
      ],
      "signingKey":{
        "name":"atomist.com/demo-sdm",
        "privateKey":"< private key >",
        "publicKey":"< public key >",
        "passphrase":"< optional passphrase >",
        "algorithm":"jwt-es512"
      },
      "verificationKeys":[
        {
          "name":"atomist.com/demo-sdm",
          "publicKey":"< public key >",
          "algorithm":"jwt-es512"
        }
      ]
    }
  }
}
````

The `events` property accepts regular expression that denote mutation and subscription names that should
be getting signed and verified. 
