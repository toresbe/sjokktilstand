from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Options
import json
import time

options = Options()
options.add_argument('-headless')
driver = webdriver.Firefox(options=options)

driver.get('https://dagbladet.no/')

sjokk = [x.text for x in driver.find_elements(By.XPATH,"//header/*") if "sjokk" in x.text.lower()]

snapshot = {
    "sjokkCount": len(sjokk),
    "sjokk": sjokk,
    "timestamp": time.time()
}

print(json.dumps(snapshot))

driver.close()

