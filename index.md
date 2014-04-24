---
layout: default
title: Polyhedral Compilation
---

Preliminary note
----------------
[polyhedral.info](/) provides
information about the polyhedral compilation community including both the
latest developments as well as an overview of existing work. Heavily relying on
community [contributions](/contribute.html), it provides information
about [software tools](software.html) that use polyhedral
compilation techniques, the latest [publications](publications.html)
in this area as well as [community events](events.html).

Polyhedral Compilation
======================

Polyhedral compilation encompasses the compilation techniques that rely on the
representation of programs, especially those involving nested loops and arrays,
thanks to parametric polyhedra <a
class="citation">FEAUTRIER1988PARAMETRIC</a><a
class="citation">WILDE1993POLYLIB</a><a
class="citation">LOECHNER1999POLYLIB</a> or Presburger relations <a
class="citation">KELLY1996OMEGA</a><a class="citation">VERDOOLAEGE2010ISL</a>,
and that exploit combinatorial and geometrical optimizations on these objects
to analyze and optimize the programs. Initially proposed in the context of
compilers-parallelizers, it is now used for a wide range of applications,
including automatic parallelization, data locality optimizations, memory
management optimizations, program verification, communication optimizations,
SIMDization, code generation for hardware accelerators, high-level synthesis,
etc. There has been experience in using such techniques in static compilers,
just-in-time compilers, as well as DSL compilers. The polyhedral research
community has a strong academic background, but more and more industry users
start to adapt such technologies as well.

The interest of using polyhedral representations is that they can be
manipulated or optimized with algorithms whose complexity depends on their
structure and not on the number of elements they represent. Furthermore,
generic and compact solutions can be designed that depend on program parameters
(e.g., loop bounds, tile sizes, array bounds). In a word, polyhedral techniques
are the symbolic counterpart, for structured loops (but without unrolling
them), of compilation techniques (such as scheduling, lifetime analysis,
register allocation) designed for acyclic control-flow graphs or unstructured
loops. Also, compared to optimizations that handle loops or arrays as a whole,
polyhedral techniques can work at the granularity of their elements, i.e., at
the granularity of a loop iteration and instance of a statement (operation),
and at the granularity of an array element.
 
The underlying theory dates back to seminal contributions such as *The
Organization of Computations for Uniform Recurrence Equations* by Karp, Miller,
and Winograd (1968) <a class="citation">KARP1967</a> and *Array Expansion*
(1988) <a class="citation">FEAUTRIER1988ARRAY</a> and *Dataflow Analysis of
Array and Scalar References* (1991) <a class="citation">FEAUTRIER1991</a> by
P. Feautrier, and was built on important contributions in the 80s on loop
transformations (work of Lamport <a class="citation">LAMPORT1974</a>, Banerjee,
Wolfe, Allen and Kennedy, Irigoin and Triolet <a
class="citation">IRIGOIN1988</a>, etc.) and on systolic arrays design (work of
Quinton, Rajopadhye, Delosme, etc.), before the *big picture* emerged. The
development of optimizations tools such as PIP <a
class="citation">FEAUTRIER1988PARAMETRIC</a> (parametric integer programming)
in 1988, which enables parametric optimization on polyhedra, Polylib <a
class="citation">WILDE1993POLYLIB</a><a
class="citation">LOECHNER1999POLYLIB</a> (with developments since 1987, on top
of Chernikova's algorithm), and Omega <a class="citation">KELLY1996OMEGA</a>
around 1990 <a class="citation">PUGH1991UNIFORM</a> (by Bill Pugh and his
group) were key contributions to make such polyhedral optimizations
possible. The 1978 seminal paper on abstract interpretation *Automatic
Discovery of Linear Restraints Among Variables of a Program* by Cousot and
Halbwachs<a class="citation">COUSOT1978</a> can also be considered as one axis
of foundations for polyhedral analysis, even if it gave rise to an
initially-disjoint community.

Since then, in the last 20 years, the research community has extended the
theory and the available polyhedral tools and libraries with Ehrhart
polynomials <a class="citation">CLAUSS1996</a>, Barvinok's counting algorithm,
lattice optimizations, Presburger formulas manipulations, code generation
algorithms. The development of freely-available tools such as ISL, CLooG,
Pluto, PIPS, Fadalib, Cl@k, Gecos, to quote but a few, and the introduction of
polyhedral libraries in GCC and LLVM were important steps for the dissemination
of polyhedral compilation. The field of applications now covers a wide range of
directions such as:

* #### Program analysis
	+ Dependence analysis
	+ Array expansion and single assignment transformation
	+ Liveness and reuse/locality analysis of array elements
	+ Array region analysis and approximations

* #### Scheduling theory
	+ Farkas lemma and multi-dimensional scheduling
	+ Automatic vectorization and parallelization of nested loops
	+ Link with loop transformations (interchange, fusion, retiming, etc.)
	+ Loop tiling and tiling models

* #### Program verification
	+ Computability and decidability
	+ Program termination
	+ Race detections

* #### Mapping algorithms
	+ Systolic array design
	+ Memory mapping with memory reuse (array contraction)
	+ Data mapping (HPF-like), data distribution for distributed memory
	+ Communication optimizations

* #### Counting and Ehrhart polynomials
	+ Analysis of cache misses
	+ Memory size computations
	+ Iteration counting (WCET)

* #### Parallelizing compiler developments

	+ Hardware synthesis
	+ Automatic vectorizers/parallelizers
	+ Compilation for GPUs
	+ Iterative compilation
	+ Binary optimizations and runtime optimizations

Since 2011, the research community in polyhedral code analysis and
optimizations meets annually at the International Workshop on Polyhedral
Compilation Techniques (IMPACT) where last results are presented and some panel
discussions are organized. IMPACT started as a workshop of the conference
CGO'11 and is now a regular satellite workshop of the international conference
HIPEAC. A polyhedral school has also been initiated in 2013 with a double
objective: to teach polyhedral techniques and tools to newcomers (typically
PhD students or researchers interested to bring such techniques to their
application field) and to help polyhedral specialists discuss and establish the
state-of-the-art of their field. A second edition of this school is planned.
