/*
 * Custom 3x3 Sudoku built around WiX using the Velo API
 */

// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction

let white_img = "https://static.wixstatic.com/media/e9dfbb_1d213395c599402982a485814ac9a4d7~mv2.jpeg";
let pumpkin_img = "https://static.wixstatic.com/media/4451e5_6e10fefb10cc49d29727b4bd58226192~mv2.png";
let candy_img = "https://static.wixstatic.com/media/4451e5_6b753ce873ea41a198a86d9b1c69b9e3~mv2.png";
let cat_img = "https://static.wixstatic.com/media/4451e5_48351e5cd7f24afd92a6a8582629274f~mv2.png";

let symbol;
let layout;
let total_size;
let count;
let win;

$w.onReady(function () {
    count = 0;
    win = false;

    let imgArr = $w("Image");
    console.log("Test images: " + imgArr);

    set_init(imgArr.length);

    // sets the onclick for all images on page.
    // this will allow for image changing based on the selected symbol.
    imgArr.forEach(img => {
        img.onClick((event, $w) => {
            // grab id of image and concat # so we can reassign element source image.
            let name = "#" + event.target.id;
            image_flip(name);
        })
    })

    let countup = setInterval(function() {
        if (!win) {
            count += 1;

            var m = Math.floor(count % 3600 / 60);
            var s = Math.floor(count % 3600 % 60);
            $w('#counter').text = "" + m + ":" + s;
        }
    }, 1000)
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
        case "candy":
            $w(name).src = candy_img;
            break;
        case "cat":
            $w(name).src = cat_img;
            break;
    }
}

// set the initial board
function set_init(size) {
    // potential layouts
    let layouts = [
        ["", "", "p", "c", "", "a", "", "", ""],
        ["p", "c", "", "c", "", "", "", "", ""],
        ["p", "", "", "", "", "", "", "c", "p"],
        ["", "a", "", "", "", "", "a", "c", ""]
    ];

    // pick random layout
    let rand_layout = Math.floor(Math.random() * 4);

    // set puzzle variables
    layout = layouts[rand_layout];
    total_size = size;
    symbol = "";

    apply_layout();
}

// apply layout to all spaces
function apply_layout() {
    for (let i = 0; i < total_size; i++) {
        let img = "#image" + i;
        switch(layout[i]) {
            case "":
                $w(img).src = white_img;
                break;
            case "p":
                $w(img).src = pumpkin_img;
                break;
            case "c":
                $w(img).src = candy_img;
                break;
            case "a":
                $w(img).src = cat_img;
                break;
        }
    }
}

/// Button handlers - reassign symbol on button push
export function button_pumpkin(event) {
    symbol = "pumpkin";
}

export function button_candy(event) {
    symbol = "candy";
}

export function button_cat(event) {
    symbol = "cat";
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
    win = true;
}

export function reset(event) {
    console.log("Resetting layout");
    apply_layout();
}
