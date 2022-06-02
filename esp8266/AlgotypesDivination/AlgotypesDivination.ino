/******
  references:
  - https://arduino-esp8266.readthedocs.io/en/2.4.0/esp8266wifi/client-examples.html
  - https://arduino-esp8266.readthedocs.io/en/2.4.0/esp8266wifi/client-secure-examples.html
*****/

#include "utils.h"
#include "PacketCounter.h"

const long COUNT_PERIOD = 15 * 60 * 1000;

unsigned long nextPost = 0;
unsigned long nextCount = 0;

const int NUM_CARDS = 3;
int CARDS[NUM_CARDS] = {0, 1, 2};

void setup() {
  Serial.begin(115200);
  delay(10);
  Serial.println("\n");
  PacketCounter::start();
}

void loop() {
  unsigned long now = millis();

  if (!PacketCounter::isRunning()) {
    if (now > nextPost) {
      for (int i = 0; i < NUM_CARDS; i++) {
        int cardRoot = PacketCounter::orderedChannels[2 * i];
        int cardMod = PacketCounter::orderedChannels[2 * i + 1];
        CARDS[i] = 2 * cardRoot + (cardMod % 2);
      }

      connectToWiFi();
      nextPost = now + postCardsToServer(CARDS);
      disconnectFromWiFi();
    } else if (now > nextCount) {
      PacketCounter::start();
      nextCount = now + COUNT_PERIOD;
    }
  } else {
    delay(10);
  }
}
