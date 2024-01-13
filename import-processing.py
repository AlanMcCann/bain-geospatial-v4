#!/usr/bin/env python
# coding: utf-8

# In[26]:


# Imports

import json
import geojson
import geopandas
import pandas as pd
import csv
import copy
import ast
import os
from collections import OrderedDict

from geojson import Feature, Point, FeatureCollection


# In[27]:


fips_codes = {
 '01': {'abbr': 'AL', 'full_name': 'alabama'},
 '02': {'abbr': 'AK', 'full_name': 'alaska'},
 '04': {'abbr': 'AZ', 'full_name': 'arizona'},
 '05': {'abbr': 'AR', 'full_name': 'arkansas'},
 '06': {'abbr': 'CA', 'full_name': 'california'},
 '08': {'abbr': 'CO', 'full_name': 'colorado'},
 '09': {'abbr': 'CT', 'full_name': 'connecticut'},
 '10': {'abbr': 'DE', 'full_name': 'delaware'},
 '11': {'abbr': 'DC', 'full_name': 'district_of_columbia'},
 '12': {'abbr': 'FL', 'full_name': 'florida'},
 '13': {'abbr': 'GA', 'full_name': 'georgia'},
 '15': {'abbr': 'HI', 'full_name': 'hawaii'},
 '16': {'abbr': 'ID', 'full_name': 'idaho'},
 '17': {'abbr': 'IL', 'full_name': 'illinois'},
 '18': {'abbr': 'IN', 'full_name': 'indiana'},
 '19': {'abbr': 'IA', 'full_name': 'iowa'},
 '20': {'abbr': 'KS', 'full_name': 'kansas'},
 '21': {'abbr': 'KY', 'full_name': 'kentucky'},
 '22': {'abbr': 'LA', 'full_name': 'louisiana'},
 '23': {'abbr': 'ME', 'full_name': 'maine'},
 '24': {'abbr': 'MD', 'full_name': 'maryland'},
 '25': {'abbr': 'MA', 'full_name': 'massachusetts'},
 '26': {'abbr': 'MI', 'full_name': 'michigan'},
 '27': {'abbr': 'MN', 'full_name': 'minnesota'},
 '28': {'abbr': 'MS', 'full_name': 'mississippi'},
 '29': {'abbr': 'MO', 'full_name': 'missouri'},
 '30': {'abbr': 'MT', 'full_name': 'montana'},
 '31': {'abbr': 'NE', 'full_name': 'nebraska'},
 '32': {'abbr': 'NV', 'full_name': 'nevada'},
 '33': {'abbr': 'NH', 'full_name': 'new_hampshire'},
 '34': {'abbr': 'NJ', 'full_name': 'new_jersey'},
 '35': {'abbr': 'NM', 'full_name': 'new_mexico'},
 '36': {'abbr': 'NY', 'full_name': 'new_york'},
 '37': {'abbr': 'NC', 'full_name': 'north_carolina'},
 '38': {'abbr': 'ND', 'full_name': 'north_dakota'},
 '39': {'abbr': 'OH', 'full_name': 'ohio'},
 '40': {'abbr': 'OK', 'full_name': 'oklahoma'},
 '41': {'abbr': 'OR', 'full_name': 'oregon'},
 '42': {'abbr': 'PA', 'full_name': 'pennsylvania'},
 '44': {'abbr': 'RI', 'full_name': 'rhode_island'},
 '45': {'abbr': 'SC', 'full_name': 'south_carolina'},
 '46': {'abbr': 'SD', 'full_name': 'south_dakota'},
 '47': {'abbr': 'TN', 'full_name': 'tennessee'},
 '48': {'abbr': 'TX', 'full_name': 'texas'},
 '49': {'abbr': 'UT', 'full_name': 'utah'},
 '50': {'abbr': 'VT', 'full_name': 'vermont'},
 '51': {'abbr': 'VA', 'full_name': 'virginia'},
 '53': {'abbr': 'WA', 'full_name': 'washington'},
 '54': {'abbr': 'WV', 'full_name': 'west_virginia'},
 '55': {'abbr': 'WI', 'full_name': 'wisconsin'},
 '56': {'abbr': 'WY', 'full_name': 'wyoming'}}


