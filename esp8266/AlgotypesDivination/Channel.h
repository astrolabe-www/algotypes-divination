#pragma once

class Channel {
  public:
    uint8_t id;
    int16_t rssiMax;
    uint16_t packetCount;
    uint32_t payloadSum;

    void printToSerial() {
      Serial.printf("ch: %u | rssi: %d | packets: %u | payload: %u | pay/pak: %u\n",
                    id,
                    rssiMax,
                    packetCount,
                    payloadSum,
                    payloadSum / packetCount
                   );
    }
    static bool byRssi(const Channel& a, const Channel& b) {
      return a.rssiMax > b.rssiMax;
    }
    static bool byPacketCount(const Channel& a, const Channel& b) {
      return a.packetCount > b.packetCount;
    }
    static bool byPayload(const Channel& a, const Channel& b) {
      return a.payloadSum > b.payloadSum;
    }
    static bool byPayloadRatio(const Channel& a, const Channel& b) {
      return (a.payloadSum / a.packetCount) > (b.payloadSum / b.packetCount);
    }
};
