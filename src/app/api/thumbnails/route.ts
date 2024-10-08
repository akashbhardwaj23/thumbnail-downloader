import { getThumbnails } from "@/app/lib/getThumbnails";
import { extractVideoId } from "@/app/lib/videoId";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const InputData = z.object({
    url : z.string(),
    userId : z.string()
})

export async function POST(req : NextRequest){
    const body = await req.json()
    const success = InputData.safeParse(body);
    if(!success.success){
        return NextResponse.json({
            message : "Please Send a Valid Input"
        }, {
            status : 411
        })
    };

    const id = extractVideoId(body.url)
    const thumbnails = await getThumbnails(id || "")
    return NextResponse.json({
        thumbnails
    }, {
        status : 200
    })

}
