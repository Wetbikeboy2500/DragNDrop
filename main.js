let current_block = null, items = [], arr = [], counter = -1, current_item = null;//items stroes structured data but arr stores everything

/*window.onload = () => {
    counter += 1;
    arr[counter] = page_item(0, counter, "text", 10);
    items[0] = arr[counter];
    arr[counter].set_dom();
};
*/
function create (a, x, y) {
    current_block = page_element(a, "block", x, y);
    current_block.set_dom();
    current_block.move();
}
function stop_move () {
    console.log("stop move");
    if (current_block != null) {
        current_block.stop();
        check_block();
    } else if (current_item != null) {
        current_item.stop();
        check_item();
    }
}

function check_block () {
    if (current_block.x <= 0) {
        //delete block and not do anything
        current_block.del();
    } else {
        let object = null, place = null;
        //still going to delete but also add a new element to the page
        current_block.del();
        items.forEach((a, i) => {
            if (a != null && object == null) {
                if (current_block.y < a.get_top_y() && current_block.y > a.get_top_y() - 10) {
                    object = a;
                    place = "top";
                    console.log("add top");
                } else if (current_block.y > a.get_bottom_y() && current_block.y < a.get_bottom_y() + 10) {
                    object = a;
                    place = "bottom";
                    console.log("add bottom");
                } else if (current_block.y >= a.get_top_y() && current_block.y <= a.get_bottom_y()) {
                    object = a;
                    place = "bottom";
                    console.log("add below")
                }
            }
        });
        
        if (object == null) {
            //didn't find a place to connect then add to the last position
            if (items.length == 0) {
                console.log("make new");
                counter += 1;
                arr[counter] = page_item(0, counter, "text", 10);
                items[0] = arr[counter];
                arr[counter].set_dom();
            } else {
                console.log("add last");
                counter += 1;
                arr[counter] = page_item(items.length, counter, "text", items[items.length - 1].get_bottom_y() + 10);
                items[items.length] = arr[counter];
                arr[counter].set_dom();
            }
        } else {
            counter += 1;
            if (place == "top") {
                console.log("add above " + object);
                arr[counter] = page_item(object.index, counter, "text", object.get_top_y());
                arr[counter].set_dom();
                items.splice(object.index, 0, arr[counter]);
                console.log(items);
                for (let i = object.index + 1; i < items.length; i++) {
                    items[i].index += 1;
                    items[i].y += object.get_height() + 10;
                    items[i].render();
                }
            } else {
                console.log("add below "+ object);
                arr[counter] = page_item(object.index + 1, counter, "text", object.get_bottom_y() + 10);
                arr[counter].set_dom();
                items.splice(object.index + 1, 0, arr[counter]);
                for (let i = object.index + 2; i < items.length; i++) {
                    items[i].index += 1;
                    items[i].y += arr[counter].get_height() + 10;
                    items[i].render();
                }
            }
        }
    }
    current_block = null;
}

function check_item () {
    //check to see where it should go
    let object = null, place = null;
    items.forEach((a, i) => {
        if (object == null) {
            if (current_item.get_top_y() < a.get_top_y() && current_item.get_top_y() > a.get_top_y() - 10) {
                object = a;
                place = "top";
                console.log("add top");
            } else if (current_item.get_top_y() > a.get_bottom_y() && current_item.get_top_y() < a.get_bottom_y() + 10) {
                object = a;
                place = "bottom";
                console.log("add bottom");
            } else if (current_item.get_top_y() >= a.get_top_y() && current_item.get_top_y() <= a.get_bottom_y()) {
                object = a;
                place = "bottom";
                console.log("add below")
            }
        }
    });
    console.log(object, place);
    if (object == null) {
        if (items.length == 0) { //if this was only block that was on screen and was then moved
            items[0] = current_item;
            current_item.index = 0;
            current_item.y = 10;
            current_item.render();
        } else { //add as last element
            current_item.y = items[items.length - 1].get_bottom_y() + 10;
            current_item.index = items.length;
            items[items.length] = current_item;
            current_item.render();
        }
    } else { //found a block to connect
        if (place == "top") {
            //insert itself into that position and unpdate everything below it
            items.splice(object.index, 0, current_item);
            current_item.index = object.index;
            current_item.y = object.get_top_y();
            current_item.render();
            for (let i = current_item.index + 1; i < items.length; i++) {
                items[i].index += 1;
                items[i].y += current_item.get_height() + 10;
                items[i].render();
            }
        } else {
            items.splice(object.index + 1, 0, current_item);
            current_item.index = object.index + 1;
            current_item.y = object.get_bottom_y() + 10;
            current_item.render();
            for (let i = object.index + 2; i < items.length; i++) {
                items[i].index += 1;
                items[i].y += current_item.get_height() + 10;
                items[i].render();
            }
        }
    }
    current_item = null;
}

function _delete (id) {
    items.splice(arr[id].index, 1);
    for (let i = arr[id].index; i < items.length; i++) {
        items[i].index -= 1;
        items[i].y -= arr[id].get_height() + 10;
        items[i].render();
    }
    arr[id].del();
}

function _move (id) {
    //remove from current items array
    items.splice(arr[id].index, 1);
    for (let i = arr[id].index; i < items.length; i++) {
        items[i].index -= 1;
        items[i].y -= arr[id].get_height() + 10;
        items[i].render();
    }
    //start the movement
    current_item = arr[id];
    current_item.move();
}

function bold () {
    document.execCommand('bold');
}

function italic () {
    document.execCommand("italic");
}

function underline () {
    document.execCommand("Underline");
}
function key_press (id) {
    setTimeout(() => {
        console.log("change");
        let change = arr[id].get_height_change();
        if (change != 0) {
            for (let i = arr[id].index + 1; i < items.length; i++) {
                items[i].y += change;
                items[i].render();
            }
        }  
    }, 10); 
}