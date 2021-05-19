# name-generator
Generates names based on a list of names provided.<br />
Works with Latin and Cyrillic scripts.
Isn't case-sensitive. "joHn, JAnE, CARL" will be rendered as "john, jane, carl".
Treats any non-alphabetic symbols and any number of them as single whitespaces. "John,,,, Jane ; ; Carl$$" will be rendered as "john, jane, carl".
CAUTION! This applies to names with non-alphabetic symbols within them as well. "John, Jane, D'Amato" will be rendered as "john, jane, d, amato".
Due to the way precision works here names, shorter than 3 sumbols will be discarded.
Additionally, names, shorter than 4 symbols will be discarded for medium precision, and names shorter than 5 symbols will be discarded for high precision.
