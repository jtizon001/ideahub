import csv


class TweetCsv:

    def __init__(self, filename):
        with open(filename, "r") as f_input:
            csv_input = csv.reader(f_input)
            self.details = list(csv_input)

    # Returns specific tweet currently but will be tasked with stripping tweets from
    # Twitter response and storing to a file and returning text
    def isolate_tweets(self):
        i = 1
        num_of_rows = self.details.__len__()
        text = ''
        while i < num_of_rows:
            text += self.details[i][4] + '\n'
            i += 1
        # print(text)
        return text

