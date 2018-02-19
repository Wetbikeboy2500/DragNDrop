function page_item (index, id, type, y) {
    return new _page_item(index, id, type, y);
}

class _page_item {
    constructor (i, id, type, y) {
        this.index = i; //tells where it is on the screen
        this.id = id;
        this.y = y;
        this.font = "default";
        this.value = "";
        this.type = type;
        console.log(type);
        if (type == "text") {
            element("div").a("class", "text_area").a("style", "top:" + this.y + "px;").a("id", this.id)
                .append(element("div").a("class", "button").a("onmousedown", "_move("+this.id+")").t("Move"))
                .append(element("div").a("class", "button").a("onclick", "_delete("+this.id+")").t("Delete"))
                .append(element("div").a("class", "button").a("onclick", "dropdown("+this.id+")").t("Text Edit"))
                .append(element("div").a("class", "dropdown").a("style", "display: none;")
                        .append(element("div").a("class", "button").a("onclick", "bold()").t("Bold"))
                        .append(element("div").a("class", "button").a("onclick", "italic()").t("Italic"))
                        .append(element("div").a("class", "button").a("onclick", "underline()").t("Underline"))
                        .append(element("div").a("class", "button").a("onclick", "remove_format()").t("Normal"))
                       )
                .append(element("p").a("class", "textarea").a("contentEditable", "true").a("onkeypress", "key_press("+ this.id+")").a("onpaste", "key_press("+this.id+")").a("oncut", "key_press("+this.id+")"))
                .ap(document.getElementById("bottom_element"));
        } else if (type == "title") {
                element("div").a("class", "text_area").a("style", "top:" + this.y + "px;").a("id", this.id)
                .append(element("div").a("class", "button").a("onmousedown", "_move("+this.id+")").t("Move"))
                .append(element("div").a("class", "button").a("onclick", "_delete("+this.id+")").t("Delete"))
                //.append(element("div").a("class", "button").a("onclick", "dropdown("+this.id+")").t("Text Edit"))
                //.append(element("div").a("class", "dropdown").a("style", "display: none;")
                        //.append(element("div").a("class", "button").a("onclick", "bold()").t("Bold"))
                        //.append(element("div").a("class", "button").a("onclick", "italic()").t("Italic"))
                        //.append(element("div").a("class", "button").a("onclick", "underline()").t("Underline"))
                        //.append(element("div").a("class", "button").a("onclick", "remove_format()").t("Normal"))
                       //)
                .append(element("p").a("class", "textarea").a("contentEditable", "true").a("onkeypress", "key_press("+ this.id+")").a("onpaste", "key_press("+this.id+")").a("oncut", "key_press("+this.id+")"))
                .ap(document.getElementById("bottom_element"));
        }
    }

    get_height () {
        this.height = this.dom.clientHeight;
        return this.dom.clientHeight;
    }

    get_height_change () {
        let change = this.dom.clientHeight - this.height;
        this.height = this.dom.clientHeight;
        return change;
    }
    set_dom () {
        this.dom = document.getElementById(this.id); 
    }

    get_top_y () {
        return this.y;
    }

    get_bottom_y () {
        return this.y + this.get_height();
    }

    setup () {
        document.getElementById("top_element").appendChild(this.dom);
        this.sy = get_my();
    }

    update () {
        this.y += (get_my() - this.sy);
        this.render();
    }

    render () {
        console.log(this.y);
        this.dom.setAttribute("style", "top:" + this.y + "px;");
    }

    move () {
        this.setup();
        clearInterval(this.clock);
        this.clock = setInterval ( () => {
            this.update();
            this.setup();
        });
    }

    stop () {
        document.getElementById("bottom_element").appendChild(this.dom);
        clearInterval(this.clock);
    }

    del () {
        this.dom.style.pointerEvents = "none";
        this.dom.parentNode.removeChild(this.dom);
    }
} 