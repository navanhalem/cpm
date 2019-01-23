.DELETE_ON_ERROR :
all : 
../../output/vid_10_30_1_1.mp4 : ../../output/10_10_30_1_1.png
	@ffmpeg -y -framerate 24 -i output/%d0_10_30_1_1.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_10_30_1_1.png : ../../epidermis0.js
	@node $< 14400 0 600 10 0.025 0 30 1 0.00002 20 1000 2 1 > $@
all : ../../output/vid_10_30_1_1.mp4
../../output/vid_20_30_1_2.mp4 : ../../output/10_20_30_1_2.png
	@ffmpeg -y -framerate 24 -i output/%d0_20_30_1_2.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_20_30_1_2.png : ../../epidermis0.js
	@node $< 14400 0 600 20 0.025 0 30 1 0.00002 20 1000 2 2 > $@
all : ../../output/vid_20_30_1_2.mp4
../../output/vid_30_30_1_3.mp4 : ../../output/10_30_30_1_3.png
	@ffmpeg -y -framerate 24 -i output/%d0_30_30_1_3.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_30_30_1_3.png : ../../epidermis0.js
	@node $< 14400 0 600 30 0.025 0 30 1 0.00002 20 1000 2 3 > $@
all : ../../output/vid_30_30_1_3.mp4
../../output/vid_40_30_1_4.mp4 : ../../output/10_40_30_1_4.png
	@ffmpeg -y -framerate 24 -i output/%d0_40_30_1_4.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_40_30_1_4.png : ../../epidermis0.js
	@node $< 14400 0 600 40 0.025 0 30 1 0.00002 20 1000 2 4 > $@
all : ../../output/vid_40_30_1_4.mp4
../../output/vid_50_30_1_5.mp4 : ../../output/10_50_30_1_5.png
	@ffmpeg -y -framerate 24 -i output/%d0_50_30_1_5.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_50_30_1_5.png : ../../epidermis0.js
	@node $< 14400 0 600 50 0.025 0 30 1 0.00002 20 1000 2 5 > $@
all : ../../output/vid_50_30_1_5.mp4
../../output/vid_60_30_1_6.mp4 : ../../output/10_60_30_1_6.png
	@ffmpeg -y -framerate 24 -i output/%d0_60_30_1_6.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_60_30_1_6.png : ../../epidermis0.js
	@node $< 14400 0 600 60 0.025 0 30 1 0.00002 20 1000 2 6 > $@
all : ../../output/vid_60_30_1_6.mp4
../../output/vid_70_30_1_7.mp4 : ../../output/10_70_30_1_7.png
	@ffmpeg -y -framerate 24 -i output/%d0_70_30_1_7.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_70_30_1_7.png : ../../epidermis0.js
	@node $< 14400 0 600 70 0.025 0 30 1 0.00002 20 1000 2 7 > $@
all : ../../output/vid_70_30_1_7.mp4
../../output/vid_80_30_1_8.mp4 : ../../output/10_80_30_1_8.png
	@ffmpeg -y -framerate 24 -i output/%d0_80_30_1_8.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_80_30_1_8.png : ../../epidermis0.js
	@node $< 14400 0 600 80 0.025 0 30 1 0.00002 20 1000 2 8 > $@
all : ../../output/vid_80_30_1_8.mp4
../../output/vid_90_30_1_9.mp4 : ../../output/10_90_30_1_9.png
	@ffmpeg -y -framerate 24 -i output/%d0_90_30_1_9.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_90_30_1_9.png : ../../epidermis0.js
	@node $< 14400 0 600 90 0.025 0 30 1 0.00002 20 1000 2 9 > $@
all : ../../output/vid_90_30_1_9.mp4
../../output/vid_100_30_1_10.mp4 : ../../output/10_100_30_1_10.png
	@ffmpeg -y -framerate 24 -i output/%d0_100_30_1_10.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_100_30_1_10.png : ../../epidermis0.js
	@node $< 14400 0 600 100 0.025 0 30 1 0.00002 20 1000 2 10 > $@
