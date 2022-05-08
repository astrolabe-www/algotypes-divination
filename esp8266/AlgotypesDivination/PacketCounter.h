#pragma once

#include <ESP8266WiFi.h>

#include "Channel.h"

class PacketCounter {
  public:
    static const uint8 NUM_CHANNELS = 11;
    static uint8 orderedChannels[NUM_CHANNELS];

  private:
    static const long HOP_INTERVAL = 3 * 1000;
    static Channel mChannels[NUM_CHANNELS];

  private:
    static uint8_t _hopChannel;
    static bool _isRunning;
    static long _nextHop;

  public:
    static void start();
    static void stop();
    static bool isRunning();

  private:
    static void reset();
    static void analyzePackets(uint8_t *buff, uint16_t buff_length);
};
