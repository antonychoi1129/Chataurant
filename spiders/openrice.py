import scrapy
import json
import os

# try:
#     os.remove('openrice_data.json')
# except OSError:
#     pass



class OpenriceSpider(scrapy.Spider):
    name = 'openrice'
    allowed_domains = ['www.openrice.com']

    def start_requests(self):
        headers = {
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
        }
       
        try:
            # file = open('cuisineurls.txt', "r")
            file = open('test.txt', "r")
            for line in file:
                if "%E" in line:
                    #print("ERROR: CHINESE URL. Skipping: " + line)
                    continue
                else:
                    print("Scraping: " + line)
                    pass 

                yield scrapy.Request(url=line.strip(), headers=headers, callback=self.parse)
           
        finally:
            file.close()
         
    def parse(self, response):
        restaurant_data = {}
        restaurant_data['Opening Hours Date'] = []
        restaurant_data['Opening Hours Time'] = []

        # below line extracts a script node from the beginning of the html that includes lots of useful informtation
        raw_data = response.xpath('//*[@id="global-container"]/main/script[1]/text()').extract()
        restaurant_data['Telephone'] =  response.xpath('//*[@class="telephone-section"]/div[@class="content"]/text()').get(default='not-found')
        OpeningHours =  response.xpath('//*[@class="opening-hours-day"]')

        OpeningHoursDate = OpeningHours.xpath('.//div[@class="opening-hours-date "]/text()').getall()
        for i in range(1, len(OpeningHoursDate)): 
            restaurant_data['Opening Hours Date'].append(OpeningHoursDate[i])

        times = OpeningHours.xpath('.//div[@class="opening-hours-time"]')
        for j in range(1,len(times)): 
            time = times[j].xpath('.//div/text()')
            l = len(time)
            time = time.getall()
            str = time[0]
            for i in range(1, l):
                str += ", " + time[i]
            restaurant_data['Opening Hours Time'].append(str)

        restaurant_data['Latitude'] = response.xpath('//div[@id="poi-report-map-container"]/@data-latitude').get()
        restaurant_data['Longitude'] = response.xpath('//div[@id="poi-report-map-container"]/@data-longitude').get()
       
        try:
            os.remove('temp.json')
        except OSError:
            pass

        # # this stores that information into a new file as a json
        with open('temp.json', 'w') as outfile:
            for x in raw_data:
                outfile.write(x)
            outfile.close()


        # # this immediately opens up that newly created file to read it back in as a json
        with open('temp.json') as json_data:
            data = json.load(json_data)
            restaurant_data['name'] = data['name']
            restaurant_data['address'] = data['address']['streetAddress']
            restaurant_data['cuisine'] = data['servesCuisine']
            json_data.close()

        print("parsing" + restaurant_data['name'])
        #The above functions work well, but theres still some data that we have to strip from the rest of the page:

        with open('openrice_data.json', 'a', encoding='utf-8') as outfile:
            if os.path.getsize('openrice_data.json') == 0:
                outfile.write("{\n")
            else:
                outfile.truncate()
                outfile.write(",\n")
            json.dump(restaurant_data, outfile, ensure_ascii=False, indent=4)

    

        # try:
        #     # os.remove('temp.json') 
        # except OSError:
        #     pass
