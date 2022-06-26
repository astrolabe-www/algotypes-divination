#pragma once

class AccessPoint {
  private:
    static bool _isRunning;

  public:
    static void start();
    static void stop();
    static bool isRunning();
};