# In[28]:


# Input Files
# 2 => "02"
def formatted_state_fips_code(fips_number):
    return f'{fips_number:02d}'

#  block_group_geojson_filename(state_fips_code=46, year=2010)
# tl_2010_46_bg10.json
def block_group_geojson_filename(state_fips_code=1, census_year=2010):
    year_string = str(census_year)
    fips_code_string = formatted_state_fips_code(state_fips_code)
    return f'tl_{year_string}_{fips_code_string}_bg10.json'

# wa_washington_zip_codes_geo.min.json
def zip_code_geojson_filename(state_fips_code=1):
    formatted_fips_code = formatted_state_fips_code(state_fips_code)
    state_abbr = fips_codes[formatted_fips_code]["abbr"].lower()
    state_full_name = fips_codes[formatted_fips_code]["full_name"]
    return f'{state_abbr}_{state_full_name}_zip_codes_geo.min.json'


def zip_geojson_files_for_market(market_data):
    fips_codes = json.loads(market_data['StateFips'])
    files = []
    for fips_code in fips_codes:
        files.append(zip_code_geojson_filename(fips_code))
    return files

def bg_geojson_files_for_market(market_data, census_year):
    fips_codes = json.loads(market_data['StateFips'])
    files = []
    for fips_code in fips_codes:
        files.append(block_group_geojson_filename(state_fips_code=int(fips_code), census_year=census_year))
    return files

def read_geo_gson_file(file_path):
    with open(file_path) as f:
        gj = geojson.load(f)
        features = gj['features']
    print(f'Loaded {len(features)} features from {file_path}')
    return  features

def read_geojson_files(file_paths, base_path = "./"):
    features = []
    for file_path in file_paths:
        features += read_geo_gson_file(os.path.join(base_path, file_path))
    return features
    

def read_market_zip_code_usage(market_file_prefix, base_path="./source_data" ):
    data_type = "zip"
    csv_file_path = mapping_data_file_path(market_file_prefix, base_path=base_path, data_type=data_type)
    data_rows = []
    with open(csv_file_path, encoding='utf-8-sig') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            data_rows.append(row)
    zip_codes = []
    for data_row in data_rows:
        zip_codes.append(data_row['Zip'].zfill(5))
    print(f'Loaded {len(zip_codes)} zip_codes from {csv_file_path}')
    return zip_codes
        
def read_market_block_group_usage(market_file_prefix, base_path="./source_data" ):
    data_type = "bg"
    csv_file_path = mapping_data_file_path(market_file_prefix, base_path=base_path, data_type=data_type)
    data_rows = []
    with open(csv_file_path, encoding='utf-8-sig') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            data_rows.append(row)
    block_groups = []
    for data_row in data_rows:
        block_groups.append(data_row['BG'].zfill(12))
    print(f'Loaded {len(block_groups)} block groups from {csv_file_path}')
    return block_groups
        
# market_file_prefix = 'DallasFortWorth'
# market_prefix= 'dfw'
# DallasFortWorth__Mapping_BG_Data.csv
# ./source_data/{market_file_prefix}__Mapping_BG_Data.csv - the actual zip code data
# 
# DallasFortWorth__Mapping_Zip_Data.csv
# ./source_data/{market_file_prefix}__Mapping_Zip_Data.csv - the actual block group data
# 
# DallasFortWorth__Mapping_Settings_Transposed File_BG.csv
# ./source_data/{market_file_prefix}__Mapping_Settings_Transposed_File_BG.csv - segment definitions for Block Groups
# DallasFortWorth__Mapping_Settings_Transposed File_Zip.csv
# ./source_data/{market_file_prefix}__Mapping_Settings_Transposed_File_Zip.csv - segment definitions for Zip Codes

def file_type_for_data_type(data_type = "zip"):
    if data_type == "zip": 
        return "Zip"
    if data_type == "bg":
        return "BG"

# DallasFortWorth__Mapping_BG_Data.csv
# ./source_data/{market_file_prefix}__Mapping_BG_Data.csv - the actual zip code data
# 
# DallasFortWorth__Mapping_Zip_Data.csv
# ./source_data/{market_file_prefix}__Mapping_Zip_Data.csv - the actual block group data
# 
def mapping_data_file_path(market_file_prefix, base_path="./source_data", data_type = "zip"):
    file_type = file_type_for_data_type(data_type = data_type)
    return f'{base_path}/{market_file_prefix}__Mapping_{file_type}_Data.csv'

