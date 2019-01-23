.DELETE_ON_ERROR :
all : 
../../output/vid_700_30_1_1.mp4 : ../../output/10_700_30_1_1.png
	@ffmpeg -y -framerate 24 -i output/%d0_700_30_1_1.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_700_30_1_1.png : ../../epidermis0.js
	@node $< 200 0 200 700 0.025 0 30 1 0.00002 20 1000 2 1 > $@
all : ../../output/vid_700_30_1_1.mp4
../../output/vid_700_30_1_2.mp4 : ../../output/10_700_30_1_2.png
	@ffmpeg -y -framerate 24 -i output/%d0_700_30_1_2.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_700_30_1_2.png : ../../epidermis0.js
	@node $< 200 0 200 700 0.025 0 30 1 0.00002 20 1000 2 2 > $@
all : ../../output/vid_700_30_1_2.mp4
../../output/vid_700_30_1_3.mp4 : ../../output/10_700_30_1_3.png
	@ffmpeg -y -framerate 24 -i output/%d0_700_30_1_3.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_700_30_1_3.png : ../../epidermis0.js
	@node $< 200 0 200 700 0.025 0 30 1 0.00002 20 1000 2 3 > $@
all : ../../output/vid_700_30_1_3.mp4
../../output/vid_700_30_1_4.mp4 : ../../output/10_700_30_1_4.png
	@ffmpeg -y -framerate 24 -i output/%d0_700_30_1_4.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_700_30_1_4.png : ../../epidermis0.js
	@node $< 200 0 200 700 0.025 0 30 1 0.00002 20 1000 2 4 > $@
all : ../../output/vid_700_30_1_4.mp4
../../output/vid_700_30_1_5.mp4 : ../../output/10_700_30_1_5.png
	@ffmpeg -y -framerate 24 -i output/%d0_700_30_1_5.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_700_30_1_5.png : ../../epidermis0.js
	@node $< 200 0 200 700 0.025 0 30 1 0.00002 20 1000 2 5 > $@
all : ../../output/vid_700_30_1_5.mp4
../../output/vid_700_30_1_6.mp4 : ../../output/10_700_30_1_6.png
	@ffmpeg -y -framerate 24 -i output/%d0_700_30_1_6.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_700_30_1_6.png : ../../epidermis0.js
	@node $< 200 0 200 700 0.025 0 30 1 0.00002 20 1000 2 6 > $@
all : ../../output/vid_700_30_1_6.mp4
../../output/vid_700_30_1_7.mp4 : ../../output/10_700_30_1_7.png
	@ffmpeg -y -framerate 24 -i output/%d0_700_30_1_7.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_700_30_1_7.png : ../../epidermis0.js
	@node $< 200 0 200 700 0.025 0 30 1 0.00002 20 1000 2 7 > $@
all : ../../output/vid_700_30_1_7.mp4
../../output/vid_700_30_1_8.mp4 : ../../output/10_700_30_1_8.png
	@ffmpeg -y -framerate 24 -i output/%d0_700_30_1_8.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_700_30_1_8.png : ../../epidermis0.js
	@node $< 200 0 200 700 0.025 0 30 1 0.00002 20 1000 2 8 > $@
all : ../../output/vid_700_30_1_8.mp4
../../output/vid_700_30_1_9.mp4 : ../../output/10_700_30_1_9.png
	@ffmpeg -y -framerate 24 -i output/%d0_700_30_1_9.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_700_30_1_9.png : ../../epidermis0.js
	@node $< 200 0 200 700 0.025 0 30 1 0.00002 20 1000 2 9 > $@
all : ../../output/vid_700_30_1_9.mp4
../../output/vid_700_30_1_10.mp4 : ../../output/10_700_30_1_10.png
	@ffmpeg -y -framerate 24 -i output/%d0_700_30_1_10.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_700_30_1_10.png : ../../epidermis0.js
	@node $< 200 0 200 700 0.025 0 30 1 0.00002 20 1000 2 10 > $@
