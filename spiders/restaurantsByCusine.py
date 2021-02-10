import scrapy
import os

output_filename = 'openrice_urls.txt'

# try:
#     os.remove(output_filename)
# except OSError:
#     pass

class OpenRiceURLSpider(scrapy.Spider):
    name = "cuisineurl"                                        
    def start_requests(self):
        headers = {
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
        }

        base = 'https://www.openrice.com/en/hongkong/restaurants'
        #district = base + '/district/'
        districtList = ['kowloon', 'hong-kong-island' , 'new-territories']
        districtID = ['4011','4005','4003','4004','4010','4001','4002','4009','4006','4999','35259','35260','3020','3006','3016','3004','3003','3005','3010','3022','3017','3018','3019','3015','3021','3011','3001','3008','3014','3002','3009','3013','3007','3012','3999','2025','2012','2024','2026','2006','2003','2032','2021','2027','2022','2020','2030','2001','2002','2007','2004','2009','2015','9008','2008','2028','2011','2005','2010','2029','2019','2013','2016','2031','2999','1010','1007','1015','1027','1016','1020','1012','9151','1021','1013','1024','1018','1009','1023','1014','1004','1026','1025','1019','1017','1022','1011','1002','1005','9007','9006','1003','1001','5242','5244','5243','1008','999']
        cuisineID = ['6000','5005','5004','5001','4006','4005','4004','4003','4002','4001','4000','3034','3033','3022','3021','3013','3012','3011','3010','3009','3008','3007','3006','3005','3004','3003','3001','2024','2023','2022','2021','2013','2010','2009','2008','2007','2006','2005','2004','2003','2002','2001','1033','1032','1031','1030','1027','1026','1024','1021','1018','1017','1016','1015','1014','1013','1012','1011','1010','1009','1008','1007','1005','1004','1003','1002','1001']
        for district in districtID:
            for cuisine in cuisineID:
                for page in range(1, 18):
                    url = base + '?cuisineId=' + cuisine + '&districtId=' + district + '&page=' + str(page)
                    # url = base + '?page=' + str(page) 
                    yield scrapy.Request(url=url, headers=headers, callback=self.parse)


    def parse(self, response):
        output_filename = 'openrice_cuisine_urls.txt'
        restaurant_link_selector = response.xpath('//h2[@class="title-name"]/child::node()/@href').extract()
        # print(restaurant_link_selector)
        for restaurant in restaurant_link_selector:
            restaurant_link = "https://www.openrice.com/" + restaurant;
            with open(output_filename, 'a') as output_file: # you should delete the intermediate file before you run the code
                 output_file.write(restaurant_link + '\n')

