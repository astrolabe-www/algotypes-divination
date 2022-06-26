#pragma once

#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>

#include "parameters.h"

const long POST_PERIOD_RETRY = 1 * 60 * 1000;

long postCardsToServer(int cards[3]) {
  long nextPostDelayMillis = POST_PERIOD_RETRY;

  WiFiClientSecure httpClient;
  httpClient.setFingerprint(API_FINGERPRINT);
  httpClient.setTimeout(1000);

  String postPath = API_ENDPOINT + "/" + API_TOKEN;

  String postBody = "{ \"cards\" : \"[" +
                    String(cards[0]) + "," +
                    String(cards[1]) + "," +
                    String(cards[2]) + "]\" }";

  String postContent = "POST " + postPath + " HTTP/1.1\r\n" +
                       "Host: " + API_HOST + ":" + API_PORT + "\r\n" +
                       "Content-Type: application/json" + "\r\n" +
                       "Content-Length: " + postBody.length() + "\r\n\r\n" +
                       postBody + "\r\n";

  Serial.printf("POST: %s\n", postBody.c_str());

  if (!httpClient.connect(API_HOST, API_PORT)) {
    Serial.println("Couldn't connect to server ...");
    return POST_PERIOD_RETRY;
  }

  httpClient.print(postContent);
  while (!httpClient.available());

  while (httpClient.available()) {
    String line = httpClient.readStringUntil('\n');
    if (line.indexOf("success") > 0) {
      Serial.printf("Response: %s\n", line.c_str());

      StaticJsonDocument<128> responseDoc;
      StaticJsonDocument<32> responseFilter;
      responseFilter["data"]["nextPostDelayMillis"] = true;

      DeserializationError error = deserializeJson(responseDoc, line, DeserializationOption::Filter(responseFilter));
      if (!error) {
        nextPostDelayMillis = responseDoc["data"]["nextPostDelayMillis"];
        Serial.printf("Next POST in %d millis\n", nextPostDelayMillis);
        break;
      }
    }
  }

  httpClient.print("Connection: close\r\n\r\n");
  httpClient.stop();
  return nextPostDelayMillis;
}

void connectToWiFi() {
  Serial.printf("\nConnecting to WiFi ...");
  WiFi.mode(WIFI_OFF);
  delay(100);
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID.c_str(), WIFI_PASS.c_str());

  for (int counter = 0; (WiFi.status() != WL_CONNECTED) && (counter < 256); counter++) {
    delay(100);
    Serial.print(".");
  }
  Serial.println(".");

  if (WiFi.status() != WL_CONNECTED) {
    Serial.printf("\n\nERROR connecting to WiFi !!!\n");
  }
}

void disconnectFromWiFi() {
  Serial.printf("\nDisconnecting from WiFi ...\n");
  WiFi.mode(WIFI_OFF);
  delay(100);
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  delay(100);
}
