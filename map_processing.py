import logging
from multiprocessing import Process, Queue
import os
import time

# Imports

import json

# import geojson
# import geopandas
import pandas as pd
import pathlib
import csv
import copy
import ast
import os
import time
from collections import OrderedDict

# from geojson import Feature, Point, FeatureCollection
import os
import subprocess
import json
import csv
import datetime
import subprocess

MAX_RETRIES = 3

MAP_VERSION = 4
MAPBOX_ACCESS_TOKEN = "sk.eyJ1Ijoic3RvYmllYiIsImEiOiJjbDR2dDlibHkwODhjM2lub3EwOXJld2dzIn0.Ur59yGDIvj60ELA7QOCnqQ"
my_env = {
    **os.environ,
    "MAPBOX_ACCESS_TOKEN": "sk.eyJ1Ijoic3RvYmllYiIsImEiOiJjbDR2dDlibHkwODhjM2lub3EwOXJld2dzIn0.Ur59yGDIvj60ELA7QOCnqQ",
}
published_data_base_path = f"/Users/alanmccann/Dropbox/bain/mtsds-data/v{MAP_VERSION}"
# source_data_base_path = (
#     "/Users/alanmccann/Dropbox/bain/bain-uploads/US_Geospatial_Jan10_Run2 Brian Stobie"
# )
# source_data_base_path = (
#     "/Users/alanmccann/Dropbox/bain/bain-uploads/US_Geospatial_Jan17_Run1 Brian Stobie"
# )
source_data_base_path = (
    "/Users/alanmccann/Dropbox/bain/bain-uploads/US_Geospatial_Jan21_Run1 Brian Stobie"
)

published_data_base_path = f"/Users/alanmccann/Dropbox/bain/mtsds-data/v{MAP_VERSION}"
csv_file_path = f"{source_data_base_path}/Market_Mapping_Settings_v{MAP_VERSION}.csv"


cwd = os.getcwd()
os.chdir(published_data_base_path)

MAP_VERSION = 4
STATS_TYPES = [
    "Count",
    "Percent",
    "CountChange",
    "PercentChange",
    "SaturationChange",
    "PercentChangeNatAdj",
    "SaturationChangeNatAdj",
    "Labels",
]

STATS_TYPE_LABELS = {
    "Count": "cnt",
    "CountChange": "cch",
    "Percent": "pct",
    "PercentChange": "pch",
    "PercentChangeNatAdj": "pna",
    "SaturationChange": "sch",
    "SaturationChangeNatAdj": "sna",
    "Labels": "lbl",
}


ETHNICITIES = {
    "all": {"full": "All", "input_suffix": "All", "output_suffix": "al"},
    "asian": {"full": "Asian", "input_suffix": "Asi", "output_suffix": "as"},
    "black": {"full": "black", "input_suffix": "Bla", "output_suffix": "bl"},
    "hispanic": {"full": "Hispanic", "input_suffix": "His", "output_suffix": "hi"},
    "other": {"full": "Other", "input_suffix": "Oth", "output_suffix": "ot"},
    "white": {"full": "White", "input_suffix": "Whi", "output_suffix": "wh"},
}
ETHNICITY_KEYS = ETHNICITIES.keys()


def retry_operation(operation, max_attempts=MAX_RETRIES, *args, **kwargs):
    for attempt in range(max_attempts):
        try:
            # Attempt to execute the operation
            return operation(*args, **kwargs)
        except Exception as e:
            logging.info(f"Attempt {attempt + 1} failed with error: {e}")
            time.sleep(10)
            # If this was the last attempt, re-raise the exception
            if attempt == max_attempts - 1:
                raise
    return None


def ethnicity_text(ethnicity, kind="input_suffix"):
    if kind == "input_suffix":
        return f'Eth{ETHNICITIES[ethnicity]["input_suffix"]}'
    elif kind == "output_suffix":
        return f'{ETHNICITIES[ethnicity]["output_suffix"]}'
    elif kind == "full":
        ETHNICITIES[ethnicity]["full"]
    else:
        ETHNICITIES[ethnicity]["full"]


