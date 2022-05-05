#pragma once

#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>

#include "parameters.h"

void postCardsToServer(int cards[3]) {
  WiFiClientSecure httpClient;
  httpClient.setFingerprint(API_FINGERPRINT);
  httpClient.setTimeout(1000);

  String postPath = API_ENDPOINT + "/" + API_TOKEN;

  if (!httpClient.connect(API_HOST, API_PORT)) {
    Serial.printf("\n\nCouldn't connect to server ...");
    return;
  }

  String body = "{ \"cards\" : \"[" +
                String(cards[0]) + "," +
                String(cards[1]) + "," +
                String(cards[2]) + "]\" }";

  String postContent = "POST " + postPath + " HTTP/1.1\r\n" +
                       "Host: " + API_HOST + ":" + API_PORT + "\r\n" +
                       "Content-Type: application/json" + "\r\n" +
                       "Content-Length: " + body.length() + "\r\n\r\n" +
                       body + "\r\n";

  httpClient.print(postContent);
  while (!httpClient.available());

  while (httpClient.available()) {
    String line = httpClient.readStringUntil('\n');
    Serial.println(line);
  }
  httpClient.print("Connection: close\r\n\r\n");
  httpClient.stop();
}

void connectToWiFi() {
  Serial.printf("\n\nConnecting to WiFi ...");
  WiFi.mode(WIFI_OFF);
  delay(100);
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID.c_str(), WIFI_PASS.c_str());

  for (int counter = 0; (WiFi.status() != WL_CONNECTED) && (counter < 128); counter++) {
    delay(100);
    Serial.print(".");
  }
  Serial.println(".");
  if (WiFi.status() != WL_CONNECTED) {
    Serial.printf("\n\nERROR connecting to WiFi !!!\n");
  }
}

void disconnectFromWiFi() {
  WiFi.mode(WIFI_OFF);
  delay(100);
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  delay(100);
}
