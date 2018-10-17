#!/bin/bash

set -e

function sed_in_place {
    quote="'"
    expr=$1
    echo "Expression is: $quote$expr$quote -----"
    shift 1
    files=$*
    for file in $files
    do
        backup=$file.bak
        sed "$expr" $file > $file.bak
        if [ $? -eq 0 ]; then
            mv $file.bak $file
        else
            echo "didn't work on $file"
            break
        fi
    done
}

css_files=$(find site -name '*.css')
echo "Here are all the CSS files:" $css_files

all_html_files=$(find site -name '*.html')

for old_name in $css_files
do
    old_base_name=$(basename $old_name)
    dir_name=$(dirname $old_name)
    new_base_name="fix-mime-type-$old_base_name";
    echo "Renaming $old_name to $new_base_name";
    sed_in_place "s/$old_base_name/$new_base_name/g" $all_html_files;
    mv $old_name $dir_name/$new_base_name;
done