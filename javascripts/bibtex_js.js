// Issues:
//  no comment handling within strings
//  no string concatenation
//  no variable values yet

// Grammar implemented here:
//  bibtex -> (string | preamble | comment | entry)*;
//  string -> '@STRING' '{' key_equals_value '}';
//  preamble -> '@PREAMBLE' '{' value '}';
//  comment -> '@COMMENT' '{' value '}';
//  entry -> '@' key '{' key ',' key_value_list '}';
//  key_value_list -> key_equals_value (',' key_equals_value)*;
//  key_equals_value -> key '=' value;
//  value -> value_quotes | value_braces | key;
//  value_quotes -> '"' .*? '"'; // not quite
//  value_braces -> '{' .*? '"'; // not quite
function BibtexParser() {
  this.pos = 0;
  this.input = "";
  
  this.entries = {};
  this.strings = {
      JAN: "January",
      FEB: "February",
      MAR: "March",      
      APR: "April",
      MAY: "May",
      JUN: "June",
      JUL: "July",
      AUG: "August",
      SEP: "September",
      OCT: "October",
      NOV: "November",
      DEC: "December"
  };
  this.currentKey = "";
  this.currentEntry = "";
  

  this.setInput = function(t) {
    this.input = t;
  }
  
  this.getEntries = function() {
      return this.entries;
  }

  this.isWhitespace = function(s) {
    return (s == ' ' || s == '\r' || s == '\t' || s == '\n');
  }

  this.match = function(s) {
    this.skipWhitespace();
    if (this.input.substring(this.pos, this.pos+s.length) == s) {
      this.pos += s.length;
    } else {
      throw "Token mismatch, expected " + s + ", found " + this.input.substring(this.pos);
    }
    this.skipWhitespace();
  }

  this.tryMatch = function(s) {
    this.skipWhitespace();
    if (this.input.substring(this.pos, this.pos+s.length) == s) {
      return true;
    } else {
      return false;
    }
    this.skipWhitespace();
  }

  this.skipWhitespace = function() {
    while (this.isWhitespace(this.input[this.pos])) {
      this.pos++;
    }
    if (this.input[this.pos] == "%") {
      while(this.input[this.pos] != "\n") {
        this.pos++;
      }
      this.skipWhitespace();
    }
  }

  this.value_braces = function() {
    var bracecount = 0;
    this.match("{");
    var start = this.pos;
    while(true) {
      if (this.input[this.pos] == '}' && this.input[this.pos-1] != '\\') {
        if (bracecount > 0) {
          bracecount--;
        } else {
          var end = this.pos;
          this.match("}");
          return this.input.substring(start, end);
        }
      } else if (this.input[this.pos] == '{') {
        bracecount++;
      } else if (this.pos == this.input.length-1) {
        throw "Unterminated value";
      }
      this.pos++;
    }
  }

  this.value_quotes = function() {
    this.match('"');
    var start = this.pos;
    while(true) {
      if (this.input[this.pos] == '"' && this.input[this.pos-1] != '\\') {
          var end = this.pos;
          this.match('"');
          return this.input.substring(start, end);
      } else if (this.pos == this.input.length-1) {
        throw "Unterminated value:" + this.input.substring(start);
      }
      this.pos++;
    }
  }
  
  this.single_value = function() {
    var start = this.pos;
    if (this.tryMatch("{")) {
      return this.value_braces();
    } else if (this.tryMatch('"')) {
      return this.value_quotes();
    } else {
      var k = this.key();
      if (this.strings[k.toUpperCase()]) {
        return this.strings[k];
      } else if (k.match("^[0-9]+$")) {
        return k;
      } else {
        throw "Value expected:" + this.input.substring(start);
      }
    }
  }
  
  this.value = function() {
    var values = [];
    values.push(this.single_value());
    while (this.tryMatch("#")) {
      this.match("#");
      values.push(this.single_value());
    }
    return values.join("");
  }

  this.key = function() {
    var start = this.pos;
    while(true) {
      if (this.pos == this.input.length) {
        throw "Runaway key";
      }
    
      if (this.input[this.pos].match("[a-zA-Z0-9_:\\./-]")) {
        this.pos++
      } else {
        return this.input.substring(start, this.pos).toUpperCase();
      }
    }
  }

  this.key_equals_value = function() {
    var key = this.key();
    if (this.tryMatch("=")) {
      this.match("=");
      var val = this.value();
      return [ key, val ];
    } else {
      throw "... = value expected, equals sign missing:" + this.input.substring(this.pos);
    }
  }

  this.key_value_list = function() {
    var kv = this.key_equals_value();
    this.entries[this.currentEntry].entries = new Object();
    this.entries[this.currentEntry].entries[kv[0]] = kv[1];
    while (this.tryMatch(",")) {
      this.match(",");
      // fixes problems with commas at the end of a list
      if (this.tryMatch("}")) {
        break;
      }
      kv = this.key_equals_value();
      this.entries[this.currentEntry].entries[kv[0]] = kv[1];
    }
  }

  this.entry_body = function(directive) {
    this.currentEntry = this.key();
    this.entries[this.currentEntry] = new Object();    
    this.match(",");
    this.key_value_list();
    this.entries[this.currentEntry].directive = directive;
  }

  this.directive = function () {
    this.match("@");
    return "@"+this.key();
  }

  this.string = function () {
    var kv = this.key_equals_value();
    this.strings[kv[0].toUpperCase()] = kv[1];
  }

  this.preamble = function() {
    this.value();
  }

  this.comment = function() {
    this.value(); // this is wrong
  }

  this.entry = function(directive) {
    this.entry_body(directive);
  }

  this.bibtex = function() {
    while(this.tryMatch("@")) {
      var d = this.directive().toUpperCase();
      this.match("{");
      if (d == "@STRING") {
        this.string();
      } else if (d == "@PREAMBLE") {
        this.preamble();
      } else if (d == "@COMMENT") {
        this.comment();
      } else {
        this.entry(d);
      }
      this.match("}");
    }
  }
}

