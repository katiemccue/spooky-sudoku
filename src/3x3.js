/*
 * Custom 3x3 Sudoku built around WiX using the Velo API
 */

// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction

let white_img = "https://static.wixstatic.com/media/e9dfbb_1d213395c599402982a485814ac9a4d7~mv2.jpeg";
let pumpkin_img = "https://static.wixstatic.com/media/e9dfbb_3f3491b97fbf498b9ad8b516a57c0d0c~mv2.png";
let tree_img = "https://static.wixstatic.com/media/e9dfbb_3fbbfa6b150f470699dea222388d1af0~mv2.png";
let leaf_img = "https://static.wixstatic.com/media/e9dfbb_5158a563f8c249e987c0f3ff992d80e7~mv2.jpeg";

let symbol = ""

$w.onReady(function () {
    let imgArr = $w("Image");
    console.log("Test images: " + imgArr);

    // sets the onclick for all images on page.
    // this will allow for image changing based on the selected symbol.
    imgArr.forEach(img => {
        img.onClick((event, $w) => {
            // grab id of image and concat # so we can reassign element source image.
            let name = "#" + event.target.id;
            image_flip(name);
        })
        // set to blank image due to WiX base image src.
        img.src = white_img;
    })

});

// flip image based on the current symbol held
function image_flip(name) {
    console.log(name + " clicked");
    switch (symbol) {
    case "":
        break;
    case "pumpkin":
        $w(name).src = pumpkin_img;
        break;
    case "tree":
        $w(name).src = tree_img;
        break;
    case "leaf":
        $w(name).src = leaf_img;
        break;
    }
}

/// Button handlers - reassign symbol on button push
export function button_pumpkin(event) {
    symbol = "pumpkin";
}

export function button_tree(event) {
    symbol = "tree";
}

export function button_leaf(event) {
    symbol = "leaf";
}

export function check_solution(event) {
    // 0 1 2
    // 3 4 5
    // 6 7 8

    let rows = 3;
    let cols = 3;

    // ensure all pictures are non-empty
    let imgArr = $w("Image");
    let bad_state = false;
    imgArr.forEach(img => {
        if (img.src === white_img) {
            bad_state = true;
        }
    })

    if (bad_state) {
        console.log("Wrong! Make sure to fill in all spaces." );
        return;
    }

    // check all rows
    for (let i = 0; i < rows * cols; i += cols) {
        let img0 = "#image" + i;
        let img1 = "#image" + (i + 1);
        let img2 = "#image" + (i + 2);

        if (($w(img0).src == $w(img1).src) ||
            ($w(img0).src == $w(img2).src) ||
            ($w(img1).src == $w(img2).src)) {
                console.log("Wrong!" );
                return;
       }
    }

    // check all columns
    for (let i = 0; i < cols; i++) {
        let img0 = "#image" + i;
        let img1 = "#image" + (i + 1*cols);
        let img2 = "#image" + (i + 2*cols);

        if (($w(img0).src == $w(img1).src) ||
            ($w(img0).src == $w(img2).src) ||
            ($w(img1).src == $w(img2).src)) {
                console.log("Wrong!");
                return;
       }
    }

    console.log("Win!");
}
