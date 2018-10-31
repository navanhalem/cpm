all : output/vid.mp4

output/%.mp4 : output/0.png
	ffmpeg -y -framerate 24 -i output/%d0.png -c:v libx264 -r 30 -pix_fmt yuv420p $@

output/0.png : epidermis0.js
	node $< 4000 10 150 0

# runtime savetime fieldsize chemotaxisStrength infectionArea
# 100	  1	   200	     30			0.1

clean:
	rm -f output/*
