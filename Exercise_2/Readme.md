# Description  
In the folder XMLS you will find some xml files.  
Export to a csv file, a list of the xml's fullpath that contains the tag `inputSymbol` with value `<_pdg_list>`.  
Get the value of the `<value>` tag and append it on the same line.  

## More explanation
The csv file should look like this:
```
C:\SomePath\xmlFileName1.xml;_pdg_1;_pdg_2
C:\SomePath\xmlFileName2.xml;_pdg_1;_pdg_2;_pdg_3
C:\SomePath\xmlFileName5.xml;_pdg_1
```  

- where: 
  - xmlFileName#.xml = xml file name
  - _pdg_x = the value of the *_pdg_list* tag


## Instructions
You may use any scripting language (batch, bash, powershell, etc) or python.

## Deliverable
The solution script and the csv file.

## Goal
The goal is to see your level on common daily tasks our team has to deal with.