# DallasFortWorth__Mapping_Settings_Transposed File_BG.csv
# ./source_data/{market_file_prefix}__Mapping_Settings_Transposed_File_BG.csv - segment definitions for Block Groups
# DallasFortWorth__Mapping_Settings_Transposed File_Zip.csv
# ./source_data/{market_file_prefix}__Mapping_Settings_Transposed_File_Zip.csv - segment definitions for Zip Codes
def map_settings_data_file_path(market_file_prefix, base_path="./source_data", data_type = "zip"):
    file_type = file_type_for_data_type(data_type = data_type)
    return f'{base_path}/{market_file_prefix}__Mapping_Settings_Transposed File_{file_type}.csv'

def published_map_data_path(market_prefix,  data_type = "zip", published_data_base_path="./public"):
    return f'{published_data_base_path}/{market_prefix}_{data_type}_data.json'

def published_map_settings_path(market_prefix,  data_type = "zip", published_data_base_path="./public"):
    return f'{published_data_base_path}/{market_prefix}_{data_type}_settings_data.json'

def published_map_labels_path(market_prefix,  data_type = "zip", published_data_base_path="./public"):
    return f'{published_data_base_path}/{market_prefix}_{data_type}_labels.json'

def read_mapping_data(market_file_prefix, base_path='./source_data', data_type='zip'):
    data_rows = []
    csv_file_path = mapping_data_file_path(market_file_prefix, base_path=base_path, data_type = data_type)
    with open(csv_file_path) as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            data_rows.append(row)
    print(f'Loaded {len(data_rows)} data rows from {csv_file_path}')
    return data_rows

def create_zip_features(features, zip_data_rows):
    new_features_to_keep = []
    for data_row in zip_data_rows:
        zip_code = data_row['Zip'].zfill(5)
        # find the associated feature
        for feature in features:
            if feature['properties']["ZCTA5CE10"] == zip_code:
                new_feature = copy.deepcopy(feature)
                for key in data_row.keys():
                    if key != 'Zip':
                        if data_row[key]:
                            if data_row[key] != 'inf':
                                new_feature['properties'][key] =  ast.literal_eval(data_row[key].replace(',',''))
                new_features_to_keep.append(new_feature)
                break
    print(f'Processed {len(new_features_to_keep)} features to use')
    return new_features_to_keep

def create_bg_features(features, bg_data_rows):
    new_features_to_keep = []
    for data_row in bg_data_rows:
        block_group = str(data_row['BG']).zfill(12)
        # find the associated feature
        found = False
        for feature in features:
            if feature['properties']["GEOID10"] == block_group:
                found = True
                new_feature = copy.deepcopy(feature)
                for key in data_row.keys():
                    if key != 'BG':
                        if data_row[key] and data_row[key] != 'inf':
                            new_feature['properties'][key] =  ast.literal_eval(data_row[key].replace(',',''))
                new_features_to_keep.append(new_feature)
                break
    #         if found == False:
    #             print(f'failed: {block_group}')
    print(f'Processed {len(new_features_to_keep)} features to use')
    return new_features_to_keep

def create_geojson(features):
    print(f'Created GeoJson with  {len(features)} features')
    return FeatureCollection(features)

def write_geojson(geojson_data, market_prefix, data_type='zip',published_data_base_path = "./public"):
    geojson_string = geojson.dumps(geojson_data, sort_keys=True)
    f = open(f'{published_data_base_path}/{market_prefix}_{data_type}_data.json', "w")
    f.write(geojson_string)
    f.close()
    print(f'Wrote geojson data to  {published_data_base_path}/{market_prefix}_{data_type}_data.json')
    
def read_map_settings(market_file_prefix, base_path="./source_data", data_type = "zip"):
    data_rows = []
    csv_file_path = map_settings_data_file_path(market_file_prefix, base_path=base_path, data_type = data_type)
    with open(csv_file_path, encoding='utf-8-sig') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            data_rows.append(row)
    print(f'Loaded {len(data_rows)} data rows from {csv_file_path}')   
    return data_rows

