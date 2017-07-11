class _ce {
    //normal element
    default (a) {
        this.dom = document.createElement(a);
        return this;
    }
    //elements with a name space
    NS (a) {
        this.dom = document.createElementNS("http://www.w3.org/2000/svg",a);
        return this;
    }
    //sets attributes
    att (a, value) {
        this.dom.setAttribute(a, value);
        return this;
    }
    option (input, name) {
        let a = document.createElement("option");
        a.setAttribute("value", input);
        let b = document.createTextNode(name);
        a.appendChild(b);
        this.dom.appendChild(a);
        return this;
    }
    select (v) {
        let a = this.dom.options, i;
        for (i = 0; i < a.length; i++) {
            if (a[i].value == v) {
                a[i].selected = true;
                break;
            }
        }
        return this;
    }
}

function create_element () {
    return new _ce();
}