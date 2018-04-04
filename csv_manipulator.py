import csv


class TweetCsv:

    def __init__(self, filename):
        with open(filename, "r") as f_input:
            csv_input = csv.reader(f_input)
            self.details = list(csv_input)

    # Returns specific tweet currently but will be tasked with stripping tweets from
    # Twitter response and storing to a file and returning text
    def get_cell(self, col, row):
        return self.details[row-1][col-1]
