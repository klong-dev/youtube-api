import { Exclude, Expose } from '@nestjs/class-transformer';

export class VideoEntity {
    @Expose()
    title: string;

    @Expose()
    chanelTitle: string;

    @Expose()
    channelUrl: string;

    @Expose()
    channelImage: string;

    @Expose()
    viewCount: string;

    @Expose()
    videoUrl: string;

    @Expose()
    thumbnail: string;

    constructor(partial: Partial<VideoEntity>) {
        Object.assign(this, partial);
    }
}