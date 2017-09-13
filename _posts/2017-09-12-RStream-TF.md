---
layout: default
title: Polyhedral optimization of neural networks 
author: Benoit Pradelle
www: https://www.reservoir.com/
---

We are pleased to announce the release of R-Stream·TF, an extension of
R-Stream to TensorFlow computation graphs.

R-Stream·TF transforms computations performed in a neural network graph
into C programs suited to the polyhedral representation and uses R-Stream, a
polyhedral compiler, to parallelize and optimize the computations performed in
the graph. R-Stream·TF can exploit the optimizations available with R-Stream to
generate a highly optimized version of the computation graph, specifically
mapped to the targeted architecture.

All the details are available in the paper: [https://www.reservoir.com/publication/polyhedral-optimization-tensorflow-computation-graphs/](https://www.reservoir.com/publication/polyhedral-optimization-tensorflow-computation-graphs/).
