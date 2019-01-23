settings=$settingsfolder/$expname-settings.js
template=$settingsfolder/$expname-template.js #txt

paramfile=params_border.txt
nsim=10

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
	BEHAVIOR=$( cat $paramfile | awk -v line=$p 'NR==line{print $3}')
	BORDER=$( cat $paramfile | awk -v line=$p 'NR==line{print $4}')
		
	NAME=lambdachem$LAMBDACHEM-killingtime$KILLINGTIME-behavior$BEHAVIOR-border$BORDER

	# Now the recipes for the individual simulation tracks
	for sim in $(seq 1 $nsim) ; do

		# Ensure the loop can be easily stopped
		trap "exit 1" SIGINT SIGTERM

		# trackfiles
		FILE=../data/test/$KILLINGTIME/$NAME-sim$sim.txt
		echo "$FILE : ../epidermis0.js"
		echo -e "\t@"node \$\< 5000 0 400 $LAMBDACHEM 0.04 0 $KILLINGTIME $BEHAVIOR 0.000015 20 1000 $BORDER "> \$@"
		echo "all : "$FILE
	done
done