def write_settings_data(settings_data, market_file_prefix, base_path="./public", data_type = "zip"):
    processed_settings_data = OrderedDict()
    for row in settings_data:
        if row["Display_Data_Type"] == "HH_Count":
            row["Display_Data_Type"] = "HH Count"
        processed_settings_data[row['UniqueSeriesString']] = row
    json_string = json.dumps(processed_settings_data, indent = 2, sort_keys=False)
    settings_data_file_path = published_map_settings_path(market_file_prefix,  data_type = data_type, published_data_base_path=base_path)
    f = open(settings_data_file_path, "w")
    f.write(json_string)
    f.close()
    print(f'Wrote settings data rows to {settings_data_file_path}') 
    
def create_zip_labels(market_file_prefix, base_path="./source_data" , data_type = "zip" , published_data_base_path="./public"):
    data_rows = []
    #     csv_file_path = './DFW_Mapping_data.csv'
    csv_file_path = mapping_data_file_path(market_file_prefix, base_path=base_path, data_type = "zip")
    with open(csv_file_path, encoding='utf-8-sig') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            data_rows.append(row)

    features = []
    for data_row in data_rows:
        feature =  { 
            "type": "Feature", 
            "properties": {
                "id": data_row['Zip']
            },
            "geometry": { 
                "type": "Point", 
                "coordinates": [ float(data_row['intptlong']), float(data_row['intptlat']) ]
            }
        }

        features.append(feature)
    geo_json = {
        "type": "FeatureCollection",
        "features": features
    }
    json_string = json.dumps(geo_json, indent = 2, sort_keys=True)
    output_file_path = published_map_labels_path(market_file_prefix,  data_type , published_data_base_path="./public")
    f = open(output_file_path, "w")
    f.write(json_string)
    f.close()
    print(f'Wrote geojson labels data to  {output_file_path}')

def create_bg_labels(market_file_prefix, base_path="./source_data" , data_type = "bg" , published_data_base_path="./public"):
    data_rows = []
    #     csv_file_path = './DFW_Mapping_data.csv'
    csv_file_path = mapping_data_file_path(market_file_prefix, base_path=base_path, data_type = "bg")
    with open(csv_file_path, encoding='utf-8-sig') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            data_rows.append(row)

    features = []
    for data_row in data_rows:
        feature =  { 
            "type": "Feature", 
            "properties": {
                "id": data_row['BG']
            },
            "geometry": { 
                "type": "Point", 
                "coordinates": [ float(data_row['LONG']), float(data_row['LAT']) ]
            }
        }

        features.append(feature)
    geo_json = {
        "type": "FeatureCollection",
        "features": features
    }
    json_string = json.dumps(geo_json, indent = 2, sort_keys=True)
    output_file_path = published_map_labels_path(market_file_prefix,  data_type , published_data_base_path="./public")
    f = open(output_file_path, "w")
    f.write(json_string)
    f.close()
    print(f'Wrote geojson labels data to  {output_file_path}')

def create_geojson_settings(csv_file_path, published_data_base_path = "./public"):

    geospatial_settings = OrderedDict()
    csv_file_path = f'{source_data_base_path}/Market_Mapping_Settings.csv'
    with open(csv_file_path, encoding='utf-8-sig') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            geospatial_settings[row['MarketName']] = row
    geojson_string = json.dumps(geospatial_settings, indent=4, sort_keys=True)
    f = open(f'{published_data_base_path}/geospatial_settings.json', "w")
    f.write(geojson_string)
    f.close()
    print(f'Wrote geospatials settings data to  {published_data_base_path}/geospatial_settings.json')
    


# In[29]:


