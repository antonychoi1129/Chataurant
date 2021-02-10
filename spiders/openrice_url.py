import scrapy
import os

output_filename = 'openrice_urls.txt'

# try:
#     os.remove(output_filename)
# except OSError:
#     pass

class OpenRiceURLSpider(scrapy.Spider):
    name = "openriceurl"                                        
    def start_requests(self):
        headers = {
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
        }

        base = 'https://www.openrice.com/en/hongkong/restaurants'
        district = base + '/district/'
        districtList = ['kowloon', 'hong-kong-island' , 'new-territories']
        for where in districtList:
            for page in range(1, 18):
                url = district + where + '?page=' + str(page)
                # url = base + '?page=' + str(page) 
                yield scrapy.Request(url=url, headers=headers, callback=self.parse)


    def parse(self, response):
        output_filename = 'openrice_urls.txt'
        restaurant_link_selector = response.xpath('//h2[@class="title-name"]/child::node()/@href').extract()
        # print(restaurant_link_selector)
        for restaurant in restaurant_link_selector:
            restaurant_link = "https://www.openrice.com/" + restaurant;
            with open(output_filename, 'a') as output_file: # you should delete the intermediate file before you run the code
                 output_file.write(restaurant_link + '\n')

