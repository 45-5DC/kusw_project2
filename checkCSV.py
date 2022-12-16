import pathlib
import os
from IPython.display import clear_output
import pandas as pd
from PIL import Image
from tqdm import tqdm

def makeCSV(path, label, tag):
    path = pathlib.PosixPath(path)
    print(path)
    generator_png = path.glob("./*.png")
    generator_jpg = path.glob("./*.jpg")
    nullList = list()
    fileList = list()

    i = 0
    while True:
        i += 1
        try:
            filepath = generator_png.__next__()
            if os.stat(filepath).st_size == 0:
                nullList.append(filepath)
            else:
                fileList.append(filepath)
        except:
            break
        if i % 1000 == 0:
            clear_output()
            print(i)

    while True:
        i += 1
        try:
            filepath = generator_jpg.__next__()
            if os.stat(filepath).st_size == 0:
                nullList.append(filepath)
            else:
                fileList.append(filepath)
        except:
            break
        if i % 1000 == 0:
            clear_output()
            print(i)
    csv = pd.DataFrame({
        'filepath': fileList,
        'label': label,
        'tag': tag
    })
    return csv, nullList

def checkCSV(csvpath):
    nullList = list()

    df = pd.read_csv(csvpath)
    len_ = len(df)
    filepath = df.filepath.values
    for i, path in enumerate(filepath):
        clear_output()
        print(f"tota {len_}  {i} : current path is {path}")
        if os.stat(path).st_size == 0:
            nullList.append(path)
    
    if nullList:
        return nullList
    else:
        print("CSV is checked!")
        return









    
    return csv, nullList