#!/bin/bash

# The directory to extract source comments from
srcdir=~/src/php-src/

# Generate a status bar that lasts a random amount of time.
# The actual amount of time is somewhere between 1.5 and 30
# seconds... I think. I fudged this around so much it's hard to tell.
function randstatus() {
    bsize=4096
    r_rate=$(echo "$RANDOM/32767 * $bsize * 1.5 + $bsize / 4" | bc -l | sed 's/\..*$//')
    r_min=3
    r_max=15
    r_val=$(($r_min + $RANDOM % $(($r_max - $r_min)) ))
    i=0
    dd if=/dev/urandom bs=$bsize count=$r_val 2> /dev/null | pv -L $bsize -s $(($r_val * bsize)) > /dev/null
}

# Picks a random .c file from the given directory, parses
# out one-line comments, and outputs them one by one with a
# random delay between each line.
function randout() {
    r_file=$(find $1 -name '*.c' | sort -R | head -n 1)
    echo "# $r_file"
    grep '^\s*/\*.*\*/\s*$' $r_file | sed 's:[/\*]::g' | sed -e 's:^\s\+::' -e 's:\s\+$::' | sed -e 's:^\W\+::' | grep -v '^$' | while read line; do
        echo $line
        sleep $(printf "%0.2f" $(echo "$((($RANDOM%4)+1))/4" | bc -l))
    done
}

while true; do
    randout $srcdir
    randstatus
    # sleep here to make it easier to break out of the 'while read' loop
    sleep 2
done