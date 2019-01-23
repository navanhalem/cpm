settings=$settingsfolder/$expname-settings.js
template=$settingsfolder/$expname-template.js #txt

expname=arresting
paramfile=params.txt
nsim=30

# ---------------------------------------------------------------------
# CODE:
# ---------------------------------------------------------------------

np=$( cat $paramfile | wc -l )

echo ".DELETE_ON_ERROR :"
echo "all : "
# Loop over the simulations and parameter combis

for p in $(seq 1 $np) ; do

	LAMBDACHEM=$( cat $paramfile | awk -v line=$p 'NR==line{print $1}')
	KILLINGTIME=$( cat $paramfile | awk -v line=$p 'NR==line{print $2}')
	BIASEDENTRY=$( cat $paramfile | awk -v line=$p 'NR==line{print $3}')
		
	NAME=$expname-lambdachem$LAMBDACHEM-killingtime$KILLINGTIME-biasedentry$BIASEDENTRY

	# Now the recipes for the individual simulation tracks
	for sim in $(seq 1 $nsim) ; do

		# Ensure the loop can be easily stopped
		trap "exit 1" SIGINT SIGTERM

		# trackfiles
		FILE=../data/$expname/$NAME-sim$sim.txt
		echo "$FILE : ../epidermis0.js"
		echo -e "\t@"node \$\< 12000 10 600 $LAMBDACHEM 0.025 $BIASEDENTRY $KILLINGTIME 2 "> \$@"
		echo "all : "$FILE
	done
done
