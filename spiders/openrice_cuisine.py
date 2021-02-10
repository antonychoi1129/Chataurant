import scrapy
import os

output_filename = 'openrice_cuisine.txt'

# or-route-sr1-filters-cuisine
class OpenRiceURLSpider(scrapy.Spider):
    name = "cuisine"                                        
    def start_requests(self):
        headers = {
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
        }
        base = 'https://www.openrice.com/en/hongkong/restaurants'
        yield scrapy.Request(url=base, headers=headers, callback=self.parse)

    def parse(self, response):
        # restaurant_link_selector = response.xpath('//div[@class="flex-wrap js-flex-wrap"]/child::node()/@data-param').extract()
        restaurant_link_selector = response.xpath('//div[@class="or-section-level-2 js-or-section-level-2 panel or-panel"]/[@class="btn"]/@data-param').extract()

        for restaurant in restaurant_link_selector:
            print(restaurant)
            with open(output_filename, 'a') as output_file: # you should delete the intermediate file before you run the code
                 output_file.write(restaurant + '\n')

