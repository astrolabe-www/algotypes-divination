#pragma once

#include <ESP8266WiFi.h>

class Channel {
  public:
    uint8_t id;
    int16_t rssiMax;
    uint16_t packetCount;
    uint32_t payloadSum;

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

class PacketCounter {
  private:
    static const long CHANNEL_HOP_INTERVAL_MS = 3 * 1000;
    static const uint8 NUM_CHANNELS = 11;

    static Channel mChannels[NUM_CHANNELS];

    static uint8_t _hopChannel;
    static bool _isRunning;
    static long _nextHop;

  private:
    static void reset();
    static void analyzePackets(uint8_t *buff, uint16_t buff_length);

  public:
    static void start();
    static void stop();
    static bool isRunning();
};