def process_main_geo_data(source_data_base_path, geojson_files_base_path, published_data_base_path, census_year):
    csv_file_path = f'{source_data_base_path}/Market_Mapping_Settings.csv'
    market_rows = []
    with open(csv_file_path, encoding='utf-8-sig') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            market_rows.append(row)
    market_count = 0
    completed_markets = []
    for market_data in market_rows:
        # if market_data['MarketName'] in ['Texas','DallasFortWorth']:
        if True:
            print("")
            print(f'Market Data: {market_count + 1}')
            print(market_data)
            market_file_prefix = market_data['MarketName']
            market_prefix = market_file_prefix
            # Zip Processing     
            data_type = 'zip'
            print(f'market: {market_prefix}')
            geojson_files = zip_geojson_files_for_market(market_data)
            zip_codes = read_market_zip_code_usage(market_file_prefix, base_path=source_data_base_path )
            zip_data_rows = read_mapping_data(market_file_prefix, source_data_base_path, data_type)
            features = read_geojson_files(geojson_files, base_path=geojson_files_base_path)
            features_to_use = create_zip_features(features, zip_data_rows)
            new_geojson = create_geojson(features_to_use)
            write_geojson(new_geojson, market_prefix, data_type, published_data_base_path=published_data_base_path)
            map_settings_data = read_map_settings(market_file_prefix, base_path=source_data_base_path, data_type = "zip")
            write_settings_data(map_settings_data, market_prefix, base_path=published_data_base_path, data_type = "zip")
            create_zip_labels(market_file_prefix, base_path=source_data_base_path , data_type = "zip" , published_data_base_path=published_data_base_path)
            # Block Group Processing
            data_type = 'bg'
            geojson_files = bg_geojson_files_for_market(market_data,census_year )
            block_groups = read_market_block_group_usage(market_file_prefix, base_path=source_data_base_path )
            block_group_rows = read_mapping_data(market_file_prefix, source_data_base_path, data_type)
            features = read_geojson_files(geojson_files, base_path=geojson_files_base_path)
            features_to_use = create_bg_features(features, block_group_rows)
            new_geojson = create_geojson(features_to_use)
            write_geojson(new_geojson, market_prefix, data_type, published_data_base_path=published_data_base_path)
            map_settings_data = read_map_settings(market_file_prefix, base_path=source_data_base_path, data_type = "bg")
            write_settings_data(map_settings_data, market_prefix, base_path=published_data_base_path, data_type = "bg")
            create_bg_labels(market_file_prefix, base_path=source_data_base_path , data_type = "bg" , published_data_base_path=published_data_base_path)
            market_count += 1
    # Finished states - create overall settings file    
    create_geojson_settings(csv_file_path, published_data_base_path = "./public")
    print(f'*** COMPLETED {market_count} markets')
    print(completed_markets)
                          
        
# source_data_base_path = "./source_data"
# source_data_base_path = "/Users/alanmccann/Dropbox/bain/bain-uploads/v5_9th_run Brian Stobie/"
# published_data_base_path = "./public"
# geojson_files_base_path = '/Users/alanmccann/Dropbox/bain/map_source_data'
# census_year = 2010


# In[30]:


def create_chart_json(published_data_base_path = "./public"):
    csv_file_path = f'{source_data_base_path}/Chart_Data_File.csv'
    chart_data_rows = []
    with open(csv_file_path, encoding='utf-8-sig') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            chart_data_rows.append(row)
    data_json = {}
    for row in chart_data_rows:
        region = row['Region']
        # segment = row['Segment']
        year = row['Year']
        urban = row['Urban']
        suburban = row['SubUrban']
        exurban = row['ExUrban']
        print(region,year)
        print(urban, suburban, exurban)
        urban = '%.10f' % float(row['Urban'])
        suburban = '%.10f' % float(row['SubUrban'])
        exurban = '%.10f' % float(row['ExUrban'])
        display_region = row['DisplayRegion']
        if region not in data_json.keys():
            data_json[region] = {'displayRegion': display_region, 'data': {}}
        if year not in data_json[region]['data'].keys():
            data_json[region]['data'][year] = {}
        if 'Urban' not in data_json[region]['data'][year].keys():
            data_json[region]['data'][year]['Urban'] = {}
            data_json[region]['data'][year]['SubUrban'] = {}
            data_json[region]['data'][year]['ExUrban'] = {}
        data_json[region]['data'][year]['Urban'] = urban
        data_json[region]['data'][year]['SubUrban'] = suburban
        data_json[region]['data'][year]['ExUrban'] = exurban
    chart_data_string = json.dumps(data_json, indent=4, sort_keys=True)
    f = open(f'{published_data_base_path}/market_summary_charts.json', "w")
    f.write(chart_data_string)
    f.close()
    print(f'Wrote market summary charts data to  {published_data_base_path}/market_summary_charts.json')


