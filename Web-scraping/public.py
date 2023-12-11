import re
from datetime import datetime

import requests
from bs4 import BeautifulSoup

publichealth_url = 'https://publichealthupdate.com/publichealthupdate/'

publichealth_page = requests.get(publichealth_url)
publichealth_soup = BeautifulSoup(publichealth_page.text, 'html')
article_list = publichealth_soup.find(
    'ul', class_="penci-wrapper-data penci-grid")

articles = article_list.find_all('li', class_="list-post pclist-layout")
print(articles)
for article in articles:

    headline = article.find('h2').text

    headline_link = article.find('a')['href']
    date_object = datetime.strptime(article.find('time').text, "%B %d, %Y")
    date = date_object.strftime("%Y-%m-%d")

    paragraph = article.find('p').text
    image = article.find('a')['data-bgset']
    print(image)
    data = {'english_date': date, 'headline': headline, 'image_url': image,
            'paragraph': paragraph, 'headline_link': headline_link}
print("public_health_news")
