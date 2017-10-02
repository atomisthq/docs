Microgrammars are *"partial grammars designed to extract
checker-specific features only"*.

When there is no out of the box support for a file type, and plain file
manipulation is too clumsy and random,
Atomist [microgrammar (pdf)][microgrammar] support allows you to safely pinpoint elements of files and edit them with clean diffs.

[extensions]: extensions.md
[microgrammar]: http://web.stanford.edu/~mlfbrown/paper.pdf (How to build static checking systems using orders of magnitude less code. Brown et al., ASPLOS ’16)

!!! note ""
    For more on microgrammars we recommend you check out
    this [post by Adrian Colyer][microgrammar-ac].

[microgrammar-ac]: https://blog.acolyer.org/2016/05/31/how-to-build-static-checking-systems-using-orders-of-magnitude-less-code/ (Micro Grammars - The Morning Paper)

TPlease see
the [`@atomist/microgrammar`][microgrammar-ts] TypeScript
implementation for the latest documentation and usage.

[microgrammar-ts]: https://github.com/atomist/microgrammar (Microgrammar TypeScript module)