# In[31]:


def create_comparison_chart_json(published_data_base_path = "./public"):
    csv_file_path = f'{source_data_base_path}/Chart_Data_File.csv'
    chart_data_rows = []
    with open(csv_file_path, encoding='utf-8-sig') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            chart_data_rows.append(row)
    data_json = {}
    for row in chart_data_rows:
        region = row['Region']
        display_region = row['DisplayRegion']
        year = row['Year']
        age_segment=row['Display_Age_Segment']
        income_segment=row['Display_Income_Segment']
        key = f'{region}-{year}-{age_segment}-{income_segment}'
        urban = row['Urban']
        suburban = row['SubUrban']
        exurban = row['ExUrban']
        print(key)
        urban = '%.10f' % float(row['Urban'])
        suburban = '%.10f' % float(row['SubUrban'])
        exurban = '%.10f' % float(row['ExUrban'])
        display_region = row['DisplayRegion']
        isMetro = row['IsMetro']
        needsCaveat = row['NeedsCaveat']
        data_json[key] = {
            "year": year,
            "ageSegment": age_segment,
            "incomeSegment": income_segment,
            "urban": urban,
            "suburban": suburban,
            "exurban": exurban,
            "isMetro": isMetro,
            "needsCaveat": needsCaveat
        }
    chart_data_string = json.dumps(data_json, indent=4, sort_keys=True)
    f = open(f'{published_data_base_path}/market_comparison_charts.json', "w")
    f.write(chart_data_string)
    f.close()
    print(f'Wrote market summary charts data to  {published_data_base_path}/market_comparison_charts.json')


# In[32]:


def create_data_options_json(published_data_base_path = "./public"):
    csv_file_path = f'{source_data_base_path}/Chart_Data_File.csv'
    chart_data_rows = []
    with open(csv_file_path, encoding='utf-8-sig') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            chart_data_rows.append(row)
    year_options_set = set()
    age_segment_options_set = set()
    income_segment_options_set = set()
    region_options_list = []
    for row in chart_data_rows:
        year_options_set.add(row["Year"])
        age_segment_options_set.add(row["Display_Age_Segment"])
        income_segment_options_set.add(row["Display_Income_Segment"])
        region = {
            "region": row["Region"],
            "displayRegion": row["DisplayRegion"],
            "isMetro": row["IsMetro"],
            "needsCaveat": row["NeedsCaveat"],
        }
        region_options_list.append(region)
    year_options_list = list(year_options_set)
    year_options_list.sort()
    age_segment_options_list = list(age_segment_options_set)
    age_segment_options_list.sort()
    income_segment_options_list = list(income_segment_options_set)
    income_segment_options_list.sort()
    region_options = pd.DataFrame(region_options_list).drop_duplicates().to_dict('r')
    dataOptions = {
        "yearOptions": year_options_list,
        'ageSegmentOptions': age_segment_options_list,
        'incomeSegmentOptions': income_segment_options_list,
        "regionOptions": region_options
    }
    data_options_string = json.dumps(dataOptions, indent=4, sort_keys=True)
    f = open(f'{published_data_base_path}/data_options.json', "w")
    f.write(data_options_string)
    f.close()
    print(f'Wrote data options data to  {published_data_base_path}/data_options.json')


# In[33]:


# Set up input and output locations
# Geojson file path
geojson_files_base_path = '/Users/alanmccann/Dropbox/bain/map_source_data'
# Source csv data path
source_data_base_path = "/Users/alanmccann/Dropbox/bain/bain-uploads/v5_9th_run Brian Stobie/"
# Output data path - all of the files in this folder should be uploaded to the cms GeoSpatialTool/v1 folder
published_data_base_path = "./public"
# Census year for geojson
census_year = 2010

# Process the data
process_main_geo_data(source_data_base_path, geojson_files_base_path, published_data_base_path, census_year)
create_chart_json(published_data_base_path)
create_comparison_chart_json(published_data_base_path)
create_data_options_json(published_data_base_path)


# In[ ]:




