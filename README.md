# YouTube API

A simple backend API for fetching video details from YouTube. This API provides detailed information about YouTube videos, including title, channel details, statistics, and thumbnail URLs.

## Features

- Fetch video information by video URL or ID.
- Retrieve video title, channel details, view count, comment count, and thumbnails in various resolutions.
- Easy to configure and extend.

## Data Response

The API returns data in the following structure:

```json
[
  {
    "title": "Video Title",
    "chanelTitle": "Channel Name",
    "channelUrl": "https://www.youtube.com/channel/CHANNEL_ID",
    "statistics": {
      "viewCount": "123456",
      "favoriteCount": "0",
      "commentCount": "789"
    },
    "videoUrl": "https://www.youtube.com/watch?v=VIDEO_ID",
    "thumbnail": {
      "default": {
        "url": "https://i.ytimg.com/vi/VIDEO_ID/default.jpg",
        "width": 120,
        "height": 90
      },
      "medium": {
        "url": "https://i.ytimg.com/vi/VIDEO_ID/mqdefault.jpg",
        "width": 320,
        "height": 180
      },
      "high": {
        "url": "https://i.ytimg.com/vi/VIDEO_ID/hqdefault.jpg",
        "width": 480,
        "height": 360
      }
    }
  }
]
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/klong-dev/youtube-api.git
   cd youtube-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the environment variables:
   Create a `.env` file in the root directory and add the following:

   ```env
   API_KEY=your_youtube_api_key
   ```

   Replace `your_youtube_api_key` with your valid YouTube Data API key.

4. Run the application:
   ```bash
   npm start
   ```

## Usage

- Use the provided endpoints to fetch video details. For example, you can make a GET request to the API with the video URL or ID.
- Detailed API documentation will be added soon.

## Example Request

```
GET /videos
```

## Example Response

Refer to the [Data Response](#data-response) section above for the response format.

## Environment Variables

| Variable  | Description                |
| --------- | -------------------------- |
| `API_KEY` | Your YouTube Data API key. |

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Create a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

For inquiries or support, feel free to contact the repository owner via [GitHub](https://github.com/klong-dev).