def upload_source(market_file_prefix, ethnicity, stats_type, working_directory):
    ethnicity_suffix = ethnicity_text(ethnicity, "output_suffix")
    cwd = os.getcwd()
    os.chdir(working_directory)
    upload_source_command = [
        "tilesets",
        "upload-source",
        "stobieb",
        f"{market_file_prefix}_{ethnicity_suffix}_{STATS_TYPE_LABELS[stats_type]}_src_v{MAP_VERSION}",
        f"{market_file_prefix}_{ethnicity_suffix}_{STATS_TYPE_LABELS[stats_type]}_v{MAP_VERSION}.json",
        "--replace",
    ]
    logging.info(" ".join(upload_source_command))
    process = subprocess.Popen(
        upload_source_command,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        env=my_env,
    )

    stdout, stderr = process.communicate()
    output = stdout.decode("utf-8").split("\n")
    error = stderr.decode("utf-8")
    logging.info(output)


def upload_label_source(market_file_prefix, working_directory):
    cwd = os.getcwd()
    os.chdir(working_directory)
    upload_source_command = [
        "tilesets",
        "upload-source",
        "stobieb",
        f"{market_file_prefix}_labels_src_v{MAP_VERSION}",
        f"{market_file_prefix}_labels_v{MAP_VERSION}.json",
        #'--replace'
    ]
    logging.info(" ".join(upload_source_command))
    process = subprocess.Popen(
        upload_source_command,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        env=my_env,
    )

    stdout, stderr = process.communicate()
    output = stdout.decode("utf-8").split("\n")
    error = stderr.decode("utf-8")
    logging.info(output)


def update_recipe(market_file_prefix, ethnicity, stats_type, working_directory):
    ethnicity_suffix = ethnicity_text(ethnicity, "output_suffix")
    cwd = os.getcwd()
    os.chdir(working_directory)
    update_recipe_command = [
        "tilesets",
        "update-recipe",
        f"stobieb.{market_file_prefix}_{ethnicity_suffix}_{STATS_TYPE_LABELS[stats_type]}_v{MAP_VERSION}",
        f"{market_file_prefix}_{ethnicity_suffix}_{STATS_TYPE_LABELS[stats_type]}_recipe_v{MAP_VERSION}.json",
    ]

    logging.info(" ".join(update_recipe_command))
    process = subprocess.Popen(
        update_recipe_command,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        env=my_env,
    )

    stdout, stderr = process.communicate()
    output = stdout.decode("utf-8").split("\n")
    error = stderr.decode("utf-8")
    logging.info(output)
    logging.info(error)


def update_label_recipe(market_file_prefix, working_directory):
    cwd = os.getcwd()
    os.chdir(working_directory)
    update_recipe_command = [
        "tilesets",
        "update-recipe",
        f"stobieb.{market_file_prefix}_labels_v{MAP_VERSION}",
        f"{market_file_prefix}_labels_recipe_v{MAP_VERSION}.json",
    ]

    logging.info(" ".join(update_recipe_command))
    process = subprocess.Popen(
        update_recipe_command,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        env=my_env,
    )

    stdout, stderr = process.communicate()
    output = stdout.decode("utf-8").split("\n")
    error = stderr.decode("utf-8")
    logging.info(output)
    logging.info(error)


def upload_tileset(market_file_prefix, ethnicity, stats_type, working_directory):
    ethnicity_suffix = ethnicity_text(ethnicity, "output_suffix")
    cwd = os.getcwd()
    os.chdir(working_directory)
    create_tileset_command = [
        "tilesets",
        "create",
        f"stobieb.{market_file_prefix}_{ethnicity_suffix}_{STATS_TYPE_LABELS[stats_type]}_v{MAP_VERSION}",
        "--recipe",
        f"{market_file_prefix}_{ethnicity_suffix}_{STATS_TYPE_LABELS[stats_type]}_recipe_v{MAP_VERSION}.json",
        "--name",
        f"{market_file_prefix}_{ethnicity_suffix}_{STATS_TYPE_LABELS[stats_type]}_v{MAP_VERSION}",
    ]

    logging.info(" ".join(create_tileset_command))
    process = subprocess.Popen(
        create_tileset_command,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        env=my_env,
    )

    stdout, stderr = process.communicate()
    output = stdout.decode("utf-8").split("\n")
    error = stderr.decode("utf-8")
    logging.info(output)
    logging.info(error)


def upload_label_tileset(market_file_prefix, working_directory):
    cwd = os.getcwd()
    os.chdir(working_directory)
    create_tileset_command = [
        "tilesets",
        "create",
        f"stobieb.{market_file_prefix}_labels_v{MAP_VERSION}",
        "--recipe",
        f"{market_file_prefix}_labels_recipe_v{MAP_VERSION}.json",
        "--name",
        f"{market_file_prefix}_labels_v{MAP_VERSION}",
    ]

    logging.info(" ".join(create_tileset_command))
    process = subprocess.Popen(
        create_tileset_command,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        env=my_env,
    )

    stdout, stderr = process.communicate()
    output = stdout.decode("utf-8").split("\n")
    error = stderr.decode("utf-8")
    logging.info(output)
    logging.info(error)