function BibtexDisplay() {
  this.fixValue = function (value) {
    value = value.replace(/\\glqq\s?/g, "&bdquo;");
    value = value.replace(/\\grqq\s?/g, '&rdquo;');
    value = value.replace(/\\ /g, '&nbsp;');
    value = value.replace(/\\url/g, '');
    value = value.replace(/---/g, '&mdash;');
    value = value.replace(/{\\"e}/g, '&euml;');
    value = value.replace(/{\\"a}/g, '&auml;');
    value = value.replace(/\{\\"o\}/g, '&ouml;');
    value = value.replace(/{\\"u}/g, '&uuml;');
    value = value.replace(/{\\"A}/g, '&Auml;');
    value = value.replace(/{\\"O}/g, '&Ouml;');
    value = value.replace(/{\\"U}/g, '&Uuml;');
    value = value.replace(/{\\'o}/g, '&oacute;');
    value = value.replace(/\\'{o}/g, '&oacute;');
    value = value.replace(/{\\'e}/g, '&eacute;');
    value = value.replace(/{\\`e}/g, '&egrave;');
    value = value.replace(/\\ss/g, '&szlig;');
    value = value.replace(/\\'\{e\}/g, '&eacute;');
    value = value.replace(/\{(.*?)\}/g, '$1');
    value = value.replace(/\\c{C}/g, '&Ccedil;');
    value = value.replace(/\\c{c}/g, '&ccedil;');
    return value;
  }

  this.displayBibtex2 = function(i, o) {
    var b = new BibtexParser();
    b.setInput(i);
    b.bibtex();

    var e = b.getEntries();
    var old = o.find("*");
  
    for (var item in e) {
      var tpl = $(".bibtex_template").clone().removeClass('bibtex_template');
      tpl.addClass("unused");
      
      for (var key in e[item]) {
      
        var fields = tpl.find("." + key.toLowerCase());
        for (var i = 0; i < fields.size(); i++) {
          var f = $(fields[i]);
          f.removeClass("unused");
          var value = this.fixValue(e[item][key]);
          if (f.is("a")) {
            f.attr("href", value);
          } else {
            var currentHTML = f.html() || "";
            if (currentHTML.match("%")) {
              // "complex" template field
              f.html(currentHTML.replace("%", value));
            } else {
              // simple field
              f.html(value);
            }
          }
        }
      }
    
      var emptyFields = tpl.find("span .unused");
      emptyFields.each(function (key,f) {
        if (f.innerHTML.match("%")) {
          f.innerHTML = "";
        }
      });
    
      o.append(tpl);
      tpl.show();
    }
    
    old.remove();
  }

  this.displayBibtexCitations = function(input) {
    keys = {}
    $('body').find('a.citation').each(function() {
	key = this.text;
	this.href = "#" + key;
	keys[key] = true;
     });

    this.displayBibtexCited(input,  $("#bibtex_display_citations"), keys);

    if ($('a.citation').length)
      $("#bibtex_display_citations").prepend("<h2 id='Bibliography'>Bibliography</h2>");
  }

  this.displayBibtex = function(input, output) {
    // parse bibtex input
    var b = new BibtexParser();
    b.setInput(input);
    b.bibtex();

    // iterate over bibTeX entries
    var entries = b.getEntries();
    this.printBibtex(entries, output);
  }

  this.displayBibtexCited = function(input, output, keys) {
    // parse bibtex input
    var b = new BibtexParser();
    b.setInput(input);
    b.bibtex();

    // iterate over bibTeX entries
    var entries = b.getEntries();
    var entriesCited = new Object();

    for (var entryKey in entries)
      if (keys[entryKey])
	entriesCited[entryKey] = entries[entryKey];

    this.printBibtex(entriesCited, output);
  }

  this.printBibtexEntry = function(entry, entryKey) {
    // find template
    var tpl = $(".bibtex_template").clone().removeClass('bibtex_template');
    
    // find all keys in the entry
    var keys = [];
    for (var key in entry.entries) {
      keys.push(key.toUpperCase());
    }

    var bibtex = entry.directive
    bibtex += '{' + entryKey + ',\n';
    var first = true;
    for (var key in entry.entries) {
	if (!first) {
	bibtex += ',\n';
	}
	first = false;
	bibtex += ' ' + key + ' = {'

	if (key == "ABSTRACT")
	bibtex += '\n  ';

	bibtex += entry.entries[key] + '}'

    }

    bibtex += '\n}\n';
    keys.push('BIBTEX');
    entry.entries['BIBTEX'] = bibtex;

    if ('ABSTRACT' in entry.entries) {
      value = entry.entries['ABSTRACT'];
      value = value.replace(/\n\n/g, '</p><p>');
      entry.entries['ABSTRACT'] = '<p>' + value + '</p>';
    }

    // find all ifs and check them
    var removed = false;
    do {
      // find next if
      var conds = tpl.find(".if");
      if (conds.size() == 0) {
        break;
      }
      
      // check if
      var cond = conds.first();
      cond.removeClass("if");
      var ifTrue = true;
      var classList = cond.attr('class').split(' ');
      $.each( classList, function(index, cls){
        if(keys.indexOf(cls.toUpperCase()) < 0) {
          ifTrue = false;
        }
        cond.removeClass(cls);
      });
      
      // remove false ifs
      if (!ifTrue) {
        cond.remove();
      }
    } while (true);
    
    // fill in remaining fields 
    //
    for (var index in keys) {
      var key = keys[index];
      var value = entry.entries[key] || "";

	if (key != 'BIBTEX') {
	value = this.fixValue(value);
	}
      tpl.find("span:not(a)." + key.toLowerCase()).html(value);
      tpl.find("a." + key.toLowerCase()).attr('href', value);
    }
    tpl.find("a.id").attr('name', entryKey);

    // Replace tab{1,2} classes with unique hrefs & ids    
    tpl.find("a.tab1").attr('href', "#" + entryKey + "-1");
    tpl.find("a.tab2").attr('href', "#" + entryKey + "-2");

    tpl.find("div.tab1").attr('id', entryKey + "-1");
    tpl.find("div.tab2").attr('id', entryKey + "-2");
    
    // 1. Enable collapsible tabs.
    // 2. Collapse all by default.
    // 3. Make jQueryUI treat url hrefs as links instead of tabs
    tpl.find("div.jqTabs").tabs(
      { collapsible: true,
        active: false,
      });
    tpl.find("a.url").unbind('click');

    tpl.show();
    return tpl;
  }

  this.unique = function(array) {
    array = array.sort();
    var results = [];
    console.log(array);
    for (var i = 0; i < array.length; i++) {
      if (i == 0 || array[i] != array[i-1]) {
        results.push(array[i]);
      }
    }
    return results.reverse();
  }

  this.printBibtex = function(entries, output) {
    // save old entries to remove them later
    var old = output.find("*");

    years = [];

    for (var entryKey in entries) {
      years.push(parseInt(entries[entryKey].entries["YEAR"]));
    }

    console.log(years)
    years = this.unique(years)
    console.log(years)

    for (var yearIdx in years) {
      var year = years[yearIdx];
      var outputGroup = output.append("<h3>" + year + "</h3>")
      for (var entryKey in entries) {
        entry = entries[entryKey];
        if (entry.entries["YEAR"] == year) {
          outputGroup.append(this.printBibtexEntry(entry, entryKey));
	}
      }
    }
    
    // remove old entries
    old.remove();
  }

}

function bibtex_js_draw() {
  $(".bibtex_template").hide();
  $("#bibtex_input").load('/Publications.bib', function() {
    (new BibtexDisplay()).displayBibtex($("#bibtex_input").val(), $("#bibtex_display"));
  });
}

function bibtex_js_citations() {
  $(".bibtex_template").hide();
  $("#bibtex_input").load('/Publications.bib', function() {
    (new BibtexDisplay()).displayBibtexCitations($("#bibtex_input").val());
  });
}

// check whether or not jquery is present
if (typeof jQuery == 'undefined') {  
  // an interesting idea is loading jquery here. this might be added
  // in the future.
  alert("Please include jquery in all pages using bibtex_js!");
} else {
  // draw bibtex when loaded
  $(document).ready(function () {
    // check for template, add default
    if ($(".bibtex_template").size() == 0) {
      $("body").append("<div class=\"bibtex_template\"><div class=\"if author\" style=\"font-weight: bold;\">\n  <span class=\"if year\">\n    <span class=\"year\"></span>, \n  </span>\n  <span class=\"author\"></span>\n  <span class=\"if url\" style=\"margin-left: 20px\">\n    <a class=\"url\" style=\"color:black; font-size:10px\">(view online)</a>\n  </span>\n</div>\n<div style=\"margin-left: 10px; margin-bottom:5px;\">\n  <span class=\"title\"></span>\n</div></div>");
    }

    bibtex_js_draw();
    bibtex_js_citations();
  });
}

