import numpy
import pandas
import csv
from sklearn.preprocessing import Imputer

#Filling missing values in Facebook dataset -
dataFrameFacebook = pandas.read_csv('C:/Users/Kriti Shrivastava/PycharmProjects/Homework2/data/dataset_Facebook-table.csv');
dataFrameFacebookCleaned = dataFrameFacebook.interpolate(method='linear');
dataFrameFacebookCleaned.to_csv('C:/Users/Kriti Shrivastava/PycharmProjects/Homework2/data/Facebook_output.csv');

#Reading and adding the wine type column in the wine dataset
with open('C:/Users/Kriti Shrivastava/PycharmProjects/Homework2/data/winequality-white.csv','r') as whiteWineInput:
    with open('C:/Users/Kriti Shrivastava/PycharmProjects/Homework2/data/WineQuality_output.csv', 'w') as whiteWineOutput:
        writer = csv.writer(whiteWineOutput, lineterminator='\n')
        reader = csv.reader(whiteWineInput)
        all = []
        row = next(reader)
        row.append('Type')
        all.append(row)
        for row in reader:
            row.append('White')
            all.append(row)
        writer.writerows(all)

with open('C:/Users/Kriti Shrivastava/PycharmProjects/Homework2/data/winequality-red.csv','r') as redWineInput:
    with open('C:/Users/Kriti Shrivastava/PycharmProjects/Homework2/data/WineQuality_output.csv', 'a+') as redWineOutput:
        writer = csv.writer(redWineOutput, lineterminator='\n')
        reader = csv.reader(redWineInput)
        all = []
        row = next(reader)
        for row in reader:
            row.append('Red')
            all.append(row)
        writer.writerows(all)
