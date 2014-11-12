(function() {
    window.addEventListener('load', windowLoadHandler);

    function walk(node) {
        // I stole this function from here:
        // http://is.gd/mwZp7E
    
        var child, next;
    
        switch ( node.nodeType )  {
            case 1:  // Element
            case 9:  // Document
            case 11: // Document fragment
                child = node.firstChild;
                while ( child ) {
                    next = child.nextSibling;
                    walk(child);
                    child = next;
                }
                break;
    
            case 3: // Text node
                if(node.parentElement.tagName.toLowerCase() != "script") {
                    handleText(node);
                }
                break;
        }
    }
    
    function handleText(textNode) {
        var oldValue = textNode.nodeValue;
            v = oldValue;
            
        
        v = v.replace(/jong[ -](e)?Un/gi,
                function(match,p1,p2,offset,string) {
                    return "Kardashian";
                });

        // avoid infinite series of DOM changes
        if (v !== oldValue) {
            textNode.nodeValue = v;
        }
    }

    function windowLoadHandler() {
        window.removeEventListener('load', windowLoadHandler);

        document.getElementById('appcontent').addEventListener('DOMContentLoaded',
            function(e) {
                walk(e.originalTarget.body);

                if (window.MutationObserver) {
                    var observer = new MutationObserver(function (mutations) {
                            Array.prototype.forEach.call(mutations, function (m) {
                                    if (m.type === 'childList') {
                                        walk(m.target);
                                    } else if (m.target.nodeType === 3) {
                                        handleText(m.target);
                                    }
                            });
                    });

                    observer.observe(e.originalTarget.body, {
                        childList: true,
                        attributes: false,
                        characterData: true,
                        subtree: true
                    });
                }
            });
    }
}());
