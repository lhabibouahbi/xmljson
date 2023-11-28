/*
MIT License

Copyright (c) 2023 El Habib Ouahbi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

function xmljsn(xmlString) {
  const xmlDoc = new DOMParser().parseFromString(xmlString, 'text/xml');
  const result = {};

  function parseNode(node, obj) {
    if (node.nodeType === 1) {
      // Element node
      const childObj = {};

      for (let i = 0; i < node.attributes.length; i++) {
        const attribute = node.attributes[i];
        childObj[`_${attribute.nodeName}`] = attribute.nodeValue;
      }

      if (node.childNodes.length === 1 && node.childNodes[0].nodeType === 3) {
        // If the element has only one text child, treat it as a simple property
        childObj['thetext'] = node.childNodes[0].nodeValue.trim();
      } else {
        // Otherwise, recursively process the child nodes
        for (let i = 0; i < node.childNodes.length; i++) {
          const childNode = node.childNodes[i];
          parseNode(childNode, childObj);
        }
      }

      // Check if an object with the same name already exists
      if (obj[node.nodeName]) {
        // If it's not an array, convert it to an array
        if (!Array.isArray(obj[node.nodeName])) {
          obj[node.nodeName] = [obj[node.nodeName]];
        }
        // Push the new object
        obj[node.nodeName].push(childObj);
      } else {
        // If the object with this name doesn't exist, create a new one
        obj[node.nodeName] = childObj;
      }
    }
  }

  parseNode(xmlDoc.documentElement, result);
  return result;
}