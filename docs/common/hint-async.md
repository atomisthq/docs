!!! important "It's all asynchronous"
    It is important to appreciate that because handlers return plans,
    the actions declared in that plan are executed asynchronously. In other
    words, plans are just data the Rug runtime knows how to interpret but your
    handler cannot invoke those Rugs directly. So it's not safe to make 
    assumptions about when instructions in a plan will be run, although
    it is fair to say that the Atomist platform will do its best to apply them
    as soon as possible.
