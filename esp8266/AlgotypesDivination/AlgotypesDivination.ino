/******
  references:
  - https://arduino-esp8266.readthedocs.io/en/2.4.0/esp8266wifi/client-examples.html
  - https://arduino-esp8266.readthedocs.io/en/2.4.0/esp8266wifi/client-secure-examples.html
*****/

#include "utils.h"

long POST_PERIOD = 15 * 60 * 1e3;
long POST_RETRY_PERIOD = 1 * 60 * 1e3;

long nextPost = 0;

void setup() {
  Serial.begin(115200);
  delay(10);
  connectToWiFi();
  // TODO: start sniffing
}

void loop() {
  if (millis() > nextPost) {
    // TODO: stop sniffing
    // TODO: calculate cards from sniff

    int cards[3] = {
      random(0, 22),
      random(0, 22),
      random(0, 22)
    };

    if (postCardsToServer(cards)) {
      nextPost = millis() + POST_PERIOD;
    } else {
      nextPost = millis() + POST_RETRY_PERIOD;
    }
    // TODO: continue sniffing
  }
}
