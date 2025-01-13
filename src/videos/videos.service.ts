import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VideoEntity } from '../entities/videos.entity';
import axios from 'axios';

@Injectable()
export class VideosService {
    constructor(private readonly config: ConfigService) { }
    getVideos(): Promise<VideoEntity[]> {
        const apiKey = this.config.get('API_KEY');
        if (!apiKey) {
            throw new Error('API_KEY is not defined');
        }
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=VN&maxResults=20&key=${apiKey}`;
        return axios.get(url).then((response) => {
            const videos = response.data.items.map((item: any) => {
                return {
                    title: item.snippet.title,
                    chanelTitle: item.snippet.channelTitle,
                    channelUrl: `https://www.youtube.com/channel/${item.snippet.channelId}`,
                    statistics: item.statistics,
                    videoUrl: `https://www.youtube.com/watch?v=${item.id}`,
                    thumbnail: item.snippet.thumbnails,
                };
            });
            return videos;
        });
    }
}