all : ../../output/vid_100_30_1_10.mp4
../../output/vid_10_30_2_1.mp4 : ../../output/10_10_30_2_1.png
	@ffmpeg -y -framerate 24 -i output/%d0_10_30_2_1.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_10_30_2_1.png : ../../epidermis0.js
	@node $< 14400 0 600 10 0.025 0 30 2 0.00002 20 1000 2 1 > $@
all : ../../output/vid_10_30_2_1.mp4
../../output/vid_20_30_2_2.mp4 : ../../output/10_20_30_2_2.png
	@ffmpeg -y -framerate 24 -i output/%d0_20_30_2_2.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_20_30_2_2.png : ../../epidermis0.js
	@node $< 14400 0 600 20 0.025 0 30 2 0.00002 20 1000 2 2 > $@
all : ../../output/vid_20_30_2_2.mp4
../../output/vid_30_30_2_3.mp4 : ../../output/10_30_30_2_3.png
	@ffmpeg -y -framerate 24 -i output/%d0_30_30_2_3.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_30_30_2_3.png : ../../epidermis0.js
	@node $< 14400 0 600 30 0.025 0 30 2 0.00002 20 1000 2 3 > $@
all : ../../output/vid_30_30_2_3.mp4
../../output/vid_40_30_2_4.mp4 : ../../output/10_40_30_2_4.png
	@ffmpeg -y -framerate 24 -i output/%d0_40_30_2_4.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_40_30_2_4.png : ../../epidermis0.js
	@node $< 14400 0 600 40 0.025 0 30 2 0.00002 20 1000 2 4 > $@
all : ../../output/vid_40_30_2_4.mp4
../../output/vid_50_30_2_5.mp4 : ../../output/10_50_30_2_5.png
	@ffmpeg -y -framerate 24 -i output/%d0_50_30_2_5.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_50_30_2_5.png : ../../epidermis0.js
	@node $< 14400 0 600 50 0.025 0 30 2 0.00002 20 1000 2 5 > $@
all : ../../output/vid_50_30_2_5.mp4
../../output/vid_60_30_2_6.mp4 : ../../output/10_60_30_2_6.png
	@ffmpeg -y -framerate 24 -i output/%d0_60_30_2_6.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_60_30_2_6.png : ../../epidermis0.js
	@node $< 14400 0 600 60 0.025 0 30 2 0.00002 20 1000 2 6 > $@
all : ../../output/vid_60_30_2_6.mp4
../../output/vid_70_30_2_7.mp4 : ../../output/10_70_30_2_7.png
	@ffmpeg -y -framerate 24 -i output/%d0_70_30_2_7.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_70_30_2_7.png : ../../epidermis0.js
	@node $< 14400 0 600 70 0.025 0 30 2 0.00002 20 1000 2 7 > $@
all : ../../output/vid_70_30_2_7.mp4
../../output/vid_80_30_2_8.mp4 : ../../output/10_80_30_2_8.png
	@ffmpeg -y -framerate 24 -i output/%d0_80_30_2_8.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_80_30_2_8.png : ../../epidermis0.js
	@node $< 14400 0 600 80 0.025 0 30 2 0.00002 20 1000 2 8 > $@
all : ../../output/vid_80_30_2_8.mp4
../../output/vid_90_30_2_9.mp4 : ../../output/10_90_30_2_9.png
	@ffmpeg -y -framerate 24 -i output/%d0_90_30_2_9.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_90_30_2_9.png : ../../epidermis0.js
	@node $< 14400 0 600 90 0.025 0 30 2 0.00002 20 1000 2 9 > $@
all : ../../output/vid_90_30_2_9.mp4
../../output/vid_100_30_2_10.mp4 : ../../output/10_100_30_2_10.png
	@ffmpeg -y -framerate 24 -i output/%d0_100_30_2_10.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_100_30_2_10.png : ../../epidermis0.js
	@node $< 14400 0 600 100 0.025 0 30 2 0.00002 20 1000 2 10 > $@
