import os
import xml.etree.ElementTree as ET

folder = "XMLS"
output_file = "output.csv"

with open(output_file, "w", encoding="utf-8") as out:
    for root_dir, _, files in os.walk(folder):
        for file in files:
            if not file.endswith(".xml"):
                continue

            full_path = os.path.join(root_dir, file)

            try:
                tree = ET.parse(full_path)
                root = tree.getroot()

                input_symbol = root.find(".//inputSymbol")
                if input_symbol is None or input_symbol.text != "_pdg_list":
                    continue

                values = [v.text for v in root.findall(".//value") if v.text]

                if values:
                    line = full_path + ";" + ";".join(values)
                    out.write(line + "\n")

            except Exception as e:
                print(f"Error in {full_path}: {e}")