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

```html
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
    // Assuming xml2json.js defines a function called xml2json
    const xmlString = '<root><item id="1">Hello</item><item id="2">World</item></root>';
    const jsonObject = xmljson(xmlString);
    console.log(jsonObject);
  </script>
</body>
</html>
html```


## Installation
use this code in a web browser, you can simply include it in your HTML file within a <script> tag. For example:

```html
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
    // Assuming xml2json.js defines a function called xml2json
    const xmlString = '<root><item id="1">Hello</item><item id="2">World</item></root>';
    const jsonObject = xmljson(xmlString);
    console.log(jsonObject);
  </script>
</body>
</html>
```

# xml-to-json

Fast & easy library & command line tool for converting XML files to JSON.

## **Heads up!** The project has been split into two projects. See **[xml-to-json-fast](https://github.com/sinelaw/xml-to-json-fast)** for a low-memory-usage version that has less features.


## Contents
* [Overview](#overview)
* [Installation](#installation)
* [Usage](#usage)
* [Example output](#example-output)
* [Performance](#performance)


## Overview

xml-to-json converts xml to json. It includes a Haskell library and a command-line tool.

xml-to-json ships with two different executables:

1. `xml-to-json-fast` ("fast") uses a lot less memory, but you can't control the output. Can be used on XML files of any size.
2. `xml-to-json` ("classic") provides some control over json output format, but uses a lot of memory. Suitable for smaller files.

### "Fast" xml-to-json-fast

The so-called "fast" version (which uses a lot less memory) has been forked into a separate project, [xml-to-json-fast](https://github.com/sinelaw/xml-to-json-fast).

### "Classic" xml-to-json

The fully featured "classic" `xml-to-json` provides compact json output that's designed to be easy to store and process using JSON-based databases, such as [mongoDB](http://www.mongodb.org/) or [CouchDB](http://couchdb.apache.org/). In fact, the original motivation for xml-to-json was to store and query a large (~10GB) XML-based dataset, using an off-the-shelf scalable JSON database.

When using "classic" xml-to-json, the input XML must be valid.

Currently the xml-to-json processes XMLs according to lossy rules designed to produce sensibly minimal output. If you need to convert without losing information at all consider something like the XSLT offered by the [jsonml project](http://www.jsonml.org/). Unlike jsonml, this tool - xml-to-json - produces json output similar (but not identical) to the [xml2json-xslt project](http://code.google.com/p/xml2json-xslt/).

#### Implementation Notes

xml-to-json is implemented in [Haskell](http://www.haskell.org).

As of this writing, xml-to-json uses [hxt](http://hackage.haskell.org/package/hxt) with the [expat](http://expat.sourceforge.net/)-based [hxt-expat](http://hackage.haskell.org/package/hxt-expat) parser. The pure Haskell parsers for hxt [all seem to have memory issues](http://stackoverflow.com/q/2292729/562906) which hxt-expat doesn't.


## Installation

### The easy way: use Stack

1. Get [Haskell Stack](http://haskellstack.org)
2. Run: `stack install xml-to-json`

You may need to install `libcurl`. For that, follow your platform's instructions. On debian/ubuntu, you can use: `sudo apt-get install libcurl4-openssl-dev`.


### Can't use Stack? Use cabal-install

**Note for Windows users**: Only local files, not URLs, are supported as command line arguments. This is because **curl** doesn't compile on my (windows + cygwin) machine out-of-the-box.

To install the **release version**: Since xml-to-json is implemented in Haskell, "all you need to do" is install the latest cabal-install (you can try the [Haskell platform](http://www.haskell.org/platform/)) for your system, and then run:

```
cabal update
cabal install xml-to-json
```

To install **from source**: Clone this repository locally, and then (assuming you have [Haskell platform](http://www.haskell.org/platform/) installed) run `cabal install`:

```
cd xml-to-json
cabal install
```

## Usage

### Basic usage

Just run the tool with the filename as a single argument, and direct the stdout to a file or a pipe:

> xml-to-json myfile.xml > myfile.js


### Classic `xml-to-json`: Advanced Usage

Use the `--help` option to see the full command line options.

Here's a (possibly outdated) snapshot of the `--help` output:

```
Usage: <program> [OPTION...] files...
  -h      --help                      Show this help
  -t TAG  --tag-name=TAG              Start conversion with nodes named TAG (ignoring all parent nodes)
  -s      --skip-roots                Ignore the selected nodes, and start converting from their children
                                      (can be combined with the 'start-tag' option to process only children of the matching nodes)
  -a      --as-array                  Output the resulting objects in a top-level JSON array
  -m      --multiline                 When using 'as-array' output, print each of top-level json object on a seperate line.
                                      (If not using 'as-array', this option will be on regardless, and output is always line-seperated.)
          --no-collapse-text=PATTERN  For elements with tag matching regex PATTERN only:
	  			      Don't collapse elements that only contain text into a simple string property.
                                      Instead, always emit '.value' properties for text nodes, even if an element contains only text.
                                      (Output 'schema' will be more stable.)
          --no-ignore-nulls           Don't ignore nulls (and do output them) in the top level of output objects
```

## Example output

Input file:

```
<?xml version="1.0"?>
<!DOCTYPE Test>
<Tests>
  <Test Name="The First Test">
    <SomeText>Some simple text</SomeText>
    <SomeMoreText>More text</SomeMoreText>
    <Description Format="FooFormat">
Just a dummy
<!-- comment -->
Xml file.
    </Description>
  </Test>
  <Test Name="Second"/>
</Tests>
```

JSON output using default settings:
```
{"Tests":{"Test":[{"Name":"The First Test","SomeText":"Some simple text","Description":{"Format":"FooFormat","value":"Just a dummy\n\nXml file."}},{"Name":"Second"}]}}
```

Formatted for readability (not the actual output):

```
{
   "Tests":{
      "Test":[
         {
            "Name":"The First Test",
	    "SomeMoreText":"More text",
            "SomeText":"Some simple text",
            "Description":{
               "Format":"FooFormat",
               "value":"Just a dummy\n\nXml file."
            }
         },
         {
            "Name":"Second"
         }
      ]
   }
}
```

Note that currently xml-to-json does not retain the order of elements / attributes.
 
Using the various options you can control various aspects of the output such as:

* At which top-level nodes the conversion starts to work (-t)
* Whether to wrap the output in a top-level JSON array,
* Whether or not to collapse simple string elements, such as the <SomeText> element in the example, into a simple string property (you can specify a regular expression pattern to decide which nodes to collapse)
* And more...

Use the `--help` option to see a full list of options.


## Performance of "classic" xml-to-json

The "classic" xml-to-json cannot operate on large files. However, it is fast when operating on multiple small files. For large XML files, the speed on a core-i5 machine is about 2MB of xml / sec, with a 100MB XML file resulting in a 56MB json output. It took about 10 minutes to process 1GB of xml data. The main performance limit is memory - only one single-threaded process was running since every single large file (tens of megabytes) consumes a lot of memory - about 50 times the size of the file.

A few simple tests have shown this to be at least twice as fast as [jsonml's xlst-based converter](http://www.jsonml.org/xml/) (however, the outputs are not similar, as stated above).

Currently the program processes files serially. If run in parallel on many small XML files (<5MB) the performance becomes cpu-bound and processing may be *much* faster, depending on the architecture. A simple test showed performance of about 5MB / sec (on the same core-i5).