all : ../../output/vid_700_30_1_10.mp4
../../output/vid_700_60_2_1.mp4 : ../../output/10_700_60_2_1.png
	@ffmpeg -y -framerate 24 -i output/%d0_700_60_2_1.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_700_60_2_1.png : ../../epidermis0.js
	@node $< 200 0 200 700 0.025 0 60 2 0.00002 20 1000 2 1 > $@
all : ../../output/vid_700_60_2_1.mp4
../../output/vid_700_60_2_2.mp4 : ../../output/10_700_60_2_2.png
	@ffmpeg -y -framerate 24 -i output/%d0_700_60_2_2.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_700_60_2_2.png : ../../epidermis0.js
	@node $< 200 0 200 700 0.025 0 60 2 0.00002 20 1000 2 2 > $@
all : ../../output/vid_700_60_2_2.mp4
../../output/vid_700_60_2_3.mp4 : ../../output/10_700_60_2_3.png
	@ffmpeg -y -framerate 24 -i output/%d0_700_60_2_3.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_700_60_2_3.png : ../../epidermis0.js
	@node $< 200 0 200 700 0.025 0 60 2 0.00002 20 1000 2 3 > $@
all : ../../output/vid_700_60_2_3.mp4
../../output/vid_700_60_2_4.mp4 : ../../output/10_700_60_2_4.png
	@ffmpeg -y -framerate 24 -i output/%d0_700_60_2_4.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_700_60_2_4.png : ../../epidermis0.js
	@node $< 200 0 200 700 0.025 0 60 2 0.00002 20 1000 2 4 > $@
all : ../../output/vid_700_60_2_4.mp4
../../output/vid_700_60_2_5.mp4 : ../../output/10_700_60_2_5.png
	@ffmpeg -y -framerate 24 -i output/%d0_700_60_2_5.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_700_60_2_5.png : ../../epidermis0.js
	@node $< 200 0 200 700 0.025 0 60 2 0.00002 20 1000 2 5 > $@
all : ../../output/vid_700_60_2_5.mp4
../../output/vid_700_60_2_6.mp4 : ../../output/10_700_60_2_6.png
	@ffmpeg -y -framerate 24 -i output/%d0_700_60_2_6.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_700_60_2_6.png : ../../epidermis0.js
	@node $< 200 0 200 700 0.025 0 60 2 0.00002 20 1000 2 6 > $@
all : ../../output/vid_700_60_2_6.mp4
../../output/vid_700_60_2_7.mp4 : ../../output/10_700_60_2_7.png
	@ffmpeg -y -framerate 24 -i output/%d0_700_60_2_7.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_700_60_2_7.png : ../../epidermis0.js
	@node $< 200 0 200 700 0.025 0 60 2 0.00002 20 1000 2 7 > $@
all : ../../output/vid_700_60_2_7.mp4
../../output/vid_700_60_2_8.mp4 : ../../output/10_700_60_2_8.png
	@ffmpeg -y -framerate 24 -i output/%d0_700_60_2_8.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_700_60_2_8.png : ../../epidermis0.js
	@node $< 200 0 200 700 0.025 0 60 2 0.00002 20 1000 2 8 > $@
all : ../../output/vid_700_60_2_8.mp4
../../output/vid_700_60_2_9.mp4 : ../../output/10_700_60_2_9.png
	@ffmpeg -y -framerate 24 -i output/%d0_700_60_2_9.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_700_60_2_9.png : ../../epidermis0.js
	@node $< 200 0 200 700 0.025 0 60 2 0.00002 20 1000 2 9 > $@
all : ../../output/vid_700_60_2_9.mp4
../../output/vid_700_60_2_10.mp4 : ../../output/10_700_60_2_10.png
	@ffmpeg -y -framerate 24 -i output/%d0_700_60_2_10.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_700_60_2_10.png : ../../epidermis0.js
	@node $< 200 0 200 700 0.025 0 60 2 0.00002 20 1000 2 10 > $@
