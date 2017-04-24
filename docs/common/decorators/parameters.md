Parameters are declared using the `#!typescript @Parameter` decorator. 
The decorated variable names the parameter. If you assign a value to that
variable, it becomes the parameter's default value. The `#!typescript @Parameter`
decorator adds additional metadata via a single argument: a JavaScript object
whose properties are documented in the [conventions][rugconv]. Though the only
mandatory property is `#!typescript pattern`. It is highly recommended to also
set `#!typescript description`, `#!typescript displayName` and 
`#!typescript validInput` in order to help other users when invoking Rugs via
the Atomist bot.

[rugconv]: conventions.md