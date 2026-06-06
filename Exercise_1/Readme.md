# Description
Create a script in powershell that will search recursivelly into folders, starting from a given path, for any folder named Action# (where # = number. ex: Action0).  
Filter only the Action# folder that doesn't have the file 'Script.mts' in it.
Return a list with all the fullpath `'Action#'` folders that are missing the *Script.mts*.

## More explanation
In the given folder-file structure there should be a file named *Script.mts* in every `'Action#'` folder.  
The goal of this exercise is to identify the folders that don't have it.

## Instructions
Run the `generate_random_folders.ps1` script to generate a random folder-file sample structure to work with.
You must use PowerShell.

## Deliverable
The solution script and the folder list in a text file.

## Goal
The goal is to see your level on common daily tasks our team has to deal with.
