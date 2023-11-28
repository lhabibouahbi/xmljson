<h1>XML TO JSON BY HABIB</h1>

## Overview

<h3>The provided JavaScript code defines a function, xmljsn, which converts XML strings into a structured JavaScript object, essentially acting as an XML to JSON converter. The function utilizes the DOMParser to parse the XML string into an XML document, and then recursively processes the document's nodes to build a corresponding JSON object.</h3>

<h5>Here's a breakdown of the key functionalities:</h5>

<ul>
<li>Attribute Handling: The code correctly captures XML attributes by prefixing their names with an underscore in the resulting JSON object.</li>
<li>Text Content Handling: If an XML element has only one text child, it is treated as a simple property named 'thetext' in the resulting JSON.</li>
<li>Recursion: The function recursively processes child nodes, allowing for the correct representation of nested XML structures in the resulting JSON.</li>
<li>Array Conversion: If an XML element with the same name appears multiple times at the same level, the code converts it into an array to preserve the information.</li>
<li>Final Output: The resulting JSON object is structured to mirror the XML hierarchy, with elements represented as properties and attributes as underscore-prefixed keys.</li>
</ul>

However, it's important to note that the code might benefit from additional comments to enhance readability and understanding, especially for developers who are not familiar with the implementation details. Additionally, a formatted and multiline version of the code is often preferred for better code maintainability and collaboration.

## Installation
use this code in a web browser, you can simply include it in your HTML file within a <script> tag. For example:

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your HTML Page</title>
  <!-- Include the external script -->
  <script src="xmljson.js"></script>
</head>
<body>
  <!-- Your HTML content goes here -->

  <!-- Example usage of the xml2json functionality -->
  <script>
    // Assuming xmljson.js defines a function called xml2json
    const xmlString = '<root><item id="1">Hello</item><item id="2">World</item></root>';
    const jsonObject = xmljsn(xmlString);
    console.log(jsonObject);
  </script>
</body>
</html>
```
## usage
```
  <script>
    // Assuming xmljson.js defines a function called xmljson
    const xmlString = '<root><item id="1">Hello</item><item id="2">World</item></root>';
    const jsonObject = xmljsn(xmlString);
    console.log(jsonObject);
  </script>
```
## Example XML

```
<?xml version="1.0" encoding="UTF-8"?>
<library>
  <book id="001" category="Fiction">
    <title lang="en">The Great Gatsby</title>
    <author>
      <name>F. Scott Fitzgerald</name>
      <nationality>American</nationality>
    </author>
    <published year="1925" month="April" />
    <price currency="USD">15.99</price>
    <availability>
      <inStock>true</inStock>
      <quantity>50</quantity>
    </availability>
  </book>
  <book id="002" category="Non-Fiction">
    <title lang="en">Sapiens: A Brief History of Humankind</title>
    <author>
      <name>Yuval Noah Harari</name>
      <nationality>Israeli</nationality>
    </author>
    <published year="2014" />
    <price currency="USD">21.99</price>
    <availability>
      <inStock>false</inStock>
      <quantity>0</quantity>
    </availability>
  </book>
  <book id="003" category="Science Fiction">
    <title lang="en">Dune</title>
    <author>
      <name>Frank Herbert</name>
      <nationality>American</nationality>
    </author>
    <published year="1965" month="August" />
    <price currency="USD">18.99</price>
    <availability>
      <inStock>true</inStock>
      <quantity>30</quantity>
    </availability>
  </book>
</library>

```
## Example JSON

```
{
  "library": {
    "book": [
      {
        "_id": "001",
        "_category": "Fiction",
        "title": {
          "_lang": "en",
          "thetext": "The Great Gatsby"
        },
        "author": {
          "name": {
            "thetext": "F. Scott Fitzgerald"
          },
          "nationality": {
            "thetext": "American"
          }
        },
        "published": {
          "_year": "1925",
          "_month": "April"
        },
        "price": {
          "_currency": "USD",
          "thetext": "15.99"
        },
        "availability": {
          "inStock": {
            "thetext": "true"
          },
          "quantity": {
            "thetext": "50"
          }
        }
      },
      {
        "_id": "002",
        "_category": "Non-Fiction",
        "title": {
          "_lang": "en",
          "thetext": "Sapiens: A Brief History of Humankind"
        },
        "author": {
          "name": {
            "thetext": "Yuval Noah Harari"
          },
          "nationality": {
            "thetext": "Israeli"
          }
        },
        "published": {
          "_year": "2014"
        },
        "price": {
          "_currency": "USD",
          "thetext": "21.99"
        },
        "availability": {
          "inStock": {
            "thetext": "false"
          },
          "quantity": {
            "thetext": "0"
          }
        }
      },
      {
        "_id": "003",
        "_category": "Science Fiction",
        "title": {
          "_lang": "en",
          "thetext": "Dune"
        },
        "author": {
          "name": {
            "thetext": "Frank Herbert"
          },
          "nationality": {
            "thetext": "American"
          }
        },
        "published": {
          "_year": "1965",
          "_month": "August"
        },
        "price": {
          "_currency": "USD",
          "thetext": "18.99"
        },
        "availability": {
          "inStock": {
            "thetext": "true"
          },
          "quantity": {
            "thetext": "30"
          }
        }
      }
    ]
  }
}

