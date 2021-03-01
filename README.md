ffmpeg -an -i src/previews/name.mov -vcodec libx264 -an -pix_fmt yuv420p -profile:v baseline -level 3 -vf scale=500:500 -filter:v "crop=500:500" src/previews/name.mp4
ffmpeg -i src/previews/name.mp4 -t 1 -f image2 -frames:v 1 src/previews/name.jpg