all : ../../output/vid_700_60_2_10.mp4
../../output/vid_700_60_3_1.mp4 : ../../output/10_700_60_3_1.png
	@ffmpeg -y -framerate 24 -i output/%d0_700_60_3_1.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_700_60_3_1.png : ../../epidermis0.js
	@node $< 200 0 200 700 0.025 0 60 3 0.00002 20 1000 2 1 > $@
all : ../../output/vid_700_60_3_1.mp4
../../output/vid_700_60_3_2.mp4 : ../../output/10_700_60_3_2.png
	@ffmpeg -y -framerate 24 -i output/%d0_700_60_3_2.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_700_60_3_2.png : ../../epidermis0.js
	@node $< 200 0 200 700 0.025 0 60 3 0.00002 20 1000 2 2 > $@
all : ../../output/vid_700_60_3_2.mp4
../../output/vid_700_60_3_3.mp4 : ../../output/10_700_60_3_3.png
	@ffmpeg -y -framerate 24 -i output/%d0_700_60_3_3.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_700_60_3_3.png : ../../epidermis0.js
	@node $< 200 0 200 700 0.025 0 60 3 0.00002 20 1000 2 3 > $@
all : ../../output/vid_700_60_3_3.mp4
../../output/vid_700_60_3_4.mp4 : ../../output/10_700_60_3_4.png
	@ffmpeg -y -framerate 24 -i output/%d0_700_60_3_4.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_700_60_3_4.png : ../../epidermis0.js
	@node $< 200 0 200 700 0.025 0 60 3 0.00002 20 1000 2 4 > $@
all : ../../output/vid_700_60_3_4.mp4
../../output/vid_700_60_3_5.mp4 : ../../output/10_700_60_3_5.png
	@ffmpeg -y -framerate 24 -i output/%d0_700_60_3_5.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_700_60_3_5.png : ../../epidermis0.js
	@node $< 200 0 200 700 0.025 0 60 3 0.00002 20 1000 2 5 > $@
all : ../../output/vid_700_60_3_5.mp4
../../output/vid_700_60_3_6.mp4 : ../../output/10_700_60_3_6.png
	@ffmpeg -y -framerate 24 -i output/%d0_700_60_3_6.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_700_60_3_6.png : ../../epidermis0.js
	@node $< 200 0 200 700 0.025 0 60 3 0.00002 20 1000 2 6 > $@
all : ../../output/vid_700_60_3_6.mp4
../../output/vid_700_60_3_7.mp4 : ../../output/10_700_60_3_7.png
	@ffmpeg -y -framerate 24 -i output/%d0_700_60_3_7.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_700_60_3_7.png : ../../epidermis0.js
	@node $< 200 0 200 700 0.025 0 60 3 0.00002 20 1000 2 7 > $@
all : ../../output/vid_700_60_3_7.mp4
../../output/vid_700_60_3_8.mp4 : ../../output/10_700_60_3_8.png
	@ffmpeg -y -framerate 24 -i output/%d0_700_60_3_8.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_700_60_3_8.png : ../../epidermis0.js
	@node $< 200 0 200 700 0.025 0 60 3 0.00002 20 1000 2 8 > $@
all : ../../output/vid_700_60_3_8.mp4
../../output/vid_700_60_3_9.mp4 : ../../output/10_700_60_3_9.png
	@ffmpeg -y -framerate 24 -i output/%d0_700_60_3_9.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_700_60_3_9.png : ../../epidermis0.js
	@node $< 200 0 200 700 0.025 0 60 3 0.00002 20 1000 2 9 > $@
all : ../../output/vid_700_60_3_9.mp4
../../output/vid_700_60_3_10.mp4 : ../../output/10_700_60_3_10.png
	@ffmpeg -y -framerate 24 -i output/%d0_700_60_3_10.png -c:v libx264 -r 30 -pix_fmt yuv420p $@
../../output/10_700_60_3_10.png : ../../epidermis0.js
	@node $< 200 0 200 700 0.025 0 60 3 0.00002 20 1000 2 10 > $@
all : ../../output/vid_700_60_3_10.mp4
