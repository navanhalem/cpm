.DELETE_ON_ERROR :
all : 
../data/test/30/arresting-lambdachem300-killingtime30-biasedentry0-border1-sim1.txt : ../epidermis0.js
	@node $< 2880 0 600 300 0.025 0 30 2 0.00002 20 1000 1 > $@
all : ../data/test/30/arresting-lambdachem300-killingtime30-biasedentry0-border1-sim1.txt
