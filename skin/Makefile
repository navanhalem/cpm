all : output/vid0.000020 output/vid0.000025 output/vid0.000030 output/vid0.000035 output/vid0.000040 output/vid0.000045
#output/vid.mp4
#output/vidG.mp4

compare : compare1 compare2 compare3 compare4 compare5 compare6
compare1 :
	node epidermis0.js 12000 10 600 50 0.025 0 30 1 0.000025 20 1000
	ffmpeg -y -framerate 24 -i output/%d0_1.png -c:v libx264 -r 30 -pix_fmt yuv420p output/sensitive/sensitive50.mp4
compare2 :
	node epidermis0.js 12000 10 600 50 0.025 0 30 2 0.000025 20 1000
	ffmpeg -y -framerate 24 -i output/%d0_2.png -c:v libx264 -r 30 -pix_fmt yuv420p output/arresting/arresting50.mp4
compare3 :
	node epidermis0.js 12000 10 600 50 0.025 0 30 3 0.000025 20 1000
	ffmpeg -y -framerate 24 -i output/%d0_3.png -c:v libx264 -r 30 -pix_fmt yuv420p output/motile/motile50.mp4
compare4:
	node epidermis0.js 12000 10 600 700 0.025 0 30 1 0.000025 20 1000
	ffmpeg -y -framerate 24 -i output/%d0_1.png -c:v libx264 -r 30 -pix_fmt yuv420p output/sensitive/sensitive700.mp4
compare5 :
	node epidermis0.js 12000 10 600 700 0.025 0 30 2 0.000025 20 1000
	ffmpeg -y -framerate 24 -i output/%d0_2.png -c:v libx264 -r 30 -pix_fmt yuv420p output/arresting/arresting700.mp4
compare6 :
	node epidermis0.js 12000 10 600 700 0.025 0 30 3 0.000025 20 1000
	ffmpeg -y -framerate 24 -i output/%d0_3.png -c:v libx264 -r 30 -pix_fmt yuv420p output/motile/motile700.mp4

vids : output/vid.mp4 output/vidG.mp4

output/vid.mp4 : output/10.png
	ffmpeg -y -framerate 24 -i output/%d0_1.png -c:v libx264 -r 30 -pix_fmt yuv420p $@

output/vidG.mp4 : output/10.png
	ffmpeg -y -framerate 24 -i output/%d0_1G.png -c:v libx264 -r 30 -pix_fmt yuv420p $@

output/10.png : epidermis0.js
	node $< 3000 10 200 300 0.125 0 30 1 0.000025 20 1000

output/vid0.000020 : epidermis0.js
	node $< 12000 10 600 700 0.05 0 30 1 0.000020
	ffmpeg -y -framerate 24 -i output/%d0_0.000020.png -c:v libx264 -r 30 -pix_fmt yuv420p $@

output/vid0.000025 : epidermis0.js
	node $< 12000 10 600 700 0.05 0 30 1 0.000025
	ffmpeg -y -framerate 24 -i output/%d0_0.000025.png -c:v libx264 -r 30 -pix_fmt yuv420p $@

output/vid0.000030 : epidermis0.js
	node $< 12000 10 600 700 0.05 0 30 1 0.000030
	ffmpeg -y -framerate 24 -i output/%d0_0.000030.png -c:v libx264 -r 30 -pix_fmt yuv420p $@

output/vid0.000035 : epidermis0.js
	node $< 12000 10 600 700 0.05 0 30 1 0.000035
	ffmpeg -y -framerate 24 -i output/%d0_0.000035.png -c:v libx264 -r 30 -pix_fmt yuv420p $@

output/vid0.000040 : epidermis0.js
	node $< 12000 10 600 700 0.05 0 30 1 0.000040
	ffmpeg -y -framerate 24 -i output/%d0_0.000040.png -c:v libx264 -r 30 -pix_fmt yuv420p $@

output/vid0.000045 : epidermis0.js
	node $< 12000 10 600 700 0.05 0 30 1 0.000045
	ffmpeg -y -framerate 24 -i output/%d0.000045.png -c:v libx264 -r 30 -pix_fmt yuv420p $@


# Defaults
# runtime savetime fieldsize chemotaxisStrength infectionStart	entryBias	killingTime	repetitions
# 100	  1	   200	     0			0.1	      	0		15		1

vars=700 100 200 300 400 500 600 0

tracks : $(foreach i,$(vars),tracks/track$i.txt)

tracks/track%.txt : epidermis0.js
	node $< 1000 10 200 $* 0.1 0 > $@

cleantracks:
	rm -f tracks/*

clean:
	rm -f output/*
