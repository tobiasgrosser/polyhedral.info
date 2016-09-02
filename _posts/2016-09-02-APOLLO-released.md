---
layout: default
title: APOLLO released - runtime speculative polyhedral loop optimizer
author: Philippe Clauss
www: http://icps.u-strasbg.fr/~clauss/
---
We are glad to announce the first release of APOLLO, the runtime 
speculative polyhedral loop optimizer and parallelizer. APOLLO is based 
on several innovative strategies, making polyhedral loop analyses and 
transformations applicable to loops that can not be handled using 
compile-time optimizers, e.g. while loops, with memory references 
through pointers or indirections, etc.

While the target loops are running, APOLLO automatically detects phases 
that are polyhedral-compliant (i.e. linear), or quasi-compliant (i.e. 
nonlinear) but modeled using "tubes", and then applies speculatively 
polyhedral code transformations that extract parallelism and optimize 
data locality. The applied transformations are selected thanks to a 
runtime usage of the polyhedral compiler Pluto. The optimized 
transformed codes are generated on-the-fly by using building blocks 
called "code bones", and by invoking the polyhedral code generator CLooG 
and the LLVM JIT compiler.

APOLLO is very easy to use. It is made of a static compiler based on 
Clang-LLVM to prepare the code, and a runtime system orchestrating the 
program execution. It has been released under the BSD 3-Clause Open 
Source License.

The installation package and more details with examples can be found on 
APOLLO's website: [http://apollo.gforge.inria.fr](http://apollo.gforge.inria.fr)

We look forward to your feedbacks!

The APOLLO crew: Juan Manuel Martinez Caamano, Aravind Sukumaran-Rajam, 
Artiom Baloian, Willy Wolff, Philippe Clauss
