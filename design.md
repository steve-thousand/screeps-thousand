# Design

Attempting to create a simple loop for deciding behavior. The loop should be, roughly:

1. Evaluate gamestate
    * what units are where
    * how much energy do we have
1. ???
1. Decide immediate unit behavior
    * unit A moves to B
    * spawn produces unit C
    * upgrade building D

The middle-step is a bit nebulous right now. It requires coming up with high-level goals, and then deciding on strategies for accomplishing those goals

## Setting Goals

Before we can tell our units what to do, we need to know what we want to accomplish. For instance:

* gather energy
* expand
* upgrade
* attack

Unfortuantely what is confusing about this is that sometimes goals have other dependent goals (maybe?). For instance:

* gather energy
  * identify best unit to get energy
    * find nearest/best energy source
* attack
  * construct unit to attack

### Long-term vs Short-term Goals

Also some goals are long-term and some are short. One ultimate goal one has after starting the game is upgrading the spawn, but that goal will have to wait until other gathering goals are met. And gathering more energy might also rely on constructing more harvesters so that we can harvest faster in the future, another long-term goal.

### Multithreading Goals

We may also be able to work on several goals at once. Depending on how many buildings/units we have, we can multi-thread those goals.

### Static Goals?

It seems like, no matter what is happening in the game, there are some ultimate goals that never change:

* EXPAND (the factory must grow)
* DEFEND/MAINTAIN (fight entropy)
* IMPROVE (optimize)

Or perhaps it can be simplified:

* OPTIMIZE THE ACQUISITION OF ENERGY

This one simple goal requires us to think about expanding our territory and gathering powers, while also focusing on what pieces of our infrastructure need to be maintained and improved.
