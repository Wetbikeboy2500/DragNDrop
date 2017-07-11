function page_item (index, id, type, y) {
    return new _page_item(index, id, type, y);
}

class _page_item {
    constructor (i, id, type, y) {
        this.index = i; //tells where it is on the screen
        this.id = id;
        this.y = y;
        this.font = "default";
        console.log(this.y);
        if (type == "text") {
            let container = create_element().default("div").att("class", "text_area").att("style", "top:" + this.y + "px;").att("id", this.id);
                let button = create_element().default("div").att("class", "button").att("onclick", "bold()");
                button.dom.appendChild(document.createTextNode("Bold"));
                container.dom.appendChild(button.dom);
                button = create_element().default("div").att("class", "button").att("onclick", "italic()");
                button.dom.appendChild(document.createTextNode("Italic"));
                container.dom.appendChild(button.dom);
                button = create_element().default("div").att("class", "button").att("onclick", "underline()");
                button.dom.appendChild(document.createTextNode("Underline"));
                container.dom.appendChild(button.dom);
                button = create_element().default("div").att("class", "button").att("onclick", "_delete("+this.id+")");
                button.dom.appendChild(document.createTextNode("Delete"));
                container.dom.appendChild(button.dom);
                button = create_element().default("div").att("class", "button").att("onmousedown", "_move("+this.id+")");
                button.dom.appendChild(document.createTextNode("Move"));
                container.dom.appendChild(button.dom);
                container.dom.appendChild(create_element().default("p").att("class", "textarea").att("contentEditable", "true").att("onkeypress", "key_press("+ this.id+")").att("onpaste", "key_press("+this.id+")").att("oncut", "key_press("+this.id+")").dom);
                document.getElementById("main_window").appendChild(container.dom);
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
        clearInterval(this.clock);
    }
    
    del () {
        this.dom.style.pointerEvents = "none";
        this.dom.parentNode.removeChild(this.dom);
    }
    
    

} 