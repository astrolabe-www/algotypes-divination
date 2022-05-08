/******
  references:
  - https://arduino-esp8266.readthedocs.io/en/2.4.0/esp8266wifi/client-examples.html
  - https://arduino-esp8266.readthedocs.io/en/2.4.0/esp8266wifi/client-secure-examples.html
*****/

#include "utils.h"
#include "PacketCounter.h"

const long POST_PERIOD = 60 * 60 * 1000;
const long POST_PERIOD_RETRY = 1 * 60 * 1000;

unsigned long nextPost = 0;

const int NUM_CARDS = 22;
int CARDS[NUM_CARDS];

void setup() {
  Serial.begin(115200);
  delay(10);

  for (int i = 0; i < NUM_CARDS; i++) {
    CARDS[i] = i;
  }
}

void loop() {
  unsigned long now = millis();

  if (!PacketCounter::isRunning()) {
    if (now > nextPost) {
      // TODO: calculate cards from Counter
      for (int i = 0; i < NUM_CARDS - 1; i++) {
        int j = random(i, NUM_CARDS);
        int temp = CARDS[i];
        CARDS[i] = CARDS[j];
        CARDS[j] = temp;
      }

      connectToWiFi();
      delay(1000);
      nextPost = now + POST_PERIOD;
      if (postCardsToServer(CARDS)) {
        nextPost = now + POST_PERIOD;
      } else {
        nextPost = now + POST_PERIOD_RETRY;
        Serial.println("Retry in 1 minute");
      }
      disconnectFromWiFi();
    } else {
      Serial.println("Start Count");
      PacketCounter::start();
    }
  } else {
    delay(10);
  }
}
