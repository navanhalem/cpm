settings=$settingsfolder/$expname-settings.js
template=$settingsfolder/$expname-template.js #txt

paramfile=params_movie.txt
nsim=10

# ---------------------------------------------------------------------
# CODE:
# ---------------------------------------------------------------------

np=$( cat $paramfile | wc -l )

echo ".DELETE_ON_ERROR :"
echo "all : "
# Loop over the simulations and parameter combis

for p in $(seq 1 $np) ; do

	SIMTYPE=$( cat $paramfile | awk -v line=$p 'NR==line{print $1}')
	KILLINGTIME=$( cat $paramfile | awk -v line=$p 'NR==line{print $2}')

	NAME=$EXPNAME-lambdachem$LAMBDACHEM-killingtime$KILLINGTIME-biasedentry$BIASEDENTRY

	# Now the recipes for the individual simulation tracks
	for sim in $(seq 1 $nsim) ; do

		# Ensure the loop can be easily stopped
		trap "exit 1" SIGINT SIGTERM

		# trackfiles
		IMGPATH=$sim"0"_$KILLINGTIME"_"$SIMTYPE"_"$sim
		echo ../../output/vid_$IMGPATH.mp4 : ../../output/10_$IMGPATH.png
		echo -e "\t@"ffmpeg -y -framerate 24 -i output/%d0_$IMGPATH.png -c:v libx264 -r 30 -pix_fmt yuv420p  "\$@"
		echo ../../output/10_"$IMGPATH.png : ../../epidermis0.js"
		echo -e "\t@"node \$\< 8000 0 600 $sim"0" 0.025 0 $KILLINGTIME $SIMTYPE 0.00002 20 1000 2 $sim "> \$@"
		echo "all : "../../output/vid_$IMGPATH.mp4
	done
done


# 	Cim.writePNG("output/" + sim.time + "_" + chemotaxis + "_" + killingTime + "_" + simulationType + "_" + ".png")
#
#
#
#
#
# output/vid.mp4 : output/10.png
# 	ffmpeg -y -framerate 24 -i output/%d0_1.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
#
# output/10.png : epidermis0.js
# 	node $< 3000 10 200 300 0.125 0 30 1 0.000025 20 1000
