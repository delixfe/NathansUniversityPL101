start =
    wordlist

word =
    chars: [a-z] + { return chars.join(""); }

whitespace = 
    [ ]* { return ""; }

spacedword = 
    word:word whitespace:whitespace { return word; }

wordlist =
    spacedword+ 