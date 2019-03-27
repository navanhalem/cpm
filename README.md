# cpm
Cellular Potts Model implementation

Implements a simple Cellular Potts Model in javascript. Code includes the extension for cell migration published in

Ioana Niculescu, Johannes Textor, Rob J. de Boer:
__Crawling and Gliding: A Computational Model for Shape-Driven Cell Migration__
PLoS Computational Biology 11(10): e1004280
http://dx.doi.org/10.1371/journal.pcbi.1004280

# How it works

Running the makefile with arguments time (time in MCS for every simulation) and no_sim (number of simulations per parameter combination) will give a plot in which the different behaviors each are plotted with a line. The x axis shows the chemotaxis strangth and the y axis shows the fraction of cleared infections in time/3600 hours.
