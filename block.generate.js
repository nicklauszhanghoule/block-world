const BLOCK_TEXTURES = {
    "top": [
        "textures/block-top-1.jpg",
        "textures/block-top-2.jpg"
    ],
    "side": [
        "textures/block-side-1.jpg",
        "textures/block-side-2.jpg",
        "textures/block-side-3.jpg",
        "textures/block-side-4.jpg"
    ]
};

class Blue extends Block {
    createTexture(type) {
        if (type === "top") {
            return `url(${BLOCK_TEXTURES.top[0]})`;
        }

        if (type === "bottom") {
            return `url(${BLOCK_TEXTURES.top[1]})`; 
        }
        
        if (type === "side-1") {
            return `url(${BLOCK_TEXTURES.side[0]})`; 
        }
        
        if (type === "side-2") {
            return `url(${BLOCK_TEXTURES.side[1]})`; 
        }

        if (type === "side-3") {
            return `url(${BLOCK_TEXTURES.side[2]})`; 
        }

        if (type === "side-4") {
            return `url(${BLOCK_TEXTURES.side[3]})`; 
        }
        const texture = BLOCK_TEXTURES.side[0];

        return `url(${texture})`;
    }
}

Block.Blue = Blue;