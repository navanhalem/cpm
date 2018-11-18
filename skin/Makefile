all : output/vid.mp4 
#output/vidG.mp4

compare : 
	node epidermis0.js 8000 10 600 700 0.025 0 15 1
	ffmpeg -y -framerate 24 -i output/%d0.png -c:v libx264 -r 30 -pix_fmt yuv420p output/sensitive/sensitive.mp4
	node epidermis0.js 8000 10 600 700 0.025 0 15 2
	ffmpeg -y -framerate 24 -i output/%d0.png -c:v libx264 -r 30 -pix_fmt yuv420p output/arresting/arresting.mp4
	node epidermis0.js 8000 10 600 700 0.025 0 15 3
	ffmpeg -y -framerate 24 -i output/%d0.png -c:v libx264 -r 30 -pix_fmt yuv420p output/motile/motile.mp4

output/vidG.mp4 : output/10G.png
	ffmpeg -y -framerate 24 -i output/%d0G.png -c:v libx264 -r 30 -pix_fmt yuv420p $@

output/%/vid.mp4 : output/10.png
	ffmpeg -y -framerate 24 -i output/%d0.png -c:v libx264 -r 30 -pix_fmt yuv420p $@

output/10.png : epidermis0.js
	node $< 50 10 200 700 0.1 0 15 1

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
