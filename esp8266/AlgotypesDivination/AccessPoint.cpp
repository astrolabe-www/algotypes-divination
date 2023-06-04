#include "AccessPoint.h"

#include <ESP8266WiFi.h>

bool AccessPoint::_isRunning = false;

void AccessPoint::start() {
  if (_isRunning) return;
  Serial.printf("Turning AP on ...\n");
  WiFi.mode(WIFI_OFF);
  delay(100);
  WiFi.mode(WIFI_AP);
  delay(100);
  _isRunning = WiFi.softAP("ALGOTYPES", "1234abcd", 6, false, 0);
}

void AccessPoint::stop() {
  if (!_isRunning) return;
  Serial.printf("Turning AP off ...\n");
  _isRunning = !WiFi.softAPdisconnect(true);
  delay(100);
}

bool AccessPoint::isRunning() {
  return _isRunning;
}
