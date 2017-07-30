```
ffmpeg -an -i static/media/sos.mov -vcodec libx264 -an -pix_fmt yuv420p -profile:v baseline -level 3 static/media/sos.mp4
ffmpeg -i static/media/sos.mp4  -t 1 -f image2  static/media/sos.jpg

yarn run server
```
