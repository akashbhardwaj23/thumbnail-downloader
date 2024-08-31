"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "./ui/button";
import Image from "next/image";

export function Appbar(){
    const session = useSession();
    console.log(session)
    return (
        <div className="flex justify-between p-4 border-b border-gray-600">
            <div className="flex justify-center items-center text-xl font-bold">
                Thumbnail Downloader
            </div>

            <div className="pr-4 flex justify-center items-center">
                {session.data?.user  && (
                    <div className="flex justify-center items-center gap-4">
                        <Image src={session.data.user.image || ""} width={40} height={40} alt="UserImage" className="rounded-full" />
                        <Button variant={"outline"} onClick={() => signOut()}>SignOut</Button>
                    </div>
                )}
                {!session.data?.user  && <Button variant={"outline"} onClick={() => signIn()}>SignIn</Button>}
            </div>
        </div>
    )
}