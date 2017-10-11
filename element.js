function element (name, ns) {
    return new _element(name , ns);
}

//this was specially created for use in scriftj block creation
class _element {
    constructor (name, ns = null) {
        if (ns === null) {
            this.dom = document.createElement(name);
        } else if (ns === "svg") {
            this.dom = document.createElementNS("http://www.w3.org/2000/svg", name);//going to nned to add the namspace for svg there
        } else {
            this.dom = documentElementNS(ns, name);
        }
    }

    a (name, value) {
        this.dom.setAttribute(name, value);
        return this;
    }

    /*o (name, value, select = false) {
        let a = document.createElement("option");
        a.setAttribute("value", value);
        a.appendChild(document.createTextNode("name"));
        if (select) {
            a.setAttribute("selected", true);
        }
        this.dom.appendChild(a);
        return this.dom;
    }*/

    o (options, selected) {
        console.log(options);
        for (let a in options) {
            if (options.hasOwnProperty(a)) {
                console.log(a, options[a]);
                let b = document.createElement("option");
                b.setAttribute("value", a);
                b.appendChild(document.createTextNode(options[a]));
                if (selected == a) {
                    b.setAttribute("selected", true);
                }
                this.dom.appendChild(b);
            } 
        }
        return this;
    }

    t (text) {
        this.dom.appendChild(document.createTextNode(text));
        return this;
    }

    d (disable, n) {
        if (disable) {
            this.dom.setAttribute("disabled", true);
        }
        return this;
    }

    m (disable, n) {
        if (disable == "true") {
            this.dom.setAttribute("onmousedown", "create_block(0, 20, '"+n+"')");
        }
        return this;
    }

    append (element2) {
        this.dom.appendChild(element2.dom);
        return this;
    }

    ap (dom) {
        dom.appendChild(this.dom);
        return dom;
    }

    apthis (dom) {
        dom.appendChild(this.dom);
        return this.dom;
    }
}