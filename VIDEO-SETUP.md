# Video Background Setup

## Hero Section Video

The hero section uses a video background for a modern, engaging look.

### Video Requirements

- **Format**: MP4 (H.264 codec recommended)
- **Resolution**: 1920x1080 (Full HD) or higher
- **Duration**: 10-30 seconds (will loop)
- **File Size**: Optimize to < 5MB for fast loading
- **Aspect Ratio**: 16:9
- **Content**: Should be relevant to IT education, kids learning, coding, etc.

### Where to Place the Video

1. Add your video file to the `public` folder
2. Name it `hero-video.mp4`
3. Path should be: `public/hero-video.mp4`

### Video Recommendations

**Good video content ideas:**
- Kids coding on computers
- Animated code snippets
- Technology/digital abstract backgrounds
- Classroom scenes with computers
- Futuristic tech animations

**Where to get videos:**
- [Pexels Videos](https://www.pexels.com/videos/) - Free stock videos
- [Pixabay Videos](https://pixabay.com/videos/) - Free stock videos
- [Coverr](https://coverr.co/) - Free videos for websites
- [Videvo](https://www.videvo.net/) - Free stock footage

### Optimization

To optimize your video for web:

```bash
# Using FFmpeg (install from ffmpeg.org)
ffmpeg -i input.mp4 -vcodec h264 -acodec aac -vf scale=1920:1080 -b:v 2M -movflags +faststart hero-video.mp4
```

### Fallback

If the video doesn't load, the hero section will show a gradient background automatically.

### Testing

1. Place video in `public/hero-video.mp4`
2. Run `npm run dev`
3. Open http://localhost:3000
4. Video should autoplay, be muted, and loop

### Mobile Considerations

- Video will work on mobile devices
- Ensure file size is optimized for mobile data
- Video will be muted by default (required for autoplay)
- Consider using a poster image for slow connections

### Alternative: Using a Poster Image

If you want to use a static image instead of video temporarily:

```tsx
<video
  autoPlay
  muted
  loop
  playsInline
  poster="/hero-poster.jpg"  // Add this line
  className="w-full h-full object-cover"
>
  <source src="/hero-video.mp4" type="video/mp4" />
</video>
```

## Troubleshooting

### Video Not Playing
- Check file path is correct: `public/hero-video.mp4`
- Verify video format is MP4
- Check browser console for errors
- Try a different video file

### Video Too Large
- Compress using FFmpeg (see optimization above)
- Reduce resolution to 1280x720
- Reduce bitrate to 1M or lower
- Consider using a video hosting service (YouTube, Vimeo) with embed

### Performance Issues
- Optimize video file size
- Use lazy loading for below-fold videos
- Consider using poster image on mobile
- Test on slower connections

## Example Videos

Search for these terms on free stock video sites:
- "kids coding"
- "technology education"
- "digital learning"
- "abstract technology"
- "futuristic background"
- "coding animation"
