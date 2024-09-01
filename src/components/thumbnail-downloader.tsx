'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from "axios"

export function ThumbnailDownloader() {
  const [videoUrl, setVideoUrl] = useState('')
  const [thumbnails, setThumbnails] = useState('')
  const [error, setError] = useState('')

  const getThumbnail = async() => {
    try {
      console.log("video url ", videoUrl)
      if(videoUrl){
        const response = await axios.post("/api/thumbnails", {
          userId : "random",
          url : videoUrl
        });
  
        const thumbnails = response.data.thumbnails;
        setThumbnails(thumbnails)
      }
    } catch (error) {
      setError("Error in Requesting the backend")
    }
  }

  const getThumbnailUrl = (size: string) => {
    if (!thumbnails) return ''
    //@ts-ignore
    return thumbnails[size].url;
  }


  const downloadThumbnail = async(size: string) => {
    const url = getThumbnailUrl(size)
    if (url) {
      const link = document.createElement('a')  
      link.href = url
      link.download = `youtube-thumbnail-${size}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-200 rounded-xl dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-red-500">
              <path d="M14.97 2H9.03C4 2 2 4 2 9.03v5.94C2 20 4 22 9.03 22h5.94C20 22 22 20 22 14.97V9.03C22 4 20 2 14.97 2zM12 16.23a.7.7 0 01-.36-.1.687.687 0 01-.34-.6V8.47c0-.24.14-.47.34-.6.21-.13.46-.14.68-.03l5.38 3.53c.22.15.36.39.36.63s-.13.48-.36.63l-5.38 3.53c-.1.07-.22.1-.32.1z" />
            </svg>
            YouTube Thumbnail Downloader
          </CardTitle>
          <CardDescription className="text-center">
            Enter a YouTube video URL to download its thumbnail
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-grow">
                <Label htmlFor="videoUrl" className="sr-only">YouTube Video URL</Label>
                <Input
                  id="videoUrl"
                  placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button 
                onClick={() => setVideoUrl('')} 
                variant="outline"
                className="w-full sm:w-auto"
              >
                Clear
              </Button>

              
            </div>
            <Button
              onClick={async() => await getThumbnail()}
              variant="outline"
              className='w-full sm:w-auto'
              >
                Submit
              </Button>
            {error && (
              <Alert variant="destructive">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
                  <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {thumbnails && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-2">Thumbnail Preview</h2>
                  <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                    <img
                      src={getThumbnailUrl('max')}
                      alt="Video Thumbnail"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
                <Tabs defaultValue="download" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="download">Download</TabsTrigger>
                    <TabsTrigger value="embed">Embed</TabsTrigger>
                  </TabsList>
                  <TabsContent value="download" className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {['max', 'hq', 'mq', 'default'].map((size) => (
                        <Button key={size} onClick={() => downloadThumbnail(size)} className="w-full">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
                            <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                          </svg>
                          {size.toUpperCase()} Quality
                        </Button>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="embed" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="embedCode">Embed Code</Label>
                      <Input
                        id="embedCode"
                        readOnly
                        value={`<img src="${getThumbnailUrl('mq')}" alt="YouTube Thumbnail" />`}
                      />
                    </div>
                    <Button 
                      onClick={() => navigator.clipboard.writeText(`<img src="${getThumbnailUrl('mq')}" alt="YouTube Thumbnail" />`)}
                      className="w-full"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
                        <path fillRule="evenodd" d="M10.5 3A1.501 1.501 0 009 4.5h6A1.5 1.5 0 0013.5 3h-3zm-2.693.178A3 3 0 0110.5 1.5h3a3 3 0 012.694 1.678c.497.042.992.092 1.486.15 1.497.173 2.57 1.46 2.57 2.929V19.5a3 3 0 01-3 3H6.75a3 3 0 01-3-3V6.257c0-1.47 1.073-2.756 2.57-2.93.493-.057.989-.107 1.487-.15z" clipRule="evenodd" />
                      </svg>
                      Copy Embed Code
                    </Button>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}