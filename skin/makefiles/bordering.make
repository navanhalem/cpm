all : border1 border2 border3

border1 : epidermis0.js
	node $< 3000 10 200 100 0.1 0 30 2 0.000025 20 1000 1
	ffmpeg -y -framerate 24 -i output/%d0_1.png -c:v libx264 -r 30 -pix_fmt yuv420p output/vid_b1.mp4

border2 : epidermis0.js
	node $< 3000 10 200 100 0.1 0 30 2 0.000025 20 1000 2
	ffmpeg -y -framerate 24 -i output/%d0_2.png -c:v libx264 -r 30 -pix_fmt yuv420p output/vid_b2.mp4

border3 : epidermis0.js
	node $< 3000 10 200 100 0.1 0 30 2 0.000025 20 1000 3
	ffmpeg -y -framerate 24 -i output/%d0_3.png -c:v libx264 -r 30 -pix_fmt yuv420p output/vid_b3.mp4

