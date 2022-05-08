#include "PacketCounter.h"
#include "sdk_structs.h"

Channel PacketCounter::mChannels[PacketCounter::NUM_CHANNELS];

uint8_t PacketCounter::_hopChannel = 0;
bool PacketCounter::_isRunning = false;
long PacketCounter::_nextHop = 0;

void PacketCounter::reset() {
  for (int c = 0; c < NUM_CHANNELS; c++) {
    mChannels[c].id = c + 1;
    mChannels[c].rssiMax = -10000;
    mChannels[c].packetCount = 0;
    mChannels[c].payloadSum = 0;
  }
}

void PacketCounter::start() {
  reset();
  _hopChannel = 0;
  _nextHop = millis() + CHANNEL_HOP_INTERVAL_MS;

  wifi_station_disconnect();
  wifi_set_opmode(STATION_MODE);
  wifi_set_channel(_hopChannel + 1);
  wifi_promiscuous_enable(0);
  wifi_set_promiscuous_rx_cb((wifi_promiscuous_cb_t) PacketCounter::analyzePackets);
  wifi_promiscuous_enable(1);

  _isRunning = true;
}

void PacketCounter::stop() {
  wifi_promiscuous_enable(0);
  wifi_station_disconnect();
  _isRunning = false;

  for (int c = 0; c < NUM_CHANNELS; c++) {
    Serial.printf("ch: %u | rssi: %d | packets: %u | payload: %u | pay/pak: %u\n",
                  mChannels[c].id,
                  mChannels[c].rssiMax,
                  mChannels[c].packetCount,
                  mChannels[c].payloadSum,
                  mChannels[c].payloadSum / mChannels[c].packetCount
                 );
  }

  Serial.printf("Sort by RSSI\n");
  std::sort(mChannels, mChannels + NUM_CHANNELS, Channel::byRssi);
  for (int c = 0; c < NUM_CHANNELS; c++) {
    Serial.printf("%u, ", mChannels[c].id);
  }
  Serial.printf("\n");

  Serial.printf("Sort by Packet Count\n");
  std::sort(mChannels, mChannels + NUM_CHANNELS, Channel::byPacketCount);
  for (int c = 0; c < NUM_CHANNELS; c++) {
    Serial.printf("%u, ", mChannels[c].id);
  }
  Serial.printf("\n");

  Serial.printf("Sort by Payload Sum\n");
  std::sort(mChannels, mChannels + NUM_CHANNELS, Channel::byPayload);
  for (int c = 0; c < NUM_CHANNELS; c++) {
    Serial.printf("%u, ", mChannels[c].id);
  }
  Serial.printf("\n");

  Serial.printf("Sort by Payload / Packet\n");
  std::sort(mChannels, mChannels + NUM_CHANNELS, Channel::byPayloadRatio);
  for (int c = 0; c < NUM_CHANNELS; c++) {
    Serial.printf("%u, ", mChannels[c].id);
  }
  Serial.printf("\n");
}

void PacketCounter::analyzePackets(uint8_t *buff, uint16_t buff_length) {
  bool isCtrl = (buff_length == sizeof(wifi_pkt_rx_ctrl_t));
  if (isCtrl) return;

  const wifi_promiscuous_pkt_t *ppkt = (wifi_promiscuous_pkt_t *) buff;

  const uint16_t cPayloadSize = (uint16_t)(ppkt->rx_ctrl.sig_mode ? ppkt->rx_ctrl.HT_length : ppkt->rx_ctrl.legacy_length);
  const int16_t cRssi = ppkt->rx_ctrl.rssi;

  mChannels[_hopChannel].rssiMax = max(cRssi, mChannels[_hopChannel].rssiMax);
  mChannels[_hopChannel].packetCount += 1;
  mChannels[_hopChannel].payloadSum += cPayloadSize;

  if (millis() > _nextHop) {
    if (_hopChannel < (NUM_CHANNELS - 1)) {
      _hopChannel = (_hopChannel + 1) % NUM_CHANNELS;
      wifi_set_channel(_hopChannel + 1);
      _nextHop = millis() + CHANNEL_HOP_INTERVAL_MS;
    } else {
      Serial.println("Stop Count");
      stop();
    }
  }
}

bool PacketCounter::isRunning() {
  return _isRunning;
}
