# Skynet Graph Builder

This project create a SVG canvas, where 2 users can interect with eachother's input.
The project uses SiaTech infrastructure, in particular MySky

## Concept

Two users are tasked to create a graph togheter.\
One of them will create all the vertices, and the other will connect them.\
For now there is no real application associated with this, but we could think of many graph related problems that could be solved on the resulted graph.

## Usage

The `vertex creator(builder)`, needs to:

- name the graph (ex: `g1`)
- know the public key of his `connector` (ex: `c2ae8be102f0eb39dfe663a531aa4ed9d1fd0e5f4e7332c62727fbf83d73c56b`); in the app you can find your key at the top of the screen after loging in
- be the first to act,the following:

  1. init the new graph
  2. adding some of the vertices, he can add more later
  3. press `update graph` button on each change he does

The `vertex connector`, needs to:

- know the name of the graph (ex: `g1`)
- know the public key of his `builder`
- after the builder had inited the graph, he needs to init the graph also
- he can find out what vertex are created and connected, by pressing the `connect to Graph` button
