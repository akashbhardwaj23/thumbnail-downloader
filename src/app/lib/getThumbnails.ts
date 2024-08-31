

export async function getThumbnails(id : string){
    return {
        default : {
            url: 'http://img.youtube.com/vi/' + id + '/default.jpg',
            width: 120,
            height: 90
          },
          mq: {
            url: 'http://img.youtube.com/vi/' + id + '/mqdefault.jpg',
            width: 320,
            height: 180
          },
          hq: {
            url: 'http://img.youtube.com/vi/' + id + '/hqdefault.jpg',
            width: 480,
            height: 360
          
        },
        max : {
            url : 'http://img.youtube.com/vi/' + id + '/maxresdefault.jpg',
            width : 1280,
            height : 720
        }
    }
}