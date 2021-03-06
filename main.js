let current_block = null, items = [], arr = [], counter = -1, current_item = null, mode = null;//items array stores structured data but arr array stores everything

window.onload = () => {
    document.getElementById("file").addEventListener("change", () => {
        let reader = new FileReader();
        reader.onload = (event) => {
            let result = reader.result;
            console.log(result);
        }
        console.log(file.files);
        reader.readAsText(new Blob(file.files, {type: "text/plain"}), "UTF-8");
    });
};

function create (a, x, y) {
    console.log(a);
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

//this is when you add a new element to the page
function check_block () {
    //deletes the element but not the object on screen
    current_block.del();
    if (current_block.x > 0) {
        let object = null, place = null;
        //finds objects it can connect to
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
                //make the first element of page
                console.log("make new");
                counter += 1;
                arr[counter] = page_item(0, counter, current_block.type, 10);
                items[0] = arr[counter];
                arr[counter].set_dom();
            } else {
                //add the new element to the last position
                console.log("add last");
                counter += 1;
                arr[counter] = page_item(items.length, counter, current_block.type, items[items.length - 1].get_bottom_y() + 10);
                items[items.length] = arr[counter];
                arr[counter].set_dom();
            }
        } else {
            //found an object to connect to
            counter += 1;
            if (place == "top") {
                //insert into current object position and move down all the blocks below it
                console.log("add above " + object);
                arr[counter] = page_item(object.index, counter, current_block.type, object.get_top_y());
                arr[counter].set_dom();
                items.splice(object.index, 0, arr[counter]);
                console.log(items);
                for (let i = object.index + 1; i < items.length; i++) {
                    items[i].index += 1;
                    items[i].y += object.get_height() + 10;
                    items[i].render();
                }
            } else {
                //insert below current object and move all elements below it down
                console.log("add below "+ object);
                arr[counter] = page_item(object.index + 1, counter, current_block.type, object.get_bottom_y() + 10);
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


//this is when you move a preexisting element on the page
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

//remove this object and update the elements positions below it 
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

//loads and previews the project in an iframe
function preview () {
    console.log("preview");
    if (mode === null) {
        mode = "preview";
        let iframe = document.getElementById("preview");
        iframe = iframe.contentDocument || iframe.contentWindow.document;
        iframe.body.innerHTML = "";
        for (let i = 0; i < items.length; i++) {
            console.log(items[i]);
            if (items[i].type == "text") {
                let t = document.createElement("p");
                t.innerHTML = items[i].dom.getElementsByClassName("textarea")[0].innerHTML;
                iframe.body.appendChild(t);
            } else if (items[i].type == "title") {
                let t = document.createElement("h1");
                t.innerHTML = items[i].dom.getElementsByClassName("textarea")[0].innerHTML;
                iframe.body.appendChild(t);
            }
        }
        document.getElementById("preview").style.display = "block";
        document.getElementById("main_window").style.display = "none";
        document.getElementById("side_bar").style.display = "none";
    } else {
        mode = null;
        document.getElementById("preview").style.display = "none";
        document.getElementById("main_window").style.display = "block";
        document.getElementById("side_bar").style.display = "block";
    }
}
//saves the website so you can edit it later
//this currently doesn't save anything but it is capable of saving a file with information and then reloading that information
//The thing that needs to be worked on is interpreting and parsing that information to reload the project in its current state
function save () {
    let text = "";
    let name = "";
    let blob = new Blob([text], {type: "text/plain"});
    let a = document.createElement("a");
    a.setAttribute("download", name);
    a.setAttribute("href", window.URL.createObjectURL(blob));
    document.body.appendChild(a);
    a.addEventListener("click", () => {
        document.body.removeChild(a);
    });
    a.click();
}

//loads the website from your save
function load () {
    document.getElementById("file").click();
}
/*
function loadFileAsText() {
	var fileToLoad = document.getElementById("fileToLoad").files[0];

	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent) {
		var textFromFileLoaded = fileLoadedEvent.target.result;
        loaddata(textFromFileLoaded);
		//document.getElementById("inputTextToSave").value = textFromFileLoaded; This is the output
	};
	fileReader.readAsText(fileToLoad, "UTF-8");
}

function loadfile() {
    document.getElementById("fileToLoad").click();
}
*/

//edits the font
function bold () {
    document.execCommand('bold');
}

function italic () {
    document.execCommand("italic");
}

function underline () {
    document.execCommand("Underline");
}

function remove_format () {
    document.execCommand("removeFormat");
}

function dropdown (id) {
    let element = document.getElementById(id).getElementsByClassName("dropdown")[0];
    if (element.style.display == "none") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}

//resizing the input items and logging the new input
function key_press (id) {
    setTimeout(() => {
        console.log("change");
        arr[id].value = arr[id].dom.getElementsByTagName("p")[0].innerHTML;
        let change = arr[id].get_height_change();
        if (change != 0) {
            for (let i = arr[id].index + 1; i < items.length; i++) {
                items[i].y += change;
                items[i].render();
            }
        }  
    }, 10); 
}

window.onresize = () => {
    console.log("Resized");
    for (let i = 0; i < items.length; i++) {
        let change = items[i].get_height_change();
        if (change != 0) {
            for (let i2 = i + 1; i2 < items.length; i2++) {
                items[i2].y += change;
                items[i2].render();
            }
        } 
    }
};