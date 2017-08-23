Microgrammars are *"partial grammars designed to extract
checker-specific features only"*.

When there is no existing Rug [extension][extensions] and plain file
manipulation is too clumsy and random,
the [microgrammar (pdf)][microgrammar] support in Rug provides an
effective way of declaring a way to safely select and extract a
portion of a file so that it can be inspected and manipulated by your
Rugs.

[extensions]: extensions.md
[microgrammar]: http://web.stanford.edu/~mlfbrown/paper.pdf (How to build static checking systems using orders of magnitude less code. Brown et al., ASPLOS ’16)

!!! note ""
    For more on microgrammars we recommend you check out
    this [post by Adrian Colyer][microgrammar-ac].

[microgrammar-ac]: https://blog.acolyer.org/2016/05/31/how-to-build-static-checking-systems-using-orders-of-magnitude-less-code/ (Micro Grammars - The Morning Paper)

The Atomist implementation of microgrammars is undergoing rapid
development and change.  Please see
the [`@atomist/microgrammar`][microgrammar-ts] TypeScript
implementation for the latest documentation and usage.

[microgrammar-ts]: https://github.com/atomist/microgrammar (Microgrammar TypeScript module)
