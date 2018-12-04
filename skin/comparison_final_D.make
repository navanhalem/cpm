all : chem0_be0 chem30_be0 chem70_be0 chem100_be0 chem300_be0 chem700_be0

chem0_be0 : epidermis0.js
	node $< 3000 10 400 0 0.07 0 30 1 0.000025 20 1000
	ffmpeg -y -framerate 24 -i output/%d0_0_30_0_1.png -c:v libx264 -r 30 -pix_fmt yuv420p output/vid_chem0_be0.mp4
	ffmpeg -y -framerate 24 -i output/%d0_0_30_0_1G.png -c:v libx264 -r 30 -pix_fmt yuv420p output/vid_chem0_be0G.mp4

chem30_be0 : epidermis0.js
	node $< 3000 10 400 30 0.07 0 30 1 0.000025 20 1000
	ffmpeg -y -framerate 24 -i output/%d0_30_30_0_1.png -c:v libx264 -r 30 -pix_fmt yuv420p output/vid_chem30_be0.mp4
	ffmpeg -y -framerate 24 -i output/%d0_30_30_0_1G.png -c:v libx264 -r 30 -pix_fmt yuv420p output/vid_chem30_be0G.mp4

chem70_be0 : epidermis0.js
	node $< 3000 10 400 70 0.07 0 30 1 0.000025 20 1000
	ffmpeg -y -framerate 24 -i output/%d0_70_30_0_1.png -c:v libx264 -r 30 -pix_fmt yuv420p output/vid_chem70_be0.mp4
	ffmpeg -y -framerate 24 -i output/%d0_70_30_0_1G.png -c:v libx264 -r 30 -pix_fmt yuv420p output/vid_chem70_be0G.mp4

chem100_be0 : epidermis0.js
	node $< 3000 10 400 100 0.07 0 30 1 0.000025 20 1000
	ffmpeg -y -framerate 24 -i output/%d0_100_30_0_1.png -c:v libx264 -r 30 -pix_fmt yuv420p output/vid_chem100_be0.mp4
	ffmpeg -y -framerate 24 -i output/%d0_100_30_0_1G.png -c:v libx264 -r 30 -pix_fmt yuv420p output/vid_chem100_be0G.mp4

chem300_be0 : epidermis0.js
	node $< 3000 10 400 300 0.07 0 30 1 0.000025 20 1000
	ffmpeg -y -framerate 24 -i output/%d0_300_30_0_1.png -c:v libx264 -r 30 -pix_fmt yuv420p output/vid_chem300_be0.mp4
	ffmpeg -y -framerate 24 -i output/%d0_300_30_0_1G.png -c:v libx264 -r 30 -pix_fmt yuv420p output/vid_chem300_be0G.mp4

chem700_be0 : epidermis0.js
	node $< 3000 10 400 700 0.07 0 30 1 0.000025 20 1000
	ffmpeg -y -framerate 24 -i output/%d0_700_30_0_1.png -c:v libx264 -r 30 -pix_fmt yuv420p output/vid_chem700_be0.mp4
	ffmpeg -y -framerate 24 -i output/%d0_700_30_0_1G.png -c:v libx264 -r 30 -pix_fmt yuv420p output/vid_chem700_be0G.mp4
