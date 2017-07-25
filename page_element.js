let mx, my;

function page_element (type, id, x, y) {
    return new _page_element(type, id, x, y);
}

function get_mx () {
    return mx;
}
function get_my () {
    return my;
}

window.onmousemove = (event) => {
    mx = event.pageX;
    my = event.pageY;
};

class _page_element {
    constructor (type, id, x, y) {
        this.type = type;
        this.id = id;
        this.x = x;
        this.y = y;
        _create(type, id, x, y);
    }
    
    set_dom () {
        this.dom = document.getElementById(this.id);
    }

    setup () {
        this.sy = my;
        this.sx = mx;
    }

    update () {
        this.x += (mx - this.sx);
        this.y += (my - this.sy);
        this.render();
    }

    render () {
        this.dom.setAttribute("style", "left:" + this.x + "px; top:" + this.y + "px;");
    }

    del () {
        this.dom.style.pointerEvents = "none";
        this.dom.parentNode.removeChild(this.dom);
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
    
}

function _create (a, id, x, y) { //a will determine the type of element it will create
    switch (a) {
        case "text":
            let container = create_element().default("div").att("class", "item_move").att("id", id).att("style", "left:" + x + "px; top:" + y + "px;");
                let p = create_element().default("p");
                p.dom.appendChild(document.createTextNode("Text Area"));
                container.dom.appendChild(p.dom);
                document.getElementById("side_bar").appendChild(container.dom);
            break;
        default:
            console.log("Object doesn't exsist");
    }
}