def publish_tileset(market_file_prefix, ethnicity, stats_type, working_directory):
    ethnicity_suffix = ethnicity_text(ethnicity, "output_suffix")
    cwd = os.getcwd()
    os.chdir(working_directory)
    publish_tileset_command = [
        "tilesets",
        "publish",
        f"stobieb.{market_file_prefix}_{ethnicity_suffix}_{STATS_TYPE_LABELS[stats_type]}_v{MAP_VERSION}",
    ]

    logging.info(" ".join(publish_tileset_command))
    logging.info(datetime.datetime.now())
    process = subprocess.Popen(
        publish_tileset_command,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        env=my_env,
    )

    stdout, stderr = process.communicate()
    output = stdout.decode("utf-8").split("\n")
    error = stderr.decode("utf-8")
    logging.info(output)
    logging.info(error)
    result = json.loads(output[0])
    logging.info(str(result))
    get_job_status_command = [
        "tilesets",
        "job",
        f"stobieb.{market_file_prefix}_{ethnicity_suffix}_{STATS_TYPE_LABELS[stats_type]}_v{MAP_VERSION}",
        result["jobId"],
    ]
    state = "processing"
    while state == "processing":
        process = subprocess.Popen(
            get_job_status_command,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            env=my_env,
        )

        stdout, stderr = process.communicate()
        output = stdout.decode("utf-8").split("\n")
        try:
            result = json.loads(output[0])
        except:
            result = {}
        if "stage" in result.keys():
            state = result["stage"]
        if state != "success":
            logging.info(f"{state}: sleeping")
            time.sleep(15)
    logging.info("finished")
    logging.info(datetime.datetime.now())


def publish_label_tileset(market_file_prefix, working_directory):
    cwd = os.getcwd()
    os.chdir(working_directory)
    publish_tileset_command = [
        "tilesets",
        "publish",
        f"stobieb.{market_file_prefix}_labels_v{MAP_VERSION}",
    ]

    logging.info(" ".join(publish_tileset_command))
    logging.info(datetime.datetime.now())
    process = subprocess.Popen(
        publish_tileset_command,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        env=my_env,
    )

    stdout, stderr = process.communicate()
    output = stdout.decode("utf-8").split("\n")
    error = stderr.decode("utf-8")
    logging.info(output)
    logging.info(error)
    result = json.loads(output[0])
    logging.info(str(result))
    get_job_status_command = [
        "tilesets",
        "job",
        f"stobieb.{market_file_prefix}_labels_v{MAP_VERSION}",
        result["jobId"],
    ]
    state = "processing"
    while state == "processing":
        process = subprocess.Popen(
            get_job_status_command,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            env=my_env,
        )

        stdout, stderr = process.communicate()
        output = stdout.decode("utf-8").split("\n")
        try:
            result = json.loads(output[0])
        except:
            result = {}
        if "stage" in result.keys():
            state = result["stage"]
        if state != "success":
            logging.info(f"{state}: sleeping")
            time.sleep(15)
    logging.info("finished")
    logging.info(datetime.datetime.now())


# Setting up basic configuration for logging
logging.basicConfig(level=logging.INFO, format="%(processName)s %(message)s")


def create_label_job(index, market_count, market_file_prefix, published_data_base_path):
    return (
        index,
        market_count,
        "label",
        {
            "market_file_prefix": market_file_prefix,
            "published_data_base_path": published_data_base_path,
        },
    )


def create_data_job(
    index,
    market_count,
    market_file_prefix,
    ethnicity,
    stats_type,
    published_data_base_path,
):
    return (
        index,
        market_count,
        "data",
        {
            "market_file_prefix": market_file_prefix,
            "ethnicity": ethnicity,
            "stats_type": stats_type,
            "published_data_base_path": published_data_base_path,
        },
    )


def process_label_job(market_file_prefix, published_data_base_path):
    logging.info(
        f"{datetime.datetime.now() } Processing Label Job Market: {market_file_prefix}"
    )
    try:
        upload_label_source(market_file_prefix, published_data_base_path)
        upload_label_tileset(market_file_prefix, published_data_base_path)
        update_label_recipe(market_file_prefix, published_data_base_path)

        publish_label_tileset(market_file_prefix, published_data_base_path)
        logging.info(
            f"{datetime.datetime.now() } Finished Label Job Market: {market_file_prefix}"
        )
    except:
        logging.info(
            f"{datetime.datetime.now() } Failed  Label Job Market: {market_file_prefix}"
        )


