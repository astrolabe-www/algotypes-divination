/******
  references:
  - https://arduino-esp8266.readthedocs.io/en/2.4.0/esp8266wifi/client-examples.html
  - https://arduino-esp8266.readthedocs.io/en/2.4.0/esp8266wifi/client-secure-examples.html
*****/

#include "utils.h"

long POST_PERIOD = 15 * 60 * 1000;
long POST_PERIOD_RETRY = 1 * 60 * 1000;

unsigned long nextPost = 0;

void setup() {
  Serial.begin(115200);
  delay(10);
  connectToWiFi();
  // TODO: start sniffing
}

void loop() {
  unsigned long now = millis();

  if (now > nextPost) {
    // TODO: stop sniffing
    // TODO: calculate cards from sniff

    int cards[3] = {
      random(0, 22),
      random(0, 22),
      random(0, 22)
    };

    if (postCardsToServer(cards)) {
      nextPost = now + POST_PERIOD;
    } else {
      nextPost = now + POST_PERIOD_RETRY;
      Serial.println("Retry in 1 minute");
    }
    // TODO: continue sniffing
  } else {
    delay(10);
  }
}
