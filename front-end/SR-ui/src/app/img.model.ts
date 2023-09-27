

export class Img
{
    constructor(
        public id: string,
        public imagePath: string,
        public creationtime: Date,
        public thumbnail: string
    )
    {}

}

export class CroppedImgs
{
    constructor(
        public label: string,
        public images: string[],
        public urls: string[]
    )
     {}
}