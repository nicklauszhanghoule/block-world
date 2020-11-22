Number.prototype.toInt = String.prototype.toInt = function () {
    return parseInt(this, 10);
};

Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
};

let first = new Block.Blue(1, 1, 1);

const $scene = $(".scene");
const $body = $("body");

for (let x = 0; x < 12; x++) {
    for (let y = 0; y < 12; y++) {
        let next = new Block.Blue(x, y, 0);
        next.block.appendTo($scene);
    }
}

function createCoordinatesFrom(side, x, y, z) {
    if (side == "top") {
        z += 1;
    }

    if (side == "side-1") {
        y += 1;
    }

    if (side == "side-2") {
        x += 1;
    }

    if (side == "side-3") {
        y -= 1;
    }

    if (side == "side-4") {
        x -= 1;
    }

    if (side == "bottom") {
        z -= 1;
    }

    return [x, y, z];
}

$body.on("click", ".side", function (e) {
    const $this = $(this);
    const previous = $this.data("block");

    if ($body.hasClass("subtraction")) {
        previous.block.remove();
        previous = null;
    } else {
        const coordinates = createCoordinatesFrom(
            $this.data("type"),
            previous.x,
            previous.y,
            previous.z
        );

        const next = new Block.Blue(...coordinates);

        next.block.appendTo($scene);
    }
});

let ghost = null;

function removeGhost() {
    if (ghost) {
        ghost.block.remove();
        ghost = null;
    }
}

function createGhostAt(x, y, z) {
    const next = new Block.Blue(x, y, z);

    next.block
        .addClass("ghost")
        .appendTo($scene);

    ghost = next;
}

$body.on("mouseenter", ".side", function (e) {
    removeGhost();

    const $this = jQuery(this);
    const previous = $this.data("block");

    const coordinates = createCoordinatesFrom(
        $this.data("type"),
        previous.x,
        previous.y,
        previous.z
    );

    createGhostAt(...coordinates);
});

$body.on("mouseleave", ".side", function (e) {
    removeGhost()
});

let lastMouseX = null;
let lastMouseY = null;

let sceneTransformX = 60;
let sceneTransformY = 0;
let sceneTransformZ = 45;
let sceneTransformScale = 1;

$body.on("mousewheel", function (event) {
    if (event.originalEvent.deltaY > 0) {
        if (sceneTransformScale > 0.5) {
            sceneTransformScale -= 0.05;
        }
    } else {
        if (sceneTransformScale < 1.5) {
            sceneTransformScale += 0.05;
        }
    }
    changeViewport();
});

$scene.on("mousedown", function (e) {
    e.stopPropagation();
});

$body.on("mousedown", function (e) {
    lastMouseX = e.clientX / 10;
    lastMouseY = e.clientY / 10;
});

function cameraRotation() {
    sceneTransformZ -= 0.1;
    changeViewport();
}

setInterval(cameraRotation, 1);

$body.on("mouseup", function (e) {
    lastMouseX = null;
    lastMouseY = null;
});

function changeViewport() {
    $scene.css({
        "transform": `
            rotateX(${sceneTransformX}deg)
            rotateY(${sceneTransformY}deg)
            rotateZ(${sceneTransformZ}deg)
            scaleX(${sceneTransformScale})
            scaleY(${sceneTransformScale})
            scaleZ(${sceneTransformScale})
          `
    });
};

$body.on("keydown", function (e) {
    if (e.altKey || e.ctrlKey) {
        $body.addClass("subtraction");
    }
});

$body.on("keyup", function (e) {
    $body.removeClass("subtraction");
});