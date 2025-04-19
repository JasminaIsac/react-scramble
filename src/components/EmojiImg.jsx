import { useState } from "react";

export default function EmojiImg({img}) {
    return (
        <div className="flex mx-auto w-fit h-[200px] mt-4 mb-4">
            <img src={img} alt={img} />
        </div>
    )

}