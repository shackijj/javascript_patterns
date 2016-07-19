var XMLUtil = {
    parseXML: function (xml) {
        var xmldom = null;

        if (typeof DOMParser != "undefined") {
            xmldom = (new DOMParser()).parseFromString(xml, "text/xml");
            var errors = xmldom.getElementsByTagName("parseerror");
            if (errors.length) {
                throw new Error("Parsing error XML: " + 
                    errors[0].textContent);
            }
        } else if (typeof ActiveXObject != "undefined") {
            xmldom = createDocument();
            xmldom.loadXML(xml);
            if (xmldom.parseError != 0) {
                throw new Error("Parsing error XML: " + 
                    xmldom.parseError.reason);
            }
        } else {
            throw new Error("No XML parser availiable");
        }

        return xmldom;
    },

    serializeXML: function (xmldom) {

        if (xmldom.documentElement === "undefined") {
            throw new Error("serializeXML: argument must be xml dom node");
        }

        if (typeof XMLSerializer != "undefined") {
            return (new XMLSerializer()).serializeToString(xmldom);
        } else if (typeof xmldom.xml != "undefined") {
            return xmldom.xml;
        } else {
            throw new Error("Could not serialize xml");
        }
    } 
}