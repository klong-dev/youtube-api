import { Controller, Get } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideoEntity } from './entities/videos.entity';

@Controller('videos')
export class VideosController {
    constructor(private readonly videosService: VideosService) { }

    @Get()
    getVideos(): Promise<VideoEntity[]> {
        return this.videosService.getVideos();
    }
}
