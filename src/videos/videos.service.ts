import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VideoEntity } from './entities/videos.entity';
import axios from 'axios';

@Injectable()
export class VideosService {
    constructor(private readonly config: ConfigService) { }
    getVideos(): Promise<VideoEntity[]> {
        const apiKey = this.config.get('API_KEY');
        if (!apiKey) {
            throw new Error('API_KEY is not defined');
        }

        return axios.get('https://www.googleapis.com/youtube/v3/videos', {
            params: {
                part: 'snippet,statistics',
                chart: 'mostPopular',
                regionCode: 'VN',
                maxResults: 20,
                key: apiKey
            }
        }).then((videoResponse) => {
            const channelIds = videoResponse.data.items.map(
                (item: any) => item.snippet.channelId
            );

            return axios.get('https://www.googleapis.com/youtube/v3/channels', {
                params: {
                    part: 'snippet',
                    id: channelIds.join(','),
                    key: apiKey
                }
            }).then((channelResponse) => {
                const channelImages = new Map(
                    channelResponse.data.items.map((channel: any) => [
                        channel.id,
                        channel.snippet.thumbnails.default.url,
                    ])
                );

                return videoResponse.data.items.map((item: any) => ({
                    title: item.snippet.title,
                    channelTitle: item.snippet.channelTitle,
                    channelUrl: `https://www.youtube.com/channel/${item.snippet.channelId}`,
                    channelImage: channelImages.get(item.snippet.channelId),
                    statistics: item.statistics,
                    videoUrl: `https://www.youtube.com/watch?v=${item.id}`,
                    thumbnail: item.snippet.thumbnails,
                }));
            });
        }).catch((error) => {
            if (axios.isAxiosError(error)) {
                throw new HttpException(
                    error.response?.data?.error?.message || 'YouTube API Error',
                    error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
                );
            }
            throw error;
        });
    }
}
