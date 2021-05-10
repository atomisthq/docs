# HTTP Calls in an SDM

There are several HTTP client libraries available in Node.

You're free to use any of them, if they work for you. We have found that some
internal networks have interesting characteristics that confuse many of them. To
accommodate this, we made an HttpClientFactory abstraction that can be used to change
the http client used in an SDM.

You have access to these as well. I recommend the [DefaultHttpClientFactory][apidoc-dhcf]
, which is backed by [axios][].

[apidoc-dhcf]: https://atomist.github.io/automation-client/modules/_spi_http_httpclient_.html#defaulthttpclientoptions (API Doc for DefaultHttpClientFactory)
[axios]: https://www.npmjs.com/package/axios (npm package Axios)