def process_data_job(
    market_file_prefix, ethnicity, stats_type, published_data_base_path
):
    logging.info(
        f"{datetime.datetime.now() } Processing Data Job Market: {market_file_prefix} Ethnicity: {ethnicity} Stats Type: {stats_type}"
    )
    # try:
    upload_source(market_file_prefix, ethnicity, stats_type, published_data_base_path)
    upload_tileset(market_file_prefix, ethnicity, stats_type, published_data_base_path)
    update_recipe(market_file_prefix, ethnicity, stats_type, published_data_base_path)

    retry_operation(
        publish_tileset,
        5,
        market_file_prefix,
        ethnicity,
        stats_type,
        published_data_base_path,
    )
    logging.info(
        f"{datetime.datetime.now() } Finished Data Job Market: {market_file_prefix} Ethnicity: {ethnicity} Stats Type: {stats_type}"
    )
    # except:
    #     logging.info(
    #         f"{datetime.datetime.now() } Failed Data Job Market: {market_file_prefix} Ethnicity: {ethnicity} Stats Type: {stats_type}"
    #     )


def worker(input_queue):
    while True:
        job = input_queue.get()
        if job is None:
            break  # No more jobs
        job_id, market_count, type, data = job
        logging.info(
            f'Processing Data Job ID: {job_id},  Market Count: {market_count}, Market: {data["market_file_prefix"]} Ethnicity: {data["ethnicity"]} Stats Type: {data["stats_type"]}'
        )
        if type == "label":
            process_label_job(
                data["market_file_prefix"], data["published_data_base_path"]
            )
            logging.info(
                f'Processing Label Job ID: {job_id}, Market Count: {market_count}, Market: {data["market_file_prefix"]}'
            )
            time.sleep(20)
        if type == "data":
            process_data_job(
                data["market_file_prefix"],
                data["ethnicity"],
                data["stats_type"],
                data["published_data_base_path"],
            )
            logging.info(
                f'Finished Data Job ID: {job_id},  Market Count: {market_count}, Market: {data["market_file_prefix"]} Ethnicity: {data["ethnicity"]} Stats Type: {data["stats_type"]}'
            )
            time.sleep(20)


def create_jobs():
    market_rows = []
    with open(csv_file_path, encoding="utf-8-sig") as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            market_rows.append(row)
    sorted_market_rows = sorted(market_rows, key=lambda d: d["MarketName"])
    market_count = 0
    completed_markets = []
    jobs = []
    count = 0

    for market_data in sorted_market_rows:  # [416:417]:
        logging.info(f"Market: {market_data['MarketName']}")
        # if market_data['MarketName'] in ['Virginia']:
        market_count += 1
        logging.info(f"Market: {market_count}")
        if True:
            count += 1
            # Create labels
            market_file_prefix = market_data["MarketName"].lower()
            if market_file_prefix in [
                "nebraska",
                # "knoxvilletn",
                # "washingtondc",
            ]:
                # label_job = create_label_job(
                #     count, market_count, market_file_prefix, published_data_base_path
                # )
                # jobs.append(label_job)
                # # Create data jobs
                for ethnicity in list(ETHNICITIES.keys()):
                    if (
                        True
                    ):  # market_data['MarketName'] in MARKETS: #,'DallasFortWorthTX']:
                        logging.info(f"count: {count}")
                        logging.info(
                            f"creating tileset jobs for: {market_file_prefix}, {ethnicity}"
                        )
                        logging.info(datetime.datetime.now())
                        for stats_type in STATS_TYPES[:-1]:
                            count += 1
                            new_job = create_data_job(
                                count,
                                market_count,
                                market_file_prefix,
                                ethnicity,
                                stats_type,
                                published_data_base_path,
                            )
                            jobs.append(new_job)

    return jobs


def main():
    num_workers = 4
    input_queue = Queue()

    # Start workers
    workers = [Process(target=worker, args=(input_queue,)) for _ in range(num_workers)]
    for w in workers:
        w.start()

    # Add jobs to the queue
    jobs = create_jobs()
    for job in jobs:
        input_queue.put(job)

    # Add None to the queue for each worker to signal the end of jobs
    for _ in range(num_workers):
        input_queue.put(None)

    # Wait for all workers to finish
    for w in workers:
        w.join()


if __name__ == "__main__":
    main()
