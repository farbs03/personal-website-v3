import type { AlbumInfo } from "@/types/favorites/music/music-types";

export default function AlbumDisplay(album: AlbumInfo) {
    console.log(album)
    return (
        <div className="flex items-center gap-4">
            {/* Album cover */}
            <div className="w-fit">
                <img src={album.albumCover} className="w-40 h-40 rounded-md" />
            </div>
            <div>
                <p>{album.title}</p>
                <p>{album.artist} | {album.year} | {album.genre}</p>
                <p>{album.rating}</p>
                <p>Reviewed: {album.dateReviewed.toString()}</p>
                <div>
                    {album.songs.map((song) => (
                        <div className="flex items-between">
                            <p>{song.title}</p>
                            <p>{song.specialTag}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}