all : ../../output/vid_100_30_2_10.mp4
../../output/vid_10_30_3_1.mp4 : ../../output/10_10_30_3_1.png
	@ffmpeg -y -framerate 24 -i output/%d0_10_30_3_1.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_10_30_3_1.png : ../../epidermis0.js
	@node $< 14400 0 600 10 0.025 0 30 3 0.00002 20 1000 2 1 > $@
all : ../../output/vid_10_30_3_1.mp4
../../output/vid_20_30_3_2.mp4 : ../../output/10_20_30_3_2.png
	@ffmpeg -y -framerate 24 -i output/%d0_20_30_3_2.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_20_30_3_2.png : ../../epidermis0.js
	@node $< 14400 0 600 20 0.025 0 30 3 0.00002 20 1000 2 2 > $@
all : ../../output/vid_20_30_3_2.mp4
../../output/vid_30_30_3_3.mp4 : ../../output/10_30_30_3_3.png
	@ffmpeg -y -framerate 24 -i output/%d0_30_30_3_3.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_30_30_3_3.png : ../../epidermis0.js
	@node $< 14400 0 600 30 0.025 0 30 3 0.00002 20 1000 2 3 > $@
all : ../../output/vid_30_30_3_3.mp4
../../output/vid_40_30_3_4.mp4 : ../../output/10_40_30_3_4.png
	@ffmpeg -y -framerate 24 -i output/%d0_40_30_3_4.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_40_30_3_4.png : ../../epidermis0.js
	@node $< 14400 0 600 40 0.025 0 30 3 0.00002 20 1000 2 4 > $@
all : ../../output/vid_40_30_3_4.mp4
../../output/vid_50_30_3_5.mp4 : ../../output/10_50_30_3_5.png
	@ffmpeg -y -framerate 24 -i output/%d0_50_30_3_5.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_50_30_3_5.png : ../../epidermis0.js
	@node $< 14400 0 600 50 0.025 0 30 3 0.00002 20 1000 2 5 > $@
all : ../../output/vid_50_30_3_5.mp4
../../output/vid_60_30_3_6.mp4 : ../../output/10_60_30_3_6.png
	@ffmpeg -y -framerate 24 -i output/%d0_60_30_3_6.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_60_30_3_6.png : ../../epidermis0.js
	@node $< 14400 0 600 60 0.025 0 30 3 0.00002 20 1000 2 6 > $@
all : ../../output/vid_60_30_3_6.mp4
../../output/vid_70_30_3_7.mp4 : ../../output/10_70_30_3_7.png
	@ffmpeg -y -framerate 24 -i output/%d0_70_30_3_7.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_70_30_3_7.png : ../../epidermis0.js
	@node $< 14400 0 600 70 0.025 0 30 3 0.00002 20 1000 2 7 > $@
all : ../../output/vid_70_30_3_7.mp4
../../output/vid_80_30_3_8.mp4 : ../../output/10_80_30_3_8.png
	@ffmpeg -y -framerate 24 -i output/%d0_80_30_3_8.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_80_30_3_8.png : ../../epidermis0.js
	@node $< 14400 0 600 80 0.025 0 30 3 0.00002 20 1000 2 8 > $@
all : ../../output/vid_80_30_3_8.mp4
../../output/vid_90_30_3_9.mp4 : ../../output/10_90_30_3_9.png
	@ffmpeg -y -framerate 24 -i output/%d0_90_30_3_9.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_90_30_3_9.png : ../../epidermis0.js
	@node $< 14400 0 600 90 0.025 0 30 3 0.00002 20 1000 2 9 > $@
all : ../../output/vid_90_30_3_9.mp4
../../output/vid_100_30_3_10.mp4 : ../../output/10_100_30_3_10.png
	@ffmpeg -y -framerate 24 -i output/%d0_100_30_3_10.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_100_30_3_10.png : ../../epidermis0.js
	@node $< 14400 0 600 100 0.025 0 30 3 0.00002 20 1000 2 10 > $@
all : ../../output/vid_100_30_3_10.mp4
