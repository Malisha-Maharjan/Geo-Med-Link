import re
from datetime import datetime

import requests
from bs4 import BeautifulSoup


def nepali_to_english_date(nepali_date_str):
    # Define Nepali month names
    nepali_months = {
        'बैशाख': 1, 'जेठ': 2, 'असार': 3, 'साउन ': 4,
        'भदौ': 5, 'असोज': 6, 'कार्तिक': 7, 'मंसिर': 8,
        'पुस': 9, 'माघ': 10, 'फागुन': 11, 'चैत्र': 12,
    }
    day = int(nepali_date_str.split(" ")[0])
    month = nepali_months[nepali_date_str.split(" ")[1]]
    year = int(nepali_date_str.split(" ")[2])
    # print(day, month,year)
    return f"{year}-{month}-{day}"

#Medical News
medical_news_url = 'https://www.medicalnewstoday.com/news'
url ="http://localhost:8080/api/post/scrap"

medical_news_page = requests.get(medical_news_url)
medical_news_soup = BeautifulSoup(medical_news_page.text, 'html')
articles = medical_news_soup.find_all("li", class_="css-kbq0t")

for article in articles:
  date = article.find('div', class_="css-3be604")
  print(date)
  date_object = datetime.strptime(date.text, "%B %d, %Y")
  date = date_object.strftime("%Y-%m-%d")

  headline = article.find('h2', class_="css-5dw8ta").text
  headline_link = "https://www.medicalnewstoday.com"+ article.find('a', class_="css-1mttucs")['href']
  paragraph = article.find('p', class_="css-ur5q1p").text

  
  figure = article.find('figure', class_="css-43w9e3")

  image_url = ('http:' + figure.find('lazy-image')['src'])

  data = {'english_date': date, 'headline': headline, 'image_url': image_url, 'paragraph':paragraph, 'headline_link':headline_link}
  post = requests.post(url, json=data)
  print(post.json())
  if (post.json()['status'] == "error"):
    break

print("medical_news")


# Public health News
publichealth_url = 'https://publichealthupdate.com/publichealthupdate/'

publichealth_page = requests.get(publichealth_url)
publichealth_soup = BeautifulSoup(publichealth_page.text, 'html')
article_list = publichealth_soup.find('ul', class_="penci-wrapper-data penci-grid")

articles = article_list.find_all('li', class_="list-post pclist-layout")
print(articles)
for article in articles:

  headline = article.find('h2').text

  headline_link = article.find('a')['href']
  date_object = datetime.strptime(article.find('time').text, "%B %d, %Y")
  date = date_object.strftime("%Y-%m-%d")

  paragraph = article.find('p').text
  image = article.find('a')['href']
  data = {'english_date': date, 'headline': headline, 'image_url': image, 'paragraph':paragraph, 'headline_link':headline_link}
  post = requests.post(url, json=data)
  if (post.json()['status'] == "error"):
    break
print("public_health_news")

#Kathmandu Post
kathmandu_page_url = 'https://kathmandupost.com/health'
kathmandu_page = requests.get(kathmandu_page_url)
kathmandu_soup = BeautifulSoup(kathmandu_page.text, 'html')
news = kathmandu_soup.find('div', class_="block--morenews")
articles = news.find_all('article')
date_format = '%Y-%m-%d'
for article in articles:
  headline = article.find('h3').text
  image_url = article.find('img')['data-src']
  paragraph = article.find('p').text
  headline_link = "https://kathmandupost.com" + article.find('a')['href']

  date_pattern = r"/(\d{4})/(\d{2})/(\d{2})/"
  match = re.search(date_pattern, headline_link)
  # print(match[0])
  date = f"{match.group(1)}-{match.group(2)}-{match.group(3)}"
  data = {"headline": headline, "image_url":image_url,"paragraph": paragraph, "headline_link": headline_link,"english_date":date}
  post = requests.post(url, json=data)
  print(data)
  if (post.json()['status'] == "error"):
    break
print("kathmanduPost")

#ratopati
ratopati_url = 'https://www.ratopati.com/category/swasthya-khabar'
ratopati_page = requests.get(ratopati_url)
ratopati_soup = BeautifulSoup(ratopati_page.text, 'html')
articles = ratopati_soup.find_all('div', class_="columnnews mbl-col col3")
for article in articles:
  headline = (article.find('h3')).text
  headline_link = article.find('a')['href']
  sub_page = requests.get(headline_link)
  page = BeautifulSoup(sub_page.text, 'html')
  time = page.find('div', class_="post-hour").text
  components = time.split(',')
  date = nepali_to_english_date(components[1].strip())
  paragraphs = page.find('div', class_="news-contentarea")
  paragraph = paragraphs.find('p').text
  image_url = article.find("img")['data-src']
  data = {"headline": headline, "image_url":image_url,"paragraph": paragraph, "headline_link": headline_link,"nepali_date":date}
  post = requests.post(url, json=data)
  if (post.json()['status'] == "error"):
    break
print("ratopati")
  