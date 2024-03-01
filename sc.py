# -*- coding: utf-8 -*-
import socket
import time

def send_udp_packet(target_host, target_port, num_packets, packets_per_second, duration):
    udp_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    interval = 1 / packets_per_second  # Saniyedeki paket sayisina karsilik gelen aralik
    start_time = time.time()
    sent_packets = 0
    while True:
        if sent_packets >= num_packets:
            break
        if time.time() - start_time > duration:
            break
        udp_socket.sendto(b"UDP Test Packet", (target_host, target_port))
        sent_packets += 1
        time.sleep(interval)  # Belirlenen aralik kadar bekleyin
    udp_socket.close()

if __name__ == "__main__":
    target_host = input("Hedef IP adresini girin: ")
    target_port = int(input("Hedef port numarasini girin: "))
    num_packets = int(input("Gonderilecek toplam paket sayisini girin: "))
    packets_per_second = int(input("Saniyede gonderilecek paket sayisini girin: "))
    duration = int(input("Devam edecek sureyi saniye cinsinden girin: "))

    send_udp_packet(target_host, target_port, num_packets, packets_per_second, duration)
