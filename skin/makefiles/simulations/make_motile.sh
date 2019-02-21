settings=$settingsfolder/$expname-settings.js
template=$settingsfolder/$expname-template.js #txt

paramfile=params_motile.txt
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
	EXPNAME=$( cat $paramfile | awk -v line=$p 'NR==line{print $4}')
		
	NAME=$EXPNAME-lambdachem$LAMBDACHEM-killingtime$KILLINGTIME-biasedentry$BIASEDENTRY

	# Now the recipes for the individual simulation tracks
	for sim in $(seq 1 $nsim) ; do

		# Ensure the loop can be easily stopped
		trap "exit 1" SIGINT SIGTERM

		# trackfiles
		FILE=../../data/$EXPNAME/$KILLINGTIME/$NAME-sim$sim.txt
		echo "$FILE : ../../epidermis0.js"
		echo -e "\t@"node \$\< 14400 0 600 $LAMBDACHEM 0.025 $BIASEDENTRY $KILLINGTIME 3 0.00002 20 1000 2 "> \$@"
		echo "all : "$FILE
	done